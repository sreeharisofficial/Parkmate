
import { cn } from "@/lib/utils";

export type SlotStatus = "available" | "occupied" | "reserved" | "maintenance";

type ParkingSlotProps = {
  id: string;
  status: SlotStatus;
  onClick?: (id: string) => void;
};

export default function ParkingSlot({ id, status, onClick }: ParkingSlotProps) {
  const handleClick = () => {
    if (onClick) onClick(id);
  };
  
  return (
    <div 
      className={cn(
        "h-20 rounded-md border cursor-pointer transition-all flex flex-col items-center justify-center",
        status === "available" && "border-parking-green bg-parking-green/5 hover:bg-parking-green/10",
        status === "occupied" && "border-parking-red bg-parking-red/5 hover:bg-parking-red/10",
        status === "reserved" && "border-parking-yellow bg-parking-yellow/5 hover:bg-parking-yellow/10",
        status === "maintenance" && "border-parking-purple bg-parking-purple/5 hover:bg-parking-purple/10",
      )}
      onClick={handleClick}
    >
      <span className="text-sm font-semibold">{id}</span>
      <span 
        className={cn(
          "text-xs px-2 py-0.5 rounded-full mt-1",
          `badge-${status}`
        )}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
}
