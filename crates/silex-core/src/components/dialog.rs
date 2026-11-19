use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

/// Animation lifecycle phases for modal dialogs.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum DialogAnimationState {
    Closed,
    Opening,
    Open,
    Closing,
}

/// Accessible modal dialog state machine.
///
/// # Example
/// ```rust
/// use silex_core::{DialogState, DialogAnimationState};
///
/// let mut dialog = DialogState::new(false);
/// assert!(!dialog.is_open());
/// dialog.open();
/// assert!(dialog.is_open());
/// dialog.close();
/// assert!(!dialog.is_open());
/// ```
#[wasm_bindgen]
pub struct DialogState {
    is_open: bool,
    animation: DialogAnimationState,
}

#[wasm_bindgen]
impl DialogState {
    /// Creates a new `DialogState` with the specified initial open flag.
    #[wasm_bindgen(constructor)]
    pub fn new(initial_open: bool) -> DialogState {
        DialogState {
            is_open: initial_open,
            animation: if initial_open {
                DialogAnimationState::Open
            } else {
                DialogAnimationState::Closed
            },
        }
    }

    /// Triggers the opening lifecycle state.
    pub fn open(&mut self) {
        self.is_open = true;
        self.animation = DialogAnimationState::Opening;
    }

    /// Triggers the closing lifecycle state.
    pub fn close(&mut self) {
        self.animation = DialogAnimationState::Closing;
        self.is_open = false;
    }

    /// Toggles the dialog between opened and closed states.
    pub fn toggle(&mut self) -> bool {
        if self.is_open {
            self.close();
            false
        } else {
            self.open();
            true
        }
    }

    /// Returns whether the dialog is currently open.
    pub fn is_open(&self) -> bool {
        self.is_open
    }

    /// Computes whether the dialog DOM element should be rendered during transitions.
    pub fn should_render(&self) -> bool {
        self.is_open || self.animation == DialogAnimationState::Closing
    }

    /// Generates code example and documentation preview snippet.
    pub fn doc_preview() -> String {
        r#"<!-- Silex Dialog Preview -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
  <div class="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl space-y-4">
    <h3 class="text-lg font-semibold text-card-foreground">Edit Profile</h3>
    <p class="text-sm text-muted-foreground">Make changes to your workspace settings here.</p>
    <div class="flex justify-end gap-3 pt-4 border-t border-border">
      <button class="px-4 py-2 text-sm rounded-md border border-input">Cancel</button>
      <button class="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground font-medium">Save changes</button>
    </div>
  </div>
</div>"#.into()
    }
}
