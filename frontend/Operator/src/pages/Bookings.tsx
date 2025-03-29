
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash, Plus, Search } from "lucide-react";

// Sample data for bookings
const bookingData = [
  {
    id: "BK-1001",
    customer: "John Doe",
    phone: "+91 9876543210",
    slot: "A-12",
    startTime: "09:30 AM, 12 June 2023",
    endTime: "11:30 AM, 12 June 2023",
    amount: "₹120",
    status: "active",
  },
  {
    id: "BK-1002",
    customer: "Jane Smith",
    phone: "+91 9876543211",
    slot: "B-05",
    startTime: "10:00 AM, 12 June 2023",
    endTime: "12:00 PM, 12 June 2023",
    amount: "₹100",
    status: "completed",
  },
  {
    id: "BK-1003",
    customer: "Mike Johnson",
    phone: "+91 9876543212",
    slot: "C-08",
    startTime: "02:15 PM, 12 June 2023",
    endTime: "04:15 PM, 12 June 2023",
    amount: "₹150",
    status: "active",
  },
  {
    id: "BK-1004",
    customer: "Sarah Williams",
    phone: "+91 9876543213",
    slot: "A-03",
    startTime: "11:45 AM, 12 June 2023",
    endTime: "01:45 PM, 12 June 2023",
    amount: "₹80",
    status: "cancelled",
  },
  {
    id: "BK-1005",
    customer: "Robert Brown",
    phone: "+91 9876543214",
    slot: "D-10",
    startTime: "08:00 AM, 12 June 2023",
    endTime: "10:00 AM, 12 June 2023",
    amount: "₹100",
    status: "completed",
  },
  {
    id: "BK-1006",
    customer: "Emily Davis",
    phone: "+91 9876543215",
    slot: "B-07",
    startTime: "01:30 PM, 12 June 2023",
    endTime: "03:30 PM, 12 June 2023",
    amount: "₹120",
    status: "active",
  },
  {
    id: "BK-1007",
    customer: "David Wilson",
    phone: "+91 9876543216",
    slot: "C-15",
    startTime: "11:00 AM, 12 June 2023",
    endTime: "02:00 PM, 12 June 2023",
    amount: "₹180",
    status: "completed",
  },
  {
    id: "BK-1008",
    customer: "Lisa Anderson",
    phone: "+91 9876543217",
    slot: "A-09",
    startTime: "09:00 AM, 12 June 2023",
    endTime: "10:00 AM, 12 June 2023",
    amount: "₹60",
    status: "cancelled",
  },
];

const Bookings = () => {
  return (
    <DashboardLayout title="Bookings">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-lg items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-8"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      <div className="rounded-lg border bg-white shadow">
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
              {bookingData.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>
                    <div>
                      {booking.customer}
                      <div className="text-sm text-gray-500">{booking.phone}</div>
                    </div>
                  </TableCell>
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
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash size={16} />
                      </Button>
                    </div>
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

export default Bookings;
