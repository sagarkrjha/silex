use silex_ui_core::components::dialog::DialogState;
use silex_ui_core::components::sheet::{SheetState, SheetSide};
use silex_ui_core::components::switch::SwitchState;
use silex_ui_core::components::badge::{BadgeProps, BadgeVariant};
use silex_ui_core::components::card::{CardProps, CardVariant, CardHover};
use silex_ui_core::components::input::{InputProps, InputType};
use silex_ui_core::components::separator::{SeparatorProps, SeparatorOrientation};
use silex_ui_core::components::alert::{AlertProps, AlertVariant};
use silex_ui_core::theme::{ThemeTokens, ThemeMode};
use silex_ui_core::contrast_ratio;

#[test]
fn test_dialog_state_transitions() {
    let mut dialog = DialogState::new(false);
    assert!(!dialog.is_open());

    dialog.open();
    assert!(dialog.is_open());

    dialog.close();
    assert!(!dialog.is_open());
}

#[test]
fn test_sheet_state_and_side_configurations() {
    let mut left_sheet = SheetState::new(SheetSide::Left, false);
    assert_eq!(left_sheet.side(), SheetSide::Left);

    left_sheet.open();
    assert!(left_sheet.is_open());

    let mut right_sheet = SheetState::new(SheetSide::Right, true);
    assert_eq!(right_sheet.side(), SheetSide::Right);
    assert!(right_sheet.is_open());
    right_sheet.close();
    assert!(!right_sheet.is_open());
}

#[test]
fn test_switch_state_toggle_and_disabled() {
    let mut switch = SwitchState::new(false);
    assert!(!switch.is_checked());

    switch.toggle();
    assert!(switch.is_checked());

    switch.toggle();
    assert!(!switch.is_checked());

    switch.set_disabled(true);
    switch.toggle();
    assert!(!switch.is_checked(), "Disabled switch must not toggle");
}

#[test]
fn test_badge_and_card_props_validation() {
    let badge = BadgeProps::new(BadgeVariant::Success);
    let classes = badge.compute_classes();
    assert!(classes.contains("emerald"));

    let card = CardProps::new(CardVariant::Default, CardHover::Scale);
    let card_classes = card.compute_classes();
    assert!(card_classes.contains("rounded-xl"));
}

#[test]
fn test_input_and_separator_props() {
    let input = InputProps::new(InputType::Email);
    let input_classes = input.compute_classes();
    assert!(input_classes.contains("rounded-md"));

    let separator = SeparatorProps::new(SeparatorOrientation::Vertical);
    let sep_classes = separator.compute_classes();
    assert!(sep_classes.contains("w-[1px]"));
}

#[test]
fn test_alert_props() {
    let alert = AlertProps::new(AlertVariant::Destructive);
    let alert_classes = alert.compute_classes();
    assert!(alert_classes.contains("destructive"));
}

#[test]
fn test_wcag_contrast_thresholds_for_all_themes() {
    let themes = vec![
        ThemeTokens::zinc_dark(),
        ThemeTokens::zinc_light(),
        ThemeTokens::slate_dark(),
        ThemeTokens::slate_light(),
        ThemeTokens::stone_dark(),
        ThemeTokens::stone_light(),
    ];

    for t in themes {
        let ratio = contrast_ratio(&t.background, &t.foreground);
        assert!(
            ratio >= 4.5,
            "Theme '{}' failed WCAG AA normal text contrast (ratio: {:.2})",
            t.name,
            ratio
        );
        match t.mode {
            ThemeMode::Dark => assert!(t.to_css_variables().starts_with(".dark")),
            ThemeMode::Light => assert!(t.to_css_variables().starts_with(":root")),
        }
    }
}
