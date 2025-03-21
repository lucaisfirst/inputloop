
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  CreditCard, 
  Bell, 
  Mail, 
  Settings, 
  ChevronsUpDown, 
  Search,
  Plus,
  Trash2,
  Edit,
  UserPlus,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { toast } from "sonner";

// Sample data for users
const userList = [
  {
    id: "user-1",
    name: "Minhyuk Kim",
    email: "minhyuk@example.com",
    role: "admin",
    status: "active",
    lastActive: "2025-03-21T10:30:00",
    avatarUrl: ""
  },
  {
    id: "user-2",
    name: "Jiwon Park",
    email: "jiwon@example.com",
    role: "worker",
    status: "active",
    lastActive: "2025-03-20T14:15:00",
    avatarUrl: ""
  },
  {
    id: "user-3",
    name: "Eunseo Lee",
    email: "eunseo@example.com",
    role: "worker",
    status: "active",
    lastActive: "2025-03-22T09:05:00",
    avatarUrl: ""
  },
  {
    id: "user-4",
    name: "Hyunjin Jeon",
    email: "hyunjin@example.com",
    role: "client",
    status: "active",
    lastActive: "2025-03-19T11:45:00",
    avatarUrl: ""
  },
  {
    id: "user-5",
    name: "Jiyoung Kang",
    email: "jiyoung@example.com",
    role: "client",
    status: "inactive",
    lastActive: "2025-03-10T16:20:00",
    avatarUrl: ""
  }
];

// Sample data for payment history
const paymentHistory = [
  {
    id: "payment-1",
    date: "2025-03-15",
    amount: 79.00,
    status: "successful",
    plan: "Professional",
    paymentMethod: "Credit Card (****4242)"
  },
  {
    id: "payment-2",
    date: "2025-02-15",
    amount: 79.00,
    status: "successful",
    plan: "Professional",
    paymentMethod: "Credit Card (****4242)"
  },
  {
    id: "payment-3",
    date: "2025-01-15",
    amount: 79.00,
    status: "successful",
    plan: "Professional",
    paymentMethod: "Credit Card (****4242)"
  },
  {
    id: "payment-4",
    date: "2024-12-15",
    amount: 29.00,
    status: "successful",
    plan: "Starter",
    paymentMethod: "Credit Card (****4242)"
  },
  {
    id: "payment-5",
    date: "2024-11-15",
    amount: 29.00,
    status: "failed",
    plan: "Starter",
    paymentMethod: "Credit Card (****4242)"
  }
];

// Sample notification settings
const notificationSettings = [
  {
    id: "notification-1",
    title: "New comment on project",
    description: "Receive notifications when someone comments on your project",
    email: true,
    push: true
  },
  {
    id: "notification-2",
    title: "Task assignment",
    description: "Receive notifications when you are assigned to a task",
    email: true,
    push: true
  },
  {
    id: "notification-3",
    title: "Project updates",
    description: "Receive notifications about project status changes",
    email: true,
    push: false
  },
  {
    id: "notification-4",
    title: "Deadline reminders",
    description: "Receive reminders about upcoming deadlines",
    email: true,
    push: true
  },
  {
    id: "notification-5",
    title: "System announcements",
    description: "Receive important announcements about the platform",
    email: true,
    push: false
  }
];

