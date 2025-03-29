
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { ParkingSquare } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
            <ParkingSquare className="h-14 w-14 text-primary" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-slate-800">404</h1>
        <p className="text-xl text-slate-600 mb-8">Oops! We couldn't find the parking spot you're looking for.</p>
        <Button asChild size="lg">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
