
const mockOverview = {
  totalConversations: 142,
  totalTickets: 28,
  activeClients: 12,
  byDecision: {
    CREATE_SUBTASK: 28,
    COMMENT: 34,
    IGNORE: 80
  }
};

const mockClients = [
  {
    chat_id: "84987654321@c.us",
    display_name: "Nguyễn Đình Phúc",
    ticket_count: 3,
    assignee_id: "7120c0000000000000000001",
    assignee_name: "Phuc",
    last_seen_at: "2026-05-30T10:45:00+07:00",
    created_at: "2026-05-20T08:30:00+07:00"
  },
  {
    chat_id: "84912345678@c.us",
    display_name: "Khánh Vy",
    ticket_count: 2,
    assignee_id: "7120c0000000000000000003",
    assignee_name: "Vy",
    last_seen_at: "2026-05-30T11:05:00+07:00",
    created_at: "2026-05-22T09:15:00+07:00"
  },
  {
    chat_id: "84901122334@c.us",
    display_name: "Thùy Trâm",
    ticket_count: 1,
    assignee_id: "7120c0000000000000000002",
    assignee_name: "Tram",
    last_seen_at: "2026-05-30T09:30:00+07:00",
    created_at: "2026-05-24T14:20:00+07:00"
  },
  {
    chat_id: "1203631987654321@g.us",
    display_name: "Ops Team YYDS",
    ticket_count: 5,
    assignee_id: "7120c0000000000000000001",
    assignee_name: "Phuc",
    last_seen_at: "2026-05-30T11:15:00+07:00",
    created_at: "2026-05-18T10:00:00+07:00"
  },
  {
    chat_id: "84933445566@c.us",
    display_name: "Lê Minh Tuấn (VIP Partner)",
    ticket_count: 2,
    assignee_id: "7120c0000000000000000001",
    assignee_name: "Phuc",
    last_seen_at: "2026-05-29T18:24:00+07:00",
    created_at: "2026-05-25T11:00:00+07:00"
  },
  {
    chat_id: "84988776655@c.us",
    display_name: "Phan Hoàng Sơn (YYDS VIP)",
    ticket_count: 0,
    assignee_id: "7120c0000000000000000002",
    assignee_name: "Tram",
    last_seen_at: "2026-05-28T15:10:00+07:00",
    created_at: "2026-05-27T16:40:00+07:00"
  }
];

const mockTickets = [
  {
    id: 104,
    chat_id: "84987654321@c.us",
    client_name: "Nguyễn Đình Phúc",
    summary: "Lỗi không thanh toán được bằng thẻ Mastercard",
    description: "Khách hàng báo cáo lỗi nghiêm trọng khi thanh toán qua thẻ Mastercard trên cổng web chính thức. Hệ thống ném lỗi Code 500 (Internal Server Error) trong lúc gọi API Stripe checkout.\n\nYêu cầu PIC Phuc kiểm tra lại hàm signature validation và webhook handler của cổng thanh toán Stripe trên server NestJS để giải quyết lỗi.",
    priority: "High",
    status: "Open",
    assignee_id: "7120c0000000000000000001",
    assignee_name: "Phuc",
    ai_reason: "Khách hàng báo cáo lỗi giao dịch thanh toán code 500 thất bại nhiều lần vào lúc 10h sáng. Yêu cầu thuộc mảng kỹ thuật nghiêm trọng cần mở ticket lập tức.",
    jira_key: "YYDS-104",
    created_at: "2026-05-30T10:46:00+07:00",
    updated_at: "2026-05-30T10:46:00+07:00"
  },
  {
    id: 103,
    chat_id: "84912345678@c.us",
    client_name: "Khánh Vy",
    summary: "Yêu cầu nâng cấp các công cụ vận hành nội bộ (Internal tools)",
    description: "Khách hàng Vy đề xuất tích hợp thêm module kéo thả dữ liệu (drag & drop columns) trên bảng quản lý vip_clients trong cổng Admin Portal hiện tại.\n\nYêu cầu thiết kế lại cấu trúc bảng hiển thị, bổ sung custom settings cho phép lưu trạng thái sắp xếp cột của Ops Team.",
    priority: "Medium",
    status: "In Progress",
    assignee_id: "7120c0000000000000000003",
    assignee_name: "Vy",
    ai_reason: "Khách hàng yêu cầu nâng cấp và phát triển thêm tính năng cho bảng quản trị nội bộ. Phân luồng chính xác cho Vy (PIC Internal tools).",
    jira_key: "YYDS-103",
    created_at: "2026-05-30T10:15:00+07:00",
    updated_at: "2026-05-30T10:30:00+07:00"
  },
  {
    id: 102,
    chat_id: "84901122334@c.us",
    client_name: "Thùy Trâm",
    summary: "Họp tư vấn chiến lược di chuyển hạ tầng dữ liệu và định giá",
    description: "Khách hàng có mong muốn đặt lịch hẹn họp vào đầu tuần tới (thứ Hai lúc 14:00) nhằm làm việc sâu hơn về báo giá gói hỗ trợ doanh nghiệp và chi phí dự phòng di cư database sang YYDS Enterprise.\n\nCần chuẩn bị slide tổng hợp và bảng so sánh báo giá dự kiến gửi khách trước giờ họp.",
    priority: "Medium",
    status: "In Progress",
    assignee_id: "7120c0000000000000000002",
    assignee_name: "Tram",
    ai_reason: "Khách hàng gửi yêu cầu họp thảo luận tư vấn chiến lược và thương thảo biểu phí dịch vụ mới. Điều phối về cho Tram giải quyết chính xác.",
    jira_key: "YYDS-102",
    created_at: "2026-05-30T09:31:00+07:00",
    updated_at: "2026-05-30T09:35:00+07:00"
  },
  {
    id: 101,
    chat_id: "1203631987654321@g.us",
    client_name: "Ops Team YYDS",
    summary: "Xử lý lỗi rò rỉ bộ nhớ (Memory leak) của yydsIngestion script",
    description: "Nhóm vận hành phản ánh server chạy yyds-web.js thường xuyên bị quá tải CPU và crash bất ngờ sau 48h hoạt động liên tục. Nghi ngờ lỗi rò rỉ do tích hợp Chromium headless không giải phóng bộ nhớ khi khởi tạo lại QR Auth.\n\nPhuc cần kiểm tra kỹ phương thức client.destroy() và dọn dẹp các tiến trình zombie chrome.",
    priority: "High",
    status: "Resolved",
    assignee_id: "7120c0000000000000000001",
    assignee_name: "Phuc",
    ai_reason: "Báo cáo lỗi kỹ thuật hạ tầng, ảnh hưởng lớn đến thời gian uptime của toàn bộ pipeline tin nhắn YYDS. Lập ticket ưu tiên cao giao cho Phuc.",
    jira_key: "YYDS-101",
    created_at: "2026-05-29T14:20:00+07:00",
    updated_at: "2026-05-30T08:15:00+07:00"
  },
  {
    id: 100,
    chat_id: "84933445566@c.us",
    client_name: "Lê Minh Tuấn (VIP Partner)",
    summary: "Đồng bộ hóa danh sách VIP Client tự động từ Google Sheet",
    description: "Khách hàng Tuấn đề xuất viết một script NodeJS chạy cronjob mỗi 12 giờ để kéo danh sách đối tác VIP từ Google Sheet của phòng Marketing về lưu trữ trong YYDS, thay vì nhập thủ công bằng SQL Editor.",
    priority: "Medium",
    status: "Resolved",
    assignee_id: "7120c0000000000000000003",
    assignee_name: "Vy",
    ai_reason: "Mở rộng tính năng tự động hóa luồng nhập liệu. Chuyển cho Vy xử lý.",
    jira_key: "YYDS-100",
    created_at: "2026-05-28T10:10:00+07:00",
    updated_at: "2026-05-29T16:00:00+07:00"
  }
];

