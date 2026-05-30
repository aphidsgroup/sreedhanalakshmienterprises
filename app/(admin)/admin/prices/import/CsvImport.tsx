"use client";

import { useState } from "react";
import { Upload, AlertCircle, CheckCircle } from "lucide-react";
import { importCsv } from "../actions";

export default function CsvImport() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    try {
      const text = await file.text();
      // Simple CSV parser
      const lines = text.split("\n").filter(line => line.trim() !== "");
      const headers = lines[0].split(",").map(h => h.trim());
      
      const rows = lines.slice(1).map(line => {
        const values = line.split(",").map(v => v.trim());
        const rowData: any = {};
        headers.forEach((h, i) => {
          rowData[h] = values[i] || "";
        });
        return rowData;
      });

      const res = await importCsv(rows);
      setResult({ success: true, message: "Import completed successfully.", count: res.count });
    } catch (e) {
      setResult({ success: false, message: "Failed to parse or import CSV. Please check the format." });
    }
    
    setLoading(false);
  };

  return (
    <div>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange}
          className="hidden" 
          id="csv-upload"
        />
        <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
            <Upload size={24} />
          </div>
          <span className="text-sm font-medium text-gray-900">
            {file ? file.name : "Click to select CSV file"}
          </span>
          <span className="text-xs text-gray-500 mt-1">.csv files only</span>
        </label>
      </div>

      {result && (
        <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          {result.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <div>
            <p className="text-sm font-medium">{result.message}</p>
            {result.success && <p className="text-xs mt-1">Generated {result.count} suggestions.</p>}
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="mt-6 w-full py-3 bg-[#2b7a8c] hover:bg-[#20606e] text-white rounded-lg font-semibold shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing CSV..." : "Process and Generate Suggestions"}
      </button>
    </div>
  );
}
