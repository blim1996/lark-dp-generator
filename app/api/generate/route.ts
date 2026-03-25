import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { buildPrompt } from "@/lib/api/image-generator";
import { GenerationRequest, GenerationResponse } from "@/types";
import { rateLimiter } from "@/lib/rate-limiter";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ""
);

export async function POST(request: NextRequest) {
  try {
    // Check rate limit before making request
    if (!rateLimiter.canMakeRequest()) {
      const waitTime = Math.ceil(rateLimiter.getTimeUntilNextSlot() / 1000);
      return NextResponse.json<GenerationResponse>(
        {
          error: `Rate limit exceeded. Please wait ${waitTime} seconds before trying again. (Free tier: 15 requests/minute)`
        },
        { status: 429 }
      );
    }

    const body: GenerationRequest = await request.json();
    const { dateFrom, dateTo, occasion, coverer } = body;

    // Validate required fields
    if (!dateFrom || !dateTo) {
      return NextResponse.json<GenerationResponse>(
        { error: "Date range is required" },
        { status: 400 }
      );
    }

    if (!occasion) {
      return NextResponse.json<GenerationResponse>(
        { error: "Occasion is required" },
        { status: 400 }
      );
    }

    // Build the prompt
    const prompt = buildPrompt(dateFrom, dateTo, occasion, coverer);

    console.log("Generating image with prompt:", prompt);
    console.log(`Rate limiter: ${rateLimiter.getRemainingRequests()} requests remaining this minute`);

    // Record the request
    rateLimiter.recordRequest();

    // Get the Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-image-preview",
    });

    // Generate the image with timeout
    const result = await Promise.race([
      model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseModalities: ["IMAGE"],
          imageConfig: {
            aspectRatio: "1:1", // Square for profile picture
            imageSize: "1K", // 1024x1024
          },
        },
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout after 60 seconds")), 60000)
      ),
    ]);

    // Extract the image data
    const response = (result as any).response;

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No image generated");
    }

    const imageData = response.candidates[0].content.parts[0].inlineData?.data;
    const mimeType = response.candidates[0].content.parts[0].inlineData?.mimeType;

    if (!imageData) {
      throw new Error("No image data in response");
    }

    // Return the base64 image
    const imageUrl = `data:${mimeType || "image/png"};base64,${imageData}`;

    return NextResponse.json<GenerationResponse>({ imageUrl });
  } catch (error: any) {
    console.error("Image generation error:", error);

    // Handle specific error types
    let errorMessage = error.message || "Failed to generate image";
    let statusCode = 500;

    if (error.message?.includes("429") || error.message?.includes("quota")) {
      errorMessage = "API quota exceeded. Free tier allows 500 requests/day and 15/minute. Please wait and try again.";
      statusCode = 429;
    } else if (error.message?.includes("timeout")) {
      errorMessage = "Image generation timed out. Please try again.";
      statusCode = 504;
    } else if (error.message?.includes("400")) {
      errorMessage = "Invalid request to image generation API. Please check your settings.";
      statusCode = 400;
    }

    return NextResponse.json<GenerationResponse>(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