const mockConversations = [
  {
    id: "c1_1",
    chat_id: "84987654321@c.us",
    client_name: "Nguyễn Đình Phúc",
    text: "Chào admin, hệ thống web thanh toán của mình đang bị sao thế? Tôi giao dịch nãy giờ 3 lần đều bị văng lỗi.",
    direction: "inbound",
    aiDecision: "IGNORE",
    created_at: "2026-05-30T10:44:00+07:00"
  },
  {
    id: "c1_2",
    chat_id: "84987654321@c.us",
    client_name: "Nguyễn Đình Phúc",
    text: "Nó báo lỗi giao dịch code 500 khi tôi chọn Mastercard để thanh toán gói Premium. Xem gấp hộ tôi với!",
    direction: "inbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T10:45:00+07:00"
  },
  {
    id: "c1_sys",
    chat_id: "84987654321@c.us",
    client_name: "YYDS System",
    text: "[AI Engine] Đang phân tích tin nhắn và ngữ cảnh cuộc hội thoại...",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T10:45:30+07:00"
  },
  {
    id: "c1_sys_t",
    chat_id: "84987654321@c.us",
    client_name: "YYDS System",
    text: "[AI Engine] Tạo ticket thành công! Mã Subtask con: #YYDS-104. Phân công xử lý mặc định: PIC Phuc.",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T10:46:00+07:00"
  },
  {
    id: "c1_out",
    chat_id: "84987654321@c.us",
    client_name: "YYDS Autoreply",
    text: "[YYDS] Xin chào Nguyễn Đình Phúc, yêu cầu hỗ trợ kỹ thuật của bạn đã được ghi nhận tự động vào hệ thống! Mã số Ticket hỗ trợ: #YYDS-104. PIC Phuc đang tiếp nhận xử lý.",
    direction: "outbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T10:46:05+07:00"
  },
  {
    id: "c2_1",
    chat_id: "84912345678@c.us",
    client_name: "Khánh Vy",
    text: "Alo Phúc ơi, rảnh không?",
    direction: "inbound",
    aiDecision: "IGNORE",
    created_at: "2026-05-30T11:03:00+07:00"
  },
  {
    id: "c2_sys1",
    chat_id: "84912345678@c.us",
    client_name: "YYDS System",
    text: "[AI Engine] Nhận tin nhắn chào hỏi xã giao. Trạng thái: IGNORE (Bỏ qua).",
    direction: "system",
    aiDecision: "IGNORE",
    created_at: "2026-05-30T11:03:30+07:00"
  },
  {
    id: "c2_2",
    chat_id: "84912345678@c.us",
    client_name: "Khánh Vy",
    text: "Giờ tôi muốn thêm tính năng kéo thả cột trên bảng quản lý vip_clients trong Admin Portal để Ops Team dùng cho tiện, Vy code giùm được không?",
    direction: "inbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T11:04:00+07:00"
  },
  {
    id: "c2_sys2",
    chat_id: "84912345678@c.us",
    client_name: "YYDS System",
    text: "[AI Engine] Phát hiện yêu cầu phát triển tính năng vận hành nội bộ. Tạo ticket thành công! Mã Subtask con: #YYDS-103. PIC phụ trách: Vy.",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T11:05:00+07:00"
  },
  {
    id: "c2_out",
    chat_id: "84912345678@c.us",
    client_name: "YYDS Autoreply",
    text: "[YYDS] Xin chào Khánh Vy, yêu cầu hỗ trợ kỹ thuật của bạn đã được ghi nhận tự động vào hệ thống! Mã số Ticket hỗ trợ: #YYDS-103. PIC Vy đang chịu trách nhiệm giải quyết.",
    direction: "outbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T11:05:05+07:00"
  },
  {
    id: "c3_1",
    chat_id: "84901122334@c.us",
    client_name: "Thùy Trâm",
    text: "Thứ 2 tuần tới khoảng 2h chiều, anh Phúc với chị Trâm rảnh họp tư vấn biểu phí chuyển đổi database YYDS Enterprise cho tôi nhé.",
    direction: "inbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T09:30:00+07:00"
  },
  {
    id: "c3_sys",
    chat_id: "84901122334@c.us",
    client_name: "YYDS System",
    text: "[AI Engine] Nhận diện lịch họp tư vấn di chuyển hạ tầng và chính sách định giá dịch vụ. Tạo ticket thành công! Mã Subtask con: #YYDS-102. PIC phụ trách: Tram.",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T09:31:00+07:00"
  },
  {
    id: "c3_out",
    chat_id: "84901122334@c.us",
    client_name: "YYDS Autoreply",
    text: "[YYDS] Xin chào Thùy Trâm, yêu cầu hỗ trợ kỹ thuật của bạn đã được ghi nhận tự động vào hệ thống! Mã số Ticket hỗ trợ: #YYDS-102. PIC Tram đang xử lý yêu cầu đặt lịch họp và chuẩn bị slide.",
    direction: "outbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T09:31:05+07:00"
  },
  {
    id: "c4_1",
    chat_id: "1203631987654321@g.us",
    client_name: "Ops Team YYDS",
    text: "Phúc ơi, script yydsIngestion chạy headless chrome cứ 2 ngày là bị overload CPU rồi đơ cứng luôn. Có bị memory leak gì không vậy?",
    direction: "inbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-29T14:18:00+07:00"
  },
  {
    id: "c4_sys",
    chat_id: "1203631987654321@g.us",
    client_name: "YYDS System",
    text: "[AI Engine] Cảnh báo lỗi nghiêm trọng về memory leak và tài nguyên CPU quá tải. Tạo ticket thành công! Mã Subtask con: #YYDS-101. PIC phụ trách: Phuc.",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-29T14:20:00+07:00"
  },
  {
    id: "c5_1",
    chat_id: "84933445566@c.us",
    client_name: "Lê Minh Tuấn (VIP Partner)",
    text: "Marketing kêu nhập VIP client bằng tay bất tiện quá, team xem làm thế nào tự động kéo từ file Excel/Google Sheet về YYDS định kỳ được không?",
    direction: "inbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-28T10:08:00+07:00"
  },
  {
    id: "c5_sys",
    chat_id: "84933445566@c.us",
    client_name: "YYDS System",
    text: "[AI Engine] Tạo ticket hỗ trợ tự động đồng bộ hóa danh mục. Mã Subtask: #YYDS-100. PIC phụ trách: Vy.",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-28T10:10:00+07:00"
  },
  {
    id: "c6_1",
    chat_id: "84988776655@c.us",
    client_name: "Phan Hoàng Sơn (YYDS VIP)",
    text: "Hello team YYDS nha, hôm nay vận hành ổn áp chứ?",
    direction: "inbound",
    aiDecision: "IGNORE",
    created_at: "2026-05-28T15:09:00+07:00"
  },
  {
    id: "c6_sys",
    chat_id: "84988776655@c.us",
    client_name: "YYDS System",
    text: "[AI Engine] Nhận tin nhắn chào hỏi thăm hỏi. Trạng thái: IGNORE.",
    direction: "system",
    aiDecision: "IGNORE",
    created_at: "2026-05-28T15:10:00+07:00"
  }
];

// ============================================================================
//                     PART 2: STATE & API SERVICE LAYER
// ============================================================================

const CONFIG = {
  useMock: false,
  backendUrl: 'http://localhost:3000'
};

try {
  if (location && location.protocol === 'file:') {
    CONFIG.useMock = true;
  }
} catch (e) {}

const state = {
  overview: { totalConversations: 0, totalTickets: 0, activeClients: 0, byDecision: { CREATE_SUBTASK: 0, COMMENT: 0, IGNORE: 0 } },
  clients: [],
  tickets: [],
  conversations: []
};

const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

function normalizeTicket(raw) {
  const base = { ...raw };
  base.human_edits = Number.isFinite(base.human_edits) ? base.human_edits : 0;
  base.is_deleted = Boolean(base.is_deleted);
  base.deleted_at = base.deleted_at || null;
  base.last_human_update_at = base.last_human_update_at || null;
<<<<<<< Updated upstream
  base.assignee_name = base.assignee_name || 'Team';
=======
>>>>>>> Stashed changes
  return base;
}

function assigneeIdForName(name) {
  const assigneeIds = {
    Phuc: "7120c0000000000000000001",
    Tram: "7120c0000000000000000002",
    Vy: "7120c0000000000000000003"
  };
  return assigneeIds[name] || assigneeIds.Phuc;
}

