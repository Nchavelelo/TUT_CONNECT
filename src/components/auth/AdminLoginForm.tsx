
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminLoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
}

const AdminLoginForm = ({ onSubmit, isLoading }: AdminLoginFormProps) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(adminEmail, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="adminEmail">Email</Label>
        <Input
          id="adminEmail"
          type="email"
          placeholder="admin@tut.ac.za"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="adminPassword">Password</Label>
        <Input
          id="adminPassword"
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

export default AdminLoginForm;
