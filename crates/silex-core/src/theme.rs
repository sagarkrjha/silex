use serde::{Deserialize, Serialize};

/// Mode of the theme: Light or Dark
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum ThemeMode {
    Light,
    Dark,
}

/// Human-designed, organic color palette with balanced contrast.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ThemeTokens {
    pub name: String,
    pub mode: ThemeMode,
    pub background: String,
    pub foreground: String,
    pub card: String,
    pub card_foreground: String,
    pub popover: String,
    pub popover_foreground: String,
    pub primary: String,
    pub primary_foreground: String,
    pub secondary: String,
    pub secondary_foreground: String,
    pub muted: String,
    pub muted_foreground: String,
    pub accent: String,
    pub accent_foreground: String,
    pub destructive: String,
    pub destructive_foreground: String,
    pub border: String,
    pub input: String,
    pub ring: String,
    pub radius: String,
}

impl ThemeTokens {
    /// Zinc Dark Theme (Clean, industrial monochrome with high editorial contrast)
    pub fn zinc_dark() -> Self {
        Self {
            name: "Zinc Dark".into(),
            mode: ThemeMode::Dark,
            background: "#09090b".into(),
            foreground: "#fafafa".into(),
            card: "#121215".into(),
            card_foreground: "#fafafa".into(),
            popover: "#121215".into(),
            popover_foreground: "#fafafa".into(),
            primary: "#fafafa".into(),
            primary_foreground: "#18181b".into(),
            secondary: "#27272a".into(),
            secondary_foreground: "#fafafa".into(),
            muted: "#27272a".into(),
            muted_foreground: "#a1a1aa".into(),
            accent: "#27272a".into(),
            accent_foreground: "#fafafa".into(),
            destructive: "#7f1d1d".into(),
            destructive_foreground: "#fafafa".into(),
            border: "#27272a".into(),
            input: "#27272a".into(),
            ring: "#d4d4d8".into(),
            radius: "0.5rem".into(),
        }
    }

    /// Zinc Light Theme (Crisp, clean white paper canvas with charcoal contrast)
    pub fn zinc_light() -> Self {
        Self {
            name: "Zinc Light".into(),
            mode: ThemeMode::Light,
            background: "#ffffff".into(),
            foreground: "#09090b".into(),
            card: "#ffffff".into(),
            card_foreground: "#09090b".into(),
            popover: "#ffffff".into(),
            popover_foreground: "#09090b".into(),
            primary: "#18181b".into(),
            primary_foreground: "#fafafa".into(),
            secondary: "#f4f4f5".into(),
            secondary_foreground: "#18181b".into(),
            muted: "#f4f4f5".into(),
            muted_foreground: "#71717a".into(),
            accent: "#f4f4f5".into(),
            accent_foreground: "#18181b".into(),
            destructive: "#ef4444".into(),
            destructive_foreground: "#fafafa".into(),
            border: "#e4e4e7".into(),
            input: "#e4e4e7".into(),
            ring: "#18181b".into(),
            radius: "0.5rem".into(),
        }
    }

    /// Slate Dark Theme (Subtle cool stone tone with balanced warmth)
    pub fn slate_dark() -> Self {
        Self {
            name: "Slate Dark".into(),
            mode: ThemeMode::Dark,
            background: "#020817".into(),
            foreground: "#f8fafc".into(),
            card: "#0f172a".into(),
            card_foreground: "#f8fafc".into(),
            popover: "#0f172a".into(),
            popover_foreground: "#f8fafc".into(),
            primary: "#38bdf8".into(),
            primary_foreground: "#020817".into(),
            secondary: "#1e293b".into(),
            secondary_foreground: "#f8fafc".into(),
            muted: "#1e293b".into(),
            muted_foreground: "#94a3b8".into(),
            accent: "#1e293b".into(),
            accent_foreground: "#f8fafc".into(),
            destructive: "#ef4444".into(),
            destructive_foreground: "#f8fafc".into(),
            border: "#1e293b".into(),
            input: "#1e293b".into(),
            ring: "#38bdf8".into(),
            radius: "0.5rem".into(),
        }
    }

    /// Slate Light Theme
    pub fn slate_light() -> Self {
        Self {
            name: "Slate Light".into(),
            mode: ThemeMode::Light,
            background: "#f8fafc".into(),
            foreground: "#0f172a".into(),
            card: "#ffffff".into(),
            card_foreground: "#0f172a".into(),
            popover: "#ffffff".into(),
            popover_foreground: "#0f172a".into(),
            primary: "#0284c7".into(),
            primary_foreground: "#ffffff".into(),
            secondary: "#f1f5f9".into(),
            secondary_foreground: "#0f172a".into(),
            muted: "#f1f5f9".into(),
            muted_foreground: "#64748b".into(),
            accent: "#f1f5f9".into(),
            accent_foreground: "#0f172a".into(),
            destructive: "#dc2626".into(),
            destructive_foreground: "#ffffff".into(),
            border: "#e2e8f0".into(),
            input: "#e2e8f0".into(),
            ring: "#0284c7".into(),
            radius: "0.5rem".into(),
        }
    }