const apiService = {
  async getOverview() {
    await delay();
<<<<<<< Updated upstream
    if (CONFIG.useMock) {
      const totalConversations = state.conversations.filter(c => c.direction !== 'system').length;
      const totalTickets = state.tickets.filter(t => !normalizeTicket(t).is_deleted).length;
      const activeClients = state.clients.length;
      const byDecision = state.conversations.reduce((acc, c) => {
        if (c.aiDecision && c.direction === 'inbound') {
          acc[c.aiDecision] = (acc[c.aiDecision] || 0) + 1;
        }
        return acc;
      }, { CREATE_SUBTASK: 0, COMMENT: 0, IGNORE: 0 });
=======
    const totalConversations = state.conversations.filter(c => c.direction !== 'system').length;
    const totalTickets = state.tickets.filter(t => !t.is_deleted).length;
    const activeClients = state.clients.length;
    const byDecision = state.conversations.reduce((acc, c) => {
      if (c.aiDecision && c.direction === 'inbound') {
        acc[c.aiDecision] = (acc[c.aiDecision] || 0) + 1;
      }
      return acc;
    }, { CREATE_SUBTASK: 0, COMMENT: 0, IGNORE: 0 });
>>>>>>> Stashed changes

    byDecision.CREATE_SUBTASK = state.tickets.filter(t => !t.is_deleted).length;
      byDecision.COMMENT = 34;
      byDecision.IGNORE = state.conversations.filter(c => c.aiDecision === 'IGNORE' && c.direction === 'inbound').length + 76;

      return {
        totalConversations,
        totalTickets,
        activeClients,
        byDecision
      };
    }

    const res = await fetch(`${CONFIG.backendUrl}/api/analytics/overview`);
    const stats = await res.json();
    state.overview = stats;
    return stats;
  },

  async getTickets(options = {}) {
    await delay();
<<<<<<< Updated upstream
    if (CONFIG.useMock) {
      const includeDeleted = Boolean(options.includeDeleted);
      return state.tickets
        .map(normalizeTicket)
        .filter(t => includeDeleted ? true : !t.is_deleted)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    const res = await fetch(`${CONFIG.backendUrl}/api/tickets?limit=200`);
    const body = await res.json();
    const tickets = (body.data || body || []).map(normalizeTicket);
    state.tickets = tickets;
    const includeDeleted = Boolean(options.includeDeleted);
    return includeDeleted ? tickets : tickets.filter(t => !t.is_deleted);
  },

  async updateTicketStatus(ticketId, newStatus) {
    if (CONFIG.useMock) return await apiService.updateTicket(ticketId, { status: newStatus });

    const res = await fetch(`${CONFIG.backendUrl}/api/tickets/${ticketId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const body = await res.json();
    return body;
  },

  async updateTicket(ticketId, patch = {}) {
    await delay(250);
    if (CONFIG.useMock) {
      const idx = state.tickets.findIndex(t => String(t.id) === String(ticketId) || t.id === Number(ticketId));
      if (idx === -1) return { success: false, error: 'Ticket not found' };

      const existing = normalizeTicket(state.tickets[idx]);
      if (existing.is_deleted) return { success: false, error: 'Ticket is deleted' };

      const allowKeys = ['summary', 'description', 'priority', 'status', 'assignee_name'];
      const changes = [];
      const next = { ...existing };

      allowKeys.forEach(key => {
        if (patch[key] === undefined) return;
        const nextVal = typeof patch[key] === 'string' ? patch[key].trim() : patch[key];
        if (nextVal === '') return;
        if (String(next[key] ?? '') !== String(nextVal)) {
          changes.push(key);
          next[key] = nextVal;
        }
      });

      if (changes.includes('assignee_name')) {
        next.assignee_id = assigneeIdForName(next.assignee_name);
      }

      if (changes.length === 0) return { success: true, ticket: existing };

      next.human_edits = (existing.human_edits || 0) + 1;
      next.last_human_update_at = new Date().toISOString();
      next.updated_at = new Date().toISOString();

      state.tickets[idx] = next;

      state.conversations.push({
        id: `sys_tkt_upd_${Date.now()}`,
        chat_id: next.chat_id,
        client_name: "YYDS System",
        text: `[YYDS Ops] Ticket #${next.jira_key || next.id} updated (${changes.join(', ')}).`,
        direction: "system",
        aiDecision: "IGNORE",
        created_at: new Date().toISOString()
      });

      return { success: true, ticket: normalizeTicket(next) };
    }

    const res = await fetch(`${CONFIG.backendUrl}/api/tickets/${ticketId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: body.error || 'Update not supported by backend' };
    return { success: true, ticket: normalizeTicket(body.data || body) };
  },

  async deleteTicket(ticketId) {
    await delay(250);
    if (CONFIG.useMock) {
      const idx = state.tickets.findIndex(t => String(t.id) === String(ticketId) || t.id === Number(ticketId));
      if (idx === -1) return { success: false, error: 'Ticket not found' };

      const existing = normalizeTicket(state.tickets[idx]);
      if (existing.is_deleted) return { success: true, ticket: existing };

      const next = {
        ...existing,
        is_deleted: true,
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      state.tickets[idx] = next;

      state.conversations.push({
        id: `sys_tkt_del_${Date.now()}`,
        chat_id: next.chat_id,
        client_name: "YYDS System",
        text: `[YYDS Ops] Ticket #${next.jira_key || next.id} deleted after review.`,
        direction: "system",
        aiDecision: "IGNORE",
        created_at: new Date().toISOString()
      });

      return { success: true, ticket: normalizeTicket(next) };
    }

    const res = await fetch(`${CONFIG.backendUrl}/api/tickets/${ticketId}`, { method: 'DELETE' });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: body.error || 'Delete not supported by backend' };
    return { success: true, ticket: normalizeTicket(body.data || body) };
=======
    const includeDeleted = Boolean(options.includeDeleted);
    const list = state.tickets
      .map(normalizeTicket)
      .filter(t => includeDeleted ? true : !t.is_deleted)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return list;
  },

  async updateTicketStatus(ticketId, newStatus) {
    return await apiService.updateTicket(ticketId, { status: newStatus });
  },

  async updateTicket(ticketId, patch = {}) {
    await delay(320);
    const ticket = state.tickets.find(t => t.id === parseInt(ticketId));
    if (!ticket) return { success: false, error: 'Ticket not found' };
    if (ticket.is_deleted) return { success: false, error: 'Ticket is deleted' };

    const prev = normalizeTicket(ticket);

    const next = { ...ticket };
    if (typeof patch.summary === 'string') next.summary = patch.summary;
    if (typeof patch.description === 'string') next.description = patch.description;
    if (typeof patch.priority === 'string') next.priority = patch.priority;
    if (typeof patch.status === 'string') next.status = patch.status;
    if (typeof patch.assignee_name === 'string') {
      next.assignee_name = patch.assignee_name;
      next.assignee_id = assigneeIdForName(patch.assignee_name);
    }

    next.human_edits = Number.isFinite(next.human_edits) ? next.human_edits : 0;
    next.human_edits += 1;
    next.last_human_update_at = new Date().toISOString();
    next.updated_at = new Date().toISOString();

    Object.assign(ticket, next);

    const changes = [];
    if (prev.status !== ticket.status) changes.push(`status → ${ticket.status}`);
    if (prev.priority !== ticket.priority) changes.push(`priority → ${ticket.priority}`);
    if (prev.assignee_name !== ticket.assignee_name) changes.push(`assignee → ${ticket.assignee_name}`);
    if (prev.summary !== ticket.summary) changes.push(`summary updated`);
    if (prev.description !== ticket.description) changes.push(`description updated`);

    const logId = `sys_tkt_edit_${Date.now()}`;
    state.conversations.push({
      id: logId,
      chat_id: ticket.chat_id,
      client_name: "YYDS System",
      text: `[YYDS Ops] Ticket #${ticket.jira_key || ticket.id} updated (${changes.length ? changes.join(', ') : 'metadata'}).`,
      direction: "system",
      aiDecision: "IGNORE",
      created_at: new Date().toISOString()
    });

    return { success: true, ticket: normalizeTicket(ticket) };
  },

  async deleteTicket(ticketId) {
    await delay(320);
    const ticket = state.tickets.find(t => t.id === parseInt(ticketId));
    if (!ticket) return { success: false, error: 'Ticket not found' };
    if (ticket.is_deleted) return { success: true, ticket: normalizeTicket(ticket) };

    ticket.is_deleted = true;
    ticket.deleted_at = new Date().toISOString();
    ticket.updated_at = new Date().toISOString();

    const logId = `sys_tkt_del_${Date.now()}`;
    state.conversations.push({
      id: logId,
      chat_id: ticket.chat_id,
      client_name: "YYDS System",
      text: `[YYDS Ops] Ticket #${ticket.jira_key || ticket.id} deleted after review.`,
      direction: "system",
      aiDecision: "IGNORE",
      created_at: new Date().toISOString()
    });

    return { success: true, ticket: normalizeTicket(ticket) };
>>>>>>> Stashed changes
  },

  async getConversations() {
    await delay();
    if (CONFIG.useMock) return [ ...state.conversations ];

    const res = await fetch(`${CONFIG.backendUrl}/api/conversations?limit=200`);
    const body = await res.json();
    const conversations = (body.data || body || []).map(c => ({
      ...c,
      aiDecision: c.aiDecision || c.ai_decision
    }));
    state.conversations = conversations;
    return conversations;
  },

  async sendMessage(chatId, text) {
    await delay(200);
    if (CONFIG.useMock) {
      const client = state.clients.find(c => c.chat_id === chatId);

      const newMsg = {
        id: `out_${Date.now()}`,
        chat_id: chatId,
        client_name: "YYDS Autoreply",
        text: text,
        direction: "outbound",
        aiDecision: "IGNORE",
        created_at: new Date().toISOString()
      };
      
      state.conversations.push(newMsg);

      if (client) {
        client.last_seen_at = new Date().toISOString();
      }

      return { success: true, message: newMsg };
    }

    const res = await fetch(`${CONFIG.backendUrl}/api/conversations/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, text })
    });
    return await res.json();
  },

  async getClients() {
    await delay();
    if (CONFIG.useMock) return [ ...state.clients ];

    const res = await fetch(`${CONFIG.backendUrl}/api/clients`);
    const body = await res.json();
    const clients = body.data || body || [];
    state.clients = clients;
    return clients;
  },

  async addClient(chatId, displayName, assigneeName) {
    await delay(400);
    if (CONFIG.useMock) {
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
      
      state.conversations.push({
        id: `sys_seed_${Date.now()}`,
        chat_id: newClient.chat_id,
        client_name: "YYDS System",
        text: `[YYDS] Số điện thoại ${newClient.chat_id} đã được thêm thành công vào YYDS VIP whitelist.`,
        direction: "system",
        aiDecision: "IGNORE",
        created_at: new Date().toISOString()
      });

      return { success: true, client: newClient };
    }

<<<<<<< Updated upstream
    const normalizedChatId = chatId.includes('@') ? chatId : `${chatId}@c.us`;
    const res = await fetch(`${CONFIG.backendUrl}/api/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: normalizedChatId, display_name: displayName, assignee_name: assigneeName })
=======
    const newClient = {
      chat_id: chatId.includes('@') ? chatId : `${chatId}@c.us`,
      display_name: displayName,
      ticket_count: 0,
      assignee_id: assigneeIdForName(assigneeName),
      assignee_name: assigneeName,
      last_seen_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    state.clients.push(newClient);
    
    state.conversations.push({
      id: `sys_seed_${Date.now()}`,
      chat_id: newClient.chat_id,
      client_name: "YYDS System",
      text: `[YYDS] Số điện thoại ${newClient.chat_id} đã được thêm thành công vào YYDS VIP whitelist.`,
      direction: "system",
      aiDecision: "IGNORE",
      created_at: new Date().toISOString()
>>>>>>> Stashed changes
    });
    return await res.json();
  }
};

// ============================================================================
//                     PART 3: LAYOUT & VIEW COMPONENTS
// ============================================================================

// --- 3.1 SIDEBAR COMPONENT ---
function renderSidebar(activeTab, onTabChange) {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (!sidebarContainer) return;

  const isCollapsed = document.body.classList.contains('sidebar-collapsed');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>` },
    { id: 'tickets', label: 'Deity Tickets', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 14h6"/><path d="M9 10h6"/><path d="M9 18h4"/></svg>` },
    { id: 'inbox', label: 'Deity Inbox', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>` },
    { id: 'clients', label: 'VIP Sanctum', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
    { id: 'analytics', label: 'Deity Analytics', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>` }
  ];

  let navItemsHTML = menuItems.map(item => `
    <a class="sidebar-nav-item ${activeTab === item.id ? 'active' : ''}" data-tab="${item.id}" id="nav-tab-${item.id}" title="${item.label}">
      ${item.icon}
      <span>${item.label}</span>
    </a>
  `).join('');

  sidebarContainer.innerHTML = `
    <button class="sidebar-toggle-btn" id="sidebar-toggle-btn" type="button" aria-label="${isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}" title="${isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
    </button>

    <div class="sidebar-logo">
      <div class="sidebar-logo-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3c2.6 2.1 5.4 2.1 7.4 2.1 0 6.5-2.1 10.9-7.4 13.0C6.7 16 4.6 11.6 4.6 5.1c2 0 4.8 0 7.4-2.1z"/>
          <path d="M6.2 9.2c-2.6.1-4.2 1.6-4.7 4.3 2.6-.3 4.5-1.2 5.8-2.6"/>
          <path d="M17.8 9.2c2.6.1 4.2 1.6 4.7 4.3-2.6-.3-4.5-1.2-5.8-2.6"/>
          <path d="M8.4 11.6l2.3 2.4 4.9-5.3"/>
        </svg>
      </div>
      <div class="sidebar-brand">
        <span class="sidebar-logo-text">YYDS</span>
        <span class="sidebar-logo-subtext">Deity-Ops Console</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      ${navItemsHTML}
    </nav>

    <div class="sidebar-footer">
      <div class="ops-profile">
        <div class="ops-avatar">V</div>
        <div class="ops-info">
          <span class="ops-name">PIC Vy</span>
          <span class="ops-role">DEITY OPS</span>
        </div>
      </div>
    </div>
  `;

  sidebarContainer.querySelectorAll('.sidebar-nav-item').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = element.getAttribute('data-tab');
      onTabChange(tabId);
    });
  });

  document.getElementById('sidebar-toggle-btn')?.addEventListener('click', () => {
    setSidebarCollapsed(!document.body.classList.contains('sidebar-collapsed'));
    renderSidebar(activeTab, onTabChange);
  });
}

