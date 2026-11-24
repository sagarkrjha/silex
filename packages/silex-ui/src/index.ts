/**
 * Silex UI - Design tokens and theme engine
 */

export type ThemeMode = "light" | "dark";

export type ThemeKey =
  | "zinc"
  | "slate"
  | "stone"
  | "nordic"
  | "rose-pine"
  | "tokyo-night"
  | "forest"
  | "catppuccin";

export interface ColorToken {
  name: string;
  hex: string;
}

export interface SilexTheme {
  id: ThemeKey;
  name: string;
  mode: ThemeMode;
  background: string;
  surface: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
}

export const themes: Record<string, SilexTheme> = {
  // Dark Themes
  "zinc-dark": {
    id: "zinc",
    name: "Zinc Dark",
    mode: "dark",
    background: "#09090b",
    surface: "#121215",
    primary: "#fafafa",
    primaryForeground: "#18181b",
    secondary: "#27272a",
    secondaryForeground: "#fafafa",
    border: "#27272a",
    text: "#fafafa",
    muted: "#a1a1aa",
    accent: "#f97316",
  },
  "slate-dark": {
    id: "slate",
    name: "Slate Dark",
    mode: "dark",
    background: "#020817",
    surface: "#0f172a",
    primary: "#38bdf8",
    primaryForeground: "#020817",
    secondary: "#1e293b",
    secondaryForeground: "#f8fafc",
    border: "#1e293b",
    text: "#f8fafc",
    muted: "#94a3b8",
    accent: "#38bdf8",
  },
  "stone-dark": {
    id: "stone",
    name: "Stone Dark",
    mode: "dark",
    background: "#0c0a09",
    surface: "#1c1917",
    primary: "#d97706",
    primaryForeground: "#0c0a09",
    secondary: "#292524",
    secondaryForeground: "#fafaf9",
    border: "#292524",
    text: "#fafaf9",
    muted: "#a8a29e",
    accent: "#f59e0b",
  },
  "nordic-dark": {
    id: "nordic",
    name: "Nordic Dark",
    mode: "dark",
    background: "#1e222a",
    surface: "#242933",
    primary: "#88c0d0",
    primaryForeground: "#1e222a",
    secondary: "#2e3440",
    secondaryForeground: "#eceff4",
    border: "#3b4252",
    text: "#eceff4",
    muted: "#d8dee9",
    accent: "#81a1c1",
  },
  "rose-pine-dark": {
    id: "rose-pine",
    name: "Rose Pine Dark",
    mode: "dark",
    background: "#191724",
    surface: "#1f1d2e",
    primary: "#eb6f92",
    primaryForeground: "#191724",
    secondary: "#26233a",
    secondaryForeground: "#e0def4",
    border: "#26233a",
    text: "#e0def4",
    muted: "#908caa",
    accent: "#f6c177",
  },
  "tokyo-night-dark": {
    id: "tokyo-night",
    name: "Tokyo Night Dark",
    mode: "dark",
    background: "#1a1b26",
    surface: "#24283b",
    primary: "#7aa2f7",
    primaryForeground: "#1a1b26",
    secondary: "#292e42",
    secondaryForeground: "#c0caf5",
    border: "#292e42",
    text: "#c0caf5",
    muted: "#7aa2f7",
    accent: "#bb9af7",
  },
  "forest-dark": {
    id: "forest",
    name: "Forest Dark",
    mode: "dark",
    background: "#0d1814",
    surface: "#14251e",
    primary: "#10b981",
    primaryForeground: "#0d1814",
    secondary: "#1d362c",
    secondaryForeground: "#e2ede8",
    border: "#1d362c",
    text: "#e2ede8",
    muted: "#84a99b",
    accent: "#34d399",
  },
  "catppuccin-dark": {
    id: "catppuccin",
    name: "Catppuccin Mocha",
    mode: "dark",
    background: "#1e1e2e",
    surface: "#181825",
    primary: "#cba6f7",
    primaryForeground: "#11111b",
    secondary: "#313244",
    secondaryForeground: "#cdd6f4",
    border: "#313244",
    text: "#cdd6f4",
    muted: "#a6adc8",
    accent: "#89b4fa",
  },

  // Light Themes
  "zinc-light": {
    id: "zinc",
    name: "Zinc Light",
    mode: "light",
    background: "#ffffff",
    surface: "#ffffff",
    primary: "#18181b",
    primaryForeground: "#fafafa",
    secondary: "#f4f4f5",
    secondaryForeground: "#18181b",
    border: "#e4e4e7",
    text: "#09090b",
    muted: "#71717a",
    accent: "#ea580c",
  },
  "slate-light": {
    id: "slate",
    name: "Slate Light",
    mode: "light",
    background: "#f8fafc",
    surface: "#ffffff",
    primary: "#0284c7",
    primaryForeground: "#ffffff",
    secondary: "#f1f5f9",
    secondaryForeground: "#0f172a",
    border: "#e2e8f0",
    text: "#0f172a",
    muted: "#64748b",
    accent: "#0284c7",
  },
  "stone-light": {
    id: "stone",
    name: "Stone Light",
    mode: "light",
    background: "#fafaf9",
    surface: "#ffffff",
    primary: "#b45309",
    primaryForeground: "#ffffff",
    secondary: "#f5f5f4",
    secondaryForeground: "#1c1917",
    border: "#e7e5e4",
    text: "#1c1917",
    muted: "#78716c",
    accent: "#d97706",
  },
  "nordic-light": {
    id: "nordic",
    name: "Nordic Light",
    mode: "light",
    background: "#f4f6fb",
    surface: "#ffffff",
    primary: "#5e81ac",
    primaryForeground: "#ffffff",
    secondary: "#e5e9f0",
    secondaryForeground: "#2e3440",
    border: "#d8dee9",
    text: "#2e3440",
    muted: "#4c566a",
    accent: "#81a1c1",
  },
  "rose-pine-light": {
    id: "rose-pine",
    name: "Rose Pine Light",
    mode: "light",
    background: "#faf4ed",
    surface: "#ffffff",
    primary: "#b4637a",
    primaryForeground: "#ffffff",
    secondary: "#f2e9de",
    secondaryForeground: "#575279",
    border: "#cecacd",
    text: "#575279",
    muted: "#797593",
    accent: "#ea9d34",
  },
  "tokyo-night-light": {
    id: "tokyo-night",
    name: "Tokyo Night Light",
    mode: "light",
    background: "#e6e7ed",
    surface: "#ffffff",
    primary: "#2e5cb8",
    primaryForeground: "#ffffff",
    secondary: "#d5d6db",
    secondaryForeground: "#343b58",
    border: "#c4c8d4",
    text: "#343b58",
    muted: "#565a6e",
    accent: "#7048a6",
  },
  "forest-light": {
    id: "forest",
    name: "Forest Light",
    mode: "light",
    background: "#f4f9f6",
    surface: "#ffffff",
    primary: "#059669",
    primaryForeground: "#ffffff",
    secondary: "#e1efe7",
    secondaryForeground: "#132a21",
    border: "#cfe2d7",
    text: "#132a21",
    muted: "#4d6b5e",
    accent: "#10b981",
  },
  "catppuccin-light": {
    id: "catppuccin",
    name: "Catppuccin Latte",
    mode: "light",
    background: "#eff1f5",
    surface: "#ffffff",
    primary: "#8839ef",
    primaryForeground: "#ffffff",
    secondary: "#e6e9ef",
    secondaryForeground: "#4c4f69",
    border: "#ccd0da",
    text: "#4c4f69",
    muted: "#7c7f93",
    accent: "#1e66f5",
  },
};

