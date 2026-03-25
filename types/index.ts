export interface FormData {
  dateFrom: Date | null;
  dateTo: Date | null;
  occasion: string;
  customOccasion: string;
  coverer: string;
}

export interface GenerationRequest {
  dateFrom: string;
  dateTo: string;
  occasion: string;
  coverer?: string;
}

export interface GenerationResponse {
  imageUrl?: string;
  error?: string;
}

export interface OccasionOption {
  value: string;
  label: string;
  theme: string;
  colors: string;
}

export const OCCASION_OPTIONS: OccasionOption[] = [
  {
    value: "holiday",
    label: "Holiday",
    theme: "festive celebration with colorful decorations, balloons, and confetti",
    colors: "vibrant reds, golds, and festive colors",
  },
  {
    value: "chinese-new-year",
    label: "Chinese New Year",
    theme: "Chinese New Year celebration with red lanterns, cherry blossoms, and gold accents",
    colors: "red, gold, and traditional Chinese colors",
  },
  {
    value: "vacation",
    label: "Vacation",
    theme: "tropical beach paradise with palm trees, ocean, and sunset",
    colors: "warm oranges, blues, and tropical colors",
  },
  {
    value: "medical",
    label: "Medical",
    theme: "professional medical theme with subtle health symbols and calming colors",
    colors: "soft blues, whites, and calming tones",
  },
  {
    value: "training",
    label: "Training",
    theme: "professional learning environment with books, laptops, and educational elements",
    colors: "blues, greens, and professional tones",
  },
  {
    value: "conference",
    label: "Conference",
    theme: "business conference setting with modern professional aesthetic",
    colors: "blues, grays, and corporate colors",
  },
  {
    value: "break",
    label: "Taking a Break",
    theme: "relaxing peaceful scene with nature, zen elements, and calm atmosphere",
    colors: "soft pastels, greens, and calming colors",
  },
  {
    value: "custom",
    label: "Custom",
    theme: "clean professional design",
    colors: "professional balanced colors",
  },
];
