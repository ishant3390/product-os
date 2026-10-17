"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { X, CheckCircle2, AlertCircle, RefreshCw, Layers, Mail } from "lucide-react";

export const ConnectorsModal: React.FC = () => {
  const { connectorsModalOpen, setConnectorsModalOpen } = useWorkspaceStore();
  const [activeTab, setActiveTab] = useState<"servicenow" | "google">("servicenow");

  // ServiceNow Form State
  const [snMode, setSnMode] = useState<"sandbox" | "live">("sandbox");
  const [snUrl, setSnUrl] = useState("https://dev12345.service-now.com");
  const [snUser, setSnUser] = useState("admin");
  const [snPass, setSnPass] = useState("");
  const [snTesting, setSnTesting] = useState(false);
  const [snResult, setSnResult] = useState<{ status: string; message: string; latency_ms?: number } | null>(null);

  // Google Workspace Form State
  const [gwMode, setGwMode] = useState<"sandbox" | "live">("sandbox");
  const [gwClientId, setGwClientId] = useState("78912-googleclient.apps.googleusercontent.com");
  const [gwTesting, setGwTesting] = useState(false);
  const [gwResult, setGwResult] = useState<{ status: string; message: string; latency_ms?: number } | null>(null);

  if (!connectorsModalOpen) return null;

  const testServiceNow = async () => {
    setSnTesting(true);
    setSnResult(null);
    try {
      const res = await fetch("/api/v1/connectors/servicenow/test", { method: "POST" });
      const data = await res.json();
      setSnResult(data);
    } catch (err: any) {
      setSnResult({ status: "error", message: err.message || "Failed to reach backend test API" });
    } finally {
      setSnTesting(false);
    }
  };

  const testGoogle = async () => {
    setGwTesting(true);
    setGwResult(null);
    try {
      const res = await fetch("/api/v1/connectors/google_workspace/test", { method: "POST" });
      const data = await res.json();
      setGwResult(data);
    } catch (err: any) {
      setGwResult({ status: "error", message: err.message || "Failed to reach backend test API" });
    } finally {
      setGwTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none animate-in fade-in duration-150">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-sm font-bold text-[#111111]">Personalized MCP Connectors</h2>
            <p className="text-[11px] text-gray-500">
              Configure user-scoped MCP servers to connect your personal ServiceNow and Google accounts.
            </p>
          </div>
          <button
            onClick={() => setConnectorsModalOpen(false)}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Connector Switcher Tabs */}
        <div className="flex border-b border-gray-200 px-6 pt-3 space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("servicenow")}
            className={`pb-3 border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === "servicenow"
                ? "border-[#111111] text-[#111111]"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ServiceNow MCP Server</span>
          </button>

          <button
            onClick={() => setActiveTab("google")}
            className={`pb-3 border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === "google"
                ? "border-[#111111] text-[#111111]"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Google Workspace MCP Server</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs">
          {activeTab === "servicenow" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div>
                  <span className="font-semibold text-gray-800">Connection Mode</span>
                  <p className="text-[11px] text-gray-500">Choose between immediate sandbox emulation or live enterprise REST API.</p>
                </div>
                <div className="flex items-center p-0.5 bg-gray-200/80 rounded-lg text-xs font-semibold">
                  <button
                    onClick={() => setSnMode("sandbox")}
                    className={`px-3 py-1 rounded-md transition-all ${
                      snMode === "sandbox" ? "bg-white text-black shadow-xs" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    Sandbox
                  </button>
                  <button
                    onClick={() => setSnMode("live")}
                    className={`px-3 py-1 rounded-md transition-all ${
                      snMode === "live" ? "bg-white text-black shadow-xs" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    Live
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">ServiceNow Instance URL</label>
                <input
                  type="text"
                  value={snUrl}
                  onChange={(e) => setSnUrl(e.target.value)}
                  placeholder="https://your-company.service-now.com"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Username / Client ID</label>
                  <input
                    type="text"
                    value={snUser}
                    onChange={(e) => setSnUser(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Password / Secret</label>
                  <input
                    type="password"
                    value={snPass}
                    onChange={(e) => setSnPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Verified Tables info */}
              <div className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                <strong>Target Schema Tables:</strong> <code className="font-mono text-gray-700">dmn_demand</code> (Demands Intake), <code className="font-mono text-gray-700">rm_story</code> (Agile 2.0 User Stories).
              </div>

              {snResult && (
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-medium ${
                    snResult.status === "connected"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {snResult.status === "connected" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span>{snResult.message}</span>
                  </div>
                  {snResult.latency_ms && (
                    <span className="text-[10px] font-mono bg-white/80 px-2 py-0.5 rounded text-gray-600">
                      {snResult.latency_ms}ms
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "google" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div>
                  <span className="font-semibold text-gray-800">Connection Mode</span>
                  <p className="text-[11px] text-gray-500">Sandbox mock testing or live Google Workspace OAuth credentials.</p>
                </div>
                <div className="flex items-center p-0.5 bg-gray-200/80 rounded-lg text-xs font-semibold">
                  <button
                    onClick={() => setGwMode("sandbox")}
                    className={`px-3 py-1 rounded-md transition-all ${
                      gwMode === "sandbox" ? "bg-white text-black shadow-xs" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    Sandbox
                  </button>
                  <button
                    onClick={() => setGwMode("live")}
                    className={`px-3 py-1 rounded-md transition-all ${
                      gwMode === "live" ? "bg-white text-black shadow-xs" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    Live
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Google OAuth Client ID</label>
                <input
                  type="text"
                  value={gwClientId}
                  onChange={(e) => setGwClientId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-black font-mono text-[11px]"
                />
              </div>

              <div className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                <strong>Granted Scopes:</strong> Gmail Read/Search, Google Chat Spaces, Google Calendar Free/Busy &amp; OOO.
              </div>

              {gwResult && (
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-medium ${
                    gwResult.status === "connected"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {gwResult.status === "connected" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span>{gwResult.message}</span>
                  </div>
                  {gwResult.latency_ms && (
                    <span className="text-[10px] font-mono bg-white/80 px-2 py-0.5 rounded text-gray-600">
                      {gwResult.latency_ms}ms
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <button
            type="button"
            onClick={activeTab === "servicenow" ? testServiceNow : testGoogle}
            disabled={activeTab === "servicenow" ? snTesting : gwTesting}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${(activeTab === "servicenow" ? snTesting : gwTesting) ? "animate-spin" : ""}`} />
            <span>Test Connection</span>
          </button>

          <button
            type="button"
            onClick={() => setConnectorsModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-[#111111] text-white text-xs font-semibold hover:bg-black transition-all shadow-xs"
          >
            Save &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
