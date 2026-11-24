use wasm_bindgen::prelude::*;

/// Toggle action button state.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::toggle::ToggleState;
///
/// let mut toggle = ToggleState::new(false);
/// assert!(!toggle.is_pressed());
/// toggle.toggle();
/// assert!(toggle.is_pressed());
/// ```
#[wasm_bindgen]
pub struct ToggleState {
    pressed: bool,
    disabled: bool,
}

#[wasm_bindgen]
impl ToggleState {
    #[wasm_bindgen(constructor)]
    pub fn new(pressed: bool) -> ToggleState {
        ToggleState {
            pressed,
            disabled: false,
        }
    }

    pub fn is_pressed(&self) -> bool {
        self.pressed
    }

    pub fn toggle(&mut self) -> bool {
        if !self.disabled {
            self.pressed = !self.pressed;
        }
        self.pressed
    }

    pub fn set_disabled(&mut self, disabled: bool) {
        self.disabled = disabled;
    }

    pub fn compute_classes(&self) -> String {
        let base = "inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 h-9 px-3";
        if self.pressed {
            format!("{} bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 font-semibold", base)
        } else {
            format!("{} bg-transparent text-zinc-600 dark:text-zinc-400", base)
        }
    }
}
