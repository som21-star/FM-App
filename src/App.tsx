import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { FrequencyWaveBackground } from "@/components/FrequencyWaveBackground";
import Index from "./pages/Index";
import Favorites from "./pages/Favorites";
import Regions from "./pages/Regions";
import { BottomNav } from "@/components/BottomNav";
import Premium from "./pages/Premium";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <PlayerProvider>
          <FrequencyWaveBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Toaster />
            <Sonner />
            <HashRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/regions" element={<Regions />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <BottomNav />
            </HashRouter>
          </div>
        </PlayerProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
