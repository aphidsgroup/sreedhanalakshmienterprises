"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

interface Category { id: string; name: string; }
interface FAQ {
  id: string;
  question: string;
  answer: string;
  page: string;
  sortOrder: number;
  isActive: boolean;
  categoryId?: string | null;
  category?: { name: string } | null;
}

export default function AdminContentPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Partial<FAQ> | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [faqRes, catRes] = await Promise.all([
        fetch("/api/faqs"),
        fetch("/api/categories")
      ]);
      setFaqs(await faqRes.json());
      setCategories(await catRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleOpenModal = (faq?: FAQ) => {
    if (faq) {
      setCurrentFaq(faq);
    } else {
      setCurrentFaq({ isActive: true, sortOrder: 0, page: "general" });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = currentFaq?.id ? "PATCH" : "POST";
      const url = currentFaq?.id ? `/api/faqs/${currentFaq.id}` : "/api/faqs";
      
      const payload = {
        ...currentFaq,
        sortOrder: Number(currentFaq?.sortOrder || 0),
        isActive: Boolean(currentFaq?.isActive ?? true),
        categoryId: currentFaq?.categoryId || null
      };

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to save FAQ.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129" }}>Content CMS</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Manage FAQs displayed on category pricing pages.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      <div className="sde-card overflow-hidden">
        <table className="w-full data-table text-sm">
          <thead>
            <tr>
              <th className="w-16">Order</th>
              <th>Question</th>
              <th>Category</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr> : faqs.map((f) => (
              <tr key={f.id}>
                <td className="font-semibold text-gray-600">#{f.sortOrder}</td>
                <td>
                  <div className="font-semibold text-gray-900 mb-1">{f.question}</div>
                  <div className="text-gray-500 text-xs truncate max-w-[400px]">{f.answer}</div>
                </td>
                <td>
                  {f.category ? (
                    <span className="badge-primary">{f.category.name}</span>
                  ) : (
                    <span className="badge-primary bg-gray-100 text-gray-600">General</span>
                  )}
                </td>
                <td>
                  {f.isActive ? <span className="text-green-600 font-semibold text-xs">Active</span> : <span className="text-gray-400 font-semibold text-xs">Inactive</span>}
                </td>
                <td>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => handleOpenModal(f)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(f.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && faqs.length === 0 && (
              <tr><td colSpan={5} className="text-center py-8 text-gray-500">No FAQs found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold">{currentFaq?.id ? "Edit FAQ" : "Add New FAQ"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black"><X size={20} /></button>
            </div>
            
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <form id="faqForm" onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1">Question *</label>
                    <input required value={currentFaq?.question || ""} onChange={e => setCurrentFaq({...currentFaq, question: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1">Answer *</label>
                    <textarea required value={currentFaq?.answer || ""} onChange={e => setCurrentFaq({...currentFaq, answer: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm h-32 resize-none" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold mb-1">Category (Optional)</label>
                    <select value={currentFaq?.categoryId || ""} onChange={e => setCurrentFaq({...currentFaq, categoryId: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm">
                      <option value="">General (All pages)</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold mb-1">Display Order</label>
                    <input type="number" value={currentFaq?.sortOrder ?? 0} onChange={e => setCurrentFaq({...currentFaq, sortOrder: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-center gap-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="isActive"
                      checked={currentFaq?.isActive ?? true} 
                      onChange={e => setCurrentFaq({...currentFaq, isActive: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-[#2b7a8c] focus:ring-[#2b7a8c]"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700 select-none">Active</label>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline px-4 py-2">Cancel</button>
              <button type="submit" form="faqForm" disabled={isSaving} className="btn-primary px-4 py-2">
                {isSaving ? "Saving..." : "Save FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
