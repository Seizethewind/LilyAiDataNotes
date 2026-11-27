import type { ReactNode } from "react";
import { MobileTabBar } from "~/components/nav/MobileTabBar";
import { Sidebar } from "~/components/nav/Sidebar";
import { ThemeToggle } from "~/components/nav/ThemeToggle";
import "./AppShell.css";

// Wide screens: sidebar plus content. Phones: top bar, content, bottom tab bar.
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__body">
        <header className="app-shell__topbar">
          <span className="app-shell__brand">LilyAiDataNotes</span>
          <ThemeToggle />
        </header>
        <main className="app-shell__main">{children}</main>
      </div>
      <MobileTabBar />
    </div>
  );
}
