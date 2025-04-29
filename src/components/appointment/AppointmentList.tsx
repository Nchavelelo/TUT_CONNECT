import { AppointmentRequest, User } from "@/data/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";

interface AppointmentListProps {
  appointments: AppointmentRequest[];
  lecturers: User[];
}

const AppointmentList = ({ appointments, lecturers }: AppointmentListProps) => {
  const { user } = useAuth();
  
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
  
  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Appointment Requests</CardTitle>
          <CardDescription>
            You haven't made any appointment requests yet
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Appointment Requests</CardTitle>
        <CardDescription>
          Track the status of your appointment requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{appointment.subject}</h3>
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                With: {getLecturerName(appointment.lecturerId)}
              </p>
              
              <p className="text-sm text-gray-500 mb-3">
                {appointment.description}
              </p>
              
              <div className="flex justify-between text-xs text-gray-500">
                <p>
                  Preferred: {appointment.preferredDate} at {appointment.preferredTime}
                </p>
                <p>Requested on: {appointment.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;