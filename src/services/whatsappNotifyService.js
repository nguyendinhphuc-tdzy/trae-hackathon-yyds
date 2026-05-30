const whatsappNotifyService = {
  async sendInternalAlert(whatsappClient, ticketData) {
    const internalChatId = process.env.WA_INTERNAL_NOTIFY_CHAT_ID;
    if (!internalChatId) {
      console.log('Internal WhatsApp Group ID not configured, skipping alert.');
      return;
    }

    const message = `🚨 *TICKET MỚI ĐƯỢC TẠO* 🚨
---------------------------
👤 *Khách hàng:* ${ticketData.client_name}
📝 *Tiêu đề:* ${ticketData.summary}
🔥 *Độ ưu tiên:* ${ticketData.priority}
🤖 *Lý do AI:* ${ticketData.ai_reason}
---------------------------
👉 _Vui lòng kiểm tra hệ thống quản trị để xử lý._`;

    try {
      await whatsappClient.sendMessage(internalChatId, message);
      console.log('WhatsApp internal alert sent successfully.');
    } catch (error) {
      console.error('Error sending WhatsApp internal alert:', error);
    }
  },

  async sendClientConfirmation(whatsappClient, chatId, clientName, ticketId) {
    const message = `[Hệ thống tự động] Xin chào ${clientName}, yêu cầu hỗ trợ của bạn đã được ghi nhận! 
Mã số Ticket: #${ticketId.substring(0, 8)}. 
Đội ngũ kỹ thuật Danta Labs đang xử lý và sẽ phản hồi sớm nhất có thể. Cảm ơn bạn!`;

    try {
      await whatsappClient.sendMessage(chatId, message);
      console.log('WhatsApp client confirmation sent successfully.');
    } catch (error) {
      console.error('Error sending WhatsApp client confirmation:', error);
    }
  }
};

module.exports = whatsappNotifyService;
