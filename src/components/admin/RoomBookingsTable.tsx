import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { rooms, bookings } from "@/data/mockData";
import { useState } from "react";

const RoomBookingsTable = () => {
  const [selectedCampus, setSelectedCampus] = useState<string>("all");
  
  const campuses = ["all", ...new Set(rooms.map(room => room.campus))];
  
  const filteredRooms = rooms.filter(room => 
    selectedCampus === "all" || room.campus === selectedCampus
  );
  
  const getActiveBookingsForRoom = (roomId: string) => {
    return bookings.filter(booking => booking.roomId === roomId && booking.status === "confirmed").length;
  };
  
  const calculateSpaceLeft = (roomCapacity: number, activeBookings: number) => {
    return Math.max(0, roomCapacity - activeBookings);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Building className="h-5 w-5" />
            Room Bookings Overview
          </CardTitle>
          
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <Label htmlFor="campus-filter" className="text-sm mr-2">Campus:</Label>
            <Select value={selectedCampus} onValueChange={setSelectedCampus}>
              <SelectTrigger id="campus-filter" className="w-[180px] h-9">
                <SelectValue placeholder="Select campus" />
              </SelectTrigger>
              <SelectContent>
                {campuses.map((campus) => (
                  <SelectItem key={campus} value={campus}>
                    {campus === "all" ? "All Campuses" : campus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Campus</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Total Capacity</TableHead>
                <TableHead>Students Booked</TableHead>
                <TableHead>Space Available</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => {
                const activeBookings = getActiveBookingsForRoom(room.id);
                const spaceLeft = calculateSpaceLeft(room.capacity, activeBookings);
                
                return (
                  <TableRow key={room.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell>{room.campus}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {room.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        {room.capacity}
                      </div>
                    </TableCell>
                    <TableCell>{activeBookings}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        spaceLeft === 0 
                          ? 'bg-red-100 text-red-800' 
                          : spaceLeft < room.capacity * 0.2 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {spaceLeft}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomBookingsTable;