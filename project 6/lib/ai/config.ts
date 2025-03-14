export const AI_CONFIG = {
  // Model Configuration
  CLOTHING_DETECTION: {
    modelVersion: 'v1',
    confidenceThreshold: 0.85,
    maxDetections: 10,
  },
  
  STYLE_ANALYSIS: {
    modelVersion: 'v1',
    styleCategories: [
      'casual',
      'formal',
      'business',
      'sporty',
      'bohemian',
      'vintage',
      'minimalist',
      'streetwear',
    ],
  },
  
  COLOR_ANALYSIS: {
    modelVersion: 'v1',
    colorPalettes: {
      warm: ['#8B4513', '#D4A574', '#CD853F'],
      cool: ['#4A5859', '#7B9EA8', '#B5C7CC'],
      neutral: ['#2C1810', '#8B7355', '#D4A574'],
    },
  },

  OUTFIT_GENERATION: {
    modelVersion: 'v1',
    maxSuggestions: 5,
    styleWeight: 0.4,
    colorWeight: 0.3,
    seasonWeight: 0.2,
    occasionWeight: 0.1,
  },
};

export const API_ENDPOINTS = {
  ANALYZE_IMAGE: '/api/ai/analyze',
  GENERATE_OUTFIT: '/api/ai/generate-outfit',
  STYLE_FEEDBACK: '/api/ai/feedback',
};