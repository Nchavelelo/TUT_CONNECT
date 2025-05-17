
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, Building, GraduationCap, Bell } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface SendNotificationProps {
  isAdmin?: boolean;
}

const SendNotification = ({ isAdmin = false }: SendNotificationProps) => {
  const [scope, setScope] = useState<"all" | "faculty" | "campus" | "course">("all");
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [recipientType, setRecipientType] = useState<"all" | "students" | "staff">("all");
  const [urgent, setUrgent] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    // This would typically connect to your backend
    toast({
      title: "Notification Sent",
      description: `${urgent ? "URGENT: " : ""}${title} - Sent to ${
        recipientType !== "all" ? recipientType + " in " : ""
      }${scope === "all" ? "all campuses" : `${scope}: ${target}`}`,
    });
    
    // Reset form
    setMessage("");
    setTarget("");
    setTitle("");
    setUrgent(false);
  };

  // Different UI for admin vs lecturer
  if (isAdmin) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-campus-primary">
            <Bell className="h-5 w-5" /> 
            Send Notification
          </CardTitle>
          <CardDescription>
            Send notifications to specific groups across the institution
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="audience" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="audience" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Audience
              </TabsTrigger>
              <TabsTrigger value="message" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Message
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="audience" className="space-y-4 pt-4">
              <div>
                <Label className="text-base font-medium">Recipient Type</Label>
                <RadioGroup 
                  defaultValue="all" 
                  value={recipientType}
                  onValueChange={(value) => setRecipientType(value as "all" | "students" | "staff")}
                  className="flex flex-wrap gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-recipients" />
                    <Label htmlFor="all-recipients">Everyone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="students" id="students-only" />
                    <Label htmlFor="students-only">Students Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="staff" id="staff-only" />
                    <Label htmlFor="staff-only">Staff Only</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base font-medium">Target Scope</Label>
                <RadioGroup 
                  value={scope} 
                  onValueChange={(value) => setScope(value as "all" | "faculty" | "campus" | "course")}
                  className="grid gap-4 grid-cols-2 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-scope" />
                    <Label htmlFor="all-scope" className="flex items-center gap-2">
                      <Users size={16} />
                      All Campuses
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="campus" id="campus-scope" />
                    <Label htmlFor="campus-scope" className="flex items-center gap-2">
                      <Building size={16} />
                      Specific Campus
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="faculty" id="faculty-scope" />
                    <Label htmlFor="faculty-scope" className="flex items-center gap-2">
                      <GraduationCap size={16} />
                      Faculty
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="course" id="course-scope" />
                    <Label htmlFor="course-scope" className="flex items-center gap-2">
                      <GraduationCap size={16} />
                      Course
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {scope !== "all" && (
                <div className="space-y-2 pt-2">
                  <Label htmlFor="target">Select {scope}:</Label>
                  <Select onValueChange={setTarget} value={target}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${scope}...`} />
                    </SelectTrigger>
                    <SelectContent>
                      {scope === "faculty" && (
                        <>
                          <SelectItem value="ict">ICT</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="business">Business & Economics</SelectItem>
                          <SelectItem value="humanities">Humanities</SelectItem>
                        </>
                      )}
                      {scope === "campus" && (
                        <>
                          <SelectItem value="pretoria">Pretoria</SelectItem>
                          <SelectItem value="soshanguve">Soshanguve</SelectItem>
                          <SelectItem value="arcadia">Arcadia</SelectItem>
                          <SelectItem value="emalahleni">eMalahleni</SelectItem>
                          <SelectItem value="polokwane">Polokwane</SelectItem>
                        </>
                      )}
                      {scope === "course" && (
                        <>
                          <SelectItem value="software-dev">Software Development</SelectItem>
                          <SelectItem value="networking">Networking</SelectItem>
                          <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="ai">Artificial Intelligence</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="message" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Notification Title:</Label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter notification title..."
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Notification Message:</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your notification message..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="urgent" 
                  checked={urgent}
                  onCheckedChange={(checked) => setUrgent(checked === true)} 
                />
                <Label htmlFor="urgent">Mark as urgent</Label>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleSend}
            disabled={(!message || !title) || (scope !== "all" && !target)}
            className="w-full"
          >
            Send Notification
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Simpler UI for lecturers
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-campus-primary">Send Notification</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Send to:</Label>
          <RadioGroup 
            defaultValue="all" 
            onValueChange={(value) => setScope(value as "all" | "faculty" | "campus" | "course")}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Students</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="faculty" id="faculty" />
              <Label htmlFor="faculty">Faculty</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="campus" id="campus" />
              <Label htmlFor="campus">Campus</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="course" id="course" />
              <Label htmlFor="course">Course</Label>
            </div>
          </RadioGroup>
        </div>

        {scope !== "all" && (
          <div className="space-y-2">
            <Label htmlFor="target">Select {scope}:</Label>
            <Select onValueChange={setTarget} value={target}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${scope}...`} />
              </SelectTrigger>
              <SelectContent>
                {scope === "faculty" && (
                  <>
                    <SelectItem value="ict">ICT</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                  </>
                )}
                {scope === "campus" && (
                  <>
                    <SelectItem value="pretoria">Pretoria</SelectItem>
                    <SelectItem value="soshanguve">Soshanguve</SelectItem>
                    <SelectItem value="arcadia">Arcadia</SelectItem>
                  </>
                )}
                {scope === "course" && (
                  <>
                    <SelectItem value="software-dev">Software Development</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="message">Notification Message:</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your notification message..."
            className="min-h-[100px]"
          />
        </div>

        <Button 
          onClick={handleSend}
          disabled={(!message) || (scope !== "all" && !target)}
          className="w-full"
        >
          Send Notification
        </Button>
      </div>
    </div>
  );
};

export default SendNotification;
