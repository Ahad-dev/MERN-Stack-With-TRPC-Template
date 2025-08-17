import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  User, 
  ShoppingCart, 
  Settings, 
  LogIn,
  FileText,
  MessageSquare,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "login" | "purchase" | "profile_update" | "message" | "document" | "view";
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
  status?: "success" | "pending" | "failed";
}

interface RecentActivityProps {
  activities?: ActivityItem[];
  className?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

const SAMPLE_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    type: "login",
    title: "Successful Login",
    description: "Logged in from Chrome on Windows",
    timestamp: "2 minutes ago",
    status: "success"
  },
  {
    id: "2",
    type: "profile_update",
    title: "Profile Updated",
    description: "Changed profile picture and bio",
    timestamp: "1 hour ago",
    status: "success"
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    description: "Received message from support team",
    timestamp: "3 hours ago",
    status: "pending"
  },
  {
    id: "4",
    type: "document",
    title: "Document Created",
    description: "Created new project proposal",
    timestamp: "1 day ago",
    status: "success"
  },
  {
    id: "5",
    type: "view",
    title: "Dashboard Viewed",
    description: "Accessed analytics dashboard",
    timestamp: "2 days ago",
    status: "success"
  }
];

const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = SAMPLE_ACTIVITIES,
  className = "",
  showViewAll = true,
  onViewAll
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "login":
        return LogIn;
      case "purchase":
        return ShoppingCart;
      case "profile_update":
        return Settings;
      case "message":
        return MessageSquare;
      case "document":
        return FileText;
      case "view":
        return Eye;
      default:
        return User;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "login":
        return "text-green-500 bg-green-50";
      case "purchase":
        return "text-blue-500 bg-blue-50";
      case "profile_update":
        return "text-purple-500 bg-purple-50";
      case "message":
        return "text-orange-500 bg-orange-50";
      case "document":
        return "text-indigo-500 bg-indigo-50";
      case "view":
        return "text-gray-500 bg-gray-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        {showViewAll && (
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.slice(0, 5).map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const iconColor = getActivityColor(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <div className={cn("p-2 rounded-full", iconColor)}>
                <Icon className="h-4 w-4" />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{activity.title}</p>
                  {activity.status && (
                    <Badge variant="outline" className={cn("text-xs", getStatusColor(activity.status))}>
                      {activity.status}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
        
        {activities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
