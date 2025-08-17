import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Plug, 
  Check, 
  X,
  AlertCircle,
  ExternalLink,
  Trash2,
  Settings,
  Shield,
  Calendar,
  Mail,
  Camera,
  MessageSquare,
  Cloud,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectedApp {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  isConnected: boolean;
  connectedDate?: string;
  permissions: string[];
  category: "social" | "productivity" | "payment" | "storage" | "communication";
  status: "active" | "expired" | "error";
  lastSync?: string;
}

interface IntegrationsProps {
  className?: string;
  onConnect?: (appId: string) => void;
  onDisconnect?: (appId: string) => void;
  onManagePermissions?: (appId: string) => void;
}

const Integrations: React.FC<IntegrationsProps> = ({
  className = "",
  onConnect,
  onDisconnect,
  onManagePermissions
}) => {
  const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>([
    {
      id: "google",
      name: "Google",
      icon: ({ className }) => (
        <div className={cn("rounded-full bg-red-500 flex items-center justify-center text-white", className)}>
          G
        </div>
      ),
      description: "Access your Gmail, Calendar, and Drive",
      isConnected: true,
      connectedDate: "2024-12-15",
      permissions: ["Read email", "Manage calendar", "Access files"],
      category: "productivity",
      status: "active",
      lastSync: "2 hours ago"
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: ({ className }) => (
        <div className={cn("rounded-full bg-blue-600 flex items-center justify-center text-white", className)}>
          f
        </div>
      ),
      description: "Connect your Facebook account for social features",
      isConnected: false,
      permissions: ["Basic profile", "Friend list", "Post updates"],
      category: "social",
      status: "active"
    },
    {
      id: "slack",
      name: "Slack",
      icon: ({ className }) => (
        <div className={cn("rounded-full bg-purple-600 flex items-center justify-center text-white", className)}>
          S
        </div>
      ),
      description: "Receive notifications in your Slack workspace",
      isConnected: true,
      connectedDate: "2024-12-10",
      permissions: ["Send messages", "Read channels", "Upload files"],
      category: "communication",
      status: "active",
      lastSync: "5 minutes ago"
    },
    {
      id: "dropbox",
      name: "Dropbox",
      icon: ({ className }) => (
        <div className={cn("rounded-full bg-blue-500 flex items-center justify-center text-white", className)}>
          <Cloud className="h-4 w-4" />
        </div>
      ),
      description: "Sync files with your Dropbox account",
      isConnected: false,
      permissions: ["Read files", "Write files", "Manage folders"],
      category: "storage",
      status: "active"
    },
    {
      id: "stripe",
      name: "Stripe",
      icon: ({ className }) => (
        <div className={cn("rounded-full bg-indigo-600 flex items-center justify-center text-white", className)}>
          <CreditCard className="h-4 w-4" />
        </div>
      ),
      description: "Process payments and manage billing",
      isConnected: true,
      connectedDate: "2024-12-05",
      permissions: ["Process payments", "View transactions", "Manage customers"],
      category: "payment",
      status: "expired",
      lastSync: "1 day ago"
    },
    {
      id: "github",
      name: "GitHub",
      icon: ({ className }) => (
        <div className={cn("rounded-full bg-gray-800 flex items-center justify-center text-white", className)}>
          GH
        </div>
      ),
      description: "Connect to your GitHub repositories",
      isConnected: false,
      permissions: ["Read repositories", "Manage issues", "Create webhooks"],
      category: "productivity",
      status: "active"
    },
    {
      id: "zoom",
      name: "Zoom",
      icon: ({ className }) => (
        <div className={cn("rounded-full bg-blue-500 flex items-center justify-center text-white", className)}>
          Z
        </div>
      ),
      description: "Schedule and join Zoom meetings",
      isConnected: true,
      connectedDate: "2024-12-12",
      permissions: ["Create meetings", "Join meetings", "Manage recordings"],
      category: "communication",
      status: "error",
      lastSync: "Failed"
    }
  ]);

  const handleConnect = (appId: string) => {
    setConnectedApps(prev => 
      prev.map(app => 
        app.id === appId 
          ? { ...app, isConnected: true, connectedDate: new Date().toISOString().split('T')[0], status: "active" as const }
          : app
      )
    );
    onConnect?.(appId);
  };

  const handleDisconnect = (appId: string) => {
    setConnectedApps(prev => 
      prev.map(app => 
        app.id === appId 
          ? { ...app, isConnected: false, connectedDate: undefined, status: "active" as const }
          : app
      )
    );
    onDisconnect?.(appId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return Check;
      case "expired":
        return AlertCircle;
      case "error":
        return X;
      default:
        return AlertCircle;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "social":
        return MessageSquare;
      case "productivity":
        return Calendar;
      case "payment":
        return CreditCard;
      case "storage":
        return Cloud;
      case "communication":
        return Mail;
      default:
        return Plug;
    }
  };

  const categories = [
    { id: "all", label: "All Apps" },
    { id: "social", label: "Social" },
    { id: "productivity", label: "Productivity" },
    { id: "communication", label: "Communication" },
    { id: "storage", label: "Storage" },
    { id: "payment", label: "Payment" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredApps = connectedApps.filter(app => 
    selectedCategory === "all" || app.category === selectedCategory
  );

  const connectedCount = connectedApps.filter(app => app.isConnected).length;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Integrations & Connected Apps
          </CardTitle>
          <Badge variant="outline">
            {connectedCount} connected
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Connected Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApps.map((app) => {
            const StatusIcon = getStatusIcon(app.status);
            const CategoryIcon = getCategoryIcon(app.category);
            
            return (
              <div
                key={app.id}
                className={cn(
                  "p-4 border rounded-lg transition-colors",
                  app.isConnected ? "bg-accent/30" : "bg-background"
                )}
              >
                <div className="space-y-4">
                  {/* App Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <app.icon className="h-10 w-10" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{app.name}</h3>
                          <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {app.description}
                        </p>
                      </div>
                    </div>
                    
                    {app.isConnected && (
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(app.status))}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {app.status}
                      </Badge>
                    )}
                  </div>

                  {/* Connection Info */}
                  {app.isConnected && (
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        Connected on {new Date(app.connectedDate!).toLocaleDateString()}
                      </div>
                      {app.lastSync && (
                        <div className="text-xs text-muted-foreground">
                          Last sync: {app.lastSync}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Permissions */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Permissions:</Label>
                    <div className="flex flex-wrap gap-1">
                      {app.permissions.slice(0, 3).map((permission, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                      {app.permissions.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{app.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {app.isConnected ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => onManagePermissions?.(app.id)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDisconnect(app.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => handleConnect(app.id)}
                      >
                        <Plug className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>

                  {/* Status Alerts */}
                  {app.isConnected && app.status === "expired" && (
                    <Alert className="border-yellow-200 bg-yellow-50">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        This connection has expired. Please reconnect to continue using this integration.
                      </AlertDescription>
                    </Alert>
                  )}

                  {app.isConnected && app.status === "error" && (
                    <Alert className="border-red-200 bg-red-50">
                      <X className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Connection error. Check your settings and try reconnecting.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-sm">
            We use industry-standard security measures to protect your connected accounts. 
            You can revoke access for any app at any time. For more details, visit our 
            <Button variant="link" className="p-0 h-auto text-sm"> Security Center</Button>.
          </AlertDescription>
        </Alert>

        {/* Add New Integration */}
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full">
            <ExternalLink className="h-4 w-4 mr-2" />
            Browse More Integrations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Integrations;
