/**
 * Silex UI - Design tokens and theme engine
 */

export type ThemeMode = "light" | "dark";

export interface ColorToken {
  name: string;
  hex: string;
}

export interface SilexTheme {
  name: string;
  mode: ThemeMode;
  background: string;
  surface: string;
  primary: string;
  border: string;
  text: string;
  muted: string;
}

export const themes: Record<string, SilexTheme> = {
  // Dark Themes
  obsidian_dark: {
    name: "Obsidian Dark",
    mode: "dark",
    background: "#0d0f12",
    surface: "#161a1f",
    primary: "#d4a373",
    border: "#262c35",
    text: "#f4f4f5",
    muted: "#8892b0",
  },
  slate_dark: {
    name: "Slate Dark",
    mode: "dark",
    background: "#020817",
    surface: "#0f172a",
    primary: "#38bdf8",
    border: "#1e293b",
    text: "#f8fafc",
    muted: "#94a3b8",
  },
  zinc_dark: {
    name: "Zinc Dark",
    mode: "dark",
    background: "#09090b",
    surface: "#121215",
    primary: "#fafafa",
    border: "#27272a",
    text: "#fafafa",
    muted: "#a1a1aa",
  },
  stone_dark: {
    name: "Stone Dark",
    mode: "dark",
    background: "#0c0a09",
    surface: "#1c1917",
    primary: "#d97706",
    border: "#292524",
    text: "#fafaf9",
    muted: "#a8a29e",
  },

  // Light Themes
  pumice_light: {
    name: "Pumice Light",
    mode: "light",
    background: "#faf9f6",
    surface: "#f0eee9",
    primary: "#c87d55",
    border: "#dedad1",
    text: "#1c1917",
    muted: "#78716c",
  },
  slate_light: {
    name: "Slate Light",
    mode: "light",
    background: "#f8fafc",
    surface: "#ffffff",
    primary: "#0284c7",
    border: "#e2e8f0",
    text: "#0f172a",
    muted: "#64748b",
  },
  zinc_light: {
    name: "Zinc Light",
    mode: "light",
    background: "#ffffff",
    surface: "#ffffff",
    primary: "#18181b",
    border: "#e4e4e7",
    text: "#09090b",
    muted: "#71717a",
  },
  stone_light: {
    name: "Stone Light",
    mode: "light",
    background: "#fafaf9",
    surface: "#ffffff",
    primary: "#b45309",
    border: "#e7e5e4",
    text: "#1c1917",
    muted: "#78716c",
  },
};

export const components = [
  "button",
  "card",
  "dialog",
  "sheet",
  "switch",
  "badge",
  "input",
  "alert",
  "separator",
  "accordion",
] as const;

export type ComponentName = typeof components[number];

/**
 * Calculates WCAG 2.1 relative luminance
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates WCAG contrast ratio between two hex colors
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const parseHex = (h: string) => {
    const clean = h.replace("#", "");
    return [
      parseInt(clean.substring(0, 2), 16),
      parseInt(clean.substring(2, 4), 16),
      parseInt(clean.substring(4, 6), 16),
    ];
  };

  const [r1, g1, b1] = parseHex(hex1);
  const [r2, g2, b2] = parseHex(hex2);

  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}
