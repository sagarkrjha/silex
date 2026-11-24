use wasm_bindgen::prelude::*;

/// Sticky / responsive Navbar state machine.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::navbar::NavbarState;
///
/// let mut nav = NavbarState::new(false);
/// assert!(!nav.is_mobile_open());
/// nav.toggle_mobile();
/// assert!(nav.is_mobile_open());
/// ```
#[wasm_bindgen]
pub struct NavbarState {
    mobile_open: bool,
}

#[wasm_bindgen]
impl NavbarState {
    #[wasm_bindgen(constructor)]
    pub fn new(mobile_open: bool) -> NavbarState {
        NavbarState { mobile_open }
    }

    pub fn is_mobile_open(&self) -> bool {
        self.mobile_open
    }

    pub fn open_mobile(&mut self) {
        self.mobile_open = true;
    }

    pub fn close_mobile(&mut self) {
        self.mobile_open = false;
    }

    pub fn toggle_mobile(&mut self) {
        self.mobile_open = !self.mobile_open;
    }

    pub fn compute_classes() -> String {
        "sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur px-4 sm:px-6 py-3 transition-colors duration-200".into()
    }
}
