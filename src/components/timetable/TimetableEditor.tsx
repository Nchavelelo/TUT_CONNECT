
import { useState } from 'react';
import { classes, rooms } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const TimetableEditor = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [editingClass, setEditingClass] = useState<any>(null);
  const [classList, setClassList] = useState([...classes]);
  const { toast } = useToast();
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  
  const filteredClasses = classList.filter(cls => cls.day === selectedDay);
  
  const handleEdit = (cls: any) => {
    setEditingClass({
      ...cls,
      roomId: String(cls.roomId)
    });
  };
  
  const handleDelete = (id: string) => {
    setClassList(classList.filter(cls => cls.id !== id));
    toast({
      title: "Class removed",
      description: "The class has been removed from the timetable.",
    });
  };
  
  const handleChange = (field: string, value: string) => {
    setEditingClass(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSave = () => {
    if (!editingClass) return;
    
    // Check for overlapping classes
    const startTime = editingClass.startTime;
    const endTime = editingClass.endTime;
    const roomId = Number(editingClass.roomId);
    const day = editingClass.day;
    
    const overlapping = classList.some(cls => 
      cls.id !== editingClass.id &&
      cls.day === day &&
      // Fix: Convert cls.roomId to Number for comparison with roomId
      Number(cls.roomId) === roomId &&
      ((cls.startTime <= startTime && cls.endTime > startTime) ||
       (cls.startTime < endTime && cls.endTime >= endTime) ||
       (cls.startTime >= startTime && cls.endTime <= endTime))
    );
    
    if (overlapping) {
      toast({
        title: "Time conflict",
        description: "This room is already booked during this time period.",
        variant: "destructive"
      });
      return;
    }
    
    if (editingClass.id) {
      // Update existing class
      setClassList(prevList => 
        prevList.map(cls => cls.id === editingClass.id ? {...editingClass, roomId: Number(editingClass.roomId)} : cls)
      );
      toast({
        title: "Class updated",
        description: "The class has been updated in the timetable.",
      });
    } else {
      // Add new class
      const newClass = {
        ...editingClass,
        id: `class-${Date.now()}`,
        roomId: Number(editingClass.roomId)
      };
      setClassList(prevList => [...prevList, newClass]);
      toast({
        title: "Class added",
        description: "A new class has been added to the timetable.",
      });
    }
    
    setEditingClass(null);
  };
  
  const handleAddNew = () => {
    setEditingClass({
      id: "",
      name: "",
      code: "",
      instructor: "",
      day: selectedDay,
      startTime: "08:00",
      endTime: "10:00",
      roomId: "1"
    });
  };
  
  const handleCancel = () => {
    setEditingClass(null);
  };
  
  const handleSaveAll = () => {
    // Here you would implement the logic to save all changes to your backend
    toast({
      title: "Changes saved",
      description: "All timetable changes have been saved.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <CardTitle>Edit Timetable</CardTitle>
            <div className="flex gap-2 mt-2 md:mt-0">
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map(day => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleAddNew}>
                <Plus className="mr-1 h-4 w-4" />
                Add Class
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="hidden md:table-cell">Code</TableHead>
                <TableHead className="hidden md:table-cell">Instructor</TableHead>
                <TableHead className="hidden md:table-cell">Room</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.length > 0 ? (
                filteredClasses.map(cls => {
                  const room = rooms.find(r => r.id === cls.roomId);
                  return (
                    <TableRow key={cls.id}>
                      <TableCell>
                        <div className="font-medium">{cls.startTime} - {cls.endTime}</div>
                      </TableCell>
                      <TableCell>
                        <div>{cls.name}</div>
                        <div className="md:hidden text-xs text-gray-500">{cls.code}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{cls.code}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{cls.instructor}</TableCell>
                      <TableCell className="hidden md:table-cell">{room?.name}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(cls)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(cls.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No classes scheduled for {selectedDay}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="bg-gray-50 flex justify-end gap-2">
          <Button variant="default" onClick={handleSaveAll}>
            Save All Changes
          </Button>
        </CardFooter>
      </Card>

      {editingClass && (
        <Card>
          <CardHeader>
            <CardTitle>{editingClass.id ? 'Edit Class' : 'Add New Class'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Class Name</Label>
                <Input
                  id="name"
                  value={editingClass.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Class name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Class Code</Label>
                <Input
                  id="code"
                  value={editingClass.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  placeholder="e.g. CS101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={editingClass.instructor}
                  onChange={(e) => handleChange('instructor', e.target.value)}
                  placeholder="Instructor name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="day">Day</Label>
                <Select
                  value={editingClass.day}
                  onValueChange={(value) => handleChange('day', value)}
                >
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Select
                  value={editingClass.startTime}
                  onValueChange={(value) => handleChange('startTime', value)}
                >
                  <SelectTrigger id="startTime">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={`start-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Select
                  value={editingClass.endTime}
                  onValueChange={(value) => handleChange('endTime', value)}
                >
                  <SelectTrigger id="endTime">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={`end-${time}`} value={time} disabled={time <= editingClass.startTime}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Select
                  value={editingClass.roomId}
                  onValueChange={(value) => handleChange('roomId', value)}
                >
                  <SelectTrigger id="room">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(room => (
                      <SelectItem key={room.id} value={String(room.id)}>
                        {room.name} ({room.building})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingClass.id ? 'Update Class' : 'Add Class'}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
