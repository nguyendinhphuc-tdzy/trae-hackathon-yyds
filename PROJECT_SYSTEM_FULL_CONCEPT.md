# TÀI LIỆU TỔNG HỢP TOÀN BỘ DỰ ÁN (FULL CONCEPT) — Trae Hackathon YYDS
Path: `c:\Users\PC\Downloads\trae-hackathon-yyds\PROJECT_SYSTEM_FULL_CONCEPT.md`

## 0) Mục tiêu của dự án
Dự án này là một hệ thống **tự động hoá vận hành hỗ trợ khách hàng qua WhatsApp**:
- Nhận tin nhắn WhatsApp theo thời gian thực.
- Lấy ngữ cảnh hội thoại (transcript) + ngữ cảnh các ticket đang mở.
- Gọi AI để **phân loại yêu cầu** (tạo ticket hay bỏ qua).
- Nếu cần: tạo ticket trong Supabase, lưu lịch sử hội thoại, log analytics, gửi thông báo nội bộ, gửi email.
- Cung cấp Dashboard frontend để Ops theo dõi tickets / inbox / clients / analytics và thao tác (đổi trạng thái ticket, gửi message).

Các tài liệu yêu cầu ban đầu:
- Backend spec: `hackathon_backend_spec.md`
- Frontend spec: `hackathon_frontend_spec.md`

## 1) Tổng quan kiến trúc (Architecture Overview)
Hệ thống gồm 2 phần chạy song song:

### 1.1 Backend (Node.js / Express)
Entrypoint: `index.js`

Vai trò:
- Mở HTTP server (REST API phục vụ Dashboard).
- Khởi chạy WhatsApp ingestion (whatsapp-web.js + puppeteer).
- Điều phối pipeline: VIP check → duplicate check → transcript → AI decision → tạo ticket + notify + lưu DB.

Phụ thuộc chính (theo `package.json`):
- express, cors, dotenv
- whatsapp-web.js, qrcode-terminal
- @supabase/supabase-js
- axios (gọi Ollama)
- @google/generative-ai (gọi Gemini, có fallback nếu cấu hình đúng)
- nodemailer (Gmail)

### 1.2 Frontend (Static HTML/CSS/JS)
Folder: `frontend/`

Vai trò:
- Dashboard giao diện premium (sidebar + tab views).
- Gọi backend REST API để hiển thị dữ liệu thật.
- Thực hiện thao tác từ UI: update ticket status, send message, add client.

Chạy bằng server tĩnh tự viết: `frontend/server.js` (Node http, không cần npm install).

## 2) Cấu trúc thư mục dự án (Directory Structure)
```
trae-hackathon-yyds/
├─ index.js
├─ package.json
├─ package-lock.json
├─ .env                (local, ignored bởi git)
├─ .env.example
├─ .gitignore
├─ supabase/
│  └─ migration.sql
├─ src/
│  ├─ lib/
│  │  └─ supabase.js
│  └─ services/
│     ├─ aiService.js
│     ├─ supabaseService.js
│     ├─ whatsappIngestion.js
│     ├─ whatsappNotifyService.js
│     └─ gmailService.js
└─ frontend/
   ├─ index.html
   ├─ server.js
   ├─ ai_design_prompts.md
   ├─ css/
   │  └─ styles.css
   └─ js/
      ├─ app.js
      └─ api.js (hiện đang không được dùng bởi index.html)
```

## 3) Database (Supabase) — cấu trúc dữ liệu & ý nghĩa
File SQL: `supabase/migration.sql`

### 3.1 Toàn bộ schema hiện tại (SQL)
```sql
-- 1. Bảng vip_clients: Danh sách Whitelist
CREATE TABLE IF NOT EXISTS vip_clients (
    chat_id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bảng event_logs: Idempotency
CREATE TABLE IF NOT EXISTS event_logs (
    message_id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bảng clients: Hồ sơ khách hàng
CREATE TABLE IF NOT EXISTS clients (
    chat_id TEXT PRIMARY KEY,
    display_name TEXT,
    assignee_id TEXT,
    assignee_name TEXT,
    ticket_count INTEGER DEFAULT 0,
    last_seen_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Bảng tickets: Quản lý ticket
CREATE TABLE IF NOT EXISTS tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id TEXT REFERENCES clients(chat_id),
    client_name TEXT,
    summary TEXT,
    description TEXT,
    priority TEXT CHECK (priority IN ('High', 'Medium', 'Low')),
    status TEXT CHECK (status IN ('Open', 'In Progress', 'Done', 'Closed')) DEFAULT 'Open',
    assignee_id TEXT,
    assignee_name TEXT,
    ai_reason TEXT,
    jira_key TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Bảng conversations: Nhật ký hội thoại
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id TEXT,
    client_name TEXT,
    message_id TEXT UNIQUE,
    direction TEXT CHECK (direction IN ('inbound', 'outbound')),
    text TEXT,
    ai_decision TEXT CHECK (ai_decision IN ('CREATE_SUBTASK', 'IGNORE', 'COMMENT')),
    ticket_id UUID REFERENCES tickets(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Bảng analytics_events: Tracking
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Bảng settings: Config động
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Function increment_ticket_count
CREATE OR REPLACE FUNCTION increment_ticket_count(client_chat_id TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE clients
    SET ticket_count = ticket_count + 1
    WHERE chat_id = client_chat_id;
END;
$$ LANGUAGE plpgsql;
```

