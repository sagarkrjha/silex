use wasm_bindgen::prelude::*;

/// Eye-safe decorative pattern backgrounds without gradients.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::background::BackgroundComputer;
///
/// let grid_cls = BackgroundComputer::compute_classes("grid");
/// assert!(grid_cls.contains("bg-zinc-50"));
/// ```
#[wasm_bindgen]
pub struct BackgroundComputer;

#[wasm_bindgen]
impl BackgroundComputer {
    pub fn compute_classes(variant: &str) -> String {
        match variant {
            "dots" => "w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] text-zinc-300 dark:text-zinc-800 p-8",
            "lines" => "w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px)] [background-size:24px_24px] text-zinc-200 dark:text-zinc-800/80 p-8",
            "neutral" => "w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900 p-8",
            _ => "w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] text-zinc-300 dark:text-zinc-800 p-8",
        }.into()
    }
}
