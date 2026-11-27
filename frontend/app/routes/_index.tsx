import { redirect } from "react-router";

// The home page is the notes list.
export function loader() {
  return redirect("/notes");
}
