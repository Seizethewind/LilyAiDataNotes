import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { listCssFiles } from "../helpers/listCssFiles";
import { parseCssVariables } from "../helpers/parseCssVariables";

const stylesDir = resolve(process.cwd(), "app");
const tokensPath = resolve(stylesDir, "styles/tokens.css");
const tokens = readFileSync(tokensPath, "utf8");
const defined = new Set([
  ...Object.keys(parseCssVariables(tokens, ":root")),
  ...Object.keys(parseCssVariables(tokens, ':root[data-theme="dark"]')),
]);

const files = listCssFiles(stylesDir).filter((file) => file !== tokensPath);

describe("token usage", () => {
  it.each(files)("%s only uses defined tokens", (file) => {
    const used = [...readFileSync(file, "utf8").matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]);
    for (const name of used) {
      expect(defined.has(name), `${name} is not defined in tokens.css`).toBe(true);
    }
  });
});
