import { NavItem } from "~/components/nav/NavItem";
import { NAV_ITEMS } from "~/components/nav/navItems";
import "./MobileTabBar.css";

// Phone navigation, fixed to the bottom. Hidden on wide screens, where Sidebar is used.
export function MobileTabBar() {
  return (
    <nav className="mobile-tab-bar" aria-label="Mobile">
      <ul>
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
