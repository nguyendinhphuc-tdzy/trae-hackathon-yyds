const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const supabaseService = require('./supabaseService');
const aiService = require('./aiService');
const gmailService = require('./gmailService');
const whatsappNotifyService = require('./whatsappNotifyService');

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: process.env.WA_AUTH_PATH || './.wwebjs_auth' }),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
});

client.on('qr', (qr) => {
  console.log('SCAN THIS QR CODE TO LOGIN WHATSAPP:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp Client is ready!');
});

client.on('message', async (msg) => {
  try {
    // 0. Bỏ qua tin nhắn từ chính mình
    if (msg.fromMe) return;

    const chatId = msg.from;
    const messageId = msg.id._serialized;
    const text = msg.body;
    const contact = await msg.getContact();
    const senderName = contact.pushname || contact.name || 'Khách hàng';

    console.log(`Received message from ${senderName} (${chatId}): ${text}`);

    // 1. Kiểm tra VIP
    const isVip = await supabaseService.isVipClient(chatId);
    if (!isVip) {
      console.log(`Client ${chatId} is not VIP, skipping.`);
      return;
    }

    // 2. Kiểm tra trùng lặp
    const isDuplicate = await supabaseService.isDuplicateMessage(messageId);
    if (isDuplicate) {
      console.log(`Message ${messageId} is duplicate, skipping.`);
      return;
    }

    // 3. Log event & Upsert Client
    await supabaseService.logMessageEvent(messageId);
    await supabaseService.upsertClient(chatId, senderName);

    // 4. Lấy ngữ cảnh
    const chat = await msg.getChat();
    const messages = await chat.fetchMessages({ limit: parseInt(process.env.WA_TRANSCRIPT_LIMIT) || 20 });
    const chatHistory = messages.map(m => `${m.fromMe ? 'Me' : senderName}: ${m.body}`).join('\n');
    const openTicketsContext = await supabaseService.getOpenTicketsContext(chatId);

    // 5. Gọi AI Decision
    console.log('Analyzing with AI...');
    const aiDecision = await aiService.analyzeConversation(chatHistory, openTicketsContext, senderName);
    console.log('AI Decision:', aiDecision);

    let ticketId = null;
    const aiReason = aiDecision.reason;

    // 6. Xử lý theo quyết định của AI
    if (aiDecision.decision === 'CREATE_SUBTASK') {
      // Tạo Ticket trong DB
      const ticket = await supabaseService.createTicket({
        chatId,
        clientName: senderName,
        summary: aiDecision.summary,
        description: aiDecision.description,
        priority: aiDecision.priority,
        aiReason: aiReason,
        assigneeId: aiDecision.assignee_id,
        assigneeName: aiDecision.assignee_name
      });

      if (ticket) {
        ticketId = ticket.id;
        // Gửi thông báo
        await whatsappNotifyService.sendInternalAlert(client, ticket);
        await gmailService.sendTicketAlert(ticket);
        await whatsappNotifyService.sendClientConfirmation(client, chatId, senderName, ticket.id);
        await supabaseService.logAnalyticsEvent('ticket_created', { ticketId: ticket.id, chatId });
      }
    } else {
      await supabaseService.logAnalyticsEvent('conversation_ignored', { chatId, reason: aiDecision.reason });
    }

    // 7. Lưu Conversation
    await supabaseService.saveConversation({
      chatId,
      clientName: senderName,
      messageId,
      direction: 'inbound',
      text,
      aiDecision: aiDecision.decision,
      ticketId
    });

  } catch (error) {
    console.error('Error in WhatsApp Pipeline:', error);
  }
});

module.exports = client;
