const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const categories = await prisma.category.count();
    const brands = await prisma.brand.count();
    const products = await prisma.product.count();
    const suggestions = await prisma.priceSuggestion.count();
    console.log('DB Counts:', { categories, brands, products, suggestions });

    const sampleCement = await prisma.product.findFirst({
      where: { category: { slug: 'cement' } },
      include: { brand: true, category: true }
    });
    console.log('Sample cement:', {
      id: sampleCement?.id,
      name: sampleCement?.name,
      currentPrice: sampleCement?.currentPrice,
      brand: sampleCement?.brand?.name,
      isActive: sampleCement?.isActive,
      isFeatured: sampleCement?.isFeatured
    });

    const user = await prisma.user.findFirst();
    console.log('Admin user exists:', user?.email, user?.role);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
