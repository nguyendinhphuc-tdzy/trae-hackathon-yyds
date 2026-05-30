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

-- 4. Bảng tickets: Quản lý ticket Jira
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
