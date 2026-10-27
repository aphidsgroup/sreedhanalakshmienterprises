"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from "lucide-react";

interface Category { id: string; name: string; }
interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  categoryId: string;
  category: { name: string };
  _count?: { products: number };
}

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Partial<Brand> | null>(null);
  
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [brandRes, catRes] = await Promise.all([
        fetch("/api/brands"),
        fetch("/api/categories")
      ]);
      setBrands(await brandRes.json());
      setCategories(await catRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleOpenModal = (brand?: Brand) => {
    if (brand) {
      setCurrentBrand(brand);
      setImagePreview(brand.logoUrl || null);
    } else {
      setCurrentBrand({ isActive: true, sortOrder: 0 });
      setImagePreview(null);
    }
    setSelectedImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let logoUrl = currentBrand?.logoUrl;

      // Upload new image if selected
      if (selectedImageFile) {
        const formData = new FormData();
        formData.append("file", selectedImageFile);
        formData.append("folder", "sde/brands");
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        logoUrl = uploadData.secureUrl;
      }

      const method = currentBrand?.id ? "PATCH" : "POST";
      const url = currentBrand?.id ? `/api/brands/${currentBrand.id}` : "/api/brands";
      
      const payload = {
        ...currentBrand,
        sortOrder: Number(currentBrand?.sortOrder || 0),
        isActive: Boolean(currentBrand?.isActive ?? true),
        slug: currentBrand?.slug || currentBrand?.name?.toLowerCase().replace(/ /g, "-"),
        logoUrl
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
      alert("Failed to save brand.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, productCount: number = 0) => {
    if (productCount > 0) {
      alert(`Cannot delete brand because it is assigned to ${productCount} products.`);
      return;
    }
    if (confirm("Are you sure you want to delete this brand?")) {
      await fetch(`/api/brands/${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129" }}>Brands CMS</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Manage manufacturer brands and logos.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus size={16} /> Add Brand
        </button>
      </div>

      <div className="sde-card overflow-hidden">
        <table className="w-full data-table text-sm">
          <thead>
            <tr>
              <th className="w-16">Logo</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Products</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={7} className="text-center py-8">Loading...</td></tr> : brands.map((b) => (
              <tr key={b.id}>
                <td>
                  <div className="w-10 h-10 rounded border bg-white flex items-center justify-center p-1">
                    {b.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.logoUrl} alt={b.name} className="max-w-full max-h-full object-contain" />
                    ) : <ImageIcon size={16} className="text-gray-400" />}
                  </div>
                </td>
                <td className="font-semibold text-gray-900">{b.name}</td>
                <td><span className="badge-primary">{b.category?.name || "Unknown"}</span></td>
                <td className="text-gray-500 max-w-[200px] truncate">{b.description || "—"}</td>
                <td><span className="badge-primary bg-gray-100 text-gray-700">{b._count?.products || 0}</span></td>
                <td>
                  {b.isActive ? <span className="text-green-600 font-semibold text-xs">Active</span> : <span className="text-gray-400 font-semibold text-xs">Inactive</span>}
                </td>
                <td>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => handleOpenModal(b)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(b.id, b._count?.products)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && brands.length === 0 && (
              <tr><td colSpan={7} className="text-center py-8 text-gray-500">No brands found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold">{currentBrand?.id ? "Edit Brand" : "Add New Brand"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black"><X size={20} /></button>
            </div>
            
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <form id="brandForm" onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold mb-1">Name *</label>
                    <input required value={currentBrand?.name || ""} onChange={e => setCurrentBrand({...currentBrand, name: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold mb-1">Slug *</label>
                    <input required value={currentBrand?.slug || ""} onChange={e => setCurrentBrand({...currentBrand, slug: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1">Category *</label>
                    <select required value={currentBrand?.categoryId || ""} onChange={e => setCurrentBrand({...currentBrand, categoryId: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm">
                      <option value="">Select Category...</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1">Description</label>
                    <textarea value={currentBrand?.description || ""} onChange={e => setCurrentBrand({...currentBrand, description: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm h-20 resize-none" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold mb-1">Display Order</label>
                    <input type="number" value={currentBrand?.sortOrder ?? 0} onChange={e => setCurrentBrand({...currentBrand, sortOrder: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-center gap-2 pt-6">
                    <input 
                      type="checkbox" 
                      id="isActive"
                      checked={currentBrand?.isActive ?? true} 
                      onChange={e => setCurrentBrand({...currentBrand, isActive: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-[#2b7a8c] focus:ring-[#2b7a8c]"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700 select-none">Active</label>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <label className="block text-sm font-semibold mb-2">Brand Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-16 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden relative">
                      {imagePreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-1" />
                      ) : (
                        <ImageIcon className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-outline text-xs px-3 py-1.5">
                        Choose Logo...
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline px-4 py-2">Cancel</button>
              <button type="submit" form="brandForm" disabled={isSaving} className="btn-primary px-4 py-2">
                {isSaving ? "Saving..." : "Save Brand"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
