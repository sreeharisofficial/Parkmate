
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Car, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ParkingLotCardProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  price: string;
  availableSpots: number;
  rating: number;
  imageUrl: string;
}

const ParkingLotCard: React.FC<ParkingLotCardProps> = ({
  id,
  name,
  address,
  distance,
  price,
  availableSpots,
  rating,
  imageUrl,
}) => {
  const navigate = useNavigate();
  
  const handleSelectLot = () => {
    navigate(`/parking-slots/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fadeIn">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        {availableSpots > 0 ? (
          <Badge className="absolute top-3 right-3 bg-success">
            {availableSpots} spots available
          </Badge>
        ) : (
          <Badge className="absolute top-3 right-3 bg-red-500">
            No spots available
          </Badge>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
            <span className="text-yellow-600 font-medium">{rating}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        
        <div className="mt-2 flex items-start gap-2 text-gray-500">
          <MapPin size={16} className="shrink-0 mt-0.5" />
          <span className="text-sm">{address}</span>
        </div>
        
        <div className="mt-1 text-sm text-gray-500 flex items-center gap-2">
          <Clock size={16} />
          <span>{distance} away</span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-primary">
              {price}
            </span>
            <span className="text-sm text-gray-500 ml-1">/hour</span>
          </div>
          
          <Button 
            onClick={handleSelectLot}
            disabled={availableSpots === 0}
            variant={availableSpots > 0 ? "default" : "outline"}
          >
            Select Spot
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParkingLotCard;
