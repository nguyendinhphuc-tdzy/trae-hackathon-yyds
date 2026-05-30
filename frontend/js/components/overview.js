// Overview UI Component for DantaLabs Dashboard

import { apiService } from '../api.js';

export async function renderOverview(onTabChange, onAddClient) {
  const container = document.getElementById('view-overview');
  if (!container) return;

  // Render a premium glass loading skeleton first
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div class="overview-grid">
        ${Array(4).fill(0).map(() => `
          <div class="glass-panel kpi-card" style="height: 100px; animation: pulse 1.5s infinite ease-in-out;">
            <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.03); border-radius: 8px;"></div>
            <div style="display: flex; flex-direction: column; gap: 8px; flex-grow: 1;">
              <div style="height: 20px; width: 60%; background: rgba(255,255,255,0.03); border-radius: 4px;"></div>
              <div style="height: 12px; width: 40%; background: rgba(255,255,255,0.03); border-radius: 4px;"></div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="overview-content-split">
        <div class="glass-panel" style="height: 400px; animation: pulse 1.5s infinite ease-in-out;"></div>
        <div class="glass-panel" style="height: 400px; animation: pulse 1.5s infinite ease-in-out;"></div>
      </div>
    </div>
  `;

  try {
    // Asynchronously fetch stats, tickets, and conversations
    const [stats, tickets, conversations] = await Promise.all([
      apiService.getOverview(),
      apiService.getTickets(),
      apiService.getConversations()
    ]);

    // Format metrics variables
    const activeVips = stats.activeClients;
    const totalConvs = stats.totalConversations;
    const totalTkts = stats.totalTickets;
    const ignoredCount = stats.byDecision.IGNORE;

    // Filter conversations to inbound messages from clients to render a clean feed
    const recentConvs = conversations
      .filter(c => c.direction === 'inbound')
      .slice(-5)
      .reverse();

    // Filter tickets to recent 5 items
    const recentTkts = tickets.slice(0, 5);

    // Build the structural HTML
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <!-- Grid layout for 4 KPI Cards -->
        <div class="overview-grid">
          <!-- Card 1: Total Conversations -->
          <div class="glass-panel kpi-card indigo">
            <div class="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <div class="kpi-details">
              <span class="kpi-value">${totalConvs}</span>
              <span class="kpi-title">Hội thoại WhatsApp</span>
            </div>
          </div>

          <!-- Card 2: Tickets Created -->
          <div class="glass-panel kpi-card emerald">
            <div class="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 14h6"/><path d="M9 10h6"/></svg>
            </div>
            <div class="kpi-details">
              <span class="kpi-value">${totalTkts}</span>
              <span class="kpi-title">Tickets đã tạo (Jira)</span>
            </div>
          </div>

          <!-- Card 3: Active VIP Clients -->
          <div class="glass-panel kpi-card amber">
            <div class="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg>
            </div>
            <div class="kpi-details">
              <span class="kpi-value">${activeVips}</span>
              <span class="kpi-title">Khách hàng VIP</span>
            </div>
          </div>

          <!-- Card 4: Ignored Conversations -->
          <div class="glass-panel kpi-card gray">
            <div class="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            </div>
            <div class="kpi-details">
              <span class="kpi-value">${ignoredCount}</span>
              <span class="kpi-title">Tin nhắn chào hỏi/Spam</span>
            </div>
          </div>
        </div>

        <!-- Split Content (Conversations & Tickets feeds) -->
        <div class="overview-content-split">
          <!-- Recent Chat Feed -->
          <div class="glass-panel">
            <div class="glass-panel-title">
              <span>Hội thoại mới nhận</span>
              <button class="btn btn-secondary btn-icon" id="ov-view-inbox-btn" title="Đi tới Hộp thư chat">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
            <div class="feed-list">
              ${recentConvs.length === 0 ? `<div style="text-align: center; padding: 2rem; color: var(--color-muted);">Không có hội thoại gần đây</div>` : 
                recentConvs.map((conv, idx) => {
                  const initial = conv.client_name ? conv.client_name.charAt(0) : '?';
                  const avatarClass = `avatar-${Math.abs(conv.chat_id.charCodeAt(0) + conv.chat_id.charCodeAt(1)) % 8}`;
                  const relativeTime = getRelativeTime(conv.created_at);
                  const isTicket = conv.aiDecision === 'CREATE_SUBTASK';
                  
                  return `
                    <div class="feed-item" data-chat-id="${conv.chat_id}">
                      <div class="feed-item-left">
                        <div class="feed-avatar ${avatarClass}">${initial}</div>
                        <div class="feed-details">
                          <span class="feed-name">${conv.client_name}</span>
                          <span class="feed-snippet" title="${conv.text}">${conv.text}</span>
                        </div>
                      </div>
                      <div class="feed-item-right">
                        <span class="feed-time">${relativeTime}</span>
                        <span class="badge ${isTicket ? 'badge-success' : 'badge-muted'}" style="font-size: 0.62rem; padding: 0.15rem 0.45rem;">
                          ${isTicket ? 'CREATE TICKET' : 'IGNORED'}
                        </span>
                      </div>
                    </div>
                  `;
                }).join('')
              }
            </div>
          </div>

          <!-- Recent Auto-Created Tickets -->
          <div class="glass-panel">
            <div class="glass-panel-title">
              <span>Ticket AI vừa tạo lập (Jira)</span>
              <button class="btn btn-secondary btn-icon" id="ov-view-tickets-btn" title="Đi tới Quản lý Tickets">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
            <div class="feed-list">
              ${recentTkts.length === 0 ? `<div style="text-align: center; padding: 2rem; color: var(--color-muted);">Không có ticket gần đây</div>` :
                recentTkts.map(tkt => {
                  const pBadge = tkt.priority === 'High' ? 'badge-danger' : 'badge-warning';
                  let sBadge = 'badge-muted';
                  if (tkt.status === 'In Progress') sBadge = 'badge-warning';
                  if (tkt.status === 'Resolved' || tkt.status === 'Done') sBadge = 'badge-success';

                  return `
                    <div class="feed-item" data-ticket-id="${tkt.id}">
                      <div class="feed-item-left">
                        <div class="kpi-icon" style="width: 36px; height: 36px; min-width: 36px; padding: 0; background: rgba(99,102,241,0.06); border-color: rgba(99,102,241,0.1); color: var(--accent-primary)">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 18px; height: 18px;"><path d="M9 12h6M9 16h6M4 4h16v16H4z"/></svg>
                        </div>
                        <div class="feed-details">
                          <span class="feed-name">${tkt.summary}</span>
                          <span class="feed-snippet">Khách gửi: ${tkt.client_name} • Key: ${tkt.jira_key || `#${tkt.id}`}</span>
                        </div>
                      </div>
                      <div class="feed-item-right">
                        <span class="badge ${pBadge}" style="font-size: 0.62rem; padding: 0.15rem 0.45rem;">${tkt.priority}</span>
                        <span class="badge ${sBadge}" style="font-size: 0.62rem; padding: 0.15rem 0.45rem; margin-top: 0.25rem;">${tkt.status}</span>
                      </div>
                    </div>
                  `;
                }).join('')
              }
            </div>
          </div>
        </div>

        <!-- Quick actions strip -->
        <div class="glass-panel">
          <div class="glass-panel-title" style="margin-bottom: 0.85rem;">Thao tác nhanh hệ thống</div>
          <div class="quick-actions-strip">
            <button class="btn btn-primary" id="qa-inbox-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Mở Hộp Thư Chat
            </button>
            <button class="btn btn-secondary" id="qa-tickets-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/></svg>
              Quản Lý Subtasks Jira
            </button>
            <button class="btn btn-secondary" id="qa-addclient-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              Thêm Khách Hàng VIP
            </button>
          </div>
        </div>

      </div>
    `;

    // Bind event actions
    document.getElementById('ov-view-inbox-btn')?.addEventListener('click', () => onTabChange('inbox'));
    document.getElementById('ov-view-tickets-btn')?.addEventListener('click', () => onTabChange('tickets'));
    
    document.getElementById('qa-inbox-btn')?.addEventListener('click', () => onTabChange('inbox'));
    document.getElementById('qa-tickets-btn')?.addEventListener('click', () => onTabChange('tickets'));
    document.getElementById('qa-addclient-btn')?.addEventListener('click', onAddClient);

    // Bind quick feed routing
    container.querySelectorAll('.feed-item[data-chat-id]').forEach(item => {
      item.addEventListener('click', () => {
        const chatId = item.getAttribute('data-chat-id');
        onTabChange('inbox', { activeChatId: chatId });
      });
    });

    container.querySelectorAll('.feed-item[data-ticket-id]').forEach(item => {
      item.addEventListener('click', () => {
        const ticketId = item.getAttribute('data-ticket-id');
        onTabChange('tickets', { activeTicketId: ticketId });
      });
    });

  } catch (err) {
    console.error("Lỗi vẽ Overview: ", err);
    container.innerHTML = `<div class="glass-panel" style="color: var(--color-danger); text-align: center;">Đã xảy ra lỗi khi tải dữ liệu tổng quan.</div>`;
  }
}

// Convert relative timestamp helper
function getRelativeTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Vừa xong';
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  return `${diffDays} ngày trước`;
}
