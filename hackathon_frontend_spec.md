# Hackathon Specification: Frontend Dashboard UI
## Mẫu Thiết Kế & Hướng Dẫn Phát Triển Lõi (Single-File Dashboard)

Tài liệu này được biên soạn dành riêng cho lập trình viên **Frontend** trong đội tuyển Hackathon. Mục tiêu là xây dựng một hệ thống giao diện Dashboard cực kỳ **Premium & Wow**, hoạt động mượt mà, độc lập bằng cách sử dụng **Mock Data** trước khi kết hợp với Backend.

Để tăng tốc tối đa và tránh xung đột code, toàn bộ logic và UI sẽ được tập trung vào **một tệp giao diện duy nhất** (ví dụ: `src/app/page.tsx` trong Next.js hoặc `src/App.jsx` trong Vite), sử dụng cấu trúc **State-based Tabs** (chuyển đổi màn hình bằng State).

---

## 🎨 Hướng Dẫn Thẩm Mỹ & Trải Nghiệm Người Dùng (Aesthetic Rules)

* **Harmonious Palette (Bảng màu tối sang trọng):**
  * `Background chính`: Slate sẫm (`#0b0f19` hoặc `#020617`).
  * `Background panel`: Card xám mờ mờ (`#111827` hoặc `#0f172a`).
  * `Viền (Border)`: Xám đen mảnh (`#1f2937` hoặc `#334155`).
  * `Màu nhấn (Accent)`: Xanh Indigo/Purple (`#6366f1` / `#8b5cf6`).
  * `Màu trạng thái`: Success (Emerald - `#10b981`), Warning (Amber - `#f59e0b`), Danger (Rose - `#f43f5e`), Muted/Ignore (Cool Gray - `#6b7280`).
* **Hiệu ứng Premium:**
  * **Glassmorphism:** Sử dụng `backdrop-filter: blur(12px)` kết hợp với nền có độ trong suốt nhẹ (`rgba(17, 24, 39, 0.7)`).
  * **Interactive Hover:** Tất cả các hàng trong bảng, nút bấm, menu phải có hiệu ứng chuyển màu mượt mà (`transition: all 0.2s ease`).

---

## 🖥️ Phân Tích Các Màn Hình Chi Tiết (Screen Specifications)

Giao diện Dashboard chính bao gồm một thanh Sidebar bên trái cố định và vùng hiển thị nội dung bên phải thay đổi linh hoạt theo biến trạng thái:
```typescript
const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'inbox' | 'clients' | 'analytics'>('overview');
```

---

### Màn hình 1: Overview (Tổng Quan Nhanh)

Màn hình đầu tiên thu hút Ban giám khảo bằng dữ liệu KPI tổng hợp sắc nét và các luồng hoạt động thời gian thực.

#### 1. Các chỉ số đo lường (KPI Cards Grid)
Thiết kế dạng hàng ngang gồm 4 thẻ Glassmorphism thống kê nhanh:
* **Conversations (Hội thoại):** Tổng số tin nhắn đã xử lý. (Màu nhấn: Indigo).
* **Tickets Created (Vừa tạo):** Tổng số Ticket đã được AI tạo thành công trên Supabase. (Màu nhấn: Emerald).
* **Active Clients (Khách hàng hoạt động):** Số lượng số điện thoại VIP đang tương tác. (Màu nhấn: Amber).
* **Ignored (Bỏ qua - Spam):** Số lượng tin nhắn rác/chào hỏi xã giao đã bị AI bỏ qua. (Màu nhấn: Gray).

#### 2. Bảng điều khiển Hội thoại gần đây (Recent Conversations Feed)
* **Tính năng:** Hiển thị một danh sách cuộn dọc 5 cuộc hội thoại mới nhất nhận được từ khách hàng.
* **Giao diện chi tiết:**
  * Avatar hình tròn tự động lấy chữ cái đầu của khách hàng (ví dụ: `A` cho "Anh Phúc").
  * Tên khách hàng (hoặc Số điện thoại) hiển thị đậm, kèm tin nhắn tóm tắt rút gọn (`text-overflow: ellipsis`).
  * Thời gian nhận tin nhắn tương đối (ví dụ: "just now", "5m ago").

