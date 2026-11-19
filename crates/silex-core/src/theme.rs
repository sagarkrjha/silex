use serde::{Deserialize, Serialize};

/// Human-designed, organic color palette with balanced contrast.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ThemeTokens {
    pub name: String,
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
    /// Zinc Theme (Clean, industrial monochrome with high editorial contrast)
    pub fn zinc_dark() -> Self {
        Self {
            name: "Zinc Dark".into(),
            background: "#09090b".into(),
            foreground: "#fafafa".into(),
            card: "#09090b".into(),
            card_foreground: "#fafafa".into(),
            popover: "#09090b".into(),
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

    /// Slate Theme (Subtle cool stone tone with balanced warmth)
    pub fn slate_dark() -> Self {
        Self {
            name: "Slate Dark".into(),
            background: "#020817".into(),
            foreground: "#f8fafc".into(),
            card: "#020817".into(),
            card_foreground: "#f8fafc".into(),
            popover: "#020817".into(),
            popover_foreground: "#f8fafc".into(),
            primary: "#f8fafc".into(),
            primary_foreground: "#0f172a".into(),
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
            ring: "#cbd5e1".into(),
            radius: "0.5rem".into(),
        }
    }

    /// Warm Stone Theme (Earthy, tactile, human-crafted editorial palette)
    pub fn stone_warm() -> Self {
        Self {
            name: "Stone Warm".into(),
            background: "#0c0a09".into(),
            foreground: "#fafaf9".into(),
            card: "#1c1917".into(),
            card_foreground: "#fafaf9".into(),
            popover: "#1c1917".into(),
            popover_foreground: "#fafaf9".into(),
            primary: "#f5f5f4".into(),
            primary_foreground: "#1c1917".into(),
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
            ring: "#d6d3d1".into(),
            radius: "0.625rem".into(),
        }
    }

    /// Generates modern CSS variable definitions for the theme.
    pub fn to_css_variables(&self) -> String {
        format!(
            ":root {{\n  --background: {};\n  --foreground: {};\n  --card: {};\n  --card-foreground: {};\n  --popover: {};\n  --popover-foreground: {};\n  --primary: {};\n  --primary-foreground: {};\n  --secondary: {};\n  --secondary-foreground: {};\n  --muted: {};\n  --muted-foreground: {};\n  --accent: {};\n  --accent-foreground: {};\n  --destructive: {};\n  --destructive-foreground: {};\n  --border: {};\n  --input: {};\n  --ring: {};\n  --radius: {};\n}}",
            self.background, self.foreground, self.card, self.card_foreground,
            self.popover, self.popover_foreground, self.primary, self.primary_foreground,
            self.secondary, self.secondary_foreground, self.muted, self.muted_foreground,
            self.accent, self.accent_foreground, self.destructive, self.destructive_foreground,
            self.border, self.input, self.ring, self.radius
        )
    }
}

impl Default for ThemeTokens {
    fn default() -> Self {
        Self::zinc_dark()
    }
}
