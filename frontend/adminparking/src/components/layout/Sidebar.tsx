
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Calendar, 
  CreditCard, 
  ParkingSquare, 
  BarChart2, 
  Settings, 
  Menu, 
  X
} from 'lucide-react';

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { path: '/', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5 mr-3" /> },
    { path: '/bookings', label: 'Manage Bookings', icon: <Calendar className="w-5 h-5 mr-3" /> },
    { path: '/payments', label: 'Manage Payments', icon: <CreditCard className="w-5 h-5 mr-3" /> },
    { path: '/slots', label: 'Manage Slots', icon: <ParkingSquare className="w-5 h-5 mr-3" /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart2 className="w-5 h-5 mr-3" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5 mr-3" /> },
  ];

  return (
    <>
      {/* Mobile Menu Button - only visible on small screens */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-md md:hidden"
        onClick={toggleMobileSidebar}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar text-sidebar-foreground flex flex-col fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 md:relative md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="p-4 border-b border-white/10">
          <h2 className="text-xl font-bold flex items-center">
            <ParkingSquare className="mr-2" /> Parking Admin
          </h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                    isActive 
                      ? "bg-white/20 font-medium" 
                      : "hover:bg-white/10"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center p-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs opacity-70">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
