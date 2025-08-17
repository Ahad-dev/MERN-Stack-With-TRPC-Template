import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Edit, 
  MessageSquare, 
  FileText, 
  Settings, 
  Download,
  Upload,
  Search,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  onClick: () => void;
  disabled?: boolean;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  className?: string;
  maxActions?: number;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  className = "",
  maxActions = 6
}) => {
  // Default actions if none provided
  const defaultActions: QuickAction[] = [
    {
      id: "1",
      title: "Create New",
      description: "Start a new project",
      icon: Plus,
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      onClick: () => console.log("Create new clicked")
    },
    {
      id: "2",
      title: "Edit Profile",
      description: "Update your information",
      icon: Edit,
      color: "text-green-600",
      bgColor: "bg-green-50 hover:bg-green-100",
      onClick: () => console.log("Edit profile clicked")
    },
    {
      id: "3",
      title: "Messages",
      description: "Check your inbox",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100",
      onClick: () => console.log("Messages clicked")
    },
    {
      id: "4",
      title: "Reports",
      description: "View analytics",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50 hover:bg-orange-100",
      onClick: () => console.log("Reports clicked")
    },
    {
      id: "5",
      title: "Settings",
      description: "Configure app",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-50 hover:bg-gray-100",
      onClick: () => console.log("Settings clicked")
    },
    {
      id: "6",
      title: "Export Data",
      description: "Download reports",
      icon: Download,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 hover:bg-indigo-100",
      onClick: () => console.log("Export clicked")
    }
  ];

  const displayActions = (actions || defaultActions).slice(0, maxActions);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayActions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Button
                key={action.id}
                variant="ghost"
                className={cn(
                  "h-auto p-4 flex flex-col items-center gap-2 text-center transition-all duration-200",
                  action.bgColor,
                  action.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                <div className={cn("p-2 rounded-full bg-white/50", action.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {action.description}
                  </p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
