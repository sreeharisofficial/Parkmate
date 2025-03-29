
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Car, Clock, CreditCard, Users } from 'lucide-react';

const Overview = () => {
  return (
    <DashboardLayout title="Overview">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Slots</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Slots</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+5 from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings Today</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <div className="flex items-center text-xs text-red-600">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                <span>-2 from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹450</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+₹50 from yesterday</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary mr-4">
                      <Car className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Customer {i}</p>
                      <p className="text-sm text-muted-foreground">
                        Slot #{i * 5} • {i === 1 ? '2 hours ago' : i === 2 ? '3 hours ago' : '5 hours ago'}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">₹{i * 50}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Slot Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Available</p>
                    <p className="text-sm text-muted-foreground">Free slots</p>
                  </div>
                  <div>
                    <span className="text-lg font-bold">35</span>
                    <span className="text-muted-foreground text-sm ml-1">/ 50</span>
                  </div>
                </div>
                
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[70%]" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Occupied</p>
                    <p className="text-sm text-muted-foreground">In use</p>
                  </div>
                  <div>
                    <span className="text-lg font-bold">15</span>
                    <span className="text-muted-foreground text-sm ml-1">/ 50</span>
                  </div>
                </div>
                
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[30%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
