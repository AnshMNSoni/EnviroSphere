import { DataChart } from "../DataChart";
import { ThemeProvider } from "../ThemeProvider";

const mockData = [
  { date: "Jan", value: 45 },
  { date: "Feb", value: 52 },
  { date: "Mar", value: 48 },
  { date: "Apr", value: 61 },
  { date: "May", value: 55 },
  { date: "Jun", value: 67 },
];

export default function DataChartExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background min-h-screen">
        <DataChart title="Air Quality Trend (2024)" data={mockData} />
      </div>
    </ThemeProvider>
  );
}
