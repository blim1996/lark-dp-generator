# Lark Display Picture Generator

## What
A Next.js web app that generates custom "On Leave" display pictures for Lark messaging platform. Users select absence dates and optional coverer info, then instantly generate a 500x500px PNG with professional gradient background and text overlay using HTML5 Canvas API.

## Why
Provides a quick, free solution for creating professional leave notices without manual design tools or AI API costs.

## Tech Stack

### Core
- **Next.js 16.2.1** (App Router, React 19)
- **TypeScript** (strict mode)
- **Node.js 18+**

### UI & Styling
- **Tailwind CSS v4** (utility-first styling)
- **Framer Motion 12** (animations)
- **sonner** (toast notifications)

### Date Handling
- **react-day-picker v9** (date range selection)
- **date-fns** (date formatting)

### Image Generation
- **HTML5 Canvas API** (client-side image generation, no external API)

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout, font config, Toaster provider
│   ├── page.tsx                # Main page with form/preview state management
│   ├── globals.css             # Tailwind imports, custom CSS, date picker styles
│   └── api/generate/route.ts   # Unused (legacy API route, can be removed)
│
├── components/
│   ├── ui/                     # Reusable primitives (Button, Input, Select, DateRangePicker)
│   ├── form/                   # GeneratorForm.tsx - main form logic
│   └── results/                # ImagePreview.tsx - display/download component
│
├── lib/
│   ├── animations.ts           # Framer Motion variant configs (fadeIn, slideUp, stagger, scaleIn)
│   ├── canvas-generator.ts     # Canvas-based image generation logic
│   ├── utils.ts                # Utility functions (formatDate, cn)
│   └── rate-limiter.ts         # Unused (legacy rate limiter, can be removed)
│
├── types/
│   └── index.ts                # TypeScript interfaces and constants
│
└── .env.local                  # Environment variables (currently unused)
```

## Key Directories

### `app/`
Next.js 16 App Router pages and layouts. `page.tsx` manages top-level state (generatedImageUrl, isGenerating), conditionally renders form or preview.

### `components/`
React components organized by domain:
- **ui/** - Reusable primitives following variant-based design pattern
- **form/** - Form logic, validation, and submission handling
- **results/** - Image display and download functionality

### `lib/`
Utility functions and core logic:
- **animations.ts** - Centralized Framer Motion configurations
- **canvas-generator.ts** - Core image generation using Canvas API
- **utils.ts** - Date formatting and className utilities

### `types/`
TypeScript type definitions and constant data (FormData, GenerationRequest, OCCASION_OPTIONS).

## Essential Commands

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
```

### Build & Deploy
```bash
npm run build        # Production build
npm start            # Run production server
npm run lint         # Run ESLint
```

### Key Files to Modify

**Change gradient colors:**
`lib/canvas-generator.ts:12-14` - Modify gradient.addColorStop() values

**Update animation timings:**
`lib/animations.ts` - Adjust duration/ease values in variants

**Add new UI components:**
Follow pattern in `components/ui/Button.tsx` - variant-based, motion-enabled, typed props

## Important Notes

- All interactive components must use `"use client"` directive (Next.js 16 requirement)
- Images generated client-side (no server/API calls) - instant, free, private
- Path aliases: Use `@/*` for all imports (configured in tsconfig.json)
- Dark theme only - all components styled for dark backgrounds
- Toast notifications via sonner - use `toast.success()` / `toast.error()`

## Additional Documentation

For detailed patterns and conventions used across the codebase:
- `.claude/docs/architectural_patterns.md` - Component composition, state management, animation system, styling patterns, TypeScript conventions, and validation patterns

## Common Tasks

### Adding a new form field
1. Add state in `components/form/GeneratorForm.tsx:24-27`
2. Create UI component in `components/ui/` if needed
3. Add to form JSX with motion.div wrapper for animation
4. Update validation logic in handleSubmit
5. Pass to canvas-generator if needed for image generation

### Modifying generated image
Edit `lib/canvas-generator.ts`:
- Background: Lines 12-16 (gradient colors)
- Text: Lines 48-66 (content, positioning, styling)
- Layout: Adjust x/y coordinates for text placement

### Changing animations
1. Modify variants in `lib/animations.ts`
2. Import and apply to motion components
3. Use `variants`, `initial`, `animate` props pattern

## Browser Support
Modern browsers with Canvas API support (Chrome, Firefox, Safari, Edge). No IE11 support.
