import { OCCASION_OPTIONS } from "@/types";

export function buildPrompt(
  dateFrom: string,
  dateTo: string,
  occasion: string,
  coverer?: string
): string {
  const occasionConfig = OCCASION_OPTIONS.find((opt) => opt.value === occasion) || OCCASION_OPTIONS[OCCASION_OPTIONS.length - 1];

  return `Create a professional 500x500px square display picture for a corporate messaging platform profile photo.

Visual Theme: ${occasionConfig.theme}
Color Palette: ${occasionConfig.colors}

CRITICAL TEXT REQUIREMENTS - THIS IS THE MOST IMPORTANT PART:
The image MUST prominently display this text in a clear, highly readable font with excellent contrast:

1. Main heading (large, bold, centered): "ON LEAVE"
2. Date range (medium size, clear): "${dateFrom} - ${dateTo}"
${coverer ? `3. Contact info (smaller size): "Contact: ${coverer}"` : ''}

TEXT SPECIFICATIONS:
- Font: Bold sans-serif (like Arial Black, Helvetica Bold, or Futura Bold)
- Text placement: Centered on the image, occupying the middle 60% of the space
- Text color: Use high contrast - either white text with dark shadow/outline OR dark text on light background panel
- Background for text: Consider adding a semi-transparent panel behind text for maximum readability
- Text must be the PRIMARY FOCUS of the image - theme elements should be subtle and not interfere with text legibility

Visual Style Guidelines:
- Background: ${occasionConfig.theme} but keep it SUBTLE and in the background
- Ensure the theme doesn't overwhelm the text - text readability is priority #1
- Style: Professional, clean, modern, suitable for workplace messaging platform
- Make it visually appealing but functional - people need to read the dates quickly

DO NOT include any other text, watermarks, or elements that would distract from the key information.
The final image should be immediately scannable - someone should be able to understand the leave dates in 2 seconds.`;
}
