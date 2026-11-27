import { NavItem } from "~/components/nav/NavItem";
import { NAV_ITEMS } from "~/components/nav/navItems";
import { ThemeToggle } from "~/components/nav/ThemeToggle";
import "./Sidebar.css";

// Desktop navigation. Hidden on narrow screens, where MobileTabBar takes over.
export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">LilyAiDataNotes</div>
      <nav aria-label="Primary">
        <ul className="sidebar__list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavItem item={item} />
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar__footer">
        <ThemeToggle />
      </div>
    </aside>
  );
}
