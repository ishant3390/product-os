"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { X, Play, Clock, CheckCircle2, Sliders, Shield } from "lucide-react";

export const AgentControlDrawer: React.FC = () => {
  const { agentDrawerOpen, setAgentDrawerOpen, currentScope } = useWorkspaceStore();
  const [runningAgent, setRunningAgent] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const agents = [
    {
      id: "triage_agent",
      name: "Requirement Triage Agent",
      role: "Inbound request routing & competitive edge analysis",
      defaultCadence: "Every 30 min",
      lastRun: "12m ago",
      status: "Idle",
    },
    {
      id: "spec_agent",
      name: "Spec & Story Writer Agent",
      role: "Grounded PRDs & ServiceNow Agile 2.0 story sync",
      defaultCadence: "Manual Only",
      lastRun: "45m ago",
      status: "Idle",
    },
    {
      id: "stakeholder_agent",
      name: "Stakeholder Follow-up Agent",
      role: "Cross-functional dependency tracking via Slack/Email",
      defaultCadence: "Hourly",
      lastRun: "18m ago",
      status: "Idle",
    },
    {
      id: "prototyper_agent",
      name: "Interactive Prototyper Agent",
      role: "Sandboxed clickable HTML/Tailwind wireframes",
      defaultCadence: "Manual Only",
      lastRun: "2h ago",
      status: "Idle",
    },
  ];

  if (!agentDrawerOpen) return null;

  const handleRunNow = async (agentId: string, agentName: string) => {
    setRunningAgent(agentId);
    setSuccessNotice(null);
    try {
      const res = await fetch(`/api/v1/agents/${agentId}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope_id: currentScope }),
      });
      const data = await res.json();
      setSuccessNotice(`✓ ${agentName} executed successfully in ${data.duration_ms}ms`);
      setTimeout(() => setSuccessNotice(null), 4000);
    } catch (err) {
      console.error("Failed to run agent:", err);
    } finally {
      setRunningAgent(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-end z-50 select-none animate-in fade-in duration-150">
      <div className="bg-white border-l border-gray-200 shadow-2xl w-full max-w-md h-full flex flex-col">
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-[#111111]" />
            <h2 className="text-sm font-bold text-[#111111]">Agent Cadence &amp; Control</h2>
          </div>
          <button
            onClick={() => setAgentDrawerOpen(false)}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Banner */}
        {successNotice && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2 text-xs font-medium text-emerald-800 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Agents List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            Configure how frequently each autonomous agent executes in the background, or trigger on-demand runs at any time.
          </p>

          {agents.map((agent) => (
            <div
              key={agent.id}
              className="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#111111]">{agent.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">{agent.role}</p>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                  {agent.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                <div className="flex items-center space-x-1.5 text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <select
                    defaultValue={agent.defaultCadence}
                    className="bg-transparent text-xs font-medium text-gray-700 outline-none border-b border-dashed border-gray-300 pb-0.5 cursor-pointer"
                  >
                    <option>Every 15 min</option>
                    <option>Every 30 min</option>
                    <option>Hourly</option>
                    <option>Daily at 08:30 AM</option>
                    <option>Manual Only</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleRunNow(agent.id, agent.name)}
                  disabled={runningAgent === agent.id}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-black text-white text-[11px] font-semibold transition-all shadow-2xs disabled:bg-gray-300"
                >
                  <Play className={`w-3 h-3 ${runningAgent === agent.id ? "animate-spin" : ""}`} />
                  <span>{runningAgent === agent.id ? "Running..." : "Run Now"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-[11px] text-gray-500 flex items-center space-x-2">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Tiered Autonomy Active: External writes require PM confirmation.</span>
        </div>
      </div>
    </div>
  );
};
