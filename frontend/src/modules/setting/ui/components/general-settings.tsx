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
import { 
  Settings, 
  Moon, 
  Sun, 
  Globe, 
  Clock,
  Monitor,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GeneralSettingsProps {
  className?: string;
  onSettingsChange?: (settings: any) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  className = "",
  onSettingsChange
}) => {
  const [settings, setSettings] = useState({
    theme: "system",
    language: "en",
    timezone: "UTC",
    autoSave: true,
    compactView: false,
    showAnimations: true,
    autoUpdate: true
  });

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor }
  ];

  const languages = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "fr", label: "Français", flag: "🇫🇷" },
    { value: "de", label: "Deutsch", flag: "🇩🇪" },
    { value: "zh", label: "中文", flag: "🇨🇳" },
    { value: "ja", label: "日本語", flag: "🇯🇵" }
  ];

  const timezones = [
    { value: "UTC", label: "UTC (Coordinated Universal Time)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Asia/Shanghai", label: "China Standard Time (CST)" },
    { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          General Settings
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Theme Settings */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Palette className="h-4 w-4" />
            Theme
          </Label>
          <div className="grid grid-cols-3 gap-3">
            {themes.map((theme) => {
              const Icon = theme.icon;
              return (
                <Button
                  key={theme.value}
                  variant={settings.theme === theme.value ? "default" : "outline"}
                  className={cn(
                    "flex flex-col items-center gap-2 h-auto p-4",
                    settings.theme === theme.value && "ring-2 ring-primary"
                  )}
                  onClick={() => handleSettingChange("theme", theme.value)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{theme.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Language Settings */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Globe className="h-4 w-4" />
            Language
          </Label>
          <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Timezone Settings */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4" />
            Timezone
          </Label>
          <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Additional Settings */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Additional Preferences</Label>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-save">Auto-save</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically save changes as you work
                </p>
              </div>
              <Switch
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-view">Compact view</Label>
                <p className="text-xs text-muted-foreground">
                  Show more content in less space
                </p>
              </div>
              <Switch
                id="compact-view"
                checked={settings.compactView}
                onCheckedChange={(checked) => handleSettingChange("compactView", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="animations">Show animations</Label>
                <p className="text-xs text-muted-foreground">
                  Enable smooth transitions and animations
                </p>
              </div>
              <Switch
                id="animations"
                checked={settings.showAnimations}
                onCheckedChange={(checked) => handleSettingChange("showAnimations", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-update">Auto-update</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically install updates when available
                </p>
              </div>
              <Switch
                id="auto-update"
                checked={settings.autoUpdate}
                onCheckedChange={(checked) => handleSettingChange("autoUpdate", checked)}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t">
          <Button className="w-full">
            Save General Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
