import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const AdminMaintenance = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock data - Replace with Firebase fetch
  useEffect(() => {
    const mockRequests = [
      {
        id: 1,
        title: "Leaking Pipe",
        status: "pending",
        location: "Building A, Room 101",
        dateReported: "2025-05-01",
        priority: "high",
        description: "Water leakage from the ceiling.",
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        id: 2,
        title: "Broken Window",
        status: "in-progress",
        location: "Building B, Room 202",
        dateReported: "2025-05-02",
        priority: "medium",
        description: "Window cracked and needs replacement.",
        imageUrl: null
      }
    ];
    setAllRequests(mockRequests);
  }, []);

  const handleUpdateStatus = (requestId, newStatus) => {
    const updatedRequests = allRequests.map(req =>
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    setAllRequests(updatedRequests);

    // Optionally update DB here
    // updateRequestStatusInDb(requestId, newStatus);

    // Update selectedRequest for live update in dialog
    setSelectedRequest(prev => ({ ...prev, status: newStatus }));
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      <div className="flex-1">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="w-full max-w-full mx-auto">
            <h1 className="text-2xl font-bold text-campus-primary">Admin Maintenance Requests</h1>

            {allRequests.length === 0 ? (
              <div>No maintenance requests available.</div>
            ) : (
              allRequests.map((request) => (
                <Card key={request.id} className="my-4">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Badge className={`mr-2 ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {request.status}
                      </Badge>
                      {request.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-500">Location: {request.location}</p>
                    <p className="text-xs text-gray-500">Reported on: {request.dateReported}</p>
                    <p className="mt-2 text-sm text-gray-600">{request.description}</p>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" onClick={() => handleViewDetails(request)}>
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleUpdateStatus(request.id, 'resolved')}
                        className="bg-green-500 hover:bg-green-500 text-white"
                      >
                        Mark as Resolved
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>View the details of this maintenance request.</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 mt-2">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">{selectedRequest.title}</h3>
                <Badge className={`bg-yellow-100 text-yellow-800`}>
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
                <Badge variant="outline" className={`border-yellow-200 text-yellow-800`}>
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

export default AdminMaintenance;
