import { MetricCard } from "../MetricCard";
import { Leaf, Droplet, Thermometer, Wind } from "lucide-react";
import { ThemeProvider } from "../ThemeProvider";

export default function MetricCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Air Quality Index"
            value={42}
            unit="AQI"
            icon={Wind}
            trend={{ value: 12, direction: "down" }}
            status="good"
          />
          <MetricCard
            title="Vegetation Index"
            value={0.68}
            unit="NDVI"
            icon={Leaf}
            trend={{ value: 5, direction: "up" }}
            status="good"
          />
          <MetricCard
            title="Temperature"
            value={28}
            unit="°C"
            icon={Thermometer}
            trend={{ value: 3, direction: "up" }}
            status="warning"
          />
          <MetricCard
            title="Water Quality"
            value={7.2}
            unit="pH"
            icon={Droplet}
            status="good"
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
