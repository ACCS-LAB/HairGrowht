import OpenAI from 'openai';
import { AI_CONFIG } from './config';
import type { AIAnalysisResult, OutfitSuggestion } from '@/types/models';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export class OpenAIService {
  private static instance: OpenAIService;
  
  private constructor() {}
  
  static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  async analyzeImage(imageBase64: string): Promise<AIAnalysisResult> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { 
                type: "text", 
                text: "Analyze this clothing item and provide detailed information about its type, color, pattern, style, and season suitability. Format the response as JSON." 
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ],
          }
        ],
        max_tokens: 500,
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error analyzing image with GPT-4 Vision:', error);
      throw new Error('Failed to analyze image');
    }
  }

  async generateOutfitSuggestions(
    wardrobe: AIAnalysisResult[],
    occasion: string,
    weather: string
  ): Promise<OutfitSuggestion[]> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a professional fashion stylist AI. Create outfit combinations based on the following criteria:
              - Style compatibility
              - Color harmony
              - Season and weather appropriateness
              - Occasion suitability
              Format the response as JSON array of outfit suggestions.`
          },
          {
            role: "user",
            content: JSON.stringify({
              wardrobe,
              occasion,
              weather,
              stylePreferences: AI_CONFIG.STYLE_ANALYSIS.styleCategories,
              colorPalettes: AI_CONFIG.COLOR_ANALYSIS.colorPalettes
            })
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      return JSON.parse(response.choices[0].message.content || '[]');
    } catch (error) {
      console.error('Error generating outfit suggestions:', error);
      throw new Error('Failed to generate outfit suggestions');
    }
  }
}