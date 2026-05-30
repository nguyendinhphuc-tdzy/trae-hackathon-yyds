// Unified Data API Agent for DantaLabs Support Automation Dashboard
// Supports local in-memory Mock State OR real Backend REST Endpoint mapping.

import { mockOverview, mockClients, mockTickets, mockConversations } from './mock-data.js';

export const CONFIG = {
  useMock: false, // Switch to FALSE to wire directly into the Node.js Express backend
  backendUrl: 'http://localhost:3000'
};

// --- In-Memory State for Interactive Mock Demos ---
const state = {
  overview: { ...mockOverview },
  clients: [ ...mockClients ],
  tickets: [ ...mockTickets ],
  conversations: [ ...mockConversations ]
};

// Helper: Simulate minor network latency for premium loaders feeling
const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // 1. Get overview stats (KPIs)
  async getOverview() {
    await delay();
    if (CONFIG.useMock) {
      // Dynamically calculate numbers based on state changes during runtime
      const totalConversations = state.conversations.filter(c => c.direction !== 'system').length;
      const totalTickets = state.tickets.length;
      const activeClients = state.clients.length;
      const byDecision = state.conversations.reduce((acc, c) => {
        if (c.aiDecision && c.direction === 'inbound') {
          acc[c.aiDecision] = (acc[c.aiDecision] || 0) + 1;
        }
        return acc;
      }, { CREATE_SUBTASK: 0, COMMENT: 0, IGNORE: 0 });

      // Add comments from historical mock
      byDecision.CREATE_SUBTASK = state.tickets.length;
      byDecision.COMMENT = 34; // static backdrop for variety
      byDecision.IGNORE = state.conversations.filter(c => c.aiDecision === 'IGNORE' && c.direction === 'inbound').length + 76;

      return {
        totalConversations,
        totalTickets,
        activeClients,
        byDecision
      };
    } else {
      const res = await fetch(`${CONFIG.backendUrl}/api/analytics/overview`);
      return await res.json();
    }
  },

  // 2. Get all tickets
  async getTickets() {
    await delay();
    if (CONFIG.useMock) {
      // Return sorted by created_at desc
      return [ ...state.tickets ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      const res = await fetch(`${CONFIG.backendUrl}/api/tickets?limit=50`);
      const body = await res.json();
      return body.data || body;
    }
  },

  // 3. Update ticket status
  async updateTicketStatus(ticketId, newStatus) {
    await delay(300);
    if (CONFIG.useMock) {
      const ticket = state.tickets.find(t => t.id === parseInt(ticketId));
      if (ticket) {
        ticket.status = newStatus;
        ticket.updated_at = new Date().toISOString();
        
        // Add a system log inside the conversation as well!
        const logId = `sys_upd_${Date.now()}`;
        state.conversations.push({
          id: logId,
          chat_id: ticket.chat_id,
          client_name: "Hệ thống",
          text: `[Ops Action] Trạng thái ticket #${ticket.jira_key || ticket.id} chuyển thành: ${newStatus}`,
          direction: "system",
          aiDecision: "IGNORE",
          created_at: new Date().toISOString()
        });
        return { success: true, ticket };
      }
      return { success: false, error: 'Ticket not found' };
    } else {
      const res = await fetch(`${CONFIG.backendUrl}/api/tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      return await res.json();
    }
  },

  // 4. Get all conversations (chat feeds)
  async getConversations() {
    await delay();
    if (CONFIG.useMock) {
      return [ ...state.conversations ];
    } else {
      const res = await fetch(`${CONFIG.backendUrl}/api/conversations?limit=100`);
      const body = await res.json();
      return body.data || body;
    }
  },

  // 5. Simulate sending a mock outbound reply to a client
  async sendMessage(chatId, text) {
    await delay(200);
    if (CONFIG.useMock) {
      const client = state.clients.find(c => c.chat_id === chatId);
      const displayName = client ? client.display_name : "Khách hàng";

      const newMsg = {
        id: `out_${Date.now()}`,
        chat_id: chatId,
        client_name: "Danta Labs Autoreply",
        text: text,
        direction: "outbound",
        aiDecision: "IGNORE",
        created_at: new Date().toISOString()
      };
      
      state.conversations.push(newMsg);

      // Update client last_seen
      if (client) {
        client.last_seen_at = new Date().toISOString();
      }

      return { success: true, message: newMsg };
    } else {
      // Map to real backend send message endpoint if supported
      const res = await fetch(`${CONFIG.backendUrl}/api/conversations/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, text })
      });
      return await res.json();
    }
  },

  // 6. Get VIP clients Whitelist
  async getClients() {
    await delay();
    if (CONFIG.useMock) {
      return [ ...state.clients ];
    } else {
      const res = await fetch(`${CONFIG.backendUrl}/api/clients`);
      const body = await res.json();
      return body.data || body;
    }
  },

  // 7. Add a new VIP Client
  async addClient(chatId, displayName, assigneeName) {
    await delay(400);
    if (CONFIG.useMock) {
      // Validate duplicates
      if (state.clients.some(c => c.chat_id === chatId)) {
        return { success: false, error: 'Khách hàng này đã tồn tại trong Whitelist!' };
      }

      const assigneeIds = {
        Phuc: "7120c0000000000000000001",
        Tram: "7120c0000000000000000002",
        Vy: "7120c0000000000000000003"
      };

      const newClient = {
        chat_id: chatId.includes('@') ? chatId : `${chatId}@c.us`,
        display_name: displayName,
        ticket_count: 0,
        assignee_id: assigneeIds[assigneeName] || assigneeIds.Phuc,
        assignee_name: assigneeName,
        last_seen_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      };

      state.clients.push(newClient);
      
      // Seed a welcome message for active feel
      state.conversations.push({
        id: `sys_seed_${Date.now()}`,
        chat_id: newClient.chat_id,
        client_name: "Hệ thống",
        text: `[Hệ thống] Số điện thoại ${newClient.chat_id} đã được thêm thành công vào whitelist bảo vệ VIP.`,
        direction: "system",
        aiDecision: "IGNORE",
        created_at: new Date().toISOString()
      });

      return { success: true, client: newClient };
    } else {
      const res = await fetch(`${CONFIG.backendUrl}/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, display_name: displayName, assignee_name: assigneeName })
      });
      return await res.json();
    }
  }
};
