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

---

## 💎 4. PROMPT TỐI ƯU UI/UX CHUẨN SẠCH (ULTRA-CLEAN & SPACING ENHANCEMENT)

*Đây là prompt tối ưu hóa cao độ được thiết kế riêng cho **v0.dev** hoặc **Claude** để tái cấu trúc lại CSS/Layout của ứng dụng hiện tại, căn chỉnh lại khoảng trống (Spacing), kích thước (Sizes), bố cục thông thoáng (Clean/Minimalist) và các chuyển động vi mô (Micro-animations) theo chuẩn sản phẩm SaaS cao cấp trên thị trường.*

```markdown
Refactor and polish the UI/UX of the "YYDS Deity-Ops Console" to achieve an ultra-clean, pixel-perfect, premium SaaS standard. Optimize all layout sizes, whitespace spacing, typography scales, and implement professional micro-animations.

### 📐 1. SPACING & SIZING RULES (8px Grid System):
- **Layout Spacing:** Establish a rigorous 8px grid system. Use exactly 24px (1.5rem) padding for outer card boundaries and main workspace borders. Use 16px (1rem) for inner list cards, thread items, and form groups.
- **Card Margins:** Set uniform gaps of 24px (1.5rem) between grids, columns, and flex sections to allow the interface to breathe (minimalist layout).
- **Element Heights:** Standardize form inputs, select selectors, and action buttons to a clean 42px height. Badges should be compact (22px height, 12px text) with clear internal padding.
- **Table Cell Padding:** Table rows should have 16px vertical padding and 20px horizontal padding to ensure comfortable scanning of text.
- **Border Radius:** Apply modern curvature: 12px for standard cards, inputs, and buttons; 16px for larger dashboard containers; 8px for small badges and tags.

### ✍️ 2. TYPOGRAPHY & VISUAL CLARITY:
- **Clean Contrast:** Dark background must be solid deep charcoal/obsidian (#030712). Soften the glass panels to transparent deep gray (rgba(9, 9, 16, 0.5) with backdrop-filter: blur(20px)).
- **Harsh Border Removal:** Reduce border opacity to super-fine translucent hair-lines (1px solid rgba(255, 255, 255, 0.04)). Avoid heavy solid borders.
- **Text Scaling & Hierarchy:**
  * Main View Titles: 1.5rem (24px), semi-bold, Outfit font.
  * Card KPI stats numbers: 2.25rem (36px) or 2rem (32px), bold, clean glowing accent.
  * Section Headers / Labels: 0.75rem (12px) uppercase, bold, wide letter-spacing (0.07em) in Cool Gray (#94a3b8) to separate sections cleanly.
  * Body Text: 0.875rem (14px) Inter font, regular, line-height 1.5, with excellent color contrast (#e2e8f0).

### 💫 3. PROFESSIONAL MICRO-INTERACTIONS & ANIMATIONS:
- **Transitions:** Apply standard cubic-bezier curve transitions to all interactive triggers (buttons, sidebar menus, table rows, badges): `transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);`
- **Sidebar Tab Highlighting:** Active sidebar tabs should feature a subtle left-aligned vertical glowing bar (2px width) in YYDS Gold, with a very soft, saturated golden background bleed.
- **Table Row Hover States:** Hovering over list items or table rows should scale them up marginally (transform: translateY(-1px) scale(1.005)) with a soft glowing shadow drop rather than harsh solid background swaps.
- **Right Details Drawer Animation:** Utilize CSS transform for slide-in effects: `transform: translateX(100%)` transitions smoothly to `transform: translateX(0)` over 300ms using a clean ease-out curve.
- **Modal scaling popup:** Centered modals should pop using scale transition: `scale(0.95) -> scale(1)` with a smooth ease-out feel.
- **Live pulse tags:** The live indicator dot should breathe smoothly using a keyframe opacity pulse (opacity 0.4 -> 1).

Apply these precise structural sizing, spacing, and animation refinements to refactor the CSS and render templates for an elite, clean SaaS finish.
```

---

## ⚡ 5. BỘ PROMPTS ANIMATION ĐỘT PHÁ TỐI THƯỢNG (DEITY-TIER INTERACTIVE EFFECTS)

*Nếu bạn muốn giao diện của mình thực sự **"Bùng nổ" (Breakthrough)** tại Hackathon, hãy sử dụng bộ Prompts thiết kế các **Hiệu ứng Thần thoại Độc quyền** này. Nó biến một trang Admin thông thường thành một kiệt tác trải nghiệm sống động.*

```markdown
Refactor the CSS and JavaScript of the "YYDS Deity-Ops Console" to integrate mind-blowing, highly futuristic, interactive "Deity-Tier" animation effects. Elevate the UI/UX from passive clean dashboard to an interactive organic universe.

### 🌟 EFFECT 1: INTERACTIVE 3D TILT PARALLAX CARD
- Implement an interactive 3D tilt effect on the 4 KPI Cards and the VIP Client cards when hovered.
- As the user moves their cursor over a card, the card should rotate dynamically in 3D space (`transform: rotateX() rotateY()`) corresponding to the relative cursor coordinates from the center of the card.
- Add smooth momentum decay, ensuring the card returns softly to its flat default state when the mouse leaves.

### ⚡ EFFECT 2: LASER BORDER SWEEP (NEON ENERGY FLOW)
- Enhance the border hover effects on the main Glass panels.
- Instead of a static border color change, hovering a card should trigger a **laser-like glowing gold-to-purple beam** that sweeps smoothly along the absolute border perimeter of the card, leaving a trailing tail.
- Achieve this using custom CSS properties with a clipping mask or `conic-gradient` mapped on a pseudo-element (`::before`) animated via `@keyframes border-sweep`.

### 🌌 EFFECT 3: ASTRAL ORBIT NEBULA PARALLAX (MOUSE SENSITIVE BACKGROUND)
- The background star-field and golden nebulas should not be static.
- Integrate a micro-parallax mouse listener. When the mouse moves across the screen, the background stardust layers and glowing nebulas should shift slowly and organically in the opposite direction (`transform: translate3d(x, y, 0)` with a multiplier of `0.02`), simulating deep spatial perspective.

### 🌊 EFFECT 4: AI DECISIVE PORTAL SCAN SWEEP (TAB SWITCH PORTAL)
- When the active tab switches, do not just fade the view in.
- Trigger a **vertical glowing golden scan line** or a **radial energy ripple scan** that sweeps across the active canvas panel from top to bottom.
- Use a transient pseudo-overlay with a linear gradient of gold light (`linear-gradient(to bottom, rgba(234, 179, 8, 0) 0%, rgba(234, 179, 8, 0.25) 50%, rgba(234, 179, 8, 0) 100%)`) running on a swift, smooth 600ms keyframe animation to make each tab transition feel like a portal gateway opening.

### 💥 EFFECT 5: SYSTEM PIPELINE DECISION SHOCKWAVE (RIPPLE EFFECT)
- In the Inbox console, when a new system log is printed (e.g. "[AI Engine] Creating ticket..."), the message log container should animate in with an expanding **radial shockwave ripple** (expanding circular outline shadow) that fades out seamlessly over 1s.
- This creates an intense visual cue that the AI has executed a god-like automated action.

Implement these interactive visual dynamics using vanilla CSS keyframes and lightweight, optimized pure JS event listeners for zero performance lag.
```


