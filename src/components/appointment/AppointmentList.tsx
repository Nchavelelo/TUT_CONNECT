import { useState } from "react";
import { AppointmentRequest, User } from "@/data/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Clock, Calendar, MessageSquare, User as UserIcon, Clock3 } from "lucide-react";

interface AppointmentListProps {
  appointments: AppointmentRequest[];
  lecturers: User[];
  onUpdateAppointment?: (id: string, status: 'approved' | 'rejected') => void;
}

const AppointmentList = ({ appointments, lecturers, onUpdateAppointment }: AppointmentListProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const getLecturerName = (lecturerId: string) => {
    const lecturer = lecturers.find(l => l.id === lecturerId);
    return lecturer ? lecturer.name : "Unknown Lecturer";
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return "bg-green-100 text-green-800";
      case 'rejected':
        return "bg-red-100 text-red-800";
      case 'pending':
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-3 w-3 mr-1" />;
      case 'rejected':
        return <X className="h-3 w-3 mr-1" />;
      case 'pending':
      default:
        return <Clock className="h-3 w-3 mr-1" />;
    }
  };

  const handleApprove = (appointmentId: string) => {
    if (onUpdateAppointment) {
      onUpdateAppointment(appointmentId, 'approved');
      toast({
        title: "Appointment Approved",
        description: "You have approved this appointment request.",
      });
    }
  };

  const handleReject = (appointmentId: string) => {
    if (onUpdateAppointment) {
      onUpdateAppointment(appointmentId, 'rejected');
      toast({
        title: "Appointment Rejected",
        description: "You have rejected this appointment request.",
      });
    }
  };
  
  if (appointments.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>
            {user?.role === 'lecturer' ? 'Student Appointment Requests' : 'Your Appointment Requests'}
          </CardTitle>
          <CardDescription>
            {user?.role === 'lecturer' 
              ? "You don't have any pending appointment requests" 
              : "You haven't made any appointment requests yet"
            }
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">
          {user?.role === 'lecturer' ? 'Student Appointment Requests' : 'Your Appointment Requests'}
        </CardTitle>
        <CardDescription>
          {user?.role === 'lecturer' 
            ? "Review and respond to student appointment requests" 
            : "Track the status of your appointment requests"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-blue-600" />
                  <h3 className="font-medium text-blue-600">{appointment.subject}</h3>
                </div>
                <Badge className={`${getStatusColor(appointment.status)} self-start sm:self-center`}>
                  {getStatusIcon(appointment.status)}
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Badge>
              </div>
              
              {user?.role === 'lecturer' ? (
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                  <span>From: {appointment.studentName || appointment.studentId}</span>
                </div>
              ) : (
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                  <span>With: {getLecturerName(appointment.lecturerId)}</span>
                </div>
              )}
              
              <div className="bg-gray-50 p-4 rounded-md mb-3 border border-gray-100">
                <p className="text-sm text-gray-700">
                  {appointment.description}
                </p>
                {appointment.notes && (
                  <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
                    <p className="text-sm italic text-gray-600">
                      <span className="font-medium">Note:</span> {appointment.notes}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Preferred: {appointment.preferredDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock3 className="h-3 w-3 mr-1" />
                    <span>Time: {appointment.preferredTime} ({appointment.duration} mins)</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  Requested on: {appointment.createdAt}
                </div>
              </div>
              
              {user?.role === 'lecturer' && appointment.status === 'pending' && onUpdateAppointment && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                    onClick={() => handleApprove(appointment.id)}
                  >
                    <Check className="h-4 w-4 mr-1" /> Approve Request
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    onClick={() => handleReject(appointment.id)}
                  >
                    <X className="h-4 w-4 mr-1" /> Decline Request
                  </Button>
                </div>
              )}

              {user?.role !== 'lecturer' && appointment.status === 'approved' && (
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <p className="text-xs text-green-600 flex items-center">
                    <Check className="h-3 w-3 mr-1" /> 
                    Appointment confirmed for {appointment.date} at {appointment.time}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;