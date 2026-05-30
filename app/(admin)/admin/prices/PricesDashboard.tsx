"use client";

import { useState } from "react";
import { approveSuggestion, rejectSuggestion, editAndApproveSuggestion, markCallForPrice } from "./actions";
import { Check, X, Edit, PhoneCall, AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function PricesDashboard({ initialSuggestions, products }: { initialSuggestions: any[], products: any[] }) {
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setLoading(id);
    try {
      await approveSuggestion(id);
    } catch (e) {
      alert("Error approving suggestion");
    }
    setLoading(null);
  };

  const handleReject = async (id: string) => {
    setLoading(id);
    try {
      await rejectSuggestion(id);
    } catch (e) {
      alert("Error rejecting suggestion");
    }
    setLoading(null);
  };

  const handleMarkCallForPrice = async (productId: string) => {
    if (!confirm("Are you sure you want to mark this product as Call for Price?")) return;
    setLoading(productId);
    try {
      await markCallForPrice(productId);
      window.location.reload();
    } catch (e) {
      alert("Error updating product");
    }
    setLoading(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex gap-4 items-center">
        <button 
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "pending" ? "bg-white text-[#2b7a8c] shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
        >
          Pending Suggestions ({initialSuggestions.length})
        </button>
        <button 
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "all" ? "bg-white text-[#2b7a8c] shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
        >
          All Products ({products.length})
        </button>
        <Link 
          href="/admin/prices/import"
          className="ml-auto px-4 py-2 bg-[#2b7a8c] text-white text-sm font-medium rounded-lg hover:bg-[#20606e] transition-colors"
        >
          Import CSV / Sync
        </Link>
      </div>

      <div className="p-0 overflow-x-auto">
        {activeTab === "pending" ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium border-b">Product</th>
                <th className="p-4 font-medium border-b">Current Price</th>
                <th className="p-4 font-medium border-b">Suggested Price</th>
                <th className="p-4 font-medium border-b">Change</th>
                <th className="p-4 font-medium border-b">Source / Reason</th>
                <th className="p-4 font-medium border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {initialSuggestions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No pending price suggestions.</td>
                </tr>
              ) : (
                initialSuggestions.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{s.product.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{s.product.category?.name} {s.product.brand ? `• ${s.product.brand.name}` : ''}</div>
                    </td>
                    <td className="p-4 text-gray-600">
                      ₹{s.oldPrice || 0} / {s.product.unit}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">₹{s.suggestedPrice} / {s.suggestedUnit || s.product.unit}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{s.suggestedPriceType}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${Number(s.changePercent) > 0 ? 'bg-red-100 text-red-800' : Number(s.changePercent) < 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {Number(s.changePercent) > 0 ? '+' : ''}{s.changePercent}%
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-900">{s.sourceName}</div>
                      <div className="text-xs text-red-500 mt-0.5 flex items-center gap-1">
                        {Math.abs(Number(s.changePercent)) > 5 && <AlertTriangle size={12} />}
                        {s.reason}
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleApprove(s.id)}
                        disabled={loading === s.id}
                        className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors inline-flex items-center"
                        title="Approve"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        onClick={() => handleReject(s.id)}
                        disabled={loading === s.id}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors inline-flex items-center"
                        title="Reject"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium border-b">Product</th>
                <th className="p-4 font-medium border-b">Category</th>
                <th className="p-4 font-medium border-b">Current Price</th>
                <th className="p-4 font-medium border-b">Type</th>
                <th className="p-4 font-medium border-b">Last Updated</th>
                <th className="p-4 font-medium border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{p.brand ? p.brand.name : 'General'}</div>
                  </td>
                  <td className="p-4 text-gray-600">{p.category?.name}</td>
                  <td className="p-4 font-bold text-gray-900">
                    {p.priceType === "call_for_price" ? "Call for Price" : `₹${p.currentPrice || 0} / ${p.unit}`}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {p.priceType}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-xs">
                    {new Date(p.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {p.priceType !== "call_for_price" && (
                      <button 
                        onClick={() => handleMarkCallForPrice(p.id)}
                        disabled={loading === p.id}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <PhoneCall size={12} /> Call for Price
                      </button>
                    )}
                    <Link href={`/admin/products?edit=${p.id}`} className="px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5">
                      <Edit size={12} /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
