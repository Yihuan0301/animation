
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAnimationIdea = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest a creative web animation for the following concept: "${prompt}". 
    Provide the response in JSON format with three fields:
    1. 'suggestion': A short description of the effect.
    2. 'cssClasses': Tailwind CSS classes that could achieve a similar vibe.
    3. 'framerCode': A JSON-like string of Framer Motion variants.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestion: { type: Type.STRING },
          cssClasses: { type: Type.STRING },
          framerCode: { type: Type.STRING },
        },
        required: ["suggestion", "cssClasses", "framerCode"],
      },
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
};
