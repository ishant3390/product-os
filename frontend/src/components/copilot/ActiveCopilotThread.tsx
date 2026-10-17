"use client";

import React, { useState, useRef, useEffect } from "react";
import { Message } from "@/hooks/useAgentStream";
import { 
  Sparkles, 
  ArrowUp, 
  RotateCcw, 
  ExternalLink, 
  FileText, 
  Layers, 
  Smartphone,
  CheckCircle2 
} from "lucide-react";

interface ActiveCopilotThreadProps {
  messages: Message[];
  isStreaming: boolean;
  onSendMessage: (text: string) => void;
  onClear: () => void;
}

export const ActiveCopilotThread: React.FC<ActiveCopilotThreadProps> = ({
  messages,
  isStreaming,
  onSendMessage,
  onClear,
}) => {
  const [input, setInput] = useState("");
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    onSendMessage(input);
    setInput("");
  };

  const handleActionClick = (label: string, action: string) => {
    setActionNotice(`Executing: ${label}...`);
    setTimeout(() => {
      setActionNotice(`✓ Completed: ${label}`);
      setTimeout(() => setActionNotice(null), 3000);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-white">
      {/* Header bar */}
      <div className="h-12 px-6 border-b border-gray-200 flex items-center justify-between shrink-0 bg-white select-none">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#111111]" />
          <span className="text-xs font-semibold text-[#111111]">AI Chat Copilot</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
            Live Streaming
          </span>
        </div>

        <button
          onClick={onClear}
          className="text-xs text-gray-500 hover:text-black flex items-center space-x-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Thread</span>
        </button>
      </div>

      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 text-xs font-medium text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            {/* Role Header */}
            <div className="flex items-center space-x-1.5 mb-1 text-[11px] text-gray-400">
              <span className="font-semibold text-gray-600">
                {msg.role === "user" ? "You" : "ProductOS Copilot"}
              </span>
              <span>&bull;</span>
              <span>{msg.timestamp}</span>
            </div>

            {/* Bubble */}
            <div
              className={`max-w-2xl text-xs leading-relaxed p-4 rounded-2xl whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[#111111] text-white rounded-br-xs"
                  : "bg-gray-50 border border-gray-200 text-[#111111] rounded-bl-xs shadow-2xs"
              }`}
            >
              {msg.content || (isStreaming ? "Thinking..." : "")}

              {/* Citations */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200/60">
                  <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Verified Grounding Sources:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.citations.map((c, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center space-x-1 text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md text-gray-700 shadow-3xs"
                      >
                        <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
                        <span>{c.source}</span>
                        <span className="font-mono text-gray-400">({c.ref})</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-gray-200/60 flex flex-wrap gap-2">
                  {msg.actions.map((act, i) => (
                    <button
                      key={i}
                      onClick={() => handleActionClick(act.label, act.action)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-gray-300 hover:border-black text-[11px] font-medium text-[#111111] shadow-2xs transition-all hover:bg-gray-50"
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Docked Bottom Chat Input */}
      <div className="p-4 border-t border-gray-200 bg-white shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask follow-up questions, request changes, or create ServiceNow stories..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] bg-gray-50/50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className={`p-2.5 rounded-xl transition-all ${
              input.trim() && !isStreaming
                ? "bg-[#111111] text-white hover:bg-black"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
