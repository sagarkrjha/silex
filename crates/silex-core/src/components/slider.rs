use wasm_bindgen::prelude::*;

/// Slider numerical range controller state.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::slider::SliderState;
///
/// let mut slider = SliderState::new(50, 0, 100);
/// assert_eq!(slider.value(), 50);
/// slider.set_value(75);
/// assert_eq!(slider.value(), 75);
/// ```
#[wasm_bindgen]
pub struct SliderState {
    value: i32,
    min: i32,
    max: i32,
    step: i32,
}

#[wasm_bindgen]
impl SliderState {
    #[wasm_bindgen(constructor)]
    pub fn new(value: i32, min: i32, max: i32) -> SliderState {
        SliderState {
            value: value.clamp(min, max),
            min,
            max,
            step: 1,
        }
    }

    pub fn value(&self) -> i32 {
        self.value
    }

    pub fn set_value(&mut self, val: i32) {
        self.value = val.clamp(self.min, self.max);
    }

    pub fn percentage(&self) -> f64 {
        if self.max <= self.min {
            return 0.0;
        }
        ((self.value - self.min) as f64 / (self.max - self.min) as f64) * 100.0
    }

    pub fn compute_track_classes() -> String {
        "relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800".into()
    }

    pub fn compute_thumb_classes() -> String {
        "block h-4 w-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-50 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400".into()
    }
}
