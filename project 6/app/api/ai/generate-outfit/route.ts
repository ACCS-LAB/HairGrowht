import { ClothingAnalyzer } from '@/lib/ai/analyzer';
import type { GenerateOutfitResponse } from '@/types/models';

export async function POST(request: Request) {
  try {
    const { items, occasion, weather } = await request.json();
    
    if (!items || !occasion) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required parameters'
      }), { status: 400 });
    }

    const analyzer = ClothingAnalyzer.getInstance();
    const suggestions = await analyzer.generateOutfitSuggestions(items, occasion, weather);

    const response: GenerateOutfitResponse = {
      success: true,
      data: suggestions
    };

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to generate outfit suggestions'
    }), { status: 500 });
  }
}