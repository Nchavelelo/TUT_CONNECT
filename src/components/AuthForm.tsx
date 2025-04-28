
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/data/mockData";
import StudentLoginForm from "./auth/StudentLoginForm";
import LecturerLoginForm from "./auth/LecturerLoginForm";
import AdminLoginForm from "./auth/AdminLoginForm";
import DemoLoginButtons from "./auth/DemoLoginButtons";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserRole>("student");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStudentLogin = async (studentNumber: string, password: string) => {
    setIsLoading(true);
    try {
      const loginEmail = `${studentNumber}@tut4life.ac.za`;
      const success = await login(loginEmail, password);
      if (success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLecturerLogin = async (staffNumber: string, password: string) => {
    setIsLoading(true);
    try {
      const loginEmail = `${staffNumber}@tut.ac.za`;
      const success = await login(loginEmail, password);
      if (success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: UserRole) => {
    setIsLoading(true);
    let demoEmail = "";
    
    switch (role) {
      case "student":
        demoEmail = "231967941@tut4life.ac.za";
        break;
      case "lecturer":
        demoEmail = "12345678@tut.ac.za";
        break;
      case "admin":
        demoEmail = "admin@tut.ac.za";
        break;
    }
    
    try {
      const success = await login(demoEmail, "password");
      if (success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Demo login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-campus-primary">Sign In to TUT Connect</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="student" onValueChange={(value) => setUserType(value as UserRole)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="lecturer">Lecturer</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent value="student" className="mt-4">
            <StudentLoginForm onSubmit={handleStudentLogin} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="lecturer" className="mt-4">
            <LecturerLoginForm onSubmit={handleLecturerLogin} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="admin" className="mt-4">
            <AdminLoginForm onSubmit={handleAdminLogin} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col">
        <DemoLoginButtons onDemoLogin={handleDemoLogin} isLoading={isLoading} />
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
