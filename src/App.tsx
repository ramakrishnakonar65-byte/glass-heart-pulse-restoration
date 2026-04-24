import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LenisProvider } from "@/context/LenisContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// About
import About from "./pages/About";

// Maverick
import Maverick from "./pages/Maverick";
import Apply from "./pages/maverick/Apply";
import Investors from "./pages/maverick/Investors";
import Alumni from "./pages/maverick/Alumni";
import CaseStudy from "./pages/maverick/CaseStudy";

// Ecosystem
import Ecosystem from "./pages/Ecosystem";

// Board
import Board from "./pages/Board";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LenisProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* About */}
            <Route path="/about" element={<About />} />

            {/* Maverick Pont */}
            <Route path="/maverick" element={<Maverick />} />
            <Route path="/maverick/apply" element={<Apply />} />
            <Route path="/maverick/investors" element={<Investors />} />
            <Route path="/maverick/alumni" element={<Alumni />} />
            <Route path="/maverick/alumni/:slug" element={<CaseStudy />} />

            {/* Ecosystem */}
            <Route path="/ecosystem" element={<Ecosystem />} />

            {/* Board */}
            <Route path="/board" element={<Board />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LenisProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
