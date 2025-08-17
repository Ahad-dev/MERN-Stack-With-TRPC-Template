import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Download, 
  RefreshCw,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "completed" | "pending" | "cancelled" | "processing" | "shipped";
  amount: number;
  items: number;
  customer?: string;
  paymentMethod: string;
  description?: string;
}

interface OrderHistoryProps {
  orders?: Order[];
  className?: string;
  onViewOrder?: (order: Order) => void;
  onDownloadInvoice?: (order: Order) => void;
  onRefreshOrders?: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
  orders,
  className = "",
  onViewOrder,
  onDownloadInvoice,
  onRefreshOrders
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Sample data if none provided
  const defaultOrders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-001",
      date: "2024-12-20",
      status: "completed",
      amount: 299.99,
      items: 3,
      customer: "John Doe",
      paymentMethod: "Credit Card",
      description: "Premium package subscription"
    },
    {
      id: "2",
      orderNumber: "ORD-002",
      date: "2024-12-19",
      status: "processing",
      amount: 149.99,
      items: 1,
      customer: "Jane Smith",
      paymentMethod: "PayPal",
      description: "Digital marketing service"
    },
    {
      id: "3",
      orderNumber: "ORD-003",
      date: "2024-12-18",
      status: "shipped",
      amount: 89.99,
      items: 2,
      customer: "Mike Johnson",
      paymentMethod: "Credit Card",
      description: "Software license renewal"
    },
    {
      id: "4",
      orderNumber: "ORD-004",
      date: "2024-12-17",
      status: "pending",
      amount: 199.99,
      items: 1,
      customer: "Sarah Wilson",
      paymentMethod: "Bank Transfer",
      description: "Consulting services"
    },
    {
      id: "5",
      orderNumber: "ORD-005",
      date: "2024-12-16",
      status: "cancelled",
      amount: 399.99,
      items: 4,
      customer: "David Brown",
      paymentMethod: "Credit Card",
      description: "Enterprise package"
    }
  ];

  const displayOrders = orders || defaultOrders;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredOrders = displayOrders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Order History
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-auto"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("processing")}>
                  Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("shipped")}>
                  Shipped
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm" onClick={onRefreshOrders}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("capitalize", getStatusColor(order.status))}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="font-medium">${order.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewOrder?.(order)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDownloadInvoice?.(order)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No orders found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
