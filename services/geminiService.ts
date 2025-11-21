

import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAIAssistantResponseStream = async (prompt: string) => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not configured.");
  }
  
  const systemInstruction = `
    You are ApexAI, a world-class financial analyst and market strategist for Apex Financials, an elite investment bank.
    Your responses should be:
    - Professional, insightful, and data-driven.
    - Clear and concise, avoiding jargon where possible or explaining it briefly.
    - Directly addressing the user's query.
    - Never provide financial advice. Always include a disclaimer that your insights are for informational purposes only and users should consult a qualified professional.
    - Format your response using markdown for readability (e.g., headings, bullet points, bold text).
  `;

  const responseStream = await ai.models.generateContentStream({
    model: "gemini-2.5-flash-preview-04-17",
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
    },
  });

  return responseStream;
};