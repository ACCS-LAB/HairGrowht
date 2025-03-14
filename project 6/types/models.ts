// AI Model Types
export interface ClothingItem {
  id: string;
  type: 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessory';
  category: string;
  color: string;
  pattern: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  style: string[];
  imageUrl: string;
  confidence: number;
}

export interface OutfitSuggestion {
  id: string;
  items: ClothingItem[];
  style: string;
  occasion: string;
  confidence: number;
  weatherCompatible: boolean;
  colorHarmony: number;
}

export interface AIAnalysisResult {
  detectedItems: ClothingItem[];
  styleAnalysis: {
    dominantStyle: string;
    confidence: number;
    alternativeStyles: string[];
  };
  colorAnalysis: {
    dominantColors: string[];
    colorScheme: string;
  };
}

// API Response Types
export interface AnalyzeImageResponse {
  success: boolean;
  data: AIAnalysisResult;
  error?: string;
}

export interface GenerateOutfitResponse {
  success: boolean;
  data: OutfitSuggestion[];
  error?: string;
}