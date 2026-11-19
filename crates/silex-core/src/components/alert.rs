use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

/// Contextual Alert variants.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum AlertVariant {
    Default,
    Destructive,
    Success,
    Warning,
    Info,
}

/// Alert banner component configuration and class evaluator.
///
/// # Example
/// ```rust
/// use silex_core::{AlertProps, AlertVariant};
///
/// let alert = AlertProps::new(AlertVariant::Destructive);
/// let classes = alert.compute_classes();
/// assert!(classes.contains("destructive"));
/// ```
#[wasm_bindgen]
pub struct AlertProps {
    variant: AlertVariant,
}

#[wasm_bindgen]
impl AlertProps {
    /// Creates a new `AlertProps` instance.
    #[wasm_bindgen(constructor)]
    pub fn new(variant: AlertVariant) -> AlertProps {
        AlertProps { variant }
    }

    /// Computes the Tailwind CSS v4 class string.
    pub fn compute_classes(&self) -> String {
        let base = "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4";
        let variant_cls = match self.variant {
            AlertVariant::Default => "bg-card text-card-foreground border-border",
            AlertVariant::Destructive => "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
            AlertVariant::Success => "border-emerald-500/50 text-emerald-500 dark:border-emerald-500 [&>svg]:text-emerald-500",
            AlertVariant::Warning => "border-amber-500/50 text-amber-500 dark:border-amber-500 [&>svg]:text-amber-500",
            AlertVariant::Info => "border-sky-500/50 text-sky-500 dark:border-sky-500 [&>svg]:text-sky-500",
        };
        format!("{} {}", base, variant_cls)
    }

    /// Generates code example and documentation preview snippet.
    pub fn doc_preview() -> String {
        r#"<!-- Silex Alert Preview -->
<div class="relative w-full rounded-lg border border-destructive/50 p-4 text-destructive space-y-1">
  <h5 class="font-medium tracking-tight">Security Alert</h5>
  <div class="text-sm opacity-90">An unrecognized login was blocked from IP 192.0.2.1.</div>
</div>"#.into()
    }
}
