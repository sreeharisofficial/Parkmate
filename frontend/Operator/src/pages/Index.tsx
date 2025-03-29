import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import {
  CreditCard,
  CalendarClock,
  User,
  IndianRupee,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Booking, BookingStatus } from "@/types/booking";

// Type-safe sample data for recent bookings
const recentBookingsData: Booking[] = [
  {
    id: "BK1001",
    customer: "John Doe",
    slot: "A1",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    amount: "₹60",
    status: "confirmed",
  },
  {
    id: "BK1002",
    customer: "Jane Smith",
    slot: "B3",
    startTime: "11:30 AM",
    endTime: "02:30 PM",
    amount: "₹90",
    status: "completed",
  },
  {
    id: "BK1003",
    customer: "Mike Johnson",
    slot: "C2",
    startTime: "01:00 PM",
    endTime: "03:00 PM",
    amount: "₹60",
    status: "cancelled",
  },
  {
    id: "BK1004",
    customer: "Sarah Williams",
    slot: "A4",
    startTime: "02:30 PM",
    endTime: "04:30 PM",
    amount: "₹60",
    status: "pending",
  },
];

const Index = () => {
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Bookings"
          value="4,520"
          icon={CalendarClock}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Customers"
          value="1,250"
          icon={User}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value="₹24,890"
          icon={IndianRupee}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Online Payments"
          value="₹18,450"
          icon={CreditCard}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      <div className="mt-6 rounded-lg border bg-white shadow">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Slot</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookingsData.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.slot}</TableCell>
                  <TableCell>{booking.startTime}</TableCell>
                  <TableCell>{booking.endTime}</TableCell>
                  <TableCell className="font-medium">{booking.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={{
                        confirmed: "border-blue-500 bg-blue-50 text-blue-700",
                        completed: "border-green-500 bg-green-50 text-green-700",
                        cancelled: "border-red-500 bg-red-50 text-red-700",
                        pending: "border-yellow-500 bg-yellow-50 text-yellow-700",
                      }[booking.status]}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
