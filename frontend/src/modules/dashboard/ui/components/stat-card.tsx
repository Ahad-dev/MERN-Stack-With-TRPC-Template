import React from 'react'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';


interface StatCardProps {
    item: {
        title: string;
        value: number;
        icon: React.ComponentType<{ className?: string }>;
        color: string;
        borderColor: string;
    };
}

const StatCard = ({item}:StatCardProps) => {
  return (
              <Card
                key={item.title}
                className={cn(
                  "w-full border shadow-none backdrop-blur-xs bg-card/30  relative  hover:scale-105 transition duration-300 hover:shadow-xl",
                  item.borderColor
                )}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-5">
                    <div className="border bg-transparent p-3 rounded-xl">
                      <item.icon className={cn("size-5", item.color)} />
                    </div>
                    <span className="text-xs text-muted-foreground flex">
                      <span className="text-green-500 flex">
                        10% <ArrowUp className="size-3" />
                      </span>{" "}
                      increase last month
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p className="text-xs font-light">{item.title}</p>
                  <p className="text-4xl font-semibold">{item.value}</p>
                </CardContent>
              </Card>
  )
}

export default StatCard