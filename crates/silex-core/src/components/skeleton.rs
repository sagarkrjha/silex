use wasm_bindgen::prelude::*;

/// Skeleton loading placeholder properties.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::skeleton::SkeletonProps;
///
/// let skel = SkeletonProps::new(true);
/// let classes = skel.compute_classes();
/// assert!(classes.contains("animate-pulse"));
/// ```
#[wasm_bindgen]
pub struct SkeletonProps {
    rounded: bool,
}

#[wasm_bindgen]
impl SkeletonProps {
    #[wasm_bindgen(constructor)]
    pub fn new(rounded: bool) -> SkeletonProps {
        SkeletonProps { rounded }
    }

    pub fn compute_classes(&self) -> String {
        let base = "animate-pulse bg-zinc-200 dark:bg-zinc-800";
        let shape = if self.rounded { "rounded-full" } else { "rounded-md" };
        format!("{} {}", base, shape)
    }
}