const Admin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState(userList);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(notificationSettings);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: "",
    name: "",
    role: "client" as "client" | "worker" | "admin"
  });
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Handle notification setting change
  const handleNotificationChange = (id: string, type: 'email' | 'push', value: boolean) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, [type]: value }
          : notification
      )
    );
    
    toast.success(`Notification settings updated`);
  };

  // Handle user invitation
  const handleInviteUser = () => {
    if (!inviteForm.email || !inviteForm.name) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Add new user to the list
    const newUser = {
      id: `user-${Date.now()}`,
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: "pending",
      lastActive: "Never",
      avatarUrl: ""
    };
    
    setUsers(prev => [...prev, newUser]);
    setInviteDialogOpen(false);
    setInviteForm({ email: "", name: "", role: "client" });
    
    toast.success(`Invitation sent to ${inviteForm.email}`);
  };

  // Handle user deletion
  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast.success("User removed successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Administration</h1>
            <p className="text-gray-600">
              Manage users, billing, and notification settings
            </p>
          </motion.div>

          <Tabs defaultValue="users" className="space-y-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Billing</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search users..." 
                    className="pl-9" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Invite User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite New User</DialogTitle>
                      <DialogDescription>
                        Send an invitation to join your organization.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Enter user's name" 
                          value={inviteForm.name}
                          onChange={(e) => setInviteForm(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter user's email" 
                          value={inviteForm.email}
                          onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select 
                          value={inviteForm.role}
                          onValueChange={(value: "client" | "worker" | "admin") => 
                            setInviteForm(prev => ({ ...prev, role: value }))
                          }
                        >
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="client">Client</SelectItem>
                            <SelectItem value="worker">Worker</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleInviteUser}>Send Invitation</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card className="border-none shadow-soft">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              user.role === "admin" 
                                ? "default" 
                                : user.role === "worker"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              user.role === "admin" 
                                ? "bg-primary" 
                                : user.role === "worker"
                                  ? "bg-blue-500"
                                  : ""
                            }>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${
                                user.status === "active" 
                                  ? "bg-green-500" 
                                  : user.status === "pending"
                                    ? "bg-yellow-500"
                                    : "bg-gray-300"
                              }`} />
                              <span className="capitalize">{user.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.lastActive === "Never" 
                              ? "Never" 
                              : formatDate(user.lastActive)
                            }
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Edit className="h-4 w-4" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="flex items-center gap-2 text-red-600"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Remove User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {filteredUsers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <div className="flex flex-col items-center">
                              <Users className="h-10 w-10 text-gray-300 mb-2" />
                              <p className="text-gray-500">No users found</p>
                              {searchQuery && (
                                <Button 
                                  variant="link" 
                                  onClick={() => setSearchQuery("")}
                                  className="mt-2"
                                >
                                  Clear search
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-none shadow-soft">
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      You're currently on the Professional plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">Professional</h3>
                        <Badge>Current Plan</Badge>
                      </div>
                      <div className="flex items-end gap-1">
                        <span className="text-3xl font-bold">$79</span>
                        <span className="text-gray-500 mb-1">/month</span>
                      </div>
                      <p className="text-sm text-gray-500">Billed monthly on the 15th</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Unlimited projects</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Advanced analytics</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Priority email support</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>10 team members</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>AI writing assistant</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 sm:flex-row">
                    <Button className="w-full sm:w-auto">Upgrade Plan</Button>
                    <Button variant="outline" className="w-full sm:w-auto">Cancel Subscription</Button>
                  </CardFooter>
                </Card>
                
                <Card className="border-none shadow-soft">
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                      Manage your payment details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Credit Card</p>
                          <p className="text-sm text-gray-500">Visa ending in 4242</p>
                        </div>
                      </div>
                      <Badge>Default</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-500">Expiry Date</p>
                        <p className="font-medium">05/2026</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Billing Address</p>
                        <p className="font-medium">Seoul, South Korea</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 sm:flex-row">
                    <Button variant="outline" className="w-full sm:w-auto">Update Payment Method</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card className="border-none shadow-soft">
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>
                    View your recent payments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{formatDate(payment.date)}</TableCell>
                          <TableCell>${payment.amount.toFixed(2)}</TableCell>
                          <TableCell>{payment.plan}</TableCell>
                          <TableCell>{payment.paymentMethod}</TableCell>
                          <TableCell>
                            <Badge variant={payment.status === "successful" ? "default" : "destructive"} className={payment.status === "successful" ? "bg-green-500" : ""}>
                              {payment.status === "successful" ? "Completed" : "Failed"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Download All Invoices</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-none shadow-soft">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-4 items-center gap-4 font-medium">
                      <div>Notification</div>
                      <div className="col-span-2">Description</div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div>Email</div>
                        <div>Push</div>
                      </div>
                    </div>
                    
                    <div className="h-px bg-gray-100" />
                    
                    {notifications.map((notification) => (
                      <div key={notification.id} className="grid grid-cols-4 items-center gap-4">
                        <div className="font-medium">{notification.title}</div>
                        <div className="col-span-2 text-sm text-gray-500">{notification.description}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex justify-center">
                            <Switch 
                              id={`${notification.id}-email`} 
                              checked={notification.email} 
                              onCheckedChange={(checked) => handleNotificationChange(notification.id, 'email', checked)}
                            />
                          </div>
                          <div className="flex justify-center">
                            <Switch 
                              id={`${notification.id}-push`} 
                              checked={notification.push} 
                              onCheckedChange={(checked) => handleNotificationChange(notification.id, 'push', checked)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col sm:flex-row gap-3 w-full justify-end">
                    <Button variant="outline" onClick={() => {
                      // Disable all notifications
                      setNotifications(prev => 
                        prev.map(notification => ({
                          ...notification,
                          email: false,
                          push: false
                        }))
                      );
                      toast.success("All notifications disabled");
                    }}>
                      Disable All
                    </Button>
                    <Button onClick={() => {
                      // Enable all notifications
                      setNotifications(prev => 
                        prev.map(notification => ({
                          ...notification,
                          email: true,
                          push: true
                        }))
                      );
                      toast.success("All notifications enabled");
                    }}>
                      Enable All
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card className="border-none shadow-soft">
                <CardHeader>
                  <CardTitle>Email Preferences</CardTitle>
                  <CardDescription>
                    Choose what types of emails you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails" className="font-medium">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">Receive updates on new features and special offers</p>
                    </div>
                    <Switch id="marketing-emails" defaultChecked />
                  </div>
                  
                  <div className="h-px bg-gray-100" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="product-emails" className="font-medium">Product Updates</Label>
                      <p className="text-sm text-gray-500">Receive emails about product updates and changes</p>
                    </div>
                    <Switch id="product-emails" defaultChecked />
                  </div>
                  
                  <div className="h-px bg-gray-100" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="newsletter" className="font-medium">Monthly Newsletter</Label>
                      <p className="text-sm text-gray-500">Receive our monthly newsletter with tips and best practices</p>
                    </div>
                    <Switch id="newsletter" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full sm:w-auto">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
