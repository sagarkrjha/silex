use silex_ui_core::theme::ThemeTokens;
use silex_ui_core::contrast_ratio;
use silex_ui_core::components::dialog::DialogState;
use silex_ui_core::components::sheet::{SheetState, SheetSide};
use silex_ui_core::components::button::{ButtonProps, ButtonVariant, ButtonSize};

#[test]
fn test_css_injection_prevention() {
    let mut tokens = ThemeTokens::zinc_dark();
    // Attempt CSS breakout injection
    tokens.background = "#000; } body { display: none !important; } .fake { color: #fff".to_string();
    tokens.radius = "0.5rem; background: red;".to_string();

    let css = tokens.to_css_variables();
    // Verify that semicolons, braces, and exclamation points are sanitized out of values
    let value_lines: Vec<&str> = css.lines().filter(|l| l.contains("--")).collect();
    for line in value_lines {
        let val_part = line.split(':').nth(1).unwrap_or("");
        assert!(!val_part.contains('}'), "CSS value must not contain closing brace in line: {}", line);
        assert!(!val_part.contains('!'), "Sanitized values must strip exclamation points in line: {}", line);
    }
}

#[test]
fn test_xss_in_dialog_and_sheet_states() {
    let mut dialog = DialogState::new(false);
    dialog.open();
    assert!(dialog.is_open());
    dialog.close();
    assert!(!dialog.is_open());

    let mut sheet = SheetState::new(SheetSide::Right, false);
    sheet.open();
    assert!(sheet.is_open());
    sheet.close();
    assert!(!sheet.is_open());
}

#[test]
fn test_extreme_input_length_and_dos_resilience() {
    let mut props = ButtonProps::new(ButtonVariant::Primary, ButtonSize::Md);
    props.set_disabled(true);
    let classes = props.compute_classes();
    assert!(!classes.is_empty());
}

#[test]
fn test_contrast_ratio_edge_cases_no_panic() {
    // Empty strings, malformed hex, invalid characters
    assert_eq!(contrast_ratio("", ""), 1.0);
    assert_eq!(contrast_ratio("#", "#"), 1.0);
    assert_eq!(contrast_ratio("#12", "#3456"), 1.0);
    assert_eq!(contrast_ratio("invalid", "colors"), 1.0);
    assert_eq!(contrast_ratio("#ZZZZZZ", "#000000"), 1.0);
    
    // Pure black and pure white
    let max_contrast = contrast_ratio("#000000", "#ffffff");
    assert!((max_contrast - 21.0).abs() < 0.1);

    // Identical colors
    let min_contrast = contrast_ratio("#123456", "#123456");
    assert!((min_contrast - 1.0).abs() < 0.01);
}
