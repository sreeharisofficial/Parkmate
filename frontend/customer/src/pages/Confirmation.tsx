
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, MapPin, Calendar, Clock, Car, Download, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Mock confirmation data
const mockConfirmation = {
  bookingId: '',
  parkingLot: {
    name: 'Downtown Parking Garage',
    address: '123 Main St, Downtown',
    instructions: 'Enter from Main Street. Take a ticket at the entry gate. Park on any available level.'
  },
  slot: {
    slotNumber: 'A1'
  },
  reservation: {
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    totalCost: '$10.00'
  }
};

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get('bookingId') || 'BOOKING123';
  
  // Update mock data with the booking ID
  const confirmationData = {
    ...mockConfirmation,
    bookingId
  };

  // Simulate saving to local storage (in a real app, this would come from an API)
  useEffect(() => {
    // Get existing bookings or initialize empty array
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Check if this booking already exists
    const exists = existingBookings.some((booking: any) => booking.bookingId === bookingId);
    
    if (!exists) {
      // Add new booking to array
      const updatedBookings = [...existingBookings, {
        id: bookingId,
        bookingId: bookingId,
        parkingLotName: confirmationData.parkingLot.name,
        address: confirmationData.parkingLot.address,
        slotNumber: confirmationData.slot.slotNumber,
        startTime: confirmationData.reservation.startDate,
        endTime: confirmationData.reservation.endDate,
        price: confirmationData.reservation.totalCost,
        status: 'upcoming'
      }];
      
      // Save to localStorage
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    }
  }, [bookingId]);

  return (
    <>
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-10 text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-500" size={40} />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600">
                Your parking spot has been reserved successfully. 
                You'll also receive a confirmation email with the details.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {/* Booking ID */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-gray-500 text-sm">Booking ID</span>
                  <h2 className="text-xl font-bold">{confirmationData.bookingId}</h2>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download size={16} />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Share2 size={16} />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              {/* Parking Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin size={18} className="text-gray-500" />
                    Parking Location
                  </h3>
                  <p className="text-gray-800 font-medium mt-1">{confirmationData.parkingLot.name}</p>
                  <p className="text-gray-600">{confirmationData.parkingLot.address}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Car size={18} className="text-gray-500" />
                    Parking Slot
                  </h3>
                  <p className="text-gray-800">Slot {confirmationData.slot.slotNumber}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Calendar size={18} className="text-gray-500" />
                    Reservation Date
                  </h3>
                  <p className="text-gray-800">
                    {confirmationData.reservation.startDate.toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock size={18} className="text-gray-500" />
                    Reservation Time
                  </h3>
                  <p className="text-gray-800">
                    {confirmationData.reservation.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                    {confirmationData.reservation.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              {/* Parking Instructions */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Parking Instructions</h3>
                <p className="text-gray-600">
                  {confirmationData.parkingLot.instructions}
                </p>
              </div>
              
              <Separator className="mb-6" />
              
              {/* Payment Summary */}
              <div>
                <h3 className="font-semibold mb-2">Payment Summary</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Parking Fee</span>
                  <span className="text-gray-800">{confirmationData.reservation.totalCost}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800">$0.00</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{confirmationData.reservation.totalCost}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => navigate('/')}
              >
                Return Home
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={() => navigate('/bookings')}
              >
                View My Bookings
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Confirmation;
