"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { 
  ChevronDown, 
  RotateCw, 
  Layers, 
  Link2, 
  Sliders, 
  Plus, 
  Sparkles 
} from "lucide-react";

export const TopNavbar: React.FC = () => {
  const { 
    currentScope, 
    scopes, 
    setCurrentScope, 
    isSyncing, 
    triggerSync, 
    setConnectorsModalOpen,
    setAgentDrawerOpen 
  } = useWorkspaceStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const activeScopeObj = scopes.find((s) => s.id === currentScope) || scopes[0];

  return (
    <header className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0 select-none z-30">
      {/* Brand & Scope Switcher */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-semibold text-sm shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-base tracking-tight text-[#111111]">
            ProductOS
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium border border-gray-200">
            MVP
          </span>
        </div>

        <div className="h-4 w-px bg-gray-200" />

        {/* Global Product Scope Switcher */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-2xs text-gray-800"
          >
            <Layers className="w-3.5 h-3.5 text-gray-500" />
            <span>Product: {activeScopeObj?.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 z-50 text-xs">
              <div className="px-2.5 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Select Active Domain
              </div>
              {scopes.map((scope) => (
                <button
                  key={scope.id}
                  onClick={() => {
                    setCurrentScope(scope.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                    currentScope === scope.id
                      ? "bg-gray-100 font-semibold text-[#111111]"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span>{scope.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200/60 text-gray-500 font-mono">
                    {scope.code}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Auto-Sync, Connectors, Agents, Avatar */}
      <div className="flex items-center space-x-3">
        {/* Proactive 30m Auto-Sync Status Pill */}
        <div className="flex items-center space-x-2 text-xs px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>30m Sync Active</span>
          <button
            onClick={triggerSync}
            disabled={isSyncing}
            className="text-gray-400 hover:text-[#111111] transition-colors ml-1"
            title="Instant Sync Now"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-[#111111]" : ""}`} />
          </button>
        </div>

        {/* User-Scoped MCP Connectors Modal Button */}
        <button
          onClick={() => setConnectorsModalOpen(true)}
          className="flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 shadow-2xs"
        >
          <Link2 className="w-3.5 h-3.5 text-gray-500" />
          <span>Connectors</span>
        </button>

        {/* Agent Cadence Drawer Button */}
        <button
          onClick={() => setAgentDrawerOpen(true)}
          className="flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 shadow-2xs"
        >
          <Sliders className="w-3.5 h-3.5 text-gray-500" />
          <span>Agents</span>
        </button>

        {/* Primary CTA */}
        <button className="flex items-center space-x-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg bg-[#111111] text-white hover:bg-black transition-colors shadow-sm">
          <Plus className="w-3.5 h-3.5" />
          <span>Create Spec</span>
        </button>

        {/* PM Avatar */}
        <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-xs font-bold text-amber-800">
          IG
        </div>
      </div>
    </header>
  );
};
