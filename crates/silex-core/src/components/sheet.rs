use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum SheetSide {
    Top,
    Right,
    Bottom,
    Left,
}

/// Accessible Sheet (slide-out drawer) state machine.
///
/// # Example
/// ```rust
/// use silex_core::{SheetState, SheetSide};
///
/// let mut sheet = SheetState::new(SheetSide::Right, false);
/// assert!(!sheet.is_open());
/// sheet.open();
/// assert!(sheet.is_open());
/// ```
#[wasm_bindgen]
pub struct SheetState {
    side: SheetSide,
    is_open: bool,
}

#[wasm_bindgen]
impl SheetState {
    #[wasm_bindgen(constructor)]
    pub fn new(side: SheetSide, initial_open: bool) -> SheetState {
        SheetState {
            side,
            is_open: initial_open,
        }
    }

    pub fn open(&mut self) {
        self.is_open = true;
    }

    pub fn close(&mut self) {
        self.is_open = false;
    }

    pub fn toggle(&mut self) -> bool {
        self.is_open = !self.is_open;
        self.is_open
    }

    pub fn is_open(&self) -> bool {
        self.is_open
    }

    pub fn compute_classes(&self) -> String {
        let base = "fixed z-50 gap-4 bg-card p-6 shadow-xl transition ease-in-out border-border";
        let side_cls = match self.side {
            SheetSide::Top => "inset-x-0 top-0 border-b",
            SheetSide::Bottom => "inset-x-0 bottom-0 border-t",
            SheetSide::Left => "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
            SheetSide::Right => "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
        };
        format!("{} {}", base, side_cls)
    }

    pub fn doc_preview() -> String {
        r#"<!-- Silex Sheet Preview -->
<div class="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-card p-6 shadow-xl space-y-4">
  <div class="flex items-center justify-between border-b border-border pb-3">
    <h3 class="font-semibold text-card-foreground">Sheet Drawer</h3>
    <button class="text-xs text-muted-foreground hover:text-foreground">Close</button>
  </div>
  <p class="text-sm text-muted-foreground">Slide-out sheet supporting top, right, bottom, and left anchor positions.</p>
</div>"#.into()
    }
}
