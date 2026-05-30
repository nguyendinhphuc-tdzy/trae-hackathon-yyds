// Inbox Chat Component for DantaLabs Dashboard

import { apiService } from '../api.js';

let activeChatId = null;
let allClients = [];
let allConvs = [];

export async function renderInbox(options = {}) {
  const container = document.getElementById('view-inbox');
  if (!container) return;

  // Set default active chat if passed in options
  if (options.activeChatId) {
    activeChatId = options.activeChatId;
  }

  // Visual skeleton loader
  container.innerHTML = `
    <div class="inbox-container">
      <div class="glass-panel" style="height: 100%; animation: pulse 1.5s infinite ease-in-out;"></div>
      <div class="glass-panel" style="height: 100%; animation: pulse 1.5s infinite ease-in-out;"></div>
    </div>
  `;

  try {
    allClients = await apiService.getClients();
    allConvs = await apiService.getConversations();

    // If no chat is active, pick the first one that has conversations
    if (!activeChatId && allClients.length > 0) {
      activeChatId = allClients[0].chat_id;
    }

    container.innerHTML = `
      <div class="inbox-container">
        <!-- Sidebar Left: Threads -->
        <div class="inbox-sidebar">
          <div class="glass-panel" style="flex-grow: 1; display: flex; flex-direction: column; gap: 1rem; overflow: hidden; padding: 1rem;">
            <div class="glass-panel-title" style="margin-bottom: 0.5rem;">Danh sách hội thoại</div>
            
            <div class="chat-threads-list" id="inbox-threads-container">
              <!-- Thread items insertion -->
            </div>
          </div>
        </div>

        <!-- Right Side: Chat Message Pane -->
        <div class="inbox-chatpane glass-panel" id="inbox-chatpane-container" style="padding: 0; overflow: hidden;">
          <!-- Active chat view loads here -->
        </div>
      </div>
    `;

    renderThreadsList();
    renderChatPane();

  } catch (err) {
    console.error("Lỗi render Inbox: ", err);
    container.innerHTML = `<div class="glass-panel" style="color: var(--color-danger); text-align: center;">Lỗi tải cấu phần Hộp Thư Chat.</div>`;
  }
}

function renderThreadsList() {
  const threadsContainer = document.getElementById('inbox-threads-container');
  if (!threadsContainer) return;

  if (allClients.length === 0) {
    threadsContainer.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--color-muted); font-size: 0.85rem;">Không có số bảo vệ nào</div>`;
    return;
  }

  threadsContainer.innerHTML = allClients.map(client => {
    // Find last message in thread
    const clientMsgs = allConvs.filter(c => c.chat_id === client.chat_id && c.direction !== 'system');
    const lastMsg = clientMsgs[clientMsgs.length - 1] || { text: 'Không có tin nhắn', created_at: client.created_at };
    
    // Find last AI decision
    const lastInboundMsg = allConvs.filter(c => c.chat_id === client.chat_id && c.direction === 'inbound').pop();
    const decision = lastInboundMsg ? lastInboundMsg.aiDecision : 'IGNORE';

    const initial = client.display_name ? client.display_name.charAt(0) : '?';
    const avatarClass = `avatar-${Math.abs(client.chat_id.charCodeAt(0) + client.chat_id.charCodeAt(1)) % 8}`;
    const relativeTime = getRelativeTime(lastMsg.created_at);

    return `
      <div class="chat-thread-card ${activeChatId === client.chat_id ? 'active' : ''}" data-chat-id="${client.chat_id}">
        <div class="thread-avatar ${avatarClass}">${initial}</div>
        <div class="thread-info">
          <div class="thread-header">
            <span class="thread-name">${client.display_name}</span>
            <span class="thread-time">${relativeTime}</span>
          </div>
          <span class="thread-snippet" title="${lastMsg.text}">${lastMsg.text}</span>
        </div>
        <div class="thread-meta">
          <span class="thread-badge ${decision === 'CREATE_SUBTASK' ? 'ticket' : 'ignore'}">
            ${decision === 'CREATE_SUBTASK' ? 'TICKET' : 'IGNORE'}
          </span>
        </div>
      </div>
    `;
  }).join('');

  // Bind thread clicks
  threadsContainer.querySelectorAll('.chat-thread-card').forEach(card => {
    card.addEventListener('click', () => {
      activeChatId = card.getAttribute('data-chat-id');
      
      // Update thread highlights immediately
      threadsContainer.querySelectorAll('.chat-thread-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      renderChatPane();
    });
  });
}