#### 3. Bảng điều khiển Tickets vừa tạo (Recent Tickets Feed)
* **Tính năng:** Hiển thị danh sách 5 Ticket vừa được AI phân loại và tạo lập tự động.
* **Giao diện chi tiết:**
  * Tiêu đề công việc rút gọn (Summary).
  * Badge (Nhãn) hiển thị độ ưu tiên (`Priority`) với màu sắc riêng biệt (High -> Đỏ, Medium -> Vàng, Low -> Lam).
  * Badge hiển thị trạng thái xử lý (`Status`) (Open -> Xám xanh, In Progress -> Indigo, Resolved -> Emerald).

#### 4. Thanh thao tác nhanh (Quick Actions Bar)
* Các nút bấm chuyển tab nhanh (View Inbox, View Tickets, Add VIP Client) giúp điều hướng mượt mà không cần rê chuột lên Sidebar.

---

### Màn hình 2: Tickets (Quản Lý Tickets Tự Động)

Đây là nơi hiển thị toàn bộ thành quả làm việc của AI và các bộ phận hỗ trợ kỹ thuật.

#### 1. Bộ lọc nâng cao (Filters & Search Bar)
* **Tìm kiếm:** Ô tìm kiếm tức thì (Fuzzy Search) lọc danh sách ticket theo tiêu đề hoặc tên khách hàng.
* **Bộ lọc Dropdown:** Lọc danh sách theo `Priority` (Cao/Trung bình/Thấp) và `Status` (Đang mở/Đang xử lý/Hoàn thành).

#### 2. Bảng dữ liệu Tickets (Interactive Tickets Table)
* Một bảng dữ liệu được thiết kế tối giản nhưng sang trọng hiển thị đầy đủ các cột:
  * **ID:** `#ID` của ticket trên Supabase.
  * **Summary:** Mô tả tóm tắt ngắn gọn lỗi/yêu cầu.
  * **Client:** Tên khách hàng gửi qua WhatsApp.
  * **Priority:** Huy hiệu màu sắc theo mức độ khẩn cấp.
  * **Status:** Huy hiệu trạng thái xử lý.
  * **Created At:** Thời gian tạo lập.
* **Hiệu ứng tương tác:** Rê chuột vào từng hàng trong bảng sẽ sáng nhẹ lên (`hover:bg-slate-800/50`). Click vào hàng sẽ mở Drawer chi tiết Ticket.

#### 3. Khung chi tiết Ticket (Ticket Drawer - Xem chi tiết trượt từ bên phải)
Khi nhấp vào một hàng bất kỳ, một bảng thông tin chi tiết trượt nhẹ từ viền phải vào màn hình (`animate-in slide-in-from-right`):
* **Nội dung hiển thị:**
  * Toàn bộ tiêu đề và phần mô tả dài (Description) của công việc do AI tự động biên dịch từ chat.
  * **AI Reason (Cực kỳ đắt giá cho Hackathon):** Khung hiển thị lý giải của Gemini tại sao lại quyết định tạo ticket này (ví dụ: *"Khách hàng báo lỗi cổng thanh toán, cần lập ticket khẩn cấp cho bộ phận kỹ thuật"*).
  * Nút chuyển đổi trạng thái thủ công (Open / In Progress / Resolved) giúp tương tác trực tiếp với dữ liệu.

---

### Màn hình 3: Inbox (Hộp Thư Hội Thoại Thời Gian Thực)

Màn hình ấn tượng nhất mô phỏng một ứng dụng nhắn tin nâng cao, làm nổi bật vai trò quyết định của AI.

