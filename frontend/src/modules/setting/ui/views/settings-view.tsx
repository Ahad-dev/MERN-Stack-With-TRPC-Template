import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Bell, 
  Shield, 
  Plug,
  User,
  Palette,
  Globe,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import GeneralSettings from "../components/general-settings";
import NotificationSettings from "../components/notification-settings";
import PrivacySettings from "../components/privacy-settings";
import Integrations from "../components/integrations";

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState("general");

  // Handler functions
  const handleGeneralSettingsChange = (settings: any) => {
    console.log("General settings changed:", settings);
    // Save settings logic
  };

  const handleNotificationSettingsChange = (settings: any) => {
    console.log("Notification settings changed:", settings);
    // Save settings logic
  };

  const handlePrivacySettingsChange = (settings: any) => {
    console.log("Privacy settings changed:", settings);
    // Save settings logic
  };

  const handleConnect = (appId: string) => {
    console.log("Connecting app:", appId);
    // Connect app logic
  };

  const handleDisconnect = (appId: string) => {
    console.log("Disconnecting app:", appId);
    // Disconnect app logic
  };

  const handleManagePermissions = (appId: string) => {
    console.log("Managing permissions for app:", appId);
    // Manage permissions logic
  };

  const tabs = [
    {
      id: "general",
      label: "General",
      icon: Settings,
      description: "Theme, language, and preferences",
      component: (
        <GeneralSettings 
          onSettingsChange={handleGeneralSettingsChange}
        />
      )
    },
    {
      id: "notifications",
      label: "Notifications", 
      icon: Bell,
      description: "Email, push, and in-app notifications",
      component: (
        <NotificationSettings 
          onSettingsChange={handleNotificationSettingsChange}
        />
      )
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: Shield,
      description: "Profile visibility and data settings",
      component: (
        <PrivacySettings 
          onSettingsChange={handlePrivacySettingsChange}
        />
      )
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: Plug,
      description: "Connected apps and services",
      component: (
        <Integrations
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onManagePermissions={handleManagePermissions}
        />
      )
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and privacy settings
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Profile</p>
                <p className="text-2xl font-bold text-blue-600">95%</p>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  Complete
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Security</p>
                <p className="text-2xl font-bold text-green-600">Strong</p>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  Protected
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Plug className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Connected</p>
                <p className="text-2xl font-bold text-purple-600">4</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  Apps
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Notifications</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
                <div className="flex items-center gap-1 text-xs text-orange-600">
                  <Palette className="h-3 w-3" />
                  Active
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start h-auto p-3",
                        activeTab === tab.id && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Icon className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">{tab.label}</div>
                          <div className="text-xs opacity-80">
                            {tab.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeTabData?.component}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;