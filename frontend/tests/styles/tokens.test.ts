import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { contrastRatio } from "../helpers/contrastRatio";
import { parseCssVariables } from "../helpers/parseCssVariables";

const css = readFileSync(resolve(process.cwd(), "app/styles/tokens.css"), "utf8");
const themes = {
  light: parseCssVariables(css, ":root"),
  dark: parseCssVariables(css, ':root[data-theme="dark"]'),
};

const colorKeys = (vars: Record<string, string>) =>
  Object.keys(vars).filter((key) => key.startsWith("--color-")).sort();

const pairs: [string, string][] = [
  ["--color-text", "--color-bg"],
  ["--color-text", "--color-panel"],
  ["--color-text", "--color-sunk"],
  ["--color-muted", "--color-bg"],
  ["--color-muted", "--color-panel"],
  ["--color-muted", "--color-sunk"],
  ["--color-accent-text", "--color-accent-soft"],
  ["--color-accent-text", "--color-panel"],
  ["--color-btn-text", "--color-btn-bg"],
  ["--color-ok-text", "--color-ok-bg"],
  ["--color-draft-text", "--color-draft-bg"],
  ["--color-bad-text", "--color-bad-bg"],
  ["--color-old-text", "--color-old-bg"],
  ["--color-accent", "--color-bg"],
];

describe("design tokens", () => {
  it("dark theme defines the same colors as light", () => {
    expect(colorKeys(themes.dark)).toEqual(colorKeys(themes.light));
  });

  for (const [name, vars] of Object.entries(themes)) {
    it(`${name} colors are 6-digit hex`, () => {
      for (const key of colorKeys(vars)) {
        expect(vars[key], key).toMatch(/^#[0-9a-fA-F]{6}$/);
      }
    });

    it.each(pairs)(`${name}: %s on %s has contrast of at least 4.5`, (fg, bg) => {
      expect(contrastRatio(vars[fg], vars[bg])).toBeGreaterThanOrEqual(4.5);
    });
  }
});
