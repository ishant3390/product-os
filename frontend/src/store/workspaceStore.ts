import { create } from "zustand";

export interface ProductScope {
  id: string;
  name: string;
  code: string;
  is_default: boolean;
  description?: string;
}

export interface ActionCard {
  id: string;
  scope_id: string;
  source: string;
  category: string;
  urgency: string;
  title: string;
  summary: string;
  best_next_step: string;
  status: string;
  action_type: string;
  action_label: string;
  target_ticket?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ConnectorConfig {
  id: string;
  connector_type: string;
  name: string;
  is_enabled: boolean;
  mode: string;
  instance_url?: string;
  username?: string;
  client_id?: string;
  status: string;
  target_tables?: string;
}

interface WorkspaceState {
  currentScope: string;
  scopes: ProductScope[];
  actionCards: ActionCard[];
  selectedCard: ActionCard | null;
  viewMode: "copilot-center" | "copilot-active" | "card-details";
  connectorsModalOpen: boolean;
  agentDrawerOpen: boolean;
  isSyncing: boolean;
  connectors: ConnectorConfig[];

  setCurrentScope: (scopeId: string) => void;
  setSelectedCard: (card: ActionCard | null) => void;
  setViewMode: (mode: "copilot-center" | "copilot-active" | "card-details") => void;
  setConnectorsModalOpen: (open: boolean) => void;
  setAgentDrawerOpen: (open: boolean) => void;
  
  fetchScopes: () => Promise<void>;
  fetchActions: () => Promise<void>;
  fetchConnectors: () => Promise<void>;
  resolveAction: (actionId: string) => Promise<void>;
  triggerSync: () => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  currentScope: "checkout-engine",
  scopes: [
    { id: "all", name: "All Portfolios", code: "ALL", is_default: true },
    { id: "checkout-engine", name: "Checkout & Payments", code: "CHK", is_default: false },
    { id: "merchant-portal", name: "Merchant Portal", code: "MER", is_default: false },
    { id: "risk-engine", name: "Risk & Compliance", code: "RSK", is_default: false },
  ],
  actionCards: [],
  selectedCard: null,
  viewMode: "copilot-center",
  connectorsModalOpen: false,
  agentDrawerOpen: false,
  isSyncing: false,
  connectors: [],

  setCurrentScope: (scopeId) => {
    set({ currentScope: scopeId });
    get().fetchActions();
  },

  setSelectedCard: (card) => {
    if (card) {
      set({ selectedCard: card, viewMode: "card-details" });
    } else {
      set({ selectedCard: null, viewMode: "copilot-center" });
    }
  },

  setViewMode: (mode) => set({ viewMode: mode }),
  setConnectorsModalOpen: (open) => set({ connectorsModalOpen: open }),
  setAgentDrawerOpen: (open) => set({ agentDrawerOpen: open }),

  fetchScopes: async () => {
    try {
      const res = await fetch("/api/v1/scopes");
      if (res.ok) {
        const data = await res.json();
        set({ scopes: data });
      }
    } catch (err) {
      console.warn("Using default scopes due to fetch error:", err);
    }
  },

  fetchActions: async () => {
    try {
      const scope = get().currentScope;
      const url = scope === "all" ? "/api/v1/actions" : `/api/v1/actions?scope_id=${scope}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        set({ actionCards: data });
      }
    } catch (err) {
      console.warn("Using cached actions due to fetch error:", err);
    }
  },

  fetchConnectors: async () => {
    try {
      const res = await fetch("/api/v1/connectors");
      if (res.ok) {
        const data = await res.json();
        set({ connectors: data });
      }
    } catch (err) {
      console.warn("Using fallback connectors config:", err);
    }
  },

  resolveAction: async (actionId) => {
    try {
      await fetch(`/api/v1/actions/${actionId}/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resolution_note: "PM confirmed action" }),
      });
      // Update locally
      set({
        actionCards: get().actionCards.filter((c) => c.id !== actionId),
        selectedCard: null,
        viewMode: "copilot-center",
      });
    } catch (err) {
      console.error("Failed to resolve action:", err);
    }
  },

  triggerSync: async () => {
    set({ isSyncing: true });
    try {
      await fetch("/api/v1/agents/triage_agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope_id: get().currentScope }),
      });
      await get().fetchActions();
    } finally {
      setTimeout(() => set({ isSyncing: false }), 600);
    }
  },
}));
