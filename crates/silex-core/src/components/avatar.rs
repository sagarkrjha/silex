use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

/// Avatar size options.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum AvatarSize {
    Sm,
    Md,
    Lg,
    Xl,
}

/// Avatar component configuration.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::avatar::{AvatarProps, AvatarSize};
///
/// let avatar = AvatarProps::new(AvatarSize::Md);
/// let classes = avatar.compute_classes();
/// assert!(classes.contains("rounded-full"));
/// ```
#[wasm_bindgen]
pub struct AvatarProps {
    size: AvatarSize,
    has_image: bool,
}

#[wasm_bindgen]
impl AvatarProps {
    #[wasm_bindgen(constructor)]
    pub fn new(size: AvatarSize) -> AvatarProps {
        AvatarProps {
            size,
            has_image: false,
        }
    }

    pub fn set_has_image(&mut self, has_image: bool) {
        self.has_image = has_image;
    }

    pub fn compute_classes(&self) -> String {
        let size_class = match self.size {
            AvatarSize::Sm => "h-8 w-8 text-xs",
            AvatarSize::Md => "h-10 w-10 text-sm",
            AvatarSize::Lg => "h-12 w-12 text-base",
            AvatarSize::Xl => "h-16 w-16 text-lg",
        };
        format!("relative flex shrink-0 overflow-hidden rounded-full font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 items-center justify-center select-none {}", size_class)
    }
}
