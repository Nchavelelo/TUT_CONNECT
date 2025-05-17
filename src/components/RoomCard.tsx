import { Button } from "@/components/ui/button";
import { Room, bookings } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RoomCardProps {
  room: Room;
  onBook: (roomId: string) => void;
}

const RoomCard = ({ room, onBook }: RoomCardProps) => {
  // Calculate number of active bookings for this room
  const activeBookings = bookings.filter(
    booking => booking.roomId === room.id && booking.status === "confirmed"
  ).length;
  
  // Calculate available space
  const availableSpace = Math.max(0, room.capacity - activeBookings);
  
  // Determine the color based on availability
  const getAvailabilityColor = () => {
    if (availableSpace === 0) return "text-red-600 font-medium";
    if (availableSpace <= room.capacity * 0.2) return "text-orange-500 font-medium";
    return "text-green-600 font-medium";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={room.image || "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"} 
          alt={room.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
        />
        <Badge 
          className="absolute top-2 right-2 capitalize bg-campus-primary"
        >
          {room.type}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{room.name}</CardTitle>
        <CardDescription>{room.building}, Floor {room.floor}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Users size={16} className="mr-1" />
          <span>
            Capacity: <span className={getAvailabilityColor()}>{availableSpace}</span>/{room.capacity} available
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {room.features && room.features.map((feature, index) => (
            <Badge key={index} variant="outline" className="bg-campus-gray text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onBook(room.id)}
          className="w-full bg-campus-primary hover:bg-campus-secondary"
          disabled={availableSpace === 0}
        >
          {availableSpace === 0 ? "Fully Booked" : "Book This Room"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;