interface NASAMetrics {
  airQuality: number;
  vegetationIndex: number;
  temperature: number;
  waterQuality: number;
}

interface ChartData {
  date: string;
  value: number;
}

export class NASAService {
  async getMetricsForLocation(
    location: string,
    lat?: number,
    lon?: number
  ): Promise<NASAMetrics> {
    const latitude = lat || 40.7128;
    const longitude = lon || -74.006;

    const baseAQI = 35 + Math.random() * 30;
    const baseNDVI = 0.55 + Math.random() * 0.25;
    const baseTemp = 20 + Math.random() * 15;
    const basePH = 6.8 + Math.random() * 0.8;

    const latFactor = Math.abs(latitude) / 90;
    const seasonalFactor = Math.sin((new Date().getMonth() / 12) * Math.PI * 2);

    return {
      airQuality: Math.round(baseAQI + latFactor * 10 + seasonalFactor * 5),
      vegetationIndex: Math.round((baseNDVI + seasonalFactor * 0.1) * 100) / 100,
      temperature: Math.round((baseTemp + latFactor * 5 + seasonalFactor * 8) * 10) / 10,
      waterQuality: Math.round((basePH + seasonalFactor * 0.2) * 10) / 10,
    };
  }

  async getHistoricalData(
    location: string,
    metric: string,
    months: number = 6
  ): Promise<ChartData[]> {
    const data: ChartData[] = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();

    for (let i = months - 1; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const baseValue = metric === "aqi" ? 45 : metric === "ndvi" ? 0.6 : metric === "temp" ? 25 : 7.0;
      const variance = baseValue * 0.2;
      const trend = (months - i) * 0.5;
      
      data.push({
        date: monthNames[monthIndex],
        value: Math.round((baseValue + (Math.random() - 0.5) * variance + trend) * 100) / 100,
      });
    }

    return data;
  }

  async getLayerData(layerType: string, bounds: any) {
    return {
      type: layerType,
      data: [],
      timestamp: new Date().toISOString(),
    };
  }
}

export const nasaService = new NASAService();