#### 1. Phân chia bố cục (Split Pane Layout)
* **Bên trái (Danh sách chat):** Cột danh sách các đầu số đang nhắn tin. Mỗi ô hiển thị tên khách hàng, avatar màu sắc sinh động, tin nhắn mới nhất và một Badge nhỏ thể hiện quyết định của AI đối với tin nhắn cuối cùng (`CREATE_TICKET` hoặc `IGNORE`).
* **Bên phải (Nội dung chat):** Khung hiển thị nội dung tin nhắn chi tiết.

#### 2. Khung hội thoại & Bong bóng chat (Chat Thread & Bubbles)
* **Inbound (Khách gửi):** Bong bóng màu xám đen (`bg-slate-900`), căn lề trái.
* **Outbound (Hệ thống/Thông báo):** Bong bóng màu Indigo (`bg-indigo-600`), căn lề phải.
* **System Event Logs:** Các dòng chữ nhỏ màu xám nhạt căn giữa thể hiện tiến trình AI xử lý (ví dụ: *“AI đang phân tích yêu cầu...”*, *“Ticket #104 đã được tạo tự động”*).

#### 3. Hộp thông tin AI Decision (Quyết định của AI)
Đặt ở vị trí nổi bật phía trên cùng của khung chat:
* Hiển thị trạng thái phân tích hiện tại của AI đối với cuộc hội thoại này:
  * 🟢 **AI Status: Active (CREATE_TICKET)** - Kèm lý do phân tích chi tiết.
  * ⚪ **AI Status: Idle (IGNORE)** - Kèm ghi chú: *"Tin nhắn chào hỏi xã giao, hệ thống tiếp tục lắng nghe..."*.

---

### Màn hình 4: VIP Clients (Khách Hàng Được Bảo Vệ)

Quản lý danh sách các số điện thoại được AI hỗ trợ.

#### 1. Danh sách thẻ Grid (VIP Clients Grid)
* Hiển thị danh sách khách hàng VIP dưới dạng thẻ card lưới:
  * Avatar chữ cái đầu sắc nét.
  * Tên hiển thị và Số điện thoại WhatsApp (`chatId`).
  * Chỉ số phụ: Số lượng ticket đang mở của khách hàng này.
  * Badge trạng thái: **Đang bảo vệ (Active)**.

#### 2. Hộp thoại Thêm VIP (Add VIP Client Modal)
* **Tính năng:** Nút bấm "Thêm khách hàng VIP" mở ra hộp thoại Glassmorphism giữa màn hình.
* **Form nhập liệu:**
  * Nhập Số điện thoại WhatsApp (chatId).
  * Nhập Tên hiển thị (Display Name).
  * Nút "Lưu lại" (Tạo hiệu ứng mock thêm mới dữ liệu vào state để demo tức thì).

---

### Màn hình 5: Analytics (Báo Cáo Hiệu Suất AI)

Nơi trình diễn số liệu thống kê để thuyết phục Ban giám khảo về tính khả thi và hiệu quả của dự án.

#### 1. Tỷ lệ phân loại của AI (AI Success vs Ignored Rate Chart)
* Thiết kế biểu đồ dạng tròn (Pie Chart) biểu diễn tỷ lệ phần trăm tin nhắn AI quyết định xử lý (`CREATE_SUBTASK` hoặc `COMMENT`) so với tỷ lệ tin nhắn rác bị bỏ qua (`IGNORE`).
* *Mẹo Hackathon:* Bạn có thể vẽ bằng các thẻ div CSS tỉ lệ hoặc sử dụng thư viện gọn nhẹ như **Recharts**.

#### 2. Biểu đồ đường thời gian (Ticket Creation Trend)
* Biểu đồ đường (Line Chart) biểu diễn số lượng Ticket được tạo tự động qua từng ngày để thể hiện tính thực tế của ứng dụng qua thời gian.

---

## 🛠️ CHIẾN LƯỢC MOCK DATA CHO FRONTEND (API CONTRACT)

Để Frontend hoạt động độc lập không bị nghẽn, hãy khai báo các dữ liệu giả lập chuẩn ở ngay đầu file Frontend của bạn. Định dạng này khớp chính xác 100% với dữ liệu mà Backend của bạn sẽ trả về sau này:

```javascript
// 1. Dữ liệu Thống kê Tổng quan (GET /api/analytics/overview)
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

// 2. Danh sách Tickets (GET /api/tickets)
const mockTickets = [
  {
    id: 104,
    summary: "Lỗi không thanh toán được bằng thẻ Mastercard",
    client_name: "Nguyễn Đình Phúc",
    chat_id: "84987654321@c.us",
    priority: "High",
    status: "Open",
    ai_reason: "Khách hàng báo lỗi giao dịch thanh toán thất bại nhiều lần vào lúc 10h sáng.",
    created_at: "2026-05-30T01:30:00Z"
  },
  {
    id: 103,
    summary: "Yêu cầu cung cấp tài liệu tích hợp API phiên bản mới",
    client_name: "Khánh Vy",
    chat_id: "84912345678@c.us",
    priority: "Medium",
    status: "In Progress",
    ai_reason: "Khách hàng cần file PDF hướng dẫn kết nối API cổng thanh toán V2.",
    created_at: "2026-05-30T00:15:00Z"
  }
];

// 3. Danh sách Hội thoại (GET /api/conversations)
const mockConversations = [
  {
    id: 1,
    chat_id: "84987654321@c.us",
    client_name: "Nguyễn Đình Phúc",
    text: "Hệ thống báo lỗi giao dịch code 500 khi tôi chọn Mastercard.",
    direction: "inbound",
    aiDecision: "CREATE_TICKET",
    created_at: "2026-05-30T01:29:00Z"
  },
  {
    id: 2,
    chat_id: "84987654321@c.us",
    client_name: "Nguyễn Đình Phúc",
    text: "[Hệ thống] Đang khởi tạo Ticket hỗ trợ kỹ thuật #104...",
    direction: "outbound",
    aiDecision: "CREATE_TICKET",
    created_at: "2026-05-30T01:30:00Z"
  }
];

// 4. Danh sách Khách hàng VIP (GET /api/clients)
const mockClients = [
  { chat_id: "84987654321@c.us", display_name: "Nguyễn Đình Phúc", ticket_count: 3, created_at: "2026-05-29Z" },
  { chat_id: "84912345678@c.us", display_name: "Khánh Vy", ticket_count: 1, created_at: "2026-05-29Z" }
];
```

---

## 🏁 BƯỚC GHÉP NỐI CUỐI CÙNG (WIRING TO BACKEND)

Khi bạn Backend thông báo đã sẵn sàng API, bạn Frontend chỉ cần thực hiện 2 thao tác cực nhanh:
1. Đổi biến trạng thái `const [useMock, setUseMock] = useState(true)` sang `false`.
2. Sử dụng hàm `useEffect` chuẩn để gọi API thực tế qua `fetch` từ cổng `localhost:3000` (hoặc domain ngrok của Backend):

```javascript
useEffect(() => {
  if (useMock) return;
  
  const BACKEND_URL = 'http://localhost:3000'; // Hoặc link ngrok do Backend cung cấp

  async function fetchRealData() {
    try {
      const [statsRes, ticketsRes, chatsRes, clientsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/analytics/overview`),
        fetch(`${BACKEND_URL}/api/tickets`),
        fetch(`${BACKEND_URL}/api/conversations`),
        fetch(`${BACKEND_URL}/api/clients`),
      ]);
      
      const [stats, tickets, chats, clients] = await Promise.all([
        statsRes.json(),
        ticketsRes.json(),
        chatsRes.json(),
        clientsRes.json()
      ]);

      setStats(stats);
      setTickets(tickets.data);
      setConversations(chats.data);
      setClients(clients.data);
    } catch (err) {
      console.error("Lỗi ghép nối API: ", err);
    }
  }
  
  fetchRealData();
}, [useMock]);
```

Chúc bạn Frontend có một trải nghiệm thiết kế thăng hoa, tạo ra một kiệt tác giao diện giúp đội của bạn ghi điểm tuyệt đối trong buổi thuyết trình Hackathon!
