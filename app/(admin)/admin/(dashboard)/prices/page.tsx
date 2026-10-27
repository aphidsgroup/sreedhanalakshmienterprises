import { prisma } from "@/lib/prisma";
import PricesDashboard from "./PricesDashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PriceManagementPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");

  // Fetch pending suggestions with product details
  const suggestions = await prisma.priceSuggestion.findMany({
    where: { status: "pending" },
    include: { product: { include: { category: true, brand: true } } },
    orderBy: { createdAt: "desc" }
  });

  // Fetch all active products
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true, brand: true },
    orderBy: [{ categoryId: "asc" }, { displayOrder: "asc" }]
  });

  // Calculate summary stats
  const totalProducts = products.length;
  const pendingCount = suggestions.length;
  const largeChanges = suggestions.filter(s => Math.abs(Number(s.changePercent) || 0) > 5).length;
  const callForPriceCount = products.filter(p => p.priceType === "call_for_price").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>Price Management</h1>
          <p className="text-sm text-gray-500 mt-1">Review and approve daily construction material price updates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">Total Products</div>
          <div className="text-2xl font-bold text-gray-900">{totalProducts}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-orange-500">
          <div className="text-sm font-medium text-gray-500 mb-1">Pending Suggestions</div>
          <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-red-500">
          <div className="text-sm font-medium text-gray-500 mb-1">Large Changes</div>
          <div className="text-2xl font-bold text-red-600">{largeChanges}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
          <div className="text-sm font-medium text-gray-500 mb-1">Call for Price</div>
          <div className="text-2xl font-bold text-blue-600">{callForPriceCount}</div>
        </div>
      </div>

      <PricesDashboard 
        initialSuggestions={JSON.parse(JSON.stringify(suggestions))} 
        products={JSON.parse(JSON.stringify(products))} 
      />
    </div>
  );
}
