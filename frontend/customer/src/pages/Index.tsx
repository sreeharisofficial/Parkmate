
import React from 'react';
import { MapPin, Shield, Tag, Clock, CreditCard, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import FeatureCard from '@/components/FeatureCard';
import ParkingMap from '@/components/ParkingMap';
import { Button } from '@/components/ui/button';

// Sample parking spots for the map
const sampleParkingSpots = [
  {
    id: '1',
    position: [11.2588, 75.7804],
    title: "Downtown Parking Garage",
    price: "$5/hr",
    available: 12
  },
  {
    id: '2',
    position: [11.2600, 75.7820],
    title: "River North Lot",
    price: "$7/hr",
    available: 5
  },
  {
    id: '3',
    position: [11.2550, 75.7850],
    title: "Museum Campus Parking",
    price: "$10/day",
    available: 20
  }
];

const Index = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 space-y-6 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Parking Made Easy,<br />Wherever You Go
              </h1>
              <p className="text-lg opacity-90">
                Find and reserve the perfect parking spot in advance. No more driving in circles.
              </p>
              
              <div className="flex gap-4">
                <Link to="/about">
                  <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                    Learn More
                  </Button>
                </Link>
                <Button className="bg-success hover:bg-success-hover">
                  Get Started
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ParkMate?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={MapPin} 
              title="Real-Time Availability" 
              description="See available parking spots in real-time with our live updates"
            />
            <FeatureCard 
              icon={Shield} 
              title="Secure Payments" 
              description="100% secure transactions with encrypted payment processing"
            />
            <FeatureCard 
              icon={Tag} 
              title="Best Price Guarantee" 
              description="We'll match any better price you find for the same parking spot"
            />
            <FeatureCard 
              icon={Clock} 
              title="Save Time" 
              description="No more circling around looking for parking spaces"
            />
            <FeatureCard 
              icon={CreditCard} 
              title="Contactless Entry" 
              description="Use our mobile pass for seamless entry and exit"
            />
            <FeatureCard 
              icon={Navigation} 
              title="Navigation" 
              description="Turn-by-turn directions to your selected parking spot"
            />
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Find Parking Near You</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Explore the map to discover available parking spots in your area. Click on a marker to see details and reserve your spot.
          </p>
          
          <ParkingMap spots={sampleParkingSpots} />
        </div>
      </div>
      
      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How ParkMate Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-gray-600">
                Enter your destination and we'll show you available parking spots nearby
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reserve</h3>
              <p className="text-gray-600">
                Select your preferred parking spot and reserve it in advance
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Park</h3>
              <p className="text-gray-600">
                Follow the directions to your spot and enjoy stress-free parking
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-success hover:bg-success-hover">
              Find Parking Now
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Index;
