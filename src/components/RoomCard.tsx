
import { Button } from "@/components/ui/button";
import { Room } from "@/data/mockData";
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
          <span>Capacity: {room.capacity}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {room.features.map((feature, index) => (
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
        >
          Book This Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
