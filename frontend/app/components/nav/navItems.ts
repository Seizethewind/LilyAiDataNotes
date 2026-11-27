export interface NavItemData {
  label: string;
  to: string;
  // false shows the item as "Soon" and does not link anywhere.
  enabled: boolean;
}

export const NAV_ITEMS: NavItemData[] = [
  { label: "Notes", to: "/notes", enabled: true },
  { label: "Topics", to: "/topics", enabled: false },
  { label: "Graph", to: "/graph", enabled: false },
  { label: "Trash", to: "/trash", enabled: true },
  { label: "Settings", to: "/settings", enabled: false },
];
