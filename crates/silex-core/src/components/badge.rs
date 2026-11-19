use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

/// Visual variant options for Badge indicators.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum BadgeVariant {
    Default,
    Primary,
    Secondary,
    Destructive,
    Success,
    Warning,
    Outline,
}

/// Badge component configuration and styling evaluator.
///
/// # Example
/// ```rust
/// use silex_ui_core::{BadgeProps, BadgeVariant};
///
/// let badge = BadgeProps::new(BadgeVariant::Primary);
/// let classes = badge.compute_classes();
/// assert!(classes.contains("rounded-full"));
/// ```
#[wasm_bindgen]
pub struct BadgeProps {
    variant: BadgeVariant,
    removable: bool,
}

#[wasm_bindgen]
impl BadgeProps {
    /// Creates a new `BadgeProps` instance.
    #[wasm_bindgen(constructor)]
    pub fn new(variant: BadgeVariant) -> BadgeProps {
        BadgeProps {
            variant,
            removable: false,
        }
    }

    /// Sets whether the badge shows a removable icon.
    pub fn set_removable(&mut self, removable: bool) {
        self.removable = removable;
    }

    /// Computes the Tailwind CSS v4 class string.
    pub fn compute_classes(&self) -> String {
        let base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
        let variant_cls = match self.variant {
            BadgeVariant::Default => "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            BadgeVariant::Primary => "border-transparent bg-blue-600 text-white hover:bg-blue-500",
            BadgeVariant::Secondary => "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            BadgeVariant::Destructive => "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            BadgeVariant::Success => "border-transparent bg-emerald-600 text-white hover:bg-emerald-500",
            BadgeVariant::Warning => "border-transparent bg-amber-600 text-white hover:bg-amber-500",
            BadgeVariant::Outline => "text-foreground border-border",
        };
        format!("{} {}", base, variant_cls)
    }

    /// Generates code example and documentation preview snippet.
    pub fn doc_preview() -> String {
        r#"<!-- Silex Badge Preview -->
<div class="flex flex-wrap gap-2 items-center">
  <span class="inline-flex items-center rounded-full border border-transparent bg-primary text-primary-foreground px-2.5 py-0.5 text-xs font-semibold">Primary</span>
  <span class="inline-flex items-center rounded-full border border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">Secondary</span>
  <span class="inline-flex items-center rounded-full border border-border text-foreground px-2.5 py-0.5 text-xs font-semibold">Outline</span>
  <span class="inline-flex items-center rounded-full border border-transparent bg-destructive text-destructive-foreground px-2.5 py-0.5 text-xs font-semibold">Destructive</span>
</div>"#.into()
    }
}
