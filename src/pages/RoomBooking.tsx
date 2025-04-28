import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import RoomCard from "@/components/RoomCard";
import BookingCalendar from "@/components/BookingCalendar";
import { rooms, Room } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

const RoomBooking = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [buildingFilter, setBuildingFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  const buildings = ["all", ...new Set(rooms.map((room) => room.building))];
  const roomTypes = ["all", ...new Set(rooms.map((room) => room.type))];
  
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = searchTerm === "" || 
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.building.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesBuilding = buildingFilter === "all" || room.building === buildingFilter;
    const matchesType = typeFilter === "all" || room.type === typeFilter;
    
    return matchesSearch && matchesBuilding && matchesType;
  });
  
  const handleBookRoom = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setSelectedRoom(room);
      setShowBookingDialog(true);
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <div className="flex-1 flex flex-col min-h-screen">
            <Navbar />
            <main className="page-container">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-campus-primary">Room Booking</h1>
                  <p className="text-gray-600">Find and book available rooms on campus</p>
                </div>
              </div>
              
              <Tabs defaultValue="find" className="mb-8">
                <TabsList className="w-full md:w-auto grid grid-cols-2">
                  <TabsTrigger value="find">Find a Room</TabsTrigger>
                  <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="find" className="mt-6">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="relative">
                      <Label htmlFor="search" className="sr-only">Search</Label>
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="search"
                        placeholder="Search for rooms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="building" className="sr-only">Building</Label>
                      <Select
                        value={buildingFilter}
                        onValueChange={setBuildingFilter}
                      >
                        <SelectTrigger id="building">
                          <SelectValue placeholder="Filter by building" />
                        </SelectTrigger>
                        <SelectContent>
                          {buildings.map((building) => (
                            <SelectItem key={building} value={building}>
                              {building === "all" ? "All Buildings" : building}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="type" className="sr-only">Room Type</Label>
                      <Select
                        value={typeFilter}
                        onValueChange={setTypeFilter}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {filteredRooms.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredRooms.map((room) => (
                        <RoomCard key={room.id} room={room} onBook={handleBookRoom} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchTerm("");
                          setBuildingFilter("all");
                          setTypeFilter("all");
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="bookings" className="mt-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium mb-4">Your Bookings</h3>
                    
                    <div className="space-y-4">
                      <div className="p-6 text-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Your upcoming and past bookings will appear here</p>
                        <Button className="mt-4 bg-campus-primary hover:bg-campus-secondary">
                          Book a New Room
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Book a Room</DialogTitle>
            <DialogDescription>
              Select a date and time to book this room
            </DialogDescription>
          </DialogHeader>
          <BookingCalendar 
            room={selectedRoom} 
            onClose={() => setShowBookingDialog(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomBooking;
