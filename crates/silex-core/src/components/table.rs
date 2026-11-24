use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

/// Table density or border style variants.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum TableVariant {
    Default,
    Striped,
    Bordered,
}

/// Table component properties configuration.
///
/// # Example
/// ```rust
/// use silex_ui_core::components::table::{TableProps, TableVariant};
///
/// let table = TableProps::new(TableVariant::Default);
/// let classes = table.compute_classes();
/// assert!(classes.contains("w-full"));
/// ```
#[wasm_bindgen]
pub struct TableProps {
    variant: TableVariant,
}

#[wasm_bindgen]
impl TableProps {
    #[wasm_bindgen(constructor)]
    pub fn new(variant: TableVariant) -> TableProps {
        TableProps { variant }
    }

    pub fn compute_classes(&self) -> String {
        let base = "w-full caption-bottom text-sm border-collapse";
        let var = match self.variant {
            TableVariant::Default => "",
            TableVariant::Striped => "[&_tbody_tr:nth-child(even)]:bg-zinc-50 dark:[&_tbody_tr:nth-child(even)]:bg-zinc-900/50",
            TableVariant::Bordered => "border border-zinc-200 dark:border-zinc-800",
        };
        format!("{} {}", base, var).trim().to_string()
    }
}
