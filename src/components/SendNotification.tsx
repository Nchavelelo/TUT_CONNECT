
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SendNotification = () => {
  const [scope, setScope] = useState<"all" | "faculty" | "campus" | "course">("all");
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    // This would typically connect to your backend
    toast({
      title: "Notification Sent",
      description: `Sent to ${scope === "all" ? "all students" : `${scope}: ${target}`}`,
    });
    
    setMessage("");
    setTarget("");
  };

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
