import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Users,
  DollarSign,
  ShoppingCart,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  id: string;
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
    period: string;
  };
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  description?: string;
}

interface QuickStatsProps {
  stats?: StatItem[];
  className?: string;
  columns?: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({
  stats,
  className = "",
  columns = 4
}) => {
  // Default stats if none provided
  const defaultStats: StatItem[] = [
    {
      id: "1",
      title: "Total Revenue",
      value: "$45,231",
      change: {
        value: 12.5,
        type: "increase",
        period: "from last month"
      },
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Total earnings this month"
    },
    {
      id: "2",
      title: "Active Users",
      value: "2,847",
      change: {
        value: 8.2,
        type: "increase",
        period: "from last week"
      },
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Currently active users"
    },
    {
      id: "3",
      title: "Orders",
      value: 156,
      change: {
        value: 2.1,
        type: "decrease",
        period: "from yesterday"
      },
      icon: ShoppingCart,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      description: "New orders today"
    },
    {
      id: "4",
      title: "Conversion Rate",
      value: "3.24%",
      change: {
        value: 0,
        type: "neutral",
        period: "no change"
      },
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description: "Average conversion rate"
    }
  ];

  const displayStats = stats || defaultStats;

  const getTrendIcon = (type: "increase" | "decrease" | "neutral") => {
    switch (type) {
      case "increase":
        return TrendingUp;
      case "decrease":
        return TrendingDown;
      case "neutral":
        return Minus;
      default:
        return Minus;
    }
  };

  const getTrendColor = (type: "increase" | "decrease" | "neutral") => {
    switch (type) {
      case "increase":
        return "text-green-600 bg-green-50";
      case "decrease":
        return "text-red-600 bg-red-50";
      case "neutral":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getGridCols = (cols: number) => {
    switch (cols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <div className={cn("grid gap-4", getGridCols(columns), className)}>
      {displayStats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.change ? getTrendIcon(stat.change.type) : null;
        const trendColor = stat.change ? getTrendColor(stat.change.type) : "";
        
        return (
          <Card
            key={stat.id}
            className={cn(
              "relative overflow-hidden transition-all duration-200 hover:shadow-md",
              stat.borderColor
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={cn("p-2 rounded-full", stat.bgColor)}>
                <Icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                
                {stat.change && (
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className={cn("text-xs", trendColor)}>
                      {TrendIcon && <TrendIcon className="h-3 w-3 mr-1" />}
                      {stat.change.value > 0 && stat.change.type !== "neutral" && "+"}
                      {stat.change.type !== "neutral" ? `${stat.change.value}%` : "0%"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {stat.change.period}
                    </span>
                  </div>
                )}
                
                {stat.description && (
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;
