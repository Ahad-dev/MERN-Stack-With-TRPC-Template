import React, { useState, useLayoutEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowUp, UserMinus2, UserPlus2, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import StatCard from "../ui/components/stat-card";

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
  const [loading, setLoading] = useState(true);
  const tableRef = useRef<HTMLDivElement | null>(null);


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
  useLayoutEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4 last:col-span-3">
        {STATS_ITEMS.map((item) => (
            <StatCard key={item.title} item={item} />
        ))}
      </div>

      <div className="p-4 z-2 " ref={tableRef}>
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      User {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      user{index + 1}@example.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {index % 2 === 0 ? "Active" : "Inactive"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
