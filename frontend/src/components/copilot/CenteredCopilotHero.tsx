"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { 
  Sparkles, 
  ArrowUp, 
  Search, 
  Lightbulb, 
  Layers, 
  ShieldCheck 
} from "lucide-react";

interface CenteredCopilotHeroProps {
  onSendMessage: (text: string) => void;
  isStreaming: boolean;
}

export const CenteredCopilotHero: React.FC<CenteredCopilotHeroProps> = ({ onSendMessage, isStreaming }) => {
  const [input, setInput] = useState("");
  const { currentScope, scopes } = useWorkspaceStore();
  const currentScopeObj = scopes.find((s) => s.id === currentScope) || scopes[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    onSendMessage(input);
    setInput("");
  };

  const promptStarters = [
    {
      title: "Market Benchmarks",
      prompt: "Analyze Stripe vs Adyen fee structure for Apple Pay PassKit",
      desc: "Live fee comparison & biometric checkout lift",
      icon: Search,
    },
    {
      title: "Failure Modes",
      prompt: "Brainstorm 5 failure modes for biometric token drop in Safari",
      desc: "Edge cases for offline vaulting and retries",
      icon: Lightbulb,
    },
    {
      title: "ServiceNow Backlog",
      prompt: "Query active ServiceNow Demands and Story blockers for Sprint 42",
      desc: "Live demand sync & acceptance criteria check",
      icon: Layers,
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 h-full min-h-0 select-none bg-[#fafafa]">
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Hero Greeting & Cal.com Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs text-gray-700 shadow-2xs mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
          <span>ProductOS AI Copilot &bull; Scoped to <strong>{currentScopeObj?.name}</strong></span>
        </div>

        <h1 className="text-2xl font-bold text-[#111111] tracking-tight text-center mb-2">
          What would you like to explore today?
        </h1>
        <p className="text-xs text-gray-500 text-center max-w-md mb-6 leading-relaxed">
          Grounded across your ServiceNow SPM demands, Google Workspace threads, and real-time competitor research.
        </p>

        {/* Centered Chat Card */}
        <form onSubmit={handleSubmit} className="w-full bg-white border border-gray-200 rounded-2xl p-3 shadow-sm hover:border-gray-300 transition-all focus-within:border-[#111111] focus-within:ring-1 focus-within:ring-[#111111]">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask about competitor pricing, brainstorm acceptance criteria, or query ServiceNow backlogs..."
            rows={3}
            className="w-full resize-none border-none outline-none text-xs text-[#111111] placeholder:text-gray-400 p-1 bg-transparent"
          />

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>ServiceNow SPM</span>
              </span>
              <span className="inline-flex items-center space-x-1 text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Google Workspace</span>
              </span>
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                input.trim() && !isStreaming
                  ? "bg-[#111111] text-white hover:bg-black"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* 3 Quick Prompt Starter Cards */}
        <div className="grid grid-cols-3 gap-3 w-full mt-4">
          {promptStarters.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSendMessage(item.prompt)}
                className="text-left p-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center mb-2 text-gray-700 group-hover:bg-[#111111] group-hover:text-white transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-semibold text-[#111111] group-hover:text-black">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
