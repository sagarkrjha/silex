#!/usr/bin/env node

import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const command = args[0];

const TEMPLATES = {
  button: [
    'import * as React from "react";',
    '',
    'export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {',
    '  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";',
    '  size?: "sm" | "md" | "lg";',
    '}',
    '',
    'export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(',
    '  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {',
    '    const base = "inline-flex items-center justify-center font-medium transition-all rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 disabled:pointer-events-none";',
    '    const variants = {',
    '      primary: "bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold shadow-sm",',
    '      secondary: "bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700",',
    '      outline: "border border-stone-700 hover:bg-stone-800 text-stone-200",',
    '      ghost: "hover:bg-stone-800/60 text-stone-300 hover:text-stone-100",',
    '      destructive: "bg-red-900/60 hover:bg-red-800/80 text-red-200 border border-red-800/60",',
    '    };',
    '    const sizes = {',
    '      sm: "h-8 px-3 text-xs gap-1.5",',
    '      md: "h-9 px-4 text-sm gap-2",',
    '      lg: "h-11 px-6 text-base gap-2.5",',
    '    };',
    '',
    '    return (',
    '      <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>',
    '        {children}',
    '      </button>',
    '    );',
    '  }',
    ');',
    'Button.displayName = "Button";',
  ].join("\n"),

  card: [
    'import * as React from "react";',
    '',
    'export function Card({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {',
    '  return (',
    '    <div className={`rounded-lg border border-stone-800 bg-stone-900/60 p-6 backdrop-blur shadow-sm ${className}`} {...props}>',
    '      {children}',
    '    </div>',
    '  );',
    '}',
    '',
    'export function CardHeader({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {',
    '  return <div className={`flex flex-col space-y-1.5 pb-4 ${className}`} {...props}>{children}</div>;',
    '}',
    '',
    'export function CardTitle({ className = "", children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {',
    '  return <h3 className={`text-lg font-semibold tracking-tight text-stone-100 ${className}`} {...props}>{children}</h3>;',
    '}',
    '',
    'export function CardDescription({ className = "", children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {',
    '  return <p className={`text-sm text-stone-400 ${className}`} {...props}>{children}</p>;',
    '}',
    '',
    'export function CardContent({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {',
    '  return <div className={`pt-0 ${className}`} {...props}>{children}</div>;',
    '}',
  ].join("\n"),

  switch: [
    'import * as React from "react";',
    '',
    'export interface SwitchProps {',
    '  checked?: boolean;',
    '  defaultChecked?: boolean;',
    '  onCheckedChange?: (checked: boolean) => void;',
    '  disabled?: boolean;',
    '  className?: string;',
    '  id?: string;',
    '}',
    '',
    'export function Switch({ checked: controlledChecked, defaultChecked = false, onCheckedChange, disabled = false, className = "", id }: SwitchProps) {',
    '  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);',
    '  const isChecked = controlledChecked !== undefined ? controlledChecked : uncontrolledChecked;',
    '',
    '  const toggle = () => {',
    '    if (disabled) return;',
    '    const next = !isChecked;',
    '    if (controlledChecked === undefined) setUncontrolledChecked(next);',
    '    onCheckedChange?.(next);',
    '  };',
    '',
    '  return (',
    '    <button',
    '      type="button"',
    '      role="switch"',
    '      id={id}',
    '      aria-checked={isChecked}',
    '      disabled={disabled}',
    '      onClick={toggle}',
    '      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${',
    '        isChecked ? "bg-amber-600" : "bg-stone-800"',
    '      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}',
    '    >',
    '      <span',
    '        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-stone-100 shadow-md ring-0 transition-transform ${',
    '          isChecked ? "translate-x-5" : "translate-x-0.5"',
    '        }`}',
    '      />',
    '    </button>',
    '  );',
    '}',
  ].join("\n"),

  dialog: [
    'import * as React from "react";',
    '',
    'export interface DialogProps {',
    '  open: boolean;',
    '  onOpenChange: (open: boolean) => void;',
    '  title: string;',
    '  description?: string;',
    '  children?: React.ReactNode;',
    '}',
    '',
    'export function Dialog({ open, onOpenChange, title, description, children }: DialogProps) {',
    '  if (!open) return null;',
    '',
    '  return (',
    '    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">',
    '      <div className="relative w-full max-w-lg rounded-xl border border-stone-800 bg-stone-900 p-6 shadow-2xl animate-in fade-in zoom-in-95">',
    '        <div className="flex flex-col space-y-1.5 pb-4">',
    '          <h2 className="text-lg font-semibold text-stone-100">{title}</h2>',
    '          {description && <p className="text-sm text-stone-400">{description}</p>}',
    '        </div>',
    '        <div className="py-2">{children}</div>',
    '        <div className="mt-6 flex justify-end gap-2">',
    '          <button',
    '            onClick={() => onOpenChange(false)}',
    '            className="px-4 py-2 text-sm font-medium rounded-md border border-stone-700 text-stone-300 hover:bg-stone-800"',
    '          >',
    '            Close',
    '          </button>',
    '        </div>',
    '      </div>',
    '    </div>',
    '  );',
    '}',
  ].join("\n"),

  sheet: [
    'import * as React from "react";',
    '',
    'export interface SheetProps {',
    '  open: boolean;',
    '  onOpenChange: (open: boolean) => void;',
    '  side?: "right" | "left" | "top" | "bottom";',
    '  title: string;',
    '  description?: string;',
    '  children?: React.ReactNode;',
    '}',
    '',
    'export function Sheet({ open, onOpenChange, side = "right", title, description, children }: SheetProps) {',
    '  if (!open) return null;',
    '',
    '  const positions = {',
    '    right: "inset-y-0 right-0 w-full sm:max-w-md border-l",',
    '    left: "inset-y-0 left-0 w-full sm:max-w-md border-r",',
    '    top: "inset-x-0 top-0 border-b",',
    '    bottom: "inset-x-0 bottom-0 border-t",',
    '  };',
    '',
    '  return (',
    '    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm">',
    '      <div className={`fixed bg-stone-900 border-stone-800 p-6 shadow-2xl transition ease-in-out duration-300 ${positions[side]}`}>',
    '        <div className="flex items-center justify-between pb-4">',
    '          <div>',
    '            <h2 className="text-lg font-semibold text-stone-100">{title}</h2>',
    '            {description && <p className="text-sm text-stone-400">{description}</p>}',
    '          </div>',
    '          <button onClick={() => onOpenChange(false)} className="text-stone-400 hover:text-stone-100 text-sm">',
    '            Close',
    '          </button>',
    '        </div>',
    '        <div>{children}</div>',
    '      </div>',
    '    </div>',
    '  );',
    '}',
  ].join("\n"),

  badge: [
    'import * as React from "react";',
    '',
    'export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {',
    '  variant?: "default" | "secondary" | "outline" | "success" | "warning";',
    '}',
    '',
    'export function Badge({ className = "", variant = "default", children, ...props }: BadgeProps) {',
    '  const variants = {',
    '    default: "bg-amber-600/20 text-amber-300 border-amber-600/40",',
    '    secondary: "bg-stone-800 text-stone-300 border-stone-700",',
    '    outline: "border-stone-700 text-stone-300",',
    '    success: "bg-emerald-950/60 text-emerald-400 border-emerald-800/60",',
    '    warning: "bg-amber-950/60 text-amber-400 border-amber-800/60",',
    '  };',
    '',
    '  return (',
    '    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`} {...props}>',
    '      {children}',
    '    </div>',
    '  );',
    '}',
  ].join("\n"),

  input: [
    'import * as React from "react";',
    '',
    'export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {',
    '  error?: boolean;',
    '}',
    '',
    'export const Input = React.forwardRef<HTMLInputElement, InputProps>(',
    '  ({ className = "", error = false, ...props }, ref) => {',
    '    return (',
    '      <input',
    '        ref={ref}',
    '        className={`flex h-9 w-full rounded-md border bg-stone-900/50 px-3 py-1 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${',
    '          error ? "border-red-500 focus:ring-red-500/50" : "border-stone-800 focus:border-amber-500/50 focus:ring-amber-500/20"',
    '        } ${className}`}',
    '        {...props}',
    '      />',
    '    );',
    '  }',
    ');',
    'Input.displayName = "Input";',
  ].join("\n"),

  alert: [
    'import * as React from "react";',
    '',
    'export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {',
    '  variant?: "info" | "warning" | "destructive" | "success";',
    '}',
    '',
    'export function Alert({ className = "", variant = "info", children, ...props }: AlertProps) {',
    '  const variants = {',
    '    info: "border-stone-800 bg-stone-900/50 text-stone-200",',
    '    warning: "border-amber-800/50 bg-amber-950/20 text-amber-200",',
    '    destructive: "border-red-900/50 bg-red-950/20 text-red-200",',
    '    success: "border-emerald-800/50 bg-emerald-950/20 text-emerald-200",',
    '  };',
    '',
    '  return (',
    '    <div role="alert" className={`relative w-full rounded-lg border p-4 text-sm ${variants[variant]} ${className}`} {...props}>',
    '      {children}',
    '    </div>',
    '  );',
    '}',
  ].join("\n"),

  separator: [
    'import * as React from "react";',
    '',
    'export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {',
    '  orientation?: "horizontal" | "vertical";',
    '}',
    '',
    'export function Separator({ className = "", orientation = "horizontal", ...props }: SeparatorProps) {',
    '  return (',
    '    <div',
    '      role="separator"',
    '      aria-orientation={orientation}',
    '      className={`shrink-0 bg-stone-800 ${',
    '        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]"',
    '      } ${className}`}',
    '      {...props}',
    '    />',
    '  );',
    '}',
  ].join("\n"),
};

