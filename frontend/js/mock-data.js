// High-fidelity Mock Data for DantaLabs Support Automation Dashboard
// Matches exactly 100% the DB schemas and REST API contracts from backend_spec.md

export const mockOverview = {
  totalConversations: 142,
  totalTickets: 28,
  activeClients: 12,
  byDecision: {
    CREATE_SUBTASK: 28,
    COMMENT: 34,
    IGNORE: 80
  }
};

export const mockClients = [
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
    display_name: "Ops Team Danta Labs",
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
    display_name: "Phan Hoàng Sơn (Danta VIP)",
    ticket_count: 0,
    assignee_id: "7120c0000000000000000002",
    assignee_name: "Tram",
    last_seen_at: "2026-05-28T15:10:00+07:00",
    created_at: "2026-05-27T16:40:00+07:00"
  }
];

export const mockTickets = [
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
    jira_key: "DANTA-104",
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
    jira_key: "DANTA-103",
    created_at: "2026-05-30T10:15:00+07:00",
    updated_at: "2026-05-30T10:30:00+07:00"
  },
  {
    id: 102,
    chat_id: "84901122334@c.us",
    client_name: "Thùy Trâm",
    summary: "Họp tư vấn chiến lược di chuyển hạ tầng dữ liệu và định giá",
    description: "Khách hàng có mong muốn đặt lịch hẹn họp vào đầu tuần tới (thứ Hai lúc 14:00) nhằm làm việc sâu hơn về báo giá gói hỗ trợ doanh nghiệp và chi phí dự phòng di cư database sang Supabase Enterprise.\n\nCần chuẩn bị slide tổng hợp và bảng so sánh báo giá dự kiến gửi khách trước giờ họp.",
    priority: "Medium",
    status: "In Progress",
    assignee_id: "7120c0000000000000000002",
    assignee_name: "Tram",
    ai_reason: "Khách hàng gửi yêu cầu họp thảo luận tư vấn chiến lược và thương thảo biểu phí dịch vụ mới. Điều phối về cho Tram giải quyết chính xác.",
    jira_key: "DANTA-102",
    created_at: "2026-05-30T09:31:00+07:00",
    updated_at: "2026-05-30T09:35:00+07:00"
  },
  {
    id: 101,
    chat_id: "1203631987654321@g.us",
    client_name: "Ops Team Danta Labs",
    summary: "Xử lý lỗi rò rỉ bộ nhớ (Memory leak) của whatsappIngestion script",
    description: "Nhóm vận hành phản ánh server chạy whatsapp-web.js thường xuyên bị quá tải CPU và crash bất ngờ sau 48h hoạt động liên tục. Nghi ngờ lỗi rò rỉ do tích hợp Chromium headless không giải phóng bộ nhớ khi khởi tạo lại QR Auth.\n\nPhuc cần kiểm tra kỹ phương thức client.destroy() và dọn dẹp các tiến trình zombie chrome.",
    priority: "High",
    status: "Resolved",
    assignee_id: "7120c0000000000000000001",
    assignee_name: "Phuc",
    ai_reason: "Báo cáo lỗi kỹ thuật hạ tầng, ảnh hưởng lớn đến thời gian uptime của toàn bộ pipeline tin nhắn WhatsApp. Lập ticket ưu tiên cao giao cho Phuc.",
    jira_key: "DANTA-101",
    created_at: "2026-05-29T14:20:00+07:00",
    updated_at: "2026-05-30T08:15:00+07:00"
  },
  {
    id: 100,
    chat_id: "84933445566@c.us",
    client_name: "Lê Minh Tuấn (VIP Partner)",
    summary: "Đồng bộ hóa danh sách VIP Client tự động từ Google Sheet",
    description: "Khách hàng Tuấn đề xuất viết một script NodeJS chạy cronjob mỗi 12 giờ để kéo danh sách đối tác VIP từ Google Sheet của phòng Marketing về lưu trữ trong Supabase, thay vì nhập thủ công bằng SQL Editor.",
    priority: "Medium",
    status: "Resolved",
    assignee_id: "7120c0000000000000000003",
    assignee_name: "Vy",
    ai_reason: "Mở rộng tính năng tự động hóa luồng nhập liệu. Chuyển cho Vy xử lý.",
    jira_key: "DANTA-100",
    created_at: "2026-05-28T10:10:00+07:00",
    updated_at: "2026-05-29T16:00:00+07:00"
  }
];

