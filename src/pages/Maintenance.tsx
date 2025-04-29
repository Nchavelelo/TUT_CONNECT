import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MaintenanceForm from "@/components/MaintenanceForm";
import { maintenanceRequests } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Maintenance = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("report");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  if (!user) return null;
  
  const userRequests = maintenanceRequests.filter(
    (request) => request.reporterId === user.id
  );
  
  const pendingRequests = userRequests.filter((r) => r.status === "pending");
  const inProgressRequests = userRequests.filter((r) => r.status === "in-progress");
  const resolvedRequests = userRequests.filter((r) => r.status === "resolved");
  
  const handleSubmitSuccess = () => {
    setFormSubmitted(true);
    setActiveTab("my-requests");
  };
  
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };
  
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
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-campus-primary">Maintenance Requests</h1>
                  <p className="text-gray-600">Report and track maintenance issues on campus</p>
                </div>
                
                <Tabs 
                  value={activeTab} 
                  onValueChange={setActiveTab} 
                  className="mb-6"
                >
                  <TabsList className="w-full md:w-auto grid grid-cols-2">
                    <TabsTrigger value="report">Report an Issue</TabsTrigger>
                    <TabsTrigger value="my-requests">My Requests</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="report" className="mt-6">
                    {formSubmitted ? (
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center py-8">
                            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">Request Submitted Successfully</h3>
                            <p className="text-gray-600 mb-4">
                              Your maintenance request has been submitted and will be processed shortly.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                              <Button 
                                variant="outline"
                                onClick={() => {
                                  setFormSubmitted(false);
                                }}
                              >
                                Submit Another Request
                              </Button>
                              <Button 
                                onClick={() => setActiveTab("my-requests")}
                                className="bg-campus-primary hover:bg-campus-secondary"
                              >
                                View My Requests
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <MaintenanceForm onSubmit={handleSubmitSuccess} />
                    )}
                  </TabsContent>
                  
                  <TabsContent value="my-requests" className="mt-6">
                    {userRequests.length > 0 ? (
                      <div className="space-y-8">
                        {pendingRequests.length > 0 && (
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="flex items-center text-lg text-campus-primary">
                                <Clock className="mr-2" size={18} />
                                Pending Requests
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {pendingRequests.map((request) => (
                                  <div key={request.id} className="p-3 border rounded-md">
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-medium">{request.title}</h4>
                                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                        {request.status}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Reported on {request.dateReported}</p>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{request.description}</p>
                                    <div className="flex justify-between items-center mt-2">
                                      <p className="text-xs text-gray-500">{request.location}</p>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleViewDetails(request)}
                                      >
                                        View Details
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {inProgressRequests.length > 0 && (
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="flex items-center text-lg text-campus-primary">
                                <AlertCircle className="mr-2" size={18} />
                                In Progress
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {inProgressRequests.map((request) => (
                                  <div key={request.id} className="p-3 border rounded-md">
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-medium">{request.title}</h4>
                                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                        {request.status}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Reported on {request.dateReported}</p>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{request.description}</p>
                                    <div className="flex justify-between items-center mt-2">
                                      <p className="text-xs text-gray-500">{request.location}</p>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => handleViewDetails(request)}
                                      >
                                        View Details
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {resolvedRequests.length > 0 && (
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="flex items-center text-lg text-campus-primary">
                                <CheckCircle className="mr-2" size={18} />
                                Resolved
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {resolvedRequests.map((request) => (
                                  <div key={request.id} className="p-3 border rounded-md">
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-medium">{request.title}</h4>
                                      <Badge className="bg-green-100 text-green-800 border-green-200">
                                        {request.status}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Reported on {request.dateReported}</p>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{request.description}</p>
                                    <div className="flex justify-between items-center mt-2">
                                      <p className="text-xs text-gray-500">{request.location}</p>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => handleViewDetails(request)}
                                      >
                                        View Details
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center py-8">
                            <h3 className="text-lg font-medium mb-2">No Maintenance Requests</h3>
                            <p className="text-gray-500 mb-4">
                              You haven't submitted any maintenance requests yet.
                            </p>
                            <Button 
                              onClick={() => setActiveTab("report")}
                              className="bg-campus-primary hover:bg-campus-secondary"
                            >
                              Report an Issue
                            </Button>
                          </div>
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
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              View the details of your maintenance request
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 mt-2">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">{selectedRequest.title}</h3>
                <Badge className={`
                  ${selectedRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    selectedRequest.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-green-100 text-green-800'}
                `}>
                  {selectedRequest.status}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p>{selectedRequest.location}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Date Reported</p>
                <p>{selectedRequest.dateReported}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <Badge variant="outline" className={`
                  ${selectedRequest.priority === 'high' ? 'border-red-200 text-red-800' : 
                    selectedRequest.priority === 'medium' ? 'border-yellow-200 text-yellow-800' : 
                    'border-green-200 text-green-800'}
                `}>
                  {selectedRequest.priority}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="mt-1 text-gray-700">{selectedRequest.description}</p>
              </div>
              
              {selectedRequest.imageUrl && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Image</p>
                  <img 
                    src={selectedRequest.imageUrl} 
                    alt="Maintenance issue" 
                    className="w-full h-auto rounded-md"
                  />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Maintenance;