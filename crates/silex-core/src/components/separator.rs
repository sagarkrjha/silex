use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum SeparatorOrientation {
    Horizontal,
    Vertical,
}

/// Visual divider component.
///
/// # Example
/// ```rust
/// use silex_ui_core::{SeparatorProps, SeparatorOrientation};
///
/// let sep = SeparatorProps::new(SeparatorOrientation::Horizontal);
/// let classes = sep.compute_classes();
/// assert!(classes.contains("w-full"));
/// ```
#[wasm_bindgen]
pub struct SeparatorProps {
    orientation: SeparatorOrientation,
}

#[wasm_bindgen]
impl SeparatorProps {
    #[wasm_bindgen(constructor)]
    pub fn new(orientation: SeparatorOrientation) -> SeparatorProps {
        SeparatorProps { orientation }
    }

    pub fn compute_classes(&self) -> String {
        match self.orientation {
            SeparatorOrientation::Horizontal => "shrink-0 bg-border h-[1px] w-full",
            SeparatorOrientation::Vertical => "shrink-0 bg-border h-full w-[1px]",
        }.into()
    }

    pub fn doc_preview() -> String {
        r#"<!-- Silex Separator Preview -->
<div class="space-y-4 max-w-sm">
  <div class="space-y-1">
    <h4 class="text-sm font-medium leading-none text-foreground">Silex Core</h4>
    <p class="text-xs text-muted-foreground">High performance component primitives.</p>
  </div>
  <div class="shrink-0 bg-border h-[1px] w-full"></div>
  <div class="flex h-5 items-center space-x-4 text-xs text-muted-foreground">
    <div>Blog</div>
    <div class="shrink-0 bg-border h-full w-[1px]"></div>
    <div>Docs</div>
    <div class="shrink-0 bg-border h-full w-[1px]"></div>
    <div>Source</div>
  </div>
</div>"#.into()
    }
}
