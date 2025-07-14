import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import { ChevronsUpDown, LogOut, Settings2, User2 } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface UserDropDownProps {
  email: string;
  plan: string;
  name: string;
  avatarUrl?: string;
}

const UserDropDown = ({
  email,
  name,
  plan,
  avatarUrl, // Default avatar URL
}: UserDropDownProps) => {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  console.log(isMobile);

  // If the user is on a mobile device the use Drawer
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger
          className={cn(
            "flex items-center justify-around hover:bg-muted-foreground/10 cursor-pointer rounded-xl gap-2 py-2",
            state == "collapsed" ? "w-9 h-9 p-0 py-2" : "",
            state == "expanded" &&
              "hover:bg-muted-foreground/20 transition-all duration-200"
          )}
        >
          <img
            src="/logo.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          {state == "expanded" && (
            <div className="flex flex-col text-start">
              <p className="font-semibold">{name}</p>
              <p className="text-xs text-muted-foreground">{plan}</p>
            </div>
          )}
          {state == "expanded" && (
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex items-center flex-col gap-2">
              <span className="font-semibold">{name}</span>
            </DrawerTitle>
            <DrawerDescription className="text-xs text-muted-foreground">
              <p>{email}</p>
              <p>{plan} Plan</p>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex flex-col gap-2">
            <Button variant="ghost" className="w-full justify-start">
              <User2 className="size-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings2 className="size-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <LogOut className="size-4 mr-2" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center justify-around hover:bg-muted-foreground/10 cursor-pointer rounded-xl gap-2 py-2",
          state == "collapsed" ? "w-9 h-9 p-0 py-2" : "",
          "hover:bg-muted-foreground/20 transition-all duration-200"
        )}
      >
        <img
          src="/logo.png"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        {state == "expanded" && (
          <div className="flex flex-col text-start">
            <p className="font-semibold">{name}</p>
            <p className="text-xs text-muted-foreground">{plan}</p>
          </div>
        )}
        {state == "expanded" && (
          <ChevronsUpDown className="size-4 text-muted-foreground" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="end"
        sideOffset={10}
        className="w-72 "
      >
        <DropdownMenuLabel className="p-2 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{name}</span>
          </div>
          <p className="text-xs text-muted-foreground">{email}</p>
          <p className="text-xs text-muted-foreground font-semibold">
            {plan} Plan
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
