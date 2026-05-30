require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./src/lib/supabase');
const whatsappClient = require('./src/services/whatsappIngestion');
const supabaseService = require('./src/services/supabaseService');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Healthcheck
app.get('/ping', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API 1: Lấy thống kê tổng quan (Dashboard Overview)
app.get('/api/analytics/overview', async (req, res) => {
  try {
    const { count: totalConversations } = await supabase.from('conversations').select('*', { count: 'exact', head: true });
    const { count: totalTickets } = await supabase.from('tickets').select('*', { count: 'exact', head: true });
    const { count: activeClients } = await supabase.from('clients').select('*', { count: 'exact', head: true });
    
    const { data: decisions } = await supabase.from('conversations').select('ai_decision');
    const byDecision = { CREATE_SUBTASK: 0, COMMENT: 0, IGNORE: 0 };
    decisions.forEach(d => {
      if (byDecision[d.ai_decision] !== undefined) byDecision[d.ai_decision]++;
    });

    res.json({
      totalConversations: totalConversations || 0,
      totalTickets: totalTickets || 0,
      activeClients: activeClients || 0,
      byDecision
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API 2: Danh sách Tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API 3: Danh sách Hội thoại (Conversations)
app.get('/api/conversations', async (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API 4: Danh sách khách hàng VIP (VIP Clients)
app.get('/api/clients', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('last_seen_at', { ascending: false });
    
    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API 5: Cập nhật trạng thái Ticket
app.put('/api/tickets/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const ticket = await supabaseService.updateTicketStatus(id, status);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API 6: Gửi tin nhắn WhatsApp từ Dashboard
app.post('/api/conversations/send', async (req, res) => {
  try {
    const { chatId, text } = req.body;
    await whatsappClient.sendMessage(chatId, text);
    
    // Lưu vào DB
    await supabaseService.saveConversation({
      chatId,
      clientName: 'Danta Labs Autoreply',
      messageId: `out_dash_${Date.now()}`,
      direction: 'outbound',
      text,
      aiDecision: 'IGNORE'
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API 7: Thêm VIP Client mới
app.post('/api/clients', async (req, res) => {
  try {
    const { chat_id, display_name } = req.body;
    const client = await supabaseService.addVipClient(chat_id, display_name);
    if (!client) return res.status(400).json({ error: 'Failed to add client or client already exists' });
    res.json({ success: true, client });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Khởi chạy Server
app.listen(PORT, () => {
  console.log(`Backend Engine running on port ${PORT}`);
  
  // Khởi chạy WhatsApp Client
  whatsappClient.initialize().catch(err => {
    console.error('Failed to initialize WhatsApp Client:', err);
  });
});
