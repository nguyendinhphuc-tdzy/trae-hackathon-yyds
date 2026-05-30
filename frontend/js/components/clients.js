// VIP Whitelist Protection Component for DantaLabs Dashboard

import { apiService } from '../api.js';

let allClients = [];

export async function renderClients() {
  const container = document.getElementById('view-clients');
  if (!container) return;

  // Render glass skeletons first
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div class="clients-grid-header" style="height: 40px; animation: pulse 1.5s infinite ease-in-out; background: rgba(255,255,255,0.01); border-radius: 8px;"></div>
      <div class="clients-grid">
        ${Array(4).fill(0).map(() => `
          <div class="glass-panel" style="height: 250px; animation: pulse 1.5s infinite ease-in-out;"></div>
        `).join('')}
      </div>
    </div>
  `;

  try {
    allClients = await apiService.getClients();
    
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <!-- Header Banner with Add trigger -->
        <div class="clients-grid-header">
          <div style="display: flex; flex-direction: column;">
            <h2 style="font-family: var(--font-family-title); font-weight: 700; color: #fff; font-size: 1.15rem;">Whitelist Khách Hàng VIP</h2>
            <span style="font-size: 0.78rem; color: var(--color-muted);">Chỉ các số điện thoại/nhóm chat trong danh sách này mới được AI Engine lắng nghe và bảo vệ.</span>
          </div>

          <button class="btn btn-primary" id="whitelist-add-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Thêm Khách Hàng VIP
          </button>
        </div>

        <!-- Clients Grid -->
        <div class="clients-grid">
          ${allClients.length === 0 ? `<div class="glass-panel" style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--color-muted);">Không có khách hàng VIP nào được Whitelist.</div>` : 
            allClients.map(c => {
              const initial = c.display_name ? c.display_name.charAt(0) : '?';
              const avatarClass = `avatar-${Math.abs(c.chat_id.charCodeAt(0) + c.chat_id.charCodeAt(1)) % 8}`;
              
              const formattedDate = new Date(c.created_at).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              });

              return `
                <div class="glass-panel client-card">
                  <div class="client-card-inner">
                    <!-- Status active badge -->
                    <div style="position: absolute; top: 1rem; right: 1rem;">
                      <span class="badge badge-success" style="font-size: 0.65rem; padding: 0.15rem 0.5rem;">ACTIVE</span>
                    </div>

                    <!-- Avatar -->
                    <div class="client-card-avatar ${avatarClass}">${initial}</div>
                    
                    <!-- Metadata -->
                    <div class="client-card-name">${c.display_name}</div>
                    <div class="client-card-phone" style="font-family: monospace;">${c.chat_id}</div>

                    <!-- Stat Boxes -->
                    <div class="client-card-stats">
                      <div class="client-stat-item">
                        <span class="client-stat-label">Số Subtasks Jira</span>
                        <span class="client-stat-value" style="color: var(--accent-primary);">${c.ticket_count} tickets</span>
                      </div>
                    </div>

                    <!-- Routing assignment detail -->
                    <div style="width: 100%; display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem; font-size: 0.78rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
                      <span style="color: var(--color-muted);">PIC Mặc định:</span>
                      <span style="font-weight: 600; color: #fff; display: inline-flex; align-items: center; gap: 0.3rem;">
                        <span style="width: 16px; height: 16px; border-radius: 50%; background: #475569; display: flex; align-items: center; justify-content: center; font-size: 0.55rem; font-weight:700;">${c.assignee_name.charAt(0)}</span>
                        ${c.assignee_name}
                      </span>
                    </div>

                    <div style="width: 100%; display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--color-muted); margin-top: 0.25rem;">
                      <span>Ngày tham gia:</span>
                      <span>${formattedDate}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')
          }
        </div>

      </div>
    `;

    // Bind add button
    document.getElementById('whitelist-add-btn')?.addEventListener('click', showAddClientModal);

  } catch (err) {
    console.error("Lỗi render Clients: ", err);
    container.innerHTML = `<div class="glass-panel" style="color: var(--color-danger); text-align: center;">Lỗi tải cấu phần VIP Clients.</div>`;
  }
}

