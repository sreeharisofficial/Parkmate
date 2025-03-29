
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Filter, 
  Search,
  IndianRupee 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatCard from "@/components/dashboard/StatCard";
import { CreditCard, Wallet } from "lucide-react";

// Define payment status type
type PaymentStatus = "completed" | "pending" | "refunded";

// Define payment data type
interface Payment {
  id: string;
  bookingId: string;
  customer: string;
  date: string;
  amount: string;
  method: string;
  status: PaymentStatus;
}

// Sample data for payments
const paymentData: Payment[] = [
  {
    id: "PAY-1001",
    bookingId: "BK-1001",
    customer: "John Doe",
    date: "12 June 2023, 09:35 AM",
    amount: "₹120",
    method: "UPI",
    status: "completed",
  },
  {
    id: "PAY-1002",
    bookingId: "BK-1002",
    customer: "Jane Smith",
    date: "12 June 2023, 10:05 AM",
    amount: "₹100",
    method: "Credit Card",
    status: "completed",
  },
  {
    id: "PAY-1003",
    bookingId: "BK-1003",
    customer: "Mike Johnson",
    date: "12 June 2023, 02:20 PM",
    amount: "₹150",
    method: "Cash",
    status: "completed",
  },
  {
    id: "PAY-1004",
    bookingId: "BK-1004",
    customer: "Sarah Williams",
    date: "12 June 2023, 11:50 AM",
    amount: "₹80",
    method: "UPI",
    status: "refunded",
  },
  {
    id: "PAY-1005",
    bookingId: "BK-1005",
    customer: "Robert Brown",
    date: "12 June 2023, 08:05 AM",
    amount: "₹100",
    method: "Debit Card",
    status: "completed",
  },
  {
    id: "PAY-1006",
    bookingId: "BK-1006",
    customer: "Emily Davis",
    date: "12 June 2023, 01:35 PM",
    amount: "₹120",
    method: "Credit Card",
    status: "completed",
  },
  {
    id: "PAY-1007",
    bookingId: "BK-1007",
    customer: "David Wilson",
    date: "12 June 2023, 11:05 AM",
    amount: "₹180",
    method: "UPI",
    status: "pending",
  },
  {
    id: "PAY-1008",
    bookingId: "BK-1008",
    customer: "Lisa Anderson",
    date: "12 June 2023, 09:05 AM",
    amount: "₹60",
    method: "Cash",
    status: "refunded",
  },
];

const Payments = () => {
  return (
    <DashboardLayout title="Payments">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Total Revenue"
          value="₹24,890"
          icon={IndianRupee}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Online Payments"
          value="₹18,450"
          icon={CreditCard}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Cash Payments"
          value="₹6,440"
          icon={Wallet}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      <div className="mt-6 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-lg items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search payments..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" className="shrink-0">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button variant="outline" className="shrink-0">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="rounded-lg border bg-white shadow">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentData.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.bookingId}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell className="font-medium">{payment.amount}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        payment.status === "completed"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : payment.status === "refunded"
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "border-yellow-500 bg-yellow-50 text-yellow-700"
                      }
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="icon">
                        <FileText size={16} />
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

export default Payments;
