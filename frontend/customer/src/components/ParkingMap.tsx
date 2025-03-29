
import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ParkingSpot {
  id: string;
  position: [number, number];
  title: string;
  price: string;
  available: number;
}

interface ParkingMapProps {
  spots?: ParkingSpot[];
  center?: [number, number];
  onSpotSelect?: (spotId: string) => void;
}

const ParkingMap: React.FC<ParkingMapProps> = ({ 
  spots = [], 
  center = [11.2588, 75.7804], 
  onSpotSelect 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Dynamic import of Leaflet to avoid SSR issues
    import('leaflet').then(L => {
      // Only initialize the map if it doesn't exist yet
      if (!mapInstanceRef.current && mapRef.current) {
        // Initialize the map
        mapInstanceRef.current = L.map(mapRef.current).setView(center, 14);

        // Add the tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstanceRef.current);

        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation: [number, number] = [
                position.coords.latitude,
                position.coords.longitude
              ];
              mapInstanceRef.current.setView(userLocation, 14);
              L.marker(userLocation)
                .addTo(mapInstanceRef.current)
                .bindPopup('Your Location')
                .openPopup();
            },
            () => {
              console.log("Unable to retrieve user location. Using default coordinates.");
            }
          );
        }

        // Add markers for spots
        spots.forEach(spot => {
          const marker = L.marker(spot.position).addTo(mapInstanceRef.current);
          marker.bindPopup(`
            <div class="text-center">
              <h4 class="font-semibold">${spot.title}</h4>
              <p>Price: ${spot.price}</p>
              <p>Spaces available: ${spot.available}</p>
              <button 
                class="bg-primary text-white px-3 py-1 rounded mt-2 hover:bg-blue-600 text-sm"
                onclick="window.selectSpot('${spot.id}')"
              >
                View Details
              </button>
            </div>
          `);
        });

        // Expose the selectSpot function to window for the popup buttons
        window.selectSpot = (spotId: string) => {
          if (onSpotSelect) onSpotSelect(spotId);
        };

        setIsLoading(false);
      }
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      // Remove the global function
      delete window.selectSpot;
    };
  }, [center, spots, onSpotSelect]);

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-lg">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-gray-500">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
};

// Add the selectSpot function to the Window interface
declare global {
  interface Window {
    selectSpot: (spotId: string) => void;
  }
}

export default ParkingMap;
