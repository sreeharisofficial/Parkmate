
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Sample parking lot and slot data based on URL parameters
const getParkingDetails = (lotId: string, slotId: string) => {
  return {
    lot: {
      id: lotId,
      name: 'Downtown Parking Garage',
      address: '123 Main St, Downtown'
    },
    slot: {
      id: slotId,
      slotNumber: 'A1',
      price: '$5',
      pricePerHour: 5
    }
  };
};

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const lotId = searchParams.get('lotId') || '';
  const slotId = searchParams.get('slotId') || '';
  
  // Get details based on URL parameters
  const { lot, slot } = getParkingDetails(lotId, slotId);
  
  // Form state
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate total cost
  const totalCost = duration * slot.pricePerHour;

  // Handle credit card number formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    
    setCardNumber(formattedValue.slice(0, 19)); // Limit to 16 digits + 3 spaces
  };

  // Handle expiry date formatting (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 2) {
      setExpiry(value);
    } else {
      setExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Generate a booking ID
      const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase();
      // Navigate to confirmation page
      navigate(`/confirmation?bookingId=${bookingId}`);
    }, 2000);
  };

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
              Back to Slot Selection
            </Button>
          </div>
          
          <h1 className="text-2xl font-bold mb-8">Complete Your Reservation</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Payment Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cardholder Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  {/* Card Number */}
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        maxLength={19}
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  {/* Expiry Date and CVC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        value={expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        required
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        value={cvc}
                        onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="123"
                        required
                        maxLength={3}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <h2 className="text-xl font-semibold">Reservation Details</h2>
                  
                  {/* Start Date */}
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <div className="relative">
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  {/* Start Time */}
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <div className="relative">
                      <Input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        required
                      />
                      <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min={1}
                      max={24}
                      value={duration}
                      onChange={e => setDuration(parseInt(e.target.value))}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-success hover:bg-success-hover"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                        </span>
                        Processing...
                      </>
                    ) : (
                      'Pay and Reserve'
                    )}
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Reservation Summary</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-gray-600">{lot.name}</p>
                    <p className="text-gray-600 text-sm">{lot.address}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Parking Slot</h3>
                    <p className="text-gray-600">Slot {slot.slotNumber}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Rate</h3>
                    <p className="text-gray-600">{slot.price}/hour</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Duration</h3>
                    <p className="text-gray-600">{duration} hours</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalCost.toFixed(2)}</span>
                </div>
                
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-gray-600">
                      Your payment information is encrypted and secure. We do not store your credit card details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Payment;
