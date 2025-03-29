
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Settings, 
  Filter, 
  Search 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ParkingSlot, { SlotStatus } from "@/components/dashboard/ParkingSlot";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// Generate sample parking slots
const generateParkingSlots = (prefix: string, count: number) => {
  const statuses: SlotStatus[] = ["available", "occupied", "reserved", "maintenance"];
  
  return Array.from({ length: count }, (_, i) => {
    const id = `${prefix}-${(i + 1).toString().padStart(2, "0")}`;
    // Randomly select a status with more available slots
    const randomStatus = Math.random() < 0.6 
      ? "available" 
      : statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id,
      status: randomStatus,
    };
  });
};

const sectionA = generateParkingSlots("A", 15);
const sectionB = generateParkingSlots("B", 15);
const sectionC = generateParkingSlots("C", 15);
const sectionD = generateParkingSlots("D", 15);

const Slots = () => {
  const { toast } = useToast();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slotStatus, setSlotStatus] = useState<SlotStatus>("available");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSlotClick = (id: string) => {
    // Find the slot and set its current status
    const slot = [...sectionA, ...sectionB, ...sectionC, ...sectionD].find(s => s.id === id);
    if (slot) {
      setSelectedSlot(id);
      setSlotStatus(slot.status);
      setIsDialogOpen(true);
    }
  };

  const handleStatusChange = () => {
    toast({
      title: "Slot status updated",
      description: `Slot ${selectedSlot} is now ${slotStatus}`,
    });
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout title="Slot Management">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-lg items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search slots..."
              className="pl-8"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Slot
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <Badge variant="outline" className="badge-available">Available</Badge>
        <Badge variant="outline" className="badge-occupied">Occupied</Badge>
        <Badge variant="outline" className="badge-reserved">Reserved</Badge>
        <Badge variant="outline" className="badge-maintenance">Maintenance</Badge>
      </div>

      <Tabs defaultValue="sectionA">
        <TabsList>
          <TabsTrigger value="sectionA">Section A</TabsTrigger>
          <TabsTrigger value="sectionB">Section B</TabsTrigger>
          <TabsTrigger value="sectionC">Section C</TabsTrigger>
          <TabsTrigger value="sectionD">Section D</TabsTrigger>
        </TabsList>
        <TabsContent value="sectionA" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Section A - Ground Floor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="parking-grid">
                {sectionA.map((slot) => (
                  <ParkingSlot
                    key={slot.id}
                    id={slot.id}
                    status={slot.status}
                    onClick={handleSlotClick}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sectionB" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Section B - Level 1</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="parking-grid">
                {sectionB.map((slot) => (
                  <ParkingSlot
                    key={slot.id}
                    id={slot.id}
                    status={slot.status}
                    onClick={handleSlotClick}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sectionC" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Section C - Level 2</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="parking-grid">
                {sectionC.map((slot) => (
                  <ParkingSlot
                    key={slot.id}
                    id={slot.id}
                    status={slot.status}
                    onClick={handleSlotClick}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sectionD" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Section D - Level 3</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="parking-grid">
                {sectionD.map((slot) => (
                  <ParkingSlot
                    key={slot.id}
                    id={slot.id}
                    status={slot.status}
                    onClick={handleSlotClick}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Parking Slot {selectedSlot}</DialogTitle>
            <DialogDescription>
              Update the status of this parking slot or view its details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slot-id" className="text-right">
                Slot ID
              </Label>
              <Input id="slot-id" value={selectedSlot || ""} readOnly className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slot-status" className="text-right">
                Status
              </Label>
              <Select 
                value={slotStatus} 
                onValueChange={(value) => setSlotStatus(value as SlotStatus)}
              >
                <SelectTrigger className="col-span-3" id="slot-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusChange}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Slots;
