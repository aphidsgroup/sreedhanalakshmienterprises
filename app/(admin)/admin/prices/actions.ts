"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function approveSuggestion(suggestionId: string) {
  const user = await requireAuth();

  const suggestion = await prisma.priceSuggestion.findUnique({
    where: { id: suggestionId },
    include: { product: true }
  });

  if (!suggestion || suggestion.status !== "pending") {
    throw new Error("Invalid or already processed suggestion");
  }

  // Transaction to update suggestion, product, and insert history
  await prisma.$transaction([
    prisma.product.update({
      where: { id: suggestion.productId },
      data: {
        currentPrice: suggestion.suggestedPrice,
        minPrice: suggestion.suggestedMinPrice,
        maxPrice: suggestion.suggestedMaxPrice,
        unit: suggestion.suggestedUnit || suggestion.product.unit,
        priceType: suggestion.suggestedPriceType,
        priceUpdatedBy: user.email || user.name,
        lastUpdated: new Date()
      }
    }),
    prisma.priceHistory.create({
      data: {
        productId: suggestion.productId,
        price: suggestion.suggestedPrice,
        minPrice: suggestion.suggestedMinPrice,
        maxPrice: suggestion.suggestedMaxPrice,
        priceType: suggestion.suggestedPriceType,
        changedBy: user.email || user.name,
        sourceName: suggestion.sourceName,
        changeReason: suggestion.reason || "Approved via Dashboard"
      }
    }),
    prisma.priceSuggestion.update({
      where: { id: suggestionId },
      data: {
        status: "approved",
        reviewedBy: user.email || user.name,
        reviewedAt: new Date()
      }
    })
  ]);

  revalidatePath("/admin/prices");
  revalidatePath("/");
  return { success: true };
}

export async function rejectSuggestion(suggestionId: string) {
  const user = await requireAuth();

  await prisma.priceSuggestion.update({
    where: { id: suggestionId },
    data: {
      status: "rejected",
      reviewedBy: user.email || user.name,
      reviewedAt: new Date()
    }
  });

  revalidatePath("/admin/prices");
  return { success: true };
}

export async function editAndApproveSuggestion(
  suggestionId: string, 
  payload: { price?: number; minPrice?: number; maxPrice?: number; unit?: string; priceType?: string }
) {
  const user = await requireAuth();

  const suggestion = await prisma.priceSuggestion.findUnique({
    where: { id: suggestionId },
    include: { product: true }
  });

  if (!suggestion || suggestion.status !== "pending") {
    throw new Error("Invalid or already processed suggestion");
  }

  const finalPrice = payload.price !== undefined ? payload.price : suggestion.suggestedPrice;
  const finalMin = payload.minPrice !== undefined ? payload.minPrice : suggestion.suggestedMinPrice;
  const finalMax = payload.maxPrice !== undefined ? payload.maxPrice : suggestion.suggestedMaxPrice;
  const finalUnit = payload.unit || suggestion.suggestedUnit || suggestion.product.unit;
  const finalPriceType = payload.priceType || suggestion.suggestedPriceType;

  await prisma.$transaction([
    prisma.product.update({
      where: { id: suggestion.productId },
      data: {
        currentPrice: finalPrice,
        minPrice: finalMin,
        maxPrice: finalMax,
        unit: finalUnit,
        priceType: finalPriceType,
        priceUpdatedBy: user.email || user.name,
        lastUpdated: new Date()
      }
    }),
    prisma.priceHistory.create({
      data: {
        productId: suggestion.productId,
        price: finalPrice,
        minPrice: finalMin,
        maxPrice: finalMax,
        priceType: finalPriceType,
        changedBy: user.email || user.name,
        sourceName: "Manual Edit over Suggestion",
        changeReason: "Edited and approved via Dashboard"
      }
    }),
    prisma.priceSuggestion.update({
      where: { id: suggestionId },
      data: {
        status: "edited",
        reviewedBy: user.email || user.name,
        reviewedAt: new Date(),
        suggestedPrice: finalPrice,
        suggestedMinPrice: finalMin,
        suggestedMaxPrice: finalMax,
        suggestedUnit: finalUnit,
        suggestedPriceType: finalPriceType
      }
    })
  ]);

  revalidatePath("/admin/prices");
  revalidatePath("/");
  return { success: true };
}

export async function markCallForPrice(productId: string) {
  const user = await requireAuth();

  await prisma.$transaction([
    prisma.product.update({
      where: { id: productId },
      data: {
        priceType: "call_for_price",
        priceUpdatedBy: user.email || user.name,
        lastUpdated: new Date()
      }
    }),
    prisma.priceHistory.create({
      data: {
        productId: productId,
        priceType: "call_for_price",
        changedBy: user.email || user.name,
        sourceName: "Manual Action",
        changeReason: "Marked as Call for Price"
      }
    })
  ]);

  revalidatePath("/admin/prices");
  revalidatePath("/");
  return { success: true };
}

export async function importCsv(rows: any[]) {
  const user = await requireAuth();

  let imported = 0;
  for (const row of rows) {
    const { category, productName, specification, unit, price, priceType, sourceName, notes, date } = row;

    if (!productName || !category) continue;

    const product = await prisma.product.findFirst({
      where: {
        name: { equals: productName, mode: "insensitive" },
        category: { slug: { equals: category.toLowerCase().replace(/\s+/g, "-"), mode: "insensitive" } }
      }
    });

    if (!product) continue;

    const currentPrice = Number(product.currentPrice) || 0;
    const newPrice = Number(price) || 0;
    
    // Calculate change percentage
    let changePercent = 0;
    if (currentPrice > 0 && newPrice > 0) {
      changePercent = ((newPrice - currentPrice) / currentPrice) * 100;
    }

    // Abnormal change detection rules (example thresholds)
    let isAbnormal = false;
    if (Math.abs(changePercent) > 5) isAbnormal = true; // Simplified rule

    await prisma.$transaction([
      prisma.priceObservation.create({
        data: {
          productId: product.id,
          sourceName: sourceName || "CSV Import",
          sourceType: "csv_import",
          observedPrice: newPrice,
          observedUnit: unit || product.unit,
          notes: notes
        }
      }),
      prisma.priceSuggestion.create({
        data: {
          productId: product.id,
          oldPrice: currentPrice,
          suggestedPrice: newPrice,
          suggestedUnit: unit || product.unit,
          suggestedPriceType: priceType || "fixed",
          changePercent: changePercent,
          sourceName: sourceName || "CSV Import",
          sourceType: "csv_import",
          reason: isAbnormal ? "Large price movement requires manual approval" : "Normal daily update awaiting approval",
          status: "pending"
        }
      })
    ]);
    imported++;
  }

  revalidatePath("/admin/prices");
  return { success: true, count: imported };
}
