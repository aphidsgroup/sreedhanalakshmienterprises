"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Category { id: string; name: string; slug: string; }
interface Brand { id: string; name: string; }
interface ProductImage { secureUrl: string; publicId: string; }
interface Product {
  id: string;
  name: string;
  slug: string;
  specification?: string;
  unit: string;
  currentPrice?: number;
  remarks?: string;
  categoryId: string;
  brandId?: string;
  category: { name: string };
  brand?: { name: string };
  images: ProductImage[];
  isFeatured: boolean;
  displayOrder: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [prodRes, catRes, brandRes] = await Promise.all([
      fetch(`/api/products${categoryFilter !== "all" ? `?category=${categoryFilter}` : ""}`),
      fetch("/api/categories"),
      fetch("/api/brands")
    ]);
    const prodData = await prodRes.json();
    // Sort by displayOrder then category then name
    setProducts(prodData);
    setCategories(await catRes.json());
    setBrands(await brandRes.json());
    setLoading(false);
  }, [categoryFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.brand?.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
      setImagePreview(product.images?.[0]?.secureUrl || null);
    } else {
      setCurrentProduct({ unit: "bag", isFeatured: false, displayOrder: 0 });
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
      let imagePublicId = undefined;
      let imageSecureUrl = undefined;

      // 1. Upload image if selected
      if (selectedImageFile) {
        const formData = new FormData();
        formData.append("file", selectedImageFile);
        formData.append("folder", "sde/products");
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        imagePublicId = uploadData.publicId;
        imageSecureUrl = uploadData.secureUrl;
      }

      // 2. Save product
      const method = currentProduct?.id ? "PATCH" : "POST";
      const url = currentProduct?.id ? `/api/products/${currentProduct.id}` : "/api/products";
      
      const payload = {
        ...currentProduct,
        currentPrice: currentProduct?.currentPrice ? Number(currentProduct.currentPrice) : null,
        displayOrder: Number(currentProduct?.displayOrder || 0),
        isFeatured: Boolean(currentProduct?.isFeatured),
        slug: currentProduct?.slug || currentProduct?.name?.toLowerCase().replace(/ /g, "-"),
        imagePublicId,
        imageSecureUrl
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
      alert("Failed to save product.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129" }}>Products CMS</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Manage products, upload images, and control homepage display.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="sde-card p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border outline-none text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setCategoryFilter("all")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${categoryFilter === "all" ? "bg-[#2b7a8c] text-white" : "bg-gray-100 text-gray-600"}`}>All</button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setCategoryFilter(c.slug)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${categoryFilter === c.slug ? "bg-[#2b7a8c] text-white" : "bg-gray-100 text-gray-600"}`}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="sde-card overflow-hidden">
        <table className="w-full data-table text-sm">
          <thead>
            <tr>
              <th className="w-16">Image</th>
              <th>Order</th>
              <th>Product / Brand</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Price</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={7} className="text-center py-8">Loading...</td></tr> : filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="w-10 h-10 rounded border bg-gray-50 flex items-center justify-center overflow-hidden">
                    {p.images?.[0]?.secureUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0].secureUrl} alt={p.name} className="w-full h-full object-contain" />
                    ) : <ImageIcon size={16} className="text-gray-400" />}
                  </div>
                </td>
                <td className="font-semibold text-gray-600">#{p.displayOrder}</td>
                <td>
                  <div className="font-semibold text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.brand?.name}</div>
                </td>
                <td><span className="badge-primary">{p.category.name}</span></td>
                <td>
                  {p.isFeatured ? (
                    <span className="badge-accent text-[10px]">Homepage</span>
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </td>
                <td className="font-medium text-[#2b7a8c]">{p.currentPrice ? formatPrice(p.currentPrice) : "—"}</td>
                <td>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => handleOpenModal(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold">{currentProduct?.id ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black"><X size={20} /></button>
            </div>
            
            <div className="p-5 overflow-y-auto">
              <form id="productForm" onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Name *</label>
                    <input required value={currentProduct?.name || ""} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Slug *</label>
                    <input required value={currentProduct?.slug || ""} onChange={e => setCurrentProduct({...currentProduct, slug: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Category *</label>
                    <select required value={currentProduct?.categoryId || ""} onChange={e => setCurrentProduct({...currentProduct, categoryId: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm">
                      <option value="">Select Category...</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Brand</label>
                    <select value={currentProduct?.brandId || ""} onChange={e => setCurrentProduct({...currentProduct, brandId: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm">
                      <option value="">No Brand</option>
                      {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Specification</label>
                    <input value={currentProduct?.specification || ""} onChange={e => setCurrentProduct({...currentProduct, specification: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Unit *</label>
                    <input required value={currentProduct?.unit || ""} onChange={e => setCurrentProduct({...currentProduct, unit: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Price (₹)</label>
                    <input type="number" step="0.01" value={currentProduct?.currentPrice || ""} onChange={e => setCurrentProduct({...currentProduct, currentPrice: e.target.value ? Number(e.target.value) : undefined})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Display Order (Lower first)</label>
                    <input type="number" value={currentProduct?.displayOrder ?? 0} onChange={e => setCurrentProduct({...currentProduct, displayOrder: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1 text-gray-500">Homepage Visibility</label>
                    <div className="flex items-center gap-2 mt-2">
                      <input 
                        type="checkbox" 
                        id="isFeatured"
                        checked={currentProduct?.isFeatured || false} 
                        onChange={e => setCurrentProduct({...currentProduct, isFeatured: e.target.checked})}
                        className="w-4 h-4 rounded border-gray-300 text-[#2b7a8c] focus:ring-[#2b7a8c]"
                      />
                      <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 select-none">
                        Show in &quot;Today&apos;s Material Prices&quot; section on Homepage
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1">Remarks</label>
                    <input value={currentProduct?.remarks || ""} onChange={e => setCurrentProduct({...currentProduct, remarks: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <label className="block text-sm font-semibold mb-2">Product Image</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden relative">
                      {imagePreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                      ) : (
                        <ImageIcon className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-outline text-xs px-3 py-1.5">
                        Choose Image...
                      </button>
                      <p className="text-xs text-gray-500 mt-1">If no image is uploaded, it will use the static fallback image.</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline px-4 py-2">Cancel</button>
              <button type="submit" form="productForm" disabled={isSaving} className="btn-primary px-4 py-2">
                {isSaving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
