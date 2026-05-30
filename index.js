require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./src/lib/supabase');
const { startWhatsAppIngestion } = require('./src/services/whatsappIngestion');
const supabaseService = require('./src/services/supabaseService');
const aiService = require('./src/services/aiService');
const gmailService = require('./src/services/gmailService');
const whatsappNotifyService = require('./src/services/whatsappNotifyService');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Pipeline xử lý tin nhắn inbound
async function processInboundMessage(event) {
  const { messageId, chatId, text, senderName, chatTranscript } = event;
  
  try {
    // 1. Upsert Client
    await supabaseService.upsertClient(chatId, senderName);

    // 2. Get Context
    const ticketsContext = await supabaseService.getOpenTicketsContext(chatId);

    // 3. AI Decision
    console.log(`[AI] Analyzing message from ${senderName}...`);
    const aiDecision = await aiService.analyzeConversation(chatTranscript, ticketsContext, senderName);
    console.log(`[AI] Decision: ${aiDecision.decision}`);

    let ticketId = null;

    // 4. Create Ticket if needed
    if (aiDecision.decision === 'CREATE_SUBTASK') {
      const ticket = await supabaseService.createTicket({
        chatId,
        clientName: senderName,
        summary: aiDecision.summary,
        description: aiDecision.description,
        priority: aiDecision.priority,
        aiReason: aiDecision.reason,
        assigneeId: aiDecision.assignee_id,
        assigneeName: aiDecision.assignee_name
      });

      if (ticket) {
        ticketId = ticket.id;
        // Notifications
        await whatsappNotifyService.sendInternalAlert(waClient, ticket);
        await gmailService.sendTicketAlert(ticket);
        await whatsappNotifyService.sendClientConfirmation(waClient, chatId, senderName, ticket.id);
        await supabaseService.logAnalyticsEvent('ticket_created', { ticketId, chatId });
      }
    } else {
      await supabaseService.logAnalyticsEvent('conversation_ignored', { chatId, reason: aiDecision.reason });
    }

    // 5. Save Conversation
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
    console.error('[Pipeline Error]', error);
  }
}

// REST API Endpoints
app.get('/ping', (req, res) => res.json({ status: 'ok' }));

app.get('/api/analytics/overview', async (req, res) => {
  try {
    const { count: totalConversations } = await supabase.from('conversations').select('*', { count: 'exact', head: true });
    const { count: totalTickets } = await supabase.from('tickets').select('*', { count: 'exact', head: true });
    const { count: activeClients } = await supabase.from('clients').select('*', { count: 'exact', head: true });
    const { data: decisions } = await supabase.from('conversations').select('ai_decision');
    const byDecision = { CREATE_SUBTASK: 0, COMMENT: 0, IGNORE: 0 };
    decisions?.forEach(d => { if (byDecision[d.ai_decision] !== undefined) byDecision[d.ai_decision]++; });
    res.json({ totalConversations: totalConversations || 0, totalTickets: totalTickets || 0, activeClients: activeClients || 0, byDecision });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/tickets', async (req, res) => {
  const { data } = await supabase.from('tickets').select('*').order('created_at', { ascending: false }).limit(req.query.limit || 50);
  res.json({ data });
});

app.get('/api/conversations', async (req, res) => {
  const { data } = await supabase.from('conversations').select('*').order('created_at', { ascending: false }).limit(req.query.limit || 50);
  res.json({ data });
});

app.get('/api/clients', async (req, res) => {
  const { data } = await supabase.from('clients').select('*').order('last_seen_at', { ascending: false });
  res.json({ data });
});

app.put('/api/tickets/:id/status', async (req, res) => {
  const ticket = await supabaseService.updateTicketStatus(req.params.id, req.body.status);
  res.json({ success: !!ticket, ticket });
});

app.post('/api/clients', async (req, res) => {
  const client = await supabaseService.addVipClient(req.body.chat_id, req.body.display_name);
  res.json({ success: !!client, client });
});

app.post('/api/conversations/send', async (req, res) => {
  try {
    const { chatId, text } = req.body;
    await waClient.sendMessage(chatId, text);
    await supabaseService.saveConversation({ chatId, clientName: 'System', messageId: `out_${Date.now()}`, direction: 'outbound', text, aiDecision: 'IGNORE' });
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

let waClient;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  
  const vipMode = (process.env.VIP_MODE || 'strict').toLowerCase();
  const isVipCheck = vipMode === 'allow_all' ? async () => true : supabaseService.isVipClient;

  const { client } = startWhatsAppIngestion({
    authPath: process.env.WA_AUTH_PATH || './.wwebjs_auth',
    isVipClient: isVipCheck,
    shouldContinueForMessageId: supabaseService.isDuplicateMessage.then ? 
      (id) => supabaseService.isDuplicateMessage(id).then(dup => !dup) : 
      async (id) => !(await supabaseService.isDuplicateMessage(id)),
    onEvent: processInboundMessage,
    transcriptLimit: parseInt(process.env.WA_TRANSCRIPT_LIMIT) || 20
  });
  
  waClient = client;
});
