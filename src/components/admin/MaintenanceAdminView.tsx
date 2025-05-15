
import { useState, useEffect } from "react";
import { maintenanceRequests as initialRequests } from "@/data/mockData";
import { MaintenanceRequest } from "@/data/types";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Wrench, Settings, Bell } from "lucide-react";

export const MaintenanceAdminView = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(initialRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [assignToStaff, setAssignToStaff] = useState("");
  const [assignmentNote, setAssignmentNote] = useState("");
  const { toast } = useToast();

  // Mock staff list - in a real app, this would come from the database
  const maintenanceStaff = [
    { id: "tech1", name: "John Tech" },
    { id: "tech2", name: "Sarah Repairs" },
    { id: "tech3", name: "Mike Fixer" },
    { id: "tech4", name: "Lisa Engineer" }
  ];

  const filteredRequests = maintenanceRequests.filter(request => {
    // Apply search filter
    const matchesSearch = 
      searchQuery === "" ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    // Apply priority filter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAssignStaff = () => {
    if (!selectedRequest || !assignToStaff) return;

    const updatedRequests = maintenanceRequests.map(request => {
      if (request.id === selectedRequest.id) {
        return {
          ...request,
          assignedTo: assignToStaff,
          assignedDate: new Date().toISOString().split('T')[0],
          status: 'in-progress' as const,
          notes: assignmentNote || request.notes
        };
      }
      return request;
    });

    setMaintenanceRequests(updatedRequests);
    
    const assignedStaff = maintenanceStaff.find(staff => staff.id === assignToStaff);
    
    toast({
      title: "Staff Assigned",
      description: `${assignedStaff?.name} has been assigned to this maintenance request.`,
    });

    setAssignToStaff("");
    setAssignmentNote("");
    setShowAssignDialog(false);
    setSelectedRequest(null);
  };

  const handleStatusChange = (requestId: string, newStatus: 'pending' | 'in-progress' | 'resolved') => {
    const updatedRequests = maintenanceRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: newStatus
        };
      }
      return request;
    });

    setMaintenanceRequests(updatedRequests);
    
    toast({
      title: "Status Updated",
      description: `Maintenance request status has been updated to ${newStatus}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">High</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const openAssignDialog = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setAssignToStaff(request.assignedTo || "");
    setAssignmentNote(request.notes || "");
    setShowAssignDialog(true);
  };

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all" className="flex items-center">
            <Wrench className="mr-2 h-4 w-4" />
            <span>All Requests</span>
          </TabsTrigger>
          <TabsTrigger value="unassigned" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            <span>Unassigned</span>
          </TabsTrigger>
          <TabsTrigger value="assigned" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>In Progress</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input 
              id="search"
              placeholder="Search by title, location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="status-filter">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority-filter">Priority</Label>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger id="priority-filter">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="all">
          <MaintenanceRequestsTable 
            requests={filteredRequests} 
            openAssignDialog={openAssignDialog}
            handleStatusChange={handleStatusChange}
            getStatusBadge={getStatusBadge}
            getPriorityBadge={getPriorityBadge}
            maintenanceStaff={maintenanceStaff}
          />
        </TabsContent>
        
        <TabsContent value="unassigned">
          <MaintenanceRequestsTable 
            requests={filteredRequests.filter(r => !r.assignedTo)} 
            openAssignDialog={openAssignDialog}
            handleStatusChange={handleStatusChange}
            getStatusBadge={getStatusBadge}
            getPriorityBadge={getPriorityBadge}
            maintenanceStaff={maintenanceStaff}
          />
        </TabsContent>
        
        <TabsContent value="assigned">
          <MaintenanceRequestsTable 
            requests={filteredRequests.filter(r => r.assignedTo && r.status !== 'resolved')} 
            openAssignDialog={openAssignDialog}
            handleStatusChange={handleStatusChange}
            getStatusBadge={getStatusBadge}
            getPriorityBadge={getPriorityBadge}
            maintenanceStaff={maintenanceStaff}
          />
        </TabsContent>
      </Tabs>
      
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Maintenance Request</DialogTitle>
            <DialogDescription>
              Assign this request to a maintenance staff member to resolve the issue.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <h3 className="font-medium">{selectedRequest.title}</h3>
                <p className="text-sm text-gray-500">{selectedRequest.location}</p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="staff-assign">Assign To</Label>
                <Select value={assignToStaff} onValueChange={setAssignToStaff}>
                  <SelectTrigger id="staff-assign">
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    {maintenanceStaff.map(staff => (
                      <SelectItem key={staff.id} value={staff.id}>{staff.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes for maintenance staff</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any special instructions or notes..."
                  value={assignmentNote}
                  onChange={(e) => setAssignmentNote(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>Cancel</Button>
            <Button onClick={handleAssignStaff} className="bg-campus-primary hover:bg-campus-secondary">
              Assign Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface MaintenanceRequestsTableProps {
  requests: MaintenanceRequest[];
  openAssignDialog: (request: MaintenanceRequest) => void;
  handleStatusChange: (requestId: string, status: 'pending' | 'in-progress' | 'resolved') => void;
  getStatusBadge: (status: string) => JSX.Element;
  getPriorityBadge: (priority: string) => JSX.Element;
  maintenanceStaff: { id: string; name: string }[];
}

const MaintenanceRequestsTable = ({
  requests,
  openAssignDialog,
  handleStatusChange,
  getStatusBadge,
  getPriorityBadge,
  maintenanceStaff
}: MaintenanceRequestsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Maintenance Requests ({requests.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No maintenance requests found matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date Reported</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map(request => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.title}</TableCell>
                    <TableCell>{request.location}</TableCell>
                    <TableCell>{request.dateReported}</TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      {request.assignedTo ? (
                        maintenanceStaff.find(staff => staff.id === request.assignedTo)?.name || 'Unknown'
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openAssignDialog(request)}
                        >
                          {request.assignedTo ? 'Reassign' : 'Assign'}
                        </Button>
                        
                        <Select 
                          value={request.status} 
                          onValueChange={(value) => handleStatusChange(request.id, value as 'pending' | 'in-progress' | 'resolved')}
                        >
                          <SelectTrigger className="h-8 w-[130px]">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Mark as Pending</SelectItem>
                            <SelectItem value="in-progress">Mark as In Progress</SelectItem>
                            <SelectItem value="resolved">Mark as Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
