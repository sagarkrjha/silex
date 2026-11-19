use serde::{Deserialize, Serialize};

/// Mode of the theme: Light or Dark
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum ThemeMode {
    Light,
    Dark,
}

/// Strongly typed identifiers for all professional & creative Silex themes
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum ThemeId {
    Zinc,
    Slate,
    Stone,
    Nordic,
    RosePine,
    TokyoNight,
    Forest,
    Catppuccin,
}

impl ThemeId {
    pub const ALL: [ThemeId; 8] = [
        ThemeId::Zinc,
        ThemeId::Slate,
        ThemeId::Stone,
        ThemeId::Nordic,
        ThemeId::RosePine,
        ThemeId::TokyoNight,
        ThemeId::Forest,
        ThemeId::Catppuccin,
    ];

    pub fn as_str(&self) -> &'static str {
        match self {
            ThemeId::Zinc => "zinc",
            ThemeId::Slate => "slate",
            ThemeId::Stone => "stone",
            ThemeId::Nordic => "nordic",
            ThemeId::RosePine => "rose-pine",
            ThemeId::TokyoNight => "tokyo-night",
            ThemeId::Forest => "forest",
            ThemeId::Catppuccin => "catppuccin",
        }
    }
}

/// Human-designed, organic color palette with balanced contrast.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ThemeTokens {
    pub id: ThemeId,
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
    // ------------------------------------------------------------------------
    // 1. Zinc (Editorial Monochrome)
    // ------------------------------------------------------------------------
    pub fn zinc_dark() -> Self {
        Self {
            id: ThemeId::Zinc,
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

    pub fn zinc_light() -> Self {
        Self {
            id: ThemeId::Zinc,
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

    // ------------------------------------------------------------------------
    // 2. Slate (Technical Blue-Grey)
    // ------------------------------------------------------------------------
    pub fn slate_dark() -> Self {
        Self {
            id: ThemeId::Slate,
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

    pub fn slate_light() -> Self {
        Self {
            id: ThemeId::Slate,
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

    // ------------------------------------------------------------------------
    // 3. Warm Stone (Tactile & Organic)
    // ------------------------------------------------------------------------
    pub fn stone_dark() -> Self {
        Self {
            id: ThemeId::Stone,
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

    pub fn stone_light() -> Self {
        Self {
            id: ThemeId::Stone,
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

    // ------------------------------------------------------------------------
    // 4. Nordic Frost (Arctic Navy & Ice Blue)
    // ------------------------------------------------------------------------
    pub fn nordic_dark() -> Self {
        Self {
            id: ThemeId::Nordic,
            name: "Nordic Dark".into(),
            mode: ThemeMode::Dark,
            background: "#1e222a".into(),
            foreground: "#eceff4".into(),
            card: "#242933".into(),
            card_foreground: "#eceff4".into(),
            popover: "#242933".into(),
            popover_foreground: "#eceff4".into(),
            primary: "#88c0d0".into(),
            primary_foreground: "#1e222a".into(),
            secondary: "#2e3440".into(),
            secondary_foreground: "#eceff4".into(),
            muted: "#2e3440".into(),
            muted_foreground: "#d8dee9".into(),
            accent: "#3b4252".into(),
            accent_foreground: "#88c0d0".into(),
            destructive: "#bf616a".into(),
            destructive_foreground: "#eceff4".into(),
            border: "#3b4252".into(),
            input: "#3b4252".into(),
            ring: "#88c0d0".into(),
            radius: "0.5rem".into(),
        }
    }

    pub fn nordic_light() -> Self {
        Self {
            id: ThemeId::Nordic,
            name: "Nordic Light".into(),
            mode: ThemeMode::Light,
            background: "#f4f6fb".into(),
            foreground: "#2e3440".into(),
            card: "#ffffff".into(),
            card_foreground: "#2e3440".into(),
            popover: "#ffffff".into(),
            popover_foreground: "#2e3440".into(),
            primary: "#5e81ac".into(),
            primary_foreground: "#ffffff".into(),
            secondary: "#e5e9f0".into(),
            secondary_foreground: "#2e3440".into(),
            muted: "#e5e9f0".into(),
            muted_foreground: "#4c566a".into(),
            accent: "#e5e9f0".into(),
            accent_foreground: "#5e81ac".into(),
            destructive: "#bf616a".into(),
            destructive_foreground: "#ffffff".into(),
            border: "#d8dee9".into(),
            input: "#d8dee9".into(),
            ring: "#5e81ac".into(),
            radius: "0.5rem".into(),
        }
    }

    // ------------------------------------------------------------------------
    // 5. Rose Pine (Warm Velvet & Twilight)
    // ------------------------------------------------------------------------
    pub fn rose_pine_dark() -> Self {
        Self {
            id: ThemeId::RosePine,
            name: "Rose Pine Dark".into(),
            mode: ThemeMode::Dark,
            background: "#191724".into(),
            foreground: "#e0def4".into(),
            card: "#1f1d2e".into(),
            card_foreground: "#e0def4".into(),
            popover: "#1f1d2e".into(),
            popover_foreground: "#e0def4".into(),
            primary: "#eb6f92".into(),
            primary_foreground: "#191724".into(),
            secondary: "#26233a".into(),
            secondary_foreground: "#e0def4".into(),
            muted: "#26233a".into(),
            muted_foreground: "#908caa".into(),
            accent: "#2a283e".into(),
            accent_foreground: "#f6c177".into(),
            destructive: "#eb6f92".into(),
            destructive_foreground: "#191724".into(),
            border: "#26233a".into(),
            input: "#26233a".into(),
            ring: "#eb6f92".into(),
            radius: "0.5rem".into(),
        }
    }

    pub fn rose_pine_light() -> Self {
        Self {
            id: ThemeId::RosePine,
            name: "Rose Pine Light".into(),
            mode: ThemeMode::Light,
            background: "#faf4ed".into(),
            foreground: "#575279".into(),
            card: "#ffffff".into(),
            card_foreground: "#575279".into(),
            popover: "#ffffff".into(),
            popover_foreground: "#575279".into(),
            primary: "#b4637a".into(),
            primary_foreground: "#ffffff".into(),
            secondary: "#f2e9de".into(),
            secondary_foreground: "#575279".into(),
            muted: "#f2e9de".into(),
            muted_foreground: "#797593".into(),
            accent: "#f2e9de".into(),
            accent_foreground: "#ea9d34".into(),
            destructive: "#b4637a".into(),
            destructive_foreground: "#ffffff".into(),
            border: "#cecacd".into(),
            input: "#cecacd".into(),
            ring: "#b4637a".into(),
            radius: "0.5rem".into(),
        }
    }

    // ------------------------------------------------------------------------
    // 6. Tokyo Night (Cyber Midnight & Neon)
    // ------------------------------------------------------------------------
    pub fn tokyo_night_dark() -> Self {
        Self {
            id: ThemeId::TokyoNight,
            name: "Tokyo Night Dark".into(),
            mode: ThemeMode::Dark,
            background: "#1a1b26".into(),
            foreground: "#c0caf5".into(),
            card: "#24283b".into(),
            card_foreground: "#c0caf5".into(),
            popover: "#24283b".into(),
            popover_foreground: "#c0caf5".into(),
            primary: "#7aa2f7".into(),
            primary_foreground: "#1a1b26".into(),
            secondary: "#292e42".into(),
            secondary_foreground: "#c0caf5".into(),
            muted: "#292e42".into(),
            muted_foreground: "#7aa2f7".into(),
            accent: "#bb9af7".into(),
            accent_foreground: "#1a1b26".into(),
            destructive: "#f7768e".into(),
            destructive_foreground: "#1a1b26".into(),
            border: "#292e42".into(),
            input: "#292e42".into(),
            ring: "#7aa2f7".into(),
            radius: "0.5rem".into(),
        }
    }

    pub fn tokyo_night_light() -> Self {
        Self {
            id: ThemeId::TokyoNight,
            name: "Tokyo Night Light".into(),
            mode: ThemeMode::Light,
            background: "#e6e7ed".into(),
            foreground: "#343b58".into(),
            card: "#ffffff".into(),
            card_foreground: "#343b58".into(),
            popover: "#ffffff".into(),
            popover_foreground: "#343b58".into(),
            primary: "#2e5cb8".into(),
            primary_foreground: "#ffffff".into(),
            secondary: "#d5d6db".into(),
            secondary_foreground: "#343b58".into(),
            muted: "#d5d6db".into(),
            muted_foreground: "#565a6e".into(),
            accent: "#d5d6db".into(),
            accent_foreground: "#7048a6".into(),
            destructive: "#8c2a38".into(),
            destructive_foreground: "#ffffff".into(),
            border: "#c4c8d4".into(),
            input: "#c4c8d4".into(),
            ring: "#2e5cb8".into(),
            radius: "0.5rem".into(),
        }
    }

    // ------------------------------------------------------------------------
    // 7. Forest Emerald (Organic Pine & Sage)
    // ------------------------------------------------------------------------
    pub fn forest_dark() -> Self {
        Self {
            id: ThemeId::Forest,
            name: "Forest Dark".into(),
            mode: ThemeMode::Dark,
            background: "#0d1814".into(),
            foreground: "#e2ede8".into(),
            card: "#14251e".into(),
            card_foreground: "#e2ede8".into(),
            popover: "#14251e".into(),
            popover_foreground: "#e2ede8".into(),
            primary: "#10b981".into(),
            primary_foreground: "#0d1814".into(),
            secondary: "#1d362c".into(),
            secondary_foreground: "#e2ede8".into(),
            muted: "#1d362c".into(),
            muted_foreground: "#84a99b".into(),
            accent: "#1d362c".into(),
            accent_foreground: "#10b981".into(),
            destructive: "#e11d48".into(),
            destructive_foreground: "#e2ede8".into(),
            border: "#1d362c".into(),
            input: "#1d362c".into(),
            ring: "#10b981".into(),
            radius: "0.5rem".into(),
        }
    }

    pub fn forest_light() -> Self {
        Self {
            id: ThemeId::Forest,
            name: "Forest Light".into(),
            mode: ThemeMode::Light,
            background: "#f4f9f6".into(),
            foreground: "#132a21".into(),
            card: "#ffffff".into(),
            card_foreground: "#132a21".into(),
            popover: "#ffffff".into(),
            popover_foreground: "#132a21".into(),
            primary: "#059669".into(),
            primary_foreground: "#ffffff".into(),
            secondary: "#e1efe7".into(),
            secondary_foreground: "#132a21".into(),
            muted: "#e1efe7".into(),
            muted_foreground: "#4d6b5e".into(),
            accent: "#e1efe7".into(),
            accent_foreground: "#059669".into(),
            destructive: "#dc2626".into(),
            destructive_foreground: "#ffffff".into(),
            border: "#cfe2d7".into(),
            input: "#cfe2d7".into(),
            ring: "#059669".into(),
            radius: "0.5rem".into(),
        }
    }

    // ------------------------------------------------------------------------
    // 8. Catppuccin (Soothing Pastel Palette)
    // ------------------------------------------------------------------------
    pub fn catppuccin_dark() -> Self {
        Self {
            id: ThemeId::Catppuccin,
            name: "Catppuccin Mocha".into(),
            mode: ThemeMode::Dark,
            background: "#1e1e2e".into(),
            foreground: "#cdd6f4".into(),
            card: "#181825".into(),
            card_foreground: "#cdd6f4".into(),
            popover: "#181825".into(),
            popover_foreground: "#cdd6f4".into(),
            primary: "#cba6f7".into(),
            primary_foreground: "#11111b".into(),
            secondary: "#313244".into(),
            secondary_foreground: "#cdd6f4".into(),
            muted: "#313244".into(),
            muted_foreground: "#a6adc8".into(),
            accent: "#89b4fa".into(),
            accent_foreground: "#11111b".into(),
            destructive: "#f38ba8".into(),
            destructive_foreground: "#11111b".into(),
            border: "#313244".into(),
            input: "#313244".into(),
            ring: "#cba6f7".into(),
            radius: "0.5rem".into(),
        }
    }

    pub fn catppuccin_light() -> Self {
        Self {
            id: ThemeId::Catppuccin,
            name: "Catppuccin Latte".into(),
            mode: ThemeMode::Light,
            background: "#eff1f5".into(),
            foreground: "#4c4f69".into(),
            card: "#ffffff".into(),
            card_foreground: "#4c4f69".into(),
            popover: "#ffffff".into(),
            popover_foreground: "#4c4f69".into(),
            primary: "#8839ef".into(),
            primary_foreground: "#ffffff".into(),
            secondary: "#e6e9ef".into(),
            secondary_foreground: "#4c4f69".into(),
            muted: "#e6e9ef".into(),
            muted_foreground: "#7c7f93".into(),
            accent: "#1e66f5".into(),
            accent_foreground: "#ffffff".into(),
            destructive: "#d20f39".into(),
            destructive_foreground: "#ffffff".into(),
            border: "#ccd0da".into(),
            input: "#ccd0da".into(),
            ring: "#8839ef".into(),
            radius: "0.5rem".into(),
        }
    }

    /// Returns a vector of all 16 theme variants (8 themes x 2 modes).
    pub fn all_themes() -> Vec<Self> {
        vec![
            Self::zinc_dark(),
            Self::zinc_light(),
            Self::slate_dark(),
            Self::slate_light(),
            Self::stone_dark(),
            Self::stone_light(),
            Self::nordic_dark(),
            Self::nordic_light(),
            Self::rose_pine_dark(),
            Self::rose_pine_light(),
            Self::tokyo_night_dark(),
            Self::tokyo_night_light(),
            Self::forest_dark(),
            Self::forest_light(),
            Self::catppuccin_dark(),
            Self::catppuccin_light(),
        ]
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
