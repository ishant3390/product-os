import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProductOS — Autonomous AI-Native Workspace for Product Managers",
  description: "Cal.com-inspired executive operating cockpit featuring a continuous Action Inbox, multi-product scoping, living canvas artifacts, and a centered conversational AI Copilot.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen max-h-screen flex flex-col antialiased overflow-hidden bg-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
