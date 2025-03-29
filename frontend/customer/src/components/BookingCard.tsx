
import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingCardProps {
  id: string;
  parkingLotName: string;
  address: string;
  slotNumber: string;
  startTime: Date;
  endTime: Date;
  price: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
}

const BookingCard: React.FC<BookingCardProps> = ({
  id,
  parkingLotName,
  address,
  slotNumber,
  startTime,
  endTime,
  price,
  status,
}) => {
  const navigate = useNavigate();
  
  const getStatusBadgeColor = () => {
    switch (status) {
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewBooking = () => {
    navigate(`/booking-details/${id}`);
  };

  const isUpcomingOrActive = status === 'upcoming' || status === 'active';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fadeIn">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{parkingLotName}</h3>
          <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusBadgeColor()}`}>
            {status}
          </span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="shrink-0 mt-0.5 text-gray-500" />
            <span className="text-gray-600">{address}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Car size={16} className="shrink-0 text-gray-500" />
            <span className="text-gray-600">Slot {slotNumber}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar size={16} className="shrink-0 text-gray-500" />
            <span className="text-gray-600">{format(startTime, 'MMM dd, yyyy')}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock size={16} className="shrink-0 text-gray-500" />
            <span className="text-gray-600">
              {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <span className="text-gray-500 text-sm">Total:</span>
            <span className="text-lg font-bold text-primary ml-2">{price}</span>
          </div>
          
          <div className="flex gap-2">
            {isUpcomingOrActive && (
              <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                Cancel
              </Button>
            )}
            <Button onClick={handleViewBooking}>
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
