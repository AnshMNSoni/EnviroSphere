import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  date: string;
  value: number;
  label?: string;
}

interface DataChartProps {
  title: string;
  data: DataPoint[];
  dataKey?: string;
  color?: string;
  className?: string;
}

export function DataChart({
  title,
  data,
  dataKey = "value",
  color = "hsl(var(--primary))",
  className = "",
}: DataChartProps) {
  return (
    <Card className={`p-6 ${className}`} data-testid="card-chart">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" data-testid="text-chart-title">
          {title}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          data-testid="button-download-chart"
          onClick={() => console.log("Download chart")}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
