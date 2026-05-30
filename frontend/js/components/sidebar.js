// Sidebar UI Component for DantaLabs Dashboard

export function renderSidebar(activeTab, onTabChange) {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (!sidebarContainer) return;

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>` },
    { id: 'tickets', label: 'Jira Tickets', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 14h6"/><path d="M9 10h6"/><path d="M9 18h4"/></svg>` },
    { id: 'inbox', label: 'AI Inbox', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>` },
    { id: 'clients', label: 'VIP Clients', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
    { id: 'analytics', label: 'AI Analytics', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>` }
  ];

  let navItemsHTML = menuItems.map(item => `
    <a class="sidebar-nav-item ${activeTab === item.id ? 'active' : ''}" data-tab="${item.id}" id="nav-tab-${item.id}">
      ${item.icon}
      <span>${item.label}</span>
    </a>
  `).join('');

  sidebarContainer.innerHTML = `
    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="sidebar-logo-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2 17 22 12 17 7 22 12 2"/>
        </svg>
      </div>
      <span class="sidebar-logo-text">Danta Ops</span>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      ${navItemsHTML}
    </nav>

    <!-- Footer PIC Status -->
    <div class="sidebar-footer">
      <div class="ops-profile">
        <div class="ops-avatar">V</div>
        <div class="ops-info">
          <span class="ops-name">PIC Vy</span>
          <span class="ops-role">Vận hành</span>
        </div>
      </div>
    </div>
  `;

  // Attach click events
  sidebarContainer.querySelectorAll('.sidebar-nav-item').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = element.getAttribute('data-tab');
      onTabChange(tabId);
    });
  });
}
