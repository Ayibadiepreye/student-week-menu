import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/admin", label: "Live Orders" },
    { href: "/admin/vendors", label: "Vendors" },
    { href: "/admin/tables", label: "Tables" },
    { href: "/admin/menu", label: "Menu Items" },
    { href: "/admin/history", label: "Order History" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background">
      <aside className="w-full md:w-64 border-b md:border-r border-primary/20 bg-card/50 backdrop-blur-md flex-shrink-0 md:h-[100dvh] md:sticky md:top-0">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-xs text-primary mt-1">Students Week 2026</p>
        </div>
        <nav className="px-4 pb-4 md:pb-0 flex overflow-x-auto md:flex-col gap-2 md:overflow-visible">
          {navItems.map(item => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto z-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
