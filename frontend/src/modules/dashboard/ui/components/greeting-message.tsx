import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface GreetingMessageProps {
    name: string;
    timeOfDay: "Morning" | "Evening" | "Night";
    message: string;
    profilePicture?: string;
}

const GreetingMessage = ({
    name,
    timeOfDay,
    message,
}: GreetingMessageProps) => {
    
    const [currentTime, setCurrentTime] = useState(() => {
        const now = new Date();
        return `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(`${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`);
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <Card className="col-span-2 bg-gradient-to-r from-secondary to-primary shadow-xl text-white h-full">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center justify-between">
                        <p className="text-5xl font-bold">
                            Good {timeOfDay}, {name}!
                        </p>
                        <div className="flex gap-2 items-center justify-center text-sm mt-2 font-light">
                            <span>{currentTime}</span>
                            <CalendarIcon className="inline-block ml-1 h-4 w-4" />
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm">
                    {message}
                </p>
            </CardContent>
        </Card>
    );
}

export default GreetingMessage;
