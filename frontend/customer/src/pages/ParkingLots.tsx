
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Filter, SortDesc } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParkingLotCard from '@/components/ParkingLotCard';
import ParkingMap from '@/components/ParkingMap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Sample parking lots data
const sampleParkingLots = [
  {
    id: '1',
    name: 'Downtown Parking Garage',
    address: '123 Main St, Downtown',
    distance: '0.2 miles',
    price: '$5',
    availableSpots: 12,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    position: [11.2588, 75.7804]
  },
  {
    id: '2',
    name: 'River North Lot',
    address: '456 River St, North District',
    distance: '0.5 miles',
    price: '$7',
    availableSpots: 5,
    rating: 4.2,
    imageUrl: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    position: [11.2600, 75.7820]
  },
  {
    id: '3',
    name: 'Museum Campus Parking',
    address: '789 Museum Dr, Arts District',
    distance: '0.8 miles',
    price: '$10',
    availableSpots: 20,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1582398626929-4d7c9f8005d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    position: [11.2550, 75.7850]
  },
  {
    id: '4',
    name: 'Central Station Parking',
    address: '321 Station Rd, Central',
    distance: '0.3 miles',
    price: '$8',
    availableSpots: 15,
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1621928372414-30e71d889c57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    position: [11.2570, 75.7830]
  },
];

const ParkingLots = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [parkingLots, setParkingLots] = useState(sampleParkingLots);
  const [selectedLotId, setSelectedLotId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  // Get search parameters
  const location = searchParams.get('location') || '';
  const parkingType = searchParams.get('type') || '';
  const dateTime = searchParams.get('datetime') || '';

  // Convert parking lots to map format
  const mapParkingSpots = parkingLots.map(lot => ({
    id: lot.id,
    position: lot.position,
    title: lot.name,
    price: `${lot.price}/hr`,
    available: lot.availableSpots
  }));

  const handleSpotSelect = (spotId: string) => {
    setSelectedLotId(spotId);
    // Scroll to the selected parking lot card
    const element = document.getElementById(`lot-${spotId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Search header */}
          <div className="bg-white rounded-lg shadow-md p-5 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <MapPin className="text-primary mr-2" />
                <h1 className="text-xl font-semibold">
                  {location ? `Parking near ${location}` : 'Available Parking Lots'}
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List View
                </Button>
                <Button 
                  variant={viewMode === 'map' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  Map View
                </Button>
              </div>
            </div>
            
            {/* Search details */}
            <div className="mt-4 text-sm text-gray-500">
              <p>
                {parkingType === 'hourly' ? 'Hourly/Daily Parking' : 
                 parkingType === 'monthly' ? 'Monthly Parking' : 
                 parkingType === 'event' ? 'Event Parking' : 'All Parking Types'}
                {dateTime ? ` · ${new Date(dateTime).toLocaleString()}` : ''}
              </p>
            </div>
          </div>
          
          {/* Filters and Sort */}
          <div className="bg-white rounded-lg shadow-md p-5 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter size={18} />
                <span className="font-medium">Filters:</span>
                <Button variant="outline" size="sm">Price</Button>
                <Button variant="outline" size="sm">Distance</Button>
                <Button variant="outline" size="sm">Availability</Button>
              </div>
              
              <div className="flex items-center gap-2">
                <SortDesc size={18} />
                <span className="font-medium">Sort By:</span>
                <select className="border rounded px-2 py-1 text-sm">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Distance</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - List of parking lots */}
            <div className={`w-full ${viewMode === 'list' ? 'lg:w-1/2' : 'hidden'}`}>
              <div className="space-y-6">
                {parkingLots.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h3 className="text-xl font-medium mb-2">No parking lots found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                    <Button onClick={() => navigate('/')}>
                      Back to Search
                    </Button>
                  </div>
                ) : (
                  parkingLots.map(lot => (
                    <div 
                      key={lot.id}
                      id={`lot-${lot.id}`}
                      className={`transition-all ${selectedLotId === lot.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    >
                      <ParkingLotCard {...lot} />
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Right side - Map */}
            <div className={`w-full ${viewMode === 'list' ? 'lg:w-1/2' : 'lg:w-full'}`}>
              <div className="sticky top-24">
                <ParkingMap 
                  spots={mapParkingSpots} 
                  onSpotSelect={handleSpotSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ParkingLots;
