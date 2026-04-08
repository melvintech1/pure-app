import { ReactNode, useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Leaf, User, Moon, Sun } from "lucide-react";

export function AppLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  // --- TAMBAHAN LOGIKA DARK MODE (STATE & EFFECT) ---
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Cek apakah mode gelap sudah aktif sebelumnya
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  // --------------------------------------------------

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4 shrink-0 transition-colors duration-200">
            
            {/* --- BAGIAN KIRI: TRIGGER SIDEBAR & LOGO --- */}
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground tracking-tight hidden sm:inline">PURE</span>
            </div>

            {/* --- BAGIAN KANAN: TOGGLE -> ICON -> NAMA --- */}
            <div className="flex items-center gap-4">
              
              {/* 1. Toggle Dark Mode */}
              <button 
                onClick={toggleDarkMode}
                className="flex items-center justify-center p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>

              {/* 2 & 3. Icon Profile & Nama Akun */}
              {user && (
                <div className="flex items-center gap-2 text-sm">
                  {/* Avatar Kartun Baru */}
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                    alt="Profile Avatar" 
                    className="h-8 w-8 rounded-full border border-border bg-secondary object-cover"
                  />
                  <span className="hidden sm:inline font-medium text-foreground">{user.name}</span>
                </div>
              )}
            </div>

          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 bg-background text-foreground transition-colors duration-200">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}