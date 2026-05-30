// Tickets Management Component for DantaLabs Dashboard

import { apiService } from '../api.js';

let allTickets = [];
let filteredTickets = [];
let currentFilters = {
  query: '',
  priority: 'All',
  status: 'All'
};

export async function renderTickets(options = {}) {
  const container = document.getElementById('view-tickets');
  if (!container) return;

  // Initial Loading Layout
  container.innerHTML = `
    <div class="glass-panel" style="height: 500px; display: flex; align-items: center; justify-content: center; animation: pulse 1.5s infinite ease-in-out;">
      <span style="color: var(--color-muted);">Đang tải danh sách Jira Tickets...</span>
    </div>
  `;

  try {
    allTickets = await apiService.getTickets();
    applyFilters();

    // Render structural container
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Advanced Filters Bar -->
        <div class="glass-panel tickets-filter-bar">
          <div class="search-input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="form-control" id="tkt-search-input" placeholder="Tìm kiếm theo tiêu đề hoặc tên khách hàng..." value="${currentFilters.query}">
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <select class="form-control" id="tkt-priority-filter">
              <option value="All" ${currentFilters.priority === 'All' ? 'selected' : ''}>Mọi độ ưu tiên</option>
              <option value="High" ${currentFilters.priority === 'High' ? 'selected' : ''}>High</option>
              <option value="Medium" ${currentFilters.priority === 'Medium' ? 'selected' : ''}>Medium</option>
              <option value="Low" ${currentFilters.priority === 'Low' ? 'selected' : ''}>Low</option>
            </select>

            <select class="form-control" id="tkt-status-filter">
              <option value="All" ${currentFilters.status === 'All' ? 'selected' : ''}>Mọi trạng thái</option>
              <option value="Open" ${currentFilters.status === 'Open' ? 'selected' : ''}>Open</option>
              <option value="In Progress" ${currentFilters.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Resolved" ${currentFilters.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
            </select>
          </div>
        </div>

        <!-- Tickets Table Card -->
        <div class="glass-panel" style="padding: 0; overflow: hidden;">
          <div class="custom-table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th style="width: 80px; padding-left: 1.5rem;">Jira Key</th>
                  <th>Tiêu đề Ticket</th>
                  <th>Khách gửi (WhatsApp)</th>
                  <th>Phân công</th>
                  <th style="width: 120px;">Độ ưu tiên</th>
                  <th style="width: 120px;">Trạng thái</th>
                  <th style="width: 130px; padding-right: 1.5rem;">Thời gian tạo</th>
                </tr>
              </thead>
              <tbody id="tickets-table-body">
                <!-- Row insertions here -->
              </tbody>
            </table>
          </div>
          <div id="tickets-empty-state" style="display: none; text-align: center; padding: 4rem; color: var(--color-muted);">
            Không tìm thấy ticket nào khớp với bộ lọc.
          </div>
        </div>
      </div>
    `;

    renderTableRows();
    bindFilterEvents();

    // If options contain an activeTicketId, slide open that drawer immediately!
    if (options.activeTicketId) {
      const targetTkt = allTickets.find(t => t.id === parseInt(options.activeTicketId));
      if (targetTkt) {
        showTicketDrawer(targetTkt);
      }
    }

  } catch (err) {
    console.error("Lỗi render Tickets: ", err);
    container.innerHTML = `<div class="glass-panel" style="color: var(--color-danger); text-align: center;">Lỗi tải cấu phần Tickets.</div>`;
  }
}

function applyFilters() {
  filteredTickets = allTickets.filter(t => {
    const matchesQuery = t.summary.toLowerCase().includes(currentFilters.query.toLowerCase()) || 
                         t.client_name.toLowerCase().includes(currentFilters.query.toLowerCase()) ||
                         (t.jira_key && t.jira_key.toLowerCase().includes(currentFilters.query.toLowerCase()));
                         
    const matchesPriority = currentFilters.priority === 'All' || t.priority === currentFilters.priority;
    const matchesStatus = currentFilters.status === 'All' || t.status === currentFilters.status;

    return matchesQuery && matchesPriority && matchesStatus;
  });
}

function renderTableRows() {
  const tbody = document.getElementById('tickets-table-body');
  const emptyState = document.getElementById('tickets-empty-state');
  if (!tbody) return;

  if (filteredTickets.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  tbody.innerHTML = filteredTickets.map(t => {
    const pBadge = t.priority === 'High' ? 'badge-danger' : 'badge-warning';
    let sBadge = 'badge-muted';
    if (t.status === 'In Progress') sBadge = 'badge-warning';
    if (t.status === 'Resolved' || t.status === 'Done') sBadge = 'badge-success';

    const formattedDate = new Date(t.created_at).toLocaleString('vi-VN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <tr data-row-id="${t.id}">
        <td style="padding-left: 1.5rem; font-weight: 700; color: var(--accent-primary);">${t.jira_key || `#${t.id}`}</td>
        <td style="font-weight: 600; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.summary}</td>
        <td>${t.client_name}</td>
        <td style="font-weight: 500;">
          <span style="display: inline-flex; align-items: center; gap: 0.4rem;">
            <span style="width: 20px; height: 20px; border-radius: 50%; background: #475569; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: #fff; font-weight: 700;">${t.assignee_name.charAt(0)}</span>
            ${t.assignee_name}
          </span>
        </td>
        <td><span class="badge ${pBadge}">${t.priority}</span></td>
        <td><span class="badge ${sBadge}">${t.status}</span></td>
        <td style="color: var(--color-muted); padding-right: 1.5rem;">${formattedDate}</td>
      </tr>
    `;
  }).join('');

  // Bind row click drawers
  tbody.querySelectorAll('tr').forEach(row => {
    row.addEventListener('click', () => {
      const ticketId = row.getAttribute('data-row-id');
      const ticket = allTickets.find(t => t.id === parseInt(ticketId));
      if (ticket) showTicketDrawer(ticket);
    });
  });
}

function bindFilterEvents() {
  const searchInput = document.getElementById('tkt-search-input');
  const priorityFilter = document.getElementById('tkt-priority-filter');
  const statusFilter = document.getElementById('tkt-status-filter');

  searchInput?.addEventListener('input', (e) => {
    currentFilters.query = e.target.value;
    applyFilters();
    renderTableRows();
  });

  priorityFilter?.addEventListener('change', (e) => {
    currentFilters.priority = e.target.value;
    applyFilters();
    renderTableRows();
  });

  statusFilter?.addEventListener('change', (e) => {
    currentFilters.status = e.target.value;
    applyFilters();
    renderTableRows();
  });
}

// Slide-in right drawer visual logic
export function showTicketDrawer(ticket) {
  const backdrop = document.getElementById('ticket-drawer-backdrop');
  const drawer = document.getElementById('ticket-drawer');
  if (!backdrop || !drawer) return;

  const formattedDate = new Date(ticket.created_at).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  drawer.innerHTML = `
    <!-- Header -->
    <div class="drawer-header">
      <span class="drawer-title">Jira Ticket #${ticket.jira_key || ticket.id}</span>
      <button class="drawer-close" id="tkt-drawer-close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Scrollable Content -->
    <div class="drawer-content">
      
      <!-- Meta Information Grid -->
      <div class="drawer-meta-section">
        <div class="drawer-meta-item">
          <span class="drawer-meta-label">Người gửi</span>
          <span class="drawer-meta-value">${ticket.client_name}</span>
        </div>
        <div class="drawer-meta-item">
          <span class="drawer-meta-label">WhatsApp ID</span>
          <span class="drawer-meta-value" style="font-family: monospace; font-size: 0.75rem;">${ticket.chat_id}</span>
        </div>
        <div class="drawer-meta-item">
          <span class="drawer-meta-label">Người phụ trách</span>
          <span class="drawer-meta-value">${ticket.assignee_name}</span>
        </div>
        <div class="drawer-meta-item">
          <span class="drawer-meta-label">Thời gian tạo</span>
          <span class="drawer-meta-value">${formattedDate}</span>
        </div>
      </div>

      <!-- Summary -->
      <div class="drawer-text-section">
        <span class="drawer-text-label">Tiêu đề công việc</span>
        <h2 style="font-family: var(--font-family-title); font-weight: 700; color: #fff; font-size: 1.1rem; line-height: 1.4;">${ticket.summary}</h2>
      </div>

      <!-- Description Box -->
      <div class="drawer-text-section">
        <span class="drawer-text-label">Nội dung chi tiết yêu cầu</span>
        <div class="drawer-description-box">${ticket.description}</div>
      </div>

      <!-- AI Reason Alert Box -->
      <div class="ai-reasoning-card">
        <div class="ai-reasoning-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          Lập luận của Gemini LLM
        </div>
        <div class="ai-reasoning-body">
          "${ticket.ai_reason}"
        </div>
      </div>

      <!-- Manual Status Transition -->
      <div class="form-group">
        <label class="form-label" for="drawer-status-select">Cập nhật trạng thái thủ công</label>
        <select class="form-control" id="drawer-status-select" style="background-color: var(--bg-main)">
          <option value="Open" ${ticket.status === 'Open' ? 'selected' : ''}>Open (Đang mở)</option>
          <option value="In Progress" ${ticket.status === 'In Progress' ? 'selected' : ''}>In Progress (Đang làm)</option>
          <option value="Resolved" ${ticket.status === 'Resolved' ? 'selected' : ''}>Resolved (Đã xử lý)</option>
        </select>
      </div>

    </div>

    <!-- Drawer Footer Actions -->
    <div class="drawer-footer">
      <button class="btn btn-secondary" id="tkt-drawer-cancel-btn">Đóng lại</button>
      <button class="btn btn-primary" id="tkt-drawer-save-btn">Lưu thay đổi</button>
    </div>
  `;

  // Display transitions
  backdrop.style.display = 'block';
  setTimeout(() => {
    backdrop.classList.add('active');
    drawer.classList.add('active');
  }, 10);

  // Close triggers
  const closeBtn = document.getElementById('tkt-drawer-close');
  const cancelBtn = document.getElementById('tkt-drawer-cancel-btn');
  const saveBtn = document.getElementById('tkt-drawer-save-btn');

  const closeDrawer = () => {
    backdrop.classList.remove('active');
    drawer.classList.remove('active');
    setTimeout(() => {
      backdrop.style.display = 'none';
    }, 250);
  };

  closeBtn?.addEventListener('click', closeDrawer);
  cancelBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeDrawer();
  });

  // Save changes
  saveBtn?.addEventListener('click', async () => {
    const statusSelect = document.getElementById('drawer-status-select');
    if (!statusSelect) return;
    
    const newStatus = statusSelect.value;
    saveBtn.textContent = 'Đang lưu...';
    saveBtn.disabled = true;

    try {
      const res = await apiService.updateTicketStatus(ticket.id, newStatus);
      if (res.success) {
        closeDrawer();
        // Reload table in background
        allTickets = await apiService.getTickets();
        applyFilters();
        renderTableRows();
      }
    } catch (err) {
      console.error("Lỗi cập nhật ticket: ", err);
      alert("Đã xảy ra lỗi trong quá trình lưu trạng thái.");
      saveBtn.textContent = 'Lưu thay đổi';
      saveBtn.disabled = false;
    }
  });
}