async function renderChatPane() {
  const chatPane = document.getElementById('inbox-chatpane-container');
  if (!chatPane) return;

  if (!activeChatId) {
    chatPane.innerHTML = `
      <div class="chatpane-empty">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>Chọn một hội thoại để giám sát quyết định của AI</span>
      </div>
    `;
    return;
  }

  const client = allClients.find(c => c.chat_id === activeChatId);
  if (!client) return;

  // Filter messages for active chat
  const chatMessages = allConvs.filter(c => c.chat_id === activeChatId);

  // Retrieve Gemini current decision state
  const lastInboundMsg = chatMessages.filter(c => c.direction === 'inbound').pop();
  const decision = lastInboundMsg ? lastInboundMsg.aiDecision : 'IGNORE';

  // Get matching ticket reason if decision was to create ticket
  let aiReason = "Số điện thoại nằm trong whitelist. Đang lắng nghe cuộc hội thoại...";
  if (decision === 'CREATE_SUBTASK') {
    // Find matching ticket description/reason
    const matchingTkt = (await apiService.getTickets()).find(t => t.chat_id === activeChatId);
    if (matchingTkt) {
      aiReason = matchingTkt.ai_reason;
    } else {
      aiReason = "Khách hàng báo cáo yêu cầu hành động nghiệp vụ thực tế, tự động mở rộng Subtask.";
    }
  } else {
    aiReason = "Tin nhắn mang tính chất chào hỏi, xã giao hoặc không actionable. AI bỏ qua.";
  }

  // Draw chat layout
  chatPane.innerHTML = `
    <!-- Header -->
    <div class="chatpane-header">
      <div class="chatpane-client-profile">
        <div class="ops-avatar avatar-cyan" style="width:38px; height:38px; font-weight:700; border: none; box-shadow: none;">${client.display_name.charAt(0)}</div>
        <div style="display: flex; flex-direction: column; line-height: 1.2;">
          <span class="chatpane-name">${client.display_name}</span>
          <span class="chatpane-phone">${client.chat_id}</span>
        </div>
      </div>

      <div class="chatpane-ai-decision">
        <div class="chatpane-ai-decision-card">
          <span class="status-dot-pulse" style="background-color: ${decision === 'CREATE_SUBTASK' ? 'var(--color-success)' : 'var(--color-muted)'}; box-shadow: 0 0 6px ${decision === 'CREATE_SUBTASK' ? 'var(--color-success)' : 'var(--color-muted)'}"></span>
          <span class="chatpane-ai-label">QUYẾT ĐỊNH AI:</span>
          <span class="chatpane-ai-desc" title="${aiReason}">${decision === 'CREATE_SUBTASK' ? 'CREATE_SUBTASK (Mở ticket)' : 'IGNORE (Bỏ qua)'}</span>
        </div>
      </div>
    </div>

    <!-- Messages Window -->
    <div class="chat-messages-container" id="chat-messages-window">
      ${chatMessages.map(msg => {
        if (msg.direction === 'system') {
          return `
            <div class="message-system-log">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <span>${msg.text}</span>
            </div>
          `;
        }

        const isOut = msg.direction === 'outbound';
        const msgTime = new Date(msg.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        
        return `
          <div class="message-bubble-wrapper ${isOut ? 'outbound' : 'inbound'}">
            <div class="message-bubble">
              ${msg.text}
            </div>
            <div class="message-meta">
              <span>${msg.client_name}</span> • <span>${msgTime}</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Bottom Outbound Reply Box -->
    <div class="chat-input-container">
      <form id="chat-reply-form" style="width: 100%;">
        <input type="text" class="form-control chat-input-field" id="chat-reply-input" placeholder="Nhập tin nhắn phản hồi thủ công về nhóm WhatsApp..." required>
        <button class="btn btn-primary" type="submit" id="chat-send-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; transform: rotate(45deg);"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          Gửi
        </button>
      </form>
    </div>
  `;

  // Scroll to bottom
  const windowEl = document.getElementById('chat-messages-window');
  if (windowEl) {
    windowEl.scrollTop = windowEl.scrollHeight;
  }

  // Handle send message form
  const form = document.getElementById('chat-reply-form');
  const input = document.getElementById('chat-reply-input');
  const sendBtn = document.getElementById('chat-send-btn');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    sendBtn.disabled = true;
    sendBtn.innerHTML = 'Gửi...';

    try {
      const res = await apiService.sendMessage(activeChatId, text);
      if (res.success) {
        input.value = '';
        
        // Refresh conversations in background and update view
        allConvs = await apiService.getConversations();
        renderChatPane();
        renderThreadsList(); // updates threads snippet
      }
    } catch (err) {
      console.error("Lỗi gửi tin nhắn: ", err);
      alert("Đã xảy ra lỗi khi gửi tin nhắn.");
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = 'Gửi';
    }
  });
}

function getRelativeTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'vừa xong';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${diffDays}d`;
}
