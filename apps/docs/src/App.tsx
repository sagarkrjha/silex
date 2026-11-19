import React, { useEffect, useState } from 'react';
import { 
  Routes, 
  Route, 
  Link, 
  NavLink, 
  useParams, 
  useNavigate 
} from 'react-router';
import { 
  Flame, 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Globe2, 
  Search, 
  ChevronRight, 
  ExternalLink, 
  X,
  MousePointerClick,
  Maximize2,
  PanelRightClose,
  SquareCode,
  TextCursorInput,
  ToggleLeft,
  Split,
  Tag,
  ListCollapse,
  AlertTriangle,
  Sparkles,
  Server,
  Lock,
  Cpu,
  Boxes,
  Database,
  Sun,
  Moon,
  BookOpen,
  Code2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

interface ComponentDoc {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  markdownDoc: string;
  preview: React.ReactNode;
  install: {
    npm: string;
    pnpm: string;
    bun: string;
    cargo: string;
  };
  code: {
    react: string;
    rust: string;
    html: string;
  };
}

// Global Theme Hook
function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('silex-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('silex-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('silex-theme', 'light');
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark(prev => !prev) };
}

function CodeHighlight({ code, language }: { code: string; language: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let gram = Prism.languages[language] || Prism.languages.typescript || Prism.languages.javascript;
    if (language === 'react' || language === 'tsx') gram = Prism.languages.tsx || Prism.languages.javascript;
    if (language === 'rust') gram = Prism.languages.rust;
    if (language === 'html') gram = Prism.languages.html;
    
    if (gram) {
      setHtml(Prism.highlight(code, gram, language));
    } else {
      setHtml(code);
    }
  }, [code, language]);

  return (
    <pre className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-[#0d0f12] font-mono text-xs text-zinc-900 dark:text-zinc-200 overflow-x-auto leading-relaxed">
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}

function NavigationBar({ isDark, onToggleTheme }: { isDark: boolean; onToggleTheme: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-orange-500/10 dark:bg-zinc-900 border border-orange-500/20 dark:border-zinc-800 flex items-center justify-center shadow-inner">
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">Silex</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-mono font-medium">Rust-First</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <NavLink to="/" end className={({ isActive }) => `hover:text-zinc-900 dark:hover:text-white transition ${isActive ? 'text-zinc-900 dark:text-white font-semibold' : ''}`}>Overview</NavLink>
            <NavLink to="/docs" className={({ isActive }) => `hover:text-zinc-900 dark:hover:text-white transition ${isActive ? 'text-zinc-900 dark:text-white font-semibold' : ''}`}>Components</NavLink>
            <a href="https://github.com/sagarkrjha/silex" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition flex items-center gap-1.5">
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 text-zinc-400 dark:text-zinc-500" />
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition cursor-pointer"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-zinc-600" />}
          </button>
          <Link
            to="/docs/button"
            className="px-3.5 py-1.5 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition"
          >
            Explore Components
          </Link>
        </div>
      </div>
    </header>
  );
}

