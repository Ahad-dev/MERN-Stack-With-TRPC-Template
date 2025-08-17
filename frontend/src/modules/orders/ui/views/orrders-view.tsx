import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  DollarSign,
  Package,
  TrendingUp
} from "lucide-react";
import OrderHistory from "../components/order-history";
import InProgressOrders from "../components/in-progress-orders";
import DownloadsFiles from "../components/downloads-files";
import InvoicesReceipts from "../components/invoices-receipts";
import type { Order } from "../components/order-history";
import type { InProgressOrder } from "../components/in-progress-orders";
import type { DownloadableFile } from "../components/downloads-files";
import type { Invoice } from "../components/invoices-receipts";

const OrdersView = () => {
  // Handler functions
  const handleViewOrder = (order: Order) => {
    console.log("Viewing order:", order);
    // Navigate to order details page
  };

  const handleDownloadInvoice = (order: Order) => {
    console.log("Downloading invoice for order:", order);
    // Download invoice logic
  };

  const handleRefreshOrders = () => {
    console.log("Refreshing orders");
    // Refresh orders logic
  };

  const handleViewProgressDetails = (order: InProgressOrder) => {
    console.log("Viewing progress details:", order);
    // Navigate to progress details
  };

  const handleDownloadFile = (file: DownloadableFile) => {
    console.log("Downloading file:", file);
    // Download file logic
  };

  const handlePreviewFile = (file: DownloadableFile) => {
    console.log("Previewing file:", file);
    // Preview file logic
  };

  const handleViewInvoice = (invoice: Invoice) => {
    console.log("Viewing invoice:", invoice);
    // View invoice details
  };

  const handleDownloadInvoiceDocument = (invoice: Invoice) => {
    console.log("Downloading invoice document:", invoice);
    // Download invoice PDF
  };

  const handleDownloadReceipt = (invoice: Invoice) => {
    console.log("Downloading receipt:", invoice);
    // Download receipt
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">
            Manage your orders, track progress, and access files
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">156</p>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +12% this month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">23</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Package className="h-3 w-3" />
                  Active projects
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">133</p>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  95% success rate
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">$45,231</p>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +8.2% this month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* In Progress Orders */}
          <InProgressOrders 
            onViewDetails={handleViewProgressDetails}
          />
          
          {/* Order History */}
          <OrderHistory
            onViewOrder={handleViewOrder}
            onDownloadInvoice={handleDownloadInvoice}
            onRefreshOrders={handleRefreshOrders}
          />
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Downloads & Files */}
          <DownloadsFiles
            onDownload={handleDownloadFile}
            onPreview={handlePreviewFile}
          />
        </div>
      </div>

      {/* Bottom Section - Full Width */}
      <div className="space-y-6">
        {/* Invoices & Receipts */}
        <InvoicesReceipts
          onViewInvoice={handleViewInvoice}
          onDownloadInvoice={handleDownloadInvoiceDocument}
          onDownloadReceipt={handleDownloadReceipt}
        />
      </div>
    </div>
  );
};

export default OrdersView;