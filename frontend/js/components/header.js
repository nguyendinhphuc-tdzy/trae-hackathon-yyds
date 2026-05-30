// Header UI Component for DantaLabs Dashboard

export function renderHeader(activeTab) {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;

  const tabTitles = {
    overview: { title: 'Overview Dashboard', subtitle: 'Theo dõi tiến độ vận hành kép thời gian thực' },
    tickets: { title: 'Jira Tickets Management', subtitle: 'Danh sách và trạng thái xử lý subtask tự động' },
    inbox: { title: 'AI Inbox Console', subtitle: 'Giám sát quyết định phân loại và lịch sử chat WhatsApp' },
    clients: { title: 'VIP Whitelist Protection', subtitle: 'Quản lý danh sách khách hàng được bảo vệ nghiêm ngặt' },
    analytics: { title: 'AI Performance Analytics', subtitle: 'Biểu đồ hiệu suất phân tích của Gemini LLM' }
  };

  const currentTab = tabTitles[activeTab] || { title: 'Dashboard', subtitle: 'Hệ thống tự động hóa' };

  headerContainer.innerHTML = `
    <div class="header-title-container">
      <h1 class="header-title" id="header-main-title">${currentTab.title}</h1>
      <span class="header-subtitle" id="header-sub-title">${currentTab.subtitle}</span>
    </div>

    <div class="header-actions">
      <!-- Status Badge -->
      <div class="system-status">
        <span class="status-dot-pulse"></span>
        <span>AI ENGINE: ONLINE</span>
      </div>

      <!-- Live Clock -->
      <div class="header-clock" id="header-clock-display">00:00:00</div>
    </div>
  `;

  // Start digital clock tick
  updateClock();
  if (!window.clockInterval) {
    window.clockInterval = setInterval(updateClock, 1000);
  }
}

function updateClock() {
  const clockElement = document.getElementById('header-clock-display');
  if (!clockElement) return;
  
  const now = new Date();
  const timeString = now.toLocaleTimeString('vi-VN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  clockElement.textContent = timeString;
}