### 3.2 Ý nghĩa các bảng theo nghiệp vụ
- `vip_clients`: whitelist chat_id. Nếu `VIP_MODE=strict` chỉ xử lý tin nhắn từ các chat_id trong bảng này.
- `event_logs`: intended cho idempotency theo message_id (chống xử lý trùng 1 message).
- `clients`: profile per chat_id, lưu tên hiển thị + người phụ trách + số lượng ticket.
- `tickets`: ticket chính của hệ thống (không phụ thuộc Jira). Có các trường `jira_key` để tương thích legacy/mô phỏng UI, nhưng backend hiện không sử dụng Jira.
- `conversations`: log inbound/outbound + ai_decision + liên kết ticket_id.
- `analytics_events`: KPI timeline.
- `settings`: store cấu hình động (hiện backend chưa dùng).

## 4) Backend hiện tại (chi tiết)

### 4.1 Khởi động & cấu hình
- Start: `npm start` chạy `node index.js` theo `package.json`.
- `dotenv` load `.env`.
- Supabase client init tại `src/lib/supabase.js` dùng:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

### 4.2 WhatsApp ingestion (lấy message realtime)
File: `src/services/whatsappIngestion.js`

Các điểm chính:
- Dùng `LocalAuth` lưu session tại `WA_AUTH_PATH`.
- Event:
  - `qr`: in QR ra terminal.
  - `ready`: log `whatsapp.ready`.
  - `message`: pipeline của ingestion.

Ngữ cảnh hội thoại (transcript):
- Với mỗi message inbound, fetch N tin nhắn gần nhất, sort timestamp tăng dần, build thành text:
  - `SenderName: message body`
- N = `WA_TRANSCRIPT_LIMIT` (truyền từ index.js).

### 4.3 Pipeline xử lý inbound message (Business Flow)
File: `index.js` → function `processInboundMessage(event)`

Input event từ ingestion:
- `messageId`
- `chatId`
- `text`
- `senderName`
- `chatTranscript`

Pipeline:
1) Upsert client:
   - `supabaseService.upsertClient(chatId, senderName)`
2) Load open tickets context:
   - `supabaseService.getOpenTicketsContext(chatId)`
3) AI decision:
   - `aiService.analyzeConversation(chatTranscript, ticketsContext, senderName)`
4) Nếu `decision === CREATE_SUBTASK`:
   - Tạo ticket trong Supabase:
     - `supabaseService.createTicket(...)`
   - Notify:
     - WhatsApp internal group: `whatsappNotifyService.sendInternalAlert(...)`
     - Gmail: `gmailService.sendTicketAlert(...)`
     - Auto-reply client: `whatsappNotifyService.sendClientConfirmation(...)`
   - Log analytics: `ticket_created`
5) Nếu `decision !== CREATE_SUBTASK`:
   - Log analytics: `conversation_ignored`
6) Save conversation (inbound):
   - `supabaseService.saveConversation(...)`

### 4.4 REST API backend (được frontend gọi)
File: `index.js`

Endpoints:
- `GET /ping`
  - Healthcheck
- `GET /api/analytics/overview`
  - totalConversations, totalTickets, activeClients, byDecision
- `GET /api/tickets?limit=...`
  - trả `{ data: Ticket[] }`
- `GET /api/conversations?limit=...`
  - trả `{ data: Conversation[] }`
- `GET /api/clients`
  - trả `{ data: Client[] }`
- `PUT /api/tickets/:id/status`
  - body `{ status }`
  - trả `{ success, ticket }`
- `POST /api/clients`
  - body `{ chat_id, display_name, assignee_name }`
  - hiện backend chỉ dùng `chat_id, display_name` để insert vip_clients + upsert clients
- `POST /api/conversations/send`
  - body `{ chatId, text }`
  - backend send WhatsApp message + log conversation outbound

## 5) AI hiện tại (chi tiết)
File: `src/services/aiService.js`

### 5.1 Provider switching
AI provider dựa vào biến môi trường:
- `AI_PROVIDER=ollama` → gọi Ollama local
- `AI_PROVIDER=gemini` → gọi Google Gemini

