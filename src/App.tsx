import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Manager from "./pages/Manager";
import Dashboard from "./pages/Dashboard";
import RoomBooking from "./pages/RoomBooking";
import Timetable from "./pages/Timetable";
import Notifications from "./pages/Notifications";
import Appointments from "./pages/Appointments";
import NotFound from "./pages/NotFound";
import UserManagement from "./pages/admin/UserManagement";
import Reports from "./pages/admin/Reports";
import RoomAllocations from "./pages/admin/RoomAllocations";
import SystemSettings from "./pages/admin/SystemSettings";
import Maintenance from "./pages/admin/MaintenanceAdmin";
import MaintenanceAdmin from "./pages/admin/MaintenanceAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import AdminNotifications from "./pages/admin/AdminNotifications";


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
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            user?.role === "admin" ? (
              <Navigate to="/admin/admin-dashboard" />
            ) : (
              <Navigate to="/notifications" />
            )
          ) : (
            <Index />
          )
        }
      />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/room-booking" element={<ProtectedRoute><RoomBooking /></ProtectedRoute>} />
      <Route path="/timetable" element={<ProtectedRoute><Timetable /></ProtectedRoute>} />
      <Route path="/maintenance" element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
      <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
      <Route path="/admin/reports" element={<AdminRoute><Reports /></AdminRoute>} />
      <Route path="/admin/admin-notifications" element={<AdminNotifications />} />
      <Route path="/admin/settings" element={<AdminRoute><SystemSettings /></AdminRoute>} />
      <Route path="/admin/rooms" element={<AdminRoute><RoomAllocations /></AdminRoute>} />
      <Route path="/admin/admin-maintenance" element={<AdminRoute><MaintenanceAdmin /></AdminRoute>} />
      <Route path="/admin/admin-dashboard" element={<AdminRoute><DashboardAdmin /></AdminRoute>} />
      <Route path="/manager" element={<AdminRoute><Manager /></AdminRoute>} />
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
          <Sonner />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

document.title = "TUT Connect";

export default App;