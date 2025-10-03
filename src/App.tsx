import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmployeeProvider } from "./contexts/EmployeeContext";
import { Sidebar } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AllEmployees from "./pages/AllEmployees";
import Screening from "./pages/Screening";
import EmployeeManagement from "./pages/EmployeeManagement";
import StartedWork from "./pages/StartedWork";
import Resigned from "./pages/Resigned";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EmployeeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen w-full bg-background">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/all-employees" element={<AllEmployees />} />
                <Route path="/screening" element={<Screening />} />
                <Route path="/management" element={<EmployeeManagement />} />
                <Route path="/started-work" element={<StartedWork />} />
                <Route path="/resigned" element={<Resigned />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </EmployeeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
