
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingCard from '@/components/BookingCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Calendar } from 'lucide-react';

// Sample bookings data
const getBookings = () => {
  // Try to get bookings from localStorage
  const storedBookings = localStorage.getItem('bookings');
  
  if (storedBookings) {
    const bookings = JSON.parse(storedBookings);
    // Convert date strings back to Date objects
    return bookings.map((booking: any) => ({
      ...booking,
      startTime: new Date(booking.startTime),
      endTime: new Date(booking.endTime)
    }));
  }
  
  // Default sample bookings if none in localStorage
  return [
    {
      id: 'B001',
      parkingLotName: 'Downtown Parking Garage',
      address: '123 Main St, Downtown',
      slotNumber: 'A1',
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      price: '$10.00',
      status: 'upcoming'
    },
    {
      id: 'B002',
      parkingLotName: 'River North Lot',
      address: '456 River St, North District',
      slotNumber: 'B3',
      startTime: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
      endTime: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
      price: '$15.00',
      status: 'completed'
    },
    {
      id: 'B003',
      parkingLotName: 'Museum Campus Parking',
      address: '789 Museum Dr, Arts District',
      slotNumber: 'C2',
      startTime: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
      endTime: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000),
      price: '$25.00',
      status: 'completed'
    }
  ];
};

const Bookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Load bookings
    const loadedBookings = getBookings();
    setBookings(loadedBookings);
    setFilteredBookings(loadedBookings);
  }, []);
  
  useEffect(() => {
    // Filter bookings based on tab and search query
    let filtered = [...bookings];
    
    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(booking => booking.status === activeTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.parkingLotName.toLowerCase().includes(query) ||
        booking.address.toLowerCase().includes(query) ||
        booking.id.toLowerCase().includes(query)
      );
    }
    
    setFilteredBookings(filtered);
  }, [activeTab, searchQuery, bookings]);

  return (
    <>
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-600 mb-8">
            View and manage all your parking reservations
          </p>
          
          <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative">
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-80"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-gray-500">Filter by date:</span>
              <div className="relative">
                <Input
                  type="date"
                  className="w-44 pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-xl font-medium mb-2">No bookings found</h3>
                  <p className="text-gray-500 mb-6">You don't have any parking reservations yet</p>
                  <Button onClick={() => window.location.href = '/'}>
                    Find Parking Now
                  </Button>
                </div>
              ) : (
                filteredBookings.map(booking => (
                  <BookingCard
                    key={booking.id}
                    id={booking.id}
                    parkingLotName={booking.parkingLotName}
                    address={booking.address}
                    slotNumber={booking.slotNumber}
                    startTime={booking.startTime}
                    endTime={booking.endTime}
                    price={booking.price}
                    status={booking.status}
                  />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-xl font-medium mb-2">No upcoming bookings</h3>
                  <p className="text-gray-500 mb-6">You don't have any upcoming parking reservations</p>
                  <Button onClick={() => window.location.href = '/'}>
                    Find Parking Now
                  </Button>
                </div>
              ) : (
                filteredBookings.map(booking => (
                  <BookingCard
                    key={booking.id}
                    id={booking.id}
                    parkingLotName={booking.parkingLotName}
                    address={booking.address}
                    slotNumber={booking.slotNumber}
                    startTime={booking.startTime}
                    endTime={booking.endTime}
                    price={booking.price}
                    status={booking.status}
                  />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="active" className="space-y-6">
              {/* Content for active bookings tab */}
              {filteredBookings.length === 0 ? (
                <div className="text-center bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-xl font-medium mb-2">No active bookings</h3>
                  <p className="text-gray-500">You don't have any currently active parking reservations</p>
                </div>
              ) : (
                filteredBookings.map(booking => (
                  <BookingCard
                    key={booking.id}
                    id={booking.id}
                    parkingLotName={booking.parkingLotName}
                    address={booking.address}
                    slotNumber={booking.slotNumber}
                    startTime={booking.startTime}
                    endTime={booking.endTime}
                    price={booking.price}
                    status={booking.status}
                  />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-6">
              {/* Content for completed bookings tab */}
              {filteredBookings.length === 0 ? (
                <div className="text-center bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-xl font-medium mb-2">No completed bookings</h3>
                  <p className="text-gray-500">You don't have any completed parking reservations</p>
                </div>
              ) : (
                filteredBookings.map(booking => (
                  <BookingCard
                    key={booking.id}
                    id={booking.id}
                    parkingLotName={booking.parkingLotName}
                    address={booking.address}
                    slotNumber={booking.slotNumber}
                    startTime={booking.startTime}
                    endTime={booking.endTime}
                    price={booking.price}
                    status={booking.status}
                  />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="cancelled" className="space-y-6">
              {/* Content for cancelled bookings tab */}
              <div className="text-center bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-medium mb-2">No cancelled bookings</h3>
                <p className="text-gray-500">You don't have any cancelled parking reservations</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Bookings;
