
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, Filter, Download } from 'lucide-react';

// Sample payment data
const paymentsData = [
  { id: 'PAY001', customer: 'John Doe', amount: '₹150', status: 'Completed', date: '2023-08-15 10:35 AM' },
  { id: 'PAY002', customer: 'Jane Smith', amount: '₹100', status: 'Pending', date: '2023-08-15 11:50 AM' },
  { id: 'PAY003', customer: 'Mike Johnson', amount: '₹200', status: 'Completed', date: '2023-08-15 02:20 PM' },
  { id: 'PAY004', customer: 'Sara Wilson', amount: '₹50', status: 'Failed', date: '2023-08-15 03:35 PM' },
  { id: 'PAY005', customer: 'Alex Brown', amount: '₹150', status: 'Completed', date: '2023-08-15 05:05 PM' },
  { id: 'PAY006', customer: 'Emily Davis', amount: '₹100', status: 'Pending', date: '2023-08-16 09:20 AM' },
  { id: 'PAY007', customer: 'Robert Clark', amount: '₹250', status: 'Completed', date: '2023-08-16 10:50 AM' },
];

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPayments = paymentsData.filter(payment => 
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardLayout title="Manage Payments">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <CardTitle>Payments History</CardTitle>
                <CardDescription>
                  View and manage all payments
                </CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
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
                    <th>Payment ID</th>
                    <th>Customer Name</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="font-medium">{payment.id}</td>
                      <td>{payment.customer}</td>
                      <td>{payment.amount}</td>
                      <td>
                        <Badge
                          variant="outline"
                          className={
                            payment.status === 'Completed' ? 'status-badge status-paid' :
                            payment.status === 'Pending' ? 'status-badge status-pending' :
                            'status-badge status-failed'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </td>
                      <td>{payment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredPayments.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No payments found</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹1,250</p>
              <p className="text-sm text-green-600 mt-1">+₹250 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹200</p>
              <p className="text-sm text-muted-foreground mt-1">2 payments pending</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Failed Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹50</p>
              <p className="text-sm text-red-600 mt-1">1 payment failed</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payments;
