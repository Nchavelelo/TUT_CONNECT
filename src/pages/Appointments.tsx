
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { appointments as initialAppointments } from "@/data/mock/appointments";
import { lecturers, users } from "@/data/mock/users";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import AppointmentRequestForm from "@/components/appointment/AppointmentRequestForm";
import AppointmentList from "@/components/appointment/AppointmentList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Appointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Filter appointments based on user role
  const userAppointments = appointments.filter(appointment => 
    user?.role === 'lecturer' 
      ? appointment.lecturerId === user?.id // For lecturers, show appointments where they are the lecturer
      : appointment.studentId === user?.id // For students, show their own appointments
  );
  
  // Further filter based on active tab (only for lecturers)
  const filteredAppointments = user?.role === 'lecturer' && activeTab === 'pending'
    ? userAppointments.filter(appt => appt.status === 'pending')
    : userAppointments;
  
  const handleCreateAppointment = (newAppointment: any) => {
    const appointmentWithId = {
      ...newAppointment,
      id: `appt${appointments.length + 1}`,
      studentId: user?.id || '',
      studentName: user?.name || '',
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      date: "",
      time: "",
    };
    
    setAppointments([...appointments, appointmentWithId]);
    
    toast({
      title: "Appointment request sent",
      description: "Your appointment request has been submitted successfully.",
    });
  };

  const handleUpdateAppointment = (id: string, status: 'approved' | 'rejected') => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { 
        ...appointment, 
        status,
        // If approved, set the date and time to the preferred ones
        ...(status === 'approved' ? { 
          date: appointment.preferredDate,
          time: appointment.preferredTime
        } : {})
      } : appointment
    ));
    
    // If lecturer is in pending view and approves/rejects all pending requests,
    // switch to "all" view to avoid showing an empty state
    if (activeTab === 'pending') {
      const remainingPending = appointments
        .filter(a => a.lecturerId === user?.id && a.id !== id && a.status === 'pending')
        .length;
      
      if (remainingPending === 0) {
        setActiveTab('all');
      }
    }
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
              <div className="w-full max-w-6xl mx-auto">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-blue-600">
                    {user?.role === 'lecturer' ? 'Manage Appointment Requests' : 'Request Appointments'}
                  </h1>
                  <p className="text-gray-600">
                    {user?.role === 'lecturer' 
                      ? 'Review and respond to student appointment requests' 
                      : 'Request appointments with your lecturers'
                    }
                  </p>
                </div>
                
                {/* Lecturer tabs to filter requests */}
                {user?.role === 'lecturer' && (
                  <Tabs 
                    value={activeTab} 
                    onValueChange={(value) => setActiveTab(value as 'pending' | 'all')}
                    className="mb-6"
                  >
                    <TabsList>
                      <TabsTrigger value="pending">Pending Requests</TabsTrigger>
                      <TabsTrigger value="all">All Requests</TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
                
                <div className={`grid gap-6 ${user?.role === 'lecturer' ? '' : 'grid-cols-1 lg:grid-cols-12'}`}>
                  {user?.role !== 'lecturer' && (
                    <div className="lg:col-span-4">
                      <AppointmentRequestForm 
                        lecturers={lecturers}
                        onSubmit={handleCreateAppointment}
                      />
                    </div>
                  )}
                  <div className={user?.role === 'lecturer' ? 'w-full' : 'lg:col-span-8'}>
                    <AppointmentList 
                      appointments={filteredAppointments}
                      lecturers={lecturers}
                      onUpdateAppointment={user?.role === 'lecturer' ? handleUpdateAppointment : undefined}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Appointments;