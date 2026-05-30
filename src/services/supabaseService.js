const supabase = require('../lib/supabase');

const supabaseService = {
  // 1. Kiểm tra VIP Client
  async isVipClient(chatId) {
    if (process.env.VIP_MODE === 'allow_all') return true;
    
    const { data, error } = await supabase
      .from('vip_clients')
      .select('chat_id')
      .eq('chat_id', chatId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error checking VIP client:', error);
      return false;
    }
    return !!data;
  },

  // 2. Kiểm tra trùng lặp tin nhắn (Idempotency)
  async isDuplicateMessage(messageId) {
    const { data, error } = await supabase
      .from('event_logs')
      .select('message_id')
      .eq('message_id', messageId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error checking duplicate message:', error);
      return false;
    }
    return !!data;
  },

  // 3. Log event xử lý tin nhắn
  async logMessageEvent(messageId) {
    const { error } = await supabase
      .from('event_logs')
      .insert([{ message_id: messageId }]);
    
    if (error) console.error('Error logging message event:', error);
  },

  // 4. Lấy lịch sử ticket đang mở để làm ngữ cảnh cho AI
  async getOpenTicketsContext(chatId) {
    const { data, error } = await supabase
      .from('tickets')
      .select('id, summary, description, status')
      .eq('chat_id', chatId)
      .neq('status', 'Done')
      .neq('status', 'Closed')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching open tickets:', error);
      return '';
    }

    return data.map(t => `- [ID: ${t.id.substring(0, 8)}] ${t.summary}: ${t.status}`).join('\n');
  },

  async getLatestOpenTicketId(chatId) {
    const { data, error } = await supabase
      .from('tickets')
      .select('id')
      .eq('chat_id', chatId)
      .neq('status', 'Done')
      .neq('status', 'Closed')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching latest open ticket:', error);
      return null;
    }

    return data?.id || null;
  },

  // 5. Lưu hoặc cập nhật thông tin Client
  async upsertClient(chatId, displayName) {
    const { data, error } = await supabase
      .from('clients')
      .upsert({ 
        chat_id: chatId, 
        display_name: displayName,
        last_seen_at: new Date().toISOString()
      }, { onConflict: 'chat_id' })
      .select()
      .single();

    if (error) console.error('Error upserting client:', error);
    return data;
  },

  // 6. Lưu hội thoại
  async saveConversation({ chatId, clientName, messageId, direction, text, aiDecision, ticketId }) {
    const { error } = await supabase
      .from('conversations')
      .insert([{
        chat_id: chatId,
        client_name: clientName,
        message_id: messageId,
        direction,
        text,
        ai_decision: aiDecision,
        ticket_id: ticketId
      }]);
    
    if (error) console.error('Error saving conversation:', error);
  },

  // 7. Tạo Ticket mới
  async createTicket({ chatId, clientName, summary, description, priority, aiReason, assigneeId, assigneeName }) {
    const { data, error } = await supabase
      .from('tickets')
      .insert([{
        chat_id: chatId,
        client_name: clientName,
        summary,
        description,
        priority,
        status: 'Open',
        ai_reason: aiReason,
        assignee_id: assigneeId,
        assignee_name: assigneeName
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating ticket in DB:', error);
      return null;
    }

    // Tăng ticket_count cho client
    await supabase.rpc('increment_ticket_count', { client_chat_id: chatId });

    return data;
  },

  // 8. Log Analytics Event
  async logAnalyticsEvent(eventType, metadata = {}) {
    const { error } = await supabase
      .from('analytics_events')
      .insert([{ event_type: eventType, metadata }]);
    
    if (error) console.error('Error logging analytics event:', error);
  },

  // 9. Cập nhật trạng thái Ticket
  async updateTicketStatus(ticketId, status) {
    const { data, error } = await supabase
      .from('tickets')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', ticketId)
      .select()
      .single();

    if (error) {
      console.error('Error updating ticket status:', error);
      return null;
    }
    return data;
  },

  // 10. Thêm VIP Client mới
  async addVipClient(chatId, displayName) {
    const { data, error } = await supabase
      .from('vip_clients')
      .insert([{ chat_id: chatId }])
      .select()
      .single();

    if (error) {
      console.error('Error adding VIP client:', error);
      return null;
    }

    // Đồng thời tạo record bên bảng clients
    await this.upsertClient(chatId, displayName);
    
    return data;
  }
};

module.exports = supabaseService;
