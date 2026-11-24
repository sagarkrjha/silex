import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import axe from 'axe-core';

// Test button accessibility
function AccessibleButton({ label, disabled }: { label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      className="px-4 py-2 bg-orange-600 text-stone-950 font-semibold rounded-md focus:outline-none focus:ring-2"
    >
      {label}
    </button>
  );
}

// Test dialog accessibility
function AccessibleDialog({ title, isOpen }: { title: string; isOpen: boolean }) {
  if (!isOpen) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="fixed inset-0 bg-black/80">
      <div className="bg-white p-6 rounded-lg">
        <h2 id="dialog-title">{title}</h2>
        <p>Accessible modal dialog content</p>
        <button type="button" aria-label="Close dialog">Close</button>
      </div>
    </div>
  );
}

// Test switch accessibility
function AccessibleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Toggle setting"
      onClick={onChange}
      className="relative inline-flex h-6 w-11 rounded-full bg-orange-600"
    >
      <span className="inline-block h-5 w-5 rounded-full bg-white" />
    </button>
  );
}

// Test badge accessibility
function AccessibleBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
      {label}
    </span>
  );
}

// Test separator accessibility
function AccessibleSeparator({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={orientation === 'horizontal' ? 'h-[1px] w-full bg-zinc-200 dark:bg-zinc-800' : 'h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800'}
    />
  );
}

// Test checkbox accessibility
function AccessibleCheckbox({ label, checked }: { label: string; checked: boolean }) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={checked} onChange={() => {}} aria-label={label} />
      <span>{label}</span>
    </label>
  );
}

// Test textarea accessibility
function AccessibleTextarea({ label }: { label: string }) {
  return (
    <div>
      <label htmlFor="test-textarea">{label}</label>
      <textarea id="test-textarea" aria-label={label} />
    </div>
  );
}

// Test progress accessibility
function AccessibleProgress({ value, label }: { value: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="h-2 w-full bg-zinc-200"
    >
      <div style={{ width: `${value}%` }} />
    </div>
  );
}

describe('Accessibility & Axe-Core Audit', () => {
  it('AccessibleButton must pass axe accessibility checks with 0 violations', async () => {
    const { container } = render(<AccessibleButton label="Confirm Action" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });

  it('AccessibleDialog must pass axe accessibility checks with 0 violations', async () => {
    const { container } = render(<AccessibleDialog title="Settings Modal" isOpen={true} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });

  it('AccessibleSwitch must pass axe accessibility checks with 0 violations', async () => {
    const { container } = render(<AccessibleSwitch checked={true} onChange={() => {}} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });

  it('AccessibleBadge must pass axe accessibility checks with 0 violations', async () => {
    const { container } = render(<AccessibleBadge label="Status: Operational" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });

  it('AccessibleSeparator must pass axe accessibility checks with 0 violations', async () => {
    const { container } = render(<AccessibleSeparator orientation="horizontal" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });

  it('AccessibleCheckbox must pass axe accessibility checks with 0 violations', async () => {
    const { container } = render(<AccessibleCheckbox label="Subscribe to updates" checked={true} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });

  it('AccessibleTextarea must pass axe accessibility checks with 0 violations', async () => {
    const { container } = render(<AccessibleTextarea label="User feedback" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });

  it('AccessibleProgress must pass axe accessibility checks with 0 violations', async () => {
    const { container } = render(<AccessibleProgress value={75} label="Upload progress" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
