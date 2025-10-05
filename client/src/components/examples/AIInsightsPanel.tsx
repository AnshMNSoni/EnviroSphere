import { AIInsightsPanel } from "../AIInsightsPanel";
import { ThemeProvider } from "../ThemeProvider";

const mockInsights = [
  {
    id: "1",
    title: "Increase Green Cover in Zone 3",
    description:
      "Low vegetation index detected in residential zone with high population density.",
    severity: "high" as const,
    recommendation:
      "Plant 200+ trees and create 3 new parks. Estimated cost: $500K. Expected NDVI improvement: 0.15 over 2 years.",
  },
  {
    id: "2",
    title: "Improve Air Quality Monitoring",
    description:
      "Insufficient AQI sensors detected in industrial corridor.",
    severity: "medium" as const,
    recommendation:
      "Install 5 additional air quality sensors. Cost: $50K. Coverage improvement: 85%.",
  },
  {
    id: "3",
    title: "Optimize Water Management",
    description: "Potential flood risk in low-lying areas during monsoon.",
    severity: "low" as const,
    recommendation:
      "Enhance drainage systems and create retention ponds. Cost: $300K.",
  },
];

export default function AIInsightsPanelExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background min-h-screen">
        <div className="max-w-3xl mx-auto">
          <AIInsightsPanel insights={mockInsights} />
        </div>
      </div>
    </ThemeProvider>
  );
}
