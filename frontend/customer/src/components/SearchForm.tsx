
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchForm: React.FC = () => {
  const [location, setLocation] = useState('');
  const [parkingType, setParkingType] = useState('hourly');
  const [dateTime, setDateTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a search query
    const searchParams = new URLSearchParams();
    if (location) searchParams.set('location', location);
    if (parkingType) searchParams.set('type', parkingType);
    if (dateTime) searchParams.set('datetime', dateTime);
    
    // Navigate to the parking lots page with the search parameters
    navigate(`/parking-lots?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fadeIn">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <Select 
            value={parkingType} 
            onValueChange={setParkingType}
          >
            <SelectTrigger className="w-full pl-10">
              <SelectValue placeholder="Select Parking Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly/Daily Parking</SelectItem>
              <SelectItem value="monthly">Monthly Parking</SelectItem>
              <SelectItem value="event">Event Parking</SelectItem>
            </SelectContent>
          </Select>
          <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter your destination"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="pl-10"
          />
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="relative">
          <Input
            type="datetime-local"
            value={dateTime}
            onChange={e => setDateTime(e.target.value)}
            className="pl-10"
          />
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <Button type="submit" className="w-full bg-success hover:bg-success-hover flex items-center justify-center gap-2">
          <Search size={18} />
          Find Parking Spots
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
