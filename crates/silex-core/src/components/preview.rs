use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

/// Target viewport types supported by ComponentPreview.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum PreviewViewport {
    Mobile,
    Tablet,
    Desktop,
    Fullscreen,
}

impl Default for PreviewViewport {
    fn default() -> Self {
        PreviewViewport::Desktop
    }
}

/// Canvas background presentation styles.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CanvasBackground {
    DottedMesh,
    SolidSurface,
    Transparent,
}

impl Default for CanvasBackground {
    fn default() -> Self {
        CanvasBackground::DottedMesh
    }
}

/// Supported programming language syntax for CodePreview.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CodeLanguage {
    TypeScript,
    JavaScript,
    Rust,
    Html,
    Css,
    Json,
    Bash,
}

impl Default for CodeLanguage {
    fn default() -> Self {
        CodeLanguage::TypeScript
    }
}

/// Configuration and state machine for ComponentPreviewer.
#[wasm_bindgen]
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ComponentPreviewerProps {
    viewport: PreviewViewport,
    background: CanvasBackground,
    fullscreen: bool,
    interactive: bool,
    custom_class: String,
}

#[wasm_bindgen]
impl ComponentPreviewerProps {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            viewport: PreviewViewport::default(),
            background: CanvasBackground::default(),
            fullscreen: false,
            interactive: true,
            custom_class: String::new(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn viewport(&self) -> PreviewViewport {
        self.viewport
    }

    pub fn set_viewport(&mut self, viewport: PreviewViewport) {
        self.viewport = viewport;
    }

    #[wasm_bindgen(getter)]
    pub fn background(&self) -> CanvasBackground {
        self.background
    }

    pub fn set_background(&mut self, background: CanvasBackground) {
        self.background = background;
    }

    #[wasm_bindgen(getter)]
    pub fn fullscreen(&self) -> bool {
        self.fullscreen
    }

    pub fn toggle_fullscreen(&mut self) {
        self.fullscreen = !self.fullscreen;
    }

    #[wasm_bindgen(getter)]
    pub fn interactive(&self) -> bool {
        self.interactive
    }

    pub fn set_interactive(&mut self, interactive: bool) {
        self.interactive = interactive;
    }

    /// Evaluates container classes for the component preview wrapper.
    pub fn compute_container_classes(&self) -> String {
        let mut classes = vec![
            "w-full",
            "rounded-2xl",
            "border",
            "border-zinc-300",
            "dark:border-zinc-800",
            "overflow-hidden",
            "transition-all",
            "duration-200",
        ];

        if self.fullscreen {
            classes.push("fixed inset-4 z-50 shadow-2xl");
        } else {
            classes.push("shadow-sm");
        }

        if !self.custom_class.is_empty() {
            classes.push(&self.custom_class);
        }

        classes.join(" ")
    }

    /// Evaluates canvas classes for the preview canvas container.
    pub fn compute_canvas_classes(&self) -> String {
        let mut classes = vec![
            "p-6",
            "sm:p-10",
            "flex",
            "items-center",
            "justify-center",
            "min-h-[280px]",
            "transition-all",
        ];

        match self.background {
            CanvasBackground::DottedMesh => {
                classes.extend(&[
                    "bg-zinc-50",
                    "dark:bg-zinc-950",
                    "[background-image:radial-gradient(currentColor_1px,transparent_1px)]",
                    "[background-size:16px_16px]",
                    "text-zinc-300",
                    "dark:text-zinc-800",
                ]);
            }
            CanvasBackground::SolidSurface => {
                classes.extend(&[
                    "bg-zinc-100",
                    "dark:bg-zinc-900",
                    "text-zinc-900",
                    "dark:text-white",
                ]);
            }
            CanvasBackground::Transparent => {
                classes.extend(&[
                    "bg-transparent",
                ]);
            }
        }

        classes.join(" ")
    }

    /// Evaluates width constraints corresponding to the active viewport mode.
    pub fn compute_viewport_classes(&self) -> String {
        match self.viewport {
            PreviewViewport::Mobile => "max-w-[375px] w-full transition-all duration-300".to_string(),
            PreviewViewport::Tablet => "max-w-[720px] w-full transition-all duration-300".to_string(),
            PreviewViewport::Desktop => "w-full transition-all duration-300".to_string(),
            PreviewViewport::Fullscreen => "w-full max-w-5xl transition-all duration-300".to_string(),
        }
    }
}

/// Configuration and state evaluator for CodePreview.
#[wasm_bindgen]
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct CodePreviewProps {
    language: CodeLanguage,
    show_line_numbers: bool,
    collapsible: bool,
    collapsed: bool,
    copy_enabled: bool,
    custom_class: String,
}

#[wasm_bindgen]
impl CodePreviewProps {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            language: CodeLanguage::default(),
            show_line_numbers: false,
            collapsible: true,
            collapsed: false,
            copy_enabled: true,
            custom_class: String::new(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn language(&self) -> CodeLanguage {
        self.language
    }

    pub fn set_language(&mut self, language: CodeLanguage) {
        self.language = language;
    }

    #[wasm_bindgen(getter)]
    pub fn collapsed(&self) -> bool {
        self.collapsed
    }

    pub fn toggle_collapsed(&mut self) {
        self.collapsed = !self.collapsed;
    }

    /// Returns the language identifier for Prism / syntax highlighters.
    pub fn language_identifier(&self) -> String {
        match self.language {
            CodeLanguage::TypeScript => "typescript".to_string(),
            CodeLanguage::JavaScript => "javascript".to_string(),
            CodeLanguage::Rust => "rust".to_string(),
            CodeLanguage::Html => "html".to_string(),
            CodeLanguage::Css => "css".to_string(),
            CodeLanguage::Json => "json".to_string(),
            CodeLanguage::Bash => "bash".to_string(),
        }
    }

    /// Evaluates outer container styling for code block viewports.
    pub fn compute_container_classes(&self) -> String {
        let mut classes = vec![
            "rounded-xl",
            "border",
            "border-zinc-300",
            "dark:border-zinc-800",
            "bg-zinc-950",
            "overflow-hidden",
            "font-mono",
            "text-xs",
            "shadow-sm",
        ];

        if !self.custom_class.is_empty() {
            classes.push(&self.custom_class);
        }

        classes.join(" ")
    }

    /// Evaluates header bar styling with language tag and action buttons.
    pub fn compute_header_classes(&self) -> String {
        "flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-zinc-400".to_string()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_component_previewer_viewport_classes() {
        let mut previewer = ComponentPreviewerProps::new();
        assert_eq!(previewer.viewport(), PreviewViewport::Desktop);
        assert!(previewer.compute_viewport_classes().contains("w-full"));

        previewer.set_viewport(PreviewViewport::Mobile);
        assert!(previewer.compute_viewport_classes().contains("max-w-[375px]"));

        previewer.set_viewport(PreviewViewport::Tablet);
        assert!(previewer.compute_viewport_classes().contains("max-w-[720px]"));
    }

    #[test]
    fn test_component_previewer_canvas_background() {
        let mut previewer = ComponentPreviewerProps::new();
        assert!(previewer.compute_canvas_classes().contains("radial-gradient"));

        previewer.set_background(CanvasBackground::SolidSurface);
        assert!(previewer.compute_canvas_classes().contains("bg-zinc-100"));
    }

    #[test]
    fn test_code_preview_language_and_classes() {
        let mut code_preview = CodePreviewProps::new();
        assert_eq!(code_preview.language_identifier(), "typescript");

        code_preview.set_language(CodeLanguage::Rust);
        assert_eq!(code_preview.language_identifier(), "rust");
        assert!(code_preview.compute_container_classes().contains("bg-zinc-950"));
    }
}
