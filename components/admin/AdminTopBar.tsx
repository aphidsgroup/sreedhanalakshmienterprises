import { Bell, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Props {
  user: { name?: string | null; email?: string | null };
}

export default function AdminTopBar({ user }: Props) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b" style={{ background: "#fff", borderColor: "#e2eaed", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
        Welcome back, <span style={{ fontWeight: 600, color: "#1a2129" }}>{user?.name || "Admin"}</span>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/" target="_blank" className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background: "#f0f4f6", color: "#2b7a8c", fontWeight: 600 }}>
          <ExternalLink size={12} /> View Site
        </Link>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f4f6]">
          <Bell size={16} style={{ color: "#4a5568" }} />
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "#2b7a8c" }}>
          {user?.name?.[0] || "A"}
        </div>
      </div>
    </header>
  );
}
