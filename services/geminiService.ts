import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BlogPostConfig, GeneratedBlogResponse } from "../types";

// Helper to ensure we have a client with the latest key
const getAiClient = async (): Promise<GoogleGenAI> => {
  // Check if we need to prompt for a key (if running in an environment that supports it)
  if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
    }
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateBlogPost = async (config: BlogPostConfig): Promise<GeneratedBlogResponse> => {
  try {
    const ai = await getAiClient();
    
    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "The catchy title of the blog post." },
        content: { type: Type.STRING, description: "The full blog post content in Markdown format." },
      },
      required: ["title", "content"],
    };

    const prompt = `
      Write a high-quality blog post about "${config.topic}".
      Target Audience: ${config.audience}
      Tone: ${config.tone}
      Keywords to include: ${config.keywords}
      Target Word Count: approx ${config.wordCount} words.
    `;

    const systemInstruction = `
      You are an expert ghostwriter known for "human-like", editorial-quality prose.
      
      CRITICAL RULES:
      1. VARY SENTENCE LENGTH: Mix short, punchy sentences with longer, rhythmic ones.
      2. AVOID CLICHÉS: Strictly forbidden words/phrases: "unlock", "delve", "tapestry", "digital landscape", "game-changer", "comprehensive guide", "bustling", "vibrant", "in today's world".
      3. VOICE: Write with authority but empathy. Avoid robotic transitions like "Firstly", "Moreover", "In conclusion". Use natural segues.
      4. FORMATTING: Use Markdown. Use H2 (##) and H3 (###) for structure.
      5. IMAGERY: Naturally insert image placeholders where a visual would enhance the story. 
         Use EXACTLY this format: ![PROMPT: specific visual description](placeholder)
         Do not wrap this in code blocks. Make the prompt descriptive for an AI image generator.
    `;

    // Use gemini-3-flash-preview as requested
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No content generated");

    return JSON.parse(jsonText) as GeneratedBlogResponse;

  } catch (error: any) {
    console.error("Blog Generation Error:", error);
    
    // Handle permissions errors and "Requested entity was not found" (which implies bad key or project issue)
    const isRecoverableError = error.status === 403 || 
                               error.message?.includes("403") ||
                               error.message?.includes("Requested entity was not found");
                              
    if (isRecoverableError) {
      if (window.aistudio) {
        await window.aistudio.openSelectKey();
        // Retry once recursively
        return generateBlogPost(config);
      }
    }
    throw error;
  }
};