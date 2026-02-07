
import { GoogleGenAI, Type } from "@google/genai";
import { DebugResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const DEBUG_PROMPT = `
You are an expert software engineer and debugger. 
Analyze the provided code or error message and return a structured analysis.
Be concise but thorough.
`;

export const analyzeCode = async (content: string): Promise<DebugResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: content,
    config: {
      systemInstruction: DEBUG_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          problem: {
            type: Type.STRING,
            description: "Identification of the core problem or bug.",
          },
          explanation: {
            type: Type.STRING,
            description: "A simple and clear explanation of the mistake.",
          },
          fixedCode: {
            type: Type.STRING,
            description: "The complete, corrected, and optimized code block.",
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Actionable tips and improvements.",
          },
        },
        required: ["problem", "explanation", "fixedCode", "tips"],
      },
    },
  });

  const text = response.text || '{}';
  return JSON.parse(text) as DebugResult;
};
