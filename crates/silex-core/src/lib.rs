use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

pub mod components;
pub mod theme;

pub use components::*;
pub use theme::*;

/// Accordion multi-expand or single-expand behavioral modes.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum AccordionType {
    Single,
    Multiple,
}

/// Accessible Accordion state machine managing item expansion.
///
/// # Example
/// ```rust
/// use silex_ui_core::{AccordionState, AccordionType};
///
/// let mut acc = AccordionState::new(AccordionType::Single);
/// assert!(acc.toggle("section-1"));
/// assert!(acc.is_open("section-1"));
/// assert!(!acc.is_open("section-2"));
/// ```
#[wasm_bindgen]
pub struct AccordionState {
    accordion_type: AccordionType,
    items: Vec<String>,
}

#[wasm_bindgen]
impl AccordionState {
    /// Creates a new `AccordionState` with the given type.
    #[wasm_bindgen(constructor)]
    pub fn new(accordion_type: AccordionType) -> AccordionState {
        AccordionState {
            accordion_type,
            items: Vec::new(),
        }
    }

    /// Toggles an accordion section open or closed.
    pub fn toggle(&mut self, item_id: &str) -> bool {
        let is_open = self.items.contains(&item_id.to_string());
        match self.accordion_type {
            AccordionType::Single => {
                if is_open {
                    self.items.clear();
                    false
                } else {
                    self.items.clear();
                    self.items.push(item_id.to_string());
                    true
                }
            }
            AccordionType::Multiple => {
                if is_open {
                    self.items.retain(|x| x != item_id);
                    false
                } else {
                    self.items.push(item_id.to_string());
                    true
                }
            }
        }
    }

    /// Checks if a section is currently open.
    pub fn is_open(&self, item_id: &str) -> bool {
        self.items.contains(&item_id.to_string())
    }

    /// Generates code example and documentation preview snippet.
    pub fn doc_preview() -> String {
        r#"<!-- Silex Accordion Preview -->
<div class="w-full max-w-md divide-y divide-border rounded-lg border border-border bg-card">
  <div class="px-4 py-3">
    <button class="flex w-full items-center justify-between text-sm font-medium text-left">
      <span>Is it accessible?</span>
      <span class="text-muted-foreground">−</span>
    </button>
    <div class="pt-2 text-sm text-muted-foreground">Yes. It adheres to the WAI-ARIA design pattern with full keyboard navigation.</div>
  </div>
  <div class="px-4 py-3">
    <button class="flex w-full items-center justify-between text-sm font-medium text-left">
      <span>Is it styled?</span>
      <span class="text-muted-foreground">+</span>
    </button>
  </div>
</div>"#.into()
    }
}

/// Computes OTP input index shift and updates state
#[wasm_bindgen]
pub fn compute_next_otp_focus(current_index: usize, count: usize, is_backspace: bool) -> usize {
    if is_backspace {
        if current_index > 0 {
            current_index - 1
        } else {
            0
        }
    } else if current_index + 1 < count {
        current_index + 1
    } else {
        count - 1
    }
}

/// Color luminance & contrast calculator for WCAG compliance
#[wasm_bindgen]
pub fn calculate_luminance(r: f32, g: f32, b: f32) -> f32 {
    let to_linear = |v: f32| {
        let normalized = v / 255.0;
        if normalized <= 0.03928 {
            normalized / 12.92
        } else {
            ((normalized + 0.055) / 1.055).powf(2.4)
        }
    };
    0.2126 * to_linear(r) + 0.7152 * to_linear(g) + 0.0722 * to_linear(b)
}

#[wasm_bindgen]
pub fn calculate_contrast_ratio(lum1: f32, lum2: f32) -> f32 {
    let brightest = lum1.max(lum2);
    let darkest = lum1.min(lum2);
    (brightest + 0.05) / (darkest + 0.05)
}

/// Convenience helper to calculate WCAG contrast ratio directly from two hex colors.
pub fn contrast_ratio(hex1: &str, hex2: &str) -> f32 {
    let parse_hex = |hex: &str| -> Option<(f32, f32, f32)> {
        let clean = hex.trim().trim_start_matches('#');
        if clean.len() != 6 {
            return None;
        }
        let r = u8::from_str_radix(&clean[0..2], 16).ok()?;
        let g = u8::from_str_radix(&clean[2..4], 16).ok()?;
        let b = u8::from_str_radix(&clean[4..6], 16).ok()?;
        Some((r as f32, g as f32, b as f32))
    };

    match (parse_hex(hex1), parse_hex(hex2)) {
        (Some((r1, g1, b1)), Some((r2, g2, b2))) => {
            let l1 = calculate_luminance(r1, g1, b1);
            let l2 = calculate_luminance(r2, g2, b2);
            calculate_contrast_ratio(l1, l2)
        }
        _ => 1.0,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_accordion_single() {
        let mut acc = AccordionState::new(AccordionType::Single);
        assert!(acc.toggle("item-1"));
        assert!(acc.is_open("item-1"));
        assert!(!acc.is_open("item-2"));

        assert!(acc.toggle("item-2"));
        assert!(!acc.is_open("item-1"));
        assert!(acc.is_open("item-2"));

        assert!(!acc.toggle("item-2"));
        assert!(!acc.is_open("item-2"));
    }

    #[test]
    fn test_contrast_ratio() {
        let white_lum = calculate_luminance(255.0, 255.0, 255.0);
        let black_lum = calculate_luminance(0.0, 0.0, 0.0);
        let ratio = calculate_contrast_ratio(white_lum, black_lum);
        assert!(ratio > 20.0);
    }
}
