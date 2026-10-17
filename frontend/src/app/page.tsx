"use client";

import React, { useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useAgentStream } from "@/hooks/useAgentStream";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { ActionInbox } from "@/components/inbox/ActionInbox";
import { CenteredCopilotHero } from "@/components/copilot/CenteredCopilotHero";
import { ActiveCopilotThread } from "@/components/copilot/ActiveCopilotThread";
import { CardDetailsView } from "@/components/details/CardDetailsView";
import { ConnectorsModal } from "@/components/connectors/ConnectorsModal";
import { AgentControlDrawer } from "@/components/agents/AgentControlDrawer";

export default function WorkspacePage() {
  const { 
    currentScope, 
    viewMode, 
    setViewMode, 
    fetchScopes, 
    fetchActions, 
    fetchConnectors 
  } = useWorkspaceStore();

  const { messages, isStreaming, sendMessage, clearMessages } = useAgentStream();

  useEffect(() => {
    fetchScopes();
    fetchActions();
    fetchConnectors();
  }, [fetchScopes, fetchActions, fetchConnectors]);

  const handleHeroSendMessage = (text: string) => {
    setViewMode("copilot-active");
    sendMessage(text, currentScope);
  };

  const handleCardSendMessage = (text: string, cardId: string) => {
    setViewMode("copilot-active");
    sendMessage(text, currentScope, cardId);
  };

  const handleClearThread = () => {
    clearMessages();
    setViewMode("copilot-center");
  };

  return (
    <div className="h-screen max-h-screen flex flex-col antialiased overflow-hidden bg-[#fafafa]">
      {/* Top Navbar (64px) */}
      <TopNavbar />

      {/* Main Two-Pane Cockpit Area */}
      <main className="flex-1 flex overflow-hidden min-h-0 h-[calc(100vh-4rem)]">
        {/* Left Pane: Dedicated Continuous Action Inbox */}
        <ActionInbox />

        {/* Right Pane: Dual-State Living Canvas / Copilot */}
        <section className="flex-1 flex flex-col min-w-0 bg-white h-full overflow-hidden">
          {viewMode === "card-details" ? (
            <CardDetailsView onSendMessage={handleCardSendMessage} />
          ) : viewMode === "copilot-active" || messages.length > 0 ? (
            <ActiveCopilotThread
              messages={messages}
              isStreaming={isStreaming}
              onSendMessage={(txt) => sendMessage(txt, currentScope)}
              onClear={handleClearThread}
            />
          ) : (
            <CenteredCopilotHero
              onSendMessage={handleHeroSendMessage}
              isStreaming={isStreaming}
            />
          )}
        </section>
      </main>

      {/* Overlays / Modals */}
      <ConnectorsModal />
      <AgentControlDrawer />
    </div>
  );
}
