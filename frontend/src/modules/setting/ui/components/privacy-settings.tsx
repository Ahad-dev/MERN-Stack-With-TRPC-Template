import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Users,
  Lock,
  Globe,
  UserCheck,
  Database,
  FileText,
  AlertTriangle,
  Download,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PrivacySettingsProps {
  className?: string;
  onSettingsChange?: (settings: any) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  className = "",
  onSettingsChange
}) => {
  const [settings, setSettings] = useState({
    profileVisibility: "public",
    activityVisibility: "friends",
    showOnlineStatus: true,
    showLastSeen: false,
    allowMessagesFrom: "everyone",
    showEmail: false,
    showPhone: false,
    dataCollection: {
      analytics: true,
      advertising: false,
      performance: true,
      functional: true
    },
    searchEngine: false,
    thirdPartySharing: false,
    marketingEmails: true,
    locationTracking: false
  });

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const handleDataCollectionChange = (key: string, value: boolean) => {
    const newSettings = {
      ...settings,
      dataCollection: {
        ...settings.dataCollection,
        [key]: value
      }
    };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const visibilityOptions = [
    { value: "public", label: "Public", description: "Visible to everyone", icon: Globe },
    { value: "friends", label: "Friends Only", description: "Visible to your connections", icon: Users },
    { value: "private", label: "Private", description: "Only visible to you", icon: Lock }
  ];

  const messageOptions = [
    { value: "everyone", label: "Everyone", description: "Anyone can message you" },
    { value: "friends", label: "Friends Only", description: "Only your connections can message you" },
    { value: "nobody", label: "Nobody", description: "Disable all messaging" }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy Settings
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Profile Visibility */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Eye className="h-4 w-4" />
            Profile Visibility
          </Label>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-sm">Who can see your profile?</Label>
              <Select value={settings.profileVisibility} onValueChange={(value) => handleSettingChange("profileVisibility", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {visibilityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Who can see your activity?</Label>
              <Select value={settings.activityVisibility} onValueChange={(value) => handleSettingChange("activityVisibility", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {visibilityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Online Status & Contact Info */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <UserCheck className="h-4 w-4" />
            Online Status & Contact
          </Label>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show online status</Label>
                <p className="text-xs text-muted-foreground">
                  Let others see when you're online
                </p>
              </div>
              <Switch
                checked={settings.showOnlineStatus}
                onCheckedChange={(checked) => handleSettingChange("showOnlineStatus", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show last seen</Label>
                <p className="text-xs text-muted-foreground">
                  Show when you were last active
                </p>
              </div>
              <Switch
                checked={settings.showLastSeen}
                onCheckedChange={(checked) => handleSettingChange("showLastSeen", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show email address</Label>
                <p className="text-xs text-muted-foreground">
                  Display your email on your profile
                </p>
              </div>
              <Switch
                checked={settings.showEmail}
                onCheckedChange={(checked) => handleSettingChange("showEmail", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show phone number</Label>
                <p className="text-xs text-muted-foreground">
                  Display your phone number on your profile
                </p>
              </div>
              <Switch
                checked={settings.showPhone}
                onCheckedChange={(checked) => handleSettingChange("showPhone", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Who can message you?</Label>
              <Select value={settings.allowMessagesFrom} onValueChange={(value) => handleSettingChange("allowMessagesFrom", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {messageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Database className="h-4 w-4" />
            Data Collection & Usage
          </Label>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytics data</Label>
                <p className="text-xs text-muted-foreground">
                  Help improve the app with usage analytics
                </p>
              </div>
              <Switch
                checked={settings.dataCollection.analytics}
                onCheckedChange={(checked) => handleDataCollectionChange("analytics", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Advertising data</Label>
                <p className="text-xs text-muted-foreground">
                  Allow data collection for personalized ads
                </p>
              </div>
              <Switch
                checked={settings.dataCollection.advertising}
                onCheckedChange={(checked) => handleDataCollectionChange("advertising", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Performance data</Label>
                <p className="text-xs text-muted-foreground">
                  Share performance data to help optimize the app
                </p>
              </div>
              <Switch
                checked={settings.dataCollection.performance}
                onCheckedChange={(checked) => handleDataCollectionChange("performance", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Functional data</Label>
                <p className="text-xs text-muted-foreground">
                  Essential data required for app functionality
                </p>
              </div>
              <Switch
                checked={settings.dataCollection.functional}
                onCheckedChange={(checked) => handleDataCollectionChange("functional", checked)}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Additional Privacy Options */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Lock className="h-4 w-4" />
            Additional Privacy Options
          </Label>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Search engine indexing</Label>
                <p className="text-xs text-muted-foreground">
                  Allow search engines to index your public profile
                </p>
              </div>
              <Switch
                checked={settings.searchEngine}
                onCheckedChange={(checked) => handleSettingChange("searchEngine", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Third-party data sharing</Label>
                <p className="text-xs text-muted-foreground">
                  Allow sharing data with trusted partners
                </p>
              </div>
              <Switch
                checked={settings.thirdPartySharing}
                onCheckedChange={(checked) => handleSettingChange("thirdPartySharing", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Location tracking</Label>
                <p className="text-xs text-muted-foreground">
                  Allow location-based features and services
                </p>
              </div>
              <Switch
                checked={settings.locationTracking}
                onCheckedChange={(checked) => handleSettingChange("locationTracking", checked)}
              />
            </div>
          </div>
        </div>

        {/* Data Export & Deletion */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4" />
            Data Management
          </Label>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Export your data</Label>
                <p className="text-xs text-muted-foreground">
                  Download a copy of all your data
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg border-red-200 bg-red-50/50">
              <div className="space-y-0.5">
                <Label className="text-red-800">Delete your account</Label>
                <p className="text-xs text-red-600">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Your privacy is important to us. Changes to these settings may take effect immediately 
            or require up to 24 hours to process. For more information, please review our 
            <Button variant="link" className="p-0 h-auto text-sm"> Privacy Policy</Button>.
          </AlertDescription>
        </Alert>

        {/* Save Button */}
        <div className="pt-4 border-t">
          <Button className="w-full">
            Save Privacy Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacySettings;
