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
    const message = `[Automated System] Hi ${clientName}, your support request has been received.
Ticket ID: #${ticketId.substring(0, 8)}.
YYDS Team is working on it and will get back to you as soon as possible. Thank you!`;

    try {
      await whatsappClient.sendMessage(chatId, message);
      console.log('WhatsApp client confirmation sent successfully.');
    } catch (error) {
      console.error('Error sending WhatsApp client confirmation:', error);
    }
  }
};

module.exports = whatsappNotifyService;
