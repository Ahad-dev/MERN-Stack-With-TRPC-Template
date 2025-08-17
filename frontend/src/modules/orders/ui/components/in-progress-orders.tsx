import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Package, 
  Truck, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Calendar,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface InProgressOrder {
  id: string;
  orderNumber: string;
  title: string;
  description: string;
  startDate: string;
  estimatedCompletion: string;
  progress: number;
  status: "processing" | "in_review" | "shipping" | "delayed";
  customer: string;
  priority: "low" | "medium" | "high";
  steps: {
    id: string;
    title: string;
    completed: boolean;
    current: boolean;
  }[];
}

interface InProgressOrdersProps {
  orders?: InProgressOrder[];
  className?: string;
  onViewDetails?: (order: InProgressOrder) => void;
}

const InProgressOrders: React.FC<InProgressOrdersProps> = ({
  orders,
  className = "",
  onViewDetails
}) => {
  // Sample data if none provided
  const defaultOrders: InProgressOrder[] = [
    {
      id: "1",
      orderNumber: "ORD-006",
      title: "Website Development Project",
      description: "Custom e-commerce website with payment integration",
      startDate: "2024-12-15",
      estimatedCompletion: "2024-12-30",
      progress: 75,
      status: "processing",
      customer: "TechCorp Inc.",
      priority: "high",
      steps: [
        { id: "1", title: "Requirements Analysis", completed: true, current: false },
        { id: "2", title: "Design Phase", completed: true, current: false },
        { id: "3", title: "Development", completed: false, current: true },
        { id: "4", title: "Testing", completed: false, current: false },
        { id: "5", title: "Deployment", completed: false, current: false }
      ]
    },
    {
      id: "2",
      orderNumber: "ORD-007",
      title: "Mobile App Development",
      description: "React Native app for iOS and Android",
      startDate: "2024-12-10",
      estimatedCompletion: "2024-12-25",
      progress: 60,
      status: "in_review",
      customer: "StartupXYZ",
      priority: "medium",
      steps: [
        { id: "1", title: "Planning", completed: true, current: false },
        { id: "2", title: "UI/UX Design", completed: true, current: false },
        { id: "3", title: "Development", completed: false, current: true },
        { id: "4", title: "Testing", completed: false, current: false }
      ]
    },
    {
      id: "3",
      orderNumber: "ORD-008",
      title: "SEO Optimization Package",
      description: "Complete SEO audit and optimization",
      startDate: "2024-12-18",
      estimatedCompletion: "2024-12-28",
      progress: 30,
      status: "delayed",
      customer: "Digital Agency",
      priority: "low",
      steps: [
        { id: "1", title: "Initial Audit", completed: true, current: false },
        { id: "2", title: "Keyword Research", completed: false, current: true },
        { id: "3", title: "On-page Optimization", completed: false, current: false },
        { id: "4", title: "Reporting", completed: false, current: false }
      ]
    }
  ];

  const displayOrders = orders || defaultOrders;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_review":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "shipping":
        return "bg-green-100 text-green-800 border-green-200";
      case "delayed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return Package;
      case "in_review":
        return Clock;
      case "shipping":
        return Truck;
      case "delayed":
        return AlertCircle;
      default:
        return Package;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          In Progress Orders
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {displayOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          
          return (
            <div
              key={order.id}
              className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{order.title}</h3>
                      <Badge variant="outline" className={cn("capitalize", getStatusColor(order.status))}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {order.status.replace('_', ' ')}
                      </Badge>
                      <AlertCircle className={cn("h-4 w-4", getPriorityColor(order.priority))} />
                    </div>
                    <p className="text-sm text-muted-foreground">{order.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {order.customer}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due: {new Date(order.estimatedCompletion).toLocaleDateString()}
                      </span>
                      <span>#{order.orderNumber}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" onClick={() => onViewDetails?.(order)}>
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Progress</span>
                    <span className="text-muted-foreground">{order.progress}%</span>
                  </div>
                  <Progress value={order.progress} className="h-2" />
                </div>

                {/* Steps */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Project Steps</h4>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {order.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-2 min-w-fit">
                        <div className={cn(
                          "flex items-center gap-2 px-3 py-1 rounded-full text-xs border",
                          step.completed 
                            ? "bg-green-100 text-green-800 border-green-200" 
                            : step.current 
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        )}>
                          {step.completed ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : step.current ? (
                            <Clock className="h-3 w-3" />
                          ) : (
                            <div className="h-3 w-3 rounded-full border border-current" />
                          )}
                          <span>{step.title}</span>
                        </div>
                        {index < order.steps.length - 1 && (
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {displayOrders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No orders in progress</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InProgressOrders;
