import React from 'react';
import { MapPin, Clock, Calendar, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParkingMap from '@/components/ParkingMap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Home = () => {
  // Sample parking spots for the map
  const sampleParkingSpots = [
    {
      id: '1',
      position: [11.2588, 75.7804] as [number, number],
      title: "Downtown Parking Garage",
      price: "$5/hr",
      available: 12
    },
    {
      id: '2',
      position: [11.2600, 75.7820] as [number, number],
      title: "River North Lot",
      price: "$7/hr",
      available: 5
    },
    {
      id: '3',
      position: [11.2550, 75.7850] as [number, number],
      title: "Museum Campus Parking",
      price: "$10/day",
      available: 20
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Search Section */}
      <div className="pt-24 pb-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Find Your Perfect Parking Spot</h1>
          
          <div className="bg-white rounded-lg p-6 shadow-lg text-gray-800">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin size={18} />
                  Location
                </Label>
                <Input id="location" placeholder="Enter destination" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar size={18} />
                  Date
                </Label>
                <Input id="date" type="date" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="start-time" className="flex items-center gap-2">
                  <Clock size={18} />
                  From
                </Label>
                <Input id="start-time" type="time" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-time" className="flex items-center gap-2">
                  <Clock size={18} />
                  To
                </Label>
                <Input id="end-time" type="time" />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Link to="/parking-lots">
                <Button className="bg-success hover:bg-success-hover">
                  <Car size={18} className="mr-2" />
                  Find Parking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Available Parking Spots</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Select a parking spot to view details and make a reservation
          </p>
          
          <ParkingMap spots={sampleParkingSpots} />
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link to="/bookings">
              <Button variant="outline" className="px-8 py-6 border-2 border-primary text-primary hover:bg-primary/10">
                <div className="text-left">
                  <h3 className="text-xl font-semibold">My Bookings</h3>
                  <p className="text-sm font-normal mt-1">View and manage your reservations</p>
                </div>
              </Button>
            </Link>
            
            <Button className="px-8 py-6 bg-primary hover:bg-primary-dark">
              <div className="text-left text-white">
                <h3 className="text-xl font-semibold">Quick Park</h3>
                <p className="text-sm font-normal mt-1">Find parking near my current location</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Home;