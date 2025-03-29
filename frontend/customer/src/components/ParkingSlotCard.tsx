
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ParkingSlotCardProps {
  id: string;
  slotNumber: string;
  isAvailable: boolean;
  isAccessible: boolean;
  isEVCharger: boolean;
  price: string;
  lotId: string;
}

const ParkingSlotCard: React.FC<ParkingSlotCardProps> = ({
  id,
  slotNumber,
  isAvailable,
  isAccessible,
  isEVCharger,
  price,
  lotId,
}) => {
  const navigate = useNavigate();
  
  const handleSelectSlot = () => {
    navigate(`/payment?lotId=${lotId}&slotId=${id}`);
  };

  return (
    <div className={`border rounded-xl p-5 ${isAvailable ? 'bg-white' : 'bg-gray-100'} transition-all hover:shadow-md animate-fadeIn`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isAvailable ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-500'}`}>
            <Car size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Slot {slotNumber}</h3>
            <div className="flex gap-2 mt-1">
              {isAccessible && (
                <span className="bg-blue-50 text-blue-600 text-xs rounded px-2 py-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Accessible
                </span>
              )}
              {isEVCharger && (
                <span className="bg-green-50 text-green-600 text-xs rounded px-2 py-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  EV Charger
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <span className="text-lg font-bold text-primary">{price}</span>
          <p className="text-sm text-gray-500">/hour</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
            {isAvailable ? 'Available' : 'Occupied'}
          </span>
        </div>
        
        <Button 
          onClick={handleSelectSlot} 
          disabled={!isAvailable}
          variant={isAvailable ? "default" : "outline"}
        >
          {isAvailable ? 'Reserve' : 'Unavailable'}
        </Button>
      </div>
    </div>
  );
};

export default ParkingSlotCard;
