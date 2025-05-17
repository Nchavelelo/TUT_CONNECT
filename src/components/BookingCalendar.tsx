import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Room, bookings, Booking, classes, Class } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Users } from "lucide-react";

interface BookingCalendarProps {
  room: Room | null;
  onClose: () => void;
}

const BookingCalendar = ({ room, onClose }: BookingCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("10:00");
  const [purpose, setPurpose] = useState<string>("");
  const [isClassBooking, setIsClassBooking] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const { user } = useAuth();
  const { toast } = useToast();
  
  if (!room || !user) return null;

  // Only show class booking option for lecturers
  const isLecturer = user.role === 'lecturer';
  
  // Get lecturer's classes
  const lecturerClasses = isLecturer 
    ? classes.filter(c => c.lecturer === user.name || c.instructor === user.name)
    : [];
  
  // Available time slots from 8 AM to 8 PM in 30 minute increments
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];
  
  // Function to check if a time slot is available
  const isTimeSlotBooked = (dateStr: string, start: string, end: string): boolean => {
    return bookings.some(booking => {
      return (
        booking.roomId === room.id &&
        booking.date === dateStr &&
        ((booking.startTime <= start && booking.endTime > start) ||
         (booking.startTime < end && booking.endTime >= end) ||
         (booking.startTime >= start && booking.endTime <= end))
      );
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date",
        variant: "destructive",
      });
      return;
    }
    
    if (startTime >= endTime) {
      toast({
        title: "Error",
        description: "End time must be after start time",
        variant: "destructive",
      });
      return;
    }
    
    const dateStr = date.toISOString().split("T")[0];
    
    if (isTimeSlotBooked(dateStr, startTime, endTime)) {
      toast({
        title: "Error",
        description: "This time slot is already booked",
        variant: "destructive",
      });
      return;
    }

    // Get purpose text based on booking type
    let finalPurpose = purpose;
    let selectedClassObj: Class | undefined;
    
    if (isLecturer && isClassBooking && selectedClass) {
      selectedClassObj = classes.find(c => c.id === selectedClass);
      if (selectedClassObj) {
        finalPurpose = `Class: ${selectedClassObj.name} (${selectedClassObj.code || selectedClassObj.courseCode})`;
        if (purpose) {
          finalPurpose += ` - ${purpose}`;
        }
      }
    }
    
    // In a real app, this would be an API call to create a booking
    const newBooking: Booking = {
      id: `booking${new Date().getTime()}`,
      roomId: room.id,
      userId: user.id,
      date: dateStr,
      startTime,
      endTime,
      purpose: finalPurpose,
      status: "pendingApproval",
      userRole: user.role as 'student' | 'lecturer'
    };
    
    console.log("Creating new booking:", newBooking);
    
    // Show success toast
    toast({
      title: "Booking Requested",
      description: `Your booking request for ${room.name} has been submitted and is pending approval.`,
    });
    
    onClose();
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Book {room.name}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        {room.building}, Floor {room.floor} • Capacity: {room.capacity} people
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Select Date</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Select 
              value={startTime} 
              onValueChange={setStartTime}
            >
              <SelectTrigger id="startTime">
                <SelectValue placeholder="Start Time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.slice(0, -1).map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Select 
              value={endTime} 
              onValueChange={setEndTime}
            >
              <SelectTrigger id="endTime">
                <SelectValue placeholder="End Time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.slice(1).map((time) => (
                  <SelectItem 
                    key={time} 
                    value={time}
                    disabled={time <= startTime}
                  >
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Class booking option for lecturers */}
        {isLecturer && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="isClassBooking" 
                checked={isClassBooking}
                onCheckedChange={(checked) => setIsClassBooking(checked as boolean)}
              />
              <Label htmlFor="isClassBooking" className="cursor-pointer flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Book for a class
              </Label>
            </div>
            
            {isClassBooking && (
              <div className="space-y-2 pl-6">
                <Label htmlFor="classSelect">Select Class</Label>
                <Select
                  value={selectedClass}
                  onValueChange={setSelectedClass}
                >
                  <SelectTrigger id="classSelect">
                    <SelectValue placeholder="Choose a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {lecturerClasses.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name} ({cls.code || cls.courseCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="purpose">
            {isLecturer && isClassBooking ? "Additional Notes (Optional)" : "Purpose of Booking"}
          </Label>
          <Textarea
            id="purpose"
            placeholder={isLecturer && isClassBooking 
              ? "Add any additional details about this class booking..." 
              : "Describe why you need this room..."
            }
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="h-24"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-campus-primary hover:bg-campus-secondary">
            Submit Booking
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingCalendar;