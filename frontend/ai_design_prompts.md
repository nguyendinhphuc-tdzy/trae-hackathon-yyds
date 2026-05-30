# Bộ Prompts AI Thiết Kế UI/UX: YYDS Ops Support Automation Dashboard

Tài liệu này cung cấp các Prompts mẫu chuyên sâu và chi tiết dành cho các mô hình AI tạo ảnh (như **Midjourney v6**, **DALL-E 3**) hoặc các mô hình sinh code giao diện (như **v0.dev**, **Claude 3.5 Sonnet**, **Galileo AI**). Các prompt này được tinh chỉnh để thể hiện hoàn hảo toàn bộ tính năng và ngôn ngữ thiết kế **Glassmorphism Premium** của hệ thống YYDS.

---

## 🎨 1. Prompt Dành Cho AI Sinh Giao Diện Code (v0.dev, Claude, Galileo AI)

*Đây là prompt cực kỳ chi tiết bằng tiếng Anh giúp các AI sinh mã nguồn (React, Tailwind, HTML/CSS) hiểu toàn bộ cấu trúc trang, luồng tương tác và phong cách thiết kế để tái tạo lại hệ thống một cách hoàn hảo nhất.*

```markdown
Act as an expert Senior UI/UX Frontend Engineer. Design and implement a premium, high-fidelity Single Page Application (SPA) Web Dashboard named "YYDS". The theme must be an ultra-dark cosmic style with advanced Glassmorphism aesthetics.

### 🎨 DESIGN SYSTEM & AESTHETICS:
- **Color Palette:** Ultra-deep space blue background (#060913), translucent dark glass panels (rgba(15, 23, 42, 0.45) with backdrop-filter: blur(16px)), thin elegant borders (rgba(255, 255, 255, 0.07)).
- **Accent Gradients:** Glowing Indigo-to-Purple gradient (linear-gradient(135deg, #6366f1, #8b5cf6)) for buttons and active states.
- **Accents & Status:** Emerald Green (#10b981) for success/active, Amber Yellow (#f59e0b) for warning/in-progress, Rose Red (#ef4444) for danger/high-priority, Slate Gray (#94a3b8) for muted/ignored.
- **Typography:** Modern clean sans-serif (Inter & Outfit fonts).
- **Animations:** Smooth hover scaling transitions, fade-in for tab switching, slide-in from right for panels, and breathing pulse glow for status indicators.

### 🖥️ LAYOUT STRUCTURE:
A fixed left Sidebar (260px wide) containing YYDS branding, 5 navigation tabs, and a footer showing active operator PIC profile with an online status pulse dot.
A top Header displaying the current view title, subtitle, a pulsing "AI ENGINE: ONLINE" badge, and a real-time digital clock display.
A main View Canvas supporting state-based switching between 5 comprehensive screens:

#### SCREEN 1: OVERVIEW DASHBOARD
- **KPI Metrics Grid:** 4 glowing glassmorphism cards representing: YYDS Conversations, Auto-created Tickets, Active VIP Clients, Ignored Spam Messages.
- **Recent Chat Feed (Left Pane):** Vertical list showing client avatar letter (glowing gradient background), name, message snippet, time, and "CREATE TICKET" or "IGNORED" badges.
- **Recent Tickets Feed (Right Pane):** List of AI-created tickets showing summary title, ticket key (e.g., YYDS-104), priority tag, and status badge.
- **Quick Action Bar:** Prominent shortcuts to view inbox, manage tickets, and add VIP clients.

#### SCREEN 2: TICKETS MANAGEMENT
- **Advanced Filters:** Fuzzy search input box with search icon + dropdown filters for Priority (All, High, Medium, Low) and Status (Open, In Progress, Resolved).
- **Interactive Tickets Table:** Clean responsive table displaying ID, Summary, Client Name, Default Assignee (with letter avatar), Priority badge, Status badge, and Created Time. Hovering rows highlights them.
- **Right Details Drawer:** Slides in smoothly from the right upon row selection. Displays metadata grid, long descriptions, a manually editable Status transition dropdown, and a special dashed glowing box titled "YYDS AI Reasoning" containing the AI's explanation for creating the ticket.

#### SCREEN 3: AI INBOX CONSOLE
- **Split Pane Layout:** Left side is client thread list with name, relative time, chat snippet, and green/gray AI badges (TICKET/IGNORE).
- **AI Decision Header Alert:** Displays YYDS AI's active decision mapping (e.g., "🟢 AI DECISION: CREATE_SUBTASK") and the active reasoning context.
- **Messages Timeline:** Alternating bubbles. Left-aligned charcoal bubbles for inbound YYDS client texts; Right-aligned Indigo-purple gradient bubbles for outbound auto-replies; Center-aligned transparent border bubbles for system pipeline logs (e.g., "[AI Engine] Analyzing message...").
- **Outgoing Chat Input:** Clean input box and rotate-icon send button to simulate reply.

#### SCREEN 4: VIP WHITELIST GRID
- **Roster Grid:** Responsive cards representing whitelisted phone numbers. Each card features a status badge, initial letter avatar, phone number, tickets count, Default Assignee name with icon, and date joined.
- **Add VIP Modal:** Centered glassmorphic popup containing form fields for YYDS contact/thread ID, Display Name, and Default Assignee auto-routing dropdown (Phuc, Tram, Vy).

#### SCREEN 5: AI PERFORMANCE ANALYTICS
- **SVG Donut Chart:** Visual representation of AI message classification rates (Subtask vs Comment vs Ignored) with a center summary count.
- **SVG Area Line Chart:** Responsive grid with glowing points showing the trend of automatically created tickets over the last 5 days.
- **Performance Highlights:** 3 statistics grids showing: AI Accuracy (99.2%), Avg AI Processing Time (1.45s), Total saved time (~18 hrs/Ops).

Generate this entire clean SPA dashboard UI using clean modular frontend structures.
```

---

## 🎨 2. Prompts Dành Cho AI Tạo Ảnh Nghệ Thuật (Midjourney v6 / DALL-E 3)

*Các prompt này được tối ưu hóa bằng các keyword chuyên ngành thiết kế để sinh ra các hình ảnh Mockup giao diện siêu đẹp, mang tính viễn tưởng và công nghệ cao, giúp bạn đưa vào slide thuyết trình hoặc giới thiệu ý tưởng.*

### Prompt 1: Giao diện tổng quan Overview Dashboard (Concept nghệ thuật)
> **Prompt:** `A high-tech web application dashboard interface mockup, YYDS. Cosmic ultra-dark mode, deep space blue background #060913, futuristic glassmorphism cards with translucent blur panels and glowing neon indigo and purple borders. Left sidebar with clean minimalist icons. Main section shows glowing holographic KPI cards, a modern chat timeline feed with vibrant avatars, and clean data tables. Beautiful UI/UX, premium SaaS dashboard, dashboard design trend 2026, Behance, Dribbble, highly detailed, 8k resolution, vector graphics, clean composition --ar 16:9 --v 6.0`

### Prompt 2: Giao diện Hộp thư AI Inbox & Chat Timeline (Góc nhìn cận cảnh)
> **Prompt:** `Futuristic messaging web console interface mockup, AI chat inbox. Cosmic dark theme, glassmorphic translucent panels with backdrop blur. Left column lists chat threads with green and purple glowing online status indicators. Right column shows interactive chat bubbles: dark grey bubbles on the left, glowing indigo-purple gradient bubbles on the right, and subtle digital system logs in the center. Top bar features a glowing green chip saying "AI DECISION: CREATE TICKET". Clean typography, cyber-ops vibe, beautiful UI design, state of the art UX, Behance portfolio showcase, 8k, flat design, cinematic lighting --ar 16:9 --v 6.0`

### Prompt 3: Giao diện Biểu đồ Analytics & Thống kê Hiệu suất AI (Trực quan hóa)
> **Prompt:** `A premium data analytics web interface dashboard concept. Dark space theme background, glassmorphism UI layout. Features a beautiful glowing circular donut chart showing percentages with purple, orange, and gray segments. Next to it, a glowing cyan line chart with gradient filled area showing peaks and trend points. Sleek cards displaying "AI Accuracy 99.2%" and "Avg Speed 1.45s" in bold modern neon typography. Extremely premium, futuristic finance and AI analytics interface, cyber security operations center style, highly refined UX, Dribbble trending design --ar 16:9 --v 6.0`

---

## ⚡ 3. PHONG CÁCH ĐỘT PHÁ "YYDS" (CYBER OBSIDIAN DEITY)

*Chủ đề thiết kế đột phá theo đúng tinh thần tên đội **"YYDS" (Yong Yuan De Shen - Thần Thế Hệ Mới)**. Concept này chuyển dịch từ màu xanh không gian truyền thống sang một giao diện tối thượng kết hợp giữa **Đá Obsidian Đen huyền bí** và **Hào quang Vàng Kim Đế Vương (Aureate Gold)** cùng các tia lửa hạt hạt điện tử chạy dọc các đường viền.*

### A. Prompt v0.dev / Claude (Dành cho AI code Giao diện)
```markdown
Design a highly revolutionary, supreme-level Web Dashboard named "YYDS Deity-Ops Console". The theme must embody absolute power, digital divinity, and ultimate modernism ("Yong Yuan De Shen"). 

### 🎨 DESIGN SYSTEM & AESTHETICS (OBSIDIAN DEITY CONCEPT):
- **Background:** Ultimate pure obsidian-black (#020204) with subtle glowing golden micro-particles and dark nebula dust floating in the background.
- **Glass Panels:** Extremely dark obsidian glass (rgba(10, 10, 18, 0.7)) with highly saturated backdrop blur (24px) and deep box shadows.
- **Primary Accent (YYDS Gold):** Imperial Celestial Gold (#fbbf24 or #eab308) with high-intensity glowing aura, representing divine supreme speed and victory.
- **Secondary Accent:** Electric Astral Purple (#a855f7) or Cyberpunk Neon Magenta for AI engine pipeline alerts.
- **Glowing Borders:** Super-thin aureate golden wireframe borders (rgba(234, 179, 8, 0.12)). On hover, the borders illuminate with a blazing gold-to-purple gradient flow animation.
- **Typography:** Heavyweight Outfit font (weight 800 to 900) for all KPI values and titles, conveying a sense of monumental monolith solidness.

### 🖥️ DYNAMIC LAYOUT & FEATURES:
- **Sidebar:** Gold-leafed "YYDS" logo with glowing digital wings. Nav items highlight with golden inner shadows. The operator profile shows "PIC Vy - DEITY OPS" with a golden pulse.
- **Header:** Features a top path, real-time clock, and a large pulsing shield saying "AI GUARDIAN: SUPREME DEFENSE".
- **Overview Grid:** Metric cards glow with golden undertones. Inbound chats use golden initial avatars.
- **YYDS Tickets Table:** Rows are separated by golden hairline borders. Selecting a row slides out a magnificent dark gold details drawer containing a glowing dashed container for "YYDS AI REASONING".
- **AI Inbox Pane:** Chat bubbles are obsidian black (inbound) and imperial gold-gradient (outbound) with particle stream visual background logs.
- **SVG Charts:** Custom SVG charts rendered with pure golden lines, glowing gold dots, and violet background trend grids.
```

### B. Prompt Midjourney v6 / DALL-E 3 (Dành cho AI tạo ảnh nghệ thuật)
> **Prompt:** `A revolutionary deity cyberpunk web dashboard interface mockup, named "YYDS Deity-Ops". Monolithic obsidian black theme background #020204 with floating golden light dust. Futuristic glassmorphism panels in deep dark color with 24px blur and glowing neon imperial gold and bright astral violet borders. Main area shows glowing golden KPI cards, holographic charts with gold line trends, and luxurious cybernetic avatars. Absolute premium, god-tier UI/UX design, next-gen dashboard concept, Behance trending, Dribbble elite showcase, dramatic golden backlighting, 8k, photorealistic --ar 16:9 --v 6.0`
