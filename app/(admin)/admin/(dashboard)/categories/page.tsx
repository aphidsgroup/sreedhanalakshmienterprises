"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  _count?: { products: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      setCategories(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setCurrentCategory(category);
    } else {
      setCurrentCategory({ isActive: true, sortOrder: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = currentCategory?.id ? "PATCH" : "POST";
      const url = currentCategory?.id ? `/api/categories/${currentCategory.id}` : "/api/categories";
      
      const payload = {
        ...currentCategory,
        sortOrder: Number(currentCategory?.sortOrder || 0),
        isActive: Boolean(currentCategory?.isActive ?? true),
        slug: currentCategory?.slug || currentCategory?.name?.toLowerCase().replace(/ /g, "-"),
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
      alert("Failed to save category.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, productCount: number = 0) => {
    if (productCount > 0) {
      alert(`Cannot delete category because it has ${productCount} products. Please reassign or delete the products first.`);
      return;
    }
    if (confirm("Are you sure you want to delete this category?")) {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129" }}>Categories CMS</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Manage top-level material categories.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="sde-card overflow-hidden">
        <table className="w-full data-table text-sm">
          <thead>
            <tr>
              <th>Order</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Products</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={7} className="text-center py-8">Loading...</td></tr> : categories.map((c) => (
              <tr key={c.id}>
                <td className="font-semibold text-gray-600">#{c.sortOrder}</td>
                <td className="font-semibold text-gray-900">{c.name}</td>
                <td className="text-gray-500">{c.slug}</td>
                <td className="text-gray-500 max-w-[200px] truncate">{c.description || "—"}</td>
                <td><span className="badge-primary">{c._count?.products || 0}</span></td>
                <td>
                  {c.isActive ? <span className="text-green-600 font-semibold text-xs">Active</span> : <span className="text-gray-400 font-semibold text-xs">Inactive</span>}
                </td>
                <td>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => handleOpenModal(c)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(c.id, c._count?.products)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && categories.length === 0 && (
              <tr><td colSpan={7} className="text-center py-8 text-gray-500">No categories found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold">{currentCategory?.id ? "Edit Category" : "Add New Category"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black"><X size={20} /></button>
            </div>
            
            <div className="p-5">
              <form id="categoryForm" onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Name *</label>
                  <input required value={currentCategory?.name || ""} onChange={e => setCurrentCategory({...currentCategory, name: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Slug *</label>
                  <input required value={currentCategory?.slug || ""} onChange={e => setCurrentCategory({...currentCategory, slug: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Description</label>
                  <textarea value={currentCategory?.description || ""} onChange={e => setCurrentCategory({...currentCategory, description: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm h-24 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Display Order</label>
                    <input type="number" value={currentCategory?.sortOrder ?? 0} onChange={e => setCurrentCategory({...currentCategory, sortOrder: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input 
                      type="checkbox" 
                      id="isActive"
                      checked={currentCategory?.isActive ?? true} 
                      onChange={e => setCurrentCategory({...currentCategory, isActive: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-[#2b7a8c] focus:ring-[#2b7a8c]"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700 select-none">Active</label>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline px-4 py-2">Cancel</button>
              <button type="submit" form="categoryForm" disabled={isSaving} className="btn-primary px-4 py-2">
                {isSaving ? "Saving..." : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
