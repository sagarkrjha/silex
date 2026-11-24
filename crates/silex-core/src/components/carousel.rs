use wasm_bindgen::prelude::*;

/// Swiper/Carousel sliding viewport state machine.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::carousel::CarouselState;
///
/// let mut carousel = CarouselState::new(4, 0);
/// assert_eq!(carousel.current_index(), 0);
/// carousel.next();
/// assert_eq!(carousel.current_index(), 1);
/// carousel.prev();
/// assert_eq!(carousel.current_index(), 0);
/// ```
#[wasm_bindgen]
pub struct CarouselState {
    total_slides: usize,
    current_index: usize,
}

#[wasm_bindgen]
impl CarouselState {
    #[wasm_bindgen(constructor)]
    pub fn new(total_slides: usize, initial_index: usize) -> CarouselState {
        let idx = if total_slides == 0 {
            0
        } else {
            initial_index % total_slides
        };
        CarouselState {
            total_slides,
            current_index: idx,
        }
    }

    pub fn current_index(&self) -> usize {
        self.current_index
    }

    pub fn total_slides(&self) -> usize {
        self.total_slides
    }

    pub fn next(&mut self) {
        if self.total_slides > 0 {
            self.current_index = (self.current_index + 1) % self.total_slides;
        }
    }

    pub fn prev(&mut self) {
        if self.total_slides > 0 {
            if self.current_index == 0 {
                self.current_index = self.total_slides - 1;
            } else {
                self.current_index -= 1;
            }
        }
    }

    pub fn go_to(&mut self, index: usize) {
        if self.total_slides > 0 && index < self.total_slides {
            self.current_index = index;
        }
    }

    pub fn compute_container_classes() -> String {
        "relative w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900".into()
    }

    pub fn compute_dot_classes(is_active: bool) -> String {
        let base = "h-2 rounded-full transition-all duration-300";
        if is_active {
            format!("{} w-6 bg-zinc-900 dark:bg-zinc-100", base)
        } else {
            format!("{} w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600", base)
        }
    }
}
