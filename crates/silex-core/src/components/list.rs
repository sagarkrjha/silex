use wasm_bindgen::prelude::*;

/// Accessible interactive or static List group.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::list::ListComputer;
///
/// let classes = ListComputer::compute_container_classes(true);
/// assert!(classes.contains("divide-y"));
/// ```
#[wasm_bindgen]
pub struct ListComputer;

#[wasm_bindgen]
impl ListComputer {
    pub fn compute_container_classes(divided: bool) -> String {
        let base = "w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden";
        if divided {
            format!("{} divide-y divide-zinc-200 dark:divide-zinc-800", base)
        } else {
            base.into()
        }
    }

    pub fn compute_item_classes(interactive: bool) -> String {
        let base = "flex items-center justify-between p-3.5 text-xs text-zinc-900 dark:text-zinc-100 transition";
        if interactive {
            format!("{} hover:bg-zinc-50 dark:hover:bg-zinc-800/60 cursor-pointer", base)
        } else {
            base.into()
        }
    }
}
