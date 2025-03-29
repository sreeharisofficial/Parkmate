
import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 16V8" />
            </svg>
          </div>
          <span className="font-bold text-xl text-primary">ParkMate</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/about" className="text-gray-600 hover:text-primary font-medium hidden md:inline">
            About
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-primary font-medium hidden md:inline">
            Contact
          </Link>
          <Link to="/bookings" className="text-gray-600 hover:text-primary font-medium hidden md:inline">
            My Bookings
          </Link>
          
          <Link to="/auth">
            <Button className="flex items-center gap-2">
              <UserCircle size={18} />
              <span className="hidden sm:inline">Login / Sign Up</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
