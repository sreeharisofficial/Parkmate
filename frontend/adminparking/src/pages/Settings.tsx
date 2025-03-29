
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const { toast } = useToast();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <DashboardLayout title="Settings">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full md:w-fit grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="parking">Parking Rates</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your parking lot general settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSettings}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="parkingName">Parking Lot Name</Label>
                    <Input id="parkingName" defaultValue="City Central Parking" />
                    <p className="text-sm text-muted-foreground">
                      This name will appear on receipts and bookings
                    </p>
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="businessHours">Business Hours</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input id="openTime" type="time" defaultValue="06:00" />
                      <Input id="closeTime" type="time" defaultValue="22:00" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The operating hours of your parking lot
                    </p>
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input id="contactEmail" type="email" defaultValue="contact@cityparking.com" />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input id="contactPhone" type="tel" defaultValue="+91 98765 43210" />
                  </div>
                </div>
                
                <Button type="submit" className="mt-6">
                  Save General Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="parking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Parking Rate Settings</CardTitle>
              <CardDescription>
                Configure your parking rates and capacity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSettings}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="maxSlots">Maximum Slots</Label>
                    <Input id="maxSlots" type="number" defaultValue="50" />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                    <Input id="hourlyRate" type="number" defaultValue="50" />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="dailyRate">Daily Rate (₹)</Label>
                    <Input id="dailyRate" type="number" defaultValue="300" />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="monthlyPass">Monthly Pass Rate (₹)</Label>
                    <Input id="monthlyPass" type="number" defaultValue="3000" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="dynamicPricing" />
                    <Label htmlFor="dynamicPricing">Enable dynamic pricing for peak hours</Label>
                  </div>
                </div>
                
                <Button type="submit" className="mt-6">
                  Save Rate Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive booking notifications via email
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive booking notifications via SMS
                    </p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="capacity-alerts">Capacity Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts when parking lot is near capacity
                    </p>
                  </div>
                  <Switch id="capacity-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="payment-alerts">Payment Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for payment updates
                    </p>
                  </div>
                  <Switch id="payment-alerts" defaultChecked />
                </div>
              </div>
              
              <Button className="mt-6" onClick={(e) => handleSaveSettings(e as any)}>
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSettings}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Admin Name</Label>
                    <Input id="name" defaultValue="Administrator" />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="admin@example.com" />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                
                <Button type="submit" className="mt-6">
                  Update Account
                </Button>
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 flex justify-between">
              <p className="text-sm text-muted-foreground">
                Last login: 15 Aug 2023, 10:30 AM
              </p>
              <Button variant="outline" className="text-destructive hover:text-destructive">
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
