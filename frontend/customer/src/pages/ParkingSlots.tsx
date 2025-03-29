
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Info, Calendar, Clock, Car } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParkingSlotCard from '@/components/ParkingSlotCard';
import { Button } from '@/components/ui/button';

// Sample parking lot data
const sampleParkingLot = {
  id: '1',
  name: 'Downtown Parking Garage',
  address: '123 Main St, Downtown',
  description: 'Conveniently located in the heart of downtown, this covered garage offers secure parking with 24/7 access.',
  image: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
  hours: '24/7',
  amenities: ['Covered', 'Security Cameras', 'EV Charging', 'Accessible Spaces'],
  instructions: 'Enter from Main Street. Take a ticket at the entry gate. Park on any available level.',
  position: [11.2588, 75.7804]
};

// Sample parking slots data
const sampleParkingSlots = [
  {
    id: 's1',
    slotNumber: 'A1',
    isAvailable: true,
    isAccessible: false,
    isEVCharger: false,
    price: '$5'
  },
  {
    id: 's2',
    slotNumber: 'A2',
    isAvailable: false,
    isAccessible: false,
    isEVCharger: false,
    price: '$5'
  },
  {
    id: 's3',
    slotNumber: 'A3',
    isAvailable: true,
    isAccessible: true,
    isEVCharger: false,
    price: '$5'
  },
  {
    id: 's4',
    slotNumber: 'B1',
    isAvailable: true,
    isAccessible: false,
    isEVCharger: true,
    price: '$7'
  },
  {
    id: 's5',
    slotNumber: 'B2',
    isAvailable: true,
    isAccessible: false,
    isEVCharger: true,
    price: '$7'
  },
  {
    id: 's6',
    slotNumber: 'B3',
    isAvailable: false,
    isAccessible: false,
    isEVCharger: false,
    price: '$5'
  },
  {
    id: 's7',
    slotNumber: 'C1',
    isAvailable: true,
    isAccessible: true,
    isEVCharger: false,
    price: '$5'
  },
  {
    id: 's8',
    slotNumber: 'C2',
    isAvailable: true,
    isAccessible: false,
    isEVCharger: false,
    price: '$5'
  }
];

const ParkingSlots = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [parkingLot, setParkingLot] = useState(sampleParkingLot);
  const [parkingSlots, setParkingSlots] = useState(sampleParkingSlots);
  
  // Filter options
  const [showAll, setShowAll] = useState(true);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showAccessibleOnly, setShowAccessibleOnly] = useState(false);
  const [showEVOnly, setShowEVOnly] = useState(false);
  
  // Apply filters
  const filteredSlots = parkingSlots.filter(slot => {
    if (showAvailableOnly && !slot.isAvailable) return false;
    if (showAccessibleOnly && !slot.isAccessible) return false;
    if (showEVOnly && !slot.isEVCharger) return false;
    return true;
  });

  return (
    <>
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="mb-6">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={16} />
              Back to Parking Lots
            </Button>
          </div>
          
          {/* Parking Lot Info */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="h-64 overflow-hidden">
              <img 
                src={parkingLot.image} 
                alt={parkingLot.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">{parkingLot.name}</h1>
              
              <div className="flex items-start gap-2 text-gray-600 mb-4">
                <MapPin size={18} className="shrink-0 mt-1" />
                <span>{parkingLot.address}</span>
              </div>
              
              <p className="text-gray-700 mb-6">{parkingLot.description}</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Clock size={18} />
                    Hours
                  </h3>
                  <p className="text-gray-600">{parkingLot.hours}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Info size={18} />
                    Amenities
                  </h3>
                  <ul className="text-gray-600">
                    {parkingLot.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span>•</span> {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Car size={18} />
                    Instructions
                  </h3>
                  <p className="text-gray-600">{parkingLot.instructions}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Parking Slots Section */}
          <h2 className="text-2xl font-bold mb-6">Select a Parking Slot</h2>
          
          {/* Filter Options */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap gap-3">
              <Button 
                variant={showAll ? "default" : "outline"} 
                size="sm"
                onClick={() => {
                  setShowAll(true);
                  setShowAvailableOnly(false);
                  setShowAccessibleOnly(false);
                  setShowEVOnly(false);
                }}
              >
                All Slots
              </Button>
              <Button 
                variant={showAvailableOnly ? "default" : "outline"} 
                size="sm"
                onClick={() => {
                  setShowAll(false);
                  setShowAvailableOnly(true);
                  setShowAccessibleOnly(false);
                  setShowEVOnly(false);
                }}
              >
                Available Only
              </Button>
              <Button 
                variant={showAccessibleOnly ? "default" : "outline"} 
                size="sm"
                onClick={() => {
                  setShowAll(false);
                  setShowAvailableOnly(false);
                  setShowAccessibleOnly(true);
                  setShowEVOnly(false);
                }}
              >
                Accessible Spaces
              </Button>
              <Button 
                variant={showEVOnly ? "default" : "outline"} 
                size="sm"
                onClick={() => {
                  setShowAll(false);
                  setShowAvailableOnly(false);
                  setShowAccessibleOnly(false);
                  setShowEVOnly(true);
                }}
              >
                EV Charging
              </Button>
            </div>
          </div>
          
          {/* Parking Slots Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSlots.length === 0 ? (
              <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No matching parking slots</h3>
                <p className="text-gray-500 mb-4">Try changing your filter options</p>
                <Button 
                  onClick={() => {
                    setShowAll(true);
                    setShowAvailableOnly(false);
                    setShowAccessibleOnly(false);
                    setShowEVOnly(false);
                  }}
                >
                  Show All Slots
                </Button>
              </div>
            ) : (
              filteredSlots.map(slot => (
                <ParkingSlotCard
                  key={slot.id}
                  id={slot.id}
                  slotNumber={slot.slotNumber}
                  isAvailable={slot.isAvailable}
                  isAccessible={slot.isAccessible}
                  isEVCharger={slot.isEVCharger}
                  price={slot.price}
                  lotId={parkingLot.id}
                />
              ))
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ParkingSlots;
