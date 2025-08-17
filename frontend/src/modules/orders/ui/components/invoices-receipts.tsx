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
  Receipt, 
  Download, 
  Eye, 
  Search, 
  Filter,
  DollarSign,
  MoreHorizontal,
  FileText,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  date: string;
  dueDate: string;
  amount: number;
  tax: number;
  total: number;
  status: "paid" | "pending" | "overdue" | "cancelled";
  paymentMethod: string;
  customer: string;
  description: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

interface InvoicesReceiptsProps {
  invoices?: Invoice[];
  className?: string;
  onDownloadInvoice?: (invoice: Invoice) => void;
  onViewInvoice?: (invoice: Invoice) => void;
  onDownloadReceipt?: (invoice: Invoice) => void;
}

const InvoicesReceipts: React.FC<InvoicesReceiptsProps> = ({
  invoices,
  className = "",
  onDownloadInvoice,
  onViewInvoice,
  onDownloadReceipt
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Sample data if none provided
  const defaultInvoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      orderId: "ORD-001",
      date: "2024-12-20",
      dueDate: "2024-12-30",
      amount: 299.99,
      tax: 30.00,
      total: 329.99,
      status: "paid",
      paymentMethod: "Credit Card",
      customer: "John Doe",
      description: "Premium package subscription",
      items: [
        { id: "1", name: "Premium Package", quantity: 1, price: 299.99 }
      ]
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      orderId: "ORD-002",
      date: "2024-12-19",
      dueDate: "2024-12-29",
      amount: 149.99,
      tax: 15.00,
      total: 164.99,
      status: "pending",
      paymentMethod: "PayPal",
      customer: "Jane Smith",
      description: "Digital marketing service",
      items: [
        { id: "1", name: "SEO Package", quantity: 1, price: 149.99 }
      ]
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      orderId: "ORD-003",
      date: "2024-12-18",
      dueDate: "2024-12-28",
      amount: 89.99,
      tax: 9.00,
      total: 98.99,
      status: "paid",
      paymentMethod: "Bank Transfer",
      customer: "Mike Johnson",
      description: "Software license renewal",
      items: [
        { id: "1", name: "Software License", quantity: 1, price: 89.99 }
      ]
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-004",
      orderId: "ORD-004",
      date: "2024-12-15",
      dueDate: "2024-12-25",
      amount: 199.99,
      tax: 20.00,
      total: 219.99,
      status: "overdue",
      paymentMethod: "Credit Card",
      customer: "Sarah Wilson",
      description: "Consulting services",
      items: [
        { id: "1", name: "Consulting Hours", quantity: 4, price: 49.99 }
      ]
    },
    {
      id: "5",
      invoiceNumber: "INV-2024-005",
      orderId: "ORD-005",
      date: "2024-12-16",
      dueDate: "2024-12-26",
      amount: 399.99,
      tax: 40.00,
      total: 439.99,
      status: "cancelled",
      paymentMethod: "Credit Card",
      customer: "David Brown",
      description: "Enterprise package",
      items: [
        { id: "1", name: "Enterprise Package", quantity: 1, price: 399.99 }
      ]
    }
  ];

  const displayInvoices = invoices || defaultInvoices;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredInvoices = displayInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const calculateSubtotal = () => {
    return filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  };

  const calculateTotalTax = () => {
    return filteredInvoices.reduce((sum, invoice) => sum + invoice.tax, 0);
  };

  const calculateGrandTotal = () => {
    return filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Invoices & Receipts
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
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
                <DropdownMenuItem onClick={() => setStatusFilter("paid")}>
                  Paid
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("overdue")}>
                  Overdue
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${calculateSubtotal().toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Tax</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ${calculateTotalTax().toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Grand Total</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${calculateGrandTotal().toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.orderId}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("capitalize", getStatusColor(invoice.status))}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">${invoice.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewInvoice?.(invoice)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDownloadInvoice?.(invoice)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Invoice
                        </DropdownMenuItem>
                        {invoice.status === "paid" && (
                          <DropdownMenuItem onClick={() => onDownloadReceipt?.(invoice)}>
                            <Receipt className="h-4 w-4 mr-2" />
                            Download Receipt
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Receipt className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No invoices found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoicesReceipts;
