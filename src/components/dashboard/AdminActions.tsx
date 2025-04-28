
import { UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const AdminActions = () => {
  const adminActions = [
    {
      title: "User Management",
      icon: UserCog,
    },
    {
      title: "Reports",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 h-6 w-6">
          <path d="M22 2v20M2 10h20M2 18h20M2 2h20"/>
        </svg>
      ),
    },
    {
      title: "System Settings",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 h-6 w-6">
          <path d="M12 7V0"/>
          <path d="M21.5 12H0"/>
          <path d="M12 17v7"/>
          <path d="M3 12a9 9 0 0 0 18 0 9 9 0 0 0-18 0Z"/>
        </svg>
      ),
    },
    {
      title: "Room Allocations",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 h-6 w-6">
          <path d="M19 12h-5.5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H19v2.5a.5.5 0 0 1-.5.5H2"/>
          <path d="M2 12h5.5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2"/>
          <path d="M19 7v5"/>
          <path d="M2 7v5"/>
        </svg>
      ),
    },
  ];

  return (
    <Card className="mb-8 border-l-4 border-l-campus-primary bg-white">
      <CardHeader className="bg-campus-primary/5">
        <CardTitle className="text-lg text-campus-primary">Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {adminActions.map((action) => (
          <Button
            key={action.title}
            className="flex flex-col items-center justify-center h-24 bg-campus-primary hover:bg-campus-primary/90"
          >
            <action.icon />
            <span>{action.title}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
