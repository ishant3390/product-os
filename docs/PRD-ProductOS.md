# Product Requirements Document (PRD)
# ProductOS: The Autonomous Workspace for Product Managers

- **Document Status**: Draft (V1.0 - Ready for Review)
- **Target Launch Window**: Q1 2027 (Alpha) / Q2 2027 (Public Beta)
- **Product Lead**: Principal PM Lead
- **Technical Stakeholders**: Engineering Lead, Design Systems Lead, AI/ML Platform Lead
- **Last Updated**: October 17, 2026
- **GitHub Repository**: [https://github.com/ishant3390/product-os](https://github.com/ishant3390/product-os)
- **Live Hosted Prototype**: [https://ishant3390.github.io/product-os/](https://ishant3390.github.io/product-os/)

---

## 1. Executive Summary & Product Vision

### 1.1 Executive Summary
Product Managers spend up to 70% of their working hours on operational overhead: chasing cross-functional status updates across Slack, reconciling stale Jira and ServiceNow tickets, reformatting user stories, and answering repetitive stakeholder questions. **ProductOS** is an AI-native workspace and orchestration layer that turns PMs from reactive coordinators into high-leverage product leaders. 

Featuring a dual-pane **Chat + Canvas** architecture and a proactive **Daily Action Inbox**, ProductOS deploys specialized, context-grounded AI agents to autonomously draft sprint-ready PRDs, coordinate stakeholder follow-ups with human-in-the-loop review, and generate live, interactive HTML/Tailwind wireframes directly in the canvas.

### 1.2 The 10x Value Hypothesis
Existing product management software (Productboard, Aha!, Jira Product Discovery) functions primarily as passive databases requiring manual data entry. ProductOS is **active and generative**: it does not ask the PM to document their work; it executes the documentation, alignment, and prototyping on the PM's behalf while integrating bi-directionally with existing enterprise tools (**ServiceNow Agile/SPM as primary backlog publisher for MVP; Slack, Teams, Google Docs, Notion, and Phase 2 Jira/Linear adapters**).

---

## 2. Problem Statement & Opportunity

### 2.1 The Daily Pain Points
1. **The Context-Switching Tax**: A typical PM operates across 6+ disconnected surfaces daily (Slack, Teams, Jira, ServiceNow, Linear, Figma, Google Docs, Email). Information is fragmented, leading to misalignment and dropped balls.
2. **The "Blank Page" Spec Fatigue**: Writing exhaustive PRDs, edge cases, and Gherkin acceptance criteria takes days of manual drafting. When rushed, specs become vague, leading to engineering rework and scope creep.
3. **Cross-Functional Chasing**: PMs waste hours manually pinging engineering leads, design partners, and business stakeholders for status updates, unblocking decisions, and sign-offs.
4. **Prototyping Bottlenecks**: Communicating product ideas requires waiting days or weeks for dedicated designer wireframes. PMs lack the tooling to test interactive concepts with users and engineers in real time.

### 2.2 Cost of Inaction
Without an autonomous orchestration layer, product teams suffer from slow sprint velocity, misalignment between business goals and engineering output, and PM burnout driven by low-leverage coordination rather than strategic product discovery.

---

## 3. Target Audience & User Personas

### 3.1 Primary Persona: The Senior / Staff Product Manager
- **Profile**: Manages 1–2 cross-functional scrum teams (8–15 engineers and designers).
- **Daily Context**: Juggles roadmap strategy, sprint grooming, stakeholder pings, customer feedback, and delivery deadlines.
- **Jobs to be Done (JTBD)**:
  > *When I start my workday, I want an intelligent queue of my highest-leverage actions and blockers, so I can unblock my engineering team and align stakeholders in under 30 minutes.*
  > *When defining a new feature, I want grounded, sprint-ready stories and live clickable prototypes generated instantly, so my engineers have zero ambiguity during sprint planning.*
- **Core Frustrations**: Endless Slack/Teams threads, chasing status updates, writing repetitive acceptance criteria, and keeping Jira / ServiceNow tickets synchronized with actual discussions.

### 3.2 Secondary Persona: Group Product Manager / VP of Product
- **Profile**: Oversees multiple PMs and tracks portfolio health across multiple product pillars.
- **JTBD**:
  > *When assessing portfolio progress, I want unified cross-team visibility into blocked dependencies and milestone risks without demanding manual weekly status reports from my PMs.*

### 3.3 Collaboration Personas (Indirect Consumers)
- **Engineering Leads**: Benefit from context-grounded user stories that respect existing codebase architecture and clear acceptance criteria.
- **Business Stakeholders (Sales, Ops, Execs)**: Receive timely, synthesized status updates via Slack/email without feeling spammed by robotic notifications.

---

## 4. Key Value Proposition & "Magic Moments"

### 4.1 The Core Value Proposition
*“Your autonomous PM staff: An intelligent workspace that shields you from vague stakeholder asks, triages your morning, drafts your specs with full codebase context, generates interactive prototypes, and aligns your team.”*

### 4.2 The Signature "Magic Moments"

#### 🌟 Magic Moment 1: The Intelligent Requirement Gatekeeper (Zero-Effort Intake & Evidence Gathering)
- **The Trigger**: A sales lead or business stakeholder pings in Slack or emails: *"Hey, our enterprise deals urgently need an automated custom webhook trigger for customer audit events."*
- **The Autonomous Magic (Under 10 Seconds)**:
  1. **Attribution**: The Requirement Triage Agent captures the request via MCP and links it to the `Platform & Audit API` product area.
  2. **Delta Analysis**: It reads existing workspace PRDs and flags: *"Delta: Net-New Automation (Manual export exists, automated trigger does not)."*
  3. **Competitive Edge Benchmark**: Performs instant competitor research: *"Market Position: Competitive Moat / Win-Rate Enabler (2 major competitors lack this capability)."*
  4. **Evidence Audit**: Detects that the request lacks usage frequency, specific client names, and quantifiable deal impact.
  5. **1-Click Stakeholder Inquiry**: Surfaces a ready-to-dispatch clarification card in the PM's Daily Action Inbox:
     > 🤖 *Drafted Inquiry to Sales Lead*: *"Hi Sarah, to help prioritize this webhook automation for roadmap consideration, could you share: (1) Estimated daily event volume, (2) Target enterprise accounts requesting this, and (3) Associated pipeline ARR?"*
- **The Resolution**: The PM clicks `[Approve & Send on My Behalf]` in **1 second**. The agent collects the evidence, compiles a complete strategic dossier, and recommends `Pursue (Draft PRD)` once validated.

#### 🌟 Magic Moment 2: Instant Grounded Spec & Interactive Clickable Prototype
- **The Trigger**: The PM types a one-sentence directive: *"Create a feature spec for 1-click Google Single Sign-On with SAML fallback for enterprise accounts."*
- **The Autonomous Magic (Under 30 Seconds)**:
  1. The **Spec Writer Agent** produces an exhaustive, architecture-grounded PRD on the right-hand Canvas, complete with Gherkin acceptance criteria (`Given/When/Then`) and edge-case handling.
  2. Simultaneously, the **Interactive Prototyper Agent** compiles and renders a live, responsive HTML/Tailwind/React login mockup in the Canvas pane. The PM can click the buttons, test error states, and export clean code or Figma frames with 1 click.

---

## 5. System Architecture & Core UX Paradigm

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ ProductOS   │ 🌐 Scope: [ Product: Checkout Engine ▾ | Project: ApplePay ▾ ] │
├───────────────────────────────────────┬───────────────────────────────────────┤
│        LEFT PANE: DEDICATED           │       RIGHT PANE: PRIMARY SURFACE     │
│        ACTION INBOX (~390px)          │       AI CHAT COPILOT / CARD DETAILS  │
│                                       │                                       │
│ ┌───────────────────────────────────┐ │ ┌───────────────────────────────────┐ │
│ │ Action Inbox (Ranked P0-P2)       │ │ │ Mode A: Full AI Chat Copilot      │ │
│ │ • 1 Intake Triage (Missing Info)  │ │ │ • Market research & brainstorming │ │
│ │ • 1 Sprint Blocker (ServiceNow)   │ │ │ • Live ServiceNow MCP queries     │ │
│ │ • 1 Stale PRD Spec Review         │ │ ├───────────────────────────────────┤ │
│ │                                   │ │ │ Mode B: Card Details + Chat Down  │ │
│ │ [ 💬 Open General AI Copilot ]    │ │ │ • Live Interactive Wireframe Mock │ │
│ │ [ Filter: All | Triage | Blockers]│ │ │ • Sprint PRD / ServiceNow Sync    │ │
│ └───────────────────────────────────┘ │ │ • Docked Chat Box (Moved Down)    │ │
│                                       │ │   [ Ask Copilot about this item ] │ │
│                                       │ │   [ 💬 Full Chat View Button ]    │ │
│                                       │ └───────────────────────────────────┘ │
└───────────────────────────────────────┴───────────────────────────────────────┘
                                   │
              Bi-Directional Integration & Grounding Engine
                                   ▼
   [ ServiceNow (SPM/Agile 2.0) ]   [ Slack / Teams / Email ]   [ Google Web Search ]   [ GitHub ]
```

### 5.1 Simplified Two-Pane UX & Cal.com Design System Integration
1. **Design System & Visual Language (Anchored on Cal.com)**:
   - Built on the **Cal.com design system** (`https://getdesign.md/cal/design-md`): clean white canvas (`#ffffff`), soft-tinted surfaces (`#f8f9fa`, `#f5f5f5`), 1px hairline dividers (`#e5e7eb`), and solid black (`#111111`) primary CTAs.
   - **Cal Sans / Inter Display Typography**: Headings use weight 600 with negative tracking (`-0.035em`) for modern geometric clarity; Inter handles high-readability body and tabular data.
   - **Cal.com Nav-Pill-Group**: Signature pill-in-pill segment switchers (`#f3f4f6` container with white active pill) for intuitive, zero-clutter navigation between views.
   - **Generous Whitespace & Calm Focus**: Replaces dense 4-column layouts with an uncluttered two-pane structure designed for fast cognitive scanning and immediate unblocking.

2. **Global Product / Project Scope Switcher (Top Navigation Bar, 64px)**:
   - A persistent, clean dropdown selector (`[All Portfolios ▾]`, `[Product: Checkout & Payments ▾]`, `[Product: Merchant Portal ▾]`).
   - Selecting a scope immediately filters **all workspace layers**:
     - *Action Inbox*: Surfaces only blockers and action items tagged to that product/project.
     - *Agent Thread*: Automatically scopes conversational context, repo architecture, and tool queries to that project's Jira keys, ServiceNow demand categories, and dedicated Slack channels.
     - *Canvas*: Displays active PRDs, mockups, and wireframes belonging strictly to the selected scope.

3. **Left Pane: Dedicated Action Inbox (~390px)**:
   - Dedicated executive triage sidebar displaying prioritized decisions: Intake Triage cards, Sprint Blockers, and Spec Approvals with the signature **💡 Recommended Best Next Step** engine.
   - Houses a 30-minute background reconciliation loop, on-demand `[Sync Now]` trigger, inbox filter pills (`All`, `Triage`, `Blockers`), and a persistent shortcut button to switch the right pane to the general AI Copilot (`[ 💬 AI Chat Copilot (Primary) ]`).
   - Clicking any action card selects the item and reveals its corresponding details in the right pane.

4. **Right Pane: Primary AI Chat Copilot & Living Artifact Canvas**:
   - **Mode A (Primary / Default View - Centered AI Chat Copilot)**: Zero-scroll, viewport-locked (`100vh`) conversational home experience. The prompt input box is prominently centered in the middle of the screen (ChatGPT/Claude/Perplexity home-state style) alongside a friendly greeting and quick prompt starters for ad-hoc research, ideation, and backlog queries. Once the PM sends a prompt or clicks a starter, it smoothly expands into an active conversation thread with responses, cited sources, and a docked bottom input box. Zero window scrolling is required to access the chat.
   - **Mode B (Card Details View with Chat Box Moving Down)**: When the PM clicks any card from the Action Inbox, the right pane displays that card's corresponding details (interactive prototype wireframe, living PRD spec, ServiceNow story sync table, or intake triage dossier), while the **chat box moves down to the bottom** of the pane. Docked at the bottom within the visible viewport, the chat box provides card-scoped contextual quick suggestions (e.g., `+ Add Offline Timeout Edge Case`, `Decompose into 3 Sub-Tasks`, `Draft Slack Inquiry to Sarah`) and allows the PM to discuss or modify the item directly.
   - **Seamless View Toggle**: A `[ 💬 Full Chat View ]` button in the card details header enables instant 1-click toggling between detailed item inspection and the centered/full conversation feed without context loss.

### 5.2 MCP-First Integration & Plugin Architecture (No Central Data Lake)
- **Zero Bulk Ingestion**: ProductOS explicitly rejects the monolithic "data warehouse / lake" approach. It does NOT crawl, scrape, or permanently store company-wide email, Slack, or Teams conversations.
- **Model Context Protocol (MCP) Server Foundation**:
  - Operates on a modular, pluggable MCP architecture (akin to OpenClaw / MCP standard).
  - The PM connects standard or custom MCP servers for their workflow tools: **Jira MCP, ServiceNow (SPM/Agile 2.0) MCP, Linear MCP, Slack MCP, Microsoft Teams MCP, Google Workspace / Outlook MCP, GitHub MCP, Notion MCP**.
- **User-Scoped OAuth & Identity Delegation**:
  - All MCP tool calls execute strictly within the **PM's personal user authentication and permission context**.
  - Agents can *only* read data, search threads, or inspect tickets/demands that the PM personally has access to.
  - No super-admin service accounts or over-privileged crawler keys.

### 5.3 On-Demand Grounding & Ephemeral Context
- **Just-In-Time (JIT) Tool Execution**: Rather than querying a stale, centralized vector database, agents issue real-time MCP queries on-demand (e.g., `jira_get_epic_details`, `servicenow_get_story_details`, `slack_search_threads`, `github_get_repo_readme`).
- **Ephemerality**: Raw search results from Slack or email are processed in-memory for the current agent run and discarded; only the generated PM artifacts (PRDs, action items, prototypes) are persisted in the workspace.

### 5.4 Unified Agent Execution Engine: Configurable Cadence & On-Demand Triggers (P0)
- **Granular Scheduling Per Agent**:
  - The PM maintains complete autonomy over when and how frequently each agent runs via an **Agent Control Panel**.
  - **Supported Cadence Options**:
    - *Periodic Interval*: Every 15 minutes, 30 minutes, 1 hour, 4 hours.
    - *Scheduled Calendar Cron*: Daily at a set time (e.g., 08:30 AM before daily standup), Weekly on specific days (e.g., Mondays at 09:00 AM).
    - *Manual / Prompt-Only*: Disabled from background loops; executes strictly on user command (e.g., Prototyper or Spec Writer).
- **On-Demand Manual Execution**:
  - Every agent provides an instant manual trigger via a `[Run Now]` button on its agent status badge, conversational chat prompt (*"Run the Stakeholder Follow-Up agent now"*), or omni-bar command (`/run <agent-name>`).
  - Supports targeted execution parameters (e.g., *"Run Requirement Triage on #product-intake channel for the past 2 hours"*).
- **Agent Observability & Health Drawer**:
  - Displays real-time status for each agent: Current State (`Idle`, `Running`, `Completed`, `Failed`), Last Run Timestamp, Next Scheduled Execution, and execution logs with duration and MCP tools invoked.

---

## 6. Detailed Feature Specifications & Agent Roster

### 6.1 Feature 1: Continuous Action Inbox & Dynamic Briefing Engine (P0)
- **Description**: An intelligent, continuously reconciled action queue that acts as the PM's executive operating cockpit. Aggregates signals across Jira, ServiceNow, Linear, Slack, Teams, and Email via user-scoped MCP tools, highlighting high-leverage decisions and prescribing the optimal next move.
- **Triggering Cadence & Refresh Capabilities**:
  1. **Proactive 30-Minute Background Polling**: A lightweight triage loop runs automatically every 30 minutes to ensure the inbox reflects real-time team dynamics throughout the workday.
  2. **On-Demand Instant Refresh**: PM can trigger a manual sync at any moment via a `[Refresh Actions]` header button or `Cmd + Shift + R` shortcut (with 60-second rate-limit debouncing to protect MCP tool quotas).
- **Dynamic State Reconciliation (In-Place Card Evolution)**:
  - **Zero Card Duplication**: As new thread replies or ticket updates occur, the system matches events to existing action threads.
  - **In-Place Updates**: Existing cards dynamically update their summaries, append new stakeholder commentary, and adjust urgency scores in real time.
  - **Auto-Resolution**: If a blocker is cleared externally (e.g., tech lead comments *"resolved"* or Jira/ServiceNow status moves to In Progress), the card automatically transitions to a subtle "Resolved" state and fades out, keeping the inbox decluttered.
- **Card Anatomy & "Recommended Best Next Step" Engine**:
  - Each action card is structured with prescriptive intelligence:
    - **Header**: Source icon (Slack, Teams, Jira, ServiceNow, Email), Timestamp, Urgency badge (`P0 Critical`, `P1 Attention`, `P2 Monitor`).
    - **Context Summary**: A 2-sentence synthesis of what changed, who is blocked, and why it matters.
    - **💡 Recommended Best Next Step**: Prescriptive guidance advising the PM on the highest-leverage decision (e.g., *"Recommended Next Step: Approve draft response to VP Sales confirming audit triggers are slated for Q2"* or *"Recommended Next Step: Call a 15-min sync with Tech Lead as architectural consensus has diverged in thread"*).
    - **1-Click Execution Trigger**: Primary button pre-wired to execute the recommended step (e.g., `[Review & Send Draft]`, `[Update PRD Specs]`, `[Acknowledge & Snooze]`).

### 6.2 Agent 1: Spec & Story Writer Agent (P0)
- **Capabilities**:
  - Generates comprehensive PRDs from conversational prompts or meeting summaries.
  - Decomposes high-level epic goals into granular, sprint-ready user stories.
  - Generates industry-standard Gherkin acceptance criteria (`Given / When / Then`).
  - Auto-flags technical dependencies and edge cases (empty states, network failures, auth timeouts).
- **Integrations & Target Backlog (MVP Focus: ServiceNow Only)**:
  - 1-click publishing directly to **ServiceNow Strategic Portfolio Management (SPM) / Agile Development 2.0** (`rm_story` table linked to parent Demand `dmn_demand` or Epic `rm_epic`).
  - Automatically maps acceptance criteria, story points, and sprint assignments to ServiceNow fields with instant feedback (e.g., `STR-101`, `STR-102`).
  - *Phase 2 Extensibility*: Jira and Linear publishing adapters deferred to Phase 2 to eliminate multi-tracker synchronization conflicts during initial rollout.

### 6.3 Agent 2: Stakeholder Follow-Up & Status Sync Agent (P0)
- **Capabilities**:
  - Monitors project-specific Slack channels, direct messages, and email threads to track who owes deliverables or approvals.
  - Identifies overdue milestones and cross-functional bottlenecks.
  - Drafts empathetic, concise, and context-rich status updates tailored to specific audiences (Executive bullet points vs. Engineering technical updates).
- **Communication Attribution & Bot Identity**:
  - Messages are dispatched via an official `ProductOS Bot` with transparent attribution: `ProductOS (on behalf of [PM Name])`. This preserves PM authority while eliminating deceptive impersonation liability.
- **Human-in-the-Loop Guardrail**:
  - **Zero automated unreviewed messages**: The agent drafts the message and displays a preview card with a `[Review & Send]` or `[Edit]` button. No external message ever sends without explicit PM confirmation.

### 6.4 Agent 3: Interactive Prototyper Agent (P0)
- **Capabilities**:
  - Turns functional user stories and PRDs into responsive, interactive wireframes directly inside the Canvas pane.
  - Renders live HTML, Tailwind CSS, and lightweight React components in an isolated sandboxed iframe.
  - Supports interactive user flows: clicking buttons triggers screen state transitions (e.g., empty state -> loading state -> success state).
  - Ingests backend architectural constraints from the Spec Agent to ensure prototypes do not propose technically impossible behaviors.
  - **Design System Evolution**:
    - *MVP (P0)*: **Cal.com Design System** (`https://getdesign.md/cal/design-md`) with clean white canvas, deep ink `#111111`, solid black CTAs, `nav-pill-group` navigation, and embedded product fragments.
    - *Phase 1.5 Fast Follow*: Custom Enterprise Design Token Ingestion (JSON / Figma Token Studio import) to render with internal corporate styles, typography, and component specs.
  - Provides instant export: 1-click copy clean HTML/React code, SVG wireframe export, or copy link for stakeholder testing.

### 6.5 Agent 4: Requirement Triage & Strategic Assessment Agent (P0)
- **Role**: Intelligent front-door for all inbound business requirements, feature requests, and automation asks from cross-functional teams (Sales, CS, Operations, Leadership).
- **Core Capabilities**:
  1. **Multi-Product Intake & Routing**: Parses raw inbound requests from Slack, Teams, Email, or Jira tickets. Maps each request to the correct product domain, module, or epic.
  2. **Delta Analysis Against Existing Documentation**: Uses MCP to search existing workspace PRDs, architecture docs, and backlogs to determine classification:
     - *Net-New Feature* (0-to-1 capability)
     - *Enhancement / Extension* (modifies an existing workflow)
     - *Bug / Defect* (intended functionality broken)
     - *Existing Capability* (already supported via existing settings or workflows).
  3. **Strategic & Competitive Value Analysis**: Performs focused market research via web search / competitor knowledge to evaluate if the request provides a true **competitive moat**, represents **table-stakes parity**, or is a **niche / nice-to-have** distraction.
  4. **Evidence & Completeness Audit**: Validates whether the request contains essential PM decision criteria:
     - Quantifiable business value (revenue opportunity, operational cost saved, hours saved).
     - Expected user volume and frequency of usage.
     - Concrete evidence, customer quotes, or deal-blocker logs.
  5. **Interactive Stakeholder Clarification Loop (Human-in-the-Loop)**:
     - If critical details or value proof are missing, the agent drafts a polite, structured follow-up inquiry to the requester (e.g. via Slack/Teams or email).
     - Provides a 1-click `[Review & Send Follow-up]` card for the PM to ask the stakeholder for expected usage, evidence, and ROI.
  6. **Strategic Recommendation Dossier**: Synthesizes findings into a crisp 1-page assessment card in the Daily Action Inbox with a clear recommendation: `Pursue (Draft PRD)`, `Deprioritize (Add to Icebox)`, or `Decline (Point to Existing Workaround)`.

### 6.6 Feature 2: Multi-Product & Multi-Project Context Switcher (P0)
- **Role & Problem Solved**: Modern PMs rarely manage just one initiative; they simultaneously handle multiple products, shared platform modules, or distinct client/initiative projects. Without granular scoping, notifications and specs become a chaotic blended mess.
- **Core Capabilities**:
  1. **Top-Bar Global Scope Selector**:
     - Fast multi-tier selector: `[All Portfolios ▾]`, `[Product: X ▾]`, `[Project / Initiative: Y ▾]`.
     - Instant keyboard switching via omni-bar command: `/scope [product/project name]`.
  2. **Cascading Three-Layer Workspace Filtering**:
     - **Action Inbox**: Filters to only show blockers, unread sign-offs, and requirement triage cards associated with the selected product/project.
     - **Conversational Agent Thread**: Automatically injects that product's specific architectural context, design guidelines, Jira/ServiceNow project keys, and Slack channels into the agent's active memory.
     - **Canvas Artifacts**: Shows active PRDs, wireframes, and user story maps strictly for the active scope.
  3. **Executive Portfolio Roll-Up ("All Products" Mode)**:
     - PM can switch back to `[All Portfolios]` to view high-level, cross-project blocker heatmaps, unblocking items across all their domains simultaneously.
  4. **Smart Entity Tagging**:
     - Inbound business requests, Jira/ServiceNow tickets, and Slack threads are automatically tagged by the Triage Agent with the appropriate product and project metadata.

### 6.7 Feature 3: Conversational PM Copilot & Ad-hoc Workspace Chat (P0)
- **Role & Problem Solved**: While structured PRDs and queues are essential, PMs spend significant time in open-ended exploratory thought—brainstorming product ideas, evaluating edge cases, running ad-hoc competitor research, or querying their Jira/ServiceNow backlogs in natural language. ProductOS provides a dedicated, ChatGPT-style conversational copilot seamlessly integrated alongside the living canvas.
- **Core Capabilities**:
  1. **Right Pane Primary Surface, Centered Home-State & Card Contextualization (Chat Down Mode)**:
     - In its home/default state, the right pane functions as the primary **AI Chat Copilot** surface with the query input box centered in the viewport alongside quick prompt starters and status badges, completely eliminating outer window scrolling.
     - Sending a prompt or choosing a starter card smoothly transitions the view into an active conversational thread with citations, actions, and a docked bottom input box.
     - When any card from the Action Inbox is selected, the right pane seamlessly renders the card's corresponding details (prototype, PRD spec, ServiceNow sync, or triage dossier), while the **chat box moves down to the bottom of the pane**, permanently visible within the viewport with card-specific contextual suggestions.
     - A 1-click `[ 💬 Full Chat View ]` button in the header allows the PM to expand back to the centered/full conversation feed at any point.
  2. **Ad-Hoc Market Research Engine**:
     - PM can ask: *"What are Stripe and Adyen's fee structures for ApplePay PassKit?"* or *"Analyze conversion lift benchmarks for biometric tap-to-pay"*.
     - Invokes real-time Web Search and competitor intelligence MCP tools, synthesizing structured benchmarking tables with cited sources.
  3. **Ideation & Brainstorming Sandbox**:
     - Explores feature variants, user friction points, and edge cases (*"Brainstorm 5 failure modes for network drops during Face ID auth"*).
     - Generates structured ideas with feasibility ratings and architectural trade-offs.
  4. **Conversational Backlog & Item Management**:
     - Directly queries connected Jira and ServiceNow MCP instances using the PM's user-scoped credentials (*"Which stories in Sprint 42 are blocked?"*, *"Reassign DEM-8821 to Alex Kim"*).
  5. **1-Click Canvas Promotion & 2-Way Sync**:
     - Action buttons embedded directly in assistant response bubbles allow the PM to instantly promote chat artifacts into the Living Canvas:
       - `[ 📄 Add to PRD Canvas ]`: Appends research findings or brainstormed acceptance criteria directly to the active PRD.
       - `[ 📱 Preview in Prototype ]`: Triggers the Interactive Prototyper to render a wireframe matching the brainstormed flow.
       - `[ 🚀 Create ServiceNow Story ]`: Converts chat suggestions into engineering backlog stories on ServiceNow (`rm_story`).
  6. **Contextual Grounding**:
     - Chat sessions are automatically scoped to the active Product / Project selected in the global top-bar, ensuring answers respect relevant repos, tickets, and Slack channels.

### 6.8 Phase 2 / Fast Follow Capabilities (P1)
- **Customer Feedback & VoC Agent (P1)**: Ingests Gong recordings, Zendesk/Intercom tickets, and user survey responses; clusters them into thematic sentiment trends and links customer quotes directly to PRD feature requests.
- **Deep Market & Continuous Tracking Agent (P1)**: Autonomously scans public competitor product updates, changelogs, pricing pages, and reviews on a continuous recurring basis.

---

## 7. Scope & Prioritization (MoSCoW Matrix)

| Priority | Feature / Capability | Description |
| :--- | :--- | :--- |
| **P0 (Must-Have)** | **Split-Screen Action Inbox + Copilot Canvas** | Dedicated Action Inbox on left, Primary AI Copilot Chat on right with card details and docked chat upon selection. |
| **P0 (Must-Have)** | **Conversational PM Copilot & Ad-hoc Chat** | Primary right-pane ChatGPT-style interface for market research, brainstorming, ServiceNow backlog queries, and card-scoped chat. |
| **P0 (Must-Have)** | **Daily Action Inbox** | Morning briefing ranking blocked dependencies, unread approvals, and stale specs with 1-click action triggers. |
| **P0 (Must-Have)** | **Multi-Product / Project Scope Filter** | Persistent global context switcher cascading filters across Action Inbox, Agent context, and Canvas artifacts. |
| **P0 (Must-Have)** | **Requirement Triage & Assessment Agent** | Inbound request routing, delta vs existing PRDs, competitive edge analysis, missing evidence gathering, and recommendation. |
| **P0 (Must-Have)** | **Spec & Story Writer Agent** | Grounded PRD generation, story breakdown, and Gherkin acceptance criteria with ServiceNow SPM / Agile 2.0 1-click publishing (Jira/Linear deferred to Phase 2). |
| **P0 (Must-Have)** | **Stakeholder Follow-Up Agent** | Cross-channel dependency tracking with "Draft & 1-Click Approve" guardrails for Slack and Email. |
| **P0 (Must-Have)** | **Interactive Prototyper Agent** | Sandboxed iframe rendering live HTML/Tailwind/React clickable mockups with state toggles and code export. |
| **P0 (Must-Have)** | **Configurable Agent Execution Cadence** | Granular execution frequency scheduling (interval/cron/manual) and instant on-demand run triggers for every agent. |
| **P0 (Must-Have)** | **MCP-First User-Scoped Integration** | Pluggable MCP tool servers (Slack, Teams, Email, Jira, ServiceNow, Linear) running strictly under PM personal OAuth credentials. |
| **P0 (Must-Have)** | **Enterprise Auth & Security** | Google/Okta SAML SSO, SOC2 Type II readiness, zero central data lake, zero LLM model training on customer data. |
| **P1 (Should-Have)**| **Enterprise Design Token Ingestion** | Ingestion of custom Figma / JSON design tokens to replace generic Tailwind wireframe styles. |
| **P1 (Should-Have)**| **VoC & Feedback Synthesis Agent** | Ingestion and thematic clustering of Gong calls, Zendesk tickets, and user survey feedback. |
| **P1 (Should-Have)**| **Continuous Market Tracking Agent** | Automated competitor pricing updates and public changelog monitoring. |
| **P1 (Should-Have)**| **Figma Native Bi-directional Sync** | Direct export of Canvas wireframes into Figma frames and design system component libraries. |
| **P2 (Could-Have)** | **Multi-PM Collaborative Canvas** | Real-time multiplayer cursor editing across multiple product managers. |
| **P2 (Could-Have)** | **Custom Agent Workflow Builder** | Visual node graph allowing PMs to chain custom multi-agent subroutines. |
| **Out of Scope** | **Standalone Issue Tracker** | ProductOS will NOT replace Jira, ServiceNow, or Linear for engineering execution; it synchronizes with them. |
| **Out of Scope** | **Autonomous Unsupervised Outreach**| Agents will NEVER send messages to stakeholders or push code to production without human confirmation. |

---

## 8. Functional Requirements & User Stories

### Story US-01: Continuous & On-Demand Action Inbox with Prescriptive PM Guidance
- **As a** Product Manager,
- **I want** ProductOS to continuously poll my connected MCP tools every 30 minutes, support instant on-demand refreshes, update existing action items in-place as discussions evolve, and provide prescriptive "Recommended Best Next Steps",
- **So that** I always have an up-to-the-minute, prioritized cockpit telling me the highest-leverage actions to take without being overwhelmed by duplicate notifications.
- **Acceptance Criteria**:
  - `Given` active user-scoped MCP integrations (Jira, ServiceNow, Linear, Slack, Teams, Email),
  - `When` the background scheduler runs every 30 minutes OR when the PM clicks `[Refresh Actions]` / presses `Cmd + Shift + R`,
  - `Then` the Action Inbox evaluates unread threads, ticket blockers, and incoming requirements, updating within $< 4$ seconds.
  - `Given` an existing action item already in the inbox (e.g. blocked PRD signoff),
  - `When` new messages arrive on that same thread or ticket,
  - `Then` the system must update the existing card in-place with the latest context and revised urgency rather than generating a duplicate card.
  - `Given` a blocker that is resolved externally (e.g., ticket unblocked or approved in Slack),
  - `When` the next refresh cycle executes,
  - `Then` the associated action card transitions to an auto-resolved state and gently fades out.
  - `Given` any active action card in the inbox,
  - `Then` the card must explicitly display a highlighted **"Recommended Best Next Step"** section detailing the suggested PM decision, paired with a pre-configured 1-click execution button.

### Story US-02: Context-Grounded PRD & User Story Generation
- **As a** Product Manager,
- **I want** to prompt the Spec Writer Agent with a feature concept and receive a detailed, technically grounded PRD,
- **So that** I don't have to spend 6 hours manually drafting specifications from scratch.
- **Acceptance Criteria**:
  - `Given` an ingested repository context containing engineering design guidelines,
  - `When` the PM submits a prompt describing a feature goal,
  - `Then` the Spec Writer Agent renders a complete PRD in the Canvas pane including: Executive Summary, Target Personas, MoSCoW Scope, Functional Stories, Non-Functional Requirements, and Telemetry KPIs.
  - `Then` every user story must include at least 2 acceptance criteria formatted in valid Gherkin syntax (`Given... When... Then...`).
  - `Given` an approved user story in the Canvas,
  - `When` the PM clicks `[Push to ServiceNow]`,
  - `Then` the story is created in the target ServiceNow Agile/SPM instance (`rm_story` linked to parent Demand `dmn_demand` or Epic), and the corresponding Story Key (e.g., `STR-101` or `STRY001024`) is linked back to the Canvas in $< 2$ seconds.

### Story US-03: Human-in-the-Loop Stakeholder Follow-Up
- **As a** Product Manager,
- **I want** the Stakeholder Agent to draft nudge messages for stalled decisions while requiring my 1-click confirmation before sending,
- **So that** I maintain complete control over my team relationships and prevent robotic communications.
- **Acceptance Criteria**:
  - `Given` a stakeholder who has not responded to an approval request after 48 hours,
  - `When` the Stakeholder Agent flags the dependency,
  - `Then` it must generate a draft Slack message displaying the recipient, channel, contextual summary of the ask, and exact phrasing.
  - `Given` the draft preview card,
  - `When` the PM edits the text inline and clicks `[Send via Slack]`,
  - `Then` the message is dispatched via the PM's authenticated Slack account and logged as resolved in the Action Inbox.
  - `Then` the system must NEVER send a communication automatically without an explicit user click.

### Story US-04: Live Interactive Wireframe Prototyping
- **As a** Product Manager,
- **I want** the Prototyper Agent to generate clickable, interactive UI mockups corresponding to my PRD,
- **So that** I can visually validate UX flows with engineers and users before design handoff.
- **Acceptance Criteria**:
  - `Given` an active PRD in the Canvas pane,
  - `When` the PM commands `/prototype [flow name]`,
  - `Then` the Prototyper Agent renders a sandboxed iframe displaying an interactive HTML/Tailwind/React preview within $< 10$ seconds.
  - `Given` an interactive prototype,
  - `When` the user clicks interactive buttons (e.g., "Submit Form", "Toggle Modal"),
  - `Then` the mock must execute realistic UI state transitions without throwing JavaScript console errors.
  - `Then` the canvas must provide a `[Copy Code]` button and a shareable public preview link with password protection.

### Story US-05: Inbound Requirement Triage, Delta Analysis, & Stakeholder Evidence Gathering
- **As a** Product Manager,
- **I want** ProductOS to analyze inbound business requests from stakeholders, compare them against existing product documentation, conduct competitive edge research, and autonomously draft clarification inquiries for missing details,
- **So that** I spend zero time parsing vague asks and can make grounded strategic triage decisions with complete evidence.
- **Acceptance Criteria**:
  - `Given` an inbound request received via Slack/Teams mention, email, or Jira/ServiceNow intake ticket/demand,
  - `When` the Requirement Triage Agent processes the input,
  - `Then` it attributes the request to the correct product/module and categorizes the delta vs existing PRDs (`Net-New`, `Enhancement`, `Bug`, `Already Supported`).
  - `Given` the request represents a proposed feature or automation,
  - `When` market research is applicable,
  - `Then` the agent performs targeted competitor research and flags whether the capability offers a `Competitive Moat`, `Table-Stakes Parity`, or `Niche Nice-to-Have`.
  - `Given` an inbound request lacks quantifiable value, expected usage volume, or evidence,
  - `When` the agent generates the triage dossier,
  - `Then` it creates a draft follow-up inquiry card with targeted questions tailored to the request (e.g. *"What is the expected monthly volume? What is the quantifiable business value or client evidence? What is the current manual workaround?"*).
  - `Given` the draft follow-up card in the Daily Action Inbox,
  - `When` the PM clicks `[Approve & Send to Stakeholder]`,
  - `Then` the inquiry is sent via the authenticated tool on the PM's behalf (`ProductOS on behalf of [PM Name]`), and the item enters a `Waiting for Stakeholder Evidence` state.

### Story US-06: Configurable Agent Execution Cadence & On-Demand Manual Triggers
- **As a** Product Manager,
- **I want** to configure the background execution frequency for each individual agent and trigger any agent on-demand at any moment,
- **So that** I have total control over when background tasks run without wasting API quotas or waiting for periodic syncs.
- **Acceptance Criteria**:
  - `Given` an authenticated agent in the workspace (e.g. Stakeholder Follow-Up Agent, Requirement Triage Agent),
  - `When` the PM opens the Agent Settings drawer,
  - `Then` the PM can set its cadence to `Every 15 min`, `Every 30 min`, `Hourly`, `Daily (Custom Time)`, `Weekly (Custom Day/Time)`, or `Manual Only`.
  - `Given` any agent in any state,
  - `When` the PM clicks the `[Run Now]` trigger button on the agent badge or enters `/run [agent-name]` in the omni-bar,
  - `Then` the agent initializes and begins execution within $< 1$ second, streaming real-time progress indicators into the UI.
  - `Then` the Agent Control Panel displays the last-run timestamp, execution duration, and next scheduled run time.

### Story US-07: Multi-Product & Multi-Project Context Filtering
- **As a** Product Manager managing multiple simultaneous products or client projects,
- **I want** to select a specific product or project from the top navigation bar to instantaneously filter my Action Inbox, conversational agent context, and Canvas artifacts,
- **So that** I can context-switch cleanly between distinct product domains without cognitive overload or blended noise.
- **Acceptance Criteria**:
  - `Given` a user assigned to multiple products/projects in the workspace,
  - `When` the PM clicks the top-bar Scope Selector and picks a specific product (e.g. `Checkout Engine`),
  - `Then` the Action Inbox filters to display only action items tagged with that product in $< 200$ms.
  - `Then` the conversational agent thread automatically updates its grounding context to only query Jira/ServiceNow keys, code repositories, and Slack/Teams channels mapped to that product.
  - `Then` the Canvas switches to the active PRDs and wireframes associated with that product.
  - `Given` a user who wants an executive cross-portfolio view,
  - `When` the PM selects `[All Portfolios]`,
  - `Then` the workspace aggregates all active products, presenting categorized badges for each card indicating its parent project.

---

## 9. Non-Functional Requirements (NFRs)

### 9.1 Performance & Latency
- **UI Responsiveness**: Canvas text rendering and state transitions must respond in $< 50$ms.
- **Agent First Token Latency (TTFT)**: Conversational responses must begin streaming within $< 1.2$ seconds.
- **Prototype Generation Time**: Sandboxed HTML/Tailwind interactive wireframes must fully compile and render in $< 10$ seconds for standard flows ($\le 3$ views).
- **Integration Webhook Ingestion**: Webhooks from Jira, ServiceNow, Linear, and Slack/Teams must be ingested and reflected in the state graph in $< 2$ seconds.

### 9.2 Reliability & Availability
- **System Uptime**: 99.9% availability for core workspace and canvas functionality.
- **Offline / Degraded Mode**: If external AI model providers experience an outage, the Canvas and Daily Action Inbox must remain fully operational in read/edit mode with clear status banner notifications.

### 9.3 Security, Privacy & Enterprise Compliance
- **Data Isolation**: Multi-tenant architecture with logical tenant isolation at the database layer.
- **Zero Training Agreement**: Zero customer data, prompt content, or ingested workspace artifacts will be used to train public or third-party LLM foundation models.
- **Encryption**: TLS 1.3 in transit and AES-256 encryption at rest for all stored credentials, tokens, and documents.
- **Compliance Standards**: SOC2 Type II compliance audit within 6 months of public release; GDPR and CCPA compliant data deletion and export endpoints.

---

## 10. Success Metrics & Telemetry

### 10.1 North Star Metric
* **Weekly Active Workspaces with $\ge 3$ Completed High-Impact Agent Workflows (WAW-3)**: Measuring active teams who routinely rely on ProductOS to ship PRDs, resolve blockers, or generate prototypes each week.

### 10.2 Supporting Product KPIs
1. **Time-to-Sprint-Ready-PRD**: Reduction in average time required to move a feature from ideation to approved Jira / ServiceNow user stories (Target: 75% reduction from baseline).
2. **First-Run Activation Rate**: % of new users who complete at least one Agent action (PRD draft or Action Inbox resolution) within their first 20 minutes (Target: $\ge 65\%$).
3. **Draft Acceptance Rate**: % of Agent-generated stakeholder messages and user stories accepted with $< 20\%$ textual edits (Target: $\ge 70\%$).
4. **Day 30 Retention**: % of onboarded product managers returning weekly at Day 30 (Target: $\ge 45\%$).

### 10.3 Guardrail & Counter Metrics
- **Stakeholder Spam / Annoyance Rate**: Rate of reported negative stakeholder sentiment or opt-outs from automated follow-up threads (Target: $< 1\%$).
- **Spec Rollback / Rejection Rate**: % of Agent-pushed Jira/ServiceNow stories deleted or heavily rewritten by engineering teams due to technical inaccuracy (Target: $< 5\%$).

---

## 11. Edge Cases & Concurrency Handling Matrix

### 11.1 Concurrency & Two-Way Sync Conflicts
* **Scenario**: The PM modifies an acceptance criterion in ProductOS at the same time an engineering lead updates the ticket in Jira/ServiceNow or leaves a refuting comment.
* **Specification**: 
  - ProductOS enforces a **3-Way Diff Protocol**. It never silently overwrites external Jira, ServiceNow, or Linear changes.
  - If a collision occurs, the issue is locked from automatic sync and surfaced in the Daily Action Inbox with a side-by-side diff modal (`Keep Canvas Version`, `Adopt Jira/ServiceNow Version`, or `Merge Manually`).

### 11.2 Zero-Ingestion Architecture & User-Scoped MCP Boundaries
* **Scenario**: Concerns regarding confidential executive chatter, private emails, or HR announcements being leaked into public product backlogs or ingested into a corporate data lake.
* **Specification**:
  - **Zero Central Storage / No Data Lake**: ProductOS strictly refuses to ingest, mirror, or warehouse email, Slack, or Teams conversations into a centralized database.
  - **OpenClaw-Style Modular MCP Servers**: PMs connect external tools as modular Model Context Protocol (MCP) servers (Slack MCP, Teams MCP, Gmail/Outlook MCP, Jira MCP, ServiceNow MCP).
  - **User-Scoped Permission Enforcement**:
    - Every MCP tool call is executed using the PM's authenticated personal credentials and OAuth scopes.
    - An agent *cannot* search or read any channel, email, or issue that the PM does not have explicit authorization to view in the underlying app.
    - Because data is queried just-in-time and kept ephemeral in-memory, there is no cross-tenant or cross-user data pooling, eliminating enterprise data leakage risks at the root architectural level.

### 11.3 In-Flight Active Sprint Guardrail
* **Scenario**: A PM modifies scope or deletes a story in ProductOS that is currently committed to an ongoing sprint in Jira or ServiceNow Agile.
* **Specification**:
  - The Jira/ServiceNow integration checks the `sprint.state` / execution state attribute.
  - If sprint state is `ACTIVE`, the sync button displays an orange badge: `⚠️ In Active Sprint`.
  - Pushing changes requires a two-step confirmation and automatically logs a changelog event in the team's sprint Slack/Teams channel: `[Scope Change Alert] PROD-102 modified by PM in active Sprint 14`.

### 11.4 Out-of-Office (OOO) & Smart Nudge Throttling
* **Scenario**: A stakeholder is on vacation, illness, or leave while dependencies are pending.
* **Specification**:
  - The Stakeholder Agent queries Google Calendar / Outlook status prior to drafting follow-ups.
  - If marked OOO, follow-up actions are paused until 10:00 AM on the recipient's return date.
  - **Frequency Cap**: Hard limit of 2 nudges per dependency. If unacknowledged, the agent suggests scheduling a 10-minute synchronous alignment block rather than sending a 3rd ping.
  - **Sentiment Override**: If a recipient replies with negative sentiment ("stop pinging me" / "I'm busy"), the agent immediately mutes automated prompts for that thread and alerts the PM.

### 11.5 Integration Health & Heartbeat Telemetry
* **Scenario**: OAuth token expires or webhook delivery fails silently overnight.
* **Specification**:
  - Persistent health check running every 15 minutes.
  - If integration health drops below 100%, the Daily Action Inbox renders a sticky alert banner: `⚠️ Jira / ServiceNow Sync Degraded - Re-authenticate to refresh morning actions`.
  - Zero false positives: The system will never show "0 Blockers" if integration telemetry is offline.

---

## 12. Risk Analysis & Mitigation Matrix

| Risk / Failure Mode | Impact | Likelihood | Mitigation Strategy |
| :--- | :---: | :---: | :--- |
| **1. Grounding Hallucinations**: Spec Agent invents APIs or disregards company tech stack, causing engineers to lose trust in the workspace. | Critical | Medium | Implement strict RAG & Graph-based context grounding against the team's engineering docs, repository schemas, and design systems. Require explicit citation of existing components. |
| **2. Stakeholder Spam / Friction**: Automated nudges irritate VP-level or engineering colleagues. | High | Medium | Strictly enforce Tiered Autonomy: zero autonomous external sends. All pings must be reviewed and 1-click confirmed by the PM. Provide personalized tone adjustments. |
| **3. Integration Fragility**: Jira, ServiceNow, or Slack API rate limits or permission revokes break workspace synchronization. | High | Medium | Build idempotent webhook processing queues with exponential backoff and transparent integration health status indicators in the user settings UI. |
| **4. Cold-Start Empty Canvas**: User opens the workspace with no active projects and doesn't know what to prompt. | Medium | High | Provide 1-click sample templates (e.g., "B2B SaaS Onboarding Spec", "Mobile Checkout Overhaul") with synthetic Jira/ServiceNow/Slack data to demonstrate immediate value. |

---

## 13. Open Questions & Future Explorations

1. **Self-Hosted vs. Cloud Model for Enterprise**: Will large enterprises (financial, healthcare) require VPC deployment or on-premise model execution, or is SOC2 cloud tenancy sufficient? *(Owner: Product / Security Lead)*
2. **Design System Component Parsing**: Can the Interactive Prototyper parse real enterprise Figma Tokens or Storybook component libraries in real time rather than standard Tailwind? *(Owner: Engineering Spike - Sprint 2)*
3. **Multi-Model Orchestration**: Should different agents utilize distinct foundation models (e.g., Claude 3.5 Sonnet for detailed spec writing and code generation, Gemini 1.5 Pro for massive cross-channel context ingestion)? *(Owner: AI Platform Lead)*

---

## 14. Implementation Architecture & Technical Stack Specification

Based on architectural alignment, ProductOS transitions from prototype to a production-grade working solution using the following unified technical architecture:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          UNIFIED MONOREPO STRUCTURE                         │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ frontend/ (Next.js + TypeScript)     │ backend/ (Python 3.11+ + FastAPI)    │
│ • Next.js App Router & React 19      │ • FastAPI Async REST & SSE Gateway   │
│ • Cal.com Design Tokens & Tailwind   │ • LangGraph Stateful Agent Engine    │
│ • Zustand (Scope & Workspace State)  │ • APScheduler / Redis Cadence Engine │
│ • Sandboxed Iframe (Prototypes)      │ • LiteLLM Provider-Agnostic Router   │
│ • Connectors Configuration Panel     │ • Dynamic MCP Client Manager         │
├──────────────────────────────────────┴──────────────────────────────────────┤
│ PERSISTENCE & INTEGRATIONS:                                                 │
│ • Supabase: PostgreSQL + RLS + Auth + Realtime + Encrypted Credentials Vault│
│ • ServiceNow Connector: User-configured ServiceNow MCP Server               │
│ • Google Workspace Connector: User-configured Google MCP Server (Gmail/Chat)│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 14.1 Core Technical Stack Breakdown

1. **Frontend Application (`frontend/`)**:
   - **Framework**: Next.js 15+ (App Router) with TypeScript.
   - **UI & Design System**: 1:1 implementation of the **Cal.com Design System** (`DESIGN.md`) using Tailwind CSS, hairline borders (`#e5e7eb`), deep jet ink (`#111111`), and signature nav-pill switchers.
   - **State & Realtime Sync**: Zustand for workspace context (active product/project scope, view toggles) and TanStack Query for debounced polling and SSE stream ingestion.
   - **Interactive Prototype Sandbox**: Isolated `<iframe sandbox="allow-scripts">` rendering dynamic HTML/Tailwind/React bundles with postMessage event bridges.

2. **Agent Orchestration Backend (`backend/`)**:
   - **Framework**: Python 3.11+ with **FastAPI** providing asynchronous REST endpoints and Server-Sent Events (SSE) streaming for first-token latencies $< 1.2$s.
   - **Agent Engine**: **LangGraph** stateful cyclic graphs with native Human-in-the-Loop approval checkpoints (ensuring external sends like Slack follow-ups or ServiceNow story creation pause for explicit PM confirmation).
   - **Cadence & Scheduling**: **APScheduler + Redis** for per-agent background execution loops (15m, 30m, daily cron) and instant `/run` on-demand triggers.

3. **Database, Persistence & Security**:
   - **Primary Store**: **Supabase (PostgreSQL)** with Row-Level Security (RLS) guaranteeing tenant isolation.
   - **Zero Bulk Data Lake**: Ephemeral in-memory processing of raw communication threads; only workspace metadata, product scopes, action cards, PRDs, and prototype code are persisted.
   - **Credential Vault**: PM personal OAuth tokens for connected MCP servers are stored in Supabase Vault with AES-256-GCM encryption.

4. **Model Strategy (Provider-Agnostic LiteLLM Router)**:
   - **Heavy Reasoning & Prototyping Code**: Claude 3.5 Sonnet / OpenAI GPT-4o for nuanced PRDs, acceptance criteria, and interactive HTML wireframes.
   - **Rapid Triage & Copilot Chat**: Google Gemini 2.0 Flash / GPT-4o-mini for sub-second background classification, 30m reconciliation, and conversational queries.

5. **Personalized MCP Connectors**:
   - **ServiceNow MCP Server Connector**: Connected via the PM's personal credentials to query Demands (`dmn_demand`) and create Stories (`rm_story`).
   - **Google Workspace MCP Server Connector**: Connected via the PM's personal Google credentials to access Gmail, Google Chat, and Google Calendar.
   - **Dynamic MCP Client Manager**: Python backend manages user-scoped stdio/SSE client sessions dynamically based on configured settings.

6. **Phased Implementation Roadmap**:
   - **Phase 1 (Vertical Slice MVP)**: Monorepo scaffolding (`frontend/` + `backend/`), database schema migration, live Cal.com UI connected to FastAPI/LangGraph streaming copilot, and personalized ServiceNow & Google Workspace MCP connector settings.
   - **Phase 2**: Full 4-agent roster autonomous background loop with 30m reconciliation, sandboxed prototype generator, and ServiceNow story creation.
