import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, Layers, Tag, TrendingUp, Clock, Plus, ArrowRight } from "lucide-react";
import { formatPrice, formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getStats() {
  const [categories, brands, products, recentPrices, enquiries] = await Promise.all([
    prisma.category.count(),
    prisma.brand.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: { lastUpdated: "desc" },
      take: 8,
      include: { category: { select: { name: true } }, brand: { select: { name: true } } },
    }),
    prisma.enquiry.count({ where: { status: "new" } }),
  ]);
  return { categories, brands, products, recentPrices, enquiries };
}

export default async function AdminDashboard() {
  const { categories, brands, products, recentPrices, enquiries } = await getStats();

  const stats = [
    { label: "Categories", value: categories, icon: Layers, color: "#2b7a8c", bg: "#edf6f8", href: "/admin/categories" },
    { label: "Active Products", value: products, icon: Package, color: "#c8972a", bg: "#fdf5e6", href: "/admin/products" },
    { label: "Brands", value: brands, icon: Tag, color: "#2d7a4f", bg: "#e8f5ee", href: "/admin/brands" },
    { label: "New Enquiries", value: enquiries, icon: TrendingUp, color: "#a63228", bg: "#fef2f2", href: "#" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129" }}>Dashboard Overview</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Manage your products, pricing, and content from here.</p>
        </div>
        <Link href="/admin/pricing" className="btn-primary px-5 py-2.5 text-sm">
          <TrendingUp size={15} /> Update Prices
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="sde-card p-5 block">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <ArrowRight size={14} style={{ color: "#94a3b8" }} />
            </div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "2rem", fontWeight: 800, color: "#1a2129" }}>{s.value}</div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem" }}>{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 style={{ fontWeight: 700, color: "#1a2129", marginBottom: "1rem", fontSize: "1rem" }}>Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add Product", href: "/admin/products/new", icon: Plus },
            { label: "Update Prices", href: "/admin/pricing", icon: TrendingUp },
            { label: "Add Category", href: "/admin/categories", icon: Layers },
            { label: "Upload Media", href: "/admin/media", icon: Package },
          ].map((a) => (
            <Link key={a.label} href={a.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "#fff", border: "1px solid #e2eaed", color: "#2b7a8c" }}>
              <a.icon size={14} /> {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent price updates */}
      <div className="sde-card overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "#e2eaed", background: "#f9fafb" }}>
          <h2 style={{ fontWeight: 700, color: "#1a2129", fontSize: "1rem" }}>Recently Updated Prices</h2>
          <Link href="/admin/pricing" className="text-xs font-semibold" style={{ color: "#2b7a8c" }}>
            Manage All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th className="text-left">Product</th>
                <th className="text-left">Brand</th>
                <th className="text-left">Category</th>
                <th className="text-right">Current Price</th>
                <th className="text-left">Last Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentPrices.map((p) => (
                <tr key={p.id}>
                  <td className="font-medium" style={{ color: "#1a2129" }}>{p.name}</td>
                  <td style={{ color: "#4a5568", fontSize: "0.85rem" }}>{p.brand?.name || "—"}</td>
                  <td><span className="badge-primary">{p.category.name}</span></td>
                  <td className="text-right font-bold" style={{ color: "#2b7a8c" }}>
                    {p.currentPrice ? formatPrice(Number(p.currentPrice)) : "—"}
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    <div className="flex items-center gap-1"><Clock size={11} /> {formatDateTime(p.lastUpdated)}</div>
                  </td>
                  <td>
                    <Link href={`/admin/products/${p.id}`} className="text-xs font-semibold" style={{ color: "#2b7a8c" }}>Edit</Link>
                  </td>
                </tr>
              ))}
              {recentPrices.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8" style={{ color: "#94a3b8" }}>No products yet. Add products to get started.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
