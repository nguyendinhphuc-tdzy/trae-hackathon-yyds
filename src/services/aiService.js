const { GoogleGenerativeAI } = require("@google/generative-ai");

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

const aiService = {
  async analyzeConversation(chatTranscript, ticketsContext, clientName) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-1.5-flash" });

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
${chatTranscript}

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
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let rawText = response.text();
      
      let cleaned = stripCodeFences(rawText);
      let jsonStr = extractFirstJsonObject(cleaned) || cleaned;
      
      const decision = JSON.parse(jsonStr);

      // Mapping IDs
      const mapping = {
        'Phuc_ID': { id: process.env.JIRA_ASSIGNEE_Phuc_ID, name: 'Phúc (Kỹ thuật)' },
        'Tram_ID': { id: process.env.JIRA_ASSIGNEE_Tram_ID, name: 'Trâm (Tư vấn)' },
        'Vy_ID': { id: process.env.JIRA_ASSIGNEE_Vy_ID, name: 'Vy (Nội bộ)' }
      };

      const pic = mapping[decision.assignee_id] || mapping['Phuc_ID'];
      decision.assignee_id = pic.id;
      decision.assignee_name = pic.name;

      return decision;
    } catch (error) {
      console.error('AI Service Error:', error);
      return { decision: 'IGNORE', reason: 'AI error' };
    }
  }
};

module.exports = aiService;