function LandingPage() {
  const [installPm, setInstallPm] = useState<'pnpm' | 'npm' | 'bun' | 'cargo'>('pnpm');
  const [copied, setCopied] = useState(false);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <section className="relative px-6 pt-24 pb-20 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-medium">
          <Zap className="h-3.5 w-3.5" /> Polyglot Component Architecture: Rust • TS • WASM
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
          The Native Rust Engine for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 dark:from-orange-400 dark:via-amber-300 dark:to-orange-500">
            Modern Component Systems
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Engineered with humanized editorial aesthetics, powered by a pure Rust state engine. 
          Zero client runtime bloat, accessible by default, and scaffolded in seconds.
        </p>

        <div className="max-w-lg mx-auto bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-xl backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Scaffold Instantly</span>
            <div className="flex gap-1">
              {(['pnpm', 'npm', 'bun', 'cargo'] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setInstallPm(pm)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition cursor-pointer ${
                    installPm === pm ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800/80 font-mono text-xs">
            <span className="text-orange-600 dark:text-orange-400 select-all">
              {installPm === 'pnpm' && 'pnpm dlx silex-ui init'}
              {installPm === 'npm' && 'npx silex-ui init'}
              {installPm === 'bun' && 'bunx silex-ui init'}
              {installPm === 'cargo' && 'cargo install silex-ui-cli && silex init'}
            </span>
            <button
              onClick={() => {
                const cmd = installPm === 'pnpm' ? 'pnpm dlx silex-ui init' :
                            installPm === 'npm' ? 'npx silex-ui init' :
                            installPm === 'bun' ? 'bunx silex-ui init' : 'cargo install silex-ui-cli && silex init';
                copyText(cmd);
              }}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition ml-3"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            to="/docs/button"
            className="px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-orange-600/20 transition cursor-pointer"
          >
            <span>Explore Documentation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com/sagarkrjha/silex"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-800 font-medium text-sm transition"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 space-y-3 shadow-sm">
          <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Pure Rust Determinism</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            State transitions and ARIA accessibility roles are driven by pure Rust state machines compiled to WASM and C-ABI.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 space-y-3 shadow-sm">
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Globe2 className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Polyglot Registry</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Publish once, consume everywhere. Distributed natively on crates.io and npm with automatic CI releases.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 space-y-3 shadow-sm">
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Hardened & Memory-Safe</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Zero memory leaks under 50,000 rapid cycles, sanitized CSS variable generation, and guaranteed WCAG 2.1 compliance.
          </p>
        </div>
      </section>
    </div>
  );
}

function DocsPage() {
  const { componentId } = useParams<{ componentId?: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'preview' | 'docs'>('preview');
  const [codeLang, setCodeLang] = useState<'react' | 'rust' | 'html'>('react');
  const [installPm, setInstallPm] = useState<'pnpm' | 'npm' | 'bun' | 'cargo'>('pnpm');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Component Demo states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const components: Record<string, ComponentDoc> = {
    button: {
      id: 'button',
      name: 'Button',
      category: 'Primitives',
      icon: <MousePointerClick className="h-4 w-4" />,
      description: 'Tactile, high-contrast action triggers with polymorphic sizing.',
      markdownDoc: `
### Overview
The **Button** component serves as the primary interactive element in the Silex design system. Its state machine enforces accessibility standards, keyboard triggerability (\`Enter\` / \`Space\`), and WCAG 2.1 contrast compliance.

### Features
- **Variants**: \`Primary\`, \`Secondary\`, \`Outline\`, \`Ghost\`, \`Destructive\`.
- **Sizes**: \`Sm\` (32px), \`Md\` (36px), \`Lg\` (44px).
- **Accessibility**: Native focus rings, disabled state deterrence, and ARIA attributes.
      `,
      preview: (
        <div className="flex flex-wrap gap-4 items-center">
          <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-stone-950 font-semibold rounded-md shadow-sm transition">
            Primary Action
          </button>
          <button className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-md transition">
            Secondary
          </button>
          <button className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-md transition">
            Outline
          </button>
          <button className="px-4 py-2 bg-red-900/40 hover:bg-red-800/60 text-red-700 dark:text-red-200 border border-red-500/30 rounded-md transition">
            Destructive
          </button>
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-ui add button',
        npm: 'npx silex-ui add button',
        bun: 'bunx silex-ui add button',
        cargo: 'cargo add silex-ui-core',
      },
      code: {
        react: `import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="flex gap-4">
      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}`,
        rust: `use silex_ui_core::components::button::{ButtonProps, ButtonVariant, ButtonSize};

let button = ButtonProps::new(ButtonVariant::Primary, ButtonSize::Md);
let classes = button.compute_classes();`,
        html: `<button class="inline-flex items-center justify-center rounded-md font-semibold bg-primary text-primary-foreground h-9 px-4">
  Primary Action
</button>`,
      },
    },

    dialog: {
      id: 'dialog',
      name: 'Dialog',
      category: 'Overlays',
      icon: <Maximize2 className="h-4 w-4" />,
      description: 'Modal window overlay with focus trapping and backdrop dismissal.',
      markdownDoc: `
### Overview
The **Dialog** component interrupts the user with a mandatory or informative layer. Powered by \`DialogState\` in \`silex-ui-core\`, it manages animation phases (\`Closed\` -> \`Opening\` -> \`Open\` -> \`Closing\`).

### Usage Notes
- Focus is automatically trapped within the modal content while open.
- Escape key and backdrop clicks dismiss the dialog gracefully.
      `,
      preview: (
        <div>
          <button
            onClick={() => setDialogOpen(true)}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-stone-950 font-semibold rounded-md shadow-sm transition cursor-pointer"
          >
            Open Modal Dialog
          </button>

          {dialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in">
              <div className="relative w-full max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xl">
                <div className="flex justify-between items-start pb-4">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Maximize2 className="h-5 w-5 text-orange-500" />
                    <span>Database Migration</span>
                  </h3>
                  <button onClick={() => setDialogOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Ready to deploy schema changes across all distributed read replicas? This operation will lock active transactions for 250ms.
                </p>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={() => setDialogOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setDialogOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-md bg-orange-600 hover:bg-orange-500 text-stone-950"
                  >
                    Confirm Migration
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-ui add dialog',
        npm: 'npx silex-ui add dialog',
        bun: 'bunx silex-ui add dialog',
        cargo: 'cargo add silex-ui-core',
      },
      code: {
        react: `import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} title="Database Migration">
      <p>Confirm cluster configuration change.</p>
    </Dialog>
  );
}`,
        rust: `use silex_ui_core::components::dialog::DialogState;

let mut dialog = DialogState::new(false);
dialog.open();
assert!(dialog.is_open());
dialog.close();`,
        html: `<div role="dialog" aria-modal="true" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
  <div class="relative w-full max-w-lg rounded-xl border bg-card p-6">...</div>
</div>`,
      },
    },

    sheet: {
      id: 'sheet',
      name: 'Sheet',
      category: 'Overlays',
      icon: <PanelRightClose className="h-4 w-4" />,
      description: 'Slide-over drawers docking to any edge of the viewport.',
      markdownDoc: `
### Overview
The **Sheet** component extends dialog semantics into sliding drawer panels. Ideal for side navigation, inspectors, and filter drawers.

### Edge Docking
- Supports \`SheetSide::Left\`, \`SheetSide::Right\`, \`SheetSide::Top\`, \`SheetSide::Bottom\`.
      `,
      preview: (
        <div>
          <button
            onClick={() => setSheetOpen(true)}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-stone-950 font-semibold rounded-md shadow-sm transition cursor-pointer"
          >
            Open Side Sheet
          </button>

          {sheetOpen && (
            <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm">
              <div className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Workspace Configuration</h3>
                    <button onClick={() => setSheetOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Manage fine-grained token thresholds and runtime telemetry.</p>
                </div>
                <div className="flex justify-end gap-2 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    onClick={() => setSheetOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-ui add sheet',
        npm: 'npx silex-ui add sheet',
        bun: 'bunx silex-ui add sheet',
        cargo: 'cargo add silex-ui-core',
      },
      code: {
        react: `import { Sheet } from "@/components/ui/sheet";
import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen} side="right" title="Inspector">
      <p>Sheet drawer content.</p>
    </Sheet>
  );
}`,
        rust: `use silex_ui_core::components::sheet::{SheetState, SheetSide};

let mut sheet = SheetState::new(SheetSide::Right, false);
sheet.open();
assert!(sheet.is_open());`,
        html: `<div class="fixed inset-y-0 right-0 w-full sm:max-w-md bg-card border-l p-6">
  <h2>Workspace Configuration</h2>
</div>`,
      },
    },

    card: {
      id: 'card',
      name: 'Card',
      category: 'Primitives',
      icon: <SquareCode className="h-4 w-4" />,
      description: 'Structured container with subtle borders and organic surface backdrop.',
      markdownDoc: `
### Overview
The **Card** container standardizes visual containment for metrics, charts, and articles.

### Structure
- \`Card\`: Main wrapper.
- \`CardHeader\`, \`CardTitle\`, \`CardDescription\`: Editorial headings.
- \`CardContent\`: Body container.
      `,
      preview: (
        <div className="w-full max-w-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400">Telemetry</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h4 className="text-base font-semibold text-zinc-950 dark:text-white">Active Workers</h4>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">99.98%</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Zero dropped connections across 48 global nodes.</p>
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-ui add card',
        npm: 'npx silex-ui add card',
        bun: 'bunx silex-ui add card',
        cargo: 'cargo add silex-ui-core',
      },
      code: {
        react: `import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Workers</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">99.98%</p>
      </CardContent>
    </Card>
  );
}`,
        rust: `use silex_ui_core::components::card::{CardProps, CardVariant, CardHover};

let card = CardProps::new(CardVariant::Default, CardHover::Scale);
let classes = card.compute_classes();`,
        html: `<div class="rounded-xl border border-border bg-card p-6 shadow-sm">
  <h3 class="font-semibold">Active Workers</h3>
</div>`,
      },
    },

    switch: {
      id: 'switch',
      name: 'Switch',
      category: 'Form Controls',
      icon: <ToggleLeft className="h-4 w-4" />,
      description: 'Accessible binary toggle switch.',
      markdownDoc: `
### Overview
The **Switch** component provides accessible on/off toggle behavior conforming to WAI-ARIA \`role="switch"\`.

### Accessibility
- Keyboard toggling with \`Space\` or \`Enter\`.
- \`aria-checked\` dynamically updated.
      `,
      preview: (
        <div className="flex items-center gap-4">
          <button
            type="button"
            role="switch"
            aria-checked={switchOn}
            onClick={() => setSwitchOn(!switchOn)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              switchOn ? 'bg-orange-600' : 'bg-zinc-300 dark:bg-zinc-800'
            }`}
          >
            <span
              className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                switchOn ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 flex items-center gap-2">
            <Zap className={`h-4 w-4 ${switchOn ? 'text-orange-500' : 'text-zinc-400 dark:text-zinc-600'}`} />
            <span>{switchOn ? 'Continuous Deployment Active' : 'Manual Deploy Mode'}</span>
          </span>
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-ui add switch',
        npm: 'npx silex-ui add switch',
        bun: 'bunx silex-ui add switch',
        cargo: 'cargo add silex-ui-core',
      },
      code: {
        react: `import { Switch } from "@/components/ui/switch";

export default function Example() {
  return <Switch defaultChecked />;
}`,
        rust: `use silex_ui_core::components::switch::SwitchState;

let mut switch = SwitchState::new(true);
switch.toggle();`,
        html: `<button role="switch" class="inline-flex h-6 w-11 rounded-full bg-primary">
  <span class="block h-5 w-5 rounded-full bg-background"></span>
</button>`,
      },
    },

    input: {
      id: 'input',
      name: 'Input',
      category: 'Form Controls',
      icon: <TextCursorInput className="h-4 w-4" />,
      description: 'Text fields with focus rings and error states.',
      markdownDoc: `
### Overview
The **Input** component standardizes text field styles, focus states, and input types (\`text\`, \`email\`, \`password\`, \`number\`).
      `,
      preview: (
        <div className="w-full max-w-sm space-y-2">
          <input
            type="text"
            placeholder="Search API keys..."
            className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-md text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-orange-500"
          />
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-ui add input',
        npm: 'npx silex-ui add input',
        bun: 'bunx silex-ui add input',
        cargo: 'cargo add silex-ui-core',
      },
      code: {
        react: `import { Input } from "@/components/ui/input";

export default function Example() {
  return <Input placeholder="Search API keys..." />;
}`,
        rust: `use silex_ui_core::components::input::{InputProps, InputType};

let input = InputProps::new(InputType::Text);
let classes = input.compute_classes();`,
        html: `<input type="text" class="h-9 w-full rounded-md border border-input bg-background px-3 py-1" />`,
      },
    },

    alert: {
      id: 'alert',
      name: 'Alert',
      category: 'Feedback',
      icon: <AlertTriangle className="h-4 w-4" />,
      description: 'Contextual banner callouts with semantic status styling.',
      markdownDoc: `
### Overview
The **Alert** component highlights critical status messages, warnings, and confirmations.
      `,
      preview: (
        <div className="w-full max-w-md rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-700 dark:text-red-300 space-y-1">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span>Cluster Rebalance Triggered</span>
          </div>
          <p className="text-xs text-red-600/80 dark:text-red-300/80 pl-6">Worker node eu-west-1a was drained for kernel upgrades.</p>
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-ui add alert',
        npm: 'npx silex-ui add alert',
        bun: 'bunx silex-ui add alert',
        cargo: 'cargo add silex-ui-core',
      },
      code: {
        react: `import { Alert } from "@/components/ui/alert";

export default function Example() {
  return (
    <Alert variant="destructive">
      Cluster Rebalance Triggered
    </Alert>
  );
}`,
        rust: `use silex_ui_core::components::alert::{AlertProps, AlertVariant};

let alert = AlertProps::new(AlertVariant::Destructive);
let classes = alert.compute_classes();`,
        html: `<div role="alert" class="rounded-lg border border-destructive/50 p-4 text-destructive">
  Alert Content
</div>`,
      },
    },
  };

  const selectedKey = componentId && components[componentId] ? componentId : 'button';
  const curr = components[selectedKey];

  return (
    <div className="max-w-7xl mx-auto px-6 flex-1 w-full grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 py-8">
      {/* Sidebar */}
      <aside className="space-y-6">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Filter components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500 transition"
          />
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">All Components</h4>
          <div className="space-y-1 font-medium text-sm">
            {Object.keys(components)
              .filter((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((k) => (
                <button
                  key={k}
                  onClick={() => navigate(`/docs/${k}`)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition cursor-pointer flex items-center justify-between ${
                    selectedKey === k
                      ? 'bg-orange-500/10 dark:bg-zinc-800 text-orange-600 dark:text-white font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={selectedKey === k ? 'text-orange-500' : 'text-zinc-400 dark:text-zinc-500'}>{components[k].icon}</span>
                    <span>{components[k].name}</span>
                  </span>
                  {selectedKey === k && <ChevronRight className="h-3.5 w-3.5 text-orange-500" />}
                </button>
              ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="space-y-8">
        <div>
          <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            {curr.icon}
            <span>{curr.category}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">{curr.name}</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base mt-2">{curr.description}</p>
        </div>

        {/* Tab Controls: Preview vs Documentation */}
        <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 text-sm font-semibold transition pb-1 cursor-pointer ${
              activeTab === 'preview'
                ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-500'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>Interactive Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-2 text-sm font-semibold transition pb-1 cursor-pointer ${
              activeTab === 'docs'
                ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-500'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Markdown Documentation</span>
          </button>
        </div>

        {activeTab === 'preview' ? (
          <>
            {/* Live Component Canvas */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-10 flex items-center justify-center min-h-[220px] shadow-sm">
              {curr.preview}
            </div>

            {/* Installation Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Installation</span>
                </span>
                <div className="flex gap-1">
                  {(['pnpm', 'npm', 'bun', 'cargo'] as const).map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setInstallPm(pm)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition cursor-pointer ${
                        installPm === pm ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 font-mono text-xs">
                <span className="text-zinc-900 dark:text-zinc-200">{curr.install[installPm]}</span>
                <button
                  onClick={() => copyText(curr.install[installPm])}
                  className="text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition ml-3 cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Code Usage with Prism Highlight */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {(['react', 'rust', 'html'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCodeLang(lang)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                        codeLang === lang
                          ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold'
                          : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      {lang === 'react' && 'React Component'}
                      {lang === 'rust' && 'Pure Rust (silex-ui-core)'}
                      {lang === 'html' && 'HTML Structure'}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => copyText(curr.code[codeLang])}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md transition cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <CodeHighlight code={curr.code[codeLang]} language={codeLang} />
            </div>
          </>
        ) : (
          /* Rendered Markdown Documentation */
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 markdown-body text-zinc-800 dark:text-zinc-200 shadow-sm">
            <ReactMarkdown>{curr.markdownDoc}</ReactMarkdown>
          </div>
        )}
      </main>
    </div>
  );
}

export function App() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-[#09090b] dark:text-[#fafafa] font-sans antialiased selection:bg-orange-500 selection:text-white flex flex-col transition-colors duration-200">
      <NavigationBar isDark={isDark} onToggleTheme={toggle} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/:componentId" element={<DocsPage />} />
      </Routes>
    </div>
  );
}

export default App;
