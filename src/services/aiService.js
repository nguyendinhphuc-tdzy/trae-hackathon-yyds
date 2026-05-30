const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

function stripCodeFences(text) {
  if (typeof text !== "string") return "";
  return text.replace(/```json/gi, "").replace(/```/g, "").trim();
}

function extractFirstJsonObject(text) {
  if (typeof text !== "string") return null;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  return text.slice(start, end + 1);
}

function isModelNotFoundError(error) {
  const status = Number(error?.status);
  const message = typeof error?.message === "string" ? error.message : "";
  return status === 404 || /is not found for api version/i.test(message) || /not supported for generatecontent/i.test(message);
}

function normalizeString(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  return String(value).trim();
}

function clampInt(value, { min, max, fallback }) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  const int = Math.trunc(num);
  return Math.min(max, Math.max(min, int));
}

function tailLines(text, maxLines) {
  const raw = typeof text === "string" ? text : "";
  if (!raw) return "";
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= maxLines) return lines.join("\n");
  return lines.slice(lines.length - maxLines).join("\n");
}

function normalizePriority(value) {
  const v = normalizeString(value).toLowerCase();
  if (v === "high") return "High";
  return "Medium";
}

function normalizeDecision(value) {
  const v = normalizeString(value).toUpperCase();
  return v === "CREATE_SUBTASK" ? "CREATE_SUBTASK" : "IGNORE";
}

function ensureDecisionShape(payload) {
  const decision = normalizeDecision(payload?.decision);
  const reason = normalizeString(payload?.reason) || (decision === "IGNORE" ? "IGNORE" : "Missing reason");
  const summary = decision === "CREATE_SUBTASK" ? normalizeString(payload?.summary) : "";
  const description = decision === "CREATE_SUBTASK" ? normalizeString(payload?.description) : "";
  const priority = decision === "CREATE_SUBTASK" ? normalizePriority(payload?.priority) : "Medium";
  const assignee_id = normalizeString(payload?.assignee_id) || "Phuc_ID";

  return { decision, reason, summary, description, priority, assignee_id };
}

async function callOllama({ baseUrl, modelName, prompt }) {
  const endpoint = `${baseUrl.replace(/\/+$/, "")}/api/generate`;
  const numCtx = clampInt(process.env.OLLAMA_NUM_CTX, { min: 256, max: 4096, fallback: 512 });
  const numPredict = clampInt(process.env.OLLAMA_NUM_PREDICT, { min: 32, max: 1024, fallback: 256 });
  const response = await axios.post(
    endpoint,
    {
      model: modelName,
      prompt,
      stream: false,
      format: "json",
      options: {
        num_ctx: numCtx,
        num_predict: numPredict,
      },
    },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 120_000,
    }
  );

  const raw = response?.data?.response;
  if (typeof raw !== "string" || !raw.trim()) throw new Error("Invalid response from Ollama");
  return raw;
}

const aiService = {
  async analyzeConversation(chatTranscript, ticketsContext, clientName) {
    const provider = normalizeString(process.env.AI_PROVIDER).toLowerCase() || "gemini";
    const transcriptLines = clampInt(process.env.AI_TRANSCRIPT_LINES, { min: 3, max: 30, fallback: 12 });
    const compactTranscript = tailLines(chatTranscript, transcriptLines);

    const prompt = `
Bạn là trợ lý AdminOps của DantaLabs.
Nhiệm vụ: Quyết định xem có cần tạo ticket hỗ trợ kỹ thuật hay không.

QUY TẮC:
1) CREATE_SUBTASK: Khách yêu cầu hỗ trợ, báo lỗi, hoặc có việc cần xử lý.
2) IGNORE: Chào hỏi, cảm ơn, icon, hoặc không có yêu cầu cụ thể.

CONTEXT TICKET ĐANG MỞ:
${ticketsContext || "Không có ticket nào."}

KHÁCH HÀNG: ${clientName}

LỊCH SỬ CHAT:
${compactTranscript}

YÊU CẦU ĐẦU RA (JSON ONLY):
{
  "decision": "CREATE_SUBTASK | IGNORE",
  "reason": "Lý do",
  "summary": "Tiêu đề (nếu tạo ticket)",
  "description": "Mô tả chi tiết",
  "priority": "High | Medium",
  "assignee_id": "Phuc_ID | Tram_ID | Vy_ID"
}
`;

    try {
      let rawText = "";

      if (provider === "ollama") {
        const baseUrl = normalizeString(process.env.OLLAMA_BASE_URL) || "http://localhost:11434";
        const modelName = normalizeString(process.env.OLLAMA_MODEL) || "llama3.2:3b";
        rawText = await callOllama({ baseUrl, modelName, prompt });
      } else {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return { decision: "IGNORE", reason: "GEMINI_API_KEY_MISSING" };

        const genAI = new GoogleGenerativeAI(apiKey);
        const preferredModelName = normalizeString(process.env.GEMINI_MODEL);
        const fallbackModelName = "gemini-1.5-flash";
        const modelNames = [preferredModelName, fallbackModelName].filter(Boolean);

        let lastError;
        for (const modelName of modelNames) {
          try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            rawText = response.text();
            lastError = null;
            break;
          } catch (error) {
            lastError = error;
            if (!isModelNotFoundError(error)) break;
          }
        }
        if (lastError) throw lastError;
      }
      
      let cleaned = stripCodeFences(rawText);
      let jsonStr = extractFirstJsonObject(cleaned) || cleaned;
      
      const decision = ensureDecisionShape(JSON.parse(jsonStr));

      // Mapping IDs
      const mapping = {
        'Phuc_ID': { id: process.env.JIRA_ASSIGNEE_Phuc_ID, name: 'Phúc (Kỹ thuật)' },
        'Tram_ID': { id: process.env.JIRA_ASSIGNEE_Tram_ID, name: 'Trâm (Tư vấn)' },
        'Vy_ID': { id: process.env.JIRA_ASSIGNEE_Vy_ID, name: 'Vy (Nội bộ)' }
      };

      const pic = mapping[decision.assignee_id] || mapping['Phuc_ID'];
      decision.assignee_id = pic?.id || "";
      decision.assignee_name = pic.name;

      return decision;
    } catch (error) {
      const ollamaError = normalizeString(error?.response?.data?.error);
      if (ollamaError) {
        return { decision: "IGNORE", reason: `OLLAMA_ERROR: ${ollamaError}` };
      }
      console.error('AI Service Error:', error);
      return { decision: 'IGNORE', reason: 'AI error' };
    }
  }
};

module.exports = aiService;