export const mockConversations = [
  // Conversation Thread 1: Phúc
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
    client_name: "Hệ thống",
    text: "[AI Engine] Đang phân tích tin nhắn và ngữ cảnh cuộc hội thoại...",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T10:45:30+07:00"
  },
  {
    id: "c1_sys_t",
    chat_id: "84987654321@c.us",
    client_name: "Hệ thống",
    text: "[AI Engine] Tạo ticket Jira thành công! Mã Subtask con: #DANTA-104. Phân công xử lý mặc định: PIC Phuc.",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T10:46:00+07:00"
  },
  {
    id: "c1_out",
    chat_id: "84987654321@c.us",
    client_name: "Danta Labs Autoreply",
    text: "[Hệ thống tự động] Xin chào Nguyễn Đình Phúc, yêu cầu hỗ trợ kỹ thuật của bạn đã được ghi nhận tự động vào hệ thống! Mã số Ticket hỗ trợ: #DANTA-104. PIC Phuc đang tiếp nhận xử lý.",
    direction: "outbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T10:46:05+07:00"
  },

  // Conversation Thread 2: Vy
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
    client_name: "Hệ thống",
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
    client_name: "Hệ thống",
    text: "[AI Engine] Phát hiện yêu cầu phát triển tính năng vận hành nội bộ. Tạo ticket thành công! Mã Subtask con: #DANTA-103. PIC phụ trách: Vy.",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T11:05:00+07:00"
  },
  {
    id: "c2_out",
    chat_id: "84912345678@c.us",
    client_name: "Danta Labs Autoreply",
    text: "[Hệ thống tự động] Xin chào Khánh Vy, yêu cầu hỗ trợ kỹ thuật của bạn đã được ghi nhận tự động vào hệ thống! Mã số Ticket hỗ trợ: #DANTA-103. PIC Vy đang chịu trách nhiệm giải quyết.",
    direction: "outbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T11:05:05+07:00"
  },

  // Conversation Thread 3: Trâm
  {
    id: "c3_1",
    chat_id: "84901122334@c.us",
    client_name: "Thùy Trâm",
    text: "Thứ 2 tuần tới khoảng 2h chiều, anh Phúc với chị Trâm rảnh họp tư vấn biểu phí chuyển đổi database Supabase Enterprise cho tôi nhé.",
    direction: "inbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T09:30:00+07:00"
  },
  {
    id: "c3_sys",
    chat_id: "84901122334@c.us",
    client_name: "Hệ thống",
    text: "[AI Engine] Nhận diện lịch họp tư vấn di chuyển hạ tầng và chính sách định giá dịch vụ. Tạo ticket thành công! Mã Subtask con: #DANTA-102. PIC phụ trách: Tram.",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T09:31:00+07:00"
  },
  {
    id: "c3_out",
    chat_id: "84901122334@c.us",
    client_name: "Danta Labs Autoreply",
    text: "[Hệ thống tự động] Xin chào Thùy Trâm, yêu cầu hỗ trợ kỹ thuật của bạn đã được ghi nhận tự động vào hệ thống! Mã số Ticket hỗ trợ: #DANTA-102. PIC Tram đang xử lý yêu cầu đặt lịch họp và chuẩn bị slide.",
    direction: "outbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-30T09:31:05+07:00"
  },

  // Conversation Thread 4: Ops Team Group
  {
    id: "c4_1",
    chat_id: "1203631987654321@g.us",
    client_name: "Ops Team Danta Labs",
    text: "Phúc ơi, script whatsappIngestion chạy headless chrome trên Render cứ 2 ngày là bị overload CPU rồi đơ cứng luôn. Có bị memory leak gì không vậy?",
    direction: "inbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-29T14:18:00+07:00"
  },
  {
    id: "c4_sys",
    chat_id: "1203631987654321@g.us",
    client_name: "Hệ thống",
    text: "[AI Engine] Cảnh báo lỗi nghiêm trọng về memory leak và tài nguyên CPU quá tải. Tạo ticket thành công! Mã Subtask con: #DANTA-101. PIC phụ trách: Phuc.",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-29T14:20:00+07:00"
  },

  // Conversation Thread 5: Lê Minh Tuấn
  {
    id: "c5_1",
    chat_id: "84933445566@c.us",
    client_name: "Lê Minh Tuấn (VIP Partner)",
    text: "Marketing kêu nhập VIP client bằng tay bất tiện quá, team xem làm thế nào tự động kéo từ file Excel/Google Sheet về Supabase định kỳ được không?",
    direction: "inbound",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-28T10:08:00+07:00"
  },
  {
    id: "c5_sys",
    chat_id: "84933445566@c.us",
    client_name: "Hệ thống",
    text: "[AI Engine] Tạo ticket Jira hỗ trợ tự động đồng bộ hóa danh mục. Mã Subtask: #DANTA-100. PIC phụ trách: Vy.",
    direction: "system",
    aiDecision: "CREATE_SUBTASK",
    created_at: "2026-05-28T10:10:00+07:00"
  },

  // Conversation Thread 6: Phan Hoàng Sơn
  {
    id: "c6_1",
    chat_id: "84988776655@c.us",
    client_name: "Phan Hoàng Sơn (Danta VIP)",
    text: "Hello team Danta Labs nha, hôm nay vận hành ổn áp chứ?",
    direction: "inbound",
    aiDecision: "IGNORE",
    created_at: "2026-05-28T15:09:00+07:00"
  },
  {
    id: "c6_sys",
    chat_id: "84988776655@c.us",
    client_name: "Hệ thống",
    text: "[AI Engine] Nhận tin nhắn chào hỏi thăm hỏi. Trạng thái: IGNORE.",
    direction: "system",
    aiDecision: "IGNORE",
    created_at: "2026-05-28T15:10:00+07:00"
  }
];
