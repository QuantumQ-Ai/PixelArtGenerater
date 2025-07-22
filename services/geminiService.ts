
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available, but do not hardcode it.
// It's assumed to be set in the environment variables.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates pixel art using the Imagen model.
 * @param userPrompt The user's text description.
 * @returns A base64-encoded data URL of the generated image.
 */
export const generatePixelArt = async (userPrompt: string): Promise<string> => {
  try {
    // Enhance the prompt to guide the model towards a pixel art style.
    const enhancedPrompt = `A pixel art of ${userPrompt}. 16-bit, vibrant colors, retro video game style, detailed, 8-bit.`;

    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: enhancedPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1', // Square aspect ratio is common for pixel art
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("Image generation failed, no images were returned.");
    }
    
    // The image data is returned as a base64 encoded string.
    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;

    if (!base64ImageBytes) {
        throw new Error("The returned image data is empty.");
    }
    
    return `data:image/jpeg;base64,${base64ImageBytes}`;

  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    // Re-throw a more user-friendly error message.
    if (error instanceof Error && error.message.includes('SAFETY')) {
        throw new Error('The prompt was blocked due to safety settings. Please modify your prompt.');
    }
    throw new Error("Failed to generate image. Please check the console for details.");
  }
};
