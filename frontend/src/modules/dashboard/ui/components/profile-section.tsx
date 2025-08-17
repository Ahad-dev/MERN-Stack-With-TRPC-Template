import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Edit3, 
  Settings, 
  LogOut, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  User,
  ChevronDown
} from "lucide-react";

interface ProfileSectionProps {
  name?: string;
  email?: string;
  profilePicture?: string;
  role?: string;
  status?: "active" | "inactive" | "pending";
  joinDate?: string;
  phone?: string;
  location?: string;
  isVerified?: boolean;
  onEditProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
  onChangePassword?: () => void;
  className?: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  name = "John Doe",
  email = "john.doe@example.com",
  profilePicture = "/logo.png",
  role = "User",
  status = "active",
  joinDate = "Jan 2024",
  phone,
  location,
  isVerified = false,
  onEditProfile,
  onSettings,
  onLogout,
  onChangePassword,
  className = "",
}) => {
  const isMobile = useIsMobile();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Profile Trigger Component
  const ProfileTrigger = () => (
    <div className={`flex items-center flex-col justify-center text-center gap-3 p-3 rounded-lg border bg-background hover:bg-accent transition-colors cursor-pointer shadow-xl ${className}`}>
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profilePicture} alt={name} />
          <AvatarFallback className="text-sm font-semibold">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        {isVerified && (
          <div className="absolute -bottom-0.5 -right-0.5 bg-blue-500 rounded-full p-0.5">
            <Shield className="h-2 w-2 text-white" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{name}</p>
        <p className="text-xs text-muted-foreground truncate">{email}</p>
      </div>
      
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </div>
  );

  // Profile Content Component
  const ProfileContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="w-full max-w-sm">
      <div className="space-y-4">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-3 pb-4 border-b">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profilePicture} alt={name} />
              <AvatarFallback className="text-lg font-semibold">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                <Shield className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="text-center">
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
            <Badge 
              variant="outline" 
              className={`mt-2 ${getStatusColor(status)}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{email}</span>
          </div>
          
          {phone && (
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{phone}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{location}</span>
            </div>
          )}
          
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Joined {joinDate}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => {
              onEditProfile?.();
              onClose?.();
            }}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => {
              onSettings?.();
              onClose?.();
            }}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => {
              onChangePassword?.();
              onClose?.();
            }}
          >
            Change Password
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => {
              onLogout?.();
              onClose?.();
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <div>
            <ProfileTrigger />
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Profile</DrawerTitle>
            <DrawerDescription>
              Manage your account settings and preferences
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <DrawerClose asChild>
              <div>
                <ProfileContent onClose={() => {}} />
              </div>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <ProfileTrigger />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start"side="left" >
        <div className="p-4">
          <ProfileContent />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileSection;