function printBanner() {
  console.log("-----------------------------------------");
  console.log("  Silex UI Scaffolding Tool (Node/NPM)   ");
  console.log("-----------------------------------------");
}

function handleInit() {
  printBanner();
  console.log("Initializing Silex configuration...");
  const config = {
    $schema: "https://silex-ui.dev/schema.json",
    style: "default",
    tailwind: {
      config: "tailwind.config.js",
      css: "src/index.css",
      baseColor: "stone",
    },
    aliases: {
      components: "@/components/ui",
      utils: "@/lib/utils",
    },
  };
  fs.writeFileSync("silex.json", JSON.stringify(config, null, 2));
  console.log("Created silex.json configuration file.");
}

function handleAdd(componentName) {
  printBanner();
  if (!componentName) {
    console.error("Error: Please specify a component name to add.");
    console.error("Example: npx silex-ui add button");
    process.exit(1);
  }

  const name = componentName.toLowerCase();
  const template = TEMPLATES[name];

  if (!template) {
    console.error("Component '" + name + "' not found in registry.");
    console.error("Run 'npx silex-ui list' to inspect available components.");
    process.exit(1);
  }

  const targetDir = path.join(process.cwd(), "src", "components", "ui");
  fs.mkdirSync(targetDir, { recursive: true });

  const targetFile = path.join(targetDir, name + ".tsx");
  fs.writeFileSync(targetFile, template);
  console.log("Successfully scaffolded " + name + " component to " + targetFile);
}

function handleList() {
  printBanner();
  console.log("Available Silex UI components:");
  Object.keys(TEMPLATES).forEach((item) => {
    console.log("  - " + item);
  });
}

switch (command) {
  case "init":
    handleInit();
    break;
  case "add":
    handleAdd(args[1]);
    break;
  case "list":
    handleList();
    break;
  default:
    printBanner();
    console.log("Usage:");
    console.log("  npx silex-ui init            Initialize silex.json in current directory");
    console.log("  npx silex-ui add <component> Scaffold component into src/components/ui");
    console.log("  npx silex-ui list            List all available components");
    break;
}
