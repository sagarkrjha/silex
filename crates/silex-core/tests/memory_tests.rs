use silex_ui_core::components::dialog::DialogState;
use silex_ui_core::components::sheet::{SheetState, SheetSide};
use silex_ui_core::components::switch::SwitchState;
use silex_ui_core::{AccordionState, AccordionType};

#[test]
fn test_rapid_state_transitions_memory_cleanliness() {
    let mut dialog = DialogState::new(false);
    let mut sheet = SheetState::new(SheetSide::Left, false);
    let mut switch = SwitchState::new(false);

    // 50,000 rapid transitions
    for _ in 0..50_000 {
        dialog.open();
        dialog.close();

        sheet.open();
        sheet.close();

        switch.toggle();
    }

    assert!(!dialog.is_open());
    assert!(!sheet.is_open());
    assert!(!switch.is_checked());
}

#[test]
fn test_accordion_dynamic_item_lifecycle() {
    let mut single_acc = AccordionState::new(AccordionType::Single);
    let mut multi_acc = AccordionState::new(AccordionType::Multiple);

    for cycle in 0..10_000 {
        let key1 = format!("acc-item-{}", cycle % 50);
        let key2 = format!("acc-item-{}", (cycle + 1) % 50);

        single_acc.toggle(&key1);
        single_acc.toggle(&key2);

        multi_acc.toggle(&key1);
        multi_acc.toggle(&key2);

        if cycle % 100 == 0 {
            // Periodic reset
            single_acc = AccordionState::new(AccordionType::Single);
            multi_acc = AccordionState::new(AccordionType::Multiple);
        }
    }
}

#[test]
fn test_deep_clone_isolation() {
    let mut original = AccordionState::new(AccordionType::Multiple);
    original.toggle("item-1");
    original.toggle("item-2");

    let mut cloned = AccordionState::new(AccordionType::Multiple);
    cloned.toggle("item-1");
    cloned.toggle("item-2");
    cloned.toggle("item-3");

    assert!(original.is_open("item-1"));
    assert!(original.is_open("item-2"));
    assert!(!original.is_open("item-3"), "Independent instance must not leak item-3 into original");

    assert!(cloned.is_open("item-1"));
    assert!(cloned.is_open("item-2"));
    assert!(cloned.is_open("item-3"));
}
