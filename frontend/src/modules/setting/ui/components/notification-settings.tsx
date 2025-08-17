import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Mail, 
  Smartphone, 
  MessageSquare,
  ShoppingCart,
  Calendar,
  UserPlus,
  AlertCircle,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationSettingsProps {
  className?: string;
  onSettingsChange?: (settings: any) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  className = "",
  onSettingsChange
}) => {
  const [settings, setSettings] = useState({
    emailNotifications: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      securityAlerts: true,
      projectUpdates: true,
      invoices: true,
      reminders: false
    },
    pushNotifications: {
      orderUpdates: true,
      messages: true,
      promotions: false,
      reminders: true,
      projectUpdates: false,
      mentions: true,
      comments: true
    },
    inAppNotifications: {
      all: true,
      sound: false,
      desktop: true,
      mobile: true
    }
  });

  const handleSettingChange = (category: string, key: string, value: boolean) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [key]: value
      }
    };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const handleCategoryToggle = (category: string, enabled: boolean) => {
    const categorySettings = settings[category as keyof typeof settings];
    const newCategorySettings = Object.keys(categorySettings).reduce((acc, key) => {
      acc[key] = enabled;
      return acc;
    }, {} as any);

    const newSettings = {
      ...settings,
      [category]: newCategorySettings
    };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const emailNotificationTypes = [
    {
      key: "orderUpdates",
      label: "Order Updates",
      description: "Get notified when your orders change status",
      icon: ShoppingCart,
      priority: "high"
    },
    {
      key: "projectUpdates",
      label: "Project Updates",
      description: "Updates on your active projects and milestones",
      icon: Calendar,
      priority: "medium"
    },
    {
      key: "invoices",
      label: "Invoices & Billing",
      description: "New invoices and payment confirmations",
      icon: AlertCircle,
      priority: "high"
    },
    {
      key: "securityAlerts",
      label: "Security Alerts",
      description: "Important security notifications and login alerts",
      icon: Settings,
      priority: "high"
    },
    {
      key: "newsletter",
      label: "Newsletter",
      description: "Monthly updates and company news",
      icon: Mail,
      priority: "low"
    },
    {
      key: "promotions",
      label: "Promotions",
      description: "Special offers and promotional content",
      icon: UserPlus,
      priority: "low"
    },
    {
      key: "reminders",
      label: "Reminders",
      description: "Task reminders and deadline notifications",
      icon: Bell,
      priority: "medium"
    }
  ];

  const pushNotificationTypes = [
    {
      key: "orderUpdates",
      label: "Order Updates",
      description: "Push notifications for order status changes",
      icon: ShoppingCart
    },
    {
      key: "messages",
      label: "Messages",
      description: "New messages and chat notifications",
      icon: MessageSquare
    },
    {
      key: "projectUpdates",
      label: "Project Updates",
      description: "Push notifications for project milestones",
      icon: Calendar
    },
    {
      key: "mentions",
      label: "Mentions",
      description: "When someone mentions you in comments",
      icon: UserPlus
    },
    {
      key: "comments",
      label: "Comments",
      description: "New comments on your projects",
      icon: MessageSquare
    },
    {
      key: "reminders",
      label: "Reminders",
      description: "Important reminders and deadlines",
      icon: Bell
    },
    {
      key: "promotions",
      label: "Promotions",
      description: "Special offers and deals",
      icon: UserPlus
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Email Notifications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <Label className="text-sm font-medium">Email Notifications</Label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const allEnabled = Object.values(settings.emailNotifications).every(Boolean);
                handleCategoryToggle("emailNotifications", !allEnabled);
              }}
            >
              {Object.values(settings.emailNotifications).every(Boolean) ? "Disable All" : "Enable All"}
            </Button>
          </div>
          
          <div className="space-y-3">
            {emailNotificationTypes.map((notification) => {
              const Icon = notification.icon;
              return (
                <div key={notification.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Label>{notification.label}</Label>
                        <Badge variant="outline" className={cn("text-xs", getPriorityColor(notification.priority))}>
                          {notification.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications[notification.key as keyof typeof settings.emailNotifications]}
                    onCheckedChange={(checked) => 
                      handleSettingChange("emailNotifications", notification.key, checked)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <Label className="text-sm font-medium">Push Notifications</Label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const allEnabled = Object.values(settings.pushNotifications).every(Boolean);
                handleCategoryToggle("pushNotifications", !allEnabled);
              }}
            >
              {Object.values(settings.pushNotifications).every(Boolean) ? "Disable All" : "Enable All"}
            </Button>
          </div>
          
          <div className="space-y-3">
            {pushNotificationTypes.map((notification) => {
              const Icon = notification.icon;
              return (
                <div key={notification.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="space-y-1">
                      <Label>{notification.label}</Label>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications[notification.key as keyof typeof settings.pushNotifications]}
                    onCheckedChange={(checked) => 
                      handleSettingChange("pushNotifications", notification.key, checked)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* In-App Notification Preferences */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <Label className="text-sm font-medium">In-App Preferences</Label>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable all in-app notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Show notifications within the application
                </p>
              </div>
              <Switch
                checked={settings.inAppNotifications.all}
                onCheckedChange={(checked) => 
                  handleSettingChange("inAppNotifications", "all", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sound notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Play sound when notifications arrive
                </p>
              </div>
              <Switch
                checked={settings.inAppNotifications.sound}
                onCheckedChange={(checked) => 
                  handleSettingChange("inAppNotifications", "sound", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Desktop notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Show notifications on desktop
                </p>
              </div>
              <Switch
                checked={settings.inAppNotifications.desktop}
                onCheckedChange={(checked) => 
                  handleSettingChange("inAppNotifications", "desktop", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mobile notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Show notifications on mobile devices
                </p>
              </div>
              <Switch
                checked={settings.inAppNotifications.mobile}
                onCheckedChange={(checked) => 
                  handleSettingChange("inAppNotifications", "mobile", checked)
                }
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t">
          <Button className="w-full">
            Save Notification Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
