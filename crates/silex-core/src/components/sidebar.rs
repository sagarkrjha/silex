use wasm_bindgen::prelude::*;

/// Collapsible navigation Sidebar state machine.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::sidebar::SidebarState;
///
/// let mut sidebar = SidebarState::new(false);
/// assert!(!sidebar.is_collapsed());
/// sidebar.toggle();
/// assert!(sidebar.is_collapsed());
/// ```
#[wasm_bindgen]
pub struct SidebarState {
    collapsed: bool,
}

#[wasm_bindgen]
impl SidebarState {
    #[wasm_bindgen(constructor)]
    pub fn new(collapsed: bool) -> SidebarState {
        SidebarState { collapsed }
    }

    pub fn is_collapsed(&self) -> bool {
        self.collapsed
    }

    pub fn collapse(&mut self) {
        self.collapsed = true;
    }

    pub fn expand(&mut self) {
        self.collapsed = false;
    }

    pub fn toggle(&mut self) {
        self.collapsed = !self.collapsed;
    }

    pub fn compute_classes(collapsed: bool) -> String {
        let width = if collapsed { "w-16" } else { "w-64" };
        format!(
            "flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 ease-in-out shrink-0 {}",
            width
        )
    }

    pub fn compute_item_classes(is_active: bool) -> String {
        let base = "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer";
        if is_active {
            format!("{} bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold", base)
        } else {
            format!("{} text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-zinc-950 dark:hover:text-white", base)
        }
    }
}