export const THEME_LIST = [
  { id: "zinc", name: "Zinc", description: "Industrial monochrome & editorial high contrast" },
  { id: "slate", name: "Slate", description: "Technical blue-grey with modern linear precision" },
  { id: "stone", name: "Warm Stone", description: "Earthy, tactile warmth and human-crafted amber" },
  { id: "nordic", name: "Nordic Frost", description: "Arctic cool navy and crisp ice highlights" },
  { id: "rose-pine", name: "Rose Pine", description: "Velvety muted berry and warm dusk tones" },
  { id: "tokyo-night", name: "Tokyo Night", description: "Midnight indigo with vivid cyber cyan accents" },
  { id: "forest", name: "Forest Emerald", description: "Organic deep pine with soothing moss & sage" },
  { id: "catppuccin", name: "Catppuccin", description: "Soothing pastel tones crafted for focus" },
] as const;

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
  "tooltip",
  "avatar",
  "checkbox",
  "textarea",
  "table",
  "progress",
  "skeleton",
] as const;

export type ComponentName = typeof components[number];

/**
 * Injects CSS variables for a selected Silex theme into the DOM.
 */
export function applyTheme(themeKey: ThemeKey, mode: ThemeMode): SilexTheme {
  const fullKey = `${themeKey}-${mode}`;
  const theme = themes[fullKey] || themes["zinc-dark"];

  if (typeof document !== "undefined") {
    const root = document.documentElement;
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--surface", theme.surface);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-foreground", theme.primaryForeground);
    root.style.setProperty("--secondary", theme.secondary);
    root.style.setProperty("--secondary-foreground", theme.secondaryForeground);
    root.style.setProperty("--border", theme.border);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--muted", theme.muted);
    root.style.setProperty("--accent", theme.accent);
  }

  return theme;
}

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
