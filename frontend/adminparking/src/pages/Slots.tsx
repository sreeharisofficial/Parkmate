
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertCircle, Edit, MoreHorizontal, Plus, Wrench } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';

// Sample slot data
const slotsData = [
  { id: 'SL001', number: 'A01', status: 'Available' },
  { id: 'SL002', number: 'A02', status: 'Occupied' },
  { id: 'SL003', number: 'A03', status: 'Available' },
  { id: 'SL004', number: 'A04', status: 'Maintenance' },
  { id: 'SL005', number: 'A05', status: 'Available' },
  { id: 'SL006', number: 'B01', status: 'Occupied' },
  { id: 'SL007', number: 'B02', status: 'Available' },
  { id: 'SL008', number: 'B03', status: 'Available' },
  { id: 'SL009', number: 'B04', status: 'Occupied' },
  { id: 'SL010', number: 'B05', status: 'Available' },
];

const Slots = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editSlot, setEditSlot] = useState<{id: string, number: string, status: string} | null>(null);
  
  const handleEditSlot = (slot: {id: string, number: string, status: string}) => {
    setEditSlot(slot);
    setOpenDialog(true);
  };
  
  return (
    <DashboardLayout title="Manage Slots">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Parking Slots</h2>
            <p className="text-sm text-muted-foreground">Manage all parking slots and their availability</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Slot
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">50</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Available Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">35</p>
              <p className="text-sm text-muted-foreground mt-1">70% of total capacity</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm text-muted-foreground mt-1">6% of total capacity</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Slot Management</CardTitle>
            <CardDescription>
              View and update the status of parking slots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full data-table">
                <thead>
                  <tr>
                    <th>Slot ID</th>
                    <th>Slot Number</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slotsData.map((slot) => (
                    <tr key={slot.id}>
                      <td className="font-medium">{slot.id}</td>
                      <td>{slot.number}</td>
                      <td>
                        <Badge
                          variant="outline"
                          className={
                            slot.status === 'Available' ? 'status-badge status-available' :
                            slot.status === 'Occupied' ? 'status-badge status-occupied' :
                            'status-badge status-maintenance'
                          }
                        >
                          {slot.status}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="flex items-center gap-2"
                              onClick={() => handleEditSlot(slot)}
                            >
                              <Edit className="h-4 w-4" /> Edit status
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Wrench className="h-4 w-4" /> Mark as maintenance
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                              <AlertCircle className="h-4 w-4" /> Report issue
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Slot Status</DialogTitle>
            <DialogDescription>
              Update the status of slot {editSlot?.number}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slot-id" className="text-right">
                Slot ID
              </Label>
              <Input id="slot-id" value={editSlot?.id} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slot-number" className="text-right">
                Number
              </Label>
              <Input id="slot-number" value={editSlot?.number} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <RadioGroup defaultValue={editSlot?.status} className="col-span-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Available" id="available" />
                  <Label htmlFor="available">Available</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Occupied" id="occupied" />
                  <Label htmlFor="occupied">Occupied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Maintenance" id="maintenance" />
                  <Label htmlFor="maintenance">Maintenance</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpenDialog(false)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Slots;
