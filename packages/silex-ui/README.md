# Silex UI (`silex-ui`)

Framework-independent UI component engine and scaffolding tool for web applications.

## Quick Start via npm / npx

You can use `silex-ui` directly without installing it globally:

```bash
# Initialize Silex configuration
npx silex-ui init

# Add a component directly into your project
npx silex-ui add button
npx silex-ui add dialog
npx silex-ui add switch

# List all available components
npx silex-ui list
```

## TypeScript API & Theme Tokens

You can also import design tokens, WCAG contrast calculators, and theme palettes directly into your JavaScript or TypeScript codebase:

```typescript
import { themes, getContrastRatio, getLuminance } from "silex-ui";

// Access curated color palettes
console.log(themes.obsidian);

// Calculate accessible WCAG 2.1 contrast ratio
const ratio = getContrastRatio("#0d0f12", "#f4f4f5");
console.log("Contrast Ratio:", ratio);
```

## Documentation

Full documentation, interactive component previews, and theme pickers are hosted at:
[https://github.com/sagarkrjha/silex](https://github.com/sagarkrjha/silex)

## License

MIT License.
