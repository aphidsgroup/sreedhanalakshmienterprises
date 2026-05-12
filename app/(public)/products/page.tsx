import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Construction Materials — All Products",
  description: "Browse all construction materials: Cement, Steel/TMT Bars, Bricks & Blocks, Sand & Aggregates. All major brands. Best prices in Chennai.",
  path: "/products",
});

export const dynamic = "force-dynamic";

async function getCategoryStats() {
  const cats = await prisma.category.findMany({
    where: { isActive: true },
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });
  return cats;
}

const DESCRIPTIONS: Record<string, string> = {
  cement: "UltraTech, Ramco, Dalmia, ACC, Chettinad, JSW, Ambuja, Bharathi — OPC 43/53, PPC grades. For all structural and masonry work.",
  steel: "Tata Tiscon, JSW Neosteel, Vizag Steel, SAIL — Fe 500D, Fe 550, Fe 600. 8mm to 32mm. MS Angles, Channels, I-Beams.",
  "bricks-and-blocks": "AAC Blocks (4\", 6\", 8\"), Red Bricks, Fly Ash Bricks, Hollow Blocks, Solid Concrete Blocks. All sizes and grades.",
  "sand-and-aggregates": "M-Sand, P-Sand, River Sand, Filling Sand. 12mm, 20mm, 40mm Jelly. Quarry Dust. Bulk supply available.",
};

export default async function ProductsPage() {
  const categories = await getCategoryStats();

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #1e5f6e 0%, #2b7a8c 100%)" }} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily: "Outfit, sans-serif", color: "#fff", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800 }}>
            Construction Materials
          </h1>
          <p style={{ color: "#cde8ed", marginTop: "0.75rem" }}>
            All major brands. Genuine materials. Best prices in Chennai.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => {
            const dbCat = categories.find((c) => c.slug === cat.slug);
            return (
              <div key={cat.slug} className="sde-card p-8">
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{cat.icon}</div>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#1a2129" }}>{cat.name}</h2>
                {dbCat && (
                  <span className="badge-primary text-xs mt-2 inline-block">{dbCat._count.products} products</span>
                )}
                <p style={{ color: "#4a5568", fontSize: "0.9rem", lineHeight: 1.7, marginTop: "0.75rem" }}>
                  {DESCRIPTIONS[cat.slug]}
                </p>
                <div className="flex gap-3 mt-6">
                  <Link href={`/products/${cat.slug}`} className="btn-primary text-sm px-5 py-2.5">
                    Browse Products <ArrowRight size={14} />
                  </Link>
                  <Link href={`/${cat.priceSlug}`} className="btn-outline text-sm px-5 py-2.5">
                    Today&apos;s Price
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
