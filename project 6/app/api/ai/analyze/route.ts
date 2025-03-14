import { ClothingAnalyzer } from '@/lib/ai/analyzer';
import type { AnalyzeImageResponse } from '@/types/models';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return new Response(JSON.stringify({
        success: false,
        error: 'No image provided'
      }), { status: 400 });
    }

    const analyzer = ClothingAnalyzer.getInstance();
    const analysis = await analyzer.analyzeImage(image);

    const response: AnalyzeImageResponse = {
      success: true,
      data: analysis
    };

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to analyze image'
    }), { status: 500 });
  }
}