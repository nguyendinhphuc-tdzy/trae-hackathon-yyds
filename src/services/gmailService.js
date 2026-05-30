const nodemailer = require('nodemailer');

const gmailService = {
  async sendTicketAlert(ticketData) {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('Gmail credentials not configured, skipping email alert.');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_FROM || process.env.GMAIL_USER,
      to: process.env.GMAIL_TO,
      subject: `[ALERT] New Ticket Created: ${ticketData.summary}`,
      html: `
        <h3>Hệ thống tự động hóa Danta Labs thông báo:</h3>
        <p><b>Ticket ID:</b> #${ticketData.id.substring(0, 8)}</p>
        <p><b>Khách hàng:</b> ${ticketData.client_name}</p>
        <p><b>Tiêu đề:</b> ${ticketData.summary}</p>
        <p><b>Mô tả:</b> ${ticketData.description}</p>
        <p><b>Mức độ ưu tiên:</b> ${ticketData.priority}</p>
        <p><b>Người phụ trách:</b> ${ticketData.assignee_name || 'Chưa phân công'}</p>
        <p><b>Lý do AI:</b> ${ticketData.ai_reason}</p>
        <hr>
        <p>Vui lòng kiểm tra Dashboard để xử lý.</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Gmail alert sent successfully.');
    } catch (error) {
      console.error('Error sending Gmail alert:', error);
    }
  }
};

module.exports = gmailService;
