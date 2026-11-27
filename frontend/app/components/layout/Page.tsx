import type { ReactNode } from "react";
import { Link } from "react-router";
import "./Page.css";

interface PageProps {
  title?: string;
  description?: string;
  back?: { to: string; label: string };
  children: ReactNode;
}

// The content of one screen: optional back link and heading, then the page itself.
export function Page({ title, description, back, children }: PageProps) {
  return (
    <div className="page">
      {back && (
        <Link to={back.to} className="page__back">
          {back.label}
        </Link>
      )}
      {title && (
        <header>
          <h1 className="page__title">{title}</h1>
          {description && <p className="page__description">{description}</p>}
        </header>
      )}
      {children}
    </div>
  );
}
