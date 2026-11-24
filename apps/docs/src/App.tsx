import React, { useEffect, useState, useRef } from 'react';
import { 
  Routes, 
  Route, 
  Link, 
  NavLink, 
  useParams, 
  useNavigate,
  Navigate 
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
  Scale,
  LayoutGrid,
  List as ListIcon,
  GalleryHorizontal,
  Wallpaper,
  Navigation,
  Smartphone,
  Tablet,
  Monitor,
  Split,
  Eye,
  Code
,
  ChevronLeft,
  ChevronUp,
  Minimize2,
  RotateCcw,
  Play,
  Pause,
  Image as ImageIcon
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
  variants?: {
    name: string;
    description: string;
    render: (accentColor: string, accentTextColor: string) => React.ReactNode;
    code?: string;
  }[];
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
// Component Preview Renderer (Isolates component preview hooks from parent)
// ----------------------------------------------------------------------------

function ComponentPreviewRenderer({
  previewFn,
  accent,
  accentText,
}: {
  previewFn: (accent: string, accentText: string) => React.ReactNode;
  accent: string;
  accentText: string;
}) {
  return <>{previewFn(accent, accentText)}</>;
}

// ----------------------------------------------------------------------------
// Interactive Component Playground
// ----------------------------------------------------------------------------

interface ComponentPlaygroundProps {
  component: ComponentDoc;
  activeTheme: ThemeConfig;
  defaultSnippet: string;
}

function ComponentPlayground({ component, activeTheme, defaultSnippet }: ComponentPlaygroundProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic Playground Prop Controls State
  // 0 = Default Component Implementation, 1..N = Variants
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<number>(0);
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customText, setCustomText] = useState('');

  const resetPlayground = () => {
    setSelectedVariantIdx(0);
    setButtonSize('md');
    setIsDisabled(false);
    setIsLoading(false);
    setCustomText('');
    setViewport('desktop');
  };

  const hasVariants = component.variants && component.variants.length > 0;
  // If selectedVariantIdx == 0, render component.preview; if > 0, render component.variants[selectedVariantIdx - 1].render
  const isDefaultView = selectedVariantIdx === 0;
  const activeVariant = hasVariants && selectedVariantIdx > 0 ? component.variants![selectedVariantIdx - 1] : null;

  // Dynamically generated JSX representation of playground configuration
  const variantName = activeVariant ? activeVariant.name.toLowerCase().replace(/\s+/g, '-') : 'default';
  const sizeClass = buttonSize === 'sm' ? 'scale-90' : buttonSize === 'lg' ? 'scale-105' : 'scale-100';

  const generatedCode = `// Generated Silex Code for <${component.name} />
// Theme: ${activeTheme.name} | Viewport: ${viewport}
import { ${component.name} } from "@/components/ui/${component.id}";

export const Configured${component.name.replace(/\s+/g, '')} = () => {
  return (
    <${component.name}
      variant="${variantName}"
      size="${buttonSize}"
      disabled={${isDisabled}}
      loading={${isLoading}}
    >
      ${customText || (activeVariant ? activeVariant.name : component.name)}
    </${component.name}>
  );
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(activeTab === 'code' ? generatedCode : defaultSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const viewportWidthClass = 
    viewport === 'mobile' ? 'max-w-[375px]' :
    viewport === 'tablet' ? 'max-w-[720px]' : 'w-full';

  return (
    <div className={`rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden transition-all duration-200 ${
      isFullscreen ? 'fixed inset-4 z-50 overflow-y-auto' : ''
    }`}>
      {/* Playground Header & Toolbar */}
      <div className="p-3.5 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 bg-zinc-50/70 dark:bg-zinc-900/70 backdrop-blur-xs">
        {/* Left: Preview / Code tabs */}
        <div className="inline-flex p-1 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Interactive Playground</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition cursor-pointer ${
              activeTab === 'code'
                ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>Generated Code</span>
          </button>
        </div>

        {/* Right: Viewport Controls, Reset, Fullscreen, Copy */}
        <div className="flex items-center gap-1.5">
          {/* Responsive Viewport Switcher */}
          <div className="hidden sm:inline-flex items-center p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/80 text-xs">
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              title="Mobile Viewport (375px)"
              className={`p-1.5 rounded transition cursor-pointer ${
                viewport === 'mobile' ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              title="Tablet Viewport (720px)"
              className={`p-1.5 rounded transition cursor-pointer ${
                viewport === 'tablet' ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Tablet className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              title="Desktop Viewport (100%)"
              className={`p-1.5 rounded transition cursor-pointer ${
                viewport === 'desktop' ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Reset Props Button */}
          <button
            type="button"
            onClick={resetPlayground}
            title="Reset Playground Controls"
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
            className="p-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>

          {/* Copy Code */}
          <button
            type="button"
            onClick={copyCode}
            title="Copy Generated Code"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer hover:opacity-90"
            style={{ backgroundColor: activeTheme.accentHex, color: activeTheme.accentTextHex }}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox Area */}
      {activeTab === 'preview' ? (
        <div className="flex flex-col">
          {/* Active Preset Indicator Badge */}
          <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-900 dark:text-white">Active Preview:</span>
              <span className="px-2 py-0.5 rounded font-mono font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                {isDefaultView ? 'Default Base Component' : activeVariant?.name}
              </span>
            </div>
            {customText && (
              <span className="text-[11px] font-mono text-zinc-500">Label: "{customText}"</span>
            )}
          </div>

          {/* Fluid Responsive Canvas Container with Standard Dotted Background */}
          <div className="p-6 sm:p-10 flex items-center justify-center min-h-[300px] bg-zinc-50 dark:bg-zinc-950 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] text-zinc-300 dark:text-zinc-800 transition-all">
            <div className={`w-full flex justify-center text-zinc-900 dark:text-white transition-all duration-300 ${viewportWidthClass}`}>
              <div className={`transition-all duration-200 ${sizeClass} ${isDisabled ? 'opacity-40 pointer-events-none' : ''} ${isLoading ? 'animate-pulse' : ''}`}>
                <ErrorBoundary key={`${component.id}-${selectedVariantIdx}-${buttonSize}-${isDisabled}-${isLoading}-${customText}`}>
                  {isDefaultView ? (
                    <ComponentPreviewRenderer
                      previewFn={component.preview}
                      accent={activeTheme.accentHex}
                      accentText={activeTheme.accentTextHex}
                    />
                  ) : (
                    activeVariant && (
                      <ComponentPreviewRenderer
                        previewFn={activeVariant.render}
                        accent={activeTheme.accentHex}
                        accentText={activeTheme.accentTextHex}
                      />
                    )
                  )}
                </ErrorBoundary>
              </div>
            </div>
          </div>

          {/* Dynamic Interactive Property Controls Drawer */}
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5" style={{ color: activeTheme.accentHex }} />
                <span>Component Property Controls</span>
              </span>
              <span className="text-[11px] font-mono text-zinc-400">Live Interactive Reactive State</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {/* Variant Selector - Select any variant or default */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Preview Variant / Variety</label>
                <select
                  value={selectedVariantIdx}
                  onChange={(e) => setSelectedVariantIdx(Number(e.target.value))}
                  className="w-full p-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none cursor-pointer"
                >
                  <option value={0}>Default Base View</option>
                  {component.variants && component.variants.map((v, i) => (
                    <option key={i + 1} value={i + 1}>{v.name}</option>
                  ))}
                </select>
              </div>

              {/* Size Selector */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Scale / Density</label>
                <div className="flex gap-1">
                  {(['sm', 'md', 'lg'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setButtonSize(s)}
                      className={`flex-1 py-1 rounded text-[11px] font-mono border transition cursor-pointer ${
                        buttonSize === s ? 'bg-zinc-200 dark:bg-zinc-800 font-bold' : 'border-zinc-300 dark:border-zinc-700 text-zinc-500'
                      }`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Boolean Toggles */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Interactive States</label>
                <div className="flex gap-3 items-center pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDisabled}
                      onChange={(e) => setIsDisabled(e.target.checked)}
                      className="rounded accent-orange-500 cursor-pointer"
                    />
                    <span className="text-[11px] text-zinc-700 dark:text-zinc-300 select-none">Disabled</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isLoading}
                      onChange={(e) => setIsLoading(e.target.checked)}
                      className="rounded accent-orange-500 cursor-pointer"
                    />
                    <span className="text-[11px] text-zinc-700 dark:text-zinc-300 select-none">Loading</span>
                  </label>
                </div>
              </div>

              {/* Text Input Prop */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Custom Label / Text</label>
                <input
                  type="text"
                  placeholder={activeVariant ? activeVariant.name : component.name}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full p-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-zinc-950 font-mono text-xs overflow-x-auto text-zinc-200">
          <CodeHighlight code={generatedCode} language="typescript" />
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Error Boundary
// ----------------------------------------------------------------------------
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-xl border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span>Component Preview Error</span>
          </div>
          <p className="text-xs font-mono">
            {this.state.error?.message || 'An unexpected error occurred rendering this component preview.'}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3 py-1.5 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition cursor-pointer"
          >
            Retry Preview
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
  const [componentsMenuOpen, setComponentsMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
  const active = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Mobile navigation hamburger toggle */}
          <button
            type="button"
            onClick={onToggleMobileNav}
            aria-label={mobileNavOpen ? "Close mobile menu" : "Open mobile menu"}
            className="md:hidden p-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition cursor-pointer"
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
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-950 dark:text-white">Silex</span>
              <span className="text-[10px] font-mono font-medium text-zinc-400">v0.1</span>
            </div>
          </Link>

          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <NavLink 
              to="/docs/introduction" 
              className={({ isActive }) => `px-3 py-1.5 rounded-md transition ${isActive ? 'text-zinc-950 dark:text-white font-semibold bg-zinc-100 dark:bg-zinc-800' : 'hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/60'}`}
            >
              Docs
            </NavLink>

            {/* Collapsible Components Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setComponentsMenuOpen(true)}
              onMouseLeave={() => setComponentsMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setComponentsMenuOpen(!componentsMenuOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition cursor-pointer ${
                  componentsMenuOpen ? 'text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800' : 'hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <span>Components</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${componentsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {componentsMenuOpen && (
                <div className="absolute left-0 mt-1 w-64 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-2xl z-50 grid grid-cols-2 gap-1 animate-slide-in-up">
                  <div className="col-span-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Component Library (28)
                  </div>
                  {[
                    { name: 'Button', path: '/docs/components/button', icon: <MousePointerClick className="h-3.5 w-3.5 text-orange-500" /> },
                    { name: 'Dialog', path: '/docs/components/dialog', icon: <Maximize2 className="h-3.5 w-3.5 text-blue-500" /> },
                    { name: 'Card', path: '/docs/components/card', icon: <SquareCode className="h-3.5 w-3.5 text-emerald-500" /> },
                    { name: 'Tabs', path: '/docs/components/tabs', icon: <TabsIcon className="h-3.5 w-3.5 text-purple-500" /> },
                    { name: 'Sidebar', path: '/docs/components/sidebar', icon: <PanelLeft className="h-3.5 w-3.5 text-amber-500" /> },
                    { name: 'Navbar', path: '/docs/components/navbar', icon: <Navigation className="h-3.5 w-3.5 text-teal-500" /> },
                    { name: 'Motion Card', path: '/docs/components/card', icon: <Zap className="h-3.5 w-3.5 text-rose-500" /> },
                    { name: 'Carousel', path: '/docs/components/carousel', icon: <GalleryHorizontal className="h-3.5 w-3.5 text-indigo-500" /> },
                  ].map((comp) => (
                    <NavLink
                      key={comp.path}
                      to={comp.path}
                      onClick={() => setComponentsMenuOpen(false)}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                    >
                      <span className="shrink-0">{comp.icon}</span>
                      <span className="truncate font-medium">{comp.name}</span>
                    </NavLink>
                  ))}
                  <div className="col-span-2 pt-1 border-t border-zinc-100 dark:border-zinc-800 mt-1">
                    <NavLink
                      to="/docs/components/button"
                      onClick={() => setComponentsMenuOpen(false)}
                      className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 px-2 py-1 block hover:underline"
                    >
                      Browse all 28 components &rarr;
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Resources / Guides Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setResourcesMenuOpen(true)}
              onMouseLeave={() => setResourcesMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setResourcesMenuOpen(!resourcesMenuOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition cursor-pointer ${
                  resourcesMenuOpen ? 'text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800' : 'hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <span>Guides</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${resourcesMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {resourcesMenuOpen && (
                <div className="absolute left-0 mt-1 w-48 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-2xl z-50 space-y-1 animate-slide-in-up">
                  <NavLink
                    to="/docs/installation"
                    onClick={() => setResourcesMenuOpen(false)}
                    className="block px-2.5 py-1.5 rounded text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Installation & CLI
                  </NavLink>
                  <NavLink
                    to="/docs/theming"
                    onClick={() => setResourcesMenuOpen(false)}
                    className="block px-2.5 py-1.5 rounded text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Eye-Safe Theming
                  </NavLink>
                  <NavLink
                    to="/docs/configuration"
                    onClick={() => setResourcesMenuOpen(false)}
                    className="block px-2.5 py-1.5 rounded text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Configuration (silex.json)
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => `px-3 py-1.5 rounded-md transition ${isActive ? 'text-zinc-950 dark:text-white font-semibold bg-zinc-100 dark:bg-zinc-800' : 'hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/60'}`}
            >
              Story
            </NavLink>
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

          <a 
            href="https://github.com/sagarkrjha/silex" 
            target="_blank" 
            rel="noreferrer" 
            className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition"
            aria-label="GitHub Repository"
          >
            <ExternalLink className="h-4 w-4 text-zinc-500" />
          </a>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium">
            <NavLink 
              to="/docs/introduction" 
              onClick={onToggleMobileNav}
              className={({ isActive }) => `px-3 py-2 rounded-lg transition ${isActive ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              Documentation
            </NavLink>
            <NavLink 
              to="/docs/components/button" 
              onClick={onToggleMobileNav}
              className={({ isActive }) => `px-3 py-2 rounded-lg transition ${isActive ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              Components (28)
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
            <NavLink 
              to="/" 
              end 
              onClick={onToggleMobileNav}
              className={({ isActive }) => `px-3 py-2 rounded-lg transition ${isActive ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              Story
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
          Engineered in Rust. <br className="hidden sm:inline" />
          <span style={{ color: activeTheme.accentHex }}>
            Designed for Modern Frontends.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal px-2">
          <strong>Silex</strong> is a high-performance UI component engine with a pure Rust core, compiled to WebAssembly 
          and C-ABI. Built with copy-paste code ownership, mathematical WCAG AA contrast compliance, and first-class support 
          for React 19, Vue 3, Svelte 5, Angular 19, and Web Components.
        </p>

        {/* Scaffold Box */}
        <div className="max-w-lg mx-auto bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl p-3 shadow-sm space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Quick Start CLI</span>
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

      {/* Act II: Deterministic State Architecture */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase" style={{ color: activeTheme.accentHex }}>
            <Compass className="h-4 w-4" />
            <span>Deterministic Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-white">
            Formal Rust State Machines with Zero Undefined Behavior
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Every interactive component transition is driven by algebraic data types in Rust, eliminating race conditions and impossible runtime UI states.
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
            <span>Cross-Framework Architecture</span>
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

      {/* Code Ownership Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-8 border-t border-zinc-300 dark:border-zinc-800">
        <Heart className="h-8 w-8 mx-auto" style={{ color: activeTheme.accentHex }} />
        <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-white">
          Full Code Ownership. Zero Blackbox Dependencies.
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-base max-w-xl mx-auto leading-relaxed">
          Silex never locks your project into an opaque node_modules package. 
          The CLI generates transparent, fully-typed source components directly into your codebase, backed by a deterministic Rust core.
        </p>
        <div>
          <Link
            to="/docs/components/button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold shadow-md transition"
            style={{ backgroundColor: activeTheme.accentHex, color: activeTheme.accentTextHex }}
          >
            <span>Browse Components</span>
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
    variants: [
      {
        name: 'Icon and Label Buttons with Click Counter',
        description: 'Action triggers with live click feedback and stateful interaction.',
        render: (accent: string, accentText: string) => {
          const [count, setCount] = useState(0);
          return (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setCount(prev => prev + 1)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: accent, color: accentText }}
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Clicked {count} times</span>
              </button>
              <button
                type="button"
                onClick={() => setCount(0)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer text-zinc-700 dark:text-zinc-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            </div>
          );
        },
      },
      {
        name: 'Sizes & Densities with Interactive Switcher',
        description: 'Dynamically switch between sm, md, and lg button scales.',
        render: (accent: string, accentText: string) => {
          const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
          return (
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 bg-zinc-50 dark:bg-zinc-900">
                {(['sm', 'md', 'lg'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition cursor-pointer ${size === s ? 'bg-zinc-200 dark:bg-zinc-800 font-bold' : 'text-zinc-500'}`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={`font-semibold rounded-lg shadow-xs transition ${
                  size === 'sm' ? 'px-2.5 py-1 text-xs' : size === 'lg' ? 'px-5 py-2.5 text-sm' : 'px-3.5 py-1.5 text-xs'
                }`}
                style={{ backgroundColor: accent, color: accentText }}
              >
                Rendered Size: {size.toUpperCase()}
              </button>
            </div>
          );
        },
      },
      {
        name: 'Full-Width Responsive Action',
        description: 'Adapts fluidly across screen widths with instant confirmation state.',
        render: (accent: string, accentText: string) => {
          const [saved, setSaved] = useState(false);
          return (
            <div className="w-full max-w-xs space-y-2">
              <button
                type="button"
                onClick={() => setSaved(!saved)}
                className="w-full py-2 px-4 rounded-lg text-xs font-semibold shadow-xs transition hover:opacity-90 cursor-pointer flex items-center justify-center gap-2"
                style={{ backgroundColor: saved ? '#10b981' : accent, color: accentText }}
              >
                {saved ? <Check className="h-4 w-4" /> : <Terminal className="h-4 w-4" />}
                <span>{saved ? 'Changes Committed' : 'Save Configuration'}</span>
              </button>
            </div>
          );
        },
      },
      {
        name: 'Loading & Disabled State Simulation',
        description: 'Interactive button showcasing spinner animation and disabled cursor feedback.',
        render: (accent: string, accentText: string) => {
          const [loading, setLoading] = useState(false);
          const handleClick = () => {
            setLoading(true);
            setTimeout(() => setLoading(false), 1500);
          };
          return (
            <button
              type="button"
              disabled={loading}
              onClick={handleClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold shadow-xs transition disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: accent, color: accentText }}
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>{loading ? 'Compiling Rust WASM...' : 'Trigger Pipeline'}</span>
            </button>
          );
        },
      },
    ],
    install: {
      pnpm: 'pnpm dlx silex-ui add button',
      npm: 'npx silex-ui add button',
      bun: 'bunx silex-ui add button',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'", default: "'primary'", description: 'Visual aesthetic variant' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Sizing scale' },
      { name: 'className', type: 'string', default: "''", description: 'Custom responsive Tailwind CSS classes merged via cn()' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interactions and dims appearance' },
    ],
    code: {
      react: `import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

export interface ButtonDemoProps {
  className?: string;
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Example: React.FC<ButtonDemoProps> = ({ className, onAction }): React.ReactElement => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {/* Devs can customize with responsive Tailwind classes */}
      <Button 
        variant="primary" 
        className="w-full sm:w-auto shadow-md hover:scale-[1.02] transition"
        onClick={onAction}
      >
        Responsive Action
      </Button>
      <Button variant="secondary" className="w-full sm:w-auto">Secondary</Button>
      <Button variant="outline" className="w-full sm:w-auto">Outline</Button>
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
        variants: [
      {
        name: 'Animated Entrance & Scale with Live Trigger',
        description: 'Interactive modal trigger demonstrating GPU-accelerated backdrop fade and smooth scale transitions.',
        render: (accent: string, accentText: string) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: accent, color: accentText }}
              >
                Open Animated Dialog
              </button>
              {isOpen && (
                <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl max-w-sm animate-slide-in-up space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">Motion Dialog</span>
                    <button type="button" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Modal states animate smoothly with zero layout shift.</p>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-1 text-xs rounded border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 cursor-pointer">Dismiss</button>
                    <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-1 text-xs rounded font-semibold cursor-pointer" style={{ backgroundColor: accent, color: accentText }}>Save</button>
                  </div>
                </div>
              )}
            </div>
          );
        },
      },
      {
        name: 'Destructive Confirmation Dialog with Reversible State',
        description: 'High-contrast prompt state for irreversible operations with interactive confirmation simulation.',
        render: () => {
          const [confirmed, setConfirmed] = useState(false);
          return (
            <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 max-w-sm space-y-3">
              <div className="text-xs font-bold text-red-700 dark:text-red-400">
                {confirmed ? 'Tokens Revoked Successfully' : 'Revoke Access Tokens?'}
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {confirmed ? 'All existing user sessions have been terminated.' : 'This action cannot be undone. Active sessions will be terminated immediately.'}
              </p>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setConfirmed(false)} className="px-3 py-1 text-xs rounded border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 cursor-pointer">Reset</button>
                <button type="button" onClick={() => setConfirmed(true)} className="px-3 py-1 text-xs rounded font-semibold bg-red-600 text-white hover:bg-red-700 transition cursor-pointer">Revoke</button>
              </div>
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Slide-in Right Drawer with Toggle',
        description: 'Interactive off-canvas drawer with GPU-accelerated transition and backdrop dismiss.',
        render: (accent: string, accentText: string) => {
          const [open, setOpen] = useState(false);
          return (
            <div className="w-full max-w-md space-y-3">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
                style={{ backgroundColor: accent, color: accentText }}
              >
                {open ? 'Close Right Drawer' : 'Open Right Drawer'}
              </button>
              {open && (
                <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-xl animate-slide-in-up">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">Workspace Drawer</span>
                    <button type="button" onClick={() => setOpen(false)} className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Contextual inspector panel rendered cleanly with zero layout shift.</p>
                </div>
              )}
            </div>
          );
        },
      },
      {
        name: 'Bottom Action Sheet with Counter',
        description: 'Interactive modal sheet docked to the viewport bottom with item selection.',
        render: (accent: string, accentText: string) => {
          const [count, setCount] = useState(3);
          return (
            <div className="w-full max-w-md p-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">Selected: {count} elements</span>
                <button type="button" onClick={() => setCount(prev => prev + 1)} className="px-1.5 py-0.5 rounded text-[10px] font-mono border bg-white dark:bg-zinc-800 cursor-pointer">+1</button>
              </div>
              <button type="button" className="px-3 py-1 rounded text-xs font-semibold cursor-pointer hover:opacity-90" style={{ backgroundColor: accent, color: accentText }}>
                Export All
              </button>
            </div>
          );
        },
      },
    ],
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
    variants: [
      {
        name: 'Interactive Action Card with Media Thumbnail',
        description: 'Clickable container with placeholder image header, hover lift, and trailing action trigger.',
        render: (accent: string, accentText: string) => {
          const [liked, setLiked] = useState(false);
          return (
            <div className="w-full max-w-sm rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs transition duration-200 flex flex-col">
              <div className="relative h-32 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80"
                  alt="Audit Visualization Card"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => setLiked(!liked)}
                  className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition ${liked ? 'bg-red-500 text-white' : 'bg-zinc-950/60 text-white hover:bg-zinc-950/80'}`}
                  aria-label="Favorite audit item"
                >
                  <Heart className={`h-3.5 w-3.5 ${liked ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-zinc-900 dark:text-white">Audit Report #842</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    28/28 Passed
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Autonomous audit verified zero runtime memory leaks across all test matrices.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 font-mono">Updated 2m ago</span>
                  <button type="button" className="text-xs font-semibold hover:underline flex items-center gap-1 cursor-pointer" style={{ color: accent }}>
                    <span>View Logs</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        name: 'Header & Footer Action Card',
        description: 'Standardized card partition with contextual header, seat slider, and interactive upgrade button.',
        render: (accent: string, accentText: string) => {
          const [seats, setSeats] = useState(8);
          return (
            <div className="w-full max-w-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800 shadow-xs">
              <div className="p-3.5 flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-900 dark:text-white">Team Seat Allocation</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800">Pro Tier</span>
              </div>
              <div className="p-3.5 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between items-center">
                  <span>{seats} of 10 seats claimed this billing cycle</span>
                  <span className="font-mono font-semibold text-zinc-900 dark:text-white">{Math.round((seats / 10) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="w-full accent-orange-500 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                />
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSeats(prev => Math.min(10, prev + 1))}
                  className="px-3 py-1 rounded text-xs font-semibold cursor-pointer hover:opacity-90 transition"
                  style={{ backgroundColor: accent, color: accentText }}
                >
                  Add Seat
                </button>
              </div>
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Motion Powered Toggle with Live State',
        description: 'Click to toggle switch state with smooth spring-like thumb transition.',
        render: (accent: string) => {
          const [active, setActive] = useState(true);
          return (
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActive(!active)}>
              <div
                className={`w-11 h-6 rounded-full relative p-0.5 transition-colors duration-200 ${
                  active ? '' : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
                style={active ? { backgroundColor: accent } : {}}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    active ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
              <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                {active ? 'Engine Active' : 'Engine Idle'}
              </span>
            </div>
          );
        },
      },
      {
        name: 'Inline Setting Switch with Toggle',
        description: 'Labeled configuration toggle with active status confirmation.',
        render: (accent: string) => {
          const [telemetry, setTelemetry] = useState(true);
          return (
            <div
              onClick={() => setTelemetry(!telemetry)}
              className="w-full max-w-md p-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600 transition"
            >
              <div>
                <div className="text-xs font-semibold text-zinc-900 dark:text-white">Telemetry Reporting</div>
                <div className="text-[11px] text-zinc-500">Status: {telemetry ? 'Enabled' : 'Disabled'}</div>
              </div>
              <div
                className={`w-9 h-5 rounded-full relative p-0.5 transition-colors ${
                  telemetry ? '' : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
                style={telemetry ? { backgroundColor: accent } : {}}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${telemetry ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>
          );
        },
      },
    ],
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
    variants: [
      {
        name: 'Input with Live Character Counter',
        description: 'Search field with integrated SVG icon indicator and interactive character length feedback.',
        render: () => {
          const [val, setVal] = useState('');
          return (
            <div className="w-full max-w-sm space-y-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-2.5 text-zinc-400" />
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  placeholder="Type to test live state..."
                  className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-md text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
                />
              </div>
              <div className="text-[10px] text-zinc-400 font-mono text-right">{val.length} / 40 characters</div>
            </div>
          );
        },
      },
      {
        name: 'Validation Error State with Live Fix',
        description: 'High-contrast red border with contextual warning message and instant validation.',
        render: () => {
          const [email, setEmail] = useState('invalid-email-format');
          const isValid = email.includes('@') && email.includes('.');
          return (
            <div className="w-full max-w-sm space-y-1">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-1.5 rounded-md text-xs focus:outline-none border ${
                  isValid
                    ? 'border-emerald-500 bg-emerald-50/20 text-emerald-900 dark:text-emerald-200'
                    : 'border-red-500 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-200'
                }`}
              />
              <span className={`text-[10px] ${isValid ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {isValid ? 'Email format valid' : 'Please provide a valid email address with @'}
              </span>
            </div>
          );
        },
      },
    ],
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
    variants: [
      {
        name: 'Success & Operational Alert with Dismiss Action',
        description: 'Green positive confirmation for deployments with interactive dismiss action.',
        render: () => {
          const [dismissed, setDismissed] = useState(false);
          if (dismissed) {
            return (
              <button
                type="button"
                onClick={() => setDismissed(false)}
                className="px-3 py-1.5 rounded-lg border border-emerald-500/30 text-xs text-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/20 cursor-pointer transition"
              >
                Restore Alert
              </button>
            );
          }
          return (
            <div role="alert" className="w-full max-w-md rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-emerald-800 dark:text-emerald-300 space-y-1">
              <div className="flex items-center justify-between font-semibold text-xs">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Deployment Published Successfully</span>
                </div>
                <button type="button" onClick={() => setDismissed(true)} className="text-emerald-600 hover:text-emerald-950 dark:hover:text-white cursor-pointer">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400/90 pl-6">
                All 28 component bundles were compiled and pushed to the edge registry.
              </p>
            </div>
          );
        },
      },
      {
        name: 'Informational Tip Alert with Copy Snippet',
        description: 'Neutral context callout with subtle sky tone and click-to-copy tip action.',
        render: () => {
          const [copied, setCopied] = useState(false);
          return (
            <div role="alert" className="w-full max-w-md rounded-lg border border-sky-500/40 bg-sky-500/10 p-3.5 text-sky-800 dark:text-sky-300 space-y-1">
              <div className="flex items-center justify-between font-semibold text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  <span>Zero-Runtime Optimization</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-700 dark:text-sky-300 hover:bg-sky-500/30 cursor-pointer"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-[11px] text-sky-700 dark:text-sky-400/90 pl-6">
                Silex compiles state machines down to pure WASM bytecode with 0 runtime JS bloat.
              </p>
            </div>
          );
        },
      },
    ],
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
    variants: [
      {
        name: 'Pill Badges with Interactive Dot Toggle',
        description: 'Compact status markers with toggleable health state indicator.',
        render: (accent: string) => {
          const [healthy, setHealthy] = useState(true);
          return (
            <div className="flex flex-wrap gap-2.5 items-center select-none">
              <span
                onClick={() => setHealthy(!healthy)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border cursor-pointer transition ${
                  healthy
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${healthy ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span>Status: {healthy ? 'Healthy (Edge)' : 'Degraded'}</span>
              </span>
            </div>
          );
        },
      },
      {
        name: 'Square Monospace Version Tags with Copy',
        description: 'Square tags suited for package releases with click-to-copy version.',
        render: () => {
          const [copied, setCopied] = useState(false);
          const ver = 'v0.1.0-alpha';
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(ver);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-2 py-0.5 rounded text-[11px] font-mono border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 cursor-pointer transition flex items-center gap-1.5"
              >
                <span>{ver}</span>
                <span className="text-[10px] text-zinc-400">{copied ? '(Copied)' : '(Click)'}</span>
              </button>
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Labeled Section Divider with Toggle Mode',
        description: 'Horizontal line split by a centered typography badge with toggleable label.',
        render: () => {
          const [mode, setMode] = useState<'auth' | 'continue'>('continue');
          return (
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'continue' ? 'auth' : 'continue')}
                  className="text-[10px] font-mono text-zinc-500 hover:underline cursor-pointer"
                >
                  Switch Label
                </button>
              </div>
              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-300 dark:border-zinc-800" /></div>
                <span className="relative px-2 bg-zinc-50 dark:bg-zinc-950 text-[10px] font-mono uppercase text-zinc-400">
                  {mode === 'continue' ? 'OR CONTINUE WITH' : 'AUTHENTICATE VIA GITHUB'}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        name: 'Vertical Inline Separators with Active Crumb',
        description: 'Vertical divider for navigation bars with selectable items.',
        render: (accent: string) => {
          const [crumb, setCrumb] = useState('Settings');
          return (
            <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 select-none">
              {['Dashboard', 'Settings', 'Profile'].map((item, idx) => (
                <React.Fragment key={item}>
                  {idx > 0 && <div className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700" />}
                  <button
                    type="button"
                    onClick={() => setCrumb(item)}
                    className={`cursor-pointer transition ${crumb === item ? 'font-bold' : 'hover:text-zinc-900 dark:hover:text-white'}`}
                    style={crumb === item ? { color: accent } : {}}
                  >
                    {item}
                  </button>
                </React.Fragment>
              ))}
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Animated Multi-Item Accordion with Interactive Expand',
        description: 'Smooth height transition with rotated chevron feedback and multi-row collapse.',
        render: (accent: string) => {
          const [expanded, setExpanded] = useState<string | null>('item-1');
          const items = [
            { id: 'item-1', title: 'Deterministic State Machines', body: 'Rust-compiled state machines verify transition validity at compile time.' },
            { id: 'item-2', title: 'Cross-Framework Code Generation', body: 'Polyglot bindings generate native JSX, SFCs, and template syntax.' },
          ];
          return (
            <div className="w-full max-w-md divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-300 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 overflow-hidden text-xs">
              {items.map((it) => {
                const isOpen = expanded === it.id;
                return (
                  <div key={it.id}>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : it.id)}
                      className="w-full p-3.5 flex items-center justify-between font-semibold text-zinc-900 dark:text-white cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition"
                    >
                      <span>{it.title}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={isOpen ? { color: accent } : {}} />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 pt-0 text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-950/50 leading-relaxed">
                        {it.body}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        },
      },
      {
        name: 'Compact FAQ Item with Click to Reveal',
        description: 'Single-question disclosure card with clear hover and active state.',
        render: () => {
          const [open, setOpen] = useState(false);
          return (
            <div className="w-full max-w-md p-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs space-y-2">
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between text-zinc-800 dark:text-zinc-200 cursor-pointer"
              >
                <span className="font-medium">Can Silex components be used without WebAssembly?</span>
                <span className="text-zinc-400 font-mono font-bold">{open ? '-' : '+'}</span>
              </div>
              {open && (
                <div className="pt-2 text-[11px] text-zinc-500 border-t border-zinc-100 dark:border-zinc-800">
                  Yes, standard Tailwind v4 CSS classes and lightweight TS helpers run independently.
                </div>
              )}
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Animated Micro-Tooltip with Live Hover & Click',
        description: 'Subtle slide-up tooltip triggered on hover or button click.',
        render: (accent: string, accentText: string) => {
          const [show, setShow] = useState(false);
          return (
            <div className="flex flex-col items-center gap-2 py-2">
              {show && (
                <div className="px-2.5 py-1 rounded bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[11px] font-medium shadow-lg animate-slide-in-up">
                  <span>Ctrl + S to save changes</span>
                </div>
              )}
              <button
                type="button"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onClick={() => setShow(!show)}
                className="px-3 py-1.5 rounded text-xs border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
              >
                {show ? 'Tooltip Active' : 'Hover / Click Target'}
              </button>
            </div>
          );
        },
      },
      {
        name: 'Action Shortcut Tip with Execution',
        description: 'Tooltip with keyboard shortcut and click-to-trigger search.',
        render: () => {
          const [activated, setActivated] = useState(false);
          return (
            <div
              onClick={() => {
                setActivated(true);
                setTimeout(() => setActivated(false), 1500);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 text-xs shadow-md cursor-pointer hover:bg-zinc-700 transition"
            >
              <span>{activated ? 'Searching docs...' : 'Quick Search'}</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-zinc-700 rounded font-mono">Cmd + K</kbd>
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Avatar Group with Photo Thumbnails',
        description: 'Interactive stacked team avatar sequence with image placeholders and member hover states.',
        render: (accent: string, accentText: string) => {
          const [selected, setSelected] = useState<string | null>(null);
          const team = [
            { id: '1', name: 'Sarah Chen', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
            { id: '2', name: 'Alex Rivera', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
            { id: '3', name: 'Elena Rostova', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
          ];
          return (
            <div className="space-y-2">
              <div className="flex items-center -space-x-2">
                {team.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setSelected(member.name)}
                    className="relative w-8 h-8 rounded-full border-2 border-white dark:border-zinc-950 overflow-hidden hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                    title={member.name}
                  >
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-950 font-bold text-xs flex items-center justify-center bg-zinc-800 text-zinc-300 text-[10px]">
                  +4
                </div>
              </div>
              {selected && (
                <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                  Active member: <span className="font-bold text-zinc-900 dark:text-white">{selected}</span>
                </div>
              )}
            </div>
          );
        },
      },
      {
        name: 'Status Indicator Avatar with Status Toggle',
        description: 'Interactive avatar with click-to-toggle presence status indicator.',
        render: (accent: string, accentText: string) => {
          const [online, setOnline] = useState(true);
          return (
            <div className="flex items-center gap-3">
              <div
                onClick={() => setOnline(!online)}
                className="relative inline-block cursor-pointer group"
                title="Click to toggle status"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                    alt="Engineer Profile"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-zinc-900 rounded-full transition-colors ${
                    online ? 'bg-emerald-500' : 'bg-zinc-400'
                  }`}
                />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-zinc-900 dark:text-white">Marcus Vance</div>
                <div className="text-[10px] text-zinc-500">{online ? 'Online & Available' : 'Offline / In Meeting'}</div>
              </div>
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Animated Checked State with Toggle',
        description: 'Interactive checkbox with smooth draw-in and solid accent fill.',
        render: (accent: string, accentText: string) => {
          const [checked, setChecked] = useState(true);
          return (
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setChecked(!checked)}>
              <div
                className={`w-4 h-4 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                  checked ? '' : 'border border-zinc-400 dark:border-zinc-600'
                }`}
                style={checked ? { backgroundColor: accent, color: accentText } : {}}
              >
                {checked && <Check className="h-3 w-3 stroke-[3]" />}
              </div>
              <span className="text-xs font-medium text-zinc-900 dark:text-white select-none">
                {checked ? 'Deterministic licensing accepted' : 'Click to accept terms'}
              </span>
            </div>
          );
        },
      },
      {
        name: 'Card Select Option with Active Highlight',
        description: 'Full-card selectable container with live toggle feedback.',
        render: (accent: string) => {
          const [active, setActive] = useState(true);
          return (
            <div
              onClick={() => setActive(!active)}
              className={`w-full max-w-sm p-3 rounded-xl border transition cursor-pointer select-none ${
                active ? 'border-orange-500 bg-orange-500/5' : 'border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                    active ? 'bg-orange-500 border-orange-500 text-white' : 'border-zinc-400'
                  }`}
                >
                  {active && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">Production Mode</div>
                  <div className="text-[11px] text-zinc-500">Minify bundle output and strip test harnesses</div>
                </div>
              </div>
            </div>
          );
        },
      },
    ],
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
    variants: [
      {
        name: 'Auto-Expanding Textarea with Live Counter',
        description: 'Multi-line text area with dynamic character counting and line tracking.',
        render: () => {
          const [textVal, setTextVal] = useState('Deterministic WASM state machine configuration.\nVerified zero memory leaks.');
          return (
            <div className="w-full max-w-sm space-y-1.5">
              <textarea
                rows={3}
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orange-500 transition font-mono resize-y"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>Lines: {textVal.split('\n').length}</span>
                <span>{textVal.length} chars</span>
              </div>
            </div>
          );
        },
      },
      {
        name: 'Form Validation Textarea',
        description: 'Textarea with error boundary highlighting and quick reset action.',
        render: () => {
          const [feedback, setFeedback] = useState('');
          return (
            <div className="w-full max-w-sm space-y-2">
              <textarea
                rows={2}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter audit issue details (required)..."
                className={`w-full p-2.5 rounded-lg text-xs focus:outline-none border ${
                  feedback.length > 5 ? 'border-emerald-500 bg-white dark:bg-zinc-900' : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950'
                }`}
              />
              <div className="flex justify-between items-center text-[10px]">
                <span className={feedback.length > 5 ? 'text-emerald-600' : 'text-zinc-500'}>
                  {feedback.length > 5 ? 'Requirement satisfied' : 'Min 6 characters'}
                </span>
                <button type="button" onClick={() => setFeedback('')} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline cursor-pointer">
                  Clear
                </button>
              </div>
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Striped Responsive Table with Interactive Sorting',
        description: 'High-contrast alternating row fills with click-to-sort column headers.',
        render: (accent: string, accentText: string) => {
          const [sortAsc, setSortAsc] = useState(true);
          const rows = [
            { mod: 'silex_core.wasm', size: '18.4 kB', bytes: 18400, status: 'Ready' },
            { mod: 'silex_cli', size: '1.2 MB', bytes: 1200000, status: 'Ready' },
            { mod: 'silex_ui', size: '34.2 kB', bytes: 34200, status: 'Ready' },
          ];
          const sorted = [...rows].sort((a, b) => sortAsc ? a.bytes - b.bytes : b.bytes - a.bytes);
          return (
            <div className="w-full max-w-md rounded-lg border border-zinc-300 dark:border-zinc-800 overflow-hidden text-xs shadow-xs">
              <table className="w-full text-left">
                <thead className="bg-zinc-100 dark:bg-zinc-900 font-semibold text-zinc-700 dark:text-zinc-300">
                  <tr>
                    <th className="p-2.5">Module</th>
                    <th
                      className="p-2.5 cursor-pointer hover:text-zinc-950 dark:hover:text-white flex items-center gap-1 select-none"
                      onClick={() => setSortAsc(!sortAsc)}
                    >
                      <span>Size</span>
                      <span className="font-mono text-[10px]">{sortAsc ? '▲' : '▼'}</span>
                    </th>
                    <th className="p-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {sorted.map((r, i) => (
                    <tr key={r.mod} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-950'}>
                      <td className="p-2.5 font-mono">{r.mod}</td>
                      <td className="p-2.5 font-mono text-zinc-500">{r.size}</td>
                      <td className="p-2.5 text-right text-emerald-600 font-semibold">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        },
      },
      {
        name: 'Compact Key-Value Grid with Filter',
        description: 'Dense tabular summary with active criteria selector.',
        render: () => {
          const [mode, setMode] = useState<'compiler' | 'a11y'>('compiler');
          return (
            <div className="w-full max-w-md p-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="font-semibold text-zinc-900 dark:text-white">Properties</span>
                <button
                  type="button"
                  onClick={() => setMode(mode === 'compiler' ? 'a11y' : 'compiler')}
                  className="px-2 py-0.5 rounded text-[10px] font-mono border hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                  Switch: {mode.toUpperCase()}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-zinc-500">{mode === 'compiler' ? 'Target Arch' : 'Contrast Level'}</span>
                <span className="font-mono text-zinc-900 dark:text-white text-right">{mode === 'compiler' ? 'wasm32-unknown' : 'WCAG 2.2 AA'}</span>
              </div>
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Animated Shimmer Progress Bar with Increment',
        description: 'Smooth sliding progress fill with interactive percentage increment buttons.',
        render: (accent: string, accentText: string) => {
          const [progress, setProgress] = useState(72);
          return (
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-400">
                <span>Build Optimization</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">{progress}%</span>
                  <button
                    type="button"
                    onClick={() => setProgress(prev => (prev >= 100 ? 10 : prev + 15))}
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono border hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    +15%
                  </button>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%`, backgroundColor: accent }}
                />
              </div>
            </div>
          );
        },
      },
      {
        name: 'Multi-Segment Step Indicator with Stepper',
        description: 'Divided step bar showing discrete pipeline phases with interactive advance.',
        render: (accent: string, accentText: string) => {
          const [currentStep, setCurrentStep] = useState(2);
          return (
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>Phase {currentStep} of 3</span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => (prev % 3) + 1)}
                  className="text-[10px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white underline cursor-pointer"
                >
                  Advance Phase
                </button>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 h-2 rounded-full transition-colors ${
                      step <= currentStep ? '' : 'bg-zinc-200 dark:bg-zinc-800'
                    }`}
                    style={step <= currentStep ? { backgroundColor: accent } : {}}
                  />
                ))}
              </div>
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Pulsing Media Card Skeleton with Toggle',
        description: 'Interactive placeholder simulating loading state transitions into resolved image cards.',
        render: (accent: string, accentText: string) => {
          const [loaded, setLoaded] = useState(false);
          return (
            <div className="w-full max-w-sm space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-900 dark:text-white">Live State Simulation</span>
                <button
                  type="button"
                  onClick={() => setLoaded(!loaded)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                  {loaded ? 'Simulate Loading' : 'Resolve Image'}
                </button>
              </div>
              <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
                {!loaded ? (
                  <>
                    <div className="w-full h-24 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                    <div className="w-3/4 h-3 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                    <div className="w-1/2 h-2.5 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  </>
                ) : (
                  <>
                    <img
                      src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80"
                      alt="Resolved Content"
                      className="w-full h-24 object-cover rounded-lg"
                      loading="lazy"
                    />
                    <div className="text-xs font-bold text-zinc-900 dark:text-white">WASM Polyglot Engine</div>
                    <div className="text-[11px] text-zinc-500">Fully hydrated across all browser viewports.</div>
                  </>
                )}
              </div>
            </div>
          );
        },
      },
      {
        name: 'Text Content Skeleton Line Stack',
        description: 'Multiple text line placeholders simulating incoming paragraphs with adjustable line count.',
        render: () => {
          const [lines, setLines] = useState(3);
          return (
            <div className="w-full max-w-md space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Simulate Paragraph Lines</span>
                <div className="flex gap-1">
                  <button type="button" onClick={() => setLines(2)} className="px-2 py-0.5 rounded text-[10px] font-mono border">2</button>
                  <button type="button" onClick={() => setLines(3)} className="px-2 py-0.5 rounded text-[10px] font-mono border">3</button>
                  <button type="button" onClick={() => setLines(4)} className="px-2 py-0.5 rounded text-[10px] font-mono border">4</button>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                {Array.from({ length: lines }).map((_, i) => (
                  <div key={i} className="h-2.5 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" style={{ width: `${100 - i * 15}%` }} />
                ))}
              </div>
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Underline Motion Tabs with Tab Switching',
        description: 'Sliding indicator active underline tab bar with real-time active tab switching.',
        render: (accent: string) => {
          const [activeTab, setActiveTab] = useState('arch');
          const tabs = [
            { id: 'arch', label: 'Architecture', content: 'Zero memory leaks and determinism via Rust compiler' },
            { id: 'tokens', label: 'Tokens', content: 'WCAG AA/AAA soft stone backgrounds and eye-safe palettes' },
            { id: 'telemetry', label: 'Telemetry', content: 'Instant binary instrumentation without tracking cookies' },
          ];
          const current = tabs.find(t => t.id === activeTab) || tabs[0];
          return (
            <div className="w-full max-w-md space-y-3">
              <div className="flex gap-6 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === tab.id ? '' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                    style={activeTab === tab.id ? { borderColor: accent, color: accent } : {}}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300">
                {current.content}
              </div>
            </div>
          );
        },
      },
      {
        name: 'Pill Segmented Switcher with State',
        description: 'Contained button switch tabs with smooth active background switch.',
        render: (accent: string, accentText: string) => {
          const [mode, setMode] = useState<'active' | 'history'>('active');
          return (
            <div className="inline-flex p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-medium">
              <button
                type="button"
                onClick={() => setMode('active')}
                className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                  mode === 'active' ? 'shadow-xs' : 'text-zinc-600 dark:text-zinc-400'
                }`}
                style={mode === 'active' ? { backgroundColor: accent, color: accentText } : {}}
              >
                Active Components (28)
              </button>
              <button
                type="button"
                onClick={() => setMode('history')}
                className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                  mode === 'history' ? 'shadow-xs' : 'text-zinc-600 dark:text-zinc-400'
                }`}
                style={mode === 'history' ? { backgroundColor: accent, color: accentText } : {}}
              >
                Audit History
              </button>
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Polymorphic Select Trigger with Dropdown Menu',
        description: 'Accessible select trigger with interactive options dropdown and selection state.',
        render: (accent: string) => {
          const [open, setOpen] = useState(false);
          const [selected, setSelected] = useState('React 19');
          const options = ['React 19', 'Vue 3', 'Svelte 5', 'Angular 18'];
          return (
            <div className="w-full max-w-xs relative text-xs">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white cursor-pointer"
              >
                <span>Framework: {selected}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && (
                <div className="absolute left-0 right-0 mt-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl z-20 overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800">
                  {options.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setSelected(opt);
                        setOpen(false);
                      }}
                      className={`p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer flex justify-between items-center ${
                        selected === opt ? 'font-bold' : ''
                      }`}
                      style={selected === opt ? { color: accent } : {}}
                    >
                      <span>{opt}</span>
                      {selected === opt && <Check className="h-3 w-3" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        },
      },
      {
        name: 'Option List with Active Highlight',
        description: 'Static option selector with live highlight feedback.',
        render: (accent: string) => {
          const [active, setActive] = useState('WASM');
          return (
            <div className="flex gap-1.5 text-xs">
              {['WASM', 'Pure TS', 'Polyglot'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActive(item)}
                  className={`px-3 py-1 rounded-md border font-mono transition cursor-pointer ${
                    active === item ? 'font-bold' : 'border-zinc-300 dark:border-zinc-700 text-zinc-500'
                  }`}
                  style={active === item ? { borderColor: accent, color: accent } : {}}
                >
                  {item}
                </button>
              ))}
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Motion Track Range Slider with Live Output',
        description: 'Smooth sliding thumb with real-time value display and hover lift.',
        render: (accent: string) => {
          const [val, setVal] = useState(65);
          return (
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-900 dark:text-white">Fluid Boundary</span>
                <span className="font-mono text-zinc-500">{val}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={val}
                onChange={(e) => setVal(Number(e.target.value))}
                className="w-full accent-orange-500 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
              />
            </div>
          );
        },
      },
      {
        name: 'Discrete Stepped Slider',
        description: 'Stepped range selection with snapping checkpoints.',
        render: (accent: string) => {
          const [step, setStep] = useState(2);
          return (
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Preset Level</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">Tier {step}</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
                className="w-full accent-orange-500 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>T1</span><span>T2</span><span>T3</span><span>T4</span>
              </div>
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Pressed State Toggle Button with Click',
        description: 'Two-state button with visual active depression and state toggling.',
        render: (accent: string, accentText: string) => {
          const [pressed, setPressed] = useState(true);
          return (
            <button
              type="button"
              onClick={() => setPressed(!pressed)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer select-none ${
                pressed ? 'shadow-inner' : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
              }`}
              style={pressed ? { backgroundColor: accent, color: accentText, borderColor: accent } : {}}
            >
              Toggle: {pressed ? 'ON (Active)' : 'OFF (Muted)'}
            </button>
          );
        },
      },
      {
        name: 'Icon Formatting Toggle Group with Active State',
        description: 'Rich text alignment toggles with single-choice active selection.',
        render: (accent: string, accentText: string) => {
          const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
          return (
            <div className="inline-flex rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden text-xs">
              {(['left', 'center', 'right'] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAlign(a)}
                  className={`px-3 py-1 font-semibold transition cursor-pointer ${
                    align === a ? '' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                  style={align === a ? { backgroundColor: accent, color: accentText } : {}}
                >
                  {a.toUpperCase()}
                </button>
              ))}
            </div>
          );
        },
      },
    ],
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
        variants: [
      {
        name: 'Animated Floating Popover with Trigger',
        description: 'Micro-card container positioned above trigger with interactive open/close toggle.',
        render: (accent: string, accentText: string) => {
          const [open, setOpen] = useState(false);
          return (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
                style={{ backgroundColor: accent, color: accentText }}
              >
                {open ? 'Dismiss Popover' : 'Trigger Popover'}
              </button>
              {open && (
                <div className="p-3.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl max-w-xs space-y-2 animate-slide-in-up">
                  <div className="text-xs font-bold text-zinc-900 dark:text-white">Dimensions & Sizing</div>
                  <p className="text-xs text-zinc-500">Set default padding and gutter values for component containers.</p>
                  <button type="button" onClick={() => setOpen(false)} className="w-full py-1 rounded text-xs font-semibold cursor-pointer" style={{ backgroundColor: accent, color: accentText }}>
                    Apply Config
                  </button>
                </div>
              )}
            </div>
          );
        },
      },
      {
        name: 'Contextual Action Popover with Live Click',
        description: 'Quick menu containing categorized actions with feedback.',
        render: () => {
          const [msg, setMsg] = useState<string | null>(null);
          return (
            <div className="space-y-2">
              <div className="p-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md text-xs divide-y divide-zinc-100 dark:divide-zinc-800 w-44">
                <button
                  type="button"
                  onClick={() => {
                    setMsg('Link copied to clipboard!');
                    setTimeout(() => setMsg(null), 2000);
                  }}
                  className="w-full text-left p-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-pointer transition"
                >
                  Copy Link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMsg('SVG download initiated!');
                    setTimeout(() => setMsg(null), 2000);
                  }}
                  className="w-full text-left p-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-pointer transition"
                >
                  Download SVG
                </button>
              </div>
              {msg && <div className="text-[10px] text-emerald-600 font-mono">{msg}</div>}
            </div>
          );
        },
      },
    ],
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

  sidebar: {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'Layout',
    icon: <PanelLeft className="h-4 w-4" />,
    description: 'Collapsible navigation sidebar drawer with state preservation and compact modes.',
    markdownDoc: `
### Overview
The **Sidebar** component provides a structured collapsible vertical navigation column. State is managed by \`SidebarState\` in \`silex-ui-core\`, guaranteeing zero layout shifts.
    `,
    preview: (accent: string) => {
      const [collapsed, setCollapsed] = useState(false);
      return (
        <div className="w-full max-w-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Sidebar Preview</span>
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="px-2 py-1 rounded text-[11px] font-mono border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
            >
              {collapsed ? 'Expand (w-64)' : 'Collapse (w-16)'}
            </button>
          </div>
          <div className={`border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg p-3 transition-all duration-300 flex flex-col gap-2 ${collapsed ? 'w-20' : 'w-full'}`}>
            <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: accent }}>
              <Flame className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Silex Console</span>}
            </div>
            <div className="space-y-1">
              {['Overview', 'Deployments', 'Settings'].map((item, idx) => (
                <div
                  key={item}
                  className={`flex items-center gap-2 p-1.5 rounded text-xs transition cursor-pointer ${
                    idx === 0 ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: idx === 0 ? accent : '#a1a1aa' }} />
                  {!collapsed && <span>{item}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    },
        variants: [
      {
        name: 'Collapsible Nav Sidebar with Active Selection',
        description: 'Multi-section vertical navigation with interactive item selection feedback.',
        render: (accent: string) => {
          const [activeItem, setActiveItem] = useState('button');
          return (
            <div className="w-full max-w-xs p-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1 text-xs">
              <div className="font-bold text-[10px] uppercase text-zinc-400 pb-1">Components (28)</div>
              {[
                { id: 'button', label: 'Button (Primary)' },
                { id: 'dialog', label: 'Dialog (Modal)' },
                { id: 'carousel', label: 'Carousel (Infinite)' },
              ].map((it) => (
                <div
                  key={it.id}
                  onClick={() => setActiveItem(it.id)}
                  className={`p-2 rounded-lg cursor-pointer transition flex justify-between items-center ${
                    activeItem === it.id
                      ? 'bg-orange-500/10 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                  style={activeItem === it.id ? { color: accent } : {}}
                >
                  <span>{it.label}</span>
                  {activeItem === it.id && <ChevronRight className="h-3 w-3" />}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        name: 'Icon-Only Mini Sidebar with Tooltip Hover',
        description: 'Condensed dock layout with tooltips and active item state.',
        render: (accent: string) => {
          const [activeDock, setActiveDock] = useState('P');
          return (
            <div className="flex gap-2 items-center">
              <div className="flex flex-col gap-1.5 p-1.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs w-10 items-center">
                {['P', 'F', 'O', 'S'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveDock(cat)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer ${
                      activeDock === cat ? 'bg-zinc-200 dark:bg-zinc-800 font-bold' : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                    style={activeDock === cat ? { color: accent } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <span className="text-xs text-zinc-500 font-mono">Category: {activeDock}</span>
            </div>
          );
        },
      },
    ],
    install: {
      pnpm: 'pnpm dlx silex-ui add sidebar',
      npm: 'npx silex-ui add sidebar',
      bun: 'bunx silex-ui add sidebar',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'collapsed', type: 'boolean', default: 'false', description: 'Whether the sidebar is collapsed into mini mode' },
      { name: 'onToggle', type: '() => void', default: '-', description: 'Callback fired when expand/collapse toggles' },
    ],
    code: {
      react: `import React, { useState } from "react";
import { Sidebar, SidebarItem } from "@/components/ui/sidebar";

export const Example: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)}>
      <SidebarItem icon={<HomeIcon />} label="Dashboard" active />
      <SidebarItem icon={<SettingsIcon />} label="Settings" />
    </Sidebar>
  );
};`,
      vue: `<template>
  <Sidebar :collapsed="collapsed" @toggle="collapsed = !collapsed">
    <SidebarItem label="Dashboard" :active="true" />
  </Sidebar>
</template>`,
      svelte: `<Sidebar bind:collapsed={collapsed}>
  <SidebarItem label="Dashboard" active={true} />
</Sidebar>`,
      angular: `<silex-sidebar [collapsed]="collapsed"></silex-sidebar>`,
      web: `<silex-sidebar collapsed="false"></silex-sidebar>`,
      rust: `use silex_ui_core::components::sidebar::SidebarState;

let mut side = SidebarState::new(false);
side.toggle();
assert!(side.is_collapsed());`,
    },
  },

  navbar: {
    id: 'navbar',
    name: 'Navbar',
    category: 'Layout',
    icon: <Navigation className="h-4 w-4" />,
    description: 'Sticky top navigation bar with brand identity, multi-level collapsible menu groups, and responsive drawer.',
    markdownDoc: `
### Overview
The **Navbar** provides a clean, uncluttered header architecture featuring direct links and nested collapsible dropdown menus with keyboard and click navigation.
    `,
    preview: (accent: string, accentText: string) => {
      const [open, setOpen] = useState(false);
      const [collapsibleGroupOpen, setCollapsibleGroupOpen] = useState(false);

      return (
        <div className="w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2 font-bold text-xs text-zinc-900 dark:text-white">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
              <span>Silex App</span>
            </div>

            {/* Desktop Navbar Links with Collapsible Dropdown */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">Overview</span>
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCollapsibleGroupOpen(!collapsibleGroupOpen)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <span>Resources</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${collapsibleGroupOpen ? 'rotate-180' : ''}`} />
                </button>

                {collapsibleGroupOpen && (
                  <div className="absolute left-0 mt-1 w-44 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1.5 shadow-xl z-30 space-y-0.5 animate-slide-in-up">
                    <div className="p-1.5 rounded text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">Design Tokens</div>
                    <div className="p-1.5 rounded text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">Rust ABI Spec</div>
                    <div className="p-1.5 rounded text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">Tailwind v4 Setup</div>
                  </div>
                )}
              </div>

              <span className="px-2.5 py-1 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer">Changelog</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hidden sm:inline-flex px-3 py-1 text-xs rounded-md font-semibold"
                style={{ backgroundColor: accent, color: accentText }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="sm:hidden px-2 py-1 rounded text-[11px] font-mono border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
              >
                {open ? 'Close' : 'Menu'}
              </button>
            </div>
          </div>

          {/* Mobile Accordion Drawer */}
          {open && (
            <div className="sm:hidden space-y-2 pt-1 pb-2 text-xs">
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-white">Overview</div>
              <div>
                <button
                  type="button"
                  onClick={() => setCollapsibleGroupOpen(!collapsibleGroupOpen)}
                  className="w-full flex items-center justify-between p-2 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <span>Resources</span>
                  <ChevronDown className={`h-3 w-3 ${collapsibleGroupOpen ? 'rotate-180' : ''}`} />
                </button>
                {collapsibleGroupOpen && (
                  <div className="pl-4 space-y-1 pt-1">
                    <div className="p-1.5 rounded text-zinc-600 dark:text-zinc-400">Design Tokens</div>
                    <div className="p-1.5 rounded text-zinc-600 dark:text-zinc-400">Rust ABI Spec</div>
                    <div className="p-1.5 rounded text-zinc-600 dark:text-zinc-400">Tailwind v4 Setup</div>
                  </div>
                )}
              </div>
              <div className="p-2 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">Changelog</div>
            </div>
          )}
          <div className="text-[11px] text-zinc-400">Semantic, decluttered navbar with nested collapsible link groups</div>
        </div>
      );
    },
    variants: [
      {
        name: 'Collapsible Nav Items with Live Dropdown',
        description: 'Navigation item group with animated floating dropdown card and active link clicking.',
        render: (accent: string, accentText: string) => {
          const [dropdown, setDropdown] = useState(false);
          const [currentProject, setCurrentProject] = useState('Zen UI');
          return (
            <div className="w-full max-w-md p-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-900 dark:text-white">Silex Workspace</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-1 font-semibold text-orange-600 dark:text-orange-400 cursor-pointer"
                >
                  <span>{currentProject}</span>
                  <span className="text-[10px]">▼</span>
                </button>
                {dropdown && (
                  <div className="absolute right-0 mt-2 w-32 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl z-20 p-1 divide-y divide-zinc-100 dark:divide-zinc-800">
                    {['Zen UI', 'Silex Core', 'CLI Tool'].map((proj) => (
                      <div
                        key={proj}
                        onClick={() => {
                          setCurrentProject(proj);
                          setDropdown(false);
                        }}
                        className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer rounded text-[11px]"
                      >
                        {proj}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button type="button" className="px-2.5 py-1 rounded text-xs font-semibold cursor-pointer" style={{ backgroundColor: accent, color: accentText }}>
                Deploy
              </button>
            </div>
          );
        },
      },
      {
        name: 'Breadcrumb Navigation Bar with Crumb Click',
        description: 'Hierarchical navigation path with interactive crumb selection.',
        render: () => {
          const [activeStep, setActiveStep] = useState('Components');
          return (
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              {['Home', 'Docs', 'Components'].map((crumb, idx) => (
                <React.Fragment key={crumb}>
                  {idx > 0 && <span>/</span>}
                  <button
                    type="button"
                    onClick={() => setActiveStep(crumb)}
                    className={`cursor-pointer transition ${activeStep === crumb ? 'text-zinc-900 dark:text-white font-bold' : 'hover:underline'}`}
                  >
                    {crumb}
                  </button>
                </React.Fragment>
              ))}
            </div>
          );
        },
      },
    ],
    install: {
      pnpm: 'pnpm dlx silex-ui add navbar',
      npm: 'npx silex-ui add navbar',
      bun: 'bunx silex-ui add navbar',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'sticky', type: 'boolean', default: 'true', description: 'Whether the bar sticks to viewport top' },
      { name: 'mobileOpen', type: 'boolean', default: 'false', description: 'Controls mobile dropdown drawer visibility' },
    ],
    code: {
      react: `import React from "react";
import { Navbar, NavbarBrand, NavbarNav, NavbarLink } from "@/components/ui/navbar";

export const Example: React.FC = () => {
  return (
    <Navbar sticky>
      <NavbarBrand>Acme Engine</NavbarBrand>
      <NavbarNav>
        <NavbarLink href="/docs" active>Docs</NavbarLink>
        <NavbarLink href="/pricing">Pricing</NavbarLink>
      </NavbarNav>
    </Navbar>
  );
};`,
      vue: `<template>
  <Navbar :sticky="true">
    <NavbarBrand>Acme Engine</NavbarBrand>
  </Navbar>
</template>`,
      svelte: `<Navbar sticky={true} />`,
      angular: `<silex-navbar [sticky]="true"></silex-navbar>`,
      web: `<silex-navbar sticky="true"></silex-navbar>`,
      rust: `use silex_ui_core::components::navbar::NavbarState;

let mut nav = NavbarState::new(false);
nav.toggle_mobile();
assert!(nav.is_mobile_open());`,
    },
  },

  grid: {
    id: 'grid',
    name: 'Grid',
    category: 'Layout',
    icon: <LayoutGrid className="h-4 w-4" />,
    description: 'Responsive multi-column CSS grid layout container with automated breakpoints.',
    markdownDoc: `
### Overview
The **Grid** component computes responsive column allocations and gap classes cleanly across viewport sizes.
    `,
    preview: (accent: string) => {
      return (
        <div className="w-full max-w-md grid grid-cols-3 gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              style={i === 1 ? { borderColor: accent, color: accent } : {}}
            >
              Col {i}
            </div>
          ))}
        </div>
      );
    },
        variants: [
      {
        name: 'Responsive Multi-Column Image Grid',
        description: 'Interactive gallery grid with image preview tiles and dynamic column filter controls.',
        render: (accent: string, accentText: string) => {
          const [cols, setCols] = useState<2 | 3>(2);
          const images = [
            { id: 1, title: 'WASM Compiler', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&auto=format&fit=crop&q=80' },
            { id: 2, title: 'Polyglot Sync', img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80' },
            { id: 3, title: 'Tailwind Engine', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80' },
          ];
          return (
            <div className="w-full max-w-md space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-900 dark:text-white">Grid Gallery Preview</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setCols(2)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono border transition cursor-pointer ${cols === 2 ? 'bg-zinc-200 dark:bg-zinc-800 font-bold' : 'border-zinc-300 dark:border-zinc-700'}`}
                  >
                    2 Cols
                  </button>
                  <button
                    type="button"
                    onClick={() => setCols(3)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono border transition cursor-pointer ${cols === 3 ? 'bg-zinc-200 dark:bg-zinc-800 font-bold' : 'border-zinc-300 dark:border-zinc-700'}`}
                  >
                    3 Cols
                  </button>
                </div>
              </div>
              <div className={`grid ${cols === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2`}>
                {images.slice(0, cols === 2 ? 2 : 3).map((item) => (
                  <div key={item.id} className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-xs">
                    <img src={item.img} alt={item.title} className="w-full h-16 object-cover" loading="lazy" />
                    <div className="p-1.5 text-[10px] font-medium text-zinc-800 dark:text-zinc-200 truncate">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        },
      },
      {
        name: 'Asymmetric Split Container with Interactive Ratio',
        description: 'Interactive two-column layout with toggleable width distribution (1:2 or 1:1).',
        render: (accent: string, accentText: string) => {
          const [ratio, setRatio] = useState<'1:2' | '1:1'>('1:2');
          return (
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-900 dark:text-white">Asymmetric Split View</span>
                <button
                  type="button"
                  onClick={() => setRatio(ratio === '1:2' ? '1:1' : '1:2')}
                  className="px-2 py-0.5 rounded text-[10px] font-mono border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                  Toggle: {ratio}
                </button>
              </div>
              <div className="flex gap-2 text-xs">
                <div className={`${ratio === '1:2' ? 'w-1/3' : 'w-1/2'} p-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 font-mono transition-all duration-200`}>
                  Sidebar {ratio === '1:2' ? '33%' : '50%'}
                </div>
                <div className={`${ratio === '1:2' ? 'w-2/3' : 'w-1/2'} p-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono transition-all duration-200`}>
                  Main Content {ratio === '1:2' ? '67%' : '50%'}
                </div>
              </div>
            </div>
          );
        },
      },
    ],
    install: {
      pnpm: 'pnpm dlx silex-ui add grid',
      npm: 'npx silex-ui add grid',
      bun: 'bunx silex-ui add grid',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'cols', type: '1 | 2 | 3 | 4 | 6 | 12', default: '3', description: 'Number of columns in grid' },
      { name: 'gap', type: '2 | 4 | 6 | 8', default: '4', description: 'Spacing scale between grid cells' },
    ],
    code: {
      react: `import React from "react";
import { Grid, GridItem } from "@/components/ui/grid";

export const Example: React.FC = () => {
  return (
    <Grid cols={3} gap={4}>
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
    </Grid>
  );
};`,
      vue: `<template>
  <Grid :cols="3" :gap="4">
    <GridItem>Item 1</GridItem>
  </Grid>
</template>`,
      svelte: `<Grid cols={3} gap={4}>...</Grid>`,
      angular: `<silex-grid [cols]="3" [gap]="4"></silex-grid>`,
      web: `<silex-grid cols="3" gap="4"></silex-grid>`,
      rust: `use silex_ui_core::components::grid::GridComputer;

let cls = GridComputer::compute_classes(3, 4);
assert!(cls.contains("grid-cols-3"));`,
    },
  },

  list: {
    id: 'list',
    name: 'List',
    category: 'Primitives',
    icon: <ListIcon className="h-4 w-4" />,
    description: 'Structured list group with dividers, interactive hover states, and trailing indicators.',
    markdownDoc: `
### Overview
The **List** component standardizes row-oriented records, menu options, or divided settings items with full keyboard access.
    `,
    preview: (accent: string) => {
      return (
        <div className="w-full max-w-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800 overflow-hidden shadow-sm">
          {[
            { label: 'Security & Two-Factor Authentication', badge: 'Active' },
            { label: 'API Keys & Personal Tokens', badge: '3 Keys' },
            { label: 'Billing Invoices & Receipts', badge: 'Up to date' },
          ].map((item, idx) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3.5 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition cursor-pointer"
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" style={idx === 0 ? { borderColor: accent, color: accent } : {}}>
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      );
    },
        variants: [
      {
        name: 'Interactive Action List with Media Previews',
        description: 'Selectable item rows with thumbnail images, live selection state, and chevron indicators.',
        render: (accent: string, accentText: string) => {
          const [selectedId, setSelectedId] = useState('1');
          const items = [
            { id: '1', title: 'Tailwind v4 Configuration', status: 'Active', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80' },
            { id: '2', title: 'WebAssembly ABI Bindings', status: 'Ready', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&auto=format&fit=crop&q=80' },
            { id: '3', title: 'Cross-Framework Code Generation', status: 'Synced', img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80' },
          ];
          return (
            <div className="w-full max-w-md divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-300 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 overflow-hidden text-xs">
              {items.map((it) => (
                <div
                  key={it.id}
                  onClick={() => setSelectedId(it.id)}
                  className={`p-2.5 flex items-center justify-between cursor-pointer transition ${
                    selectedId === it.id
                      ? 'bg-zinc-100 dark:bg-zinc-800/80'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={it.img} alt="" className="w-7 h-7 rounded-md object-cover border border-zinc-200 dark:border-zinc-700" loading="lazy" />
                    <span className="font-medium text-zinc-900 dark:text-white">{it.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                      {it.status}
                    </span>
                    <ChevronRight className={`h-3.5 w-3.5 transition-transform ${selectedId === it.id ? 'translate-x-0.5' : 'text-zinc-400'}`} style={selectedId === it.id ? { color: accent } : {}} />
                  </div>
                </div>
              ))}
            </div>
          );
        },
      },
      {
        name: 'Badge Key-Value Item List with Filter',
        description: 'Dense status summary rows with toggleable metric view.',
        render: () => {
          const [filter, setFilter] = useState<'all' | 'verified'>('all');
          return (
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-900 dark:text-white">Validation Statuses</span>
                <button
                  type="button"
                  onClick={() => setFilter(filter === 'all' ? 'verified' : 'all')}
                  className="text-[10px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white underline cursor-pointer"
                >
                  Show: {filter}
                </button>
              </div>
              <div className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex justify-between items-center text-xs">
                <span className="text-zinc-600 dark:text-zinc-400">Memory Leak Test</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">0 LEAKS</span>
              </div>
            </div>
          );
        },
      },
    ],
    install: {
      pnpm: 'pnpm dlx silex-ui add list',
      npm: 'npx silex-ui add list',
      bun: 'bunx silex-ui add list',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'divided', type: 'boolean', default: 'true', description: 'Renders border dividers between list items' },
      { name: 'interactive', type: 'boolean', default: 'true', description: 'Enables hover highlights and keyboard selection' },
    ],
    code: {
      react: `import React from "react";
import { List, ListItem } from "@/components/ui/list";

export const Example: React.FC = () => {
  return (
    <List divided>
      <ListItem>Account Profile</ListItem>
      <ListItem>Billing Information</ListItem>
    </List>
  );
};`,
      vue: `<template>
  <List :divided="true">
    <ListItem>Account Profile</ListItem>
  </List>
</template>`,
      svelte: `<List divided={true}><ListItem>Account</ListItem></List>`,
      angular: `<silex-list [divided]="true"></silex-list>`,
      web: `<silex-list divided="true"></silex-list>`,
      rust: `use silex_ui_core::components::list::ListComputer;

let cls = ListComputer::compute_container_classes(true);
assert!(cls.contains("divide-y"));`,
    },
  },

  carousel: {
    id: 'carousel',
    name: 'Carousel',
    category: 'Surfaces',
    icon: <GalleryHorizontal className="h-4 w-4" />,
    description: 'Infinite multi-card sliding carousel with continuous looping, drag/touch gestures, and horizontal & vertical orientations.',
    markdownDoc: `
### Overview
The **Carousel** component orchestrates multi-item continuous viewport presentations. Silex features both **horizontal multi-card sliding carousels** and **vertical infinite sliding carousels**, driven by deterministic loop indices and hardware-accelerated transforms.

### Features
- **Infinite Looping**: Slides wrap around seamlessly with modulo offset indexes.
- **Multi-Card Visibility**: Displays multiple cards simultaneously across viewports.
- **Drag & Touch Gestures**: Pointer event binding enables intuitive flick, drag, and swiping.
- **Horizontal & Vertical Layouts**: Full support for both classic row carousels and vertical stacked drawers.
- **Full Keyboard Accessibility**: ARIA roles, live region slide indicators, and accessible arrow controls.
    `,
    preview: (accent: string, accentText: string) => {
      const cards = [
        { id: 1, title: 'WASM Compiler Core', desc: '0 memory leaks across 50k transitions', tag: 'Rust Engine', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80' },
        { id: 2, title: 'Polyglot Code Generator', desc: 'React 19, Vue 3, Svelte 5 & Angular', tag: 'Universal', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80' },
        { id: 3, title: 'Tailwind v4 Optimized', desc: 'Zero runtime JS styling footprint', tag: 'CSS Engine', img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80' },
        { id: 4, title: 'WCAG 2.2 AA Contrast', desc: 'Strict eye-safe soft stone surfaces', tag: 'Accessibility', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80' },
        { id: 5, title: 'Edge Registry Sync', desc: 'Instant binary component distribution', tag: 'Distribution', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80' },
      ];

      const [offset, setOffset] = useState(0);
      const [isDragging, setIsDragging] = useState(false);
      const [startX, setStartX] = useState(0);
      const [dragDistance, setDragDistance] = useState(0);

      const next = () => setOffset(prev => prev + 1);
      const prev = () => setOffset(prev => prev - 1);

      const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setDragDistance(0);
      };

      const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        setDragDistance(e.clientX - startX);
      };

      const handlePointerUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragDistance < -40) {
          next();
        } else if (dragDistance > 40) {
          prev();
        }
        setDragDistance(0);
      };

      const visibleCount = 3;
      const visibleIndices = Array.from({ length: visibleCount }, (_, i) => {
        const raw = (offset + i) % cards.length;
        return raw >= 0 ? raw : raw + cards.length;
      });

      return (
        <div className="w-full max-w-xl space-y-4 select-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                Infinite Multi-Card Carousel
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold" style={{ backgroundColor: accent, color: accentText }}>
                Multi-Card Loop
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="p-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="p-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 cursor-grab active:cursor-grabbing p-1"
          >
            {visibleIndices.map((cardIdx, posIdx) => {
              const item = cards[cardIdx];
              return (
                <div
                  key={`${item.id}-${posIdx}`}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition flex flex-col justify-between"
                >
                  <div className="relative h-28 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-zinc-950/80 text-white backdrop-blur-xs">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    <h4 className="text-xs font-bold text-zinc-950 dark:text-white line-clamp-1">{item.title}</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="p-3 pt-0 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span>Card #{item.id}</span>
                    <span className="text-zinc-500 hover:underline cursor-pointer">Explore &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-1">
            {cards.map((_, i) => {
              const activeMod = ((offset % cards.length) + cards.length) % cards.length;
              const isActive = activeMod === i;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Jump to slide ${i + 1}`}
                  onClick={() => setOffset(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    isActive ? 'w-6' : 'w-1.5 bg-zinc-300 dark:bg-zinc-700'
                  }`}
                  style={isActive ? { backgroundColor: accent } : {}}
                />
              );
            })}
          </div>
        </div>
      );
    },
    variants: [
      {
        name: 'Infinite Horizontal Multi-Card Slider',
        description: 'Multi-card horizontal carousel with continuous wrapping, mouse/touch dragging, and arrow controls.',
        render: (accent: string, accentText: string) => {
          const items = [
            { id: 'h1', title: 'Rust WASM Core', desc: 'Deterministic 0-leak state machines', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80' },
            { id: 'h2', title: 'React 19 Hooks', desc: 'Server Actions and Suspense native', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&auto=format&fit=crop&q=80' },
            { id: 'h3', title: 'Vue 3 Composables', desc: 'Fine-grained reactivity primitives', img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80' },
            { id: 'h4', title: 'Svelte 5 Runes', desc: 'Compile-time zero-runtime signals', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&auto=format&fit=crop&q=80' },
          ];
          const [index, setIndex] = useState(0);

          const next = () => setIndex(prev => prev + 1);
          const prev = () => setIndex(prev => prev - 1);

          const visible = [0, 1].map(offset => {
            const raw = (index + offset) % items.length;
            return items[raw >= 0 ? raw : raw + items.length];
          });

          return (
            <div className="w-full max-w-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-900 dark:text-white">Continuous Horizontal Deck</span>
                <div className="flex gap-1">
                  <button type="button" onClick={prev} aria-label="Previous card" className="p-1 rounded border border-zinc-300 dark:border-zinc-700 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={next} aria-label="Next card" className="p-1 rounded text-xs font-semibold hover:opacity-90 transition" style={{ backgroundColor: accent, color: accentText }}>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {visible.map((it, idx) => (
                  <div key={`${it.id}-${idx}`} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs">
                    <img src={it.img} alt={it.title} className="w-full h-20 object-cover" loading="lazy" />
                    <div className="p-2 space-y-0.5">
                      <div className="text-xs font-bold text-zinc-900 dark:text-white">{it.title}</div>
                      <div className="text-[10px] text-zinc-500 line-clamp-1">{it.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        },
      },
      {
        name: 'Infinite Vertical Sliding Card Carousel',
        description: 'Vertically stacked card carousel with continuous upward/downward looping navigation.',
        render: (accent: string, accentText: string) => {
          const vCards = [
            { id: 'v1', time: '10:42 AM', title: 'CI Build Deployed', desc: 'Edge CDN cache revalidated', icon: 'v' },
            { id: 'v2', time: '11:15 AM', title: 'Memory Leak Check', desc: '0 leaks detected over 50k runs', icon: 'v' },
            { id: 'v3', time: '01:30 PM', title: 'WASM Runtime Ready', desc: 'All 28 components synchronized', icon: 'v' },
            { id: 'v4', time: '03:00 PM', title: 'Lighthouse Audit 100', desc: 'Full WCAG AA contrast compliance', icon: 'v' },
          ];
          const [topIdx, setTopIdx] = useState(0);

          const next = () => setTopIdx(prev => prev + 1);
          const prev = () => setTopIdx(prev => prev - 1);

          const visible = [0, 1].map(offset => {
            const raw = (topIdx + offset) % vCards.length;
            return vCards[raw >= 0 ? raw : raw + vCards.length];
          });

          return (
            <div className="w-full max-w-sm rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-white">
                  <GalleryHorizontal className="h-3.5 w-3.5 rotate-90" style={{ color: accent }} />
                  <span>Vertical Infinite Carousel</span>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={prev} aria-label="Slide up" className="p-1 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button type="button" onClick={next} aria-label="Slide down" className="p-1 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {visible.map((card, i) => (
                  <div key={`${card.id}-${i}`} className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white">{card.title}</div>
                      <div className="text-[10px] text-zinc-500">{card.desc}</div>
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {card.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        },
      },
    ],
    install: {
      pnpm: 'pnpm dlx silex-ui add carousel',
      npm: 'npx silex-ui add carousel',
      bun: 'bunx silex-ui add carousel',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Sliding axis of the multi-card carousel' },
      { name: 'visibleCount', type: 'number', default: '3', description: 'Number of visible items rendered simultaneously' },
      { name: 'loop', type: 'boolean', default: 'true', description: 'Whether carousel wraps seamlessly from end to start' },
      { name: 'dragFree', type: 'boolean', default: 'true', description: 'Enables mouse drag and touch flick gesture navigation' },
    ],
    code: {
      react: `import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrev } from "@/components/ui/carousel";

export const MultiCardCarousel: React.FC = () => {
  return (
    <Carousel orientation="horizontal" opts={{ loop: true, align: "start" }}>
      <CarouselContent className="-ml-2 md:-ml-4">
        <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
          <div className="p-4 border rounded-xl bg-card">Slide 1</div>
        </CarouselItem>
        <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
          <div className="p-4 border rounded-xl bg-card">Slide 2</div>
        </CarouselItem>
        <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
          <div className="p-4 border rounded-xl bg-card">Slide 3</div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrev />
      <CarouselNext />
    </Carousel>
  );
};`,
      vue: `<template>
  <Carousel orientation="horizontal" :loop="true">
    <CarouselItem v-for="item in items" :key="item.id">
      <div class="card">{{ item.title }}</div>
    </CarouselItem>
    <CarouselPrev />
    <CarouselNext />
  </Carousel>
</template>`,
      svelte: `<Carousel orientation="horizontal" loop={true}>
  {#each items as item}
    <CarouselItem>{item.title}</CarouselItem>
  {/each}
  <CarouselPrev />
  <CarouselNext />
</Carousel>`,
      angular: `<silex-carousel orientation="horizontal" [loop]="true">
  <silex-carousel-item *ngFor="let item of items">{{ item.title }}</silex-carousel-item>
</silex-carousel>`,
      web: `<silex-carousel orientation="horizontal" loop="true"></silex-carousel>`,
      rust: `use silex_ui_core::components::carousel::{CarouselState, CarouselOrientation};

let mut car = CarouselState::new(5, 0).with_orientation(CarouselOrientation::Horizontal);
car.next();
assert_eq!(car.current_index(), 1);`,
    },
  },

  background: {
    id: 'background',
    name: 'Background',
    category: 'Surfaces',
    icon: <Wallpaper className="h-4 w-4" />,
    description: 'Decorative anti-glare patterned canvas surfaces (dots, lines, neutral) with zero gradients.',
    markdownDoc: `
### Overview
The **Background** component renders calm, human-friendly decorative textures (grid lines, matrix dots, neutral stone) strictly honoring the anti-gradient design directive.
    `,
    preview: (accent: string) => {
      const [pattern, setPattern] = useState<'dots' | 'lines' | 'neutral'>('dots');
      return (
        <div className="w-full max-w-sm space-y-3">
          <div className="flex gap-2">
            {(['dots', 'lines', 'neutral'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPattern(p)}
                className={`px-2.5 py-1 rounded text-xs font-mono capitalize border transition ${
                  pattern === p ? 'font-bold' : 'text-zinc-500 border-zinc-200 dark:border-zinc-800'
                }`}
                style={pattern === p ? { borderColor: accent, color: accent } : {}}
              >
                {p}
              </button>
            ))}
          </div>
          <div
            className={`h-32 rounded-xl border border-zinc-300 dark:border-zinc-800 flex items-center justify-center p-4 transition-all ${
              pattern === 'dots'
                ? 'bg-zinc-50 dark:bg-zinc-950 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] text-zinc-300 dark:text-zinc-800'
                : pattern === 'lines'
                ? 'bg-zinc-50 dark:bg-zinc-950 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px)] [background-size:20px_20px] text-zinc-300 dark:text-zinc-800'
                : 'bg-stone-50 dark:bg-zinc-900'
            }`}
          >
            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-white shadow-sm">
              Surface Texture: {pattern}
            </div>
          </div>
        </div>
      );
    },
        variants: [
      {
        name: 'Subtle Dotted Radial Canvas with Spacing Control',
        description: 'Consistent design system background pattern with adjustable dot density.',
        render: () => {
          const [spacing, setSpacing] = useState<16 | 24>(16);
          return (
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Dotted Grid Density</span>
                <div className="flex gap-1">
                  <button type="button" onClick={() => setSpacing(16)} className={`px-2 py-0.5 rounded text-[10px] font-mono border ${spacing === 16 ? 'bg-zinc-200 dark:bg-zinc-800 font-bold' : ''}`}>16px</button>
                  <button type="button" onClick={() => setSpacing(24)} className={`px-2 py-0.5 rounded text-[10px] font-mono border ${spacing === 24 ? 'bg-zinc-200 dark:bg-zinc-800 font-bold' : ''}`}>24px</button>
                </div>
              </div>
              <div
                className="w-full h-20 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center text-zinc-300 dark:text-zinc-800"
                style={{
                  backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                  backgroundSize: `${spacing}px ${spacing}px`,
                }}
              >
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800">
                  {spacing}px Mesh Grid
                </span>
              </div>
            </div>
          );
        },
      },
      {
        name: 'Solid Stone Surface Card with Mode Toggle',
        description: 'High-contrast anti-glare flat solid background with contrast switch.',
        render: () => {
          const [contrast, setContrast] = useState<'soft' | 'high'>('soft');
          return (
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Flat Solid Surface</span>
                <button
                  type="button"
                  onClick={() => setContrast(contrast === 'soft' ? 'high' : 'soft')}
                  className="text-[10px] font-mono text-zinc-500 hover:underline cursor-pointer"
                >
                  Mode: {contrast.toUpperCase()}
                </button>
              </div>
              <div className={`w-full p-4 rounded-xl border text-xs transition ${
                contrast === 'soft'
                  ? 'border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                  : 'border-zinc-900 dark:border-zinc-100 bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold'
              }`}>
                Flat Solid Neutral Background (Zero Gradients, Pure Colors)
              </div>
            </div>
          );
        },
      },
    ],
    install: {
      pnpm: 'pnpm dlx silex-ui add background',
      npm: 'npx silex-ui add background',
      bun: 'bunx silex-ui add background',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'variant', type: '"dots" | "lines" | "neutral"', default: '"dots"', description: 'Geometric texture variant to display' },
    ],
    code: {
      react: `import React from "react";
import { Background } from "@/components/ui/background";

export const Example: React.FC = () => {
  return (
    <Background variant="dots">
      <div className="p-8">Content over subtle grid dots</div>
    </Background>
  );
};`,
      vue: `<template>
  <Background variant="dots">
    <div>Content</div>
  </Background>
</template>`,
      svelte: `<Background variant="dots"><div>Content</div></Background>`,
      angular: `<silex-background variant="dots"></silex-background>`,
      web: `<silex-background variant="dots"></silex-background>`,
      rust: `use silex_ui_core::components::background::BackgroundComputer;

let cls = BackgroundComputer::compute_classes("dots");
assert!(cls.contains("bg-zinc-50"));`,
    },
  },
  'motion-card': {
    id: 'motion-card',
    name: 'Motion Card',
    category: 'Motion',
    icon: <Sparkles className="h-4 w-4" />,
    description: 'Hardware-accelerated reactive surface with floating elevation and entrance gestures.',
    markdownDoc: `
### Overview
The **Motion Card** component combines deterministic state with GPU-accelerated CSS keyframe dynamics. It features smooth entrance reveals, spring-like hover elevation, and full prefers-reduced-motion accessibility guarantees.

### Features
- **GPU Transform Animations**: Operates strictly on transform and opacity to prevent layout shifts.
- **Micro-Interactions**: Hover lifts with subtle shadows and depressed active states.
- **Accessibility**: Automatic fallback to static layouts when reduced motion is preferred by the operating system.
    `,
    preview: (accent: string, accentText: string) => (
      <div className="w-full max-w-sm p-5 rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-xs font-bold text-zinc-900 dark:text-white">Motion Surface</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-medium" style={{ backgroundColor: accent, color: accentText }}>60 FPS</span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 py-4 leading-relaxed">
          Fluid interactive surfaces respond immediately to hover triggers without reflowing neighboring DOM elements.
        </p>
        <div className="flex items-center justify-between text-xs font-semibold" style={{ color: accent }}>
          <span>Explore Details</span>
          <span>&rarr;</span>
        </div>
      </div>
    ),
    variants: [
      {
        name: 'Floating Gentle Card',
        description: 'Subtle ambient float animation for highlighted dashboards and heroes.',
        render: (accent: string, accentText: string) => (
          <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm animate-float-gentle max-w-xs text-center space-y-2">
            <div className="text-xs font-bold text-zinc-900 dark:text-white">Continuous Float Micro-Interaction</div>
            <p className="text-[11px] text-zinc-500">Zero JS dependencies; pure CSS hardware accelerated.</p>
            <button type="button" className="px-3 py-1 text-xs rounded font-semibold" style={{ backgroundColor: accent, color: accentText }}>Action</button>
          </div>
        ),
      },
      {
        name: 'Slide-In Entrance Card',
        description: 'Spring entrance trigger on viewport mount.',
        render: () => (
          <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm animate-slide-in-up max-w-xs text-xs space-y-1.5">
            <div className="font-semibold text-zinc-900 dark:text-white">Staggered Mount Reveal</div>
            <div className="text-zinc-500">Translates along Y axis with cubic bezier ease-out.</div>
          </div>
        ),
      },
    ],
    install: {
      pnpm: 'pnpm dlx silex-ui add motion-card',
      npm: 'npx silex-ui add motion-card',
      bun: 'bunx silex-ui add motion-card',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'animation', type: "'float' | 'slide-up' | 'lift'", default: "'lift'", description: 'Type of motion interaction applied' },
      { name: 'className', type: 'string', default: "''", description: 'Tailwind CSS classes merged via cn()' },
    ],
    code: {
      react: `export function MotionCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("p-5 rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none", className)}>
      {children}
    </div>
  );
}`,
      vue: `<template>
  <div class="p-5 rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none">
    <slot />
  </div>
</template>`,
      svelte: `<div class="p-5 rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none">
  <slot />
</div>`,
      angular: `@Component({
  selector: 'silex-motion-card',
  template: '<div class="p-5 rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none"><ng-content></ng-content></div>'
})
export class MotionCardComponent {}`,
      web: `<div class="p-5 rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none">
  <slot></slot>
</div>`,
      rust: `// Motion Card Primitive - Silex Rust Core
pub struct MotionCardProps {
    pub animation: String,
    pub class_name: String,
}`,
    },
  },

  'motion-marquee': {
    id: 'motion-marquee',
    name: 'Motion Marquee',
    category: 'Motion',
    icon: <GalleryHorizontal className="h-4 w-4" />,
    description: 'Infinitely looping ticker strip for partner logos, tech stacks, and live metrics.',
    markdownDoc: `
### Overview
The **Motion Marquee** component provides smooth, non-blocking horizontal ticker loops. Built with twin duplicated child stacks to guarantee continuous seamless looping without visible seams or layout stutters.
    `,
    preview: (accent: string, accentText: string) => (
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-2 relative">
        <div className="animate-marquee gap-4 flex items-center">
          {['React 19', 'Rust WASM', 'Tailwind v4', 'Svelte 5', 'Vue 3', 'Angular 19', 'React 19', 'Rust WASM', 'Tailwind v4'].map((item, idx) => (
            <span key={idx} className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
    variants: [
      {
        name: 'Fast Velocity Metric Marquee',
        description: 'Rapid ticker for live performance logs and build status.',
        render: () => (
          <div className="w-full max-w-md overflow-hidden rounded-lg bg-zinc-900 p-2 text-white text-xs font-mono">
            <div className="animate-marquee gap-6 flex">
              <span>WCAG AA: PASS</span>
              <span>MEMORY LEAKS: 0</span>
              <span>TEST SUITES: 16/16</span>
              <span>FPS: 60</span>
              <span>WCAG AA: PASS</span>
              <span>MEMORY LEAKS: 0</span>
            </div>
          </div>
        ),
      },
    ],
    install: {
      pnpm: 'pnpm dlx silex-ui add motion-marquee',
      npm: 'npx silex-ui add motion-marquee',
      bun: 'bunx silex-ui add motion-marquee',
      cargo: 'cargo add silex-ui-core',
    },
    props: [
      { name: 'speed', type: "'slow' | 'normal' | 'fast'", default: "'normal'", description: 'Scroll animation velocity' },
      { name: 'pauseOnHover', type: 'boolean', default: 'true', description: 'Halts motion on pointer hover' },
      { name: 'className', type: 'string', default: "''", description: 'Tailwind CSS classes merged via cn()' },
    ],
    code: {
      react: `export function MotionMarquee({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden w-full relative", className)}>
      <div className="animate-marquee gap-4 flex items-center motion-reduce:transform-none">
        {children}
      </div>
    </div>
  );
}`,
      vue: `<template>
  <div class="overflow-hidden w-full relative">
    <div class="animate-marquee gap-4 flex items-center motion-reduce:transform-none">
      <slot />
    </div>
  </div>
</template>`,
      svelte: `<div class="overflow-hidden w-full relative">
  <div class="animate-marquee gap-4 flex items-center motion-reduce:transform-none">
    <slot />
  </div>
</div>`,
      angular: `@Component({
  selector: 'silex-motion-marquee',
  template: '<div class="overflow-hidden w-full relative"><div class="animate-marquee gap-4 flex items-center motion-reduce:transform-none"><ng-content></ng-content></div></div>'
})
export class MotionMarqueeComponent {}`,
      web: `<div class="overflow-hidden w-full relative">
  <div class="animate-marquee gap-4 flex items-center motion-reduce:transform-none">
    <slot></slot>
  </div>
</div>`,
      rust: `// Motion Marquee Component
pub struct MarqueeProps {
    pub speed: u32,
}`,
    },
  },
};

// ----------------------------------------------------------------------------
// Guide Documentation Pages
// ----------------------------------------------------------------------------

function IntroductionDoc({ activeTheme }: { activeTheme: ThemeConfig }) {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCode = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div id="overview" className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border" style={{ color: activeTheme.accentHex, borderColor: activeTheme.accentHex }}>
          <Sparkles className="h-3.5 w-3.5" />
          <span>Next-Generation Component Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
          Introduction to Silex UI
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          <strong>Silex</strong> is a high-performance, polyglot UI component engine designed for modern web applications. 
          Built on a pure Rust deterministic core with zero runtime garbage collection overhead, Silex pairs the code-ownership 
          full source code ownership with cross-framework polyglot code generation, mathematical WCAG AA contrast compliance, and humanized eye-safe theming.
        </p>
      </div>

      {/* Core Architectural Pillars */}
      <div id="core-pillars" className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2">
          <Cpu className="h-5 w-5" style={{ color: activeTheme.accentHex }} />
          <span>Core Architectural Pillars</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
              <Cpu className="h-4 w-4 text-orange-500" />
              <span>Pure Rust Deterministic Core</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every interactive state transition (modals, dropdowns, switches, tabs) is governed by formal Rust state machines with algebraic data types. Impossible component states are strictly unrepresentable.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
              <Layers className="h-4 w-4 text-sky-500" />
              <span>Native Polyglot Generation</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Never get locked into a single frontend library. Silex natively generates idiomatic source code for React 19, Vue 3, Svelte 5, Angular 19, Web Components, and native Rust WebAssembly.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Mathematical Accessibility & Eye Safety</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              All 8 humanized palettes feature calculated WCAG AA/AAA contrast ratios with anti-glare light modes (soft stone backgrounds) and zero harsh pure-white eye fatigue.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
              <Flame className="h-4 w-4 text-rose-500" />
              <span>Tailwind CSS v4 & Zero Gradients</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Crafted natively for modern CSS engines with strict solid color upholdings, zero arbitrary gradients, and full dark-mode selector ergonomics without layout shifts.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Scaffolding */}
      <div id="quick-start" className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2">
          <Terminal className="h-5 w-5" style={{ color: activeTheme.accentHex }} />
          <span>Quick Start Scaffolding</span>
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Initialize Silex in any frontend project in under 30 seconds using your package manager of choice or Cargo:
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Step 1: Initialize Project Configuration</span>
              <code className="text-xs font-mono text-orange-600 dark:text-orange-400">npx silex-ui init</code>
            </div>
            <button
              type="button"
              onClick={() => copyCode('npx silex-ui init')}
              className="px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-300 dark:border-zinc-700 rounded-md transition"
            >
              {copiedCmd === 'npx silex-ui init' ? <Check className="h-3.5 w-3.5 text-emerald-500 inline" /> : <Copy className="h-3.5 w-3.5 inline" />}
            </button>
          </div>

          <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Step 2: Add Components Directly to your Codebase</span>
              <code className="text-xs font-mono text-orange-600 dark:text-orange-400">npx silex-ui add button dialog card tabs</code>
            </div>
            <button
              type="button"
              onClick={() => copyCode('npx silex-ui add button dialog card tabs')}
              className="px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-300 dark:border-zinc-700 rounded-md transition"
            >
              {copiedCmd === 'npx silex-ui add button dialog card tabs' ? <Check className="h-3.5 w-3.5 text-emerald-500 inline" /> : <Copy className="h-3.5 w-3.5 inline" />}
            </button>
          </div>
        </div>
      </div>

      {/* Polyglot Ecosystem Compatibility */}
      <div id="polyglot-ecosystem" className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2">
          <Boxes className="h-5 w-5" style={{ color: activeTheme.accentHex }} />
          <span>Multi-Framework Code Ownership</span>
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Components are never installed as blackbox dependencies. Instead, clean, fully-typed source files are placed directly into your <code className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-mono">@/components/ui</code> folder.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { name: 'React 19', tag: 'TSX + Hooks' },
            { name: 'Vue 3', tag: 'SFC + Composition' },
            { name: 'Svelte 5', tag: 'Runes ($state)' },
            { name: 'Angular 19', tag: 'Signals & Standalone' },
            { name: 'Web Comps', tag: 'Custom Elements' },
            { name: 'Rust Core', tag: 'WebAssembly & CLI' },
          ].map((item) => (
            <div key={item.name} className="p-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center space-y-1">
              <span className="text-xs font-bold text-zinc-900 dark:text-white block">{item.name}</span>
              <span className="text-[10px] text-zinc-500 font-mono block">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps CTA */}
      <div id="next-steps" className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-4">
        <Link
          to="/docs/installation"
          className="flex-1 p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 transition flex items-center justify-between group"
        >
          <div>
            <span className="text-xs text-zinc-500 font-medium">Next in Setup</span>
            <div className="font-semibold text-sm text-zinc-950 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition">
              Detailed Installation & Framework Guides
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-orange-500 transition group-hover:translate-x-1" />
        </Link>

        <Link
          to="/docs/installation"
          className="flex-1 p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 transition flex items-center justify-between group"
        >
          <div>
            <span className="text-xs text-zinc-500 font-medium">Next in Setup</span>
            <div className="font-semibold text-sm text-zinc-950 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition">
              Detailed Installation & Framework Guides
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-orange-500 transition group-hover:translate-x-1" />
        </Link>
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

// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Independent Documentation Sidebar Component
// ----------------------------------------------------------------------------

export interface DocSidebarProps {
  sidebarCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileDrawerOpen: boolean;
  onCloseMobileDrawer: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categories: string[];
  openCategories: Record<string, boolean>;
  onToggleCategory: (cat: string) => void;
  gettingStartedOpen: boolean;
  onToggleGettingStarted: () => void;
  componentsData: Record<string, ComponentDoc>;
  className?: string;
}

export function DocSidebar({
  sidebarCollapsed,
  onToggleCollapse,
  mobileDrawerOpen,
  onCloseMobileDrawer,
  searchQuery,
  onSearchChange,
  categories,
  openCategories,
  onToggleCategory,
  gettingStartedOpen,
  onToggleGettingStarted,
  componentsData,
  className = "",
}: DocSidebarProps) {
  // Mapping each documentation category to proper Lucide React icons
  const getCategoryIcon = (cat: string, iconClass = "h-3.5 w-3.5") => {
    switch (cat) {
      case 'Primitives':
        return <SquareCode className={iconClass} />;
      case 'Form Controls':
        return <Sliders className={iconClass} />;
      case 'Overlays':
        return <Layers className={iconClass} />;
      case 'Feedback':
        return <AlertTriangle className={iconClass} />;
      case 'Layout':
        return <LayoutGrid className={iconClass} />;
      case 'Surfaces':
        return <GalleryHorizontal className={iconClass} />;
      case 'Motion':
        return <Zap className={iconClass} />;
      default:
        return <Boxes className={iconClass} />;
    }
  };

  const sidebarNavContent = (
    <div className="space-y-4 text-sm">
      {/* Search Bar */}
      <div className="relative">
        <Search className="h-4 w-4 absolute left-3 top-2.5 text-zinc-400" />
        <input
          type="text"
          aria-label="Search documentation and components"
          placeholder="Search docs & components..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs text-zinc-900 dark:text-white focus:outline-none transition"
        />
      </div>

      {/* Getting Started Category */}
      <div>
        <button
          type="button"
          onClick={onToggleGettingStarted}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 py-1 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
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
              { name: 'Installation', path: '/docs/installation' },
              { name: 'Theming & Tokens', path: '/docs/theming' },
              { name: 'Configuration', path: '/docs/configuration' },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobileDrawer}
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
          const catComponents = Object.values(componentsData).filter(
            (c) => c.category === category && c.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (catComponents.length === 0) return null;
          const isOpen = openCategories[category] ?? true;

          return (
            <div key={category} className="space-y-1">
              <button
                type="button"
                onClick={() => onToggleCategory(category)}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 py-1 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {getCategoryIcon(category, "h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors")}
                  <span>{category}</span>
                  <span className="text-[10px] font-normal lowercase tracking-normal text-zinc-400 dark:text-zinc-500">
                    ({catComponents.length})
                  </span>
                </div>
                {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>

              {isOpen && (
                <div className="space-y-0.5 pl-2">
                  {catComponents.map((comp) => (
                    <NavLink
                      key={comp.id}
                      to={`/docs/components/${comp.id}`}
                      onClick={onCloseMobileDrawer}
                      className={({ isActive }) => `flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition group ${
                        isActive
                          ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                      }`}
                    >
                      <span className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                        {comp.icon}
                      </span>
                      <span className="truncate font-medium">{comp.name}</span>
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
    <>
      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-label="Mobile Documentation Navigation" 
          className="fixed inset-0 z-50 bg-black/60 md:hidden flex animate-slide-in-up"
        >
          <div className="w-4/5 max-w-xs h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-5 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Documentation
              </span>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={onCloseMobileDrawer}
                className="p-1 rounded-md text-zinc-500 hover:text-zinc-950 dark:hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarNavContent}
          </div>
          <div 
            className="flex-1" 
            onClick={onCloseMobileDrawer} 
            aria-hidden="true" 
          />
        </div>
      )}

      {/* Independent Fixed Desktop Aside with Dedicated Scrollbar */}
      <aside 
        aria-label="Documentation Navigation"
        className={`hidden md:block fixed top-16 bottom-0 z-30 border-r border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-all duration-300 overflow-y-auto scrollbar-thin ${
          sidebarCollapsed ? 'w-14' : 'w-64'
        } ${className}`}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
            {!sidebarCollapsed && (
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Documentation
              </span>
            )}
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          </div>

          {!sidebarCollapsed ? (
            sidebarNavContent
          ) : (
            <div className="flex flex-col items-center gap-2.5 py-2">
              {/* Getting started icon */}
              <button
                type="button"
                onClick={onToggleCollapse}
                className="w-9 h-9 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer"
                title="Expand Getting Started"
              >
                <FileText className="h-4 w-4" />
              </button>

              <div className="w-6 border-t border-zinc-200 dark:border-zinc-800 my-1" />

              {/* Category icons */}
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={onToggleCollapse}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer group"
                  title={`Expand ${cat} (${Object.values(componentsData).filter(c => c.category === cat).length})`}
                >
                  {getCategoryIcon(cat, "h-4 w-4 transition-transform group-hover:scale-110")}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// ----------------------------------------------------------------------------
// Independent Main Layout Container
// ----------------------------------------------------------------------------

export interface MainLayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  tableOfContents?: React.ReactNode;
  onOpenMobileDrawer?: () => void;
  currentLabel?: string;
  className?: string;
}

export function MainLayout({
  sidebar,
  children,
  tableOfContents,
  onOpenMobileDrawer,
  currentLabel,
  sidebarCollapsed = false,
  className = "",
}: MainLayoutProps & { sidebarCollapsed?: boolean }) {
  return (
    <div className={`min-h-[calc(100vh-4rem)] w-full flex flex-col ${className}`}>
      {/* Decoupled Fixed Sidebar (renders completely independently) */}
      {sidebar}

      {/* Main Content Viewport Wrapper with dynamic margin offset for the fixed sidebar */}
      <div className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-14' : 'md:ml-64'
      }`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col lg:flex-row gap-8">
          {/* Mobile Breadcrumb & Drawer Trigger Bar */}
          {onOpenMobileDrawer && (
            <div className="md:hidden flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 w-full">
              <button
                type="button"
                onClick={onOpenMobileDrawer}
                className="inline-flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
              >
                <PanelLeft className="h-4 w-4" />
                <span>Documentation Index</span>
              </button>
              {currentLabel && (
                <span className="text-xs font-mono text-zinc-500">
                  {currentLabel}
                </span>
              )}
            </div>
          )}

          {/* Main Independent Content Area */}
          <main className="flex-1 min-w-0 space-y-8">
            {children}
          </main>

          {/* Table of Contents Slot */}
          {tableOfContents}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 3-Column Documentation Page (Orchestrates Sidebar & MainLayout)
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Interactive Variety Card Component with Code Snippet & Copy Action
// ----------------------------------------------------------------------------

interface VarietyCardProps {
  variant: {
    name: string;
    description: string;
    render: (accent: string, accentText: string) => React.ReactNode;
    code?: string;
  };
  activeTheme: ThemeConfig;
  defaultCodeSnippet: string;
}

function VarietyCard({ variant, activeTheme, defaultCodeSnippet }: VarietyCardProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate an accurate, clean snippet if custom one is not provided
  const codeToDisplay = variant.code || `// ${variant.name} Variant
// ${variant.description}
${defaultCodeSnippet}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs overflow-hidden transition-all duration-200">
      {/* Variety Card Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-900 dark:text-white">{variant.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              Interactive
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{variant.description}</p>
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border transition cursor-pointer ${
              showCode
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-300 dark:border-zinc-700'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
            title="Toggle Code Snippet"
          >
            <Code className="h-3.5 w-3.5" />
            <span>{showCode ? 'Hide Code' : 'View Code'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition cursor-pointer"
            title="Copy Variant Code"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Variety Preview Canvas */}
      <div className="p-6 sm:p-8 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] text-zinc-300 dark:text-zinc-800 min-h-[120px]">
        <div className="text-zinc-900 dark:text-white w-full flex justify-center">
          <ErrorBoundary>
            <ComponentPreviewRenderer
              previewFn={variant.render}
              accent={activeTheme.accentHex}
              accentText={activeTheme.accentTextHex}
            />
          </ErrorBoundary>
        </div>
      </div>

      {/* Expandable Code Snippet Block */}
      {showCode && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-900 p-3 animate-slide-in-up">
          <div className="flex items-center justify-between pb-2 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
            <span>JSX / Template Snippet</span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copied ? 'Copied to clipboard' : 'Copy code snippet'}
            </button>
          </div>
          <CodeHighlight code={codeToDisplay} language="react" />
        </div>
      )}
    </div>
  );
}

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
    'Motion': true,
  });

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const categories = ['Primitives', 'Form Controls', 'Overlays', 'Feedback', 'Layout', 'Surfaces', 'Motion'];

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentComponent = componentId ? COMPONENTS_DATA[componentId] : null;

  const sections = currentComponent ? [
    { id: 'overview', title: 'Overview' },
    { id: 'interactive-preview', title: 'Interactive Preview' },
    ...(currentComponent.variants && currentComponent.variants.length > 0
      ? [{ id: 'component-varieties', title: 'Component Varieties' }]
      : []),
    { id: 'installation', title: 'Installation' },
    { id: 'polyglot-usage', title: 'Multi-Framework Usage' },
    { id: 'props-reference', title: 'Props Table' },
  ] : docSlug === 'introduction' ? [
    { id: 'overview', title: 'Overview' },
    { id: 'core-pillars', title: 'Core Pillars' },
    { id: 'quick-start', title: 'Quick Start' },
    { id: 'polyglot-ecosystem', title: 'Polyglot Generation' },
    { id: 'next-steps', title: 'Next Steps' },
  ] : [
    { id: 'overview', title: 'Overview' },
  ];

  return (
    <MainLayout
      sidebarCollapsed={sidebarCollapsed}
      onOpenMobileDrawer={() => setMobileDocsDrawerOpen(true)}
      currentLabel={currentComponent ? currentComponent.name : docSlug ? docSlug.toUpperCase() : 'Docs'}
      sidebar={
        <DocSidebar
          sidebarCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileDrawerOpen={mobileDocsDrawerOpen}
          onCloseMobileDrawer={() => setMobileDocsDrawerOpen(false)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={categories}
          openCategories={openCategories}
          onToggleCategory={toggleCategory}
          gettingStartedOpen={gettingStartedOpen}
          onToggleGettingStarted={() => setGettingStartedOpen(!gettingStartedOpen)}
          componentsData={COMPONENTS_DATA}
        />
      }
      tableOfContents={
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
      }
    >
      {docSlug === 'introduction' && <IntroductionDoc activeTheme={activeTheme} />}
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

          {/* Interactive Preview & Playground */}
          <div id="interactive-preview" className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                <Sparkles className="h-4 w-4" style={{ color: activeTheme.accentHex }} />
                <span>Interactive Playground & Live Preview</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                Full Reactive Properties Toolbar
              </span>
            </div>

            <ComponentPlayground
              key={currentComponent.id}
              component={currentComponent}
              activeTheme={activeTheme}
              defaultSnippet={currentComponent.code[activeFramework] || currentComponent.code.react}
            />
          </div>

          {/* Component Varieties & Layout Patterns */}
          {currentComponent.variants && currentComponent.variants.length > 0 && (
            <div id="component-varieties" className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                <Layers className="h-4 w-4" style={{ color: activeTheme.accentHex }} />
                <span>Component Varieties & Layout Patterns</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Independent layout compositions, sizing adaptations, and component variants available in the Silex system.
              </p>

              <div className="flex flex-col gap-4">
                {currentComponent.variants.map((v, idx) => (
                  <VarietyCard
                    key={v.name || idx}
                    variant={v}
                    activeTheme={activeTheme}
                    defaultCodeSnippet={currentComponent.code[activeFramework] || currentComponent.code.react}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Installation */}
          <div id="installation" className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Installation</h3>
              <div className="flex gap-1">
                {(['pnpm', 'npm', 'bun', 'cargo'] as const).map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => setInstallPm(pm)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition cursor-pointer ${
                      installPm === pm
                        ? 'bg-zinc-200 dark:bg-zinc-800 font-bold border'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
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

          {/* Component Pager: Previous & Next Navigation */}
          {(() => {
            const keys = Object.keys(COMPONENTS_DATA);
            const currentIdx = keys.indexOf(currentComponent.id);
            const prevComp = currentIdx > 0 ? COMPONENTS_DATA[keys[currentIdx - 1]] : null;
            const nextComp = currentIdx < keys.length - 1 ? COMPONENTS_DATA[keys[currentIdx + 1]] : null;

            return (
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                {prevComp ? (
                  <NavLink
                    to={`/docs/components/${prevComp.id}`}
                    className="flex-1 p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900 transition flex items-center gap-3 group"
                  >
                    <ChevronLeft className="h-5 w-5 text-zinc-400 group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <div className="text-[10px] uppercase font-mono text-zinc-400">Previous Component</div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white group-hover:underline">{prevComp.name}</div>
                    </div>
                  </NavLink>
                ) : <div className="flex-1" />}

                {nextComp ? (
                  <NavLink
                    to={`/docs/components/${nextComp.id}`}
                    className="flex-1 p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900 transition flex items-center justify-end text-right gap-3 group"
                  >
                    <div>
                      <div className="text-[10px] uppercase font-mono text-zinc-400">Next Component</div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white group-hover:underline">{nextComp.name}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                  </NavLink>
                ) : <div className="flex-1" />}
              </div>
            );
          })()}
        </div>
      )}
    </MainLayout>
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
        <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
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
