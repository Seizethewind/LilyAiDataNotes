import { index, route } from "@react-router/dev/routes";
import type { RouteConfig } from "@react-router/dev/routes";

// Routes are listed here, so other files in app/routes/ are not served.
export default [
  index("routes/_index.tsx"),
  route("notes", "routes/notes.tsx"),
  route("notes/:noteId", "routes/notes.$noteId.tsx"),
  route("trash", "routes/trash.tsx"),
] satisfies RouteConfig;
