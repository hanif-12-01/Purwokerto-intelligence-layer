import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Eye, HelpCircle, Info, Landmark, LayoutDashboard, LockKeyhole, Menu, SlidersHorizontal, X, ShieldCheck, MapPinned, MessagesSquare } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const govNavItems = [
  { name: "Dasbor", path: "/dashboard", icon: LayoutDashboard },
  { name: "Tinjau Sinyal", path: "/signal-review", icon: ShieldCheck },
  { name: "Metodologi", path: "/methodology", icon: HelpCircle },
  { name: "Simulator", path: "/simulator", icon: SlidersHorizontal },
  { name: "Defensive Lab", path: "/security-lab", icon: LockKeyhole },
  { name: "Transparansi", path: "/transparency", icon: Eye },
  { name: "Tentang", path: "/about", icon: Info },
];

const publicNavItems = [
  { name: "Portal Publik", path: "/public", icon: Landmark },
  { name: "Peta Prioritas", path: "/public/map", icon: MapPinned },
  { name: "Kirim Umpan Balik", path: "/public/feedback", icon: MessagesSquare },
  { name: "Transparansi", path: "/public/transparency", icon: Eye },
  { name: "Metodologi", path: "/public/methodology", icon: HelpCircle },
  { name: "Tentang", path: "/public/about", icon: Info },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isPublic = location.pathname.startsWith("/public") || location.pathname === "/";
  const isLandingPage = location.pathname === "/" || location.pathname === "/public" || location.pathname === "/public/";
  const currentNavItems = isPublic ? publicNavItems : govNavItems;
  const homePath = isPublic ? "/public" : "/dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F8F3E8] via-[#F4E7C5]/30 to-[#E8F2E8]/60 text-slate-950 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {!isLandingPage && (
        <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 sm:h-18">
              <div className="flex items-center">
                <Link to={homePath} className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 text-amber-400 shadow-sm">
                    <Landmark className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-950 leading-tight">
                      Purwokerto Intelligence Layer
                    </span>
                    <span className="text-[10px] font-bold text-emerald-850/80 uppercase tracking-widest leading-none hidden sm:inline">
                      {isPublic ? "Portal Publik Warga" : "Workspace Pemerintah"}
                    </span>
                  </div>
                </Link>
              </div>
              
              <div className="hidden lg:flex items-center gap-6">
                <nav className="flex items-center gap-1">
                  {currentNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100"
                            : "text-slate-650 hover:bg-stone-50 hover:text-slate-950"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>

                <Link
                  to={isPublic ? "/dashboard" : "/public"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-850 hover:bg-emerald-950 text-white px-4.5 py-2 text-sm font-bold shadow-sm transition"
                >
                  {isPublic ? "Workspace Pemda" : "Portal Publik"}
                </Link>
              </div>

              <div className="flex items-center lg:hidden gap-2">
                <Link
                  to={isPublic ? "/dashboard" : "/public"}
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-800 text-white px-3 py-1.5 text-xs font-bold shadow-sm transition"
                >
                  {isPublic ? "Workspace" : "Publik"}
                </Link>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center rounded-xl p-2 text-slate-650 hover:bg-stone-100 hover:text-slate-900 focus:outline-none"
                  aria-label="Toggle Menu"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="lg:hidden border-t border-stone-100 bg-white/95 shadow-lg">
              <div className="px-4 py-3 space-y-2">
                {currentNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100"
                          : "text-slate-650 hover:bg-stone-50 hover:text-slate-950"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </header>
      )}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">{children}</div>
      </main>
      <footer className="border-t border-amber-100/80 bg-white/70 py-6 backdrop-blur">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-3 px-4 text-center text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 Purwokerto Intelligence Layer. Prototipe edukasi intelijen publik.</p>
          <p className="inline-flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-amber-600" /> Data simulasi. Bukan platform resmi pemerintah.
          </p>
        </div>
      </footer>
    </div>
  );
};
