use wasm_bindgen::prelude::*;

/// Checkbox component state management.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::checkbox::CheckboxState;
///
/// let mut cb = CheckboxState::new(false);
/// cb.toggle();
/// assert!(cb.is_checked());
/// ```
#[wasm_bindgen]
pub struct CheckboxState {
    checked: bool,
    disabled: bool,
}

#[wasm_bindgen]
impl CheckboxState {
    #[wasm_bindgen(constructor)]
    pub fn new(checked: bool) -> CheckboxState {
        CheckboxState {
            checked,
            disabled: false,
        }
    }

    pub fn toggle(&mut self) -> bool {
        if !self.disabled {
            self.checked = !self.checked;
        }
        self.checked
    }

    pub fn is_checked(&self) -> bool {
        self.checked
    }

    pub fn set_disabled(&mut self, disabled: bool) {
        self.disabled = disabled;
    }

    pub fn is_disabled(&self) -> bool {
        self.disabled
    }

    pub fn compute_classes(&self) -> String {
        let base = "peer h-4 w-4 shrink-0 rounded-sm border border-zinc-300 dark:border-zinc-700 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors";
        let state = if self.disabled {
            "cursor-not-allowed opacity-50"
        } else if self.checked {
            "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
        } else {
            "bg-transparent"
        };
        format!("{} {}", base, state)
    }
}
