use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

/// Button visual variant types.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum ButtonVariant {
    Primary,
    Secondary,
    Outline,
    Ghost,
    Danger,
    Success,
    Warning,
    Info,
    Link,
}

/// Button size options.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum ButtonSize {
    Sm,
    Md,
    Lg,
    Icon,
}

/// Button component property configuration and class evaluator.
///
/// # Example
/// ```rust
/// use silex_ui_core::{ButtonProps, ButtonVariant, ButtonSize};
///
/// let button = ButtonProps::new(ButtonVariant::Primary, ButtonSize::Md);
/// let html = button.render_html("Save Changes");
/// assert!(html.contains("Save Changes"));
/// ```
#[wasm_bindgen]
pub struct ButtonProps {
    variant: ButtonVariant,
    size: ButtonSize,
    is_loading: bool,
    disabled: bool,
}

#[wasm_bindgen]
impl ButtonProps {
    /// Creates a new `ButtonProps` with the specified variant and size.
    #[wasm_bindgen(constructor)]
    pub fn new(variant: ButtonVariant, size: ButtonSize) -> ButtonProps {
        ButtonProps {
            variant,
            size,
            is_loading: false,
            disabled: false,
        }
    }

    /// Sets whether the button is in a loading state.
    pub fn set_loading(&mut self, loading: bool) {
        self.is_loading = loading;
    }

    /// Sets whether the button is disabled.
    pub fn set_disabled(&mut self, disabled: bool) {
        self.disabled = disabled;
    }

    /// Computes the Tailwind CSS v4 class string.
    pub fn compute_classes(&self) -> String {
        let base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";
        let variant_cls = match self.variant {
            ButtonVariant::Primary => "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            ButtonVariant::Secondary => "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ButtonVariant::Outline => "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            ButtonVariant::Ghost => "hover:bg-accent hover:text-accent-foreground",
            ButtonVariant::Danger => "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            ButtonVariant::Success => "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500",
            ButtonVariant::Warning => "bg-amber-600 text-white shadow-sm hover:bg-amber-500",
            ButtonVariant::Info => "bg-sky-600 text-white shadow-sm hover:bg-sky-500",
            ButtonVariant::Link => "text-primary underline-offset-4 hover:underline",
        };
        let size_cls = match self.size {
            ButtonSize::Sm => "h-8 rounded-md px-3 text-xs",
            ButtonSize::Md => "h-9 px-4 py-2",
            ButtonSize::Lg => "h-10 rounded-md px-8",
            ButtonSize::Icon => "h-9 w-9",
        };
        format!("{} {} {}", base, variant_cls, size_cls)
    }

    /// Computes classes merged with developer custom Tailwind classes (responsive & overrides).
    pub fn compute_classes_with_custom(&self, custom_classes: &str) -> String {
        crate::merge_classes(&self.compute_classes(), custom_classes)
    }

    /// Renders semantic HTML representation of the button.
    pub fn render_html(&self, label: &str) -> String {
        let classes = self.compute_classes();
        let disabled_attr = if self.disabled || self.is_loading { " disabled" } else { "" };
        let content = if self.is_loading { "Loading..." } else { label };
        format!("<button class=\"{}\"{}>{}</button>", classes, disabled_attr, content)
    }

    /// Generates code example and documentation metadata for previewing.
    pub fn doc_preview() -> String {
        r#"<!-- Silex Button Preview -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="bg-primary text-primary-foreground h-9 px-4 py-2 rounded-md font-medium">Primary</button>
  <button class="bg-secondary text-secondary-foreground h-9 px-4 py-2 rounded-md font-medium">Secondary</button>
  <button class="border border-input bg-background h-9 px-4 py-2 rounded-md font-medium">Outline</button>
  <button class="bg-destructive text-destructive-foreground h-9 px-4 py-2 rounded-md font-medium">Destructive</button>
</div>"#.into()
    }
}
