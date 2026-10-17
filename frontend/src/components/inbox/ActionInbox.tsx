"use client";

import React, { useState } from "react";
import { useWorkspaceStore, ActionCard } from "@/store/workspaceStore";
import { 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Sparkles,
  ExternalLink 
} from "lucide-react";

export const ActionInbox: React.FC = () => {
  const { 
    actionCards, 
    selectedCard, 
    setSelectedCard, 
    resolveAction, 
    setViewMode 
  } = useWorkspaceStore();

  const [activeFilter, setActiveFilter] = useState<"all" | "triage" | "blocker">("all");

  const filteredCards = actionCards.filter((card) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "triage") return card.category === "triage";
    if (activeFilter === "blocker") return card.category === "blocker";
    return true;
  });

  return (
    <aside className="w-[390px] border-r border-gray-200 bg-white flex flex-col shrink-0 h-full min-h-0 select-none">
      {/* Header & Quick Launcher */}
      <div className="p-4 border-b border-gray-200 shrink-0 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-semibold tracking-tight text-[#111111]">
              Action Inbox
            </h2>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700">
              {filteredCards.length}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-medium">Ranked P0–P2</span>
        </div>

        {/* Primary AI Copilot Shortcut Button */}
        <button
          onClick={() => {
            setSelectedCard(null);
            setViewMode("copilot-center");
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100/80 border border-gray-200 text-xs font-semibold text-[#111111] transition-all group shadow-2xs"
        >
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-md bg-[#111111] text-white flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span>💬 AI Chat Copilot (Primary)</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
        </button>

        {/* Filter Pills (Cal.com Nav-Pill-Group) */}
        <div className="flex items-center p-1 bg-gray-100 rounded-lg text-xs">
          <button
            onClick={() => setActiveFilter("all")}
            className={`flex-1 py-1 rounded-md text-center font-medium transition-all ${
              activeFilter === "all" ? "bg-white text-[#111111] shadow-xs" : "text-gray-600 hover:text-black"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("triage")}
            className={`flex-1 py-1 rounded-md text-center font-medium transition-all ${
              activeFilter === "triage" ? "bg-white text-[#111111] shadow-xs" : "text-gray-600 hover:text-black"
            }`}
          >
            Triage
          </button>
          <button
            onClick={() => setActiveFilter("blocker")}
            className={`flex-1 py-1 rounded-md text-center font-medium transition-all ${
              activeFilter === "blocker" ? "bg-white text-[#111111] shadow-xs" : "text-gray-600 hover:text-black"
            }`}
          >
            Blockers
          </button>
        </div>
      </div>

      {/* Cards List */}
      <div className="flex-1 overflow-y-auto min-h-0 p-3 space-y-3">
        {filteredCards.length === 0 ? (
          <div className="text-center py-12 px-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
            <p className="text-xs font-semibold text-gray-700">All Blockers Cleared</p>
            <p className="text-[11px] text-gray-400 mt-1">
              Your inbox is up-to-date with connected ServiceNow & Google Workspace channels.
            </p>
          </div>
        ) : (
          filteredCards.map((card) => {
            const isSelected = selectedCard?.id === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white border-[#111111] ring-1 ring-[#111111] shadow-sm"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-xs"
                }`}
              >
                {/* Header: Urgency & Source */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      card.urgency.includes("Critical") || card.urgency.includes("Blocker")
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {card.urgency}
                  </span>
                  <div className="flex items-center space-x-1.5 text-[11px] text-gray-500 font-medium">
                    <span className="capitalize">{card.source}</span>
                    {card.target_ticket && (
                      <span className="font-mono text-[10px] bg-gray-100 px-1 py-0.5 rounded text-gray-600">
                        {card.target_ticket}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Summary */}
                <h3 className="text-xs font-semibold text-[#111111] leading-snug line-clamp-1">
                  {card.title}
                </h3>
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed line-clamp-2">
                  {card.summary}
                </p>

                {/* 💡 Recommended Best Next Step Callout */}
                <div className="mt-2.5 p-2 rounded-lg bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 leading-snug">
                  <span className="font-semibold text-amber-950">💡 Recommended: </span>
                  {card.best_next_step}
                </div>

                {/* Card Action Trigger */}
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-[10px] text-gray-400">Click to inspect details</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resolveAction(card.id);
                    }}
                    className="text-[11px] font-medium text-gray-500 hover:text-black flex items-center space-x-1"
                  >
                    <span>Resolve</span>
                    <CheckCircle2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
