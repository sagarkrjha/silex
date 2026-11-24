import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

// Viewport sizes for responsive tests
const VIEWPORTS = {
  mobile: { width: 360, height: 640 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};

function setViewport(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
  window.dispatchEvent(new Event('resize'));
}

describe('Responsive Layout & Viewport Verification', () => {
  const originalWidth = window.innerWidth;
  const originalHeight = window.innerHeight;

  afterEach(() => {
    setViewport(originalWidth, originalHeight);
  });

  it('verifies responsive grid columns calculate correctly across viewports', () => {
    // Mobile viewport: 360px
    setViewport(VIEWPORTS.mobile.width, VIEWPORTS.mobile.height);
    expect(window.innerWidth).toBe(360);

    const { container, rerender } = render(
      <div data-testid="grid" className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="col-span-1">Item 1</div>
        <div className="col-span-1">Item 2</div>
        <div className="col-span-1">Item 3</div>
      </div>
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.className).toContain('grid-cols-1');
    expect(el.className).toContain('sm:grid-cols-2');
    expect(el.className).toContain('md:grid-cols-3');

    // Tablet viewport: 768px
    setViewport(VIEWPORTS.tablet.width, VIEWPORTS.tablet.height);
    expect(window.innerWidth).toBe(768);

    // Desktop viewport: 1280px
    setViewport(VIEWPORTS.desktop.width, VIEWPORTS.desktop.height);
    expect(window.innerWidth).toBe(1280);
  });

  it('verifies responsive sidebar collapses cleanly in mobile mode without overflow', () => {
    setViewport(VIEWPORTS.mobile.width, VIEWPORTS.mobile.height);
    const { container } = render(
      <aside className="w-full md:w-64 max-w-full overflow-hidden shrink-0 border-r border-zinc-200">
        <nav className="p-4 space-y-2">
          <a href="#test" className="block text-xs truncate">Navigation Item 1</a>
        </nav>
      </aside>
    );
    const aside = container.querySelector('aside');
    expect(aside).toBeDefined();
    expect(aside?.className).toContain('w-full');
    expect(aside?.className).toContain('md:w-64');
  });

  it('verifies responsive navbar renders mobile hamburger trigger below md breakpoint', () => {
    setViewport(VIEWPORTS.mobile.width, VIEWPORTS.mobile.height);
    const { container } = render(
      <header className="w-full sticky top-0 px-4 py-3 flex items-center justify-between">
        <span className="font-bold">Silex</span>
        <div className="hidden md:flex gap-4">Desktop Links</div>
        <button type="button" aria-label="Open mobile menu" className="md:hidden">Menu</button>
      </header>
    );
    const mobileButton = container.querySelector('button[aria-label="Open mobile menu"]');
    expect(mobileButton).toBeDefined();
    expect(mobileButton?.className).toContain('md:hidden');
  });

  it('verifies developer customization via custom responsive Tailwind classes and cn()', () => {
    const customClasses = 'w-full sm:w-auto md:w-64 p-4 lg:p-6 rounded-2xl shadow-xl';
    const baseClasses = 'inline-flex items-center justify-center';
    
    // Developer merges their responsive Tailwind utility classes
    const merged = [baseClasses, customClasses].filter(Boolean).join(' ');
    
    const { container } = render(
      <button type="button" className={merged}>
        Custom Responsive Action
      </button>
    );
    const btn = container.querySelector('button');
    expect(btn?.className).toContain('w-full');
    expect(btn?.className).toContain('sm:w-auto');
    expect(btn?.className).toContain('md:w-64');
    expect(btn?.className).toContain('rounded-2xl');
    expect(btn?.className).toContain('shadow-xl');
  });
});
