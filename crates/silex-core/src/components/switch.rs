use wasm_bindgen::prelude::*;

/// Boolean toggle switch state machine.
///
/// # Example
/// ```rust
/// use silex_ui_core::SwitchState;
///
/// let mut switch = SwitchState::new(false);
/// assert!(!switch.is_checked());
/// switch.toggle();
/// assert!(switch.is_checked());
/// ```
#[wasm_bindgen]
pub struct SwitchState {
    checked: bool,
    disabled: bool,
}

#[wasm_bindgen]
impl SwitchState {
    /// Creates a new `SwitchState`.
    #[wasm_bindgen(constructor)]
    pub fn new(default_checked: bool) -> SwitchState {
        SwitchState {
            checked: default_checked,
            disabled: false,
        }
    }

    /// Sets whether the switch is disabled.
    pub fn set_disabled(&mut self, disabled: bool) {
        self.disabled = disabled;
    }

    /// Toggles the checked status.
    pub fn toggle(&mut self) -> bool {
        if !self.disabled {
            self.checked = !self.checked;
        }
        self.checked
    }

    /// Returns the current checked status.
    pub fn is_checked(&self) -> bool {
        self.checked
    }

    /// Computes the Tailwind CSS v4 class string.
    pub fn compute_classes(&self) -> String {
        let base = "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";
        let state_cls = if self.checked {
            "bg-primary"
        } else {
            "bg-input"
        };
        format!("{} {}", base, state_cls)
    }

    /// Generates code example and documentation preview snippet.
    pub fn doc_preview() -> String {
        r#"<!-- Silex Switch Preview -->
<div class="flex items-center space-x-2">
  <button type="button" role="switch" aria-checked="true" class="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-primary transition-colors">
    <span class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform translate-x-5"></span>
  </button>
  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Airplane Mode</label>
</div>"#.into()
    }
}
