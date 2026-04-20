import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LenisProvider } from "@/context/LenisContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// About
import About from "./pages/About";
import Story from "./pages/about/Story";
import Team from "./pages/about/Team";
import Impact from "./pages/about/Impact";
import Legal from "./pages/about/Legal";

// Maverick
import Maverick from "./pages/Maverick";
import Apply from "./pages/maverick/Apply";
import Investors from "./pages/maverick/Investors";
import Alumni from "./pages/maverick/Alumni";
import CaseStudy from "./pages/maverick/CaseStudy";

// Ecosystem & Portfolio
import Ecosystem from "./pages/Ecosystem";
import Portfolio from "./pages/Portfolio";

// Space
import Space from "./pages/Space";

// Insights
import Insights from "./pages/Insights";
import Events from "./pages/insights/Events";
import Coffee from "./pages/insights/Coffee";
import Press from "./pages/insights/Press";
import Knowledge from "./pages/insights/Knowledge";

// Contact
import Contact from "./pages/Contact";
import ApplyContact from "./pages/contact/ApplyContact";
import Partner from "./pages/contact/Partner";
import BookVisit from "./pages/contact/BookVisit";
import MediaContact from "./pages/contact/Media";

// Other
import FAQ from "./pages/FAQ";
import SitemapPage from "./pages/Sitemap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LenisProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* About */}
          <Route path="/about" element={<About />} />
          <Route path="/about/story" element={<Story />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/impact" element={<Impact />} />
          <Route path="/about/impact/annual-report-2024" element={<Impact />} />
          <Route path="/about/legal" element={<Legal />} />

          {/* Maverick Pont */}
          <Route path="/maverick" element={<Maverick />} />
          <Route path="/maverick/overview" element={<Maverick />} />
          <Route path="/maverick/apply" element={<Apply />} />
          <Route path="/maverick/investors" element={<Investors />} />
          <Route path="/maverick/alumni" element={<Alumni />} />
          <Route path="/maverick/alumni/:slug" element={<CaseStudy />} />

          {/* Ecosystem */}
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/ecosystem/startups" element={<Ecosystem />} />
          <Route path="/ecosystem/institutions" element={<Ecosystem />} />
          <Route path="/ecosystem/investors" element={<Ecosystem />} />
          <Route path="/ecosystem/trainings" element={<Ecosystem />} />

          {/* Portfolio */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/incubatees" element={<Portfolio />} />
          <Route path="/portfolio/associates" element={<Portfolio />} />

          {/* Space */}
          <Route path="/space" element={<Space />} />
          <Route path="/space/worksmith" element={<Space />} />
          <Route path="/space/collaborative" element={<Space />} />
          <Route path="/space/nexus" element={<Space />} />

          {/* Insights */}
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/events" element={<Events />} />
          <Route path="/insights/coffee" element={<Coffee />} />
          <Route path="/insights/press" element={<Press />} />
          <Route path="/insights/knowledge" element={<Knowledge />} />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/apply" element={<ApplyContact />} />
          <Route path="/contact/partner" element={<Partner />} />
          <Route path="/contact/book-visit" element={<BookVisit />} />
          <Route path="/contact/media" element={<MediaContact />} />

          {/* FAQ & Sitemap */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sitemap" element={<SitemapPage />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </LenisProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
