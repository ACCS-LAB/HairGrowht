import { OpenAIService } from './openai';
import { AI_CONFIG } from './config';
import type { AIAnalysisResult, ClothingItem, OutfitSuggestion } from '@/types/models';

export class ClothingAnalyzer {
  private static instance: ClothingAnalyzer;
  private openAIService: OpenAIService;
  
  private constructor() {
    this.openAIService = OpenAIService.getInstance();
  }
  
  static getInstance(): ClothingAnalyzer {
    if (!ClothingAnalyzer.instance) {
      ClothingAnalyzer.instance = new ClothingAnalyzer();
    }
    return ClothingAnalyzer.instance;
  }

  async analyzeImage(imageBase64: string): Promise<AIAnalysisResult> {
    try {
      // Use GPT-4 Vision for image analysis
      const analysis = await this.openAIService.analyzeImage(imageBase64);
      
      // Apply confidence threshold
      const filteredItems = analysis.detectedItems.filter(
        item => item.confidence >= AI_CONFIG.CLOTHING_DETECTION.confidenceThreshold
      );

      return {
        ...analysis,
        detectedItems: filteredItems.slice(0, AI_CONFIG.CLOTHING_DETECTION.maxDetections)
      };
    } catch (error) {
      console.error('Error in clothing analysis:', error);
      throw error;
    }
  }

  async generateOutfitSuggestions(
    items: ClothingItem[],
    occasion: string,
    weather: string
  ): Promise<OutfitSuggestion[]> {
    try {
      // Use GPT-3.5 Turbo for outfit generation
      const suggestions = await this.openAIService.generateOutfitSuggestions(
        items,
        occasion,
        weather
      );

      return suggestions.slice(0, AI_CONFIG.OUTFIT_GENERATION.maxSuggestions);
    } catch (error) {
      console.error('Error generating outfit suggestions:', error);
      throw error;
    }
  }
}