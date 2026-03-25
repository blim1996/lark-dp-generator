export function generateDisplayPicture(
  dateFrom: string,
  dateTo: string,
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

  // Draw gradient background - professional blue/purple theme
  const gradient = ctx.createLinearGradient(0, 0, 500, 500);
  gradient.addColorStop(0, "#3B82F6");
  gradient.addColorStop(0.5, "#8B5CF6");
  gradient.addColorStop(1, "#EC4899");

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
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, 500, 500);

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
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillText(text, x + 3, y + 3);

    // Draw main text
    ctx.fillStyle = "#FFFFFF";
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
