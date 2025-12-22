
import { GoogleGenAI, Type } from "@google/genai";

export const getScentRecommendation = async (userMood: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user is looking for a candle that matches this mood or setting: "${userMood}". Recommend a scent profile and explain why it fits.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scentName: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            suggestedNotes: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["scentName", "reasoning", "suggestedNotes"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
