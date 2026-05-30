import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const THRESHOLDS: Record<string, number> = {
  "cement": 5,
  "steel-tmt-bars": 7,
  "sand-and-aggregates": 10,
  "bricks-and-blocks": 8,
  "fabrication-materials": 7
};

async function main() {
  console.log("Starting Daily Price Suggestion Generation...");

  // Get active products
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true }
  });

  let generatedCount = 0;

  for (const product of products) {
    // Look for the latest unprocessed observation for this product in the last 24h
    const recentObservation = await prisma.priceObservation.findFirst({
      where: {
        productId: product.id,
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      },
      orderBy: { createdAt: "desc" }
    });

    if (!recentObservation || !recentObservation.observedPrice) continue;

    const currentPrice = Number(product.currentPrice) || 0;
    const newPrice = Number(recentObservation.observedPrice);

    // Calculate percentage change
    let changePercent = 0;
    if (currentPrice > 0 && newPrice > 0) {
      changePercent = ((newPrice - currentPrice) / currentPrice) * 100;
    }

    // Determine if abnormal
    const categorySlug = product.category.slug;
    const threshold = THRESHOLDS[categorySlug] || 5; // default 5%
    const isAbnormal = Math.abs(changePercent) > threshold;

    // Check if suggestion already exists for today
    const existingSuggestion = await prisma.priceSuggestion.findFirst({
      where: {
        productId: product.id,
        status: "pending"
      }
    });

    if (!existingSuggestion) {
      await prisma.priceSuggestion.create({
        data: {
          productId: product.id,
          oldPrice: currentPrice,
          suggestedPrice: newPrice,
          suggestedUnit: recentObservation.observedUnit || product.unit,
          suggestedPriceType: product.priceType || "fixed",
          changePercent: changePercent,
          sourceName: recentObservation.sourceName,
          sourceType: recentObservation.sourceType,
          reason: isAbnormal 
            ? `Large price movement (> ${threshold}%) requires manual approval` 
            : "Normal daily update awaiting approval",
          status: "pending",
        }
      });
      generatedCount++;
    }
  }

  console.log(`Generated ${generatedCount} new price suggestions.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
