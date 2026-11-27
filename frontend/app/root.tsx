import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { AppShell } from "~/components/layout/AppShell";
import { ThemeScript } from "~/components/nav/ThemeScript";
import { ThemeProvider } from "~/context/ThemeProvider";
import "~/styles/tokens.css";
import "~/styles/base.css";
import "~/styles/utilities.css";

// The HTML document. suppressHydrationWarning is needed because ThemeScript sets
// data-theme on <html> before React loads.
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ThemeScript />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell>
        <Outlet />
      </AppShell>
    </ThemeProvider>
  );
}
