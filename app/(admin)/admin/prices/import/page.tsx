import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CsvImport from "./CsvImport";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ImportPricesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Link href="/admin/prices" className="text-sm text-gray-500 hover:text-gray-900 inline-flex items-center gap-1 mb-4">
          <ArrowLeft size={16} /> Back to Price Management
        </Link>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>Import Prices (CSV)</h1>
        <p className="text-sm text-gray-500 mt-1">Upload a CSV file to generate pending price suggestions safely.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-2">CSV Format Requirements</h3>
        <p className="text-sm text-gray-600 mb-4">Your CSV file must have the following headers exactly as shown:</p>
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 font-mono border border-gray-200 mb-6">
          category, productName, specification, unit, price, priceType, sourceName, notes, date
        </div>
        
        <ul className="text-sm text-gray-600 space-y-2 mb-6 list-disc pl-5">
          <li><b>category</b>: Must match the category slug (e.g., "cement", "steel", "sand-and-aggregates")</li>
          <li><b>productName</b>: Must match the exact product name in the database.</li>
          <li><b>priceType</b>: "fixed", "range", "starting_from", or "call_for_price".</li>
          <li><b>price</b>: Only numeric values allowed.</li>
        </ul>

        <CsvImport />
      </div>
    </div>
  );
}
