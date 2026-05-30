# Hackathon Specification: Backend Automation & API Engine
## Tài Liệu Kiến Trúc Lõi, Cơ Sở Dữ Liệu & Hướng Dẫn Kết Nối

Tài liệu này được soạn thảo riêng cho bạn (người đảm nhận **Backend**) trong đội tuyển Hackathon. Nhiệm vụ của bạn là dựng hệ thống thu thập tin nhắn thời gian thực từ WhatsApp, xử lý thông minh bằng AI (Gemini), lưu trữ vào database (Supabase), gửi cảnh báo (WhatsApp/Gmail) và cung cấp các REST API cho giao diện Dashboard.

Vì bạn sử dụng lại cấu trúc dự án hiện tại, các tài nguyên cơ sở dữ liệu đã có sẵn trên Supabase, nhiệm vụ của bạn là **đấu nối thông tin từ file `.env`** và **thiết lập luồng chạy tự động hóa**.

---

## 💾 1. KẾT NỐI DATABASE & BIẾN MÔI TRƯỜNG (.env)

Hệ thống kết nối trực tiếp với Supabase và Google Gemini API. Bạn cần đảm bảo các biến sau trong file [`.env`](file:///c:/Users/admin/Documents/GitHub/Trae-SOLO-YYDS/.env) được khai báo chính xác:

```env
# 1. Kết nối cơ sở dữ liệu Supabase
SUPABASE_URL=https://<your-supabase-id>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# 2. Kết nối Trí tuệ Nhân tạo Google Gemini
GEMINI_API_KEY=<your-google-gemini-api-key>
GEMINI_MODEL=gemini-2.5-flash-preview  # Hoặc gemini-1.5-flash làm mặc định

# 3. Cấu hình WhatsApp Ingestion
WA_AUTH_PATH=.wwebjs_auth              # Đường dẫn lưu session đăng nhập WhatsApp

# 4. Kênh thông báo cảnh báo (Nội bộ)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password   # Mật khẩu ứng dụng Gmail (App Password)
GMAIL_TO=team-leader@email.com         # Email nhận cảnh báo khi có ticket mới

# 5. Cổng chạy của Server
PORT=3000
VIP_MODE=allow_all                     # Thiết lập 'allow_all' để test nhanh trong lúc thi Hackathon
```

---

## ⚙️ 2. QUY TRÌNH XỬ LÝ LÕI CỦA BACKEND (THE AUTOMATION PIPELINE)

Quy trình tự động hóa của Backend chạy liên tục dưới dạng một Service nền lắng nghe sự kiện từ WhatsApp:

```
[Khách nhắn tin]
       │
       ▼
[WhatsApp Listener] (whatsapp-web.js)
       │
       ▼
[Kiểm tra VIP] (Bỏ qua nếu không phải VIP và VIP_MODE !== 'allow_all')
       │
       ▼
[Kiểm tra Trùng lặp] (Query Supabase bảng 'conversations' bằng messageId)
       │
       ▼
[Lấy Lịch sử Ticket] (Query Supabase bảng 'tickets' để làm ngữ cảnh tránh trùng lặp nội dung)
       │
       ▼
[Gọi Gemini AI] (Gửi Lịch sử Chat + Danh sách Ticket đang mở sang Gemini)
       │
       ▼
[AI Phân tích & Trả về JSON] -> Phân loại quyết định:
 ├── IGNORE ──────────► [Bỏ qua tin nhắn] -> [Lưu conversation với trạng thái IGNORE]
 └── CREATE_SUBTASK ──► [Tạo Ticket Mới]
                             │
                             ├─► [Lưu Ticket mới vào Supabase bảng 'tickets']
                             ├─► [Lưu Conversation vào Supabase bảng 'conversations']
                             ├─► [Gửi thông báo ra WhatsApp nhóm nội bộ]
                             └─► [Gửi Gmail cảnh báo cho quản trị viên]
```

---

## 🛠️ 3. CHI TIẾT CÁC CÔNG VIỆC BACKEND CẦN LÀM

### Bước 1: Khởi động WhatsApp Client (`src/services/whatsappIngestion.js`)
* Sử dụng thư viện `whatsapp-web.js` cùng trình duyệt Chromium không đầu (headless) để quét mã QR và đăng nhập.
* Khi có sự kiện `message`, thu thập các thông tin: `messageId`, `chatId` (số điện thoại khách hàng), `text` (nội dung chat), `senderName` (tên hiển thị).

### Bước 2: Thiết kế Prompt AI Core (`src/services/aiService.js`)
Gửi yêu cầu tới Gemini kèm prompt cấu trúc chặt chẽ để trả về chuỗi JSON chính xác tuyệt đối.
* **Prompt Rule:**
  * **CREATE_SUBTASK:** Khi khách hàng thông báo lỗi mới, yêu cầu kỹ thuật mới không có trong danh sách ticket đang mở.
  * **COMMENT:** Khi khách hàng nhắn tin bổ sung thông tin cho một ticket đang mở sẵn.
  * **IGNORE:** Khi khách hàng chỉ chào hỏi xã giao ("Hello", "Cảm ơn", "Ok") hoặc gửi icon.
* **JSON Output Contract:** AI bắt buộc phải trả về đúng cấu trúc sau:
  ```json
  {
    "decision": "CREATE_SUBTASK" | "COMMENT" | "IGNORE",
    "reason": "Giải thích lý do AI đưa ra quyết định này",
    "summary": "Tóm tắt ngắn gọn tiêu đề công việc (nếu tạo ticket)",
    "description": "Mô tả chi tiết công việc cần làm được lọc từ chat",
    "priority": "High" | "Medium" | "Low",
    "assignee_id": "Mã nhân viên kỹ thuật chịu trách nhiệm"
  }
  ```

### Bước 3: Đấu nối API Endpoints cho Frontend (`index.js` & `src/app/api`)
Cung cấp cổng thông tin dạng REST API để Frontend (do bạn tự tích hợp dữ liệu) lấy thông tin hiển thị lên UI.

#### 1. CORS Configuration (Rất quan trọng)
Đảm bảo thêm CORS vào server Express để Frontend từ cổng khác (ví dụ: Next.js chạy ở cổng 3000, Express chạy ở cổng 3001) gọi được dữ liệu:
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' })); // Cho phép mọi nguồn gọi API trong lúc thi Hackathon
app.use(express.json());
```

#### 2. REST API Endpoints cần cung cấp:

* **API 1: Lấy thống kê tổng quan (Dashboard Overview)**
  * **Route:** `GET /api/analytics/overview`
  * **Nhiệm vụ:** Đếm tổng số lượng dòng trong các bảng Supabase để trả về số liệu KPI.
  * **Dữ liệu trả về mong muốn:**
    ```json
    {
      "totalConversations": 142,
      "totalTickets": 28,
      "activeClients": 12,
      "byDecision": { "CREATE_SUBTASK": 28, "COMMENT": 34, "IGNORE": 80 }
    }
    ```

* **API 2: Danh sách Tickets**
  * **Route:** `GET /api/tickets?limit=50`
  * **Nhiệm vụ:** Lấy danh sách các dòng từ bảng `tickets` trên Supabase xếp theo thời gian mới nhất.
  * **Dữ liệu trả về mong muốn:**
    ```json
    {
      "data": [
        { "id": 104, "summary": "Lỗi thanh toán", "client_name": "Phúc", "priority": "High", "status": "Open", "ai_reason": "...", "created_at": "..." }
      ]
    }
    ```

* **API 3: Danh sách Hội thoại (Conversations)**
  * **Route:** `GET /api/conversations?limit=50`
  * **Nhiệm vụ:** Lấy lịch sử hội thoại từ bảng `conversations` trên Supabase để hiển thị trên màn hình Inbox.
  * **Dữ liệu trả về:**
    ```json
    {
      "data": [
        { "id": 1, "chat_id": "...", "client_name": "Phúc", "text": "...", "direction": "inbound", "aiDecision": "CREATE_TICKET" }
      ]
    }
    ```

* **API 4: Danh sách khách hàng VIP (VIP Clients)**
  * **Route:** `GET /api/clients`
  * **Nhiệm vụ:** Truy xuất danh sách khách hàng trong bảng `vip_clients`.

---

## 🚀 4. CHIẾN THUẬT DEMO BACKEND TẠI HACKATHON (Mẹo thực chiến)

1. **Thiết lập VIP_MODE = 'allow_all':**
   Khi BGK hoặc khách tham quan nhắn tin vào số WhatsApp của hệ thống, họ dùng số lạ. Nếu để chế độ `strict` (chỉ xử lý khách hàng trong bảng `vip_clients`), hệ thống sẽ bỏ qua tin nhắn của họ. Chuyển sang `allow_all` giúp bất kỳ ai quét QR thử nhắn tin đều nhận được phản hồi và hiển thị lập tức lên màn hình Dashboard UI!
2. **Cài đặt thư viện `cors` ngay từ đầu:**
   Tránh trường hợp Frontend gọi API bị lỗi block đỏ lòm trên Console vì thiếu CORS chính sách bảo mật trình duyệt.
3. **Thêm cơ chế tự động gửi tin nhắn phản hồi WhatsApp:**
   Để demo thêm phần "kịch tính", khi AI quyết định tạo Ticket thành công, hãy dùng WhatsApp client gửi một tin nhắn phản hồi tự động về máy khách hàng:
   ```javascript
   // Gửi tin nhắn phản hồi tự động về điện thoại của khách hàng
   client.sendMessage(chatId, `[Hệ thống tự động] Xin chào ${senderName}, yêu cầu hỗ trợ kỹ thuật của bạn đã được ghi nhận tự động vào hệ thống! Mã số Ticket hỗ trợ: #${ticketId}. Đội ngũ kỹ thuật đang xử lý.`);
   ```
   Điều này khiến Ban giám khảo vô cùng phấn khích khi thấy điện thoại của họ nhận được tin nhắn trả lời ngay lập tức sau khi họ nhắn tin báo lỗi!

Chúc bạn hoàn thành xuất sắc nhiệm vụ Backend và cùng đồng đội giành chức vô địch Hackathon vào ngày mai! Gặp lỗi gì, hãy hỏi tôi ngay lập tức!
