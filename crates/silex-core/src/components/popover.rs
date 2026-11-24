use wasm_bindgen::prelude::*;

/// Popover overlay state machine.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::popover::PopoverState;
///
/// let mut pop = PopoverState::new();
/// assert!(!pop.is_open());
/// pop.open();
/// assert!(pop.is_open());
/// ```
#[wasm_bindgen]
pub struct PopoverState {
    is_open: bool,
}

#[wasm_bindgen]
impl PopoverState {
    #[wasm_bindgen(constructor)]
    pub fn new() -> PopoverState {
        PopoverState { is_open: false }
    }

    pub fn is_open(&self) -> bool {
        self.is_open
    }

    pub fn open(&mut self) {
        self.is_open = true;
    }

    pub fn close(&mut self) {
        self.is_open = false;
    }

    pub fn toggle(&mut self) {
        self.is_open = !self.is_open;
    }

    pub fn compute_content_classes() -> String {
        "z-50 w-72 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-zinc-950 dark:text-zinc-50 shadow-md outline-none animate-in fade-in-0 zoom-in-95".into()
    }
}
