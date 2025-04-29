import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { appointmentRequests as initialAppointments, lecturers } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import AppointmentRequestForm from "@/components/appointment/AppointmentRequestForm";
import AppointmentList from "@/components/appointment/AppointmentList";

const Appointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Filter appointments to only show the current user's
  const userAppointments = appointments.filter(appointment => 
    appointment.studentId === user?.id || appointment.lecturerId === user?.id
  );
  
  const handleCreateAppointment = (newAppointment: any) => {
    const appointmentWithId = {
      ...newAppointment,
      id: `appt${appointments.length + 1}`,
      studentId: user?.id || '',
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setAppointments([...appointments, appointmentWithId]);
    
    toast({
      title: "Appointment request sent",
      description: "Your appointment request has been submitted successfully.",
    });
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
                  <h1 className="text-2xl font-bold text-campus-primary">Appointment Requests</h1>
                  <p className="text-gray-600">Request appointments with your lecturers</p>
                </div>
                
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <AppointmentRequestForm 
                      lecturers={lecturers}
                      onSubmit={handleCreateAppointment}
                    />
                  </div>
                  <div className="lg:col-span-8">
                    <AppointmentList 
                      appointments={userAppointments}
                      lecturers={lecturers}
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