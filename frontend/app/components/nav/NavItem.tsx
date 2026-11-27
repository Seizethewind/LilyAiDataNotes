import { NavLink } from "react-router";
import type { NavItemData } from "~/components/nav/navItems";
import "./NavItem.css";

export function NavItem({ item }: { item: NavItemData }) {
  if (!item.enabled) {
    return (
      <span className="nav-item nav-item--soon" aria-disabled="true">
        {item.label}
        <span className="nav-item__badge">Soon</span>
      </span>
    );
  }
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => (isActive ? "nav-item nav-item--active" : "nav-item")}
    >
      {item.label}
    </NavLink>
  );
}
