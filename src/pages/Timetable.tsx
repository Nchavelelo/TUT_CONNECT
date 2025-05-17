
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { classes, rooms } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { TimetableEditor } from "@/components/timetable/TimetableEditor";
import { FileUploader } from "@/components/timetable/FileUploader";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Class } from "@/data/types";

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("view");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  
  const days = ["all", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const courses = ["all", "Computer Science", "Engineering", "Business Administration", "Medicine", "Law"];
  
  // Filter classes based on selected day and search query
  const filteredClasses = classes.filter(cls => {
    const dayMatch = selectedDay === "all" || cls.day === selectedDay;
    const searchMatch = searchQuery === "" || 
                        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        cls.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        cls.code.toLowerCase().includes(searchQuery.toLowerCase());
    const courseMatch = filterCourse === "all" || cls.code.startsWith(filterCourse.substring(0, 2));
    
    return dayMatch && searchMatch && courseMatch;
  });
  
  const classesByDay = days.slice(1).map(day => ({
    day,
    classes: filteredClasses.filter(cls => cls.day === day)
  }));
  
  const handleExportPDF = () => {
    toast({
      title: "Export initiated",
      description: "Your timetable is being exported as PDF.",
    });
    // PDF export logic would go here
  };

  // Student timetable view component - extracted to clean up the code
  const StudentTimetableView = () => (
    <>
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-4">
        <div className="w-full md:w-48">
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
        <div className="w-full md:w-auto">
          <Input
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64"
          />
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
                      const classesInTimeSlot = filteredClasses.filter(
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
    </>
  );
  
  // Admin timetable view component with more advanced filtering
  const AdminTimetableView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="day-filter" className="text-sm font-medium mb-1 block">Day</Label>
          <Select
            value={selectedDay}
            onValueChange={setSelectedDay}
          >
            <SelectTrigger id="day-filter">
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
        <div>
          <Label htmlFor="course-filter" className="text-sm font-medium mb-1 block">Course</Label>
          <Select
            value={filterCourse}
            onValueChange={setFilterCourse}
          >
            <SelectTrigger id="course-filter">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="search-classes" className="text-sm font-medium mb-1 block">Search</Label>
          <Input
            id="search-classes"
            placeholder="Search by class name, instructor, code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="bg-campus-primary text-white flex flex-row justify-between items-center">
          <CardTitle className="text-lg">Master Timetable</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="bg-white text-campus-primary hover:bg-gray-100">
              Print View
            </Button>
            <Button variant="outline" size="sm" className="bg-white text-campus-primary hover:bg-gray-100" onClick={handleExportPDF}>
              Export PDF
            </Button>
          </div>
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
                {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((timeSlot) => (
                  <tr key={timeSlot} className="border-t">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {timeSlot}
                    </td>
                    {days.slice(1).map((day) => {
                      const classesInTimeSlot = filteredClasses.filter(
                        (cls) => 
                          cls.day === day && 
                          cls.startTime === timeSlot
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
                                <div className="flex justify-between items-center">
                                  <div className="text-xs text-gray-600">
                                    {cls.startTime} - {cls.endTime}
                                  </div>
                                  <Badge variant="outline" className="ml-2">{cls.code}</Badge>
                                </div>
                                <div className="text-xs flex justify-between mt-1">
                                  <span className="text-gray-500">{cls.instructor}</span>
                                  <span className="text-gray-600 font-medium">{room?.name}</span>
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
    </>
  );
  
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
                    <h1 className="text-2xl font-bold text-campus-primary">
                      {user?.role === 'admin' ? 'Timetable Management' : 'Class Timetable'}
                    </h1>
                    <p className="text-gray-600">
                      {user?.role === 'admin' 
                        ? 'Manage and edit timetables for all courses' 
                        : 'View your weekly class schedule'}
                    </p>
                  </div>
                  
                  {user?.role === 'admin' ? (
                    <Tabs 
                      value={activeTab} 
                      onValueChange={setActiveTab}
                      className="mt-4 md:mt-0"
                    >
                      <TabsList>
                        <TabsTrigger value="view">View Timetable</TabsTrigger>
                        <TabsTrigger value="edit">Edit Timetable</TabsTrigger>
                        <TabsTrigger value="upload">Upload PDFs</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  ) : null}
                </div>
                
                {user?.role === 'admin' ? (
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsContent value="view">
                      <AdminTimetableView />
                    </TabsContent>
                    
                    <TabsContent value="edit">
                      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded">
                        <h3 className="text-amber-800 font-medium">Timetable Editing Mode</h3>
                        <p className="text-sm text-amber-700">You can edit class details, add new classes, or remove existing ones.</p>
                      </div>
                      <TimetableEditor />
                    </TabsContent>
                    
                    <TabsContent value="upload">
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded">
                        <h3 className="text-blue-800 font-medium">Upload Timetable PDFs</h3>
                        <p className="text-sm text-blue-700">Upload PDF timetables for specific courses and campuses.</p>
                      </div>
                      <FileUploader />
                    </TabsContent>
                  </Tabs>
                ) : (
                  <StudentTimetableView />
                )}
                
                <div className="text-center mt-6 mb-4">
                  <Button variant="outline" onClick={handleExportPDF}>
                    {user?.role === 'admin' ? 'Generate Timetable PDF' : 'Export as PDF'}
                  </Button>
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
