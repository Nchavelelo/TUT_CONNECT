
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StudentLoginFormProps {
  onSubmit: (studentNumber: string, password: string) => void;
  isLoading: boolean;
}

const StudentLoginForm = ({ onSubmit, isLoading }: StudentLoginFormProps) => {
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleStudentNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emailMatch = value.match(/^(\d{9})@tut4life\.ac\.za$/i);
    if (emailMatch) {
      setStudentNumber(emailMatch[1]);
    } else {
      setStudentNumber(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(studentNumber, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="studentNumber">Student Number or Email</Label>
        <Input
          id="studentNumber"
          placeholder="e.g. 231967941 or 231967941@tut4life.ac.za"
          value={studentNumber}
          onChange={handleStudentNumberChange}
          required
          pattern="(\d{9}|(\d{9})@tut4life\.ac\.za)"
          title="Please enter a valid 9-digit student number or complete email"
        />
        <p className="text-xs text-muted-foreground">
          Your email will be: {studentNumber ? `${studentNumber}@tut4life.ac.za` : "xxxxxxxxx@tut4life.ac.za"}
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
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

export default StudentLoginForm;
