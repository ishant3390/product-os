# ProductOS 🚀

> **Autonomous AI-Native Workspace for Product Managers**  
> *A Cal.com-inspired two-pane executive operating cockpit featuring a continuous Action Inbox, multi-product context scoping, living canvas artifacts, and a centered conversational AI Copilot.*

---

## 🌟 Overview

**ProductOS** is an intelligent operating system designed specifically for Product Managers. Instead of PMs acting as manual information routers across fragmented SaaS tools (Jira, ServiceNow, Slack, Teams, Email), ProductOS deploys autonomous, specialized agents to triage incoming requirements, proactively reconcile blockers, draft sprint-ready specifications, and render interactive clickable prototypes.

### ✨ Key Features

- **Centered Conversational AI Copilot (ChatGPT-style)**:
  - Zero-scroll, viewport-locked (`100vh`) home experience with centered input and prompt starters.
  - Ad-hoc market research, competitor benchmarking, and backlog queries grounded via real-time tool connections.
  - In "Chat Down" mode, selecting an action item smoothly reveals its detailed prototype and spec while docking the chat box at the bottom for contextual assistance.

- **Continuous Action Inbox**:
  - Automatically reconciles team signals across ServiceNow, Slack, and email every 30 minutes (with on-demand sync).
  - Prescriptive **💡 Recommended Best Next Step** engine advising the PM on high-leverage decisions.
  - Zero card duplication: in-place status updates and auto-resolution when blockers clear externally.

- **Multi-Product & Multi-Project Context Switcher**:
  - Global top-bar switcher that instantly cascades filters across the Action Inbox, AI conversational memory, and Canvas artifacts.

- **Cal.com Design System (Calm, Clean, Software-Craft)**:
  - Clean white canvas (`#ffffff`), 1px hairline dividers (`#e5e7eb`), deep jet black ink (`#111111`), and signature nav-pill switchers.

- **Living Artifacts & ServiceNow Sync**:
  - Interactive clickable wireframe prototypes with instant feedback states.
  - Full Gherkin acceptance criteria (`Given/When/Then`).
  - 1-click push to ServiceNow SPM & Agile Development 2.0 (`rm_story`).

---

## 📂 Repository Structure

```
.
├── index.html               # Live interactive web prototype (GitHub Pages ready)
├── prototype/
│   └── index.html          # Source prototype file
├── docs/
│   └── PRD-ProductOS.md    # Comprehensive Product Requirements Document (PRD)
├── DESIGN.md               # Cal.com design system tokens and component specs
├── .gitignore              # Standard git ignore definitions
└── README.md               # Project documentation and quick start guide
```

---

## 🚀 Quick Start (Running Locally)

The prototype is a self-contained, high-fidelity single-page application built with modern HTML5, Tailwind CSS (via CDN), and vanilla JavaScript. No complex build pipelines or package installations are required!

### Option 1: Direct File Open
Simply double-click or open `index.html` in any modern web browser:
```bash
open index.html
```

### Option 2: Local HTTP Server
Using Python:
```bash
python3 -m http.server 8080
```
Then visit: [http://localhost:8080](http://localhost:8080)

Using Node.js:
```bash
npx serve .
```

---

## 🌐 Live Prototype Demo

The prototype is automatically hosted and deployed via GitHub Pages:
👉 **[https://ishant3390.github.io/product-os/](https://ishant3390.github.io/product-os/)**

Any changes pushed to the `main` branch are automatically built and published live.

---

## 📖 Product Requirements & Specs

For the complete architectural design, agent rosters, data privacy guarantees, and phased roadmap, refer to the full specification:
👉 [**docs/PRD-ProductOS.md**](docs/PRD-ProductOS.md)
