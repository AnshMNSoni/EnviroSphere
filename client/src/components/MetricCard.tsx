import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  status?: "good" | "warning" | "critical";
  className?: string;
}

const statusColors = {
  good: "border-t-chart-2",
  warning: "border-t-chart-3",
  critical: "border-t-destructive",
};

const statusBadgeVariants = {
  good: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  warning: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  critical: "bg-destructive/10 text-destructive border-destructive/20",
};

export function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  status = "good",
  className = "",
}: MetricCardProps) {
  return (
    <Card
      className={`relative min-h-32 border-t-4 ${statusColors[status]} ${className}`}
      data-testid={`card-metric-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
          </div>
          {status && (
            <Badge
              className={`${statusBadgeVariants[status]} border`}
              data-testid={`badge-status-${status}`}
            >
              {status}
            </Badge>
          )}
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold" data-testid="text-metric-value">
              {value}
            </span>
            {unit && (
              <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
            )}
          </div>

          {trend && (
            <div
              className={`flex items-center gap-1 text-sm ${
                trend.direction === "up" ? "text-chart-2" : "text-destructive"
              }`}
              data-testid="text-trend"
            >
              {trend.direction === "up" ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
