use wasm_bindgen::prelude::*;

/// Progress indicator state.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::progress::ProgressState;
///
/// let mut prog = ProgressState::new(45);
/// assert_eq!(prog.value(), 45);
/// prog.set_value(80);
/// assert_eq!(prog.value(), 80);
/// ```
#[wasm_bindgen]
pub struct ProgressState {
    value: u32,
    max: u32,
}

#[wasm_bindgen]
impl ProgressState {
    #[wasm_bindgen(constructor)]
    pub fn new(value: u32) -> ProgressState {
        ProgressState {
            value: value.min(100),
            max: 100,
        }
    }

    pub fn value(&self) -> u32 {
        self.value
    }

    pub fn set_value(&mut self, value: u32) {
        self.value = value.min(self.max);
    }

    pub fn percentage(&self) -> f64 {
        (self.value as f64 / self.max as f64) * 100.0
    }

    pub fn compute_classes(&self) -> String {
        "relative h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800".to_string()
    }

    pub fn compute_indicator_classes(&self) -> String {
        "h-full w-full flex-1 transition-all duration-300 ease-in-out".to_string()
    }
}
