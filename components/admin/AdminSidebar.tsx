"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Tag, Layers, Package, TrendingUp,
  FileText, Image, Settings, LogOut, ChevronRight,
} from "lucide-react";
import { signOut } from "next-auth/react";

const NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Categories", href: "/admin/categories", icon: Layers },
  { label: "Brands", href: "/admin/brands", icon: Tag },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Pricing", href: "/admin/pricing", icon: TrendingUp },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="admin-sidebar flex flex-col" style={{ minWidth: 240, maxWidth: 240 }}>
      {/* Brand */}
      <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div style={{ color: "#fff", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>SDE Admin</div>
        <div style={{ color: "#3d9aaf", fontSize: "0.72rem", letterSpacing: "0.08em", marginTop: "0.1rem" }}>Sree Dhanalakshmi Enterprises</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={isActive ? "active" : ""}
              style={isActive ? { background: "rgba(43,122,140,0.3)", color: "#fff" } : {}}
            >
              <Icon size={17} />
              <span>{label}</span>
              {isActive && <ChevronRight size={13} className="ml-auto" style={{ color: "#3d9aaf" }} />}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm hover:bg-red-900/30 transition-colors"
          style={{ color: "#94a3b8" }}
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
