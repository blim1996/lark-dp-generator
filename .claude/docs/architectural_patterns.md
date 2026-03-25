# Architectural Patterns

## Component Architecture

### Component Composition Pattern
Small, reusable UI primitives composed into larger feature components:
- **Primitives**: `components/ui/Button.tsx`, `components/ui/Input.tsx`, `components/ui/Select.tsx`, `components/ui/DateRangePicker.tsx`
- **Feature Components**: `components/form/GeneratorForm.tsx`, `components/results/ImagePreview.tsx`
- **Page Components**: `app/page.tsx`

Each layer builds on the previous, creating a clear component hierarchy.

### Client-Side Rendering Pattern
All interactive components use `"use client"` directive (Next.js 16 App Router requirement):
- See: `app/page.tsx:1`, `components/form/GeneratorForm.tsx:1`, `components/ui/Button.tsx:1`
- Server components: Only `app/layout.tsx` (no "use client" directive)

### Props Interface Pattern
Every component defines TypeScript interface for props:
- Example: `components/form/GeneratorForm.tsx:13-17` (GeneratorFormProps)
- Example: `components/ui/Button.tsx:6-10` (ButtonProps)
- Extends native HTML element types where applicable (e.g., `React.ButtonHTMLAttributes`)

## State Management

### Local State with useState
State managed locally within components, passed down via props:
- Parent state: `app/page.tsx:10-11` (generatedImageUrl, isGenerating)
- Child state: `components/form/GeneratorForm.tsx:24-27` (dateFrom, dateTo, coverer, error)
- Prop drilling for parent-child communication: `app/page.tsx:45-49`

### State Lifting Pattern
Shared state lives in parent component, passed to children via props:
- `isGenerating` managed in `app/page.tsx:11`, passed to `GeneratorForm:47`
- Callbacks lift state changes: `onGenerate:13`, `handleReset:18`

## Animation System

### Centralized Animation Variants
Framer Motion variants defined in `lib/animations.ts`, imported and reused:
- `fadeIn:3-9` - Page-level fade-in
- `slideUp:11-18` - Staggered form field animations
- `stagger:20-28` - Parent container for staggered children
- `scaleIn:30-37` - Image preview scale animation

Usage pattern:
```typescript
// Import centralized variants
import { stagger, slideUp } from "@/lib/animations";

// Apply to motion components
<motion.form variants={stagger} initial="hidden" animate="visible">
  <motion.div variants={slideUp}>
```

### Conditional Animation Pattern
Animations disabled when component is disabled/loading:
- See: `components/ui/Button.tsx:30-31` (whileHover/whileTap conditional on disabled state)

## Styling Patterns

### Variant-Based Component Design
Components support multiple visual variants via props:
- `components/ui/Button.tsx:23-26` - Define variant styles object
- Usage: `<Button variant="primary">` or `<Button variant="secondary">`
- Pattern scales: easy to add new variants without touching component logic

### Utility-First CSS with Tailwind
Tailwind classes applied directly to components:
- Base styles + variant styles + custom className merged via `cn()` utility
- See: `components/ui/Button.tsx:32` - `cn(baseStyles, variants[variant], className)`

### cn() Utility Pattern
Simple className merger that filters falsy values:
- Defined: `lib/utils.ts:11-13`
- Usage throughout components for conditional classes
- Alternative to `clsx` or `classnames` libraries

## TypeScript Patterns

### Type-First Development
Types defined before implementation in `types/index.ts`:
- Interfaces: FormData, GenerationRequest, GenerationResponse
- Constant data with types: OCCASION_OPTIONS with OccasionOption interface

### Path Aliases
All imports use `@/*` alias for cleaner paths:
- Configured in `tsconfig.json`
- Example: `import { formatDate } from "@/lib/utils"` instead of `../../lib/utils`

## Canvas Generation Pattern

### Client-Side Image Generation
Images generated entirely in browser using Canvas API:
- Implementation: `lib/canvas-generator.ts`
- No server API calls, instant generation
- Returns base64 data URL for immediate use

Process:
1. Create canvas element: `canvas-generator.ts:3-7`
2. Draw gradient background
3. Render text with shadows
4. Convert to base64: `canvas-generator.ts:67`

## User Feedback Patterns

### Toast Notifications
Consistent use of `sonner` library for user feedback:
- Success: `components/form/GeneratorForm.tsx:58` - `toast.success()`
- Error: `components/form/GeneratorForm.tsx:62` - `toast.error()`
- Toaster component in root layout: `app/layout.tsx:25`

### Loading States
Loading state passed via props and displayed via:
- Button loading spinner: `components/ui/Button.tsx:36-57`
- Disabled state: `components/ui/Button.tsx:33`
- Loading text: `components/form/GeneratorForm.tsx:109-117`

## File Organization

### Domain-Based Component Organization
Components grouped by domain/responsibility:
- `components/ui/` - Reusable primitives
- `components/form/` - Form-specific components
- `components/results/` - Result display components

### Utility Organization
Helper functions grouped by purpose:
- `lib/animations.ts` - Animation configurations
- `lib/utils.ts` - General utilities
- `lib/canvas-generator.ts` - Canvas-specific logic

## Validation Pattern

### Client-Side Form Validation
Validation in component before submission:
- See: `components/form/GeneratorForm.tsx:34-42`
- Set error state for display
- Prevent submission if invalid

### Error Display Pattern
Inline error messages via error prop:
- DateRangePicker shows error: `components/ui/DateRangePicker.tsx:103`
- Error styling: red border + error text below field
