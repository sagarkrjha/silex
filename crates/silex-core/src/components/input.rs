use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum InputType {
    Text,
    Email,
    Password,
    Number,
}

/// Form Input element configuration and styling evaluator.
///
/// # Example
/// ```rust
/// use silex_ui_core::{InputProps, InputType};
///
/// let input = InputProps::new(InputType::Text);
/// let classes = input.compute_classes();
/// assert!(classes.contains("rounded-md"));
/// ```
#[wasm_bindgen]
pub struct InputProps {
    pub input_type: InputType,
    pub disabled: bool,
}

#[wasm_bindgen]
impl InputProps {
    #[wasm_bindgen(constructor)]
    pub fn new(input_type: InputType) -> InputProps {
        InputProps {
            input_type,
            disabled: false,
        }
    }

    pub fn set_disabled(&mut self, disabled: bool) {
        self.disabled = disabled;
    }

    pub fn compute_classes(&self) -> String {
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground".into()
    }

    pub fn doc_preview() -> String {
        r#"<!-- Silex Input Preview -->
<div class="w-full max-w-sm space-y-2">
  <label class="text-sm font-medium text-foreground">Email Address</label>
  <input type="email" placeholder="name@example.com" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
</div>"#.into()
    }
}
