"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { 
  ArrowLeft, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Send,
  Layers,
  FileText,
  Smartphone,
  Share2 
} from "lucide-react";

interface CardDetailsViewProps {
  onSendMessage: (text: string, cardId: string) => void;
}

export const CardDetailsView: React.FC<CardDetailsViewProps> = ({ onSendMessage }) => {
  const { selectedCard, setSelectedCard, setViewMode } = useWorkspaceStore();
  const [activeTab, setActiveTab] = useState<"prototype" | "prd" | "servicenow">("prototype");
  const [chatInput, setChatInput] = useState("");
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  if (!selectedCard) return null;

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendMessage(chatInput, selectedCard.id);
    setChatInput("");
  };

  const handleServiceNowPush = () => {
    setSyncStatus("Pushing to ServiceNow Agile 2.0...");
    setTimeout(() => {
      setSyncStatus("✓ Successfully created Story STRY001048 in ServiceNow Agile 2.0");
      setTimeout(() => setSyncStatus(null), 4000);
    }, 900);
  };

  // Sandboxed HTML prototype bundle
  const prototypeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; }
        </style>
      </head>
      <body class="p-4 flex flex-col items-center justify-center min-h-[360px]">
        <div class="w-full max-w-xs bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <span class="text-xs font-semibold text-slate-800">Acme Retail Checkout</span>
            <span class="text-xs font-bold text-slate-900">$124.50</span>
          </div>
          <div class="py-4 space-y-2 text-xs">
            <div class="flex justify-between text-slate-500">
              <span>Item (AirPods Pro 2)</span>
              <span>$119.00</span>
            </div>
            <div class="flex justify-between text-slate-500">
              <span>Estimated Tax</span>
              <span>$5.50</span>
            </div>
          </div>
          <div id="btn-container" class="pt-2">
            <button id="pay-btn" onclick="pay()" class="w-full py-2.5 px-4 rounded-xl bg-black text-white font-medium text-xs flex items-center justify-center space-x-1.5 hover:bg-slate-800 transition-all shadow-sm">
              <span>Pay Buy with PassKit</span>
            </button>
          </div>
          <div id="status" class="hidden mt-3 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-center text-xs font-medium text-emerald-800">
            ✓ Biometric Payment Authorized!
          </div>
        </div>
        <script>
          function pay() {
            var btn = document.getElementById('pay-btn');
            var status = document.getElementById('status');
            btn.innerHTML = 'Authorizing Face ID...';
            btn.disabled = true;
            setTimeout(function() {
              btn.classList.add('hidden');
              status.classList.remove('hidden');
            }, 800);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-white">
      {/* Top Header Bar */}
      <div className="h-14 px-6 border-b border-gray-200 flex items-center justify-between shrink-0 bg-white select-none">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setSelectedCard(null);
              setViewMode("copilot-center");
            }}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
            title="Back to Centered Copilot"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-bold text-[#111111] line-clamp-1">{selectedCard.title}</h2>
            <div className="flex items-center space-x-2 text-[10px] text-gray-500">
              <span className="uppercase font-semibold text-red-600">{selectedCard.urgency}</span>
              <span>&bull;</span>
              <span>Target: {selectedCard.target_ticket || "None"}</span>
            </div>
          </div>
        </div>

        {/* Cal.com Nav-Pill-Group */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center p-1 bg-gray-100 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab("prototype")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === "prototype" ? "bg-white text-[#111111] shadow-xs" : "text-gray-600 hover:text-black"
              }`}
            >
              📱 Prototype
            </button>
            <button
              onClick={() => setActiveTab("prd")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === "prd" ? "bg-white text-[#111111] shadow-xs" : "text-gray-600 hover:text-black"
              }`}
            >
              📄 Sprint PRD
            </button>
            <button
              onClick={() => setActiveTab("servicenow")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === "servicenow" ? "bg-white text-[#111111] shadow-xs" : "text-gray-600 hover:text-black"
              }`}
            >
              🚀 ServiceNow Sync
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedCard(null);
              setViewMode("copilot-center");
            }}
            className="flex items-center space-x-1 text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700"
          >
            <Sparkles className="w-3.5 h-3.5 text-gray-500" />
            <span>Full Chat</span>
          </button>
        </div>
      </div>

      {/* Middle Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0 p-6 bg-[#fafafa]">
        {activeTab === "prototype" && (
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#111111]">Interactive Clickable Wireframe</h3>
                <p className="text-xs text-gray-500">Sandboxed HTML/Tailwind preview generated by Prototyper Agent.</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                Live State Transitions Active
              </span>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-2">
              <iframe
                title="Interactive Prototype"
                srcDoc={prototypeHtml}
                sandbox="allow-scripts"
                className="w-full h-[400px] border-none rounded-xl"
              />
            </div>
          </div>
        )}

        {activeTab === "prd" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-3xl mx-auto space-y-4 text-xs leading-relaxed text-[#111111]">
            <h3 className="text-base font-bold text-[#111111]">PRD: {selectedCard.title}</h3>
            <p className="text-gray-600">{selectedCard.summary}</p>
            
            <h4 className="font-semibold text-sm pt-2 border-t border-gray-100">Gherkin Acceptance Criteria</h4>
            <div className="p-3 bg-gray-50 rounded-xl font-mono text-[11px] text-gray-700 space-y-2 border border-gray-200">
              <p><strong>Scenario 1: Successful Biometric Token Authorization</strong><br/>
              Given user initiates ApplePay checkout on Safari mobile<br/>
              When biometric FaceID/TouchID completes successfully<br/>
              Then tokenized DPAN is exchanged with payment gateway in &lt; 800ms</p>
              
              <p><strong>Scenario 2: Network Timeout Handling</strong><br/>
              Given network connectivity drops during tokenization<br/>
              When timeout exceeds 15 seconds<br/>
              Then client prompts graceful retry dialog without card re-entry</p>
            </div>
          </div>
        )}

        {activeTab === "servicenow" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#111111]">ServiceNow SPM & Agile 2.0 Publishing</h3>
                <p className="text-xs text-gray-500">Decomposed engineering user stories mapped to target demand.</p>
              </div>
              <button
                onClick={handleServiceNowPush}
                className="px-3.5 py-1.5 rounded-lg bg-[#111111] text-white text-xs font-semibold hover:bg-black transition-all shadow-xs"
              >
                1-Click Push to ServiceNow
              </button>
            </div>

            {syncStatus && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{syncStatus}</span>
              </div>
            )}

            <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="p-3">ServiceNow Field</th>
                    <th className="p-3">Grounded Spec Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 font-medium text-gray-500">Target Table</td>
                    <td className="p-3 font-mono">rm_story (Agile Development 2.0)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-500">Parent Demand</td>
                    <td className="p-3 font-mono">{selectedCard.target_ticket || "DEMAND-00842"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-500">Story Short Description</td>
                    <td className="p-3 font-semibold">{selectedCard.title}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-500">Story Points / Estimate</td>
                    <td className="p-3">5 Points (Sprint 43 Target)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Docked Bottom Chat Box (Always Visible, Zero Window Scroll) */}
      <div className="p-3.5 bg-gray-50/95 border-t border-gray-200 shrink-0 select-none">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-[10px] font-semibold text-gray-500">Context:</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-700">
            {selectedCard.title}
          </span>
          <div className="flex items-center space-x-1.5 ml-auto">
            <button
              onClick={() => onSendMessage("Add offline retry edge case to PRD", selectedCard.id)}
              className="text-[10px] px-2 py-0.5 rounded bg-white border border-gray-200 hover:border-black text-gray-600 transition-colors"
            >
              + Add Offline Timeout
            </button>
            <button
              onClick={() => onSendMessage("Decompose this into 3 ServiceNow sub-stories", selectedCard.id)}
              className="text-[10px] px-2 py-0.5 rounded bg-white border border-gray-200 hover:border-black text-gray-600 transition-colors"
            >
              Decompose Stories
            </button>
          </div>
        </div>

        <form onSubmit={handleChatSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask Copilot about this item or prompt changes..."
            className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]"
          />
          <button
            type="submit"
            disabled={!chatInput.trim()}
            className="p-2 rounded-xl bg-[#111111] text-white hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
