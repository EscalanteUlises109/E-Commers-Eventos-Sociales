import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventSelection from "./pages/EventSelection";
import EventosInfantiles from "./pages/EventosInfantiles";
import EventosFormales from "./pages/EventosFormales";
import EventosCorporativos from "./pages/EventosCorporativos";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EventSelection />} />
          <Route path="/eventos-infantiles" element={<EventosInfantiles />} />
          <Route path="/eventos-formales" element={<EventosFormales />} />
          <Route path="/eventos-corporativos" element={<EventosCorporativos />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
