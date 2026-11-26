import { readdirSync } from "node:fs";
import { join } from "node:path";

// Every .css file under a directory, as full paths.
export function listCssFiles(directory: string): string[] {
  return readdirSync(directory, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".css"))
    .map((file) => join(directory, file));
}
