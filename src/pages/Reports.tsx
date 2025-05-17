
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { rooms, bookings, maintenanceRequests, users } from "@/data/mockData";
import { 
  ChevronDown, 
  ChevronUp,
  BarChart3, 
  PieChart, 
  LineChart,
  FileDown,
  FileText,
  Calendar
} from 'lucide-react';

import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

const Reports = () => {
  const [timeRange, setTimeRange] = useState("weekly");

  // Calculate room utilization by faculty
  const roomsByFaculty = rooms.reduce((acc, room) => {
    const faculty = room.faculty || "Other";
    if (!acc[faculty]) acc[faculty] = 0;
    acc[faculty]++;
    return acc;
  }, {} as Record<string, number>);

  const roomUtilizationData = Object.entries(roomsByFaculty).map(([name, value]) => ({
    name,
    value
  }));

  // Booking status distribution
  const bookingStatusData = bookings.reduce((acc, booking) => {
    const status = booking.status;
    if (!acc[status]) acc[status] = 0;
    acc[status]++;
    return acc;
  }, {} as Record<string, number>);

  const bookingStatusChartData = Object.entries(bookingStatusData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  // User role distribution
  const userRoleData = users.reduce((acc, user) => {
    const role = user.role;
    if (!acc[role]) acc[role] = 0;
    acc[role]++;
    return acc;
  }, {} as Record<string, number>);

  const userRoleChartData = Object.entries(userRoleData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  // Bookings by day of week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const bookingsByDay = daysOfWeek.map(day => {
    return {
      name: day,
      bookings: bookings.filter(booking => booking.day === day.toLowerCase()).length
    };
  });

  // Random maintenance over time data (for demonstration)
  const maintenanceOverTime = [
    { month: "Jan", requests: 12, resolved: 10 },
    { month: "Feb", requests: 18, resolved: 15 },
    { month: "Mar", requests: 14, resolved: 12 },
    { month: "Apr", requests: 20, resolved: 16 },
    { month: "May", requests: 25, resolved: 20 },
    { month: "Jun", requests: 18, resolved: 17 }
  ];

  // Colors for charts
  const COLORS = ["#463AA1", "#C94277", "#3A7CA5", "#2E8B57", "#D96941", "#9B5DE5", "#F15BB5"];
  
  // Handle report download (mock function)
  const handleDownloadReport = (reportType: string) => {
    console.log(`Downloading ${reportType} report`);
    // In a real app, this would generate and download a PDF/Excel file
    alert(`${reportType} report download started`);
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-campus-primary">Reports & Analytics</h1>
                    <p className="text-gray-600">Download reports and view analytics data</p>
                  </div>
                  <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full sm:w-auto">
                    <TabsList>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Reports Download Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Available Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-white border-2 border-campus-primary/20 hover:border-campus-primary transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-8 w-8 text-campus-primary mr-3" />
                              <div>
                                <h3 className="font-medium">User Activity Report</h3>
                                <p className="text-sm text-gray-500">Login stats and user engagement</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-2"
                              onClick={() => handleDownloadReport("User Activity")}
                            >
                              <FileDown className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white border-2 border-campus-primary/20 hover:border-campus-primary transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <BarChart3 className="h-8 w-8 text-campus-primary mr-3" />
                              <div>
                                <h3 className="font-medium">Room Utilization Report</h3>
                                <p className="text-sm text-gray-500">Booking stats for rooms and facilities</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-2"
                              onClick={() => handleDownloadReport("Room Utilization")}
                            >
                              <FileDown className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white border-2 border-campus-primary/20 hover:border-campus-primary transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Calendar className="h-8 w-8 text-campus-primary mr-3" />
                              <div>
                                <h3 className="font-medium">Appointment Summary</h3>
                                <p className="text-sm text-gray-500">Student-lecturer appointment stats</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-2"
                              onClick={() => handleDownloadReport("Appointment Summary")}
                            >
                              <FileDown className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Analytics Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                      <CardTitle className="text-lg">Room Utilization by Faculty</CardTitle>
                      <PieChart className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <AspectRatio ratio={16/9} className="bg-white">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={roomUtilizationData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {roomUtilizationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </AspectRatio>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                      <CardTitle className="text-lg">Booking Status Distribution</CardTitle>
                      <PieChart className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <AspectRatio ratio={16/9} className="bg-white">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={bookingStatusChartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {bookingStatusChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </AspectRatio>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                      <CardTitle className="text-lg">Bookings by Day of Week</CardTitle>
                      <BarChart3 className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <AspectRatio ratio={16/9} className="bg-white">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={bookingsByDay}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="bookings" fill="#463AA1" />
                          </BarChart>
                        </ResponsiveContainer>
                      </AspectRatio>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                      <CardTitle className="text-lg">User Role Distribution</CardTitle>
                      <PieChart className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <AspectRatio ratio={16/9} className="bg-white">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={userRoleChartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {userRoleChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </AspectRatio>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                      <CardTitle className="text-lg">Maintenance Requests Over Time</CardTitle>
                      <LineChart className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <AspectRatio ratio={21/9} className="bg-white">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart data={maintenanceOverTime}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="requests" stroke="#463AA1" strokeWidth={2} />
                            <Line type="monotone" dataKey="resolved" stroke="#2E8B57" strokeWidth={2} />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </AspectRatio>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

// Custom tooltip component for PieChart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-sm">
        <p className="font-medium">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default Reports;
