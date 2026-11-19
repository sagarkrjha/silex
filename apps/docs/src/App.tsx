import React, { useState } from 'react';
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
  Database
} from 'lucide-react';

interface ComponentDoc {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
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

function NavigationBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Silex</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono font-medium">Rust-First</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <NavLink to="/" end className={({ isActive }) => `hover:text-white transition ${isActive ? 'text-white' : ''}`}>Overview</NavLink>
            <NavLink to="/docs" className={({ isActive }) => `hover:text-white transition ${isActive ? 'text-white' : ''}`}>Components</NavLink>
            <a href="https://github.com/sagarkrjha/silex" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1.5">
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 text-zinc-500" />
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/docs/button"
            className="px-3.5 py-1.5 rounded-md bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition"
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium">
          <Zap className="h-3.5 w-3.5" /> Polyglot Component Architecture: Rust • TS • WASM
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
          The Native Rust Engine for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
            Modern Component Systems
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed">
          Engineered with the humanized aesthetics of modern UI design, powered by a pure Rust state engine. 
          Zero client runtime bloat, accessible by default, and scaffolded in seconds.
        </p>

        <div className="max-w-lg mx-auto bg-zinc-900/90 border border-zinc-800 rounded-xl p-3 shadow-xl backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Scaffold Instantly</span>
            <div className="flex gap-1">
              {(['pnpm', 'npm', 'bun', 'cargo'] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setInstallPm(pm)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition cursor-pointer ${
                    installPm === pm ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between bg-zinc-950 px-3.5 py-2.5 rounded-lg border border-zinc-800 font-mono text-xs text-zinc-200">
            <span>
              {installPm === 'pnpm' && 'pnpm dlx silex-cli init'}
              {installPm === 'npm' && 'npx silex-cli init'}
              {installPm === 'bun' && 'bunx silex-cli init'}
              {installPm === 'cargo' && 'cargo install silex-cli && silex init'}
            </span>
            <button
              onClick={() => copyText(
                installPm === 'pnpm' ? 'pnpm dlx silex-cli init' :
                installPm === 'npm' ? 'npx silex-cli init' :
                installPm === 'bun' ? 'bunx silex-cli init' :
                'cargo install silex-cli && silex init'
              )}
              className="text-zinc-500 hover:text-white cursor-pointer ml-3"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/docs/button"
            className="px-6 py-3 rounded-md bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition flex items-center gap-2 shadow-lg shadow-white/5"
          >
            <span>Browse Components</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/docs"
            className="px-6 py-3 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold text-sm hover:bg-zinc-800 transition flex items-center gap-2"
          >
            <Terminal className="h-4 w-4 text-orange-500" />
            <span>Documentation Index</span>
          </Link>
        </div>
      </section>

      <section className="border-t border-zinc-800/80 bg-zinc-950/40 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Pure Rust Determinism</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every state transition, modal backdrop lifecycle, and WCAG contrast check executes in compiled Rust. Zero unexpected JS edge cases.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Globe2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Polyglot by Design</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Use Silex components in React 19, Next.js, Vue, Svelte, or native Rust desktop apps. Seamless bindings via wasm-bindgen and C-ABI.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Humanized Color Palettes</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Carefully tuned Zinc, Slate, and Warm Stone palettes that avoid synthetic oversaturation and prioritize long-session eye comfort.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function DocsPage() {
  const { componentId } = useParams();
  const navigate = useNavigate();

  const [installPm, setInstallPm] = useState<'pnpm' | 'npm' | 'bun' | 'cargo'>('pnpm');
  const [codeLang, setCodeLang] = useState<'react' | 'rust' | 'html'>('react');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Interactive component states
  const [switchOn, setSwitchOn] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<number | null>(0);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const components: Record<string, ComponentDoc> = {
    button: {
      id: 'button',
      name: 'Button',
      category: 'General',
      icon: <MousePointerClick className="h-4 w-4" />,
      description: 'Interactive button with multiple visual variants, sizes, loading indicators, and tactile feedback.',
      preview: (
        <div className="flex flex-wrap items-center gap-4">
          <button className="h-9 px-4 py-2 bg-zinc-100 text-zinc-900 font-medium text-sm rounded-md shadow hover:bg-zinc-200 transition active:scale-95 cursor-pointer flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-orange-600" />
            <span>Primary Action</span>
          </button>
          <button className="h-9 px-4 py-2 bg-zinc-800 text-zinc-100 font-medium text-sm rounded-md shadow-sm hover:bg-zinc-700 transition active:scale-95 cursor-pointer">
            Secondary
          </button>
          <button className="h-9 px-4 py-2 border border-zinc-700 text-zinc-100 font-medium text-sm rounded-md hover:bg-zinc-800 transition active:scale-95 cursor-pointer">
            Outline
          </button>
          <button className="h-9 px-4 py-2 bg-red-700 text-zinc-100 font-medium text-sm rounded-md shadow-sm hover:bg-red-600 transition active:scale-95 cursor-pointer">
            Destructive
          </button>
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-cli add button',
        npm: 'npx silex-cli add button',
        bun: 'bunx silex-cli add button',
        cargo: 'cargo add silex-core --features button',
      },
      code: {
        react: `import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <Button variant="default" size="default">
      Primary Action
    </Button>
  );
}`,
        rust: `use silex_core::{ButtonProps, ButtonVariant, ButtonSize};

let button = ButtonProps::new(ButtonVariant::Primary, ButtonSize::Md);
let html = button.render_html("Primary Action");`,
        html: `<button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-9 px-4 py-2">
  Primary Action
</button>`,
      },
    },
    dialog: {
      id: 'dialog',
      name: 'Dialog',
      category: 'Overlay',
      icon: <Maximize2 className="h-4 w-4" />,
      description: 'Modal window with backdrop overlay and state management for critical interactions.',
      preview: (
        <div className="w-full flex justify-center">
          <button
            onClick={() => setDialogOpen(true)}
            className="h-9 px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md border border-zinc-700 text-sm font-medium hover:bg-zinc-700 transition cursor-pointer flex items-center gap-2"
          >
            <Maximize2 className="h-3.5 w-3.5 text-zinc-400" />
            <span>Open Modal Dialog</span>
          </button>

          {dialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <div className="relative w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl space-y-4">
                <div className="flex items-center gap-2 text-orange-400 font-semibold text-sm">
                  <Database className="h-4 w-4" />
                  <span>Database Cluster Settings</span>
                </div>
                <p className="text-sm text-zinc-400">Configure automated failover thresholds and replicas.</p>
                <div className="space-y-3 py-2">
                  <label className="text-xs font-medium text-zinc-300">Target Region</label>
                  <input type="text" defaultValue="eu-central-1 (Frankfurt)" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white" />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                  <button onClick={() => setDialogOpen(false)} className="px-3 py-1.5 rounded-md border border-zinc-700 text-xs text-zinc-300 hover:bg-zinc-800 cursor-pointer">Cancel</button>
                  <button onClick={() => setDialogOpen(false)} className="px-3 py-1.5 rounded-md bg-orange-600 text-white text-xs font-medium hover:bg-orange-500 cursor-pointer">Save Changes</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-cli add dialog',
        npm: 'npx silex-cli add dialog',
        bun: 'bunx silex-cli add dialog',
        cargo: 'cargo add silex-core --features dialog',
      },
      code: {
        react: `import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}`,
        rust: `use silex_core::{DialogState, DialogAnimationState};

let mut dialog = DialogState::new(false);
dialog.open();
assert!(dialog.is_open());`,
        html: `<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
  <div class="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl">
    <h3 class="text-lg font-semibold text-card-foreground">Dialog Title</h3>
  </div>
</div>`,
      },
    },
    sheet: {
      id: 'sheet',
      name: 'Sheet',
      category: 'Overlay',
      icon: <PanelRightClose className="h-4 w-4" />,
      description: 'Extends dialog to display content that complements the screen, anchored to any screen edge.',
      preview: (
        <div className="w-full flex justify-center">
          <button
            onClick={() => setSheetOpen(true)}
            className="h-9 px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md border border-zinc-700 text-sm font-medium hover:bg-zinc-700 transition cursor-pointer flex items-center gap-2"
          >
            <PanelRightClose className="h-3.5 w-3.5 text-zinc-400" />
            <span>Open Side Sheet</span>
          </button>

          {sheetOpen && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
              <div className="w-full max-w-sm h-full border-l border-zinc-800 bg-zinc-900 p-6 shadow-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-semibold text-white">
                      <Server className="h-4 w-4 text-orange-400" />
                      <span>Application Drawer</span>
                    </div>
                    <button onClick={() => setSheetOpen(false)} className="text-zinc-400 hover:text-white cursor-pointer"><X className="h-4 w-4" /></button>
                  </div>
                  <p className="text-sm text-zinc-400">Pure Rust state controlled slide-out sheet supporting top, right, bottom, and left anchor positions.</p>
                </div>
                <button onClick={() => setSheetOpen(false)} className="w-full py-2 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-white cursor-pointer">Close Drawer</button>
              </div>
            </div>
          )}
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-cli add sheet',
        npm: 'npx silex-cli add sheet',
        bun: 'bunx silex-cli add sheet',
        cargo: 'cargo add silex-core --features sheet',
      },
      code: {
        react: `import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Example() {
  return (
    <Sheet>
      <SheetTrigger>Open Drawer</SheetTrigger>
      <SheetContent side="right">Drawer content</SheetContent>
    </Sheet>
  );
}`,
        rust: `use silex_core::{SheetState, SheetSide};

let mut sheet = SheetState::new(SheetSide::Right, false);
sheet.open();`,
        html: `<div class="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-card p-6 shadow-xl">
  Content
</div>`,
      },
    },
    card: {
      id: 'card',
      name: 'Card',
      category: 'Layout',
      icon: <SquareCode className="h-4 w-4" />,
      description: 'Displays structured cards with elevation, header titles, and semantic sections.',
      preview: (
        <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-sm hover:border-zinc-700 transition">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5" />
              <span>Observability</span>
            </span>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">Healthy</span>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100">Telemetry Gateway</h3>
          <p className="text-sm text-zinc-400 mt-1">Collecting OTLP metrics at 14,200 traces/sec with zero loss.</p>
          <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Kernel: 6.8.0-rust</span>
            <span>0.02% error</span>
          </div>
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-cli add card',
        npm: 'npx silex-cli add card',
        bun: 'bunx silex-cli add card',
        cargo: 'cargo add silex-core --features card',
      },
      code: {
        react: `import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
    </Card>
  );
}`,
        rust: `use silex_core::{CardProps, CardVariant, CardHover};

let card = CardProps::new(CardVariant::Default, CardHover::Scale);
let classes = card.compute_classes();`,
        html: `<div class="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6">
  Content
</div>`,
      },
    },
    input: {
      id: 'input',
      name: 'Input',
      category: 'Forms',
      icon: <TextCursorInput className="h-4 w-4" />,
      description: 'Displays a form input field or a component that looks like an input field.',
      preview: (
        <div className="w-full max-w-sm space-y-2">
          <label className="text-sm font-medium text-zinc-300 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-zinc-400" />
            <span>API Token</span>
          </label>
          <input
            type="text"
            readOnly
            value="slx_live_948af20b8ecf"
            className="flex h-9 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1 text-sm font-mono text-zinc-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-cli add input',
        npm: 'npx silex-cli add input',
        bun: 'bunx silex-cli add input',
        cargo: 'cargo add silex-core --features input',
      },
      code: {
        react: `import { Input } from "@/components/ui/input";

export default function Example() {
  return <Input type="text" placeholder="Enter text..." />;
}`,
        rust: `use silex_core::{InputProps, InputType};

let input = InputProps::new(InputType::Text);
let classes = input.compute_classes();`,
        html: `<input class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" />`,
      },
    },
    switch: {
      id: 'switch',
      name: 'Switch',
      category: 'Forms',
      icon: <ToggleLeft className="h-4 w-4" />,
      description: 'A control that allows the user to toggle between checked and not checked.',
      preview: (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSwitchOn(!switchOn)}
            className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
              switchOn ? 'bg-orange-600' : 'bg-zinc-800'
            }`}
          >
            <span
              className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                switchOn ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-sm font-medium text-zinc-200 flex items-center gap-2">
            <Zap className={`h-4 w-4 ${switchOn ? 'text-orange-400' : 'text-zinc-600'}`} />
            <span>{switchOn ? 'Continuous Deployment Active' : 'Manual Deploy Mode'}</span>
          </span>
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-cli add switch',
        npm: 'npx silex-cli add switch',
        bun: 'bunx silex-cli add switch',
        cargo: 'cargo add silex-core --features switch',
      },
      code: {
        react: `import { Switch } from "@/components/ui/switch";

export default function Example() {
  return <Switch defaultChecked />;
}`,
        rust: `use silex_core::SwitchState;

let mut switch = SwitchState::new(true);
switch.toggle();`,
        html: `<button role="switch" class="inline-flex h-6 w-11 rounded-full bg-primary">
  <span class="block h-5 w-5 rounded-full bg-background"></span>
</button>`,
      },
    },
    separator: {
      id: 'separator',
      name: 'Separator',
      category: 'Layout',
      icon: <Split className="h-4 w-4" />,
      description: 'Visually or semantically separates content.',
      preview: (
        <div className="w-full max-w-sm space-y-3">
          <h4 className="text-sm font-medium text-white flex items-center gap-2">
            <Boxes className="h-4 w-4 text-orange-400" />
            <span>Silex Architecture</span>
          </h4>
          <div className="h-[1px] w-full bg-zinc-800" />
          <div className="flex items-center space-x-4 text-xs text-zinc-400">
            <span>Rust Core</span>
            <div className="h-4 w-[1px] bg-zinc-800" />
            <span>WASM FFI</span>
            <div className="h-4 w-[1px] bg-zinc-800" />
            <span>React UI</span>
          </div>
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-cli add separator',
        npm: 'npx silex-cli add separator',
        bun: 'bunx silex-cli add separator',
        cargo: 'cargo add silex-core --features separator',
      },
      code: {
        react: `import { Separator } from "@/components/ui/separator";

export default function Example() {
  return <Separator orientation="horizontal" />;
}`,
        rust: `use silex_core::{SeparatorProps, SeparatorOrientation};

let sep = SeparatorProps::new(SeparatorOrientation::Horizontal);
let classes = sep.compute_classes();`,
        html: `<div class="shrink-0 bg-border h-[1px] w-full"></div>`,
      },
    },
    badge: {
      id: 'badge',
      name: 'Badge',
      category: 'Data Display',
      icon: <Tag className="h-4 w-4" />,
      description: 'Status indicator tags and numerical chips.',
      preview: (
        <div className="flex flex-wrap gap-3 items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-900">Default</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-200">Secondary</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-zinc-700 text-zinc-200">Outline</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">Ember</span>
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-cli add badge',
        npm: 'npx silex-cli add badge',
        bun: 'bunx silex-cli add badge',
        cargo: 'cargo add silex-core --features badge',
      },
      code: {
        react: `import { Badge } from "@/components/ui/badge";

export default function Example() {
  return <Badge variant="outline">Enterprise</Badge>;
}`,
        rust: `use silex_core::{BadgeProps, BadgeVariant};

let badge = BadgeProps::new(BadgeVariant::Primary);`,
        html: `<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">
  Badge
</span>`,
      },
    },
    accordion: {
      id: 'accordion',
      name: 'Accordion',
      category: 'Layout',
      icon: <ListCollapse className="h-4 w-4" />,
      description: 'Vertically stacked disclosure sections with accessible keyboard navigation.',
      preview: (
        <div className="w-full max-w-md rounded-lg border border-zinc-800 divide-y divide-zinc-800 bg-zinc-900/40">
          {[
            { q: 'Is Silex framework-independent?', a: 'Yes. The core state machines and CSS class calculators are compiled in pure Rust and accessible via native crates or WASM bindings.' },
            { q: 'How does package manager support work?', a: 'Silex detects whether you are using pnpm, bun, npm, or Cargo, and automatically adapts dependencies.' },
          ].map((item, idx) => (
            <div key={idx} className="px-4 py-3">
              <button
                onClick={() => setAccordionOpen(accordionOpen === idx ? null : idx)}
                className="flex w-full items-center justify-between text-sm font-medium text-zinc-200 text-left cursor-pointer"
              >
                <span>{item.q}</span>
                <span className="text-zinc-500">{accordionOpen === idx ? '−' : '+'}</span>
              </button>
              {accordionOpen === idx && (
                <p className="pt-2 text-xs text-zinc-400">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-cli add accordion',
        npm: 'npx silex-cli add accordion',
        bun: 'bunx silex-cli add accordion',
        cargo: 'cargo add silex-core --features accordion',
      },
      code: {
        react: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
        rust: `use silex_core::{AccordionState, AccordionType};

let mut acc = AccordionState::new(AccordionType::Single);
acc.toggle("item-1");`,
        html: `<div class="divide-y divide-border border rounded-md">...</div>`,
      },
    },
    alert: {
      id: 'alert',
      name: 'Alert',
      category: 'Feedback',
      icon: <AlertTriangle className="h-4 w-4" />,
      description: 'Displays a callout for user attention with semantic icons and status styling.',
      preview: (
        <div className="w-full max-w-md rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-red-300 space-y-1">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span>Cluster Rebalance Triggered</span>
          </div>
          <p className="text-xs text-red-300/80 pl-6">Worker node eu-west-1a was drained for kernel upgrades.</p>
        </div>
      ),
      install: {
        pnpm: 'pnpm dlx silex-cli add alert',
        npm: 'npx silex-cli add alert',
        bun: 'bunx silex-cli add alert',
        cargo: 'cargo add silex-core --features alert',
      },
      code: {
        react: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Example() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Cluster Rebalance Triggered</AlertTitle>
      <AlertDescription>Worker node eu-west-1a was drained.</AlertDescription>
    </Alert>
  );
}`,
        rust: `use silex_core::{AlertProps, AlertVariant};

let alert = AlertProps::new(AlertVariant::Destructive);
let classes = alert.compute_classes();`,
        html: `<div class="relative w-full rounded-lg border border-destructive/50 p-4 text-destructive">
  <h5>Alert</h5>
</div>`,
      },
    },
  };

  const selectedKey = componentId && components[componentId] ? componentId : 'button';
  const curr = components[selectedKey];

  return (
    <div className="max-w-7xl mx-auto px-6 flex-1 w-full grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 py-8">
      <aside className="space-y-6">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Filter components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-white focus:outline-none focus:border-zinc-700"
          />
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">All Components</h4>
          <div className="space-y-1 font-medium text-sm">
            {Object.keys(components)
              .filter((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((k) => (
                <button
                  key={k}
                  onClick={() => navigate(`/docs/${k}`)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition cursor-pointer flex items-center justify-between ${
                    selectedKey === k
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={selectedKey === k ? 'text-orange-400' : 'text-zinc-500'}>{components[k].icon}</span>
                    <span>{components[k].name}</span>
                  </span>
                  {selectedKey === k && <ChevronRight className="h-3.5 w-3.5 text-orange-400" />}
                </button>
              ))}
          </div>
        </div>
      </aside>

      <main className="space-y-8">
        <div>
          <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            {curr.icon}
            <span>{curr.category}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{curr.name}</h1>
          <p className="text-zinc-400 text-base mt-2">{curr.description}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Interactive Preview</span>
            <span className="text-xs text-zinc-500 font-mono">Tailwind CSS v4</span>
          </div>
          <div className="min-h-[220px] rounded-xl border border-zinc-800 bg-zinc-950 p-8 flex items-center justify-center shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            <div className="relative z-10 w-full flex justify-center">{curr.preview}</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Installation</span>
            <div className="flex gap-1">
              {(['pnpm', 'npm', 'bun', 'cargo'] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setInstallPm(pm)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition cursor-pointer ${
                    installPm === pm ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between bg-zinc-900 px-4 py-2.5 rounded-lg border border-zinc-800 font-mono text-xs text-zinc-200">
            <span>{curr.install[installPm]}</span>
            <button onClick={() => copyText(curr.install[installPm])} className="text-zinc-400 hover:text-white cursor-pointer ml-3">
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900 border border-zinc-800">
              <button
                onClick={() => setCodeLang('react')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  codeLang === 'react' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                React (TypeScript)
              </button>
              <button
                onClick={() => setCodeLang('rust')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  codeLang === 'rust' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Pure Rust (silex-core)
              </button>
              <button
                onClick={() => setCodeLang('html')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  codeLang === 'html' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                HTML Output
              </button>
            </div>
            <button
              onClick={() => copyText(curr.code[codeLang])}
              className="flex items-center gap-1.5 px-3 py-1 text-xs text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-md transition cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 font-mono text-xs text-zinc-300 overflow-x-auto">
            <code>{curr.code[codeLang]}</code>
          </pre>
        </div>
      </main>
    </div>
  );
}

export function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans antialiased selection:bg-orange-500 selection:text-white flex flex-col">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/:componentId" element={<DocsPage />} />
      </Routes>
    </div>
  );
}

export default App;
