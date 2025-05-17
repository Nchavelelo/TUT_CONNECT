import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { rooms, bookings, users } from "@/data/mockData";
import { AlertTriangle, Search, Users, CheckCircle, XCircle, BookOpen } from "lucide-react";
import RoomBookingsTable from "@/components/admin/RoomBookingsTable";
import BookingApprovalTable from "@/components/admin/BookingApprovalTable";
import { toast } from "@/components/ui/use-toast";

const RoomAllocations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("details");
  
  // Get unique faculties from rooms
  const faculties = ["all", ...new Set(rooms.map(room => room.faculty || "Other"))];
  
  // Process room data with booking information
  const roomsWithBookings = rooms.map(room => {
    const roomBookings = bookings.filter(booking => booking.roomId === room.id);
    const bookedCount = roomBookings.length;
    const isOverCapacity = bookedCount > room.capacity;
    const utilization = Math.min(100, Math.round((bookedCount / room.capacity) * 100));
    
    // Get student details for this room's bookings
    const studentDetails = roomBookings.map(booking => {
      const student = users.find(user => user.id === booking.userId);
      return {
        id: booking.id,
        studentId: student?.id,
        name: student?.name || "Unknown",
        email: student?.email || "N/A",
        faculty: student?.faculty || "N/A",
        status: booking.status,
        avatar: student?.avatar
      };
    });
    
    return {
      ...room,
      bookedCount,
      utilization,
      isOverCapacity,
      studentDetails
    };
  });
  
  // Apply filters
  const filteredRooms = roomsWithBookings.filter(room => {
    const matchesSearch = 
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.faculty && room.faculty.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFaculty = facultyFilter === "all" || room.faculty === facultyFilter;
    
    return matchesSearch && matchesFaculty;
  });

  // Handle over capacity alert dismissal
  const handleDismissAlert = (roomId) => {
    toast({
      title: "Alert dismissed",
      description: "The capacity warning has been acknowledged.",
    });
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={20} className="hidden md:block">
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={80}>
          <div className="flex flex-col h-full">
            <Navbar />
            
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="w-full max-w-full mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-campus-primary">Room Allocations</h1>
                    <p className="text-gray-600">Monitor room bookings and capacity usage</p>
                  </div>
                </div>

                {/* Add the BookingApprovalTable component at the top */}
                <BookingApprovalTable />

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="details" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Detailed View
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input 
                          placeholder="Search rooms..." 
                          className="pl-8" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select 
                        value={facultyFilter} 
                        onValueChange={setFacultyFilter}
                      >
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Filter by faculty" />
                        </SelectTrigger>
                        <SelectContent>
                          {faculties.map(faculty => (
                            <SelectItem key={faculty} value={faculty}>
                              {faculty === "all" ? "All Faculties" : faculty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <RoomBookingsTable />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredRooms.map((room) => (
                        <Card 
                          key={room.id} 
                          className={`overflow-hidden transition-all duration-200 ${
                            room.isOverCapacity ? "border-red-300 hover:shadow-md" : "hover:shadow-md"
                          }`}
                        >
                          <CardHeader className="bg-gray-50 pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{room.name}</CardTitle>
                              {room.isOverCapacity && (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" /> Over Capacity
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {room.building}, Floor {room.floor}
                            </p>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-gray-500" />
                                <span className="text-lg font-semibold">{room.bookedCount}</span>
                                <span className="text-gray-500 mx-1">/</span>
                                <span>{room.capacity}</span>
                              </div>
                              <Badge className={`${room.faculty ? "" : "invisible"}`}>
                                {room.faculty || "General"}
                              </Badge>
                            </div>
                            
                            <Progress 
                              value={room.utilization} 
                              className={`mb-4 ${room.utilization > 90 ? "bg-red-100" : "bg-gray-100"}`}
                            />
                            
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Type:</span>
                              <span className="font-medium capitalize">{room.type}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Campus:</span>
                              <span className="font-medium">{room.campus}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Utilization:</span>
                              <span className={`font-medium ${
                                room.utilization > 90 ? "text-red-600" : 
                                room.utilization > 75 ? "text-yellow-600" : "text-green-600"
                              }`}>{room.utilization}%</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {filteredRooms.length === 0 && (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                          <div className="rounded-full bg-gray-100 p-3">
                            <Search className="h-6 w-6 text-gray-400" />
                          </div>
                          <h3 className="mt-4 font-medium">No rooms found</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Try adjusting your search or filter to find what you're looking for.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="details" className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input 
                          placeholder="Search rooms..." 
                          className="pl-8" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select 
                        value={facultyFilter} 
                        onValueChange={setFacultyFilter}
                      >
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Filter by faculty" />
                        </SelectTrigger>
                        <SelectContent>
                          {faculties.map(faculty => (
                            <SelectItem key={faculty} value={faculty}>
                              {faculty === "all" ? "All Faculties" : faculty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {filteredRooms.map((room) => (
                      <Card key={room.id} className={room.isOverCapacity ? "border-red-300" : ""}>
                        <CardHeader className="bg-gray-50 border-b pb-3">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <CardTitle className="flex items-center">
                                {room.name}
                                {room.isOverCapacity && (
                                  <Badge variant="destructive" className="ml-2 flex items-center">
                                    <AlertTriangle className="mr-1 h-3 w-3" /> Over Capacity
                                  </Badge>
                                )}
                              </CardTitle>
                              <p className="text-sm text-gray-500">
                                {room.building}, Floor {room.floor} • {room.faculty || "General"}
                              </p>
                            </div>
                            <div className="flex flex-col items-start md:items-end gap-1">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-gray-500" />
                                <span className="font-medium">{room.bookedCount}</span>
                                <span className="mx-1 text-gray-500">/</span>
                                <span>{room.capacity} capacity</span>
                              </div>
                              <div className="w-full md:w-36">
                                <Progress 
                                  value={room.utilization} 
                                  className={room.utilization > 90 ? "bg-red-100" : ""}
                                />
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          {room.isOverCapacity && (
                            <Alert variant="destructive" className="m-4 mb-2">
                              <AlertTriangle className="h-4 w-4" />
                              <AlertTitle>Booking Alert</AlertTitle>
                              <AlertDescription className="flex justify-between items-center">
                                <span>This room is over its maximum capacity. Some bookings may be automatically rejected.</span>
                                <button 
                                  className="text-xs underline hover:no-underline"
                                  onClick={() => handleDismissAlert(room.id)}
                                >
                                  Dismiss
                                </button>
                              </AlertDescription>
                            </Alert>
                          )}
                          
                          <div className="overflow-x-auto p-4 pt-2">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Student</TableHead>
                                  <TableHead>ID</TableHead>
                                  <TableHead>Faculty</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {room.studentDetails.length > 0 ? (
                                  room.studentDetails.map((student, index) => (
                                    <TableRow 
                                      key={student.id} 
                                      className={index >= room.capacity ? "bg-red-50" : ""}
                                    >
                                      <TableCell>
                                        <div className="flex items-center space-x-2">
                                          {student.avatar ? (
                                            <img 
                                              src={student.avatar} 
                                              alt={student.name} 
                                              className="h-8 w-8 rounded-full"
                                            />
                                          ) : (
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                              {student.name.charAt(0)}
                                            </div>
                                          )}
                                          <div>
                                            <p className="font-medium">{student.name}</p>
                                            <p className="text-xs text-gray-500">{student.email}</p>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell>{student.studentId}</TableCell>
                                      <TableCell>{student.faculty}</TableCell>
                                      <TableCell>
                                        {student.status === "confirmed" ? (
                                          <Badge className="bg-green-500 flex items-center space-x-1">
                                            <CheckCircle className="h-3 w-3" />
                                            <span>Confirmed</span>
                                          </Badge>
                                        ) : student.status === "pending" ? (
                                          <Badge variant="outline" className="flex items-center space-x-1">
                                            <span>Pending</span>
                                          </Badge>
                                        ) : (
                                          <Badge variant="destructive" className="flex items-center space-x-1">
                                            <XCircle className="h-3 w-3" />
                                            <span>Rejected</span>
                                          </Badge>
                                        )}
                                        {index >= room.capacity && (
                                          <Badge variant="outline" className="ml-2 text-xs bg-red-50 border-red-200 text-red-800">
                                            Over Capacity
                                          </Badge>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                      No bookings for this room
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {filteredRooms.length === 0 && (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                          <div className="rounded-full bg-gray-100 p-3">
                            <Search className="h-6 w-6 text-gray-400" />
                          </div>
                          <h3 className="mt-4 font-medium">No rooms found</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Try adjusting your search or filter to find what you're looking for.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default RoomAllocations;