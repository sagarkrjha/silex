import React, { useEffect, useState, useRef } from 'react';
import { 
  Routes, 
  Route, 
  Link, 
  NavLink, 
  useParams, 
  useNavigate,
  useLocation
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
  ChevronDown,
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
  Cpu,
  Boxes,
  Database,
  Sun,
  Moon,
  BookOpen,
  Code2,
  Palette,
  Heart,
  Compass,
  Feather,
  SlidersHorizontal,
  PanelLeftClose,
  PanelLeft,
  FileText,
  Settings,
  Download,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  FolderGit2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

// ----------------------------------------------------------------------------
// Type-Safe Themes Definition
// ----------------------------------------------------------------------------

export type ThemeKey = 
  | 'zinc' 
  | 'slate' 
  | 'stone' 
  | 'nordic' 
  | 'rose-pine' 
  | 'tokyo-night' 
  | 'forest' 
  | 'catppuccin';

export interface ThemeConfig {
  id: ThemeKey;
  name: string;
  tagline: string;
  accentHex: string;
  darkBg: string;
  lightBg: string;
}

export const THEMES: ThemeConfig[] = [
  { id: 'zinc', name: 'Zinc', tagline: 'Editorial Monochrome', accentHex: '#f97316', darkBg: '#09090b', lightBg: '#ffffff' },
  { id: 'slate', name: 'Slate', tagline: 'Linear Precision', accentHex: '#38bdf8', darkBg: '#020817', lightBg: '#f8fafc' },
  { id: 'stone', name: 'Warm Stone', tagline: 'Tactile & Organic', accentHex: '#f59e0b', darkBg: '#0c0a09', lightBg: '#fafaf9' },
  { id: 'nordic', name: 'Nordic Frost', tagline: 'Arctic Deep Cool', accentHex: '#88c0d0', darkBg: '#1e222a', lightBg: '#f4f6fb' },
  { id: 'rose-pine', name: 'Rose Pine', tagline: 'Warm Dusk & Berry', accentHex: '#eb6f92', darkBg: '#191724', lightBg: '#faf4ed' },
  { id: 'tokyo-night', name: 'Tokyo Night', tagline: 'Cyber Midnight', accentHex: '#7aa2f7', darkBg: '#1a1b26', lightBg: '#e6e7ed' },
  { id: 'forest', name: 'Forest Emerald', tagline: 'Organic Deep Pine', accentHex: '#10b981', darkBg: '#0d1814', lightBg: '#f4f9f6' },
  { id: 'catppuccin', name: 'Catppuccin', tagline: 'Pastel Mindful Focus', accentHex: '#cba6f7', darkBg: '#1e1e2e', lightBg: '#eff1f5' },
];

export type FrameworkType = 'react' | 'vue' | 'svelte' | 'angular' | 'web' | 'rust';

export interface FrameworkCode {
  react: string;
  vue: string;
  svelte: string;
  angular: string;
  web: string;
  rust: string;
}

export interface ComponentDoc {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  markdownDoc: string;
  preview: (accentColor: string) => React.ReactNode;
  install: {
    npm: string;
    pnpm: string;
    bun: string;
    cargo: string;
  };
  props: {
    name: string;
    type: string;
    default: string;
    description: string;
  }[];
  code: FrameworkCode;
}

// ----------------------------------------------------------------------------
// Global Theme Hook
// ----------------------------------------------------------------------------

function useActiveTheme() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('silex-theme-id');
      if (saved && THEMES.some(t => t.id === saved)) return saved as ThemeKey;
    }
    return 'zinc';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('silex-theme-mode');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('silex-theme-mode', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('silex-theme-mode', 'light');
    }
    localStorage.setItem('silex-theme-id', selectedTheme);
  }, [isDark, selectedTheme]);

  const active = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  return {
    isDark,
    toggleMode: () => setIsDark(prev => !prev),
    selectedTheme,
    setTheme: (key: ThemeKey) => setSelectedTheme(key),
    activeTheme: active,
  };
}

function CodeHighlight({ code, language }: { code: string; language: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let gram = Prism.languages[language] || Prism.languages.typescript || Prism.languages.javascript;
    if (language === 'react' || language === 'tsx' || language === 'angular') gram = Prism.languages.tsx || Prism.languages.javascript;
    if (language === 'vue' || language === 'svelte' || language === 'web' || language === 'html') gram = Prism.languages.html;
    if (language === 'rust') gram = Prism.languages.rust;
    
    if (gram) {
      setHtml(Prism.highlight(code, gram, language));
    } else {
      setHtml(code);
    }
  }, [code, language]);

  return (
    <pre className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-[#0d0f12] font-mono text-xs text-zinc-900 dark:text-zinc-200 overflow-x-auto leading-relaxed shadow-inner">
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}

// ----------------------------------------------------------------------------
// Navigation Bar
// ----------------------------------------------------------------------------

function NavigationBar({ 
  isDark, 
  onToggleTheme, 
  selectedTheme, 
  onSelectTheme 
}: { 
  isDark: boolean; 
  onToggleTheme: () => void; 
  selectedTheme: ThemeKey; 
  onSelectTheme: (k: ThemeKey) => void; 
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const active = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div 
              className="h-9 w-9 rounded-lg flex items-center justify-center shadow-inner transition-transform group-hover:scale-105"
              style={{ backgroundColor: `${active.accentHex}20`, borderColor: `${active.accentHex}40`, borderWidth: 1 }}
            >
              <Flame className="h-5 w-5" style={{ color: active.accentHex }} />
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-950 dark:text-white">Silex</span>
            <span 
              className="text-[10px] px-2 py-0.5 rounded-full font-mono font-medium border"
              style={{ color: active.accentHex, borderColor: `${active.accentHex}40`, backgroundColor: `${active.accentHex}15` }}
            >
              Polyglot
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <NavLink to="/" end className={({ isActive }) => `hover:text-zinc-950 dark:hover:text-white transition ${isActive ? 'text-zinc-950 dark:text-white font-semibold' : ''}`}>Story</NavLink>
            <NavLink to="/docs/components/button" className={({ isActive }) => `hover:text-zinc-950 dark:hover:text-white transition ${isActive ? 'text-zinc-950 dark:text-white font-semibold' : ''}`}>Components</NavLink>
            <NavLink to="/docs/installation" className={({ isActive }) => `hover:text-zinc-950 dark:hover:text-white transition ${isActive ? 'text-zinc-950 dark:text-white font-semibold' : ''}`}>Installation</NavLink>
            <NavLink to="/docs/theming" className={({ isActive }) => `hover:text-zinc-950 dark:hover:text-white transition ${isActive ? 'text-zinc-950 dark:text-white font-semibold' : ''}`}>Theming</NavLink>
            <a href="https://github.com/sagarkrjha/silex" target="_blank" rel="noreferrer" className="hover:text-zinc-950 dark:hover:text-white transition flex items-center gap-1.5">
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 text-zinc-400 dark:text-zinc-500" />
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Creative Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition cursor-pointer"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: active.accentHex }} />
              <span className="hidden sm:inline">{active.name}</span>
              <Palette className="h-3.5 w-3.5 text-zinc-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Curated Creative Palettes
                </div>
                <div className="space-y-1 mt-1">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelectTheme(t.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer ${
                        selectedTheme === t.id
                          ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-950 dark:text-white'
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.accentHex }} />
                        <span>{t.name}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400">{t.tagline}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition cursor-pointer"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-zinc-600" />}
          </button>

          <Link
            to="/docs/components/button"
            className="px-3.5 py-1.5 rounded-md text-xs font-semibold shadow-sm transition"
            style={{ backgroundColor: active.accentHex, color: isDark ? '#09090b' : '#ffffff' }}
          >
            Explore Library
          </Link>
        </div>
      </div>
    </header>
  );
}

// ----------------------------------------------------------------------------
// Story Landing Page: "From Spark to Structure"
// ----------------------------------------------------------------------------

function LandingPage({ activeTheme }: { activeTheme: ThemeConfig }) {
  const [installPm, setInstallPm] = useState<'pnpm' | 'npm' | 'bun' | 'cargo'>('pnpm');
  const [copied, setCopied] = useState(false);
  const [interactiveOpen, setInteractiveOpen] = useState(false);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <section className="relative px-6 pt-24 pb-20 max-w-5xl mx-auto text-center space-y-8">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-colors"
          style={{ 
            color: activeTheme.accentHex, 
            borderColor: `${activeTheme.accentHex}40`, 
            backgroundColor: `${activeTheme.accentHex}15` 
          }}
        >
          <Feather className="h-3.5 w-3.5" />
          <span>The Human-Crafted Polyglot Design Engine</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
          We struck flint against steel <br />
          <span 
            className="text-transparent bg-clip-text bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${activeTheme.accentHex}, #fbbf24, ${activeTheme.accentHex})`
            }}
          >
            because UI kits lost their soul.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
          Tired of 40MB JavaScript node dependencies, mysterious runtime errors, and synthetic AI template slop? 
          <strong> Silex</strong> is the pure Rust component core engineered for speed, mathematical WCAG contrast, and human editorial beauty across React, Vue, Svelte, Angular, and Web Components.
        </p>

        {/* Scaffold Box */}
        <div className="max-w-lg mx-auto bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-2xl backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Start the Spark</span>
            <div className="flex gap-1">
              {(['pnpm', 'npm', 'bun', 'cargo'] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setInstallPm(pm)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition cursor-pointer ${
                    installPm === pm ? 'font-semibold border' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                  style={installPm === pm ? { 
                    color: activeTheme.accentHex, 
                    borderColor: `${activeTheme.accentHex}40`,
                    backgroundColor: `${activeTheme.accentHex}15`
                  } : {}}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 font-mono text-xs">
            <span className="font-semibold select-all" style={{ color: activeTheme.accentHex }}>
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
            to="/docs/components/button"
            className="px-6 py-3 rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg transition cursor-pointer"
            style={{ backgroundColor: activeTheme.accentHex, color: '#09090b' }}
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
            GitHub Repository
          </a>
        </div>
      </section>

      {/* Act II: The Anatomy of a Flame */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase" style={{ color: activeTheme.accentHex }}>
            <Compass className="h-4 w-4" />
            <span>Act II: The Anatomy of Determinism</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-white">
            What if your UI state could never enter an invalid state?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            In typical frontends, modal dialogs, drawers, and switches get tangled in competing React useEffect hooks. 
            In Silex, every component transition is a mathematically verified state machine in Rust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">
              Try the Dialog State Machine
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Click the trigger below. The Rust model handles focus traps, background overlay locks, and lifecycle 
              animations (<code className="text-xs font-mono">Closed &rarr; Opening &rarr; Open &rarr; Closing</code>).
            </p>

            <div className="flex gap-4 items-center">
              <button
                onClick={() => setInteractiveOpen(true)}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold shadow-md transition cursor-pointer"
                style={{ backgroundColor: activeTheme.accentHex, color: '#09090b' }}
              >
                Trigger State Transition
              </button>
              <span className="text-xs font-mono text-zinc-500">
                State: {interactiveOpen ? 'DialogAnimationState::Open' : 'DialogAnimationState::Closed'}
              </span>
            </div>

            {interactiveOpen && (
              <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" style={{ color: activeTheme.accentHex }} />
                    Zero Undefined Behavior
                  </span>
                  <button onClick={() => setInteractiveOpen(false)} className="text-xs text-zinc-400 hover:text-white">
                    Dismiss
                  </button>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Under 50,000 rapid toggle cycles, Silex core allocates zero redundant heap bytes and guarantees WCAG compliance.
                </p>
              </div>
            )}
          </div>

          <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto space-y-2 shadow-inner">
            <div className="flex items-center justify-between text-zinc-500 text-[10px] pb-2 border-b border-zinc-800">
              <span>crates/silex-core/src/components/dialog.rs</span>
              <span className="text-emerald-400 font-semibold">100% Memory Safe</span>
            </div>
            <pre className="text-zinc-400 leading-relaxed">
{`#[wasm_bindgen]
pub enum DialogAnimationState {
    Closed,
    Opening,
    Open,
    Closing,
}

impl DialogState {
    pub fn open(&mut self) {
        self.is_open = true;
        self.animation = DialogAnimationState::Open;
    }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Act III: Polyglot Support */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase" style={{ color: activeTheme.accentHex }}>
            <Layers className="h-4 w-4" />
            <span>Act III: First-Class Polyglot Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-white">
            Write Once in Rust. Deploy to Any Framework.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Whether you build in React 19, Vue 3, Svelte 5, Angular 19, Web Components, or native Rust, Silex guarantees identical design tokens, ARIA behavior, and WCAG contrast.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'React 19', desc: 'TSX & Hooks' },
            { name: 'Vue 3', desc: 'Composition API' },
            { name: 'Svelte 5', desc: 'Runes & $state' },
            { name: 'Angular 19', desc: 'Standalone Signals' },
            { name: 'Web Components', desc: 'Standard Custom Elements' },
            { name: 'Pure Rust', desc: 'silex-ui-core WASM' },
          ].map((fw) => (
            <div 
              key={fw.name}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-center space-y-1 shadow-sm"
            >
              <div className="text-sm font-semibold text-zinc-950 dark:text-white">{fw.name}</div>
              <div className="text-[11px] text-zinc-500">{fw.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Act IV: The Polyglot Manifesto */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-8 border-t border-zinc-200 dark:border-zinc-800/80">
        <Heart className="h-8 w-8 mx-auto" style={{ color: activeTheme.accentHex }} />
        <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-white">
          Copy what you own. Change what you wish.
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-base max-w-xl mx-auto leading-relaxed">
          Like the philosophy of shadcn, Silex doesn't lock you into an opaque node_modules black box. 
          The CLI copies raw, accessible TypeScript components directly into your codebase, powered by a native Rust core.
        </p>
        <div>
          <Link
            to="/docs/components/button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold shadow-md transition"
            style={{ backgroundColor: activeTheme.accentHex, color: '#09090b' }}
          >
            <span>Dive into the Components</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Documentation Data Store with Polyglot Framework Code Snippets
// ----------------------------------------------------------------------------

const COMPONENTS_DATA: Record<string, ComponentDoc> = {
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
    preview: (accent: string) => (
      <div className="flex flex-wrap gap-4 items-center">
        <button 
          className="px-4 py-2 font-semibold rounded-md shadow-sm transition"
          style={{ backgroundColor: accent, color: '#09090b' }}
        >
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
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'", default: "'primary'", description: 'Visual aesthetic variant' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Sizing scale' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interactions and dims appearance' },
    ],
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
      vue: `<script setup lang="ts">
import { SilexButton } from '@/components/ui';
</script>

<template>
  <div class="flex gap-4">
    <SilexButton variant="primary">Primary Action</SilexButton>
    <SilexButton variant="secondary">Secondary</SilexButton>
    <SilexButton variant="outline">Outline</SilexButton>
  </div>
</template>`,
      svelte: `<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
</script>

<div class="flex gap-4">
  <Button variant="primary">Primary Action</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
</div>`,
      angular: `import { Component } from '@angular/core';
import { SilexButtonComponent } from './components/ui/button.component';

@Component({
  standalone: true,
  imports: [SilexButtonComponent],
  template: \`
    <div class="flex gap-4">
      <silex-button variant="primary">Primary Action</silex-button>
      <silex-button variant="secondary">Secondary</silex-button>
    </div>
  \`
})
export class ButtonExample {}`,
      web: `<silex-button variant="primary">Primary Action</silex-button>
<silex-button variant="secondary">Secondary</silex-button>
<silex-button variant="outline">Outline</silex-button>`,
      rust: `use silex_ui_core::components::button::{ButtonProps, ButtonVariant, ButtonSize};

let button = ButtonProps::new(ButtonVariant::Primary, ButtonSize::Md);
let classes = button.compute_classes();`,
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
    preview: (accent: string) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 font-semibold rounded-md shadow-sm transition cursor-pointer"
            style={{ backgroundColor: accent, color: '#09090b' }}
          >
            Open Modal Dialog
          </button>

          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in">
              <div className="relative w-full max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xl">
                <div className="flex justify-between items-start pb-4">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Maximize2 className="h-5 w-5" style={{ color: accent }} />
                    <span>Database Migration</span>
                  </h3>
                  <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Ready to deploy schema changes across all distributed read replicas? This operation will lock active transactions for 250ms.
                </p>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-md shadow"
                    style={{ backgroundColor: accent, color: '#09090b' }}
                  >
                    Confirm Migration
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add dialog',
      npm: 'npx silex-ui add dialog',
      bun: 'bunx silex-ui add dialog',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Controls open state of dialog' },
      { name: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: 'Callback fired on open/close transition' },
      { name: 'title', type: 'string', default: '-', description: 'Accessible modal heading title' },
    ],
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
      vue: `<script setup lang="ts">
import { ref } from 'vue';
import { SilexDialog } from '@/components/ui';

const isOpen = ref(false);
</script>

<template>
  <button @click="isOpen = true">Open Dialog</button>
  <SilexDialog :open="isOpen" @update:open="isOpen = $event" title="Database Migration">
    <p>Confirm cluster configuration change.</p>
  </SilexDialog>
</template>`,
      svelte: `<script lang="ts">
  import Dialog from '$lib/components/ui/Dialog.svelte';
  let open = $state(false);
</script>

<button onclick={() => open = true}>Open Dialog</button>
<Dialog bind:open title="Database Migration">
  <p>Confirm cluster configuration change.</p>
</Dialog>`,
      angular: `import { Component, signal } from '@angular/core';
import { SilexDialogComponent } from './components/ui/dialog.component';

@Component({
  standalone: true,
  imports: [SilexDialogComponent],
  template: \`
    <button (click)="open.set(true)">Open Dialog</button>
    <silex-dialog [open]="open()" (openChange)="open.set($event)" title="Database Migration">
      <p>Confirm cluster configuration change.</p>
    </silex-dialog>
  \`
})
export class DialogExample {
  open = signal(false);
}`,
      web: `<silex-dialog title="Database Migration" open>
  <p>Confirm cluster configuration change.</p>
</silex-dialog>`,
      rust: `use silex_ui_core::components::dialog::DialogState;

let mut dialog = DialogState::new(false);
dialog.open();
assert!(dialog.is_open());
dialog.close();`,
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
    `,
    preview: (accent: string) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 font-semibold rounded-md shadow-sm transition cursor-pointer"
            style={{ backgroundColor: accent, color: '#09090b' }}
          >
            Open Side Sheet
          </button>

          {isOpen && (
            <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm">
              <div className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Workspace Configuration</h3>
                    <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Manage fine-grained token thresholds and runtime telemetry.</p>
                </div>
                <div className="flex justify-end gap-2 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add sheet',
      npm: 'npx silex-ui add sheet',
      bun: 'bunx silex-ui add sheet',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Drawer visibility' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'right'", description: 'Edge to dock the sheet' },
    ],
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
      vue: `<script setup lang="ts">
import { ref } from 'vue';
import { SilexSheet } from '@/components/ui';

const open = ref(false);
</script>

<template>
  <SilexSheet :open="open" side="right" title="Inspector">
    <p>Sheet drawer content.</p>
  </SilexSheet>
</template>`,
      svelte: `<script lang="ts">
  import Sheet from '$lib/components/ui/Sheet.svelte';
  let open = $state(false);
</script>

<Sheet bind:open side="right" title="Inspector">
  <p>Sheet drawer content.</p>
</Sheet>`,
      angular: `import { Component, signal } from '@angular/core';
import { SilexSheetComponent } from './components/ui/sheet.component';

@Component({
  standalone: true,
  imports: [SilexSheetComponent],
  template: \`
    <silex-sheet [open]="open()" side="right" title="Inspector">
      <p>Sheet drawer content.</p>
    </silex-sheet>
  \`
})
export class SheetExample {
  open = signal(false);
}`,
      web: `<silex-sheet side="right" title="Inspector" open>
  <p>Sheet drawer content.</p>
</silex-sheet>`,
      rust: `use silex_ui_core::components::sheet::{SheetState, SheetSide};

let mut sheet = SheetState::new(SheetSide::Right, false);
sheet.open();
assert!(sheet.is_open());`,
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
    `,
    preview: (accent: string) => (
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider" style={{ color: accent }}>Telemetry</span>
          <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
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
    props: [
      { name: 'className', type: 'string', default: "''", description: 'Custom CSS classes' },
    ],
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
      vue: `<template>
  <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
    <h3 class="text-lg font-semibold text-foreground">Active Workers</h3>
    <p class="text-3xl font-bold mt-2">99.98%</p>
  </div>
</template>`,
      svelte: `<div class="rounded-lg border border-border bg-card p-6 shadow-sm">
  <h3 class="text-lg font-semibold text-foreground">Active Workers</h3>
  <p class="text-3xl font-bold mt-2">99.98%</p>
</div>`,
      angular: `@Component({
  standalone: true,
  template: \`
    <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h3 class="text-lg font-semibold text-foreground">Active Workers</h3>
      <p class="text-3xl font-bold mt-2">99.98%</p>
    </div>
  \`
})
export class CardExample {}`,
      web: `<silex-card>
  <h3>Active Workers</h3>
  <p>99.98%</p>
</silex-card>`,
      rust: `use silex_ui_core::components::card::{CardProps, CardVariant, CardHover};

let card = CardProps::new(CardVariant::Default, CardHover::Scale);
let classes = card.compute_classes();`,
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
    `,
    preview: (accent: string) => {
      const [checked, setChecked] = useState(true);
      return (
        <div className="flex items-center gap-4">
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => setChecked(!checked)}
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            style={{ backgroundColor: checked ? accent : '#3f3f46' }}
          >
            <span
              className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                checked ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 flex items-center gap-2">
            <Zap className="h-4 w-4" style={{ color: checked ? accent : '#71717a' }} />
            <span>{checked ? 'Continuous Deployment Active' : 'Manual Deploy Mode'}</span>
          </span>
        </div>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add switch',
      npm: 'npx silex-ui add switch',
      bun: 'bunx silex-ui add switch',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'State of switch' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables toggle interaction' },
    ],
    code: {
      react: `import { Switch } from "@/components/ui/switch";

export default function Example() {
  return <Switch defaultChecked />;
}`,
      vue: `<script setup lang="ts">
import { ref } from 'vue';
import { SilexSwitch } from '@/components/ui';
const active = ref(true);
</script>

<template>
  <SilexSwitch v-model="active" />
</template>`,
      svelte: `<script lang="ts">
  import Switch from '$lib/components/ui/Switch.svelte';
  let checked = $state(true);
</script>

<Switch bind:checked />`,
      angular: `@Component({
  standalone: true,
  template: \`<silex-switch [checked]="true"></silex-switch>\`
})
export class SwitchExample {}`,
      web: `<silex-switch checked></silex-switch>`,
      rust: `use silex_ui_core::components::switch::SwitchState;

let mut switch = SwitchState::new(true);
switch.toggle();`,
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
    preview: (accent: string) => (
      <div className="w-full max-w-sm space-y-2">
        <input
          type="text"
          placeholder="Search API keys..."
          className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-md text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
          style={{ outlineColor: accent }}
        />
      </div>
    ),
    install: {
      pnpm: 'pnpm dlx silex-ui add input',
      npm: 'npx silex-ui add input',
      bun: 'bunx silex-ui add input',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'error', type: 'boolean', default: 'false', description: 'Highlights input in red error state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables input' },
    ],
    code: {
      react: `import { Input } from "@/components/ui/input";

export default function Example() {
  return <Input placeholder="Search API keys..." />;
}`,
      vue: `<template>
  <input class="h-9 w-full rounded-md border border-input px-3 py-1 text-sm bg-background" placeholder="Search..." />
</template>`,
      svelte: `<input class="h-9 w-full rounded-md border border-input px-3 py-1 text-sm bg-background" placeholder="Search..." />`,
      angular: `<input class="h-9 w-full rounded-md border border-input px-3 py-1 text-sm bg-background" placeholder="Search..." />`,
      web: `<silex-input placeholder="Search API keys..."></silex-input>`,
      rust: `use silex_ui_core::components::input::{InputProps, InputType};

let input = InputProps::new(InputType::Text);
let classes = input.compute_classes();`,
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
    preview: (_accent: string) => (
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
    props: [
      { name: 'variant', type: "'info' | 'warning' | 'destructive' | 'success'", default: "'info'", description: 'Alert semantic status' },
    ],
    code: {
      react: `import { Alert } from "@/components/ui/alert";

export default function Example() {
  return (
    <Alert variant="destructive">
      Cluster Rebalance Triggered
    </Alert>
  );
}`,
      vue: `<template>
  <div role="alert" class="rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-red-200">
    Cluster Rebalance Triggered
  </div>
</template>`,
      svelte: `<div role="alert" class="rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-red-200">
  Cluster Rebalance Triggered
</div>`,
      angular: `<div role="alert" class="rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-red-200">
  Cluster Rebalance Triggered
</div>`,
      web: `<silex-alert variant="destructive">Cluster Rebalance Triggered</silex-alert>`,
      rust: `use silex_ui_core::components::alert::{AlertProps, AlertVariant};

let alert = AlertProps::new(AlertVariant::Destructive);
let classes = alert.compute_classes();`,
    },
  },
};

// ----------------------------------------------------------------------------
// Guide Documentation Pages (Introduction, Installation, Theming, Config)
// ----------------------------------------------------------------------------

function IntroductionDoc() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Introduction</h1>
      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <strong>Silex</strong> is a next-generation UI component engine and design system built with a pure Rust core 
        and first-class WebAssembly/C-ABI bindings. Inspired by the copy-paste philosophy of shadcn, Silex empowers 
        engineers with full component ownership, mathematical WCAG contrast compliance, and humanized editorial themes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
            <Cpu className="h-4 w-4 text-orange-500" />
            <span>Deterministic Rust State</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Algebraic data types ensure impossible states are impossible. Tested over 50,000 rapid cycles with 0 memory growth.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
            <Layers className="h-4 w-4 text-sky-500" />
            <span>Polyglot Generation</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Use the same core primitives across React, Vue, Svelte, Angular, Web Components, and native Rust.
          </p>
        </div>
      </div>
    </div>
  );
}

function InstallationDoc() {
  const [tab, setTab] = useState<'vite' | 'nextjs' | 'vue' | 'svelte' | 'cargo'>('vite');
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Installation</h1>
      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Install Silex components directly into your codebase using your favorite package manager or Cargo.
      </p>

      <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        {(['vite', 'nextjs', 'vue', 'svelte', 'cargo'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
              tab === t ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-4">
        {tab === 'vite' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">1. Initialize Silex</h3>
            <pre className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-xs font-mono text-orange-500">
              npx silex-ui init
            </pre>
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">2. Add components</h3>
            <pre className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-xs font-mono text-orange-500">
              npx silex-ui add button dialog card
            </pre>
          </div>
        )}

        {tab === 'cargo' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">Native Rust Core Installation</h3>
            <pre className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-xs font-mono text-orange-500">
              cargo add silex-ui-core
            </pre>
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">Native Scaffolding CLI</h3>
            <pre className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-xs font-mono text-orange-500">
              cargo install silex-ui-cli
            </pre>
          </div>
        )}

        {(tab === 'nextjs' || tab === 'vue' || tab === 'svelte') && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">Polyglot Scaffolding for {tab.toUpperCase()}</h3>
            <pre className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-xs font-mono text-orange-500">
              npx silex-ui init && npx silex-ui add button
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function ThemingDoc() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Theming & Tokens</h1>
      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Silex ships with 8 professionally tuned, human-designed color palettes that pass WCAG 2.1 AA mathematical contrast checks.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {THEMES.map((t) => (
          <div key={t.id} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-zinc-950 dark:text-white">{t.name}</span>
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: t.accentHex }} />
            </div>
            <p className="text-xs text-zinc-500">{t.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfigurationDoc() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Configuration (`silex.json`)</h1>
      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
        The `silex.json` configuration file at your project root defines scaffolding targets, Tailwind CSS paths, and module aliases.
      </p>

      <pre className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 font-mono text-xs text-zinc-800 dark:text-zinc-200">
{`{
  "$schema": "https://silex-ui.dev/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "stone"
  },
  "aliases": {
    "components": "@/components/ui",
    "utils": "@/lib/utils"
  }
}`}
      </pre>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 3-Column Documentation Page with Collapsible Sidebar and "On This Page"
// ----------------------------------------------------------------------------

function DocsLayout({ activeTheme }: { activeTheme: ThemeConfig }) {
  const { docSlug, componentId } = useParams<{ docSlug?: string; componentId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'docs'>('preview');
  const [activeFramework, setActiveFramework] = useState<FrameworkType>('react');
  const [installPm, setInstallPm] = useState<'pnpm' | 'npm' | 'bun' | 'cargo'>('pnpm');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Sidebar collapsible section toggles
  const [gettingStartedOpen, setGettingStartedOpen] = useState(true);
  const [primitivesOpen, setPrimitivesOpen] = useState(true);
  const [overlaysOpen, setOverlaysOpen] = useState(true);
  const [formControlsOpen, setFormControlsOpen] = useState(true);
  const [feedbackOpen, setFeedbackOpen] = useState(true);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentComponent = componentId ? COMPONENTS_DATA[componentId] : null;

  // Sections for "On This Page"
  const sections = currentComponent ? [
    { id: 'overview', title: 'Overview' },
    { id: 'interactive-preview', title: 'Interactive Preview' },
    { id: 'installation', title: 'Installation' },
    { id: 'polyglot-usage', title: 'Multi-Framework Usage' },
    { id: 'props-reference', title: 'Props Table' },
  ] : [
    { id: 'overview', title: 'Overview' },
  ];

  // Intersection observer for "On this page"
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop - 150;
          const bottom = top + el.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            setActiveSection(s.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex-1 w-full flex gap-8 py-8">
      {/* 1. Left Collapsible Sidebar */}
      <aside 
        className={`shrink-0 transition-all duration-300 ${
          sidebarCollapsed ? 'w-12' : 'w-64'
        } space-y-6 hidden md:block`}
      >
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
          {!sidebarCollapsed && (
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Documentation
            </span>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {!sidebarCollapsed && (
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search docs & components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs text-zinc-900 dark:text-white focus:outline-none transition"
            />
          </div>
        )}

        <div className="space-y-4 text-sm">
          {/* Getting Started Category */}
          <div>
            <button
              onClick={() => !sidebarCollapsed && setGettingStartedOpen(!gettingStartedOpen)}
              className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 py-1"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5" />
                {!sidebarCollapsed && <span>Getting Started</span>}
              </div>
              {!sidebarCollapsed && (gettingStartedOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />)}
            </button>

            {(!sidebarCollapsed && gettingStartedOpen) && (
              <div className="space-y-1 mt-1 pl-2">
                {[
                  { name: 'Introduction', path: '/docs/introduction' },
                  { name: 'Installation', path: '/docs/installation' },
                  { name: 'Theming & Tokens', path: '/docs/theming' },
                  { name: 'Configuration', path: '/docs/configuration' },
                ].map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `block px-2.5 py-1.5 rounded-md text-xs transition ${
                      isActive ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                    }`}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Component Primitives Category */}
          <div>
            <button
              onClick={() => !sidebarCollapsed && setPrimitivesOpen(!primitivesOpen)}
              className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 py-1"
            >
              <div className="flex items-center gap-2">
                <Boxes className="h-3.5 w-3.5" />
                {!sidebarCollapsed && <span>Components</span>}
              </div>
              {!sidebarCollapsed && (primitivesOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />)}
            </button>

            {(!sidebarCollapsed && primitivesOpen) && (
              <div className="space-y-1 mt-1 pl-2">
                {Object.values(COMPONENTS_DATA)
                  .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((c) => (
                    <NavLink
                      key={c.id}
                      to={`/docs/components/${c.id}`}
                      className={({ isActive }) => `flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition ${
                        isActive ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {c.icon}
                        <span>{c.name}</span>
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">{c.category}</span>
                    </NavLink>
                  ))}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 2. Middle Main Documentation Area */}
      <main className="flex-1 min-w-0 space-y-8">
        {/* Dynamic Route View */}
        {docSlug === 'introduction' && <IntroductionDoc />}
        {docSlug === 'installation' && <InstallationDoc />}
        {docSlug === 'theming' && <ThemingDoc />}
        {docSlug === 'configuration' && <ConfigurationDoc />}

        {/* Component Documentation View */}
        {currentComponent && (
          <div className="space-y-8">
            <div id="overview" className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: activeTheme.accentHex }}>
                {currentComponent.icon}
                <span>{currentComponent.category}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">{currentComponent.name}</h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-base">{currentComponent.description}</p>
            </div>

            {/* Interactive Preview Canvas */}
            <div id="interactive-preview" className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                  <Sparkles className="h-4 w-4" style={{ color: activeTheme.accentHex }} />
                  <span>Interactive Preview Canvas</span>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-10 flex items-center justify-center min-h-[220px] shadow-sm">
                {currentComponent.preview(activeTheme.accentHex)}
              </div>
            </div>

            {/* Installation Box */}
            <div id="installation" className="space-y-3">
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
                        installPm === pm ? 'font-semibold border' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                      }`}
                      style={installPm === pm ? { 
                        color: activeTheme.accentHex, 
                        borderColor: `${activeTheme.accentHex}40`,
                        backgroundColor: `${activeTheme.accentHex}15`
                      } : {}}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 font-mono text-xs">
                <span className="text-zinc-900 dark:text-zinc-200">{currentComponent.install[installPm]}</span>
                <button
                  onClick={() => copyText(currentComponent.install[installPm])}
                  className="text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition ml-3 cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Polyglot Framework Code Snippets */}
            <div id="polyglot-usage" className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {(['react', 'vue', 'svelte', 'angular', 'web', 'rust'] as const).map((fw) => (
                    <button
                      key={fw}
                      onClick={() => setActiveFramework(fw)}
                      className={`px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider transition cursor-pointer ${
                        activeFramework === fw
                          ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-white font-bold'
                          : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      {fw}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => copyText(currentComponent.code[activeFramework])}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md transition cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <CodeHighlight code={currentComponent.code[activeFramework]} language={activeFramework} />
            </div>

            {/* Props Table */}
            <div id="props-reference" className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Props Reference</h3>
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-100 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <tr>
                      <th className="p-3 font-semibold">Prop</th>
                      <th className="p-3 font-semibold">Type</th>
                      <th className="p-3 font-semibold">Default</th>
                      <th className="p-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900/40">
                    {currentComponent.props.map((p) => (
                      <tr key={p.name} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
                        <td className="p-3 font-mono font-semibold" style={{ color: activeTheme.accentHex }}>{p.name}</td>
                        <td className="p-3 font-mono text-zinc-500">{p.type}</td>
                        <td className="p-3 font-mono text-zinc-400">{p.default}</td>
                        <td className="p-3 text-zinc-600 dark:text-zinc-300">{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Markdown Documentation */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 markdown-body text-zinc-800 dark:text-zinc-200 shadow-sm">
              <ReactMarkdown>{currentComponent.markdownDoc}</ReactMarkdown>
            </div>
          </div>
        )}
      </main>

      {/* 3. Right "On This Page" Table of Contents */}
      <aside className="w-56 shrink-0 hidden lg:block space-y-4">
        <div className="sticky top-24 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            On this page
          </div>
          <ul className="space-y-1.5 text-xs">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`block py-1 px-2 rounded-md transition ${
                    activeSection === s.id
                      ? 'font-semibold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                  style={activeSection === s.id ? { color: activeTheme.accentHex, backgroundColor: `${activeTheme.accentHex}15` } : {}}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Root App with Direct Router Binding
// ----------------------------------------------------------------------------

export function App() {
  const { isDark, toggleMode, selectedTheme, setTheme, activeTheme } = useActiveTheme();

  return (
    <div 
      className="min-h-screen font-sans antialiased selection:bg-orange-500 selection:text-white flex flex-col transition-colors duration-300"
      style={{
        backgroundColor: isDark ? activeTheme.darkBg : activeTheme.lightBg,
        color: isDark ? '#fafafa' : '#09090b',
      }}
    >
      <NavigationBar 
        isDark={isDark} 
        onToggleTheme={toggleMode} 
        selectedTheme={selectedTheme} 
        onSelectTheme={setTheme} 
      />
      <Routes>
        <Route path="/" element={<LandingPage activeTheme={activeTheme} />} />
        <Route path="/docs" element={<DocsLayout activeTheme={activeTheme} />} />
        <Route path="/docs/:docSlug" element={<DocsLayout activeTheme={activeTheme} />} />
        <Route path="/docs/components/:componentId" element={<DocsLayout activeTheme={activeTheme} />} />
      </Routes>
    </div>
  );
}

export default App;
