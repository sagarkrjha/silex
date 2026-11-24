use wasm_bindgen::prelude::*;

/// Tabs activation state and active tab tracker.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::tabs::TabsState;
///
/// let mut tabs = TabsState::new("account");
/// assert_eq!(tabs.active_tab(), "account");
/// tabs.set_active("password");
/// assert_eq!(tabs.active_tab(), "password");
/// ```
#[wasm_bindgen]
pub struct TabsState {
    active: String,
}

#[wasm_bindgen]
impl TabsState {
    #[wasm_bindgen(constructor)]
    pub fn new(default_tab: &str) -> TabsState {
        TabsState {
            active: default_tab.to_string(),
        }
    }

    pub fn active_tab(&self) -> String {
        self.active.clone()
    }

    pub fn set_active(&mut self, tab: &str) {
        self.active = tab.to_string();
    }

    pub fn is_active(&self, tab: &str) -> bool {
        self.active == tab
    }

    pub fn compute_list_classes() -> String {
        "inline-flex h-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 text-zinc-500 dark:text-zinc-400".into()
    }

    pub fn compute_trigger_classes(is_active: bool) -> String {
        let base = "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
        if is_active {
            format!("{} bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 shadow-sm font-semibold", base)
        } else {
            format!("{} hover:text-zinc-900 dark:hover:text-zinc-100", base)
        }
    }
}
