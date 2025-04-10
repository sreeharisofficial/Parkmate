import React from 'react';
import { MapPin, Shield, Tag, Clock, CreditCard, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Parking Made Easy, Wherever You Go
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Find and reserve the perfect parking spot in advance. No more driving in circles.
            </p>
            
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                  Login
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-success hover:bg-success-hover">
                  Get Started
                </Button>
              </Link>
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
      
      {/* How It Works */}
      <div className="py-16 bg-white">
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
            <Link to="/auth">
              <Button className="bg-success hover:bg-success-hover">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Index;