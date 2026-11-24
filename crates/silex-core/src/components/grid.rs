use wasm_bindgen::prelude::*;

/// Layout Grid responsive class computer.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::grid::GridComputer;
///
/// let classes = GridComputer::compute_classes(3, 4);
/// assert!(classes.contains("grid-cols-3"));
/// assert!(classes.contains("gap-4"));
/// ```
#[wasm_bindgen]
pub struct GridComputer;

#[wasm_bindgen]
impl GridComputer {
    pub fn compute_classes(cols: u8, gap: u8) -> String {
        let cols_cls = match cols {
            1 => "grid grid-cols-1",
            2 => "grid grid-cols-1 sm:grid-cols-2",
            3 => "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
            4 => "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
            6 => "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
            12 => "grid grid-cols-12",
            _ => "grid grid-cols-1",
        };

        let gap_cls = match gap {
            2 => "gap-2",
            4 => "gap-4",
            6 => "gap-6",
            8 => "gap-8",
            _ => "gap-4",
        };

        format!("w-full {} {}", cols_cls, gap_cls)
    }

    pub fn compute_item_classes(span: u8) -> String {
        match span {
            2 => "col-span-2",
            3 => "col-span-3",
            4 => "col-span-4",
            6 => "col-span-6",
            12 => "col-span-12",
            _ => "col-span-1",
        }.into()
    }
}
