"use client";
import { useState, useEffect, useCallback } from "react";
import { Trash2, Copy, Check } from "lucide-react";
import Image from "next/image";

interface MediaAsset {
  id: string;
  publicId: string;
  secureUrl: string;
  altText?: string;
  folder?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      setAssets(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image? It will be permanently removed from the cloud storage. If this image is still used by a product or brand, it will break their display.")) {
      try {
        await fetch(`/api/media/${id}`, { method: "DELETE" });
        fetchData();
      } catch (err) {
        console.error(err);
        alert("Failed to delete media asset.");
      }
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatBytes = (bytes?: number) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129" }}>Media CMS</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>View and manage all uploaded images across the site.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading media assets...</div>
      ) : assets.length === 0 ? (
        <div className="sde-card text-center py-12 text-gray-500">
          No media assets found. Upload images through the Products or Brands CMS to see them here.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {assets.map((asset) => (
            <div key={asset.id} className="sde-card overflow-hidden group flex flex-col">
              <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-2 border-b border-gray-100">
                <Image 
                  src={asset.secureUrl} 
                  alt={asset.altText || "Media asset"} 
                  fill 
                  className="object-contain" 
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                  <button 
                    onClick={() => handleCopy(asset.secureUrl, asset.id)}
                    className="p-2 bg-white text-[#2b7a8c] rounded-full hover:bg-gray-100 shadow-sm"
                    title="Copy URL"
                  >
                    {copiedId === asset.id ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  </button>
                  <button 
                    onClick={() => handleDelete(asset.id)}
                    className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 shadow-sm"
                    title="Delete permanently"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-white">
                <div className="text-xs font-semibold text-gray-800 truncate" title={asset.publicId}>
                  {asset.publicId.split('/').pop()}
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500">
                  <span className="uppercase">{asset.format || "img"}</span>
                  <span>{formatBytes(asset.bytes)}</span>
                </div>
                {asset.folder && (
                  <div className="mt-1.5 inline-block px-1.5 py-0.5 bg-gray-100 rounded text-[9px] text-gray-600 font-medium">
                    {asset.folder}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
