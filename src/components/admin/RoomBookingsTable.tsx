
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    return bookings.filter(booking => booking.roomId === roomId && booking.status === "confirmed");
  };
  
  const calculateSpaceLeft = (roomCapacity: number, activeBookings: number) => {
    return Math.max(0, roomCapacity - activeBookings);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Room Bookings Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="campus-filter">Filter by Campus</Label>
          <Select value={selectedCampus} onValueChange={setSelectedCampus}>
            <SelectTrigger id="campus-filter" className="w-[200px]">
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
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Campus</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Total Capacity</TableHead>
                <TableHead>Active Bookings</TableHead>
                <TableHead>Space Left</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => {
                const activeBookings = getActiveBookingsForRoom(room.id).length;
                const spaceLeft = calculateSpaceLeft(room.capacity, activeBookings);
                
                return (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell>{room.campus}</TableCell>
                    <TableCell className="capitalize">{room.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {room.capacity}
                      </div>
                    </TableCell>
                    <TableCell>{activeBookings}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
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
