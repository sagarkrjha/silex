import React, { useEffect, useState, useRef } from 'react';
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
  Boxes,
  Sun,
  Moon,
  Sparkles,
  Palette,
  Heart,
  Compass,
  Feather,
  PanelLeftClose,
  PanelLeft,
  FileText,
  AlertTriangle,
  Cpu,
  BadgeAlert,
  Minus,
  Menu,
  MessageSquare,
  User,
  CheckSquare,
  AlignLeft,
  Table as TableIcon,
  BarChart2,
  Loader2,
  ChevronRightSquare,
  Sliders,
  CheckCircle2,
  ListFilter,
  Layers as TabsIcon,
  HelpCircle,
  Scale
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

// ----------------------------------------------------------------------------
// Type-Safe Themes Definition (Solid Colors, Zero Gradients)
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

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  bg: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accentText: string;
}

export interface ThemeConfig {
  id: ThemeKey;
  name: string;
  tagline: string;
  accentHex: string;
  accentTextHex: string;
  darkBg: string;
  lightBg: string;
  darkSurface: string;
  lightSurface: string;
  darkBorder: string;
  lightBorder: string;
  darkText: string;
  lightText: string;
  darkTextMuted: string;
  lightTextMuted: string;
}

export const THEMES: ThemeConfig[] = [
  { 
    id: 'zinc', 
    name: 'Zinc', 
    tagline: 'Editorial Monochrome', 
    accentHex: '#f97316', 
    accentTextHex: '#09090b',
    darkBg: '#09090b', 
    lightBg: '#f8fafc',
    darkSurface: '#121215',
    lightSurface: '#f1f5f9',
    darkBorder: '#27272a',
    lightBorder: '#e2e8f0',
    darkText: '#fafafa',
    lightText: '#0f172a',
    darkTextMuted: '#a1a1aa',
    lightTextMuted: '#475569'
  },
  { 
    id: 'slate', 
    name: 'Slate', 
    tagline: 'Linear Precision', 
    accentHex: '#0284c7', 
    accentTextHex: '#ffffff',
    darkBg: '#020817', 
    lightBg: '#f8fafc',
    darkSurface: '#0f172a',
    lightSurface: '#f1f5f9',
    darkBorder: '#1e293b',
    lightBorder: '#e2e8f0',
    darkText: '#f8fafc',
    lightText: '#0f172a',
    darkTextMuted: '#94a3b8',
    lightTextMuted: '#475569'
  },
  { 
    id: 'stone', 
    name: 'Warm Stone', 
    tagline: 'Tactile & Organic', 
    accentHex: '#b45309', 
    accentTextHex: '#ffffff',
    darkBg: '#0c0a09', 
    lightBg: '#fafaf9',
    darkSurface: '#1c1917',
    lightSurface: '#f5f5f4',
    darkBorder: '#292524',
    lightBorder: '#e7e5e4',
    darkText: '#fafaf9',
    lightText: '#1c1917',
    darkTextMuted: '#a8a29e',
    lightTextMuted: '#57534e'
  },
  { 
    id: 'nordic', 
    name: 'Nordic Frost', 
    tagline: 'Arctic Deep Cool', 
    accentHex: '#5e81ac', 
    accentTextHex: '#ffffff',
    darkBg: '#1e222a', 
    lightBg: '#f4f6fb',
    darkSurface: '#242933',
    lightSurface: '#e5e9f0',
    darkBorder: '#3b4252',
    lightBorder: '#d8dee9',
    darkText: '#eceff4',
    lightText: '#2e3440',
    darkTextMuted: '#d8dee9',
    lightTextMuted: '#4c566a'
  },
  { 
    id: 'rose-pine', 
    name: 'Rose Pine', 
    tagline: 'Warm Dusk & Berry', 
    accentHex: '#b4637a', 
    accentTextHex: '#ffffff',
    darkBg: '#191724', 
    lightBg: '#faf4ed',
    darkSurface: '#1f1d2e',
    lightSurface: '#f2e9de',
    darkBorder: '#26233a',
    lightBorder: '#cecacd',
    darkText: '#e0def4',
    lightText: '#575279',
    darkTextMuted: '#908caa',
    lightTextMuted: '#797593'
  },
  { 
    id: 'tokyo-night', 
    name: 'Tokyo Night', 
    tagline: 'Cyber Midnight', 
    accentHex: '#3b82f6', 
    accentTextHex: '#ffffff',
    darkBg: '#1a1b26', 
    lightBg: '#f0f2f7',
    darkSurface: '#24283b',
    lightSurface: '#e2e5ee',
    darkBorder: '#292e42',
    lightBorder: '#c4c8d4',
    darkText: '#c0caf5',
    lightText: '#1f2335',
    darkTextMuted: '#7aa2f7',
    lightTextMuted: '#565a6e'
  },
  { 
    id: 'forest', 
    name: 'Forest Emerald', 
    tagline: 'Organic Deep Pine', 
    accentHex: '#059669', 
    accentTextHex: '#ffffff',
    darkBg: '#0d1814', 
    lightBg: '#f4f9f6',
    darkSurface: '#14251e',
    lightSurface: '#e2ede8',
    darkBorder: '#1d362c',
    lightBorder: '#cfe2d7',
    darkText: '#e2ede8',
    lightText: '#132a21',
    darkTextMuted: '#84a99b',
    lightTextMuted: '#4d6b5e'
  },
  { 
    id: 'catppuccin', 
    name: 'Catppuccin', 
    tagline: 'Pastel Mindful Focus', 
    accentHex: '#8839ef', 
    accentTextHex: '#ffffff',
    darkBg: '#1e1e2e', 
    lightBg: '#eff1f5',
    darkSurface: '#181825',
    lightSurface: '#e6e9ef',
    darkBorder: '#313244',
    lightBorder: '#ccd0da',
    darkText: '#cdd6f4',
    lightText: '#4c4f69',
    darkTextMuted: '#a6adc8',
    lightTextMuted: '#7c7f93'
  },
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
  preview: (accentColor: string, accentTextColor: string) => React.ReactNode;
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
// Global Theme Hook with HTML Class & CSS Custom Property Sync
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

  const active = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.setProperty('--bg-page', active.darkBg);
      root.style.setProperty('--text-page', active.darkText);
      root.style.setProperty('--text-muted', active.darkTextMuted);
      root.style.setProperty('--border-subtle', active.darkBorder);
      root.style.setProperty('--card-surface', active.darkSurface);
      localStorage.setItem('silex-theme-mode', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--bg-page', active.lightBg);
      root.style.setProperty('--text-page', active.lightText);
      root.style.setProperty('--text-muted', active.lightTextMuted);
      root.style.setProperty('--border-subtle', active.lightBorder);
      root.style.setProperty('--card-surface', active.lightSurface);
      localStorage.setItem('silex-theme-mode', 'light');
    }
    localStorage.setItem('silex-theme-id', selectedTheme);
  }, [isDark, selectedTheme, active]);

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
  onSelectTheme,
  mobileNavOpen,
  onToggleMobileNav
}: { 
  isDark: boolean; 
  onToggleTheme: () => void; 
  selectedTheme: ThemeKey; 
  onSelectTheme: (k: ThemeKey) => void; 
  mobileNavOpen: boolean;
  onToggleMobileNav: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const active = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Mobile navigation hamburger toggle */}
          <button
            type="button"
            onClick={onToggleMobileNav}
            aria-label={mobileNavOpen ? "Close mobile menu" : "Open mobile menu"}
            className="md:hidden p-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group" aria-label="Silex Home">
            <div 
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:scale-105"
              style={{ backgroundColor: active.accentHex, color: active.accentTextHex }}
            >
              <Flame className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-950 dark:text-white">Silex</span>
            <span 
              className="hidden xs:inline-block text-[10px] px-2 py-0.5 rounded-full font-mono font-medium border"
              style={{ color: active.accentHex, borderColor: active.accentHex }}
            >
              Polyglot
            </span>
          </Link>
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <NavLink to="/" end className={({ isActive }) => `hover:text-zinc-950 dark:hover:text-white transition ${isActive ? 'text-zinc-950 dark:text-white font-semibold' : ''}`}>Story</NavLink>
            <NavLink to="/docs/components/button" className={({ isActive }) => `hover:text-zinc-950 dark:hover:text-white transition ${isActive ? 'text-zinc-950 dark:text-white font-semibold' : ''}`}>Components</NavLink>
            <NavLink to="/docs/comparison" className={({ isActive }) => `hover:text-zinc-950 dark:hover:text-white transition ${isActive ? 'text-zinc-950 dark:text-white font-semibold' : ''}`}>vs shadcn</NavLink>
            <NavLink to="/docs/installation" className={({ isActive }) => `hover:text-zinc-950 dark:hover:text-white transition ${isActive ? 'text-zinc-950 dark:text-white font-semibold' : ''}`}>Installation</NavLink>
            <NavLink to="/docs/theming" className={({ isActive }) => `hover:text-zinc-950 dark:hover:text-white transition ${isActive ? 'text-zinc-950 dark:text-white font-semibold' : ''}`}>Theming</NavLink>
            <a href="https://github.com/sagarkrjha/silex" target="_blank" rel="noreferrer" className="hover:text-zinc-950 dark:hover:text-white transition flex items-center gap-1.5">
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 text-zinc-400 dark:text-zinc-500" />
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Creative Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Select Palette Theme"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-500 transition cursor-pointer"
            >
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: active.accentHex }} />
              <span className="hidden sm:inline">{active.name}</span>
              <Palette className="h-3.5 w-3.5 text-zinc-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-2xl z-50">
                <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Solid Creative Palettes
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
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition cursor-pointer"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-zinc-600" />}
          </button>

          <Link
            to="/docs/components/button"
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-md text-xs font-semibold shadow-sm transition"
            style={{ backgroundColor: active.accentHex, color: active.accentTextHex }}
          >
            Explore Library
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium">
            <NavLink 
              to="/" 
              end 
              onClick={onToggleMobileNav}
              className={({ isActive }) => `px-3 py-2 rounded-lg transition ${isActive ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              Story
            </NavLink>
            <NavLink 
              to="/docs/components/button" 
              onClick={onToggleMobileNav}
              className={({ isActive }) => `px-3 py-2 rounded-lg transition ${isActive ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              Components
            </NavLink>
            <NavLink 
              to="/docs/comparison" 
              onClick={onToggleMobileNav}
              className={({ isActive }) => `px-3 py-2 rounded-lg transition ${isActive ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              Silex vs. shadcn
            </NavLink>
            <NavLink 
              to="/docs/installation" 
              onClick={onToggleMobileNav}
              className={({ isActive }) => `px-3 py-2 rounded-lg transition ${isActive ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              Installation
            </NavLink>
            <NavLink 
              to="/docs/theming" 
              onClick={onToggleMobileNav}
              className={({ isActive }) => `px-3 py-2 rounded-lg transition ${isActive ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              Theming
            </NavLink>
            <a 
              href="https://github.com/sagarkrjha/silex" 
              target="_blank" 
              rel="noreferrer" 
              className="px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between"
            >
              <span>GitHub</span>
              <ExternalLink className="h-4 w-4 text-zinc-400" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ----------------------------------------------------------------------------
// Landing Page (Zero Gradients, Bold Editorial Design)
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
      <section className="relative px-4 sm:px-6 pt-16 sm:pt-24 pb-14 sm:pb-20 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border"
          style={{ 
            color: activeTheme.accentHex, 
            borderColor: activeTheme.accentHex
          }}
        >
          <Feather className="h-3.5 w-3.5" />
          <span>The Human-Crafted Polyglot Design Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.15] sm:leading-[1.1]">
          We struck flint against steel <br className="hidden sm:inline" />
          <span style={{ color: activeTheme.accentHex }}>
            because UI kits lost their soul.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal px-2">
          Tired of 40MB JavaScript node dependencies, mysterious runtime errors, and synthetic AI template slop? 
          <strong> Silex</strong> is the pure Rust component core engineered for speed, mathematical WCAG contrast, and human editorial beauty across React, Vue, Svelte, Angular, and Web Components.
        </p>

        {/* Scaffold Box */}
        <div className="max-w-lg mx-auto bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl p-3 shadow-sm space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Start the Spark</span>
            <div className="flex gap-1">
              {(['pnpm', 'npm', 'bun', 'cargo'] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setInstallPm(pm)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition cursor-pointer ${
                    installPm === pm ? 'font-bold border' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                  style={installPm === pm ? { 
                    color: activeTheme.accentHex, 
                    borderColor: activeTheme.accentHex
                  } : {}}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-950 px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 font-mono text-xs">
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
              aria-label="Copy Command"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition ml-3"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
          <Link
            to="/docs/components/button"
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
            style={{ backgroundColor: activeTheme.accentHex, color: activeTheme.accentTextHex }}
          >
            <span>Explore Documentation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com/sagarkrjha/silex"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-800 font-semibold text-sm flex items-center justify-center transition"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 p-8 shadow-sm">
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
                style={{ backgroundColor: activeTheme.accentHex, color: activeTheme.accentTextHex }}
              >
                Trigger State Transition
              </button>
              <span className="text-xs font-mono text-zinc-500">
                State: {interactiveOpen ? 'DialogAnimationState::Open' : 'DialogAnimationState::Closed'}
              </span>
            </div>

            {interactiveOpen && (
              <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" style={{ color: activeTheme.accentHex }} />
                    Zero Undefined Behavior
                  </span>
                  <button onClick={() => setInteractiveOpen(false)} aria-label="Dismiss message" className="text-xs text-zinc-400 hover:text-white">
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
              className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center space-y-1 shadow-sm"
            >
              <div className="text-sm font-semibold text-zinc-950 dark:text-white">{fw.name}</div>
              <div className="text-[11px] text-zinc-500">{fw.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Act IV: The Polyglot Manifesto */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-8 border-t border-zinc-300 dark:border-zinc-800">
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
            style={{ backgroundColor: activeTheme.accentHex, color: activeTheme.accentTextHex }}
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
// Type-Safe Component Data Store (Strict Types for TS Demos)
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
    preview: (accent: string, accentText: string) => (
      <div className="flex flex-wrap gap-4 items-center">
        <button 
          type="button"
          aria-label="Primary Action"
          className="px-4 py-2 font-semibold rounded-md shadow-sm transition"
          style={{ backgroundColor: accent, color: accentText }}
        >
          Primary Action
        </button>
        <button type="button" aria-label="Secondary" className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-md transition">
          Secondary
        </button>
        <button type="button" aria-label="Outline" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-md transition">
          Outline
        </button>
        <button type="button" aria-label="Destructive" className="px-4 py-2 bg-red-900/40 hover:bg-red-800/60 text-red-700 dark:text-red-200 border border-red-500/30 rounded-md transition">
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
      react: `import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

export interface ButtonDemoProps {
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Example: React.FC<ButtonDemoProps> = ({ onAction }): React.ReactElement => {
  return (
    <div className="flex gap-4">
      <Button variant="primary" onClick={onAction}>
        Primary Action
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
};

export default Example;`,
      vue: `<script setup lang="ts">
import { SilexButton } from '@/components/ui';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
}

defineProps<Props>();
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
  
  interface Props {
    variant?: 'primary' | 'secondary' | 'outline';
  }
  let { variant = 'primary' }: Props = $props();
</script>

<div class="flex gap-4">
  <Button {variant}>Primary Action</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
</div>`,
      angular: `import { Component, input } from '@angular/core';
import { SilexButtonComponent } from './components/ui/button.component';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

@Component({
  standalone: true,
  imports: [SilexButtonComponent],
  template: \`
    <div class="flex gap-4">
      <silex-button [variant]="variant()">Primary Action</silex-button>
      <silex-button variant="secondary">Secondary</silex-button>
    </div>
  \`
})
export class ButtonExample {
  variant = input<ButtonVariant>('primary');
}`,
      web: `<silex-button variant="primary">Primary Action</silex-button>
<silex-button variant="secondary">Secondary</silex-button>
<silex-button variant="outline">Outline</silex-button>`,
      rust: `use silex_ui_core::components::button::{ButtonProps, ButtonVariant, ButtonSize};

let button: ButtonProps = ButtonProps::new(ButtonVariant::Primary, ButtonSize::Md);
let classes: String = button.compute_classes();`,
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
    preview: (accent: string, accentText: string) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div>
          <button
            type="button"
            aria-label="Open Modal Dialog"
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 font-semibold rounded-md shadow-sm transition cursor-pointer"
            style={{ backgroundColor: accent, color: accentText }}
          >
            Open Modal Dialog
          </button>

          {isOpen && (
            <div role="dialog" aria-modal="true" aria-labelledby="modal-heading" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70">
              <div className="relative w-full max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xl">
                <div className="flex justify-between items-start pb-4">
                  <h3 id="modal-heading" className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Maximize2 className="h-5 w-5" style={{ color: accent }} />
                    <span>Database Migration</span>
                  </h3>
                  <button type="button" aria-label="Close Dialog" onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Ready to deploy schema changes across all distributed read replicas? This operation will lock active transactions for 250ms.
                </p>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-md shadow"
                    style={{ backgroundColor: accent, color: accentText }}
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
      react: `import React, { useState } from "react";
import { Dialog, type DialogProps } from "@/components/ui/dialog";

export interface DialogDemoProps {
  initialOpen?: boolean;
}

export const Example: React.FC<DialogDemoProps> = ({ initialOpen = false }): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(initialOpen);

  return (
    <Dialog 
      open={open} 
      onOpenChange={(nextState: boolean) => setOpen(nextState)} 
      title="Database Migration"
    >
      <p className="text-sm text-zinc-400">Confirm cluster configuration change.</p>
    </Dialog>
  );
};

export default Example;`,
      vue: `<script setup lang="ts">
import { ref } from 'vue';
import { SilexDialog } from '@/components/ui';

const isOpen = ref<boolean>(false);
const handleStateChange = (state: boolean): void => {
  isOpen.value = state;
};
</script>

<template>
  <button type="button" @click="isOpen = true">Open Dialog</button>
  <SilexDialog :open="isOpen" @update:open="handleStateChange" title="Database Migration">
    <p>Confirm cluster configuration change.</p>
  </SilexDialog>
</template>`,
      svelte: `<script lang="ts">
  import Dialog from '$lib/components/ui/Dialog.svelte';
  let open: boolean = $state(false);
</script>

<button type="button" onclick={() => open = true}>Open Dialog</button>
<Dialog bind:open title="Database Migration">
  <p>Confirm cluster configuration change.</p>
</Dialog>`,
      angular: `import { Component, signal, WritableSignal } from '@angular/core';
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
  open: WritableSignal<boolean> = signal(false);
}`,
      web: `<silex-dialog title="Database Migration" open>
  <p>Confirm cluster configuration change.</p>
</silex-dialog>`,
      rust: `use silex_ui_core::components::dialog::DialogState;

let mut dialog: DialogState = DialogState::new(false);
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
    preview: (accent: string, accentText: string) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div>
          <button
            type="button"
            aria-label="Open Side Sheet"
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 font-semibold rounded-md shadow-sm transition cursor-pointer"
            style={{ backgroundColor: accent, color: accentText }}
          >
            Open Side Sheet
          </button>

          {isOpen && (
            <div role="dialog" aria-modal="true" aria-labelledby="sheet-heading" className="fixed inset-0 z-50 bg-zinc-950/70">
              <div className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 id="sheet-heading" className="text-lg font-semibold text-zinc-950 dark:text-white">Workspace Configuration</h3>
                    <button type="button" aria-label="Close Sheet" onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Manage fine-grained token thresholds and runtime telemetry.</p>
                </div>
                <div className="flex justify-end gap-2 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    type="button"
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
      react: `import React, { useState } from "react";
import { Sheet, type SheetProps } from "@/components/ui/sheet";

export interface SheetDemoProps {
  side?: "right" | "left" | "top" | "bottom";
}

export const Example: React.FC<SheetDemoProps> = ({ side = "right" }): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Sheet 
      open={open} 
      onOpenChange={(nextState: boolean) => setOpen(nextState)} 
      side={side} 
      title="Inspector"
    >
      <p className="text-sm text-zinc-400">Sheet drawer content.</p>
    </Sheet>
  );
};

export default Example;`,
      vue: `<script setup lang="ts">
import { ref } from 'vue';
import { SilexSheet } from '@/components/ui';

const open = ref<boolean>(false);
</script>

<template>
  <SilexSheet :open="open" side="right" title="Inspector">
    <p>Sheet drawer content.</p>
  </SilexSheet>
</template>`,
      svelte: `<script lang="ts">
  import Sheet from '$lib/components/ui/Sheet.svelte';
  let open: boolean = $state(false);
</script>

<Sheet bind:open side="right" title="Inspector">
  <p>Sheet drawer content.</p>
</Sheet>`,
      angular: `import { Component, signal, WritableSignal } from '@angular/core';
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
  open: WritableSignal<boolean> = signal(false);
}`,
      web: `<silex-sheet side="right" title="Inspector" open>
  <p>Sheet drawer content.</p>
</silex-sheet>`,
      rust: `use silex_ui_core::components::sheet::{SheetState, SheetSide};

let mut sheet: SheetState = SheetState::new(SheetSide::Right, false);
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
      <div className="w-full max-w-sm rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: accent }}>Telemetry</span>
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
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
      react: `import React from "react";
import { Card, CardHeader, CardTitle, CardContent, type CardProps } from "@/components/ui/card";

export interface MetricCardProps extends CardProps {
  title: string;
  value: string;
}

export const Example: React.FC<MetricCardProps> = ({ title, value, ...props }): React.ReactElement => {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};

export default Example;`,
      vue: `<script setup lang="ts">
interface CardProps {
  title: string;
  value: string;
}
defineProps<CardProps>();
</script>

<template>
  <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
    <h3 class="text-lg font-semibold text-foreground">{{ title }}</h3>
    <p class="text-3xl font-bold mt-2">{{ value }}</p>
  </div>
</template>`,
      svelte: `<script lang="ts">
  interface Props {
    title: string;
    value: string;
  }
  let { title, value }: Props = $props();
</script>

<div class="rounded-lg border border-border bg-card p-6 shadow-sm">
  <h3 class="text-lg font-semibold text-foreground">{title}</h3>
  <p class="text-3xl font-bold mt-2">{value}</p>
</div>`,
      angular: `import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  template: \`
    <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h3 class="text-lg font-semibold text-foreground">{{ title() }}</h3>
      <p class="text-3xl font-bold mt-2">{{ value() }}</p>
    </div>
  \`
})
export class CardExample {
  title = input<string>('Active Workers');
  value = input<string>('99.98%');
}`,
      web: `<silex-card>
  <h3>Active Workers</h3>
  <p>99.98%</p>
</silex-card>`,
      rust: `use silex_ui_core::components::card::{CardProps, CardVariant, CardHover};

let card: CardProps = CardProps::new(CardVariant::Default, CardHover::Scale);
let classes: String = card.compute_classes();`,
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
            aria-label="Continuous Deployment Toggle"
            onClick={() => setChecked(!checked)}
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            style={{ backgroundColor: checked ? accent : '#52525b' }}
          >
            <span
              className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform ${
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
      react: `import React, { useState } from "react";
import { Switch, type SwitchProps } from "@/components/ui/switch";

export interface SwitchDemoProps {
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Example: React.FC<SwitchDemoProps> = ({ defaultChecked = false, onCheckedChange }): React.ReactElement => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const handleChange = (next: boolean) => {
    setChecked(next);
    onCheckedChange?.(next);
  };

  return <Switch checked={checked} onCheckedChange={handleChange} />;
};

export default Example;`,
      vue: `<script setup lang="ts">
import { ref } from 'vue';
import { SilexSwitch } from '@/components/ui';

const active = ref<boolean>(true);
</script>

<template>
  <SilexSwitch v-model="active" />
</template>`,
      svelte: `<script lang="ts">
  import Switch from '$lib/components/ui/Switch.svelte';
  let checked: boolean = $state(true);
</script>

<Switch bind:checked />`,
      angular: `import { Component, signal, WritableSignal } from '@angular/core';
import { SilexSwitchComponent } from './components/ui/switch.component';

@Component({
  standalone: true,
  imports: [SilexSwitchComponent],
  template: \`<silex-switch [checked]="checked()" (checkedChange)="checked.set($event)"></silex-switch>\`
})
export class SwitchExample {
  checked: WritableSignal<boolean> = signal(true);
}`,
      web: `<silex-switch checked></silex-switch>`,
      rust: `use silex_ui_core::components::switch::SwitchState;

let mut switch: SwitchState = SwitchState::new(true);
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
        <label htmlFor="api-key-input" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          API Key
        </label>
        <input
          id="api-key-input"
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
      react: `import React from "react";
import { Input, type InputProps } from "@/components/ui/input";

export interface SearchInputProps extends InputProps {
  onSearchChange?: (value: string) => void;
}

export const Example: React.FC<SearchInputProps> = ({ onSearchChange, ...props }): React.ReactElement => {
  return (
    <Input 
      placeholder="Search API keys..." 
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange?.(e.target.value)}
      {...props} 
    />
  );
};

export default Example;`,
      vue: `<template>
  <input class="h-9 w-full rounded-md border border-input px-3 py-1 text-sm bg-background" placeholder="Search..." />
</template>`,
      svelte: `<input class="h-9 w-full rounded-md border border-input px-3 py-1 text-sm bg-background" placeholder="Search..." />`,
      angular: `<input class="h-9 w-full rounded-md border border-input px-3 py-1 text-sm bg-background" placeholder="Search..." />`,
      web: `<silex-input placeholder="Search API keys..."></silex-input>`,
      rust: `use silex_ui_core::components::input::{InputProps, InputType};

let input: InputProps = InputProps::new(InputType::Text);
let classes: String = input.compute_classes();`,
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
      <div role="alert" className="w-full max-w-md rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-700 dark:text-red-300 space-y-1">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <span>Cluster Rebalance Triggered</span>
        </div>
        <p className="text-xs text-red-600 dark:text-red-300 pl-6">Worker node eu-west-1a was drained for kernel upgrades.</p>
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
      react: `import React from "react";
import { Alert, type AlertProps } from "@/components/ui/alert";

export interface AlertNotificationProps extends AlertProps {
  title: string;
  message: string;
}

export const Example: React.FC<AlertNotificationProps> = ({ title, message, variant = "destructive" }): React.ReactElement => {
  return (
    <Alert variant={variant}>
      <h5 className="font-semibold">{title}</h5>
      <p className="text-xs">{message}</p>
    </Alert>
  );
};

export default Example;`,
      vue: `<template>
  <div role="alert" class="rounded-lg border border-red-900 bg-red-950 p-4 text-red-200">
    Cluster Rebalance Triggered
  </div>
</template>`,
      svelte: `<div role="alert" class="rounded-lg border border-red-900 bg-red-950 p-4 text-red-200">
  Cluster Rebalance Triggered
</div>`,
      angular: `<div role="alert" class="rounded-lg border border-red-900 bg-red-950 p-4 text-red-200">
  Cluster Rebalance Triggered
</div>`,
      web: `<silex-alert variant="destructive">Cluster Rebalance Triggered</silex-alert>`,
      rust: `use silex_ui_core::components::alert::{AlertProps, AlertVariant};

let alert: AlertProps = AlertProps::new(AlertVariant::Destructive);
let classes: String = alert.compute_classes();`,
    },
  },

  badge: {
    id: 'badge',
    name: 'Badge',
    category: 'Primitives',
    icon: <BadgeAlert className="h-4 w-4" />,
    description: 'Compact status indicators and numerical highlight badges.',
    markdownDoc: `
### Overview
The **Badge** component highlights state, count, or categorical tags. Verified by \`BadgeProps\` in \`silex-ui-core\`.
    `,
    preview: (accent: string, accentText: string) => (
      <div className="flex flex-wrap gap-3 items-center">
        <span 
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{ backgroundColor: accent, color: accentText }}
        >
          Primary Badge
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700">
          Secondary
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
          Outline
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
          Operational
        </span>
      </div>
    ),
    install: {
      pnpm: 'pnpm dlx silex-ui add badge',
      npm: 'npx silex-ui add badge',
      bun: 'bunx silex-ui add badge',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'destructive'", default: "'primary'", description: 'Aesthetic status styling' },
    ],
    code: {
      react: `import React from "react";
import { Badge, type BadgeProps } from "@/components/ui/badge";

export interface StatusBadgeProps extends BadgeProps {
  label: string;
}

export const Example: React.FC<StatusBadgeProps> = ({ label = "Active" }): React.ReactElement => {
  return <Badge variant="primary">{label}</Badge>;
};`,
      vue: `<template>
  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold">Active</span>
</template>`,
      svelte: `<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold">Active</span>`,
      angular: `<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold">Active</span>`,
      web: `<silex-badge variant="primary">Active</silex-badge>`,
      rust: `use silex_ui_core::components::badge::{BadgeProps, BadgeVariant};

let badge: BadgeProps = BadgeProps::new(BadgeVariant::Primary);
let classes: String = badge.compute_classes();`,
    },
  },

  separator: {
    id: 'separator',
    name: 'Separator',
    category: 'Layout',
    icon: <Minus className="h-4 w-4" />,
    description: 'Visual divider with orientation support conforming to ARIA separator role.',
    markdownDoc: `
### Overview
The **Separator** component visually or semantically divides content in both horizontal and vertical orientations.
    `,
    preview: () => (
      <div className="w-full max-w-sm space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">Silex Design System</h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">High performance polyglot component primitives.</p>
        </div>
        <div role="separator" aria-orientation="horizontal" className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex h-5 items-center space-x-4 text-xs text-zinc-700 dark:text-zinc-300">
          <span>Docs</span>
          <div role="separator" aria-orientation="vertical" className="h-full w-[1px] bg-zinc-200 dark:bg-zinc-800" />
          <span>Source</span>
          <div role="separator" aria-orientation="vertical" className="h-full w-[1px] bg-zinc-200 dark:bg-zinc-800" />
          <span>Changelog</span>
        </div>
      </div>
    ),
    install: {
      pnpm: 'pnpm dlx silex-ui add separator',
      npm: 'npx silex-ui add separator',
      bun: 'bunx silex-ui add separator',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Axis orientation of the divider' },
    ],
    code: {
      react: `import React from "react";
import { Separator } from "@/components/ui/separator";

export const Example: React.FC = (): React.ReactElement => {
  return (
    <div className="space-y-4">
      <p className="text-sm">Above separator</p>
      <Separator orientation="horizontal" />
      <p className="text-sm">Below separator</p>
    </div>
  );
};`,
      vue: `<template>
  <div role="separator" class="h-[1px] w-full bg-border" />
</template>`,
      svelte: `<div role="separator" class="h-[1px] w-full bg-border"></div>`,
      angular: `<div role="separator" class="h-[1px] w-full bg-border"></div>`,
      web: `<silex-separator orientation="horizontal"></silex-separator>`,
      rust: `use silex_ui_core::components::separator::{SeparatorProps, SeparatorOrientation};

let sep: SeparatorProps = SeparatorProps::new(SeparatorOrientation::Horizontal);
let classes: String = sep.compute_classes();`,
    },
  },

  accordion: {
    id: 'accordion',
    name: 'Accordion',
    category: 'Surfaces',
    icon: <ChevronRightSquare className="h-4 w-4" />,
    description: 'Vertically stacked interactive disclosure headings with expandable panels.',
    markdownDoc: `
### Overview
The **Accordion** component organizes content into collapsible panels, backed by the verified \`AccordionState\` state machine in \`silex-ui-core\`.
    `,
    preview: (accent: string) => {
      const [openItem, setOpenItem] = useState<string | null>('item-1');
      return (
        <div className="w-full max-w-md border border-zinc-200 dark:border-zinc-800 rounded-lg divide-y divide-zinc-200 dark:divide-zinc-800">
          {[
            { id: 'item-1', title: 'What is Silex UI?', content: 'Silex is a native Rust-powered UI engine and polyglot component library with guaranteed WCAG contrast.' },
            { id: 'item-2', title: 'How does theme switching work?', content: 'Tokens are compiled to solid contrast variables dynamically without layout shift or eye fatigue.' },
          ].map((item) => (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-4 text-sm font-medium text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition"
              >
                <span>{item.title}</span>
                <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${openItem === item.id ? 'rotate-180' : ''}`} style={openItem === item.id ? { color: accent } : {}} />
              </button>
              {openItem === item.id && (
                <div className="p-4 pt-0 text-xs text-zinc-600 dark:text-zinc-400">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add accordion',
      npm: 'npx silex-ui add accordion',
      bun: 'bunx silex-ui add accordion',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Determines whether one or multiple items can be expanded' },
    ],
    code: {
      react: `import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const Example: React.FC = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Silex?</AccordionTrigger>
        <AccordionContent>A native Rust-powered component engine.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};`,
      vue: `<template>
  <Accordion type="single">
    <AccordionItem value="item-1">
      <AccordionTrigger>What is Silex?</AccordionTrigger>
      <AccordionContent>A native Rust-powered component engine.</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>`,
      svelte: `<Accordion type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Silex?</AccordionTrigger>
    <AccordionContent>A native Rust-powered component engine.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      angular: `<silex-accordion type="single">
  <silex-accordion-item title="What is Silex?">A native Rust-powered component engine.</silex-accordion-item>
</silex-accordion>`,
      web: `<silex-accordion type="single">
  <silex-accordion-item title="What is Silex?">A native Rust-powered component engine.</silex-accordion-item>
</silex-accordion>`,
      rust: `use silex_ui_core::{AccordionState, AccordionType};

let mut acc = AccordionState::new(AccordionType::Single);
acc.toggle("item-1");
assert!(acc.is_open("item-1"));`,
    },
  },

  tooltip: {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Overlays',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'Popup element displaying contextual information when a trigger receives focus or hover.',
    markdownDoc: `
### Overview
The **Tooltip** component surfaces informative hints with zero runtime layout shift, managed via \`TooltipState\` in \`silex-ui-core\`.
    `,
    preview: (accent: string, accentText: string) => {
      const [visible, setVisible] = useState(false);
      return (
        <div className="relative inline-block">
          <button
            type="button"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            aria-describedby="tooltip-demo"
            className="px-4 py-2 text-xs font-semibold rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            Hover or Focus Me
          </button>
          {visible && (
            <div
              id="tooltip-demo"
              role="tooltip"
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs rounded-md shadow-lg z-50 whitespace-nowrap animate-in fade-in-0 zoom-in-95"
              style={{ backgroundColor: accent, color: accentText }}
            >
              Instant Rust-evaluated tooltip
            </div>
          )}
        </div>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add tooltip',
      npm: 'npx silex-ui add tooltip',
      bun: 'bunx silex-ui add tooltip',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Preferred direction of the tooltip popup' },
      { name: 'delayMs', type: 'number', default: '200', description: 'Delay before revealing the tooltip' },
    ],
    code: {
      react: `import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const Example: React.FC = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button">Hover</button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Instant Rust-evaluated tooltip</p>
      </TooltipContent>
    </Tooltip>
  );
};`,
      vue: `<template>
  <Tooltip side="top">
    <template #trigger><button type="button">Hover</button></template>
    <p>Instant Rust-evaluated tooltip</p>
  </Tooltip>
</template>`,
      svelte: `<Tooltip side="top">
  {#snippet trigger()}<button type="button">Hover</button>{/snippet}
  <p>Instant Rust-evaluated tooltip</p>
</Tooltip>`,
      angular: `<silex-tooltip content="Instant Rust-evaluated tooltip" side="top">
  <button type="button">Hover</button>
</silex-tooltip>`,
      web: `<silex-tooltip content="Instant Rust-evaluated tooltip" side="top">
  <button type="button">Hover</button>
</silex-tooltip>`,
      rust: `use silex_ui_core::components::tooltip::{TooltipState, TooltipSide};

let mut tip = TooltipState::new(TooltipSide::Top);
tip.show();
assert!(tip.is_open());`,
    },
  },

  avatar: {
    id: 'avatar',
    name: 'Avatar',
    category: 'Primitives',
    icon: <User className="h-4 w-4" />,
    description: 'Image element with fallback initials representing a user or organization.',
    markdownDoc: `
### Overview
The **Avatar** component renders a profile image with graceful fallback to user initials, conforming to WCAG contrast standards.
    `,
    preview: (accent: string, accentText: string) => (
      <div className="flex gap-4 items-center">
        <div 
          className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm select-none border border-zinc-200 dark:border-zinc-800"
          style={{ backgroundColor: accent, color: accentText }}
        >
          SX
        </div>
        <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-700 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 select-none">
          JD
        </div>
        <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-300 dark:border-zinc-800 select-none">
          <User className="h-5 w-5" />
        </div>
      </div>
    ),
    install: {
      pnpm: 'pnpm dlx silex-ui add avatar',
      npm: 'npx silex-ui add avatar',
      bun: 'bunx silex-ui add avatar',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Dimensions of the avatar container' },
      { name: 'fallback', type: 'string', default: "''", description: 'Initials or label shown when image fails or is absent' },
    ],
    code: {
      react: `import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Example: React.FC = () => {
  return (
    <Avatar>
      <AvatarImage src="/avatar.png" alt="@silex" />
      <AvatarFallback>SX</AvatarFallback>
    </Avatar>
  );
};`,
      vue: `<template>
  <Avatar src="/avatar.png" fallback="SX" />
</template>`,
      svelte: `<Avatar src="/avatar.png" fallback="SX" />`,
      angular: `<silex-avatar src="/avatar.png" fallback="SX"></silex-avatar>`,
      web: `<silex-avatar src="/avatar.png" fallback="SX"></silex-avatar>`,
      rust: `use silex_ui_core::components::avatar::{AvatarProps, AvatarSize};

let avatar = AvatarProps::new(AvatarSize::Md);
let classes = avatar.compute_classes();`,
    },
  },

  checkbox: {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Form Controls',
    icon: <CheckSquare className="h-4 w-4" />,
    description: 'Control that allows the user to toggle between checked and unchecked options.',
    markdownDoc: `
### Overview
The **Checkbox** component provides an accessible binary or indeterminate selection trigger conforming to WAI-ARIA checkbox specification.
    `,
    preview: (accent: string, accentText: string) => {
      const [checked, setChecked] = useState(true);
      return (
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div
            role="checkbox"
            aria-checked={checked}
            tabIndex={0}
            onClick={() => setChecked(!checked)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setChecked(!checked);
              }
            }}
            className="h-5 w-5 rounded border flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: checked ? accent : 'transparent',
              borderColor: checked ? accent : '#a1a1aa',
              color: accentText,
            }}
          >
            {checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
          </div>
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Accept terms and continuous delivery agreement
          </span>
        </label>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add checkbox',
      npm: 'npx silex-ui add checkbox',
      bun: 'bunx silex-ui add checkbox',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Controlled checked state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction' },
    ],
    code: {
      react: `import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const Example: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={agreed} onCheckedChange={(val) => setAgreed(!!val)} />
      <label htmlFor="terms">Accept terms and conditions</label>
    </div>
  );
};`,
      vue: `<template>
  <label><Checkbox v-model="agreed" /> Accept terms</label>
</template>`,
      svelte: `<label><Checkbox bind:checked={agreed} /> Accept terms</label>`,
      angular: `<label><silex-checkbox [(checked)]="agreed"></silex-checkbox> Accept terms</label>`,
      web: `<silex-checkbox label="Accept terms"></silex-checkbox>`,
      rust: `use silex_ui_core::components::checkbox::CheckboxState;

let mut cb = CheckboxState::new(false);
cb.toggle();
assert!(cb.is_checked());`,
    },
  },

  textarea: {
    id: 'textarea',
    name: 'Textarea',
    category: 'Form Controls',
    icon: <AlignLeft className="h-4 w-4" />,
    description: 'Multiline plain-text editing control for longer text entries.',
    markdownDoc: `
### Overview
The **Textarea** component standardizes multiline form text entry with accessible focus borders and optional auto-sizing.
    `,
    preview: (accent: string) => (
      <div className="w-full max-w-sm space-y-2">
        <label htmlFor="bio-input" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Architecture Notes
        </label>
        <textarea
          id="bio-input"
          rows={3}
          placeholder="Document distributed consensus details..."
          className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-md text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
          style={{ outlineColor: accent }}
        />
      </div>
    ),
    install: {
      pnpm: 'pnpm dlx silex-ui add textarea',
      npm: 'npx silex-ui add textarea',
      bun: 'bunx silex-ui add textarea',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'rows', type: 'number', default: '4', description: 'Number of visible text rows' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables editing' },
    ],
    code: {
      react: `import React from "react";
import { Textarea } from "@/components/ui/textarea";

export const Example: React.FC = () => {
  return <Textarea placeholder="Type your message here..." rows={4} />;
};`,
      vue: `<template>
  <Textarea placeholder="Type your message here..." :rows="4" />
</template>`,
      svelte: `<Textarea placeholder="Type your message here..." rows={4} />`,
      angular: `<silex-textarea placeholder="Type your message here..." [rows]="4"></silex-textarea>`,
      web: `<silex-textarea placeholder="Type your message here..." rows="4"></silex-textarea>`,
      rust: `use silex_ui_core::components::textarea::TextareaProps;

let ta = TextareaProps::new(4);
let classes = ta.compute_classes();`,
    },
  },

  table: {
    id: 'table',
    name: 'Table',
    category: 'Primitives',
    icon: <TableIcon className="h-4 w-4" />,
    description: 'Responsive, accessible tabular presentation for multi-dimensional data.',
    markdownDoc: `
### Overview
The **Table** component arranges structured rows and columns with semantic caption, header, body, and footer containers.
    `,
    preview: (accent: string) => (
      <div className="w-full max-w-md border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
            <tr>
              <th className="p-2.5 font-semibold">Service</th>
              <th className="p-2.5 font-semibold">Status</th>
              <th className="p-2.5 font-semibold">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            <tr>
              <td className="p-2.5 font-medium text-zinc-900 dark:text-zinc-100">Auth Gateway</td>
              <td className="p-2.5 font-semibold" style={{ color: accent }}>Operational</td>
              <td className="p-2.5 text-zinc-500 font-mono">1.2ms</td>
            </tr>
            <tr>
              <td className="p-2.5 font-medium text-zinc-900 dark:text-zinc-100">Redis Cluster</td>
              <td className="p-2.5 font-semibold" style={{ color: accent }}>Operational</td>
              <td className="p-2.5 text-zinc-500 font-mono">0.4ms</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    install: {
      pnpm: 'pnpm dlx silex-ui add table',
      npm: 'npx silex-ui add table',
      bun: 'bunx silex-ui add table',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'variant', type: "'default' | 'striped' | 'bordered'", default: "'default'", description: 'Tabular visual styling variant' },
    ],
    code: {
      react: `import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export const Example: React.FC = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Auth Gateway</TableCell>
          <TableCell>Operational</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};`,
      vue: `<template>
  <Table>
    <TableHead>...</TableHead>
    <TableBody>...</TableBody>
  </Table>
</template>`,
      svelte: `<Table>
  <TableHead>...</TableHead>
  <TableBody>...</TableBody>
</Table>`,
      angular: `<silex-table>...</silex-table>`,
      web: `<silex-table>...</silex-table>`,
      rust: `use silex_ui_core::components::table::{TableProps, TableVariant};

let table = TableProps::new(TableVariant::Default);
let classes = table.compute_classes();`,
    },
  },

  progress: {
    id: 'progress',
    name: 'Progress',
    category: 'Feedback',
    icon: <BarChart2 className="h-4 w-4" />,
    description: 'Deterministic or indeterminate visual indicator of task completion percentage.',
    markdownDoc: `
### Overview
The **Progress** component displays task completion percentage backed by the \`ProgressState\` machine.
    `,
    preview: (accent: string) => {
      const [val, setVal] = useState(65);
      return (
        <div className="w-full max-w-sm space-y-3">
          <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <span>Migration Progress</span>
            <span className="font-mono">{val}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-300 rounded-full"
              style={{ width: `${val}%`, backgroundColor: accent }}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setVal((v) => Math.max(0, v - 15))}
              className="px-2 py-1 text-[11px] rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              -15%
            </button>
            <button
              type="button"
              onClick={() => setVal((v) => Math.min(100, v + 15))}
              className="px-2 py-1 text-[11px] rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              +15%
            </button>
          </div>
        </div>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add progress',
      npm: 'npx silex-ui add progress',
      bun: 'bunx silex-ui add progress',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'value', type: 'number', default: '0', description: 'Current progress percentage value (0 to 100)' },
    ],
    code: {
      react: `import React from "react";
import { Progress } from "@/components/ui/progress";

export const Example: React.FC = () => {
  return <Progress value={65} />;
};`,
      vue: `<template>
  <Progress :value="65" />
</template>`,
      svelte: `<Progress value={65} />`,
      angular: `<silex-progress [value]="65"></silex-progress>`,
      web: `<silex-progress value="65"></silex-progress>`,
      rust: `use silex_ui_core::components::progress::ProgressState;

let mut prog = ProgressState::new(65);
assert_eq!(prog.value(), 65);`,
    },
  },

  skeleton: {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'Feedback',
    icon: <Loader2 className="h-4 w-4" />,
    description: 'Animated placeholder wireframe displaying during asynchronous content resolution.',
    markdownDoc: `
### Overview
The **Skeleton** component displays a subtle pulse animation previewing layout shapes while data is fetching.
    `,
    preview: () => (
      <div className="w-full max-w-sm space-y-3">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    ),
    install: {
      pnpm: 'pnpm dlx silex-ui add skeleton',
      npm: 'npx silex-ui add skeleton',
      bun: 'bunx silex-ui add skeleton',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'className', type: 'string', default: "''", description: 'Tailwind dimensions and styling classes' },
    ],
    code: {
      react: `import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const Example: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};`,
      vue: `<template>
  <Skeleton class="h-12 w-12 rounded-full" />
</template>`,
      svelte: `<Skeleton class="h-12 w-12 rounded-full" />`,
      angular: `<silex-skeleton class="h-12 w-12 rounded-full"></silex-skeleton>`,
      web: `<silex-skeleton class="h-12 w-12 rounded-full"></silex-skeleton>`,
      rust: `use silex_ui_core::components::skeleton::SkeletonProps;

let skel = SkeletonProps::new(true);
let classes = skel.compute_classes();`,
    },
  },

  tabs: {
    id: 'tabs',
    name: 'Tabs',
    category: 'Surfaces',
    icon: <TabsIcon className="h-4 w-4" />,
    description: 'Set of layered content sections displayed one at a time via keyboard-accessible tab triggers.',
    markdownDoc: `
### Overview
The **Tabs** component organizes multiple related views into a compact tab bar conforming to WAI-ARIA \`role="tablist"\` and \`role="tab"\`.
    `,
    preview: (accent: string, accentText: string) => {
      const [activeTab, setActiveTab] = useState('account');
      return (
        <div className="w-full max-w-sm space-y-3">
          <div role="tablist" className="inline-flex h-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 text-zinc-500">
            {['account', 'password', 'telemetry'].map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs transition cursor-pointer capitalize ${
                  activeTab === tab ? 'font-semibold shadow-sm' : 'hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
                style={activeTab === tab ? { backgroundColor: accent, color: accentText } : {}}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300">
            {activeTab === 'account' && <p>Account profile details and encryption identity.</p>}
            {activeTab === 'password' && <p>Rotate private ECDSA keys and auth credentials.</p>}
            {activeTab === 'telemetry' && <p>Cluster metrics collected at 100Hz frequency.</p>}
          </div>
        </div>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add tabs',
      npm: 'npx silex-ui add tabs',
      bun: 'bunx silex-ui add tabs',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'defaultValue', type: 'string', default: "''", description: 'Active tab value on initial render' },
    ],
    code: {
      react: `import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Example: React.FC = () => {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password changes</TabsContent>
    </Tabs>
  );
};`,
      vue: `<template>
  <Tabs default-value="account">
    <TabsList><TabsTrigger value="account">Account</TabsTrigger></TabsList>
    <TabsContent value="account">Account settings</TabsContent>
  </Tabs>
</template>`,
      svelte: `<Tabs defaultValue="account">
  <TabsList><TabsTrigger value="account">Account</TabsTrigger></TabsList>
  <TabsContent value="account">Account settings</TabsContent>
</Tabs>`,
      angular: `<silex-tabs default="account">...</silex-tabs>`,
      web: `<silex-tabs default="account">...</silex-tabs>`,
      rust: `use silex_ui_core::components::tabs::TabsState;

let mut tabs = TabsState::new("account");
tabs.set_active("password");
assert_eq!(tabs.active_tab(), "password");`,
    },
  },

  select: {
    id: 'select',
    name: 'Select',
    category: 'Form Controls',
    icon: <ListFilter className="h-4 w-4" />,
    description: 'Custom dropdown list allowing single option selection from multiple choices.',
    markdownDoc: `
### Overview
The **Select** component displays a collapsed trigger opening a menu of selectable choices with full keyboard arrow and escape navigation.
    `,
    preview: (accent: string) => {
      const [open, setOpen] = useState(false);
      const [selected, setSelected] = useState('Rust (WASM)');
      const options = ['Rust (WASM)', 'React 19', 'Vue 3', 'Svelte 5'];
      return (
        <div className="relative w-full max-w-xs">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-9 w-full items-center justify-between rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs shadow-sm text-zinc-900 dark:text-zinc-100"
          >
            <span>{selected}</span>
            <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <div role="listbox" className="absolute top-full mt-1.5 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg z-50 py-1">
              {options.map((opt) => (
                <div
                  key={opt}
                  role="option"
                  aria-selected={selected === opt}
                  onClick={() => { setSelected(opt); setOpen(false); }}
                  className="flex items-center justify-between px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <span>{opt}</span>
                  {selected === opt && <Check className="h-3.5 w-3.5" style={{ color: accent }} />}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add select',
      npm: 'npx silex-ui add select',
      bun: 'bunx silex-ui add select',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'value', type: 'string', default: "''", description: 'Selected option value' },
      { name: 'onValueChange', type: '(val: string) => void', default: '-', description: 'Callback fired on item selection' },
    ],
    code: {
      react: `import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export const Example: React.FC = () => {
  return (
    <Select defaultValue="rust">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select target" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="rust">Rust (WASM)</SelectItem>
        <SelectItem value="react">React 19</SelectItem>
      </SelectContent>
    </Select>
  );
};`,
      vue: `<template>
  <Select default-value="rust">
    <SelectTrigger><SelectValue placeholder="Select target" /></SelectTrigger>
    <SelectContent>
      <SelectItem value="rust">Rust (WASM)</SelectItem>
    </SelectContent>
  </Select>
</template>`,
      svelte: `<Select defaultValue="rust">...</Select>`,
      angular: `<silex-select value="rust">...</silex-select>`,
      web: `<silex-select value="rust">...</silex-select>`,
      rust: `use silex_ui_core::components::select::SelectState;

let mut sel = SelectState::new(false);
sel.set_value("rust");
assert_eq!(sel.value(), "rust");`,
    },
  },

  slider: {
    id: 'slider',
    name: 'Slider',
    category: 'Form Controls',
    icon: <Sliders className="h-4 w-4" />,
    description: 'Input control allowing the user to make selections from a range of values.',
    markdownDoc: `
### Overview
The **Slider** component provides an accessible numerical range scrubber, powered by \`SliderState\` in \`silex-ui-core\`.
    `,
    preview: (accent: string) => {
      const [val, setVal] = useState(60);
      return (
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <span>Buffer Threshold</span>
            <span className="font-mono">{val}ms</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={val}
            aria-label="Buffer threshold slider"
            onChange={(e) => setVal(Number(e.target.value))}
            className="w-full accent-orange-600 cursor-pointer"
            style={{ accentColor: accent }}
          />
        </div>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add slider',
      npm: 'npx silex-ui add slider',
      bun: 'bunx silex-ui add slider',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'defaultValue', type: 'number', default: '0', description: 'Starting range value' },
      { name: 'min', type: 'number', default: '0', description: 'Lower boundary value' },
      { name: 'max', type: 'number', default: '100', description: 'Upper boundary value' },
    ],
    code: {
      react: `import React from "react";
import { Slider } from "@/components/ui/slider";

export const Example: React.FC = () => {
  return <Slider defaultValue={[50]} max={100} step={1} />;
};`,
      vue: `<template>
  <Slider :default-value="[50]" :max="100" />
</template>`,
      svelte: `<Slider defaultValue={[50]} max={100} />`,
      angular: `<silex-slider [value]="50" [max]="100"></silex-slider>`,
      web: `<silex-slider value="50" max="100"></silex-slider>`,
      rust: `use silex_ui_core::components::slider::SliderState;

let mut slider = SliderState::new(50, 0, 100);
slider.set_value(75);
assert_eq!(slider.value(), 75);`,
    },
  },

  toggle: {
    id: 'toggle',
    name: 'Toggle',
    category: 'Primitives',
    icon: <CheckCircle2 className="h-4 w-4" />,
    description: 'Two-state button that can be either on (pressed) or off (unpressed).',
    markdownDoc: `
### Overview
The **Toggle** component exposes a simple push button with persistent pressed state conforming to \`aria-pressed\`.
    `,
    preview: (accent: string, accentText: string) => {
      const [pressed, setPressed] = useState(false);
      return (
        <button
          type="button"
          aria-pressed={pressed}
          onClick={() => setPressed(!pressed)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold border transition cursor-pointer ${
            pressed ? '' : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
          }`}
          style={pressed ? { backgroundColor: accent, borderColor: accent, color: accentText } : {}}
        >
          <Zap className="h-3.5 w-3.5" />
          <span>{pressed ? 'Turbo Boost Active' : 'Turbo Boost Standby'}</span>
        </button>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add toggle',
      npm: 'npx silex-ui add toggle',
      bun: 'bunx silex-ui add toggle',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'pressed', type: 'boolean', default: 'false', description: 'Controlled pressed state' },
    ],
    code: {
      react: `import React, { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

export const Example: React.FC = () => {
  return <Toggle aria-label="Toggle italic">Italic</Toggle>;
};`,
      vue: `<template>
  <Toggle aria-label="Toggle italic">Italic</Toggle>
</template>`,
      svelte: `<Toggle aria-label="Toggle italic">Italic</Toggle>`,
      angular: `<silex-toggle label="Italic"></silex-toggle>`,
      web: `<silex-toggle label="Italic"></silex-toggle>`,
      rust: `use silex_ui_core::components::toggle::ToggleState;

let mut toggle = ToggleState::new(false);
toggle.toggle();
assert!(toggle.is_pressed());`,
    },
  },

  popover: {
    id: 'popover',
    name: 'Popover',
    category: 'Overlays',
    icon: <HelpCircle className="h-4 w-4" />,
    description: 'Displays rich floating content in a portal triggered by a button interaction.',
    markdownDoc: `
### Overview
The **Popover** component displays floating panels alongside an anchor trigger without restricting keyboard focus flow.
    `,
    preview: (accent: string, accentText: string) => {
      const [open, setOpen] = useState(false);
      return (
        <div className="relative inline-block">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="px-4 py-2 text-xs font-semibold rounded-md shadow-sm transition"
            style={{ backgroundColor: accent, color: accentText }}
          >
            {open ? 'Close Settings' : 'Quick Settings'}
          </button>
          {open && (
            <div className="absolute left-0 mt-2 w-72 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xl z-50 space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Node Options</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Configure connection pooling rate limit and timeout thresholds.</p>
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-2.5 py-1 text-xs rounded font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      );
    },
    install: {
      pnpm: 'pnpm dlx silex-ui add popover',
      npm: 'npx silex-ui add popover',
      bun: 'bunx silex-ui add popover',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Controlled visibility state' },
    ],
    code: {
      react: `import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export const Example: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">Open Popover</button>
      </PopoverTrigger>
      <PopoverContent>Popover body content</PopoverContent>
    </Popover>
  );
};`,
      vue: `<template>
  <Popover>
    <template #trigger><button type="button">Open Popover</button></template>
    <p>Popover body content</p>
  </Popover>
</template>`,
      svelte: `<Popover>
  {#snippet trigger()}<button type="button">Open Popover</button>{/snippet}
  <p>Popover body content</p>
</Popover>`,
      angular: `<silex-popover>...</silex-popover>`,
      web: `<silex-popover>...</silex-popover>`,
      rust: `use silex_ui_core::components::popover::PopoverState;

let mut pop = PopoverState::new();
pop.open();
assert!(pop.is_open());`,
    },
  },
};

// ----------------------------------------------------------------------------
// Guide Documentation Pages
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
        <div className="p-5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
            <Cpu className="h-4 w-4 text-orange-500" />
            <span>Deterministic Rust State</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Algebraic data types ensure impossible states are impossible. Tested over 50,000 rapid cycles with 0 memory growth.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
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
            type="button"
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
              tab === t ? 'bg-orange-600 text-white font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
        {tab === 'vite' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">1. Initialize Silex</h3>
            <pre className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-xs font-mono text-orange-600 dark:text-orange-400">
              npx silex-ui init
            </pre>
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">2. Add components</h3>
            <pre className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-xs font-mono text-orange-600 dark:text-orange-400">
              npx silex-ui add button dialog card
            </pre>
          </div>
        )}

        {tab === 'cargo' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">Native Rust Core Installation</h3>
            <pre className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-xs font-mono text-orange-600 dark:text-orange-400">
              cargo add silex-ui-core
            </pre>
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">Native Scaffolding CLI</h3>
            <pre className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-xs font-mono text-orange-600 dark:text-orange-400">
              cargo install silex-ui-cli
            </pre>
          </div>
        )}

        {(tab === 'nextjs' || tab === 'vue' || tab === 'svelte') && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">Polyglot Scaffolding for {tab.toUpperCase()}</h3>
            <pre className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-xs font-mono text-orange-600 dark:text-orange-400">
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
        Silex ships with 8 professionally tuned, solid human-designed color palettes that pass WCAG 2.1 AA mathematical contrast checks.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {THEMES.map((t) => (
          <div key={t.id} className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
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

      <pre className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 font-mono text-xs text-zinc-800 dark:text-zinc-200">
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

function ComparisonDoc({ activeTheme }: { activeTheme: ThemeConfig }) {
  const comparisonItems = [
    {
      feature: 'Core Architecture',
      silex: 'Pure Rust core (compiled to WebAssembly / C-ABI) with deterministic state machines.',
      shadcn: 'Radix UI primitive hooks with JavaScript runtime state logic.',
      highlight: true,
    },
    {
      feature: 'Polyglot Framework Support',
      silex: 'First-class code generation & support for React 19, Vue 3, Svelte 5, Angular 19, Web Components, and Rust.',
      shadcn: 'React / Next.js only (community ports exist as separate forks).',
      highlight: true,
    },
    {
      feature: 'Memory & Lifecycle Safety',
      silex: '0 memory leaks across 50,000 rapid lifecycle state transitions; zero redundant heap allocations.',
      shadcn: 'Dependent on V8 garbage collection and complex useEffect closure dependencies.',
      highlight: false,
    },
    {
      feature: 'Component Ownership Model',
      silex: 'Full source code ownership via CLI directly into your project (`silex add <component>`).',
      shadcn: 'Full source code ownership via CLI (`shadcn-ui add <component>`).',
      highlight: false,
    },
    {
      feature: 'Theming & Eye Comfort',
      silex: '8 human-crafted palettes with mathematically guaranteed WCAG AA/AAA contrast and anti-glare light mode.',
      shadcn: 'Standard HSL/OKLCH neutral palette variables; no built-in eye-strain mitigation.',
      highlight: true,
    },
    {
      feature: 'Tailwind Engine',
      silex: 'Engineered natively for Tailwind CSS v4 with custom dark mode class variants and zero gradients.',
      shadcn: 'Historically Tailwind v3 configured; upgrading to v4 requires manual CSS migration.',
      highlight: false,
    },
    {
      feature: 'Component Density & Primitives',
      silex: '22 verified primitive components with native ARIA roles and unit/integration test suites.',
      shadcn: 'Comprehensive React collection (~45 components).',
      highlight: false,
    },
    {
      feature: 'Security & Sanitization',
      silex: 'Native injection deterrents, strict DOS resilience, and verified contrast safety tests.',
      shadcn: 'Dependent on browser DOM and Radix internal sanitization.',
      highlight: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border" style={{ color: activeTheme.accentHex, borderColor: activeTheme.accentHex }}>
          <Scale className="h-3.5 w-3.5" />
          <span>Architectural Comparison</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
          Silex vs. shadcn/ui
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          We deeply respect the copy-paste philosophy pioneered by shadcn. Silex elevates this foundation by replacing opaque runtime JavaScript state with a native, mathematically verified Rust core that powers modern frontends across every major framework.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-300 dark:border-zinc-800 overflow-x-auto shadow-sm">
        <table className="w-full min-w-[650px] text-left text-xs">
          <thead className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
            <tr>
              <th className="p-3.5 font-bold uppercase tracking-wider w-1/4">Capability / Dimension</th>
              <th className="p-3.5 font-bold uppercase tracking-wider w-3/8 text-orange-600 dark:text-orange-400">
                Silex UI (Rust Core)
              </th>
              <th className="p-3.5 font-bold uppercase tracking-wider w-3/8 text-zinc-600 dark:text-zinc-400">
                shadcn/ui (Radix JS)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
            {comparisonItems.map((item) => (
              <tr key={item.feature} className={item.highlight ? 'bg-orange-500/5' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'}>
                <td className="p-3.5 font-semibold text-zinc-900 dark:text-white align-top">
                  {item.feature}
                </td>
                <td className="p-3.5 text-zinc-800 dark:text-zinc-200 leading-relaxed align-top">
                  {item.silex}
                </td>
                <td className="p-3.5 text-zinc-500 dark:text-zinc-400 leading-relaxed align-top">
                  {item.shadcn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-2">
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">Why Rust in the Component Layer?</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            UI state machines (dialog transitions, focus trapping, drawer dragging, numerical slider clamping) benefit immensely from algebraic enum data types and borrow-checker invariants. Impossible component states become mathematically unrepresentable.
          </p>
        </div>
        <div className="p-5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-2">
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">Polyglot Code Ownership</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Teams maintaining multi-stack organizations (e.g. Next.js customer portals and Vue internal backoffices) no longer need fragmented component libraries. Silex components share the identical deterministic core across all frameworks.
          </p>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 3-Column Documentation Page
// ----------------------------------------------------------------------------

function DocsLayout({ 
  activeTheme,
  mobileNavOpen,
  onCloseMobileNav
}: { 
  activeTheme: ThemeConfig;
  mobileNavOpen?: boolean;
  onCloseMobileNav?: () => void;
}) {
  const { docSlug, componentId } = useParams<{ docSlug?: string; componentId?: string }>();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDocsDrawerOpen, setMobileDocsDrawerOpen] = useState(false);
  const [activeFramework, setActiveFramework] = useState<FrameworkType>('react');
  const [installPm, setInstallPm] = useState<'pnpm' | 'npm' | 'bun' | 'cargo'>('pnpm');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const [gettingStartedOpen, setGettingStartedOpen] = useState(true);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'Primitives': true,
    'Overlays': true,
    'Form Controls': true,
    'Feedback': true,
    'Layout': true,
    'Surfaces': true,
  });

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const categories = ['Primitives', 'Form Controls', 'Overlays', 'Feedback', 'Layout', 'Surfaces'];

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentComponent = componentId ? COMPONENTS_DATA[componentId] : null;

  const sections = currentComponent ? [
    { id: 'overview', title: 'Overview' },
    { id: 'interactive-preview', title: 'Interactive Preview' },
    { id: 'installation', title: 'Installation' },
    { id: 'polyglot-usage', title: 'Multi-Framework Usage' },
    { id: 'props-reference', title: 'Props Table' },
  ] : [
    { id: 'overview', title: 'Overview' },
  ];

  const sidebarContent = (
    <div className="space-y-4 text-sm">
      {/* Search */}
      <div className="relative">
        <Search className="h-4 w-4 absolute left-3 top-2.5 text-zinc-400" />
        <input
          type="text"
          aria-label="Search documentation and components"
          placeholder="Search docs & components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs text-zinc-900 dark:text-white focus:outline-none transition"
        />
      </div>

      {/* Getting Started Category */}
      <div>
        <button
          type="button"
          onClick={() => setGettingStartedOpen(!gettingStartedOpen)}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 py-1"
        >
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5" />
            <span>Getting Started</span>
          </div>
          {gettingStartedOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </button>

        {gettingStartedOpen && (
          <div className="space-y-1 mt-1 pl-2">
            {[
              { name: 'Introduction', path: '/docs/introduction' },
              { name: 'Silex vs. shadcn', path: '/docs/comparison' },
              { name: 'Installation', path: '/docs/installation' },
              { name: 'Theming & Tokens', path: '/docs/theming' },
              { name: 'Configuration', path: '/docs/configuration' },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileDocsDrawerOpen(false)}
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

      {/* Collapsible Component Categories */}
      <div className="space-y-3 pt-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-1">
          Component Categories
        </div>
        {categories.map((category) => {
          const catComponents = Object.values(COMPONENTS_DATA).filter(
            (c) => c.category === category && c.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (catComponents.length === 0) return null;
          const isOpen = openCategories[category] ?? true;

          return (
            <div key={category} className="space-y-1">
              <button
                type="button"
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 py-1 hover:text-zinc-900 dark:hover:text-white transition"
              >
                <div className="flex items-center gap-2">
                  <Boxes className="h-3.5 w-3.5" />
                  <span>{category}</span>
                  <span className="text-[10px] font-normal lowercase tracking-normal text-zinc-400 dark:text-zinc-500">
                    ({catComponents.length})
                  </span>
                </div>
                {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>

              {isOpen && (
                <div className="space-y-1 pl-2">
                  {catComponents.map((c) => (
                    <NavLink
                      key={c.id}
                      to={`/docs/components/${c.id}`}
                      onClick={() => setMobileDocsDrawerOpen(false)}
                      className={({ isActive }) => `flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition ${
                        isActive ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {c.icon}
                        <span>{c.name}</span>
                      </span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex-1 w-full flex flex-col md:flex-row gap-6 md:gap-8 py-6 md:py-8">
      {/* Mobile docs navigation toggle button */}
      <div className="md:hidden flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setMobileDocsDrawerOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200"
        >
          <PanelLeft className="h-4 w-4" />
          <span>Documentation Index</span>
        </button>
        <span className="text-xs font-mono text-zinc-500">
          {currentComponent ? currentComponent.name : docSlug ? docSlug.toUpperCase() : 'Docs'}
        </span>
      </div>

      {/* Mobile Drawer Modal for Navigation */}
      {mobileDocsDrawerOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-label="Mobile Documentation Index" 
          className="fixed inset-0 z-50 bg-black/60 md:hidden flex"
        >
          <div className="w-4/5 max-w-xs h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-5 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Documentation
              </span>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setMobileDocsDrawerOpen(false)}
                className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </div>
          <div 
            className="flex-1" 
            onClick={() => setMobileDocsDrawerOpen(false)} 
            aria-hidden="true" 
          />
        </div>
      )}

      {/* 1. Left Desktop Collapsible Sidebar */}
      <aside 
        aria-label="Documentation Navigation"
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
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {!sidebarCollapsed && sidebarContent}
      </aside>

      {/* 2. Middle Main Documentation Area */}
      <main className="flex-1 min-w-0 space-y-8">
        {docSlug === 'introduction' && <IntroductionDoc />}
        {docSlug === 'comparison' && <ComparisonDoc activeTheme={activeTheme} />}
        {docSlug === 'installation' && <InstallationDoc />}
        {docSlug === 'theming' && <ThemingDoc />}
        {docSlug === 'configuration' && <ConfigurationDoc />}

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
              <div className="rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 flex items-center justify-center min-h-[220px] shadow-sm">
                {currentComponent.preview(activeTheme.accentHex, activeTheme.accentTextHex)}
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
                      type="button"
                      onClick={() => setInstallPm(pm)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition cursor-pointer ${
                        installPm === pm ? 'font-bold border' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                      }`}
                      style={installPm === pm ? { 
                        color: activeTheme.accentHex, 
                        borderColor: activeTheme.accentHex
                      } : {}}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 font-mono text-xs">
                <span className="text-zinc-900 dark:text-zinc-200">{currentComponent.install[installPm]}</span>
                <button
                  type="button"
                  aria-label="Copy Installation Command"
                  onClick={() => copyText(currentComponent.install[installPm])}
                  className="text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition ml-3 cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Polyglot Framework Code Snippets */}
            <div id="polyglot-usage" className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                  {(['react', 'vue', 'svelte', 'angular', 'web', 'rust'] as const).map((fw) => (
                    <button
                      key={fw}
                      type="button"
                      onClick={() => setActiveFramework(fw)}
                      className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider transition cursor-pointer ${
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
                  type="button"
                  aria-label="Copy Framework Snippet"
                  onClick={() => copyText(currentComponent.code[activeFramework])}
                  className="self-end sm:self-auto flex items-center gap-1.5 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-md transition cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <CodeHighlight code={currentComponent.code[activeFramework]} language={activeFramework} />
            </div>

            {/* Props Table */}
            <div id="props-reference" className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Props Reference</h3>
              <div className="rounded-xl border border-zinc-300 dark:border-zinc-800 overflow-x-auto shadow-sm">
                <table className="w-full min-w-[500px] text-left text-xs">
                  <thead className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <tr>
                      <th className="p-3 font-semibold">Prop</th>
                      <th className="p-3 font-semibold">Type</th>
                      <th className="p-3 font-semibold">Default</th>
                      <th className="p-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                    {currentComponent.props.map((p) => (
                      <tr key={p.name} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
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
            <div className="rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 markdown-body text-zinc-800 dark:text-zinc-200 shadow-sm">
              <ReactMarkdown>{currentComponent.markdownDoc}</ReactMarkdown>
            </div>
          </div>
        )}
      </main>

      {/* 3. Right "On This Page" Table of Contents */}
      <aside aria-label="On this page navigation" className="w-56 shrink-0 hidden lg:block space-y-4">
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
                  style={activeSection === s.id ? { color: activeTheme.accentHex } : {}}
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
// Root App
// ----------------------------------------------------------------------------

export function App() {
  const { isDark, toggleMode, selectedTheme, setTheme, activeTheme } = useActiveTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div 
      className="min-h-screen font-sans antialiased selection:bg-orange-500 selection:text-white flex flex-col transition-colors duration-200"
      style={{
        backgroundColor: isDark ? activeTheme.darkBg : activeTheme.lightBg,
        color: isDark ? activeTheme.darkText : activeTheme.lightText,
      }}
    >
      <NavigationBar 
        isDark={isDark} 
        onToggleTheme={toggleMode} 
        selectedTheme={selectedTheme} 
        onSelectTheme={setTheme} 
        mobileNavOpen={mobileNavOpen}
        onToggleMobileNav={() => setMobileNavOpen(prev => !prev)}
      />
      <Routes>
        <Route path="/" element={<LandingPage activeTheme={activeTheme} />} />
        <Route 
          path="/docs" 
          element={
            <DocsLayout 
              activeTheme={activeTheme} 
              mobileNavOpen={mobileNavOpen}
              onCloseMobileNav={() => setMobileNavOpen(false)}
            />
          } 
        />
        <Route 
          path="/docs/:docSlug" 
          element={
            <DocsLayout 
              activeTheme={activeTheme} 
              mobileNavOpen={mobileNavOpen}
              onCloseMobileNav={() => setMobileNavOpen(false)}
            />
          } 
        />
        <Route 
          path="/docs/components/:componentId" 
          element={
            <DocsLayout 
              activeTheme={activeTheme} 
              mobileNavOpen={mobileNavOpen}
              onCloseMobileNav={() => setMobileNavOpen(false)}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
