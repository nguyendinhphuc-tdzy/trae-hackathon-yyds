const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-1.5-flash" });

const aiService = {
  async analyzeConversation(chatHistory, openTicketsContext, clientName) {
    const prompt = `
Bạn là một trợ lý Ops thông minh của Danta Labs. Nhiệm vụ của bạn là phân tích lịch sử chat và quyết định xem có cần tạo ticket hỗ trợ kỹ thuật hay không.

Hệ thống của chúng ta phục vụ khách hàng VIP qua WhatsApp.

QUY TẮC QUYẾT ĐỊNH:
1. CREATE_SUBTASK: Khi khách hàng báo lỗi mới, yêu cầu kỹ thuật mới, hoặc có một công việc thực tế cần xử lý (actionable) mà chưa có trong danh sách ticket đang mở.
2. COMMENT: Khi khách hàng nhắn tin bổ sung thông tin cho một ticket đang mở sẵn (Cần xác định đúng ticket ID).
3. IGNORE: Khi khách hàng chỉ chào hỏi xã giao ("Hello", "Cảm ơn", "Ok", "Em chào anh"), gửi icon, hoặc tin nhắn không chứa yêu cầu hành động cụ thể.

DANH SÁCH TICKET ĐANG MỞ (CONTEXT):
${openTicketsContext || 'Không có ticket nào đang mở.'}

THÔNG TIN KHÁCH HÀNG:
Tên: ${clientName}

LỊCH SỬ CHAT GẦN ĐÂY:
${chatHistory}

YÊU CẦU ĐẦU RA (JSON):
Bạn BẮT BUỘC phải trả về định dạng JSON chính xác sau:
{
  "decision": "CREATE_SUBTASK" | "COMMENT" | "IGNORE",
  "reason": "Giải thích ngắn gọn lý do đưa ra quyết định này",
  "summary": "Tiêu đề ngắn gọn của ticket (Chỉ khi CREATE_SUBTASK)",
  "description": "Mô tả chi tiết công việc cần làm được lọc từ chat",
  "priority": "High" | "Medium" | "Low",
  "assignee_id": "Mã nhân viên chịu trách nhiệm (Phuc_ID, Tram_ID, hoặc Vy_ID dựa trên nghiệp vụ: Phuc cho Kỹ thuật/Dev, Tram cho Tư vấn/Lịch họp, Vy cho Nội bộ/Tools)"
}

LƯU Ý: Chỉ trả về JSON, không thêm văn bản giải thích nào khác ngoài JSON.
`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Clean JSON string in case AI adds markdown blocks
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const decision = JSON.parse(text);

      // Map pseudo-ids to internal employee names/IDs
      if (decision.assignee_id === 'Phuc_ID') decision.assignee_name = 'Phúc (Kỹ thuật)';
      if (decision.assignee_id === 'Tram_ID') decision.assignee_name = 'Trâm (Tư vấn)';
      if (decision.assignee_id === 'Vy_ID') decision.assignee_name = 'Vy (Nội bộ)';

      return decision;
    } catch (error) {
      console.error('Error analyzing with AI:', error);
      return { decision: 'IGNORE', reason: 'AI analysis failed' };
    }
  }
};

module.exports = aiService;
