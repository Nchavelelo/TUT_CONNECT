
import { Button } from "@/components/ui/button";
import { UserRole } from "@/data/mockData";

interface DemoLoginButtonsProps {
  onDemoLogin: (role: UserRole) => void;
  isLoading: boolean;
}

const DemoLoginButtons = ({ onDemoLogin, isLoading }: DemoLoginButtonsProps) => {
  return (
    <>
      <div className="relative w-full mb-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with demo accounts
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full">
        <Button 
          variant="outline" 
          onClick={() => onDemoLogin("student")} 
          disabled={isLoading}
          className="bg-campus-gray hover:bg-gray-200"
        >
          Student
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onDemoLogin("lecturer")} 
          disabled={isLoading}
          className="bg-campus-gray hover:bg-gray-200"
        >
          Lecturer
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onDemoLogin("admin")} 
          disabled={isLoading}
          className="bg-campus-gray hover:bg-gray-200"
        >
          Admin
        </Button>
      </div>
    </>
  );
};

export default DemoLoginButtons;