    /// Warm Stone Dark Theme (Earthy, tactile editorial palette)
    pub fn stone_dark() -> Self {
        Self {
            name: "Stone Dark".into(),
            mode: ThemeMode::Dark,
            background: "#0c0a09".into(),
            foreground: "#fafaf9".into(),
            card: "#1c1917".into(),
            card_foreground: "#fafaf9".into(),
            popover: "#1c1917".into(),
            popover_foreground: "#fafaf9".into(),
            primary: "#d97706".into(),
            primary_foreground: "#0c0a09".into(),
            secondary: "#292524".into(),
            secondary_foreground: "#fafaf9".into(),
            muted: "#292524".into(),
            muted_foreground: "#a8a29e".into(),
            accent: "#292524".into(),
            accent_foreground: "#fafaf9".into(),
            destructive: "#b91c1c".into(),
            destructive_foreground: "#fafaf9".into(),
            border: "#292524".into(),
            input: "#292524".into(),
            ring: "#d97706".into(),
            radius: "0.625rem".into(),
        }
    }

    /// Warm Stone Light Theme
    pub fn stone_light() -> Self {
        Self {
            name: "Stone Light".into(),
            mode: ThemeMode::Light,
            background: "#fafaf9".into(),
            foreground: "#1c1917".into(),
            card: "#ffffff".into(),
            card_foreground: "#1c1917".into(),
            popover: "#ffffff".into(),
            popover_foreground: "#1c1917".into(),
            primary: "#b45309".into(),
            primary_foreground: "#ffffff".into(),
            secondary: "#f5f5f4".into(),
            secondary_foreground: "#1c1917".into(),
            muted: "#f5f5f4".into(),
            muted_foreground: "#78716c".into(),
            accent: "#f5f5f4".into(),
            accent_foreground: "#1c1917".into(),
            destructive: "#dc2626".into(),
            destructive_foreground: "#ffffff".into(),
            border: "#e7e5e4".into(),
            input: "#e7e5e4".into(),
            ring: "#b45309".into(),
            radius: "0.625rem".into(),
        }
    }

    /// Sanitizes CSS value to prevent CSS injection attacks.
    fn sanitize_css_value(val: &str) -> String {
        val.chars()
            .filter(|c| c.is_alphanumeric() || matches!(c, '#' | '.' | '-' | '%' | ' ' | '(' | ')'))
            .collect()
    }

    /// Generates modern CSS variable definitions for the theme.
    pub fn to_css_variables(&self) -> String {
        let selector = match self.mode {
            ThemeMode::Light => ":root",
            ThemeMode::Dark => ".dark",
        };

        format!(
            "{selector} {{\n  --background: {bg};\n  --foreground: {fg};\n  --card: {card};\n  --card-foreground: {card_fg};\n  --popover: {pop};\n  --popover-foreground: {pop_fg};\n  --primary: {pri};\n  --primary-foreground: {pri_fg};\n  --secondary: {sec};\n  --secondary-foreground: {sec_fg};\n  --muted: {mut_};\n  --muted-foreground: {mut_fg};\n  --accent: {acc};\n  --accent-foreground: {acc_fg};\n  --destructive: {des};\n  --destructive-foreground: {des_fg};\n  --border: {bor};\n  --input: {inp};\n  --ring: {rin};\n  --radius: {rad};\n}}",
            selector = selector,
            bg = Self::sanitize_css_value(&self.background),
            fg = Self::sanitize_css_value(&self.foreground),
            card = Self::sanitize_css_value(&self.card),
            card_fg = Self::sanitize_css_value(&self.card_foreground),
            pop = Self::sanitize_css_value(&self.popover),
            pop_fg = Self::sanitize_css_value(&self.popover_foreground),
            pri = Self::sanitize_css_value(&self.primary),
            pri_fg = Self::sanitize_css_value(&self.primary_foreground),
            sec = Self::sanitize_css_value(&self.secondary),
            sec_fg = Self::sanitize_css_value(&self.secondary_foreground),
            mut_ = Self::sanitize_css_value(&self.muted),
            mut_fg = Self::sanitize_css_value(&self.muted_foreground),
            acc = Self::sanitize_css_value(&self.accent),
            acc_fg = Self::sanitize_css_value(&self.accent_foreground),
            des = Self::sanitize_css_value(&self.destructive),
            des_fg = Self::sanitize_css_value(&self.destructive_foreground),
            bor = Self::sanitize_css_value(&self.border),
            inp = Self::sanitize_css_value(&self.input),
            rin = Self::sanitize_css_value(&self.ring),
            rad = Self::sanitize_css_value(&self.radius),
        )
    }
}

impl Default for ThemeTokens {
    fn default() -> Self {
        Self::zinc_dark()
    }
}
