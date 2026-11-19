use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

/// Visual variant options for Card containers.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CardVariant {
    Default,
    Primary,
    Secondary,
    Destructive,
    Outline,
}

/// Hover interaction styles for cards.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CardHover {
    None,
    Scale,
    Border,
    Shadow,
}

/// Card container property configuration and class computation.
///
/// # Example
/// ```rust
/// use silex_ui_core::{CardProps, CardVariant, CardHover};
///
/// let card = CardProps::new(CardVariant::Default, CardHover::Scale);
/// let classes = card.compute_classes();
/// assert!(classes.contains("rounded-xl"));
/// ```
#[wasm_bindgen]
pub struct CardProps {
    variant: CardVariant,
    hover: CardHover,
}

#[wasm_bindgen]
impl CardProps {
    /// Creates a new `CardProps` instance.
    #[wasm_bindgen(constructor)]
    pub fn new(variant: CardVariant, hover: CardHover) -> CardProps {
        CardProps { variant, hover }
    }

    /// Computes the Tailwind CSS v4 class string.
    pub fn compute_classes(&self) -> String {
        let base = "rounded-xl border bg-card text-card-foreground shadow-sm transition-all";
        let variant_cls = match self.variant {
            CardVariant::Default => "border-border",
            CardVariant::Primary => "border-primary/40 bg-primary/5",
            CardVariant::Secondary => "border-secondary bg-secondary/50",
            CardVariant::Destructive => "border-destructive/30 bg-destructive/10 text-destructive",
            CardVariant::Outline => "border-border bg-transparent",
        };
        let hover_cls = match self.hover {
            CardHover::None => "",
            CardHover::Scale => "hover:scale-[1.02] hover:shadow-md",
            CardHover::Border => "hover:border-primary/60",
            CardHover::Shadow => "hover:shadow-lg",
        };
        format!("{} {} {}", base, variant_cls, hover_cls).trim().to_string()
    }

    /// Generates code example and documentation preview snippet.
    pub fn doc_preview() -> String {
        r#"<!-- Silex Card Preview -->
<div class="rounded-xl border border-border bg-card p-6 shadow-sm max-w-sm space-y-3">
  <div class="flex items-center justify-between">
    <h3 class="font-semibold text-lg text-card-foreground">Deployment Status</h3>
    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">Live</span>
  </div>
  <p class="text-sm text-muted-foreground">Production build successfully dispatched to global edge nodes.</p>
  <div class="pt-2 flex justify-between items-center text-xs text-muted-foreground border-t border-border">
    <span>Region: us-east-1</span>
    <span class="font-mono">42ms latency</span>
  </div>
</div>"#.into()
    }
}
