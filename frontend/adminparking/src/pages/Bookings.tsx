
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreHorizontal, Trash, Edit, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data
const bookingsData = [
  { id: 'BK001', customer: 'John Doe', slot: 'A12', date: '2023-08-15 10:30 AM', payment: 'Paid' },
  { id: 'BK002', customer: 'Jane Smith', slot: 'B05', date: '2023-08-15 11:45 AM', payment: 'Pending' },
  { id: 'BK003', customer: 'Mike Johnson', slot: 'C22', date: '2023-08-15 02:15 PM', payment: 'Paid' },
  { id: 'BK004', customer: 'Sara Wilson', slot: 'A08', date: '2023-08-15 03:30 PM', payment: 'Failed' },
  { id: 'BK005', customer: 'Alex Brown', slot: 'D11', date: '2023-08-15 05:00 PM', payment: 'Paid' },
  { id: 'BK006', customer: 'Emily Davis', slot: 'B14', date: '2023-08-16 09:15 AM', payment: 'Pending' },
  { id: 'BK007', customer: 'Robert Clark', slot: 'A03', date: '2023-08-16 10:45 AM', payment: 'Paid' },
];

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookingsData.filter(booking => 
    booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.slot.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Manage Bookings">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              View and manage all parking bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full data-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer Name</th>
                    <th>Slot Number</th>
                    <th>Date & Time</th>
                    <th>Payment Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="font-medium">{booking.id}</td>
                      <td>{booking.customer}</td>
                      <td>{booking.slot}</td>
                      <td>{booking.date}</td>
                      <td>
                        <Badge
                          variant="outline"
                          className={
                            booking.payment === 'Paid' ? 'status-badge status-paid' :
                            booking.payment === 'Pending' ? 'status-badge status-pending' :
                            'status-badge status-failed'
                          }
                        >
                          {booking.payment}
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
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Eye className="h-4 w-4" /> View details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="h-4 w-4" /> Edit booking
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                              <Trash className="h-4 w-4" /> Cancel booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No bookings found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
