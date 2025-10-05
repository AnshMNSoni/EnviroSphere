import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface EnvironmentalData {
  airQuality: number;
  vegetationIndex: number;
  temperature: number;
  waterQuality: number;
  location: string;
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
}

interface SimulationPrediction {
  metric: string;
  currentValue: number;
  predictedValue: number;
  impact: string;
}

export class AIService {
  private model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  async generateInsights(data: EnvironmentalData): Promise<AIInsight[]> {
    try {
      const prompt = `As an urban planning AI assistant, analyze this environmental data for ${data.location}:
      
- Air Quality Index: ${data.airQuality} AQI
- Vegetation Index (NDVI): ${data.vegetationIndex}
- Temperature: ${data.temperature}°C
- Water Quality: ${data.waterQuality} pH

Generate 3 specific, actionable recommendations for urban planning improvements. For each recommendation, provide:
1. A clear title
2. Brief description of the issue
3. Severity level (low, medium, or high)
4. Detailed recommendation with estimated costs and expected impact

Respond ONLY with a valid JSON object in this exact format:
{
  "insights": [
    {
      "title": "string",
      "description": "string", 
      "severity": "low|medium|high",
      "recommendation": "string"
    }
  ]
}`;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      if (!text) throw new Error("No response from Gemini");

      // Clean the response to ensure it's valid JSON
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const parsed = JSON.parse(cleanedText);
      const insights = parsed.insights || parsed.recommendations || [];

      return insights.map((insight: any, index: number) => ({
        id: `insight-${Date.now()}-${index}`,
        title: insight.title,
        description: insight.description,
        severity: insight.severity || "medium",
        recommendation: insight.recommendation,
      }));
    } catch (error) {
      console.error("Gemini API error:", error);
      return this.getFallbackInsights(data);
    }
  }

  async predictImpact(
    currentData: EnvironmentalData,
    interventions: any
  ): Promise<SimulationPrediction[]> {
    const predictions: SimulationPrediction[] = [];

    if (interventions.trees && interventions.trees > 0) {
      const ndviIncrease = interventions.trees * 0.004;
      predictions.push({
        metric: "Vegetation Index",
        currentValue: currentData.vegetationIndex,
        predictedValue: Math.min(1.0, currentData.vegetationIndex + ndviIncrease),
        impact: `+${(ndviIncrease * 100).toFixed(1)}% NDVI improvement`,
      });

      const tempDecrease = interventions.trees * 0.03;
      predictions.push({
        metric: "Temperature",
        currentValue: currentData.temperature,
        predictedValue: currentData.temperature - tempDecrease,
        impact: `-${tempDecrease.toFixed(1)}°C cooling effect`,
      });
    }

    if (interventions.water && interventions.water > 0) {
      const waterImprovement = interventions.water * 0.02;
      predictions.push({
        metric: "Water Quality",
        currentValue: currentData.waterQuality,
        predictedValue: Math.min(8.5, currentData.waterQuality + waterImprovement),
        impact: `+${waterImprovement.toFixed(2)} pH improvement`,
      });
    }

    if (interventions.renewables && interventions.renewables > 0) {
      const aqiImprovement = interventions.renewables * 0.5;
      predictions.push({
        metric: "Air Quality",
        currentValue: currentData.airQuality,
        predictedValue: Math.max(0, currentData.airQuality - aqiImprovement),
        impact: `-${aqiImprovement.toFixed(0)} AQI reduction`,
      });
    }

    return predictions;
  }

  private getFallbackInsights(data: EnvironmentalData): AIInsight[] {
    const insights: AIInsight[] = [];

    if (data.vegetationIndex < 0.5) {
      insights.push({
        id: `insight-${Date.now()}-0`,
        title: "Increase Green Cover in Urban Areas",
        description: "Low vegetation index detected. Urban areas would benefit from increased tree coverage.",
        severity: "high",
        recommendation: "Plant 200+ trees and create 3 new parks. Estimated cost: $500K. Expected NDVI improvement: 0.15 over 2 years.",
      });
    }

    if (data.airQuality > 50) {
      insights.push({
        id: `insight-${Date.now()}-1`,
        title: "Improve Air Quality Monitoring",
        description: "Air quality levels are moderate. Enhanced monitoring and interventions recommended.",
        severity: "medium",
        recommendation: "Install 5 additional air quality sensors. Promote public transit usage. Cost: $50K.",
      });
    }

    if (data.temperature > 30) {
      insights.push({
        id: `insight-${Date.now()}-2`,
        title: "Urban Heat Island Mitigation",
        description: "High temperatures detected. Urban heat island effect may be significant.",
        severity: "high",
        recommendation: "Increase tree canopy coverage by 20%. Install cool roofs. Create water features. Cost: $800K.",
      });
    }

    if (insights.length === 0) {
      insights.push({
        id: `insight-${Date.now()}-0`,
        title: "Maintain Current Environmental Standards",
        description: "Environmental metrics are within acceptable ranges.",
        severity: "low",
        recommendation: "Continue monitoring and maintain current sustainable practices. Regular assessments recommended.",
      });
    }

    return insights;
  }
}

export const aiService = new AIService();
