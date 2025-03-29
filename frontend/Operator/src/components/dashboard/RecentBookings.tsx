
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";

type BookingStatus = "active" | "completed" | "cancelled";

type Booking = {
  id: string;
  customer: string;
  slot: string;
  startTime: string;
  endTime: string;
  amount: string;
  status: BookingStatus;
};

type RecentBookingsProps = {
  bookings: Booking[];
};

export default function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-lg font-semibold">Recent Bookings</h3>
        <Button variant="link" size="sm">
          View All
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Slot</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.customer}</TableCell>
                <TableCell>{booking.slot}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{booking.startTime}</div>
                    <div className="text-gray-500">{booking.endTime}</div>
                  </div>
                </TableCell>
                <TableCell>{booking.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      booking.status === "active"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : booking.status === "completed"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-red-500 bg-red-50 text-red-700"
                    }
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Eye size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
