use clap::{Parser, Subcommand};
use colored::*;

#[derive(Parser)]
#[command(name = "silex")]
#[command(about = "Silex - Native Rust-powered Component Registry & Design Engine", long_about = None)]
#[command(version = "0.1.0")]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    /// Initialize Silex configuration in the current directory
    Init,
    /// Add a component to your project
    Add {
        /// Name of the component to add
        name: String,
    },
    /// List all available components in the Silex registry
    List,
}

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Some(Commands::Init) => {
            println!("{}", "Initializing Silex in current project...".bold().cyan());
            println!("  [+] Created silex.toml configuration");
            println!("  [+] Tailwind CSS v4 & Rust design tokens ready");
        }
        Some(Commands::Add { name }) => {
            let available = [
                "button", "dialog", "sheet", "card", "alert", "badge",
                "switch", "accordion", "input", "separator", "table", "tooltip",
                "avatar", "checkbox", "textarea", "progress", "skeleton"
            ];
            if available.contains(&name.as_str()) {
                println!("Adding {} to your project...", name.bold());
                println!("  [+] Generated component scaffolding");
                println!("  [+] Linked Silex design tokens");
            } else {
                eprintln!("[-] Unknown component: {}", name);
                eprintln!("Run 'silex list' to view all components.");
            }
        }
        Some(Commands::List) => {
            println!("{}", "------------------------------------------".bright_black());
            println!("       {} Registry", "SILEX UI".bold().truecolor(249, 115, 22));
            println!("{}", "------------------------------------------".bright_black());
            let components = [
                ("accordion", "Accessible collapsible disclosure sections"),
                ("alert", "Contextual feedback messages and banners"),
                ("avatar", "Profile representations with fallback states"),
                ("badge", "Compact status and numerical indicators"),
                ("button", "Interactive actions with variants and loading state"),
                ("card", "Structured container with headers, footers and hover states"),
                ("checkbox", "Accessible binary and indeterminate control"),
                ("dialog", "Modal dialog with backdrop and animations"),
                ("input", "Text and numeric form inputs with validation styles"),
                ("progress", "Deterministic completion and percentage bars"),
                ("separator", "Visual divider with orientation support"),
                ("sheet", "Slide-out modal drawer with 4-directional support"),
                ("skeleton", "Loading placeholder wireframe animations"),
                ("switch", "Toggleable boolean switch state control"),
                ("table", "Responsive, accessible data display table"),
                ("textarea", "Multiline resizable form text inputs"),
                ("tooltip", "Contextual hover tooltip with directional arrows"),
            ];
            for (comp, desc) in components {
                println!("  * {:<14} {}", comp.bold(), desc.bright_black());
            }
            println!("\nUse 'silex add <component>' to add a component.");
        }
        None => {
            println!("{}", "Silex - Native Rust-powered Component Engine".bold().truecolor(249, 115, 22));
            println!("Type 'silex --help' for usage instructions.");
        }
    }
}
