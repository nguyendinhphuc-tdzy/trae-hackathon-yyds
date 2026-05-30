const whatsappNotifyService = {
  async sendInternalAlert(whatsappClient, ticketData) {
    const internalChatId = process.env.WA_INTERNAL_NOTIFY_CHAT_ID;
    if (!internalChatId) {
      console.log('Internal WhatsApp Group ID not configured, skipping alert.');
      return;
    }

    const message = `🚨 *NEW TICKET CREATED* 🚨
---------------------------
Customer: ${ticketData.client_name}
Title: ${ticketData.summary}
Priority: ${ticketData.priority}
Assignee: ${ticketData.assignee_name || 'Unassigned'}
AI Reason: ${ticketData.ai_reason}
---------------------------
Please check the dashboard to take action.`;

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
