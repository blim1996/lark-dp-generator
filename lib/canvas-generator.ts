interface ThemeColors {
  gradient: string[];
  textColor: string;
  shadowColor: string;
}

const THEME_COLORS: Record<string, ThemeColors> = {
  holiday: {
    gradient: ["#FF6B6B", "#FFD93D", "#6BCB77"],
    textColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.5)",
  },
  "chinese-new-year": {
    gradient: ["#DC2626", "#FCD34D", "#DC2626"],
    textColor: "#FCD34D",
    shadowColor: "rgba(0, 0, 0, 0.6)",
  },
  vacation: {
    gradient: ["#06B6D4", "#38BDF8", "#FBBF24"],
    textColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.4)",
  },
  medical: {
    gradient: ["#60A5FA", "#93C5FD", "#DBEAFE"],
    textColor: "#1E40AF",
    shadowColor: "rgba(0, 0, 0, 0.2)",
  },
  training: {
    gradient: ["#8B5CF6", "#A78BFA", "#C4B5FD"],
    textColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.4)",
  },
  conference: {
    gradient: ["#475569", "#64748B", "#94A3B8"],
    textColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.5)",
  },
  break: {
    gradient: ["#34D399", "#6EE7B7", "#A7F3D0"],
    textColor: "#065F46",
    shadowColor: "rgba(0, 0, 0, 0.3)",
  },
  default: {
    gradient: ["#3B82F6", "#8B5CF6", "#EC4899"],
    textColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.5)",
  },
};

export function generateDisplayPicture(
  dateFrom: string,
  dateTo: string,
  occasion?: string,
  coverer?: string
): string {
  // Create canvas
  const canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  // Get theme colors based on occasion
  const theme = THEME_COLORS[occasion || "default"] || THEME_COLORS.default;

  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, 500, 500);
  gradient.addColorStop(0, theme.gradient[0]);
  gradient.addColorStop(0.5, theme.gradient[1]);
  gradient.addColorStop(1, theme.gradient[2] || theme.gradient[1]);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 500, 500);

  // Add subtle pattern/texture overlay
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * 500,
      Math.random() * 500,
      Math.random() * 3,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  // Add semi-transparent overlay for better text readability
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, 500, 500);

  // Add decorative elements based on occasion
  if (occasion) {
    drawOccasionDecorations(ctx, occasion, theme);
  }

  // Configure text rendering
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw text shadow function
  const drawTextWithShadow = (
    text: string,
    x: number,
    y: number,
    fontSize: number,
    fontWeight: string = "bold"
  ) => {
    ctx.font = `${fontWeight} ${fontSize}px Inter, -apple-system, sans-serif`;

    // Draw shadow
    ctx.fillStyle = theme.shadowColor;
    ctx.fillText(text, x + 3, y + 3);

    // Draw main text
    ctx.fillStyle = theme.textColor;
    ctx.fillText(text, x, y);
  };

  // Draw "ON LEAVE" heading
  drawTextWithShadow("ON LEAVE", 250, 180, 56, "900");

  // Draw date range
  const dateText = `${dateFrom} - ${dateTo}`;
  drawTextWithShadow(dateText, 250, 260, 28, "600");

  // Draw coverer info if provided
  if (coverer) {
    drawTextWithShadow(`Contact: ${coverer}`, 250, 320, 20, "500");
  }

  // Convert canvas to base64
  return canvas.toDataURL("image/png");
}

function drawOccasionDecorations(
  ctx: CanvasRenderingContext2D,
  occasion: string,
  theme: ThemeColors
) {
  ctx.globalAlpha = 0.3;

  switch (occasion) {
    case "holiday":
      // Draw confetti
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4ECDC4"][
          Math.floor(Math.random() * 4)
        ];
        ctx.fillRect(
          Math.random() * 500,
          Math.random() * 500,
          Math.random() * 10 + 5,
          Math.random() * 10 + 5
        );
      }
      break;

    case "chinese-new-year":
      // Draw lantern shapes
      ctx.fillStyle = "#FCD34D";
      ctx.beginPath();
      ctx.arc(100, 100, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(400, 100, 30, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "vacation":
      // Draw sun
      ctx.fillStyle = "#FBBF24";
      ctx.beginPath();
      ctx.arc(420, 80, 40, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "medical":
      // Draw plus symbol
      ctx.fillStyle = theme.textColor;
      ctx.fillRect(420, 60, 10, 40);
      ctx.fillRect(405, 75, 40, 10);
      break;

    case "break":
      // Draw leaves
      ctx.fillStyle = "#34D399";
      ctx.beginPath();
      ctx.ellipse(80, 400, 20, 30, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(420, 420, 20, 30, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      break;
  }

  ctx.globalAlpha = 1.0;
}