// --- 3.2 HEADER COMPONENT ---
function renderHeader(activeTab) {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;

  const tabTitles = {
    overview: { title: 'YYDS Deity-Ops Console', subtitle: 'Yong Yuan De Shen — supreme ops telemetry' },
    tickets: { title: 'Deity Tickets', subtitle: 'Golden ledger of YYDS automated work' },
    inbox: { title: 'Deity Inbox', subtitle: 'Obsidian timeline + divine decision stream' },
    clients: { title: 'VIP Sanctum', subtitle: 'Protected roster with deity-grade routing' },
    analytics: { title: 'Deity Analytics', subtitle: 'Golden trends + violet pulse signals' }
  };

  const currentTab = tabTitles[activeTab] || { title: 'YYDS Deity-Ops Console', subtitle: 'Yong Yuan De Shen' };

  headerContainer.innerHTML = `
    <div class="header-title-container">
      <h1 class="header-title" id="header-main-title">${currentTab.title}</h1>
      <span class="header-subtitle" id="header-sub-title">${currentTab.subtitle}</span>
    </div>

    <div class="header-actions">
      <div class="system-status">
        <span class="status-dot-pulse"></span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:14px; height:14px; stroke: currentColor; stroke-width: 2; fill: none;"><path d="M12 3c2.6 2.1 5.4 2.1 7.4 2.1 0 6.5-2.1 10.9-7.4 13.0C6.7 16 4.6 11.6 4.6 5.1c2 0 4.8 0 7.4-2.1z"/><path d="M9 12l2 2 4-4"/></svg>
        <span>AI GUARDIAN: SUPREME DEFENSE</span>
      </div>

      <div class="header-clock" id="header-clock-display">00:00:00</div>
    </div>
  `;

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

// --- 3.3 OVERVIEW VIEW ---
async function renderOverview(onTabChange, onAddClient) {
  const container = document.getElementById('view-overview');
  if (!container) return;

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
    const [stats, tickets, conversations] = await Promise.all([
      apiService.getOverview(),
      apiService.getTickets(),
      apiService.getConversations()
    ]);

    const activeVips = stats.activeClients;
    const totalConvs = stats.totalConversations;
    const totalTkts = stats.totalTickets;
    const ignoredCount = stats.byDecision.IGNORE;

    const recentConvs = conversations
      .filter(c => c.direction === 'inbound')
      .slice(-5)
      .reverse();

    const recentTkts = tickets.slice(0, 5);

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <div class="overview-grid">
          <div class="glass-panel kpi-card indigo">
            <div class="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <div class="kpi-details">
              <span class="kpi-value">${totalConvs}</span>
              <span class="kpi-title">YYDS Conversations</span>
            </div>
          </div>

          <div class="glass-panel kpi-card emerald">
            <div class="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 14h6"/><path d="M9 10h6"/></svg>
            </div>
            <div class="kpi-details">
              <span class="kpi-value">${totalTkts}</span>
              <span class="kpi-title">Deity Tickets Forged</span>
            </div>
          </div>

          <div class="glass-panel kpi-card amber">
            <div class="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg>
            </div>
            <div class="kpi-details">
              <span class="kpi-value">${activeVips}</span>
              <span class="kpi-title">VIP Sanctum</span>
            </div>
          </div>

          <div class="glass-panel kpi-card gray">
            <div class="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            </div>
            <div class="kpi-details">
              <span class="kpi-value">${ignoredCount}</span>
              <span class="kpi-title">Noise Suppressed</span>
            </div>
          </div>
        </div>

        <div class="overview-content-split">
          <div class="glass-panel">
            <div class="glass-panel-title">
              <span>Incoming Signals</span>
              <button class="btn btn-secondary btn-icon" id="ov-view-inbox-btn" title="Open Deity Inbox">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
            <div class="feed-list">
              ${recentConvs.length === 0 ? `<div style="text-align: center; padding: 2rem; color: var(--color-muted);">No recent signals.</div>` : 
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
                          ${isTicket ? 'DECREE: TICKET' : 'DECREE: IGNORE'}
                        </span>
                      </div>
                    </div>
                  `;
                }).join('')
              }
            </div>
          </div>

          <div class="glass-panel">
            <div class="glass-panel-title">
              <span>AI-Forged Tickets</span>
              <button class="btn btn-secondary btn-icon" id="ov-view-tickets-btn" title="Open Deity Tickets">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
            <div class="feed-list">
              ${recentTkts.length === 0 ? `<div style="text-align: center; padding: 2rem; color: var(--color-muted);">No recent tickets.</div>` :
                recentTkts.map(tkt => {
                  const pBadge = tkt.priority === 'High' ? 'badge-danger' : 'badge-warning';
                  let sBadge = 'badge-muted';
                  if (tkt.status === 'In Progress') sBadge = 'badge-warning';
                  if (tkt.status === 'Resolved' || tkt.status === 'Done') sBadge = 'badge-success';

                  return `
                    <div class="feed-item" data-ticket-id="${tkt.id}">
                      <div class="feed-item-left">
                        <div class="kpi-icon" style="width: 36px; height: 36px; min-width: 36px; padding: 0; background: rgba(251,191,36,0.06); border-color: rgba(251,191,36,0.16); color: var(--accent-primary)">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 18px; height: 18px;"><path d="M9 12h6M9 16h6M4 4h16v16H4z"/></svg>
                        </div>
                        <div class="feed-details">
                          <span class="feed-name">${tkt.summary}</span>
                          <span class="feed-snippet">Sender: ${tkt.client_name} • Key: ${tkt.jira_key || `#${tkt.id}`}</span>
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

        <div class="glass-panel">
          <div class="glass-panel-title" style="margin-bottom: 0.85rem;">Deity Actions</div>
          <div class="quick-actions-strip">
            <button class="btn btn-primary" id="qa-inbox-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Open Deity Inbox
            </button>
            <button class="btn btn-secondary" id="qa-tickets-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/></svg>
              Manage Deity Tickets
            </button>
            <button class="btn btn-secondary" id="qa-addclient-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              Add VIP to Sanctum
            </button>
          </div>
        </div>

      </div>
    `;

    document.getElementById('ov-view-inbox-btn')?.addEventListener('click', () => onTabChange('inbox'));
    document.getElementById('ov-view-tickets-btn')?.addEventListener('click', () => onTabChange('tickets'));
    
    document.getElementById('qa-inbox-btn')?.addEventListener('click', () => onTabChange('inbox'));
    document.getElementById('qa-tickets-btn')?.addEventListener('click', () => onTabChange('tickets'));
    document.getElementById('qa-addclient-btn')?.addEventListener('click', onAddClientTrigger);

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

// --- 3.4 TICKETS VIEW ---
let allTickets = [];
let filteredTickets = [];
let currentFilters = { query: '', priority: 'All', status: 'All' };

async function renderTickets(options = {}) {
  const container = document.getElementById('view-tickets');
  if (!container) return;

  container.innerHTML = `
    <div class="glass-panel" style="height: 500px; display: flex; align-items: center; justify-content: center; animation: pulse 1.5s infinite ease-in-out;">
      <span style="color: var(--color-muted);">Summoning Deity Tickets…</span>
    </div>
  `;

  try {
    allTickets = await apiService.getTickets();
    applyFilters();

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="glass-panel tickets-filter-bar">
          <div class="search-input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="form-control" id="tkt-search-input" placeholder="Search by summary or sender…" value="${currentFilters.query}">
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <select class="form-control" id="tkt-priority-filter">
              <option value="All" ${currentFilters.priority === 'All' ? 'selected' : ''}>All priorities</option>
              <option value="High" ${currentFilters.priority === 'High' ? 'selected' : ''}>High</option>
              <option value="Medium" ${currentFilters.priority === 'Medium' ? 'selected' : ''}>Medium</option>
              <option value="Low" ${currentFilters.priority === 'Low' ? 'selected' : ''}>Low</option>
            </select>

            <select class="form-control" id="tkt-status-filter">
              <option value="All" ${currentFilters.status === 'All' ? 'selected' : ''}>All statuses</option>
              <option value="Open" ${currentFilters.status === 'Open' ? 'selected' : ''}>Open</option>
              <option value="In Progress" ${currentFilters.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Resolved" ${currentFilters.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
            </select>
          </div>
        </div>

        <div class="glass-panel" style="padding: 0; overflow: hidden;">
          <div class="custom-table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th style="width: 80px; padding-left: 1.5rem;">Ticket Key</th>
                  <th>Summary</th>
                  <th>Sender</th>
                  <th>Assignee</th>
                  <th style="width: 120px;">Priority</th>
                  <th style="width: 120px;">Status</th>
                  <th style="width: 130px; padding-right: 1.5rem;">Created</th>
                </tr>
              </thead>
              <tbody id="tickets-table-body"></tbody>
            </table>
          </div>
          <div id="tickets-empty-state" style="display: none; text-align: center; padding: 4rem; color: var(--color-muted);">
            No tickets match the current filter.
          </div>
        </div>
      </div>
    `;

    renderTableRows();
    bindFilterEvents();

    if (options.activeTicketId) {
      const targetTkt = allTickets.find(t => String(t.id) === String(options.activeTicketId));
      if (targetTkt) {
        showTicketDrawer(targetTkt);
      }
    }

  } catch (err) {
    console.error("Lỗi render Tickets: ", err);
    container.innerHTML = `<div class="glass-panel" style="color: var(--color-danger); text-align: center;">Failed to load Deity Tickets.</div>`;
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

  tbody.querySelectorAll('tr').forEach(row => {
    row.addEventListener('click', () => {
      const ticketId = row.getAttribute('data-row-id');
      const ticket = allTickets.find(t => String(t.id) === String(ticketId));
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

function showTicketDrawer(ticket) {
  const backdrop = document.getElementById('ticket-drawer-backdrop');
  const drawer = document.getElementById('ticket-drawer');
  if (!backdrop || !drawer) return;

  ticket = normalizeTicket(ticket);

  const formattedDate = new Date(ticket.created_at).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const lastHumanUpdate = ticket.last_human_update_at
    ? new Date(ticket.last_human_update_at).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })
    : '—';

  drawer.innerHTML = `
    <div class="drawer-header">
      <span class="drawer-title">YYDS Ticket #${ticket.jira_key || ticket.id}</span>
      <button class="drawer-close" id="tkt-drawer-close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <div class="drawer-content">
      <div class="drawer-meta-section">
        <div class="drawer-meta-item">
          <span class="drawer-meta-label">Người gửi</span>
          <span class="drawer-meta-value">${ticket.client_name}</span>
        </div>
        <div class="drawer-meta-item">
          <span class="drawer-meta-label">YYDS Thread ID</span>
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
        <div class="drawer-meta-item">
          <span class="drawer-meta-label">Ops chỉnh sửa</span>
          <span class="drawer-meta-value">${ticket.human_edits} lần</span>
        </div>
        <div class="drawer-meta-item">
          <span class="drawer-meta-label">Lần chỉnh gần nhất</span>
          <span class="drawer-meta-value">${lastHumanUpdate}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="drawer-summary-input">Tiêu đề ticket (có thể chỉnh)</label>
        <input class="form-control" id="drawer-summary-input" style="background-color: var(--bg-main)" />
      </div>

      <div class="form-group">
        <label class="form-label" for="drawer-description-input">Mô tả chi tiết (có thể chỉnh)</label>
        <textarea class="form-control" id="drawer-description-input" rows="7" style="background-color: var(--bg-main); resize: vertical;"></textarea>
      </div>

      <div class="ai-reasoning-card">
        <div class="ai-reasoning-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          DEITY AI REASONING
        </div>
        <div class="ai-reasoning-body">
          "${ticket.ai_reason}"
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem;">
        <div class="form-group" style="margin: 0;">
          <label class="form-label" for="drawer-priority-select">Priority</label>
          <select class="form-control" id="drawer-priority-select" style="background-color: var(--bg-main)">
            <option value="High" ${ticket.priority === 'High' ? 'selected' : ''}>High</option>
            <option value="Medium" ${ticket.priority === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="Low" ${ticket.priority === 'Low' ? 'selected' : ''}>Low</option>
          </select>
        </div>

        <div class="form-group" style="margin: 0;">
          <label class="form-label" for="drawer-assignee-select">Assignee</label>
          <select class="form-control" id="drawer-assignee-select" style="background-color: var(--bg-main)">
            <option value="Phuc" ${ticket.assignee_name === 'Phuc' ? 'selected' : ''}>Phuc</option>
            <option value="Tram" ${ticket.assignee_name === 'Tram' ? 'selected' : ''}>Tram</option>
            <option value="Vy" ${ticket.assignee_name === 'Vy' ? 'selected' : ''}>Vy</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="drawer-status-select">Cập nhật trạng thái thủ công</label>
        <select class="form-control" id="drawer-status-select" style="background-color: var(--bg-main)">
          <option value="Open" ${ticket.status === 'Open' ? 'selected' : ''}>Open (Đang mở)</option>
          <option value="In Progress" ${ticket.status === 'In Progress' ? 'selected' : ''}>In Progress (Đang làm)</option>
          <option value="Resolved" ${ticket.status === 'Resolved' ? 'selected' : ''}>Resolved (Đã xử lý)</option>
        </select>
      </div>
    </div>

    <div class="drawer-footer">
      <div class="drawer-footer-left">
        <button class="btn btn-danger" id="tkt-drawer-delete-btn">Xóa ticket</button>
      </div>
      <div class="drawer-footer-right">
        <button class="btn btn-secondary" id="tkt-drawer-cancel-btn">Đóng lại</button>
        <button class="btn btn-primary" id="tkt-drawer-save-btn">Lưu thay đổi</button>
      </div>
    </div>
  `;

  backdrop.style.display = 'block';
  setTimeout(() => {
    backdrop.classList.add('active');
    drawer.classList.add('active');
  }, 10);

  const closeBtn = document.getElementById('tkt-drawer-close');
  const cancelBtn = document.getElementById('tkt-drawer-cancel-btn');
  const saveBtn = document.getElementById('tkt-drawer-save-btn');
  const deleteBtn = document.getElementById('tkt-drawer-delete-btn');

  const summaryInput = document.getElementById('drawer-summary-input');
  const descriptionInput = document.getElementById('drawer-description-input');
  if (summaryInput) summaryInput.value = ticket.summary || '';
  if (descriptionInput) descriptionInput.value = ticket.description || '';

  const closeDrawer = () => {
    backdrop.classList.remove('active');
    drawer.classList.remove('active');
    setTimeout(() => backdrop.style.display = 'none', 250);
  };

  closeBtn?.addEventListener('click', closeDrawer);
  cancelBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeDrawer();
  });

  saveBtn?.addEventListener('click', async () => {
    const statusSelect = document.getElementById('drawer-status-select');
    const prioritySelect = document.getElementById('drawer-priority-select');
    const assigneeSelect = document.getElementById('drawer-assignee-select');
    const summaryEl = document.getElementById('drawer-summary-input');
    const descEl = document.getElementById('drawer-description-input');
    if (!statusSelect || !prioritySelect || !assigneeSelect || !summaryEl || !descEl) return;

    const patch = {
      status: statusSelect.value,
      priority: prioritySelect.value,
      assignee_name: assigneeSelect.value,
      summary: summaryEl.value.trim(),
      description: descEl.value.trim()
    };

    saveBtn.textContent = 'Đang lưu...';
    saveBtn.disabled = true;
    deleteBtn && (deleteBtn.disabled = true);

    try {
      const res = await apiService.updateTicket(ticket.id, patch);
      if (!res || !res.success) throw new Error(res?.error || 'Update failed');
      closeDrawer();
      allTickets = await apiService.getTickets();
      applyFilters();
      renderTableRows();
    } catch (err) {
      console.error("Lỗi cập nhật ticket: ", err);
      alert("Đã xảy ra lỗi trong quá trình lưu trạng thái.");
      saveBtn.textContent = 'Lưu thay đổi';
      saveBtn.disabled = false;
      deleteBtn && (deleteBtn.disabled = false);
    }
  });

  deleteBtn?.addEventListener('click', async () => {
    const ok = confirm(`Xóa ticket #${ticket.jira_key || ticket.id}? Hành động này dùng để đánh dấu AI tạo ticket không hợp lệ.`);
    if (!ok) return;
    deleteBtn.textContent = 'Đang xóa...';
    deleteBtn.disabled = true;
    saveBtn && (saveBtn.disabled = true);

    try {
      const res = await apiService.deleteTicket(ticket.id);
      if (!res || !res.success) throw new Error(res?.error || 'Delete failed');
      closeDrawer();
      allTickets = await apiService.getTickets();
      applyFilters();
      renderTableRows();
    } catch (err) {
      console.error("Lỗi xóa ticket: ", err);
      alert("Đã xảy ra lỗi trong quá trình xóa ticket.");
      deleteBtn.textContent = 'Xóa ticket';
      deleteBtn.disabled = false;
      saveBtn && (saveBtn.disabled = false);
    }
  });
}

// --- 3.5 INBOX COMPONENT ---
let inboxActiveChatId = null;
let allClientsList = [];
let allConvsList = [];

async function renderInbox(options = {}) {
  const container = document.getElementById('view-inbox');
  if (!container) return;

  if (options.activeChatId) {
    inboxActiveChatId = options.activeChatId;
  }

  container.innerHTML = `
    <div class="inbox-container">
      <div class="glass-panel" style="height: 100%; animation: pulse 1.5s infinite ease-in-out;"></div>
      <div class="glass-panel" style="height: 100%; animation: pulse 1.5s infinite ease-in-out;"></div>
    </div>
  `;

  try {
    allClientsList = await apiService.getClients();
    allConvsList = await apiService.getConversations();

    if (!inboxActiveChatId && allClientsList.length > 0) {
      inboxActiveChatId = allClientsList[0].chat_id;
    }

    container.innerHTML = `
      <div class="inbox-container">
        <div class="inbox-sidebar">
          <div class="glass-panel" style="flex-grow: 1; display: flex; flex-direction: column; gap: 1rem; overflow: hidden; padding: 1rem;">
            <div class="glass-panel-title" style="margin-bottom: 0.5rem;">Danh sách hội thoại</div>
            <div class="chat-threads-list" id="inbox-threads-container"></div>
          </div>
        </div>

        <div class="inbox-chatpane glass-panel" id="inbox-chatpane-container" style="padding: 0; overflow: hidden;"></div>
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

  if (allClientsList.length === 0) {
    threadsContainer.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--color-muted); font-size: 0.85rem;">Không có số bảo vệ nào</div>`;
    return;
  }

  threadsContainer.innerHTML = allClientsList.map(client => {
    const clientMsgs = allConvsList.filter(c => c.chat_id === client.chat_id && c.direction !== 'system');
    const lastMsg = clientMsgs[clientMsgs.length - 1] || { text: 'Không có tin nhắn', created_at: client.created_at };
    
    const lastInboundMsg = allConvsList.filter(c => c.chat_id === client.chat_id && c.direction === 'inbound').pop();
    const decision = lastInboundMsg ? lastInboundMsg.aiDecision : 'IGNORE';

    const initial = client.display_name ? client.display_name.charAt(0) : '?';
    const avatarClass = `avatar-${Math.abs(client.chat_id.charCodeAt(0) + client.chat_id.charCodeAt(1)) % 8}`;
    const relativeTime = getRelativeTime(lastMsg.created_at);

    return `
      <div class="chat-thread-card ${inboxActiveChatId === client.chat_id ? 'active' : ''}" data-chat-id="${client.chat_id}">
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

  threadsContainer.querySelectorAll('.chat-thread-card').forEach(card => {
    card.addEventListener('click', () => {
      inboxActiveChatId = card.getAttribute('data-chat-id');
      threadsContainer.querySelectorAll('.chat-thread-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      renderChatPane();
    });
  });
}

async function renderChatPane() {
  const chatPane = document.getElementById('inbox-chatpane-container');
  if (!chatPane) return;

  if (!inboxActiveChatId) {
    chatPane.innerHTML = `
      <div class="chatpane-empty">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>Chọn một hội thoại để giám sát quyết định của AI</span>
      </div>
    `;
    return;
  }

  const client = allClientsList.find(c => c.chat_id === inboxActiveChatId);
  if (!client) return;

  const chatMessages = allConvsList.filter(c => c.chat_id === inboxActiveChatId);
  const lastInboundMsg = chatMessages.filter(c => c.direction === 'inbound').pop();
  const decision = lastInboundMsg ? lastInboundMsg.aiDecision : 'IGNORE';

  let aiReason = "Số điện thoại nằm trong whitelist. Đang lắng nghe cuộc hội thoại...";
  if (decision === 'CREATE_SUBTASK') {
    const matchingTkt = (await apiService.getTickets()).find(t => t.chat_id === inboxActiveChatId);
    if (matchingTkt) {
      aiReason = matchingTkt.ai_reason;
    } else {
      aiReason = "Khách hàng báo cáo yêu cầu hành động nghiệp vụ thực tế, tự động mở rộng Subtask.";
    }
  } else {
    aiReason = "Tin nhắn mang tính chất chào hỏi, xã giao hoặc không actionable. AI bỏ qua.";
  }

  chatPane.innerHTML = `
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

    <div class="chat-input-container">
      <form id="chat-reply-form" style="width: 100%;">
        <input type="text" class="form-control chat-input-field" id="chat-reply-input" placeholder="Nhập tin nhắn phản hồi thủ công trên YYDS..." required>
        <button class="btn btn-primary" type="submit" id="chat-send-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; transform: rotate(45deg);"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          Gửi
        </button>
      </form>
    </div>
  `;

  const windowEl = document.getElementById('chat-messages-window');
  if (windowEl) windowEl.scrollTop = windowEl.scrollHeight;

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
      const res = await apiService.sendMessage(inboxActiveChatId, text);
      if (res.success) {
        input.value = '';
        allConvsList = await apiService.getConversations();
        renderChatPane();
        renderThreadsList();
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

// --- 3.6 VIP CLIENTS VIEW ---
let allClientsGrid = [];

async function renderClients() {
  const container = document.getElementById('view-clients');
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div class="clients-grid-header" style="height: 40px; animation: pulse 1.5s infinite ease-in-out; background: rgba(255,255,255,0.01); border-radius: 8px;"></div>
      <div class="clients-grid">
        ${Array(4).fill(0).map(() => `<div class="glass-panel" style="height: 250px; animation: pulse 1.5s infinite ease-in-out;"></div>`).join('')}
      </div>
    </div>
  `;

  try {
    allClientsGrid = await apiService.getClients();
    
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
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

        <div class="clients-grid">
          ${allClientsGrid.length === 0 ? `<div class="glass-panel" style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--color-muted);">Không có khách hàng VIP nào được Whitelist.</div>` : 
            allClientsGrid.map(c => {
              const initial = c.display_name ? c.display_name.charAt(0) : '?';
              const avatarClass = `avatar-${Math.abs(c.chat_id.charCodeAt(0) + c.chat_id.charCodeAt(1)) % 8}`;
              const formattedDate = new Date(c.created_at).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });

              return `
                <div class="glass-panel client-card">
                  <div class="client-card-inner">
                    <div style="position: absolute; top: 1rem; right: 1rem;">
                      <span class="badge badge-success" style="font-size: 0.65rem; padding: 0.15rem 0.5rem;">ACTIVE</span>
                    </div>

                    <div class="client-card-avatar ${avatarClass}">${initial}</div>
                    <div class="client-card-name">${c.display_name}</div>
                    <div class="client-card-phone" style="font-family: monospace;">${c.chat_id}</div>

                    <div class="client-card-stats">
                      <div class="client-stat-item">
                        <span class="client-stat-label">Số Tickets YYDS</span>
                        <span class="client-stat-value" style="color: var(--accent-primary);">${c.ticket_count} tickets</span>
                      </div>
                    </div>

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

    document.getElementById('whitelist-add-btn')?.addEventListener('click', showAddClientModal);

  } catch (err) {
    console.error("Lỗi render Clients: ", err);
    container.innerHTML = `<div class="glass-panel" style="color: var(--color-danger); text-align: center;">Failed to load the VIP Sanctum.</div>`;
  }
}

function showAddClientModal() {
  const backdrop = document.getElementById('add-client-modal-backdrop');
  const modal = document.getElementById('add-client-modal');
  if (!backdrop || !modal) return;

  modal.innerHTML = `
    <div class="modal-header">
      <span class="modal-title">Add VIP to Sanctum</span>
      <button class="drawer-close" id="modal-close-btn" style="padding: 0.25rem;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:20px; height:20px; stroke: currentColor; stroke-width: 2; fill: none;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <div class="modal-body">
      <form id="add-client-form">
        <div class="form-group">
          <label class="form-label" for="add-client-chatid">YYDS Contact / Thread ID</label>
          <input type="text" class="form-control" id="add-client-chatid" placeholder="Example: 84987654321 or a group thread id…" required>
          <span style="font-size: 0.72rem; color: var(--color-muted); margin-top: 0.2rem;">Tip: no spaces; omit the leading +.</span>
        </div>

        <div class="form-group">
          <label class="form-label" for="add-client-name">Display name</label>
          <input type="text" class="form-control" id="add-client-name" placeholder="Example: Vy…" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="add-client-assignee">Default assignee (auto-routing)</label>
          <select class="form-control" id="add-client-assignee" style="background-color: var(--bg-main)">
            <option value="Phuc">Phuc (Engineering / Infra)</option>
            <option value="Tram">Tram (Strategy / Scheduling)</option>
            <option value="Vy" selected>Vy (Internal Tools)</option>
          </select>
        </div>
      </form>
    </div>

    <div class="modal-footer">
      <button class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
      <button class="btn btn-primary" id="modal-submit-btn" type="submit" form="add-client-form">Save to Sanctum</button>
    </div>
  `;

  backdrop.style.display = 'flex';
  setTimeout(() => backdrop.classList.add('active'), 10);

  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const form = document.getElementById('add-client-form');
  const submitBtn = document.getElementById('modal-submit-btn');

  const closeModal = () => {
    backdrop.classList.remove('active');
    setTimeout(() => backdrop.style.display = 'none', 250);
  };

  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const chatIdVal = document.getElementById('add-client-chatid').value.trim();
    const nameVal = document.getElementById('add-client-name').value.trim();
    const assigneeVal = document.getElementById('add-client-assignee').value;

    if (!chatIdVal || !nameVal) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving…';

    try {
      const res = await apiService.addClient(chatIdVal, nameVal, assigneeVal);
      if (res.success) {
        closeModal();
        await renderClients();
      } else {
        alert(res.error || "Unable to save this VIP.");
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save to Sanctum';
      }
    } catch (err) {
      console.error("Lỗi thêm VIP Client: ", err);
      alert("A system error occurred while adding this VIP.");
      submitBtn.disabled = false;
      submitBtn.textContent = 'Save to Sanctum';
    }
  });
}

// --- 3.7 ANALYTICS VIEW ---
async function renderAnalytics() {
  const container = document.getElementById('view-analytics');
  if (!container) return;

  container.innerHTML = `
    <div class="analytics-grid">
      <div class="glass-panel" style="height: 350px; animation: pulse 1.5s infinite ease-in-out;"></div>
      <div class="glass-panel" style="height: 350px; animation: pulse 1.5s infinite ease-in-out;"></div>
    </div>
  `;

  try {
    const stats = await apiService.getOverview();
    const ticketsAll = await apiService.getTickets({ includeDeleted: true });
    const tickets = ticketsAll.filter(t => !t.is_deleted);
    const deletedTickets = ticketsAll.filter(t => t.is_deleted).length;
    const editedTickets = ticketsAll.filter(t => (t.human_edits || 0) > 0).length;
    const acceptanceRate = ticketsAll.length > 0 ? ((tickets.length / ticketsAll.length) * 100) : 100;

    const decisionStats = stats.byDecision;
    const subtasksCount = decisionStats.CREATE_SUBTASK || 0;
    const commentCount = decisionStats.COMMENT || 0;
    const ignoreCount = decisionStats.IGNORE || 0;
    const grandTotal = subtasksCount + commentCount + ignoreCount;

    const circ = 314.15;
    const pctSubtasks = grandTotal > 0 ? (subtasksCount / grandTotal) : 0;
    const pctComments = grandTotal > 0 ? (commentCount / grandTotal) : 0;
    const pctIgnore = grandTotal > 0 ? (ignoreCount / grandTotal) : 0;

    const strokeSubtasks = pctSubtasks * circ;
    const strokeComments = pctComments * circ;
    const strokeIgnore = pctIgnore * circ;

    const offsetSubtasks = 0;
    const offsetComments = strokeSubtasks;
    const offsetIgnore = strokeSubtasks + strokeComments;

    const dates = ['05/26', '05/27', '05/28', '05/29', '05/30'];
    const trendValues = [0, 0, 0, 0, 0];

    tickets.forEach(t => {
      const createdDate = new Date(t.created_at);
      const m = String(createdDate.getMonth() + 1).padStart(2, '0');
      const d = String(createdDate.getDate()).padStart(2, '0');
      const format = `${m}/${d}`;
      const idx = dates.indexOf(format);
      if (idx !== -1) trendValues[idx]++;
    });

    if (trendValues.reduce((a,b)=>a+b, 0) === 0) {
      trendValues[0] = 1;
      trendValues[1] = 2;
      trendValues[2] = 3;
      trendValues[3] = 4;
      trendValues[4] = subtasksCount > 10 ? 8 : subtasksCount;
    }

    const maxVal = Math.max(...trendValues, 5);
    
    const coords = trendValues.map((val, idx) => {
      const x = 30 + (idx * 90);
      const y = 140 - (val / maxVal * 110);
      return { x, y, val };
    });

    const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
    const areaPath = `${linePath} L ${coords[coords.length - 1].x} 140 L ${coords[0].x} 140 Z`;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="analytics-grid">
          <div class="glass-panel" style="display: flex; flex-direction: column;">
            <div class="glass-panel-title">Tỷ lệ phân loại tin nhắn của AI</div>
            <div class="chart-container" style="position: relative;">
              <svg viewBox="0 0 200 200" class="chart-svg" style="max-width: 200px;">
                <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="14"/>

                <circle cx="100" cy="100" r="50" fill="none" stroke="var(--accent-primary)" stroke-width="14"
                  class="donut-segment"
                  stroke-dasharray="${strokeSubtasks} ${circ}"
                  stroke-dashoffset="-${offsetSubtasks}"
                  transform="rotate(-90 100 100)"/>

                <circle cx="100" cy="100" r="50" fill="none" stroke="var(--color-warning)" stroke-width="14"
                  class="donut-segment"
                  stroke-dasharray="${strokeComments} ${circ}"
                  stroke-dashoffset="-${offsetComments}"
                  transform="rotate(-90 100 100)"/>

                <circle cx="100" cy="100" r="50" fill="none" stroke="#64748b" stroke-width="14"
                  class="donut-segment"
                  stroke-dasharray="${strokeIgnore} ${circ}"
                  stroke-dashoffset="-${offsetIgnore}"
                  transform="rotate(-90 100 100)"/>

                <g class="donut-center-text">
                  <text class="donut-center-num" x="100" y="94">${grandTotal}</text>
                  <text class="donut-center-lbl" x="100" y="118">TỔNG EVENT</text>
                </g>
              </svg>
            </div>
            
            <div class="chart-legend">
              <div class="legend-item">
                <span class="legend-color-dot" style="background-color: var(--accent-primary)"></span>
                <span>Subtask (${Math.round(pctSubtasks*100)}%)</span>
              </div>
              <div class="legend-item">
                <span class="legend-color-dot" style="background-color: var(--color-warning)"></span>
                <span>Comment (${Math.round(pctComments*100)}%)</span>
              </div>
              <div class="legend-item">
                <span class="legend-color-dot" style="background-color: #64748b"></span>
                <span>Ignored (${Math.round(pctIgnore*100)}%)</span>
              </div>
            </div>
          </div>

          <div class="glass-panel" style="display: flex; flex-direction: column;">
            <div class="glass-panel-title">Tần suất tạo Ticket qua các ngày</div>
            <div class="chart-container">
              <svg viewBox="0 0 420 180" class="chart-svg" style="max-height: 180px;">
                <defs>
                  <linearGradient id="indigo-purple-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="var(--accent-primary)"/>
                    <stop offset="100%" stop-color="var(--accent-secondary)"/>
                  </linearGradient>
                  <linearGradient id="area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="var(--accent-primary)" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="var(--accent-primary)" stop-opacity="0.0"/>
                  </linearGradient>
                </defs>

                <line x1="30" y1="30" x2="390" y2="30" class="chart-grid-line"/>
                <line x1="30" y1="85" x2="390" y2="85" class="chart-grid-line"/>
                <line x1="30" y1="140" x2="390" y2="140" class="chart-axis-line"/>

                ${dates.map((d, i) => `<text class="chart-axis-text" x="${30 + i * 90}" y="160" text-anchor="middle">${d}</text>`).join('')}

                <text class="chart-axis-text" x="15" y="34" text-anchor="middle">${maxVal}</text>
                <text class="chart-axis-text" x="15" y="89" text-anchor="middle">${Math.round(maxVal/2)}</text>
                <text class="chart-axis-text" x="15" y="144" text-anchor="middle">0</text>

                <path d="${areaPath}" class="chart-area"/>
                <path d="${linePath}" class="chart-line"/>

                ${coords.map((c, i) => `
                  <circle cx="${c.x}" cy="${c.y}" r="5" class="chart-point">
                    <title>Ngày ${dates[i]}: ${c.val} Ticket</title>
                  </circle>
                  <text class="chart-axis-text" x="${c.x}" y="${c.y - 10}" text-anchor="middle" style="fill:#fff; font-weight:700;">${c.val}</text>
                `).join('')}
              </svg>
            </div>
            
            <div style="text-align: center; margin-top: 1.5rem; font-size: 0.78rem; color: var(--color-muted);">
              <span>Trục đứng (Y): Số lượng Tickets được tạo tự động • Trục ngang (X): Dữ liệu theo ngày</span>
            </div>
          </div>
        </div>

        <div class="glass-panel" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <span style="font-size: 0.75rem; color: var(--color-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Tỷ lệ AI hợp lệ</span>
            <span style="font-family: var(--font-family-title); font-size: 1.85rem; font-weight: 800; color: var(--color-success)">${acceptanceRate.toFixed(1)}%</span>
            <span style="font-size: 0.75rem; color: var(--color-muted);">${tickets.length} giữ lại • ${deletedTickets} bị xóa sau review</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <span style="font-size: 0.75rem; color: var(--color-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Ops chỉnh sửa</span>
            <span style="font-family: var(--font-family-title); font-size: 1.85rem; font-weight: 800; color: var(--accent-primary)">${editedTickets}</span>
            <span style="font-size: 0.75rem; color: var(--color-muted);">Số ticket được chỉnh thủ công để audit AI.</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <span style="font-size: 0.75rem; color: var(--color-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Tổng tài nguyên tiết kiệm</span>
            <span style="font-family: var(--font-family-title); font-size: 1.85rem; font-weight: 800; color: var(--color-warning)">~18 Giờ / Ops</span>
            <span style="font-size: 0.75rem; color: var(--color-muted);">Thời gian phân loại và nạp thủ công ước tính.</span>
          </div>
        </div>
      </div>
    `;

  } catch (err) {
    console.error("Lỗi render Analytics: ", err);
    container.innerHTML = `<div class="glass-panel" style="color: var(--color-danger); text-align: center;">Lỗi tải cấu phần Báo cáo Hiệu suất.</div>`;
  }
}

// Helpers
function getRelativeTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'vừa xong';
  if (diffMins < 60) return `${diffMins}m trước`;
  if (diffHours < 24) return `${diffHours}h trước`;
  return `${diffDays}d trước`;
}

function onAddClientTrigger() {
  showAddClientModal();
}

function setSidebarCollapsed(isCollapsed) {
  document.body.classList.toggle('sidebar-collapsed', Boolean(isCollapsed));
  try {
    localStorage.setItem('yyds_sidebar_collapsed', isCollapsed ? '1' : '0');
  } catch (e) {}
}

// ============================================================================
//                     PART 4: APP CONTROLLER & ROUTING
// ============================================================================

let activeTab = 'overview';

function onTabChange(newTabId, options = {}) {
  activeTab = newTabId;

  renderSidebar(activeTab, onTabChange);
  renderHeader(activeTab);

  const viewSections = document.querySelectorAll('.view-section');
  viewSections.forEach(section => section.classList.remove('active'));

  const targetSection = document.getElementById(`view-${activeTab}`);
  if (targetSection) targetSection.classList.add('active');

  switch (activeTab) {
    case 'overview':
      renderOverview(onTabChange, onAddClientTrigger);
      break;
    case 'tickets':
      renderTickets(options);
      break;
    case 'inbox':
      renderInbox(options);
      break;
    case 'clients':
      renderClients();
      break;
    case 'analytics':
      renderAnalytics();
      break;
    default:
      console.warn(`Tab không xác định: ${activeTab}`);
  }
}

// Initial Bootloader
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (localStorage.getItem('yyds_sidebar_collapsed') === '1') {
      document.body.classList.add('sidebar-collapsed');
    }
  } catch (e) {}

  if (CONFIG.useMock) {
    if (state.clients.length === 0) state.clients = [ ...mockClients ];
    if (state.tickets.length === 0) state.tickets = mockTickets.map(normalizeTicket);
    if (state.conversations.length === 0) state.conversations = [ ...mockConversations ];
    state.overview = { ...mockOverview };
  }

  onTabChange(activeTab);
});
