
import React from 'react';
import Sidebar from './Sidebar';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system.",
    });
    // In a real app, you would handle actual logout logic here
  };

  return (
    <div className="main-grid">
      <Sidebar />
      <main className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm border-b p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>
        <div className="flex-1 p-6">
          {children}
        </div>
        <footer className="py-4 px-6 text-center text-sm text-slate-500 border-t">
          &copy; {new Date().getFullYear()} Parking Admin Dashboard
        </footer>
      </main>
    </div>
  );
};

export default DashboardLayout;
