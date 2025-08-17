import React, { useState, useLayoutEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowUp, UserMinus2, UserPlus2, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import StatCard from "../components/stat-card";
import GreetingMessage from "../components/greeting-message";
import ProfileSection from "../components/profile-section";
import RecentActivity from "../components/recent-activity";
import QuickActions from "../components/quick-actions";
import UpcomingEvents from "../components/upcoming-events";
import QuickStats from "../components/quick-stats";
import { authClient } from "@/lib/auth";

const STATS_ITEMS = [
  {
    title: "Total Users",
    value: 100,
    icon: Users2,
    color: "text-blue-500",
    borderColor: "border-blue-500/40",
  },
  {
    title: "Active Users",
    value: 80,
    icon: UserPlus2,
    color: "text-green-500",
    borderColor: "border-green-500/40",
  },
  {
    title: "Inactive Users",
    value: 20,
    icon: UserMinus2,
    color: "text-red-500",
    borderColor: "border-red-500/40",
  },
  {
    title: "New Users This Month",
    value: 10,
    icon: UserPlus2,
    color: "text-yellow-500",
    borderColor: "border-yellow-500/40",
  },
];

const UserDashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const {data} = authClient.useSession();

  // Profile action handlers
  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // Add your edit profile logic here
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    // Add your settings logic here
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    authClient.signOut();
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
    // Add your change password logic here
  };

  // Additional handlers for new components
  const handleViewAllActivity = () => {
    console.log("View all activity clicked");
    // Navigate to activity page
  };

  const handleViewAllEvents = () => {
    console.log("View all events clicked");
    // Navigate to events/calendar page
  };

  const handleEventClick = (event: any) => {
    console.log("Event clicked:", event);
    // Navigate to event details
  };

  // Animate elements once loaded
  useLayoutEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {

        if (tableRef.current) {
          gsap.from(tableRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.5,
          });
        }
      });

      return () => ctx.revert(); // Clean up on unmount
    }
  }, [loading]);

  // Simulate loading
  // useLayoutEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  if (loading) {
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {STATS_ITEMS.map((item) => (
            <Skeleton key={item.title} className="h-40 w-full" />
          ))}
        </div>
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>User List</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <GreetingMessage
            name={data?.user?.name || "User"}
            timeOfDay="Morning"
            message="Welcome to your dashboard! Here you can manage your account, view statistics, and more."
            profilePicture={data?.user?.image || "/logo.png"}
          />
        </div>
        <div className="lg:col-span-1">
          <ProfileSection
            name={data?.user?.name || "User"}
            email={data?.user?.email || "user@example.com"}
            profilePicture={data?.user?.image || "/logo.png"}
            role="Administrator"
            status="active"
            joinDate="Jan 2024"
            phone="+1 (555) 123-4567"
            location="New York, USA"
            isVerified={true}
            onEditProfile={handleEditProfile}
            onSettings={handleSettings}
            onLogout={handleLogout}
            onChangePassword={handleChangePassword}
          />
        </div>
      </div>

      {/* Stats Section */}
      <QuickStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />
          <RecentActivity 
            onViewAll={handleViewAllActivity}
          />
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-1">
          <UpcomingEvents 
            onViewAll={handleViewAllEvents}
            onEventClick={handleEventClick}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
