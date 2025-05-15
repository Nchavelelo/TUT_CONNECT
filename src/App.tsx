import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RoomBooking from "./pages/RoomBooking";
import Timetable from "./pages/Timetable";
import Maintenance from "./pages/Maintenance";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import Reports from "./pages/Reports";
import Appointments from "./pages/Appointments";
import NotFound from "./pages/NotFound";

import RoomAllocations from "./pages/RoomAllocations";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Admin route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? 
          (user?.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />) : 
          <Index />
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          {user?.role === 'admin' ? <Navigate to="/admin" /> : <Dashboard />}
        </ProtectedRoute>
      } />
      <Route path="/room-booking" element={<ProtectedRoute><RoomBooking /></ProtectedRoute>} />
      <Route path="/timetable" element={<ProtectedRoute><Timetable /></ProtectedRoute>} />
      <Route path="/maintenance" element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
      <Route path="/reports" element={<AdminRoute><Reports /></AdminRoute>} />
      <Route path="/room-allocations" element={<AdminRoute><RoomAllocations /></AdminRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

document.title = "TUT Connect";

export default App;