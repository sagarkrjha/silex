use wasm_bindgen::prelude::*;

/// Textarea component configuration.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::textarea::TextareaProps;
///
/// let ta = TextareaProps::new(4);
/// let classes = ta.compute_classes();
/// assert!(classes.contains("rounded-md"));
/// ```
#[wasm_bindgen]
pub struct TextareaProps {
    rows: u32,
    resizable: bool,
    disabled: bool,
    error: bool,
}

#[wasm_bindgen]
impl TextareaProps {
    #[wasm_bindgen(constructor)]
    pub fn new(rows: u32) -> TextareaProps {
        TextareaProps {
            rows,
            resizable: true,
            disabled: false,
            error: false,
        }
    }

    pub fn rows(&self) -> u32 {
        self.rows
    }

    pub fn set_resizable(&mut self, resizable: bool) {
        self.resizable = resizable;
    }

    pub fn set_disabled(&mut self, disabled: bool) {
        self.disabled = disabled;
    }

    pub fn set_error(&mut self, error: bool) {
        self.error = error;
    }

    pub fn compute_classes(&self) -> String {
        let base = "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 transition-colors";
        let border = if self.error {
            "border-red-500 focus-visible:ring-red-500"
        } else {
            "border-zinc-300 dark:border-zinc-800 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600"
        };
        let resize = if self.resizable { "resize-y" } else { "resize-none" };
        let disabled_class = if self.disabled { "cursor-not-allowed opacity-50" } else { "" };
        format!("{} {} {} {}", base, border, resize, disabled_class)
    }
}