Lưu ý về dotenv: nếu trùng key nhiều lần trong `.env`, dòng cuối sẽ ghi đè.

### 5.2 Prompt và output contract
AI luôn được yêu cầu trả về JSON schema cố định:
```json
{
  "decision": "CREATE_SUBTASK | IGNORE",
  "reason": "Lý do",
  "summary": "Tiêu đề (nếu tạo ticket)",
  "description": "Mô tả chi tiết",
  "priority": "High | Medium",
  "assignee_id": "Phuc_ID | Tram_ID | Vy_ID"
}
```

### 5.3 Context đưa vào AI (để tránh “bịa”)
AI nhận 2 loại context:
1) **Chat transcript** từ WhatsApp:
   - hệ thống hiện giới hạn **số dòng cuối** gửi vào LLM thông qua:
     - `AI_TRANSCRIPT_LINES` (min 3, max 30, default 12)
2) **Open tickets context** từ Supabase:
   - top 5 ticket đang mở (không Done/Closed) theo chat_id.

### 5.4 Ollama local call
Endpoint:
- `POST ${OLLAMA_BASE_URL}/api/generate`

Payload:
- `model`: `OLLAMA_MODEL`
- `prompt`: prompt string
- `stream: false`
- `format: "json"`
- `options`:
  - `num_ctx`: `OLLAMA_NUM_CTX` (default 512)
  - `num_predict`: `OLLAMA_NUM_PREDICT` (default 256)

Mục tiêu:
- Hạn chế RAM usage để tránh lỗi OOM.

### 5.5 Parse & normalize output (giảm rủi ro hallucination về format)
- Strip code fences nếu có.
- Extract JSON object đầu tiên nếu model trả thêm text.
- Normalize payload:
  - decision chỉ còn `CREATE_SUBTASK` hoặc `IGNORE`
  - priority normalize về `High` hoặc `Medium`
  - fallback `assignee_id` nếu thiếu

### 5.6 Mapping assignee_id
AI trả `assignee_id` theo alias:
- `Phuc_ID`, `Tram_ID`, `Vy_ID`

Backend map sang:
- `JIRA_ASSIGNEE_*_ID` (giữ từ config cũ)
và thêm `assignee_name` dạng:
- `Phúc (Kỹ thuật)`, `Trâm (Tư vấn)`, `Vy (Nội bộ)`

Lưu ý: Jira không được dùng trong hệ thống ticket, nhưng các ID này vẫn được tái sử dụng như “PIC identifiers”.

## 6) Cơ chế chống duplicate (hiện trạng)
Có các thành phần:
- `event_logs(message_id)` được thiết kế cho idempotency.
- `conversations.message_id` là UNIQUE.

Hiện pipeline ingestion có gọi `shouldContinueForMessageId(messageId)` để chặn trùng.

Tuy nhiên:
- Backend hiện chưa ghi `event_logs` trong pipeline (`logMessageEvent` tồn tại nhưng không được gọi). Vì vậy `event_logs` không được populate → idempotency theo bảng này chưa hoàn chỉnh.

De-dup ticket theo nội dung:
- Hiện dựa vào “soft rule”: open tickets context kèm trong prompt để AI tự tránh tạo trùng.
- Chưa có “hard rule” kỹ thuật (hash/similarity) để chặn ticket trùng nội dung.

## 7) Thông báo (Notification) hiện tại
### 7.1 WhatsApp nội bộ
File: `src/services/whatsappNotifyService.js`
- gửi vào group `WA_INTERNAL_NOTIFY_CHAT_ID` khi tạo ticket.

### 7.2 Auto-reply cho client
File: `src/services/whatsappNotifyService.js`
- Tin nhắn hiện tại là tiếng Anh và dùng thương hiệu `YYDS Team`.

### 7.3 Gmail
File: `src/services/gmailService.js`
- Gửi email alert khi tạo ticket.
- Điều kiện bật: có `GMAIL_USER` + `GMAIL_APP_PASSWORD` (và `GMAIL_TO`).

## 8) Frontend hiện tại (chi tiết)
Folder: `frontend/`

### 8.1 Cách chạy
- Server tĩnh: `node frontend/server.js`
- URL: `http://localhost:5000`

### 8.2 Entry & layout
- `frontend/index.html`:
  - mount sidebar, header, main canvas (5 views)
  - có drawer ticket + modal add client
  - load script: `js/app.js`

### 8.3 UI Design system
- `frontend/css/styles.css`:
  - theme đen + gold/purple premium
  - glassmorphism, hover effects, custom scrollbar

