import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  location?: string;
  attendees?: number;
  type: "meeting" | "deadline" | "event" | "reminder";
  priority: "low" | "medium" | "high";
  status: "upcoming" | "today" | "overdue";
}

interface UpcomingEventsProps {
  events?: Event[];
  className?: string;
  maxEvents?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
  onEventClick?: (event: Event) => void;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  events,
  className = "",
  maxEvents = 5,
  showViewAll = true,
  onViewAll,
  onEventClick
}) => {
  // Default events if none provided
  const defaultEvents: Event[] = [
    {
      id: "1",
      title: "Project Review Meeting",
      description: "Quarterly project review with the team",
      date: "Today",
      time: "2:00 PM",
      location: "Conference Room A",
      attendees: 8,
      type: "meeting",
      priority: "high",
      status: "today"
    },
    {
      id: "2",
      title: "Client Proposal Deadline",
      description: "Submit final proposal to client",
      date: "Tomorrow",
      time: "5:00 PM",
      type: "deadline",
      priority: "high",
      status: "upcoming"
    },
    {
      id: "3",
      title: "Team Building Event",
      description: "Annual team building activities",
      date: "Dec 25",
      time: "10:00 AM",
      location: "Central Park",
      attendees: 15,
      type: "event",
      priority: "medium",
      status: "upcoming"
    },
    {
      id: "4",
      title: "System Maintenance",
      description: "Scheduled server maintenance",
      date: "Dec 28",
      time: "12:00 AM",
      type: "reminder",
      priority: "medium",
      status: "upcoming"
    },
    {
      id: "5",
      title: "Performance Review",
      description: "Annual performance evaluation",
      date: "Jan 5",
      time: "3:00 PM",
      location: "HR Office",
      type: "meeting",
      priority: "high",
      status: "upcoming"
    }
  ];

  const displayEvents = (events || defaultEvents).slice(0, maxEvents);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800";
      case "deadline":
        return "bg-red-100 text-red-800";
      case "event":
        return "bg-green-100 text-green-800";
      case "reminder":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case "today":
        return "border-l-4 border-l-blue-500";
      case "overdue":
        return "border-l-4 border-l-red-500";
      default:
        return "border-l-4 border-l-transparent";
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
        {showViewAll && (
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {displayEvents.map((event) => (
          <div
            key={event.id}
            className={cn(
              "p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer",
              getStatusBorder(event.status)
            )}
            onClick={() => onEventClick?.(event)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <Badge variant="outline" className={cn("text-xs", getTypeColor(event.type))}>
                    {event.type}
                  </Badge>
                  {event.priority === "high" && (
                    <AlertCircle className={cn("h-4 w-4", getPriorityColor(event.priority))} />
                  )}
                </div>
                
                {event.description && (
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                )}
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.attendees && (
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{event.attendees}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        ))}
        
        {displayEvents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No upcoming events</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
