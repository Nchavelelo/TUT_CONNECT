
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LecturerLoginFormProps {
  onSubmit: (staffNumber: string, password: string) => void;
  isLoading: boolean;
}

const LecturerLoginForm = ({ onSubmit, isLoading }: LecturerLoginFormProps) => {
  const [staffNumber, setStaffNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(staffNumber, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="staffNumber">Staff Number</Label>
        <Input
          id="staffNumber"
          placeholder="e.g. 12345678"
          value={staffNumber}
          onChange={(e) => setStaffNumber(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          Your email will be: {staffNumber ? `${staffNumber}@tut.ac.za` : "xxxxxxxx@tut.ac.za"}
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lectPassword">Password</Label>
        <Input
          id="lectPassword"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-campus-primary hover:bg-campus-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LecturerLoginForm;
