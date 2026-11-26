import { relativeLuminance } from "./relativeLuminance";

// WCAG contrast ratio between two hex colors, from 1 (none) to 21 (black on white).
export function contrastRatio(foreground: string, background: string): number {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}
