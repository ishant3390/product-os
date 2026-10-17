# DESIGN.md - ProductOS Design System (Cal.com System)
*Anchored on [Cal.com Design System](https://getdesign.md/cal/design-md) from [awesome-design-md](file:///Users/ishantgoyal/Documents/Personal_Work/PM%20Workspace/awesome-design-md/design-md/cal/DESIGN.md)*

---

## 1. Design Philosophy: Calm, Clean, Software-Craft SaaS
ProductOS adopts the **Cal.com design system** to replace visual density and clutter with calm, focused clarity:
- **Canvas**: Clean white canvas (`#ffffff`) and soft-tinted surfaces (`#f8f9fa`, `#f5f5f5`) that eliminate eye strain.
- **Ink & Typography**: Deep jet black ink (`#111111`) for display headers, neutral body text (`#374151`), and muted captions (`#6b7280`). Display headlines use Cal Sans / Inter 600 with negative tracking (`-0.03em` to `-0.04em`).
- **Signature Primary Action**: Solid black `#111111` primary CTAs with white text and 8px border radius (`rounded-lg`).
- **Nav-Pill-Group**: Cal.com's signature pill-in-pill switcher—subtle soft gray wrapper (`#f3f4f6`) housing active white pills with soft 1px hairline depth.
- **Embedded Product Fragments**: Instead of abstract charts or cluttered tables, cards showcase real, embedded product UI fragments at clean scale.
- **Generous Breathing Room**: Wide gutters, generous padding (`p-6` to `p-8`), and distinct visual grouping so PMs can scan high-priority decisions in seconds without overwhelm.

---

## 2. Design Tokens

```css
:root {
  /* Surfaces */
  --canvas: #ffffff;
  --surface-soft: #f8f9fa;
  --surface-card: #f5f5f5;
  --surface-strong: #e5e7eb;
  --surface-dark: #101010;
  
  /* Hairline Borders */
  --hairline: #e5e7eb;
  --hairline-soft: #f3f4f6;
  --hairline-focus: #111111;

  /* Typography / Ink */
  --ink: #111111;
  --body: #374151;
  --muted: #6b7280;
  --muted-soft: #898989;
  --on-primary: #ffffff;

  /* Cal Accents & Badges */
  --brand-accent: #3b82f6;
  --badge-emerald: #10b981;
  --badge-emerald-bg: #ecfdf5;
  --badge-amber: #f59e0b;
  --badge-amber-bg: #fffbeb;
  --badge-rose: #ef4444;
  --badge-rose-bg: #fef2f2;
  --badge-violet: #8b5cf6;
  --badge-violet-bg: #f5f3ff;
}
```

---

## 3. Simplified PM Component Architecture

### 3.1 Uncluttered Top Navigation
- Height: 64px, pinned with crisp hairline bottom divider (`border-b border-gray-200`).
- Global Scope Selector (`[Payments & Checkout ▾]`): Cal-style subtle selector button with clean dropdown, instantly filtering the workspace.
- Proactive Sync Pill: Shows `● 30m Auto-Sync Active` with manual instant refresh trigger `[⟳ Sync Now]`.
- Black CTA `[ + Create Spec ]` and circular PM avatar (36px).

### 3.2 Calm Action Inbox (Left Pane, ~420px)
- **Reduced Density**: No overwhelming logs or 10-tag badges. 3 spacious, high-signal cards.
- **Card Hierarchy**:
  1. Soft tag pill (`Triage Request`, `Blocker`, `Ready for Sync`).
  2. Crisp title & 1-sentence stakeholder context.
  3. **💡 Recommended Best Next Step**: Distinct light callout box (`bg-amber-50/60 border border-amber-200/50` or `bg-gray-50 border border-gray-200`) offering clear prescriptive guidance.
  4. Single primary button: `[Draft Follow-Up]`, `[Auto-Update Spec]`, or `[Push to Jira & ServiceNow]`.

### 3.3 Active Canvas & Prototype (Right Pane)
- Cal.com **nav-pill-group** switcher:
  - `📱 Interactive Prototype`
  - `📄 Sprint PRD Spec`
  - `🚀 Jira & ServiceNow Sync`
- **Embedded Prototype Card**: Clean mobile/desktop widget mockup inside a rounded-2xl white card with hairline border. Live clickable buttons (`[ Pay Buy with PassKit ]`) simulating instant pass generation.
- **Stakeholder Follow-up Modal**: Clean Cal-style dialogue for human-in-the-loop Slack follow-ups with transparent bot attribution: `ProductOS Bot (on behalf of Ishant Goyal)`.
