use wasm_bindgen::prelude::*;

/// Select dropdown state machine.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::select::SelectState;
///
/// let mut select = SelectState::new(false);
/// assert!(!select.is_open());
/// select.toggle();
/// assert!(select.is_open());
/// ```
#[wasm_bindgen]
pub struct SelectState {
    is_open: bool,
    selected_value: Option<String>,
}

#[wasm_bindgen]
impl SelectState {
    #[wasm_bindgen(constructor)]
    pub fn new(open: bool) -> SelectState {
        SelectState {
            is_open: open,
            selected_value: None,
        }
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

    pub fn set_value(&mut self, value: &str) {
        self.selected_value = Some(value.to_string());
        self.is_open = false;
    }

    pub fn value(&self) -> String {
        self.selected_value.clone().unwrap_or_default()
    }

    pub fn compute_trigger_classes(&self) -> String {
        "flex h-9 w-full items-center justify-between rounded-md border border-zinc-300 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs shadow-sm ring-offset-background placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 disabled:cursor-not-allowed disabled:opacity-50".into()
    }
}