// Draw and show center modal
export function showAddClientModal() {
  const backdrop = document.getElementById('add-client-modal-backdrop');
  const modal = document.getElementById('add-client-modal');
  if (!backdrop || !modal) return;

  modal.innerHTML = `
    <!-- Header -->
    <div class="modal-header">
      <span class="modal-title">Thêm Khách Hàng VIP Mới</span>
      <button class="drawer-close" id="modal-close-btn" style="padding: 0.25rem;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:20px; height:20px; stroke: currentColor; stroke-width: 2; fill: none;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Form Inputs -->
    <div class="modal-body">
      <form id="add-client-form">
        <!-- Phone number / chatId -->
        <div class="form-group">
          <label class="form-label" for="add-client-chatid">Số điện thoại WhatsApp (chatId)</label>
          <input type="text" class="form-control" id="add-client-chatid" placeholder="Ví dụ: 84987654321 hoặc ID nhóm chat..." required>
          <span style="font-size: 0.72rem; color: var(--color-muted); margin-top: 0.2rem;">Lưu ý: Viết liền không dấu cách, không có dấu + phía trước.</span>
        </div>

        <!-- Display Name -->
        <div class="form-group">
          <label class="form-label" for="add-client-name">Tên hiển thị (Display Name)</label>
          <input type="text" class="form-control" id="add-client-name" placeholder="Ví dụ: Nguyễn Văn A..." required>
        </div>

        <!-- Assignee Routing -->
        <div class="form-group">
          <label class="form-label" for="add-client-assignee">PIC Phụ trách mặc định (Auto-routing)</label>
          <select class="form-control" id="add-client-assignee" style="background-color: var(--bg-main)">
            <option value="Phuc">Phuc (Phát triển kỹ thuật / Sửa lỗi hạ tầng)</option>
            <option value="Tram">Tram (Lên lịch họp / Tư vấn chiến lược / Biểu phí)</option>
            <option value="Vy" selected>Vy (Xây dựng công cụ vận hành nội bộ)</option>
          </select>
        </div>
      </form>
    </div>

    <!-- Actions -->
    <div class="modal-footer">
      <button class="btn btn-secondary" id="modal-cancel-btn">Hủy bỏ</button>
      <button class="btn btn-primary" id="modal-submit-btn" type="submit" form="add-client-form">Lưu Whitelist</button>
    </div>
  `;

  // Display backdrop and modal with transitions
  backdrop.style.display = 'flex';
  setTimeout(() => {
    backdrop.classList.add('active');
  }, 10);

  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const form = document.getElementById('add-client-form');
  const submitBtn = document.getElementById('modal-submit-btn');

  const closeModal = () => {
    backdrop.classList.remove('active');
    setTimeout(() => {
      backdrop.style.display = 'none';
    }, 250);
  };

  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // Handle Form Submission
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const chatIdVal = document.getElementById('add-client-chatid').value.trim();
    const nameVal = document.getElementById('add-client-name').value.trim();
    const assigneeVal = document.getElementById('add-client-assignee').value;

    if (!chatIdVal || !nameVal) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang lưu Whitelist...';

    try {
      const res = await apiService.addClient(chatIdVal, nameVal, assigneeVal);
      if (res.success) {
        closeModal();
        // Re-render Whitelist
        await renderClients();
      } else {
        alert(res.error || "Không thể lưu khách hàng.");
        submitBtn.disabled = false;
        submitBtn.textContent = 'Lưu Whitelist';
      }
    } catch (err) {
      console.error("Lỗi thêm VIP Client: ", err);
      alert("Đã xảy ra lỗi hệ thống khi thêm khách hàng.");
      submitBtn.disabled = false;
      submitBtn.textContent = 'Lưu Whitelist';
    }
  });
}
