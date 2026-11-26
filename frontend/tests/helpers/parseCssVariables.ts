// Reads the custom properties declared in one CSS rule block.
// The selector must appear exactly as written in the file, followed by " {".
export function parseCssVariables(css: string, selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) {
    throw new Error(`Selector not found in CSS: ${selector}`);
  }
  const block = css.slice(start, css.indexOf("}", start));
  const variables: Record<string, string> = {};
  for (const match of block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    variables[match[1]] = match[2].trim();
  }
  return variables;
}
