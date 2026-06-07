import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StarfieldBackground } from "@/components/layout/StarfieldBackground";

import Landing from "@/pages/Landing";
import Vendors from "@/pages/Vendors";
import Menu from "@/pages/Menu";
import OrderComplete from "@/pages/OrderComplete";
import NotFound from "@/pages/not-found";

import AdminLayout from "@/pages/admin/AdminLayout";
import LiveOrders from "@/pages/admin/LiveOrders";
import AdminVendors from "@/pages/admin/AdminVendors";
import AdminTables from "@/pages/admin/AdminTables";
import AdminMenuItems from "@/pages/admin/AdminMenuItems";
import OrderHistory from "@/pages/admin/OrderHistory";

const queryClient = new QueryClient();

function AdminRoutes() {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={LiveOrders} />
        <Route path="/admin/vendors" component={AdminVendors} />
        <Route path="/admin/tables" component={AdminTables} />
        <Route path="/admin/menu" component={AdminMenuItems} />
        <Route path="/admin/history" component={OrderHistory} />
      </Switch>
    </AdminLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/vendors" component={Vendors} />
      <Route path="/menu/:vendorId" component={Menu} />
      <Route path="/order-complete" component={OrderComplete} />
      <Route path="/admin/*" component={AdminRoutes} />
      <Route path="/admin" component={AdminRoutes} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StarfieldBackground />
        <div className="relative z-10">
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
