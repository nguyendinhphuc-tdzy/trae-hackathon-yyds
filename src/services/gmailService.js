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
      subject: `[ALERT] New Ticket Created — ${ticketData.summary}`,
      html: `
        <h3>YYDS Team Automated Alert</h3>
        <p><b>Ticket ID:</b> #${ticketData.id.substring(0, 8)}</p>
        <p><b>Customer:</b> ${ticketData.client_name}</p>
        <p><b>Title:</b> ${ticketData.summary}</p>
        <p><b>Description:</b> ${ticketData.description}</p>
        <p><b>Priority:</b> ${ticketData.priority}</p>
        <p><b>Assignee:</b> ${ticketData.assignee_name || 'Unassigned'}</p>
        <p><b>AI Reason:</b> ${ticketData.ai_reason}</p>
        <hr>
        <p>Please check the dashboard to take action.</p>
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
