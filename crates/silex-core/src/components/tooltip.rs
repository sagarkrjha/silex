use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

/// Tooltip positioning placement options.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum TooltipSide {
    Top,
    Right,
    Bottom,
    Left,
}

/// Tooltip state machine managing open state and positioning.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::tooltip::{TooltipState, TooltipSide};
///
/// let mut tooltip = TooltipState::new(TooltipSide::Top);
/// assert!(!tooltip.is_open());
/// tooltip.show();
/// assert!(tooltip.is_open());
/// ```
#[wasm_bindgen]
pub struct TooltipState {
    side: TooltipSide,
    is_open: bool,
    delay_ms: u32,
}

#[wasm_bindgen]
impl TooltipState {
    #[wasm_bindgen(constructor)]
    pub fn new(side: TooltipSide) -> TooltipState {
        TooltipState {
            side,
            is_open: false,
            delay_ms: 200,
        }
    }

    pub fn show(&mut self) {
        self.is_open = true;
    }

    pub fn hide(&mut self) {
        self.is_open = false;
    }

    pub fn toggle(&mut self) {
        self.is_open = !self.is_open;
    }

    pub fn is_open(&self) -> bool {
        self.is_open
    }

    pub fn side(&self) -> TooltipSide {
        self.side
    }

    pub fn set_delay(&mut self, delay_ms: u32) {
        self.delay_ms = delay_ms;
    }

    pub fn delay(&self) -> u32 {
        self.delay_ms
    }

    pub fn compute_classes(&self) -> String {
        let base = "z-50 overflow-hidden rounded-md bg-zinc-900 px-3 py-1.5 text-xs text-zinc-50 shadow-md dark:bg-zinc-100 dark:text-zinc-900 animate-in fade-in-0 zoom-in-95";
        let placement = match self.side {
            TooltipSide::Top => "slide-in-from-bottom-2 mb-2",
            TooltipSide::Bottom => "slide-in-from-top-2 mt-2",
            TooltipSide::Left => "slide-in-from-right-2 mr-2",
            TooltipSide::Right => "slide-in-from-left-2 ml-2",
        };
        format!("{} {}", base, placement)
    }
}
