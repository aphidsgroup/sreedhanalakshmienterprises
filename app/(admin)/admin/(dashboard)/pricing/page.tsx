"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Search, RefreshCw, TrendingUp, Clock } from "lucide-react";
import { formatPrice, formatDateTime } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  specification?: string;
  unit: string;
  currentPrice?: number;
  lastUpdated: string;
  stockStatus: string;
  isActive: boolean;
  category: { name: string; slug: string };
  brand?: { name: string };
}

export default function AdminPricingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editId, setEditId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editNote, setEditNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const url = categoryFilter !== "all" ? `/api/products?category=${categoryFilter}&active=true` : `/api/products?active=true`;
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }, [categoryFilter]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.name.toLowerCase().includes(search.toLowerCase())
  );

  async function savePrice(id: string) {
    setSaving(true);
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPrice: parseFloat(editPrice), priceNote: editNote }),
    });
    setMessage("✓ Price updated successfully");
    setEditId(null);
    setEditPrice("");
    setEditNote("");
    fetchProducts();
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  }

  const CATEGORIES = ["all", "cement", "steel", "bricks-and-blocks", "sand-and-aggregates"];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129" }}>Pricing Management</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Update today&apos;s material prices. Changes reflect live on the website.</p>
        </div>
        <button onClick={fetchProducts} className="btn-outline px-4 py-2 text-sm">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-lg text-sm font-semibold" style={{ background: "#e8f5ee", color: "#2d7a4f", border: "1px solid #b5dcc8" }}>
          {message}
        </div>
      )}

      {/* Filters */}
      <div className="sde-card p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94a3b8" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm outline-none"
            style={{ border: "1px solid #e2eaed" }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
              style={categoryFilter === c
                ? { background: "#2b7a8c", color: "#fff" }
                : { background: "#f0f4f6", color: "#4a5568" }}
            >
              {c === "all" ? "All" : c.replace(/-/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="sde-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th className="text-left">Product / Brand</th>
                <th className="text-left">Category</th>
                <th className="text-left">Spec / Unit</th>
                <th className="text-right">Current Price</th>
                <th className="text-left">Last Updated</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8" style={{ color: "#94a3b8" }}>Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8" style={{ color: "#94a3b8" }}>No products found.</td></tr>
              ) : filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="font-semibold" style={{ color: "#1a2129" }}>{p.name}</div>
                    {p.brand && <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{p.brand.name}</div>}
                  </td>
                  <td><span className="badge-primary">{p.category.name}</span></td>
                  <td style={{ color: "#4a5568", fontSize: "0.85rem" }}>
                    {p.specification && <div>{p.specification}</div>}
                    <div>per {p.unit}</div>
                  </td>
                  <td className="text-right">
                    {editId === p.id ? (
                      <div className="flex items-center gap-2 justify-end">
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          placeholder="Enter price"
                          className="w-28 px-3 py-1.5 rounded-lg border text-sm text-right outline-none"
                          style={{ border: "1px solid #2b7a8c" }}
                          autoFocus
                        />
                      </div>
                    ) : (
                      <span className="font-bold" style={{ color: "#2b7a8c", fontSize: "1rem" }}>
                        {p.currentPrice ? formatPrice(Number(p.currentPrice)) : <span style={{ color: "#94a3b8" }}>—</span>}
                      </span>
                    )}
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    <div className="flex items-center gap-1"><Clock size={11} /> {formatDateTime(new Date(p.lastUpdated))}</div>
                  </td>
                  <td className="text-center">
                    {editId === p.id ? (
                      <div className="flex flex-col gap-2 items-center">
                        <input
                          type="text"
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          placeholder="Note (optional)"
                          className="w-36 px-2 py-1 rounded-lg border text-xs outline-none"
                          style={{ border: "1px solid #e2eaed" }}
                        />
                        <div className="flex gap-2">
                          <button onClick={() => savePrice(p.id)} disabled={saving} className="btn-primary text-xs px-3 py-1.5">
                            {saving ? "..." : "Save"}
                          </button>
                          <button onClick={() => setEditId(null)} className="btn-outline text-xs px-3 py-1.5">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditId(p.id); setEditPrice(p.currentPrice?.toString() || ""); }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold mx-auto"
                        style={{ background: "#edf6f8", color: "#2b7a8c" }}
                      >
                        <TrendingUp size={12} /> Update
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
