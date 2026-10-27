"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: string;
  label?: string;
  type: string;
  updatedAt: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentSetting, setCurrentSetting] = useState<Partial<Setting> | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      setSettings(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleOpenModal = (setting?: Setting) => {
    if (setting) {
      setCurrentSetting(setting);
    } else {
      setCurrentSetting({ type: "text" });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = currentSetting?.id ? "PATCH" : "POST";
      const url = currentSetting?.id ? `/api/settings/${currentSetting.id}` : "/api/settings";
      
      const payload = {
        ...currentSetting,
        key: currentSetting?.key?.toUpperCase().replace(/ /g, "_"),
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
      alert("Failed to save setting.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this setting? Application features depending on this key might fail.")) {
      await fetch(`/api/settings/${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129" }}>Settings CMS</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Manage dynamic configuration variables and business details.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus size={16} /> Add Setting
        </button>
      </div>

      <div className="sde-card overflow-hidden">
        <table className="w-full data-table text-sm">
          <thead>
            <tr>
              <th>Key</th>
              <th>Label</th>
              <th>Value</th>
              <th>Type</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr> : settings.map((s) => (
              <tr key={s.id}>
                <td className="font-semibold text-gray-900 font-mono text-xs bg-gray-50 px-2 py-1 rounded inline-block mt-2 ml-4 mb-2">{s.key}</td>
                <td className="font-medium text-gray-700">{s.label || "—"}</td>
                <td className="text-gray-500 max-w-[300px] truncate">{s.value}</td>
                <td><span className="badge-primary bg-gray-100 text-gray-600 uppercase text-[10px]">{s.type}</span></td>
                <td>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => handleOpenModal(s)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && settings.length === 0 && (
              <tr><td colSpan={5} className="text-center py-8 text-gray-500">No settings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold">{currentSetting?.id ? "Edit Setting" : "Add New Setting"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black"><X size={20} /></button>
            </div>
            
            <div className="p-5">
              <form id="settingForm" onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Key (e.g. CONTACT_PHONE) *</label>
                  <input required value={currentSetting?.key || ""} onChange={e => setCurrentSetting({...currentSetting, key: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm font-mono uppercase" placeholder="UPPERCASE_WITH_UNDERSCORES" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Friendly Label</label>
                  <input value={currentSetting?.label || ""} onChange={e => setCurrentSetting({...currentSetting, label: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" placeholder="e.g. Primary Contact Phone" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold mb-1">Input Type</label>
                    <select required value={currentSetting?.type || "text"} onChange={e => setCurrentSetting({...currentSetting, type: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm">
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="boolean">Boolean (true/false)</option>
                      <option value="textarea">Long Text</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Value *</label>
                  {currentSetting?.type === "textarea" ? (
                    <textarea required value={currentSetting?.value || ""} onChange={e => setCurrentSetting({...currentSetting, value: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm h-24 resize-none" />
                  ) : currentSetting?.type === "boolean" ? (
                    <select required value={currentSetting?.value || "false"} onChange={e => setCurrentSetting({...currentSetting, value: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm">
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  ) : (
                    <input required type={currentSetting?.type === "number" ? "number" : "text"} value={currentSetting?.value || ""} onChange={e => setCurrentSetting({...currentSetting, value: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none text-sm" />
                  )}
                </div>
              </form>
            </div>
            
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline px-4 py-2">Cancel</button>
              <button type="submit" form="settingForm" disabled={isSaving} className="btn-primary px-4 py-2">
                {isSaving ? "Saving..." : "Save Setting"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