### 8.4 Logic frontend
- `frontend/js/app.js`:
  - Single-file dashboard logic: state, apiService, render components, tab switching.
  - Hiện đã được cấu hình để **gọi backend thật**:
    - `CONFIG.useMock = false`
    - `CONFIG.backendUrl = http://localhost:3000`
  - apiService sẽ gọi:
    - `GET /api/analytics/overview`
    - `GET /api/tickets`
    - `GET /api/conversations`
    - `GET /api/clients`
    - `PUT /api/tickets/:id/status`
    - `POST /api/conversations/send`
    - `POST /api/clients`
  - Logic đã được cập nhật để ticket id UUID không bị parseInt.

### 8.5 File frontend/js/api.js
- Đây là một API layer dạng ES module (import mock-data).
- Nhưng `frontend/index.html` hiện không load module này, nên `api.js` đang không được dùng.

## 9) Cấu hình môi trường (Environment Variables)
Tham khảo: `.env.example` và `.env` local (được ignore bởi git).

Các biến quan trọng:
- Supabase:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- WhatsApp:
  - `WA_AUTH_PATH`
  - `WA_TRANSCRIPT_LIMIT`
  - `VIP_MODE` (`allow_all` hoặc `strict`)
  - `WA_INTERNAL_NOTIFY_CHAT_ID`
- AI:
  - `AI_PROVIDER` (`ollama` hoặc `gemini`)
  - Gemini: `GEMINI_API_KEY`, `GEMINI_MODEL`
  - Ollama: `OLLAMA_BASE_URL`, `OLLAMA_MODEL`, `OLLAMA_NUM_CTX`, `OLLAMA_NUM_PREDICT`
  - Context control: `AI_TRANSCRIPT_LINES`
- Gmail:
  - `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `GMAIL_TO`, `GMAIL_FROM`
- Port:
  - `PORT`

## 10) Dataflow chi tiết (Operational Dataflow)

### 10.1 Dataflow: inbound WhatsApp → ticket
1) WhatsApp client nhận `message` event.
2) Normalize message:
   - lấy `messageId`, `chatId`, `text`, `senderName`.
3) VIP gate:
   - nếu `VIP_MODE=strict`: chỉ nhận nếu `chatId` có trong `vip_clients`.
   - nếu `VIP_MODE=allow_all`: pass tất cả.
4) Duplicate gate:
   - gọi `shouldContinueForMessageId(messageId)`.
5) Fetch transcript:
   - fetch N message gần nhất (`WA_TRANSCRIPT_LIMIT`).
6) Backend pipeline:
   - upsert clients(chatId)
   - get open ticket context (top 5 open)
   - build AI prompt (transcript + ticketsContext)
   - call AI provider
   - parse/normalize decision
7) Nếu CREATE_SUBTASK:
   - insert tickets
   - increment ticket_count
   - notify (WA internal + Gmail + client confirmation)
   - log analytics ticket_created
8) Save conversation:
   - insert conversations (inbound)

### 10.2 Dataflow: Dashboard → backend → Supabase/WhatsApp
- Dashboard load dữ liệu:
  - gọi các GET endpoints để render UI.
- Dashboard update ticket status:
  - `PUT /api/tickets/:id/status` → update tickets.status.
- Dashboard send message:
  - `POST /api/conversations/send` → WhatsApp sendMessage + log conversation outbound.
- Dashboard add client:
  - `POST /api/clients` → insert vip_clients + upsert clients.

## 11) Cách vận hành (Runbook)
1) Chuẩn bị Supabase:
   - chạy toàn bộ `supabase/migration.sql` trên SQL Editor.
2) Cấu hình `.env`:
   - set Supabase credentials
   - set WhatsApp auth path
   - set AI provider
   - set VIP mode
   - optional: Gmail
3) Chạy backend:
   - `npm start`
   - scan QR nếu lần đầu
4) Chạy frontend:
   - `node frontend/server.js`
   - mở `http://localhost:5000`

## 12) Trạng thái hiện tại & các điểm cần lưu ý
### 12.1 Jira
- Jira giữ trong `.env` (legacy) nhưng backend không gọi Jira API.

### 12.2 Idempotency (duplicate message)
- Có bảng `event_logs` và hàm `logMessageEvent`, nhưng hiện pipeline chưa ghi event_logs.
- Nếu cần “chống duplicate message” đúng nghĩa, cần bổ sung bước ghi event_logs ngay khi message pass gate.

### 12.3 Anti-hallucination
Hệ thống hiện giảm rủi ro bằng:
- chỉ dùng transcript thật + open tickets context thật
- ép output JSON + normalize payload
Chưa có:
- yêu cầu AI cung cấp evidence quotes/citations
- validate nội dung output phải bám transcript
- rule kỹ thuật de-dup ticket theo nội dung

