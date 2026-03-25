# Lark Display Picture Generator

Create custom leave notices for your Lark profile picture with a beautiful professional gradient background.

## Features

- **Date Range Selection**: Choose from/to dates for your absence
- **Optional Coverer Field**: Specify who's covering for you
- **Instant Generation**: Client-side Canvas rendering (no API calls!)
- **Beautiful Gradient**: Professional blue-purple-pink gradient background
- **Instant Download**: One-click download as PNG (500x500px)
- **100% Free**: No API costs, completely free to use

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## How It Works

1. User selects date range (required) and coverer (optional)
2. Canvas API generates a 500x500px image with:
   - Beautiful blue-purple-pink gradient background
   - "ON LEAVE" heading with professional styling
   - Date range (e.g., "Mar 25 - Mar 30, 2026")
   - Coverer contact info (if provided)
   - Subtle texture overlay for visual interest
3. User downloads the image and sets it as their Lark profile picture

## Design

The generator creates a clean, professional display picture with:
- **Gradient**: Blue → Purple → Pink for a modern, eye-catching look
- **Typography**: Bold white text with shadows for maximum readability
- **Layout**: Centered text with clear hierarchy
- **Texture**: Subtle dot pattern for depth

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Canvas API** (image generation)
- **react-day-picker** (date selection)
- **Sonner** (toast notifications)

## Benefits Over AI Generation

✅ **Instant**: Generates in <1 second
✅ **Free**: No API costs or rate limits
✅ **Reliable**: Always works, no quota issues
✅ **Consistent**: Predictable output every time
✅ **Privacy**: Everything runs locally in your browser
✅ **Simple**: Just 2 fields - dates and coverer

## Customization

Want to change the gradient colors? Edit `lib/canvas-generator.ts`:

```typescript
// Change these color stops in the gradient
gradient.addColorStop(0, "#3B82F6");   // Start color
gradient.addColorStop(0.5, "#8B5CF6"); // Middle color
gradient.addColorStop(1, "#EC4899");   // End color
```

## License

MIT
