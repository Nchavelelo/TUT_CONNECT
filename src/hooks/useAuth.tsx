import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, users, UserRole } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem("tutConnectUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check if password matches default
    if (password !== "12345") {
      toast({
        title: "Login Failed",
        description: "Invalid password. Hint: Try '12345'",
        variant: "destructive",
      });
      return false;
    }
    
    // Normalize email to lowercase for case-insensitive comparison
    const normalizedEmail = email.toLowerCase();
    
    // For student emails, extract student number
    const studentNumberMatch = normalizedEmail.match(/^(\d{9})@tut4life\.ac\.za$/i);
    const staffNumberMatch = normalizedEmail.match(/^(\d+)@tut\.ac\.za$/i);
    
    // Try to find user by email or extract student/staff number
    let foundUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    // If not found directly, check for student/staff number
    if (!foundUser && studentNumberMatch) {
      const studentNumber = studentNumberMatch[1];
      foundUser = users.find((u) => 
        u.role === "student" && u.email.toLowerCase().includes(studentNumber)
      );
    } else if (!foundUser && staffNumberMatch) {
      const staffNumber = staffNumberMatch[1];
      foundUser = users.find((u) => 
        u.role === "lecturer" && u.email.toLowerCase().includes(staffNumber)
      );
    }
    
    // If we still don't have a user but have a pattern that looks like a student number without the email part
    const studentNumberDirectMatch = normalizedEmail.match(/^(\d{9})$/);
    if (!foundUser && studentNumberDirectMatch) {
      const studentNumber = studentNumberDirectMatch[1];
      foundUser = users.find((u) => 
        u.role === "student" && u.email.toLowerCase().includes(studentNumber)
      );
    }
    
    // For demo login purposes
    if (normalizedEmail === "231967941@tut4life.ac.za") {
      foundUser = users.find(u => u.role === "student");
    } else if (normalizedEmail === "12345678@tut.ac.za") {
      foundUser = users.find(u => u.role === "lecturer");
    } else if (normalizedEmail === "admin@tut.ac.za") {
      foundUser = users.find(u => u.role === "admin");
    }
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("tutConnectUser", JSON.stringify(foundUser));
      toast({
        title: "Login Successful",
        description: `Welcome to TUT Connect, ${foundUser.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or student number",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tutConnectUser");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
