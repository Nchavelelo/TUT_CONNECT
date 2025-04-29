import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { classes, rooms } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  
  const days = ["all", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const filteredClasses = selectedDay === "all" 
    ? classes 
    : classes.filter(cls => cls.day === selectedDay);
  
  const classesByDay = days.slice(1).map(day => ({
    day,
    classes: filteredClasses.filter(cls => cls.day === day)
  }));
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={20} className="hidden md:block">
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={80} className="w-full">
          <div className="flex flex-col h-full w-full overflow-hidden">
            <Navbar />
            
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="w-full max-w-full mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-campus-primary">Class Timetable</h1>
                    <p className="text-gray-600">View your weekly class schedule</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 w-full md:w-48">
                    <Select
                      value={selectedDay}
                      onValueChange={setSelectedDay}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by day" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day === "all" ? "All Days" : day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Card className="mb-6 overflow-hidden">
                  <CardHeader className="bg-campus-primary text-white">
                    <CardTitle className="text-lg">Weekly Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 w-24">Time</th>
                            {days.slice(1).map((day) => (
                              <th 
                                key={day} 
                                className="px-4 py-3 text-left text-sm font-medium text-gray-500"
                              >
                                {day}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].map((timeSlot) => (
                            <tr key={timeSlot} className="border-t">
                              <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                                {timeSlot}
                              </td>
                              {days.slice(1).map((day) => {
                                const classesInTimeSlot = classes.filter(
                                  (cls) => 
                                    cls.day === day && 
                                    cls.startTime >= timeSlot &&
                                    cls.startTime < timeSlot.replace("00", "59")
                                );
                                
                                return (
                                  <td key={day} className="px-4 py-3">
                                    {classesInTimeSlot.map((cls) => {
                                      const room = rooms.find(r => r.id === cls.roomId);
                                      
                                      return (
                                        <div 
                                          key={cls.id} 
                                          className="bg-campus-primary/10 border-l-4 border-campus-primary p-2 rounded text-sm mb-1"
                                        >
                                          <div className="font-medium">{cls.name}</div>
                                          <div className="text-xs text-gray-600">
                                            {cls.startTime} - {cls.endTime} | {room?.name}
                                          </div>
                                          <div className="text-xs text-gray-500 mt-1">
                                            {cls.instructor}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                <h2 className="text-xl font-semibold text-campus-primary mb-4">Classes by Day</h2>
                
                {classesByDay.map(({ day, classes }) => (
                  <Card key={day} className="mb-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{day}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {classes.length > 0 ? (
                        <div className="space-y-3">
                          {classes.map((cls) => {
                            const room = rooms.find(r => r.id === cls.roomId);
                            
                            return (
                              <div key={cls.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                                <div className="flex-shrink-0 w-20 bg-campus-primary text-white rounded p-2 text-center mr-4">
                                  <div className="text-xs">Time</div>
                                  <div className="font-medium">
                                    {cls.startTime} - {cls.endTime}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-medium">{cls.name}</h3>
                                    <Badge variant="outline">{cls.code}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{room?.name}, {room?.building}</p>
                                  <p className="text-xs text-gray-500 mt-1">{cls.instructor}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          No classes scheduled for {day}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                <div className="text-center mt-6 mb-4">
                  <Button variant="outline">Export as PDF</Button>
                </div>
              </div>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Timetable;