import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { users } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserRound, Building, School, Users, BookOpen } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { toast } from "@/components/ui/use-toast";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const students = users.filter(user => user.role === "student");
  const lecturers = users.filter(user => user.role === "lecturer");
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.faculty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.campus?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredLecturers = lecturers.filter(lecturer => 
    lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lecturer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lecturer.faculty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lecturer.campus?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lecturer.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserBadgeColor = (role: string, status: string = "Active") => {
    if (status.toLowerCase() !== "active") {
      return "bg-gray-400";
    }
    
    switch (role) {
      case "student": return "bg-campus-secondary";
      case "lecturer": return "bg-campus-primary";
      default: return "bg-gray-500";
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    toast({
      title: "Search cleared",
      description: "Showing all users",
      duration: 2000,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={20} className="hidden md:block h-screen">
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={80}>
          <div className="flex flex-col h-full">
            <Navbar />
            
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="w-full max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-campus-primary">User Management</h1>
                    <p className="text-gray-600 text-lg">View and manage all users in the system</p>
                  </div>
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search users..." 
                      className="pl-9 pr-12 py-6 rounded-full border-gray-200 shadow-sm focus:border-campus-primary focus:ring-1 focus:ring-campus-primary transition-all" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button 
                        className="absolute right-3 top-2.5 text-xs text-gray-500 hover:text-gray-700"
                        onClick={handleClearSearch}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-gradient-to-br from-campus-secondary/20 to-campus-secondary/5">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-500">Total Students</p>
                        <p className="text-3xl font-bold text-campus-secondary">{students.length}</p>
                      </div>
                      <div className="h-12 w-12 bg-campus-secondary/20 flex items-center justify-center rounded-full">
                        <School className="h-6 w-6 text-campus-secondary" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-campus-primary/20 to-campus-primary/5">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-500">Total Lecturers</p>
                        <p className="text-3xl font-bold text-campus-primary">{lecturers.length}</p>
                      </div>
                      <div className="h-12 w-12 bg-campus-primary/20 flex items-center justify-center rounded-full">
                        <BookOpen className="h-6 w-6 text-campus-primary" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-gray-200 to-gray-100">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-500">Total Users</p>
                        <p className="text-3xl font-bold text-gray-700">{users.length}</p>
                      </div>
                      <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded-full">
                        <Users className="h-6 w-6 text-gray-700" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-sm border-gray-200">
                  <CardHeader className="bg-white border-b border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold text-gray-800">User Directory</CardTitle>
                    </div>
                    <CardDescription className="text-gray-500 mt-1">Search, filter and view all users</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="students" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-gray-100 p-0">
                        <TabsTrigger 
                          value="students" 
                          className="rounded-none py-3 data-[state=active]:border-b-2 data-[state=active]:border-campus-secondary data-[state=active]:text-campus-secondary"
                        >
                          <School className="mr-2 h-4 w-4" />
                          Students ({filteredStudents.length})
                        </TabsTrigger>
                        <TabsTrigger 
                          value="lecturers" 
                          className="rounded-none py-3 data-[state=active]:border-b-2 data-[state=active]:border-campus-primary data-[state=active]:text-campus-primary"
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Lecturers ({filteredLecturers.length})
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="students" className="p-0">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-50 hover:bg-gray-50">
                                <TableHead className="font-semibold">Profile</TableHead>
                                <TableHead className="font-semibold">Student Number</TableHead>
                                <TableHead className="font-semibold">Name</TableHead>
                                <TableHead className="font-semibold">Faculty</TableHead>
                                <TableHead className="font-semibold">Campus</TableHead>
                                <TableHead className="font-semibold">Course</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                  <TableRow 
                                    key={student.id}
                                    className="group hover:bg-gray-50/80 transition-colors"
                                  >
                                    <TableCell>
                                      <Avatar className="h-9 w-9 border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                                        <AvatarImage src={student.avatar} alt={student.name} />
                                        <AvatarFallback className="bg-campus-secondary text-white">
                                          {student.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium text-campus-secondary">{student.id}</TableCell>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>{student.faculty || "Not assigned"}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center">
                                        <Building className="mr-2 h-4 w-4 text-gray-500" />
                                        {student.campus || "Main Campus"}
                                      </div>
                                    </TableCell>
                                    <TableCell>{student.course || "Not assigned"}</TableCell>
                                    <TableCell>
                                      <Badge className={`${getUserBadgeColor(student.role, student.status)} px-2 py-0.5`}>
                                        {student.status || "Active"}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={7} className="h-32 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                      <Search className="h-8 w-8 mb-2 opacity-30" />
                                      <p className="text-lg font-medium">No students found</p>
                                      <p className="text-sm">Try adjusting your search criteria</p>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="lecturers" className="p-0">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-50 hover:bg-gray-50">
                                <TableHead className="font-semibold">Profile</TableHead>
                                <TableHead className="font-semibold">Staff ID</TableHead>
                                <TableHead className="font-semibold">Name</TableHead>
                                <TableHead className="font-semibold">Faculty</TableHead>
                                <TableHead className="font-semibold">Campus</TableHead>
                                <TableHead className="font-semibold">Department</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredLecturers.length > 0 ? (
                                filteredLecturers.map((lecturer) => (
                                  <TableRow 
                                    key={lecturer.id} 
                                    className="group hover:bg-gray-50/80 transition-colors"
                                  >
                                    <TableCell>
                                      <Avatar className="h-9 w-9 border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                                        <AvatarImage src={lecturer.avatar} alt={lecturer.name} />
                                        <AvatarFallback className="bg-campus-primary text-white">
                                          {lecturer.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium text-campus-primary">{lecturer.id}</TableCell>
                                    <TableCell className="font-medium">{lecturer.name}</TableCell>
                                    <TableCell>{lecturer.faculty || "Not assigned"}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center">
                                        <Building className="mr-2 h-4 w-4 text-gray-500" />
                                        {lecturer.campus || "Main Campus"}
                                      </div>
                                    </TableCell>
                                    <TableCell>{lecturer.department || "Not assigned"}</TableCell>
                                    <TableCell>
                                      <Badge className={`${getUserBadgeColor(lecturer.role, lecturer.status)} px-2 py-0.5`}>
                                        {lecturer.status || "Active"}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={7} className="h-32 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                      <Search className="h-8 w-8 mb-2 opacity-30" />
                                      <p className="text-lg font-medium">No lecturers found</p>
                                      <p className="text-sm">Try adjusting your search criteria</p>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default UserManagement;