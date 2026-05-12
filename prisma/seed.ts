import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding SDE Enterprises database...");

  // Admin user
  const hash = await bcrypt.hash("Admin@1234", 12);
  await prisma.user.upsert({
    where: { email: "admin@sde.com" },
    update: {},
    create: { email: "admin@sde.com", password: hash, name: "SDE Admin", role: "admin" },
  });
  console.log("✅ Admin user created: admin@sde.com / Admin@1234");

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: "cement" }, update: {}, create: { name: "Cement", slug: "cement", description: "All major cement brands — OPC, PPC, PSC grades.", icon: "🏗️", sortOrder: 1 } }),
    prisma.category.upsert({ where: { slug: "steel" }, update: {}, create: { name: "Steel / TMT Bars", slug: "steel", description: "TMT bars, MS angles, channels — all grades and sizes.", icon: "⚙️", sortOrder: 2 } }),
    prisma.category.upsert({ where: { slug: "bricks-and-blocks" }, update: {}, create: { name: "Bricks & Blocks", slug: "bricks-and-blocks", description: "AAC blocks, red bricks, fly ash bricks, hollow blocks.", icon: "🧱", sortOrder: 3 } }),
    prisma.category.upsert({ where: { slug: "sand-and-aggregates" }, update: {}, create: { name: "Sand & Aggregates", slug: "sand-and-aggregates", description: "M-Sand, P-Sand, Jelly (20mm, 40mm), Quarry Dust.", icon: "⛏️", sortOrder: 4 } }),
  ]);

  const [cement, steel, bricks, sand] = categories;
  console.log("✅ Categories created");

  // Cement brands
  const cementBrands = await Promise.all([
    prisma.brand.upsert({ where: { slug: "ultratech" }, update: {}, create: { name: "UltraTech", slug: "ultratech", categoryId: cement.id, sortOrder: 1 } }),
    prisma.brand.upsert({ where: { slug: "ramco" }, update: {}, create: { name: "Ramco", slug: "ramco", categoryId: cement.id, sortOrder: 2 } }),
    prisma.brand.upsert({ where: { slug: "dalmia" }, update: {}, create: { name: "Dalmia", slug: "dalmia", categoryId: cement.id, sortOrder: 3 } }),
    prisma.brand.upsert({ where: { slug: "acc" }, update: {}, create: { name: "ACC", slug: "acc", categoryId: cement.id, sortOrder: 4 } }),
    prisma.brand.upsert({ where: { slug: "chettinad" }, update: {}, create: { name: "Chettinad", slug: "chettinad", categoryId: cement.id, sortOrder: 5 } }),
    prisma.brand.upsert({ where: { slug: "jsw-cement" }, update: {}, create: { name: "JSW Cement", slug: "jsw-cement", categoryId: cement.id, sortOrder: 6 } }),
    prisma.brand.upsert({ where: { slug: "bharathi" }, update: {}, create: { name: "Bharathi", slug: "bharathi", categoryId: cement.id, sortOrder: 7 } }),
    prisma.brand.upsert({ where: { slug: "ambuja" }, update: {}, create: { name: "Ambuja", slug: "ambuja", categoryId: cement.id, sortOrder: 8 } }),
  ]);

  // Steel brands
  const steelBrands = await Promise.all([
    prisma.brand.upsert({ where: { slug: "tata-tiscon" }, update: {}, create: { name: "Tata Tiscon", slug: "tata-tiscon", categoryId: steel.id, sortOrder: 1 } }),
    prisma.brand.upsert({ where: { slug: "jsw-neosteel" }, update: {}, create: { name: "JSW Neosteel", slug: "jsw-neosteel", categoryId: steel.id, sortOrder: 2 } }),
    prisma.brand.upsert({ where: { slug: "vizag-steel" }, update: {}, create: { name: "Vizag Steel (RINL)", slug: "vizag-steel", categoryId: steel.id, sortOrder: 3 } }),
    prisma.brand.upsert({ where: { slug: "sail" }, update: {}, create: { name: "SAIL", slug: "sail", categoryId: steel.id, sortOrder: 4 } }),
    prisma.brand.upsert({ where: { slug: "suryadev" }, update: {}, create: { name: "Suryadev", slug: "suryadev", categoryId: steel.id, sortOrder: 5 } }),
    prisma.brand.upsert({ where: { slug: "agni-steels" }, update: {}, create: { name: "Agni Steels", slug: "agni-steels", categoryId: steel.id, sortOrder: 6 } }),
  ]);

  // Bricks brands
  const bricksBrands = await Promise.all([
    prisma.brand.upsert({ where: { slug: "renaissance-aac" }, update: {}, create: { name: "Renaissance AAC", slug: "renaissance-aac", categoryId: bricks.id, sortOrder: 1 } }),
    prisma.brand.upsert({ where: { slug: "birla-aerocon" }, update: {}, create: { name: "Birla Aerocon", slug: "birla-aerocon", categoryId: bricks.id, sortOrder: 2 } }),
    prisma.brand.upsert({ where: { slug: "jsp-blocks" }, update: {}, create: { name: "JSP Blocks", slug: "jsp-blocks", categoryId: bricks.id, sortOrder: 3 } }),
  ]);

  console.log("✅ Brands created");

  // Cement products
  const cementProducts = [
    { name: "UltraTech OPC 53", slug: "ultratech-opc-53", specification: "OPC 53 Grade", unit: "bag", currentPrice: 410, isFeatured: true, brandId: cementBrands[0].id, remarks: "Premium segment — best for RCC" },
    { name: "Ramco Supercrete PPC", slug: "ramco-supercrete-ppc", specification: "PPC Grade", unit: "bag", currentPrice: 395, isFeatured: true, brandId: cementBrands[1].id, remarks: "Best seller in Chennai" },
    { name: "Dalmia OPC 53", slug: "dalmia-opc-53", specification: "OPC 53 Grade", unit: "bag", currentPrice: 385, isFeatured: false, brandId: cementBrands[2].id, remarks: "Good value" },
    { name: "ACC PPC", slug: "acc-ppc", specification: "PPC Grade", unit: "bag", currentPrice: 390, isFeatured: false, brandId: cementBrands[3].id, remarks: "Wide availability" },
    { name: "Chettinad OPC/PPC", slug: "chettinad-cement", specification: "OPC/PPC", unit: "bag", currentPrice: 375, isFeatured: false, brandId: cementBrands[4].id, remarks: "Local brand, cost-effective" },
    { name: "JSW Cement PPC", slug: "jsw-cement-ppc", specification: "PPC Grade", unit: "bag", currentPrice: 380, isFeatured: false, brandId: cementBrands[5].id, remarks: "Good strength" },
    { name: "Bharathi OPC 43", slug: "bharathi-opc-43", specification: "OPC 43 Grade", unit: "bag", currentPrice: 365, isFeatured: false, brandId: cementBrands[6].id, remarks: "Economy segment" },
    { name: "Ambuja PPC", slug: "ambuja-ppc", specification: "PPC Grade", unit: "bag", currentPrice: 392, isFeatured: false, brandId: cementBrands[7].id, remarks: "Good quality" },
  ];

  for (const [i, p] of cementProducts.entries()) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { currentPrice: p.currentPrice, lastUpdated: new Date() },
      create: { ...p, categoryId: cement.id, displayOrder: i + 1 },
    });
  }

  // Steel products
  const steelProducts = [
    { name: "Tata Tiscon Fe 500D", slug: "tata-tiscon-fe500d", specification: "Fe 500D (8mm–32mm)", unit: "MT", currentPrice: 58500, isFeatured: true, brandId: steelBrands[0].id, remarks: "BIS certified, premium" },
    { name: "JSW Neosteel Fe 500D", slug: "jsw-neosteel-fe500d", specification: "Fe 500D (8mm–32mm)", unit: "MT", currentPrice: 57500, isFeatured: true, brandId: steelBrands[1].id, remarks: "Wide availability" },
    { name: "Vizag Steel Fe 500D", slug: "vizag-steel-fe500d", specification: "Fe 500D (8mm–25mm)", unit: "MT", currentPrice: 56000, isFeatured: false, brandId: steelBrands[2].id, remarks: "Government steel plant" },
    { name: "SAIL Fe 500D", slug: "sail-fe500d", specification: "Fe 500D/550", unit: "MT", currentPrice: 56500, isFeatured: false, brandId: steelBrands[3].id, remarks: "Reliable quality" },
    { name: "Suryadev Fe 500D", slug: "suryadev-fe500d", specification: "Fe 500D", unit: "MT", currentPrice: 53000, isFeatured: false, brandId: steelBrands[4].id, remarks: "Good value" },
    { name: "MS Angles (IS:2062)", slug: "ms-angles-is2062", specification: "25×25 to 100×100mm", unit: "MT", currentPrice: 60000, isFeatured: false, brandId: steelBrands[0].id, remarks: "Structural steel" },
  ];

  for (const [i, p] of steelProducts.entries()) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { currentPrice: p.currentPrice, lastUpdated: new Date() },
      create: { ...p, categoryId: steel.id, displayOrder: i + 1 },
    });
  }

  // Bricks products
  const bricksProducts = [
    { name: "AAC Blocks 4\" (100mm)", slug: "aac-blocks-4inch", specification: "600×200×100mm", unit: "piece", currentPrice: 45, isFeatured: true, brandId: bricksBrands[0].id, remarks: "Lightweight, thermal insulation" },
    { name: "AAC Blocks 6\" (150mm)", slug: "aac-blocks-6inch", specification: "600×200×150mm", unit: "piece", currentPrice: 58, isFeatured: false, brandId: bricksBrands[1].id, remarks: "Premium quality" },
    { name: "AAC Blocks 8\" (200mm)", slug: "aac-blocks-8inch", specification: "600×200×200mm", unit: "piece", currentPrice: 72, isFeatured: false, brandId: bricksBrands[2].id, remarks: "Good strength" },
    { name: "Solid Concrete Blocks", slug: "solid-concrete-blocks", specification: "400×200×200mm", unit: "piece", currentPrice: 30, isFeatured: false, brandId: null, remarks: "Standard grade" },
    { name: "Hollow Concrete Blocks", slug: "hollow-concrete-blocks", specification: "400×200×200mm", unit: "piece", currentPrice: 26, isFeatured: false, brandId: null, remarks: "Light partitions" },
    { name: "Fly Ash Bricks", slug: "fly-ash-bricks", specification: "230×115×75mm", unit: "piece", currentPrice: 7, isFeatured: false, brandId: null, remarks: "Eco-friendly" },
    { name: "Red Bricks (Country)", slug: "red-bricks-country", specification: "230×115×75mm", unit: "piece", currentPrice: 6, isFeatured: false, brandId: null, remarks: "Traditional bricks" },
  ];

  for (const [i, p] of bricksProducts.entries()) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { currentPrice: p.currentPrice, lastUpdated: new Date() },
      create: { ...p, categoryId: bricks.id, displayOrder: i + 1 },
    });
  }

  // Sand products
  const sandProducts = [
    { name: "M-Sand (Manufactured Sand)", slug: "m-sand", specification: "IS:383 Grade", unit: "CFT", currentPrice: 62, isFeatured: true, brandId: null, remarks: "For concrete, plastering" },
    { name: "P-Sand (Plastering Sand)", slug: "p-sand", specification: "Fine grade", unit: "CFT", currentPrice: 57, isFeatured: false, brandId: null, remarks: "Smooth finish plastering" },
    { name: "River Sand", slug: "river-sand", specification: "Natural sand", unit: "CFT", currentPrice: 85, isFeatured: false, brandId: null, remarks: "Limited stock, govt regulated" },
    { name: "20mm Jelly (Blue Metal)", slug: "20mm-jelly", specification: "IS:383", unit: "CFT", currentPrice: 55, isFeatured: true, brandId: null, remarks: "Concrete aggregate" },
    { name: "40mm Jelly (Blue Metal)", slug: "40mm-jelly", specification: "IS:383", unit: "CFT", currentPrice: 50, isFeatured: false, brandId: null, remarks: "Foundation, PCC" },
    { name: "Quarry Dust", slug: "quarry-dust", specification: "Stone powder", unit: "CFT", currentPrice: 30, isFeatured: false, brandId: null, remarks: "Filling, block making" },
  ];

  for (const [i, p] of sandProducts.entries()) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { currentPrice: p.currentPrice, lastUpdated: new Date() },
      create: { ...p, categoryId: sand.id, displayOrder: i + 1 },
    });
  }

  console.log("✅ Products seeded with demo prices");

  // Service areas
  const areas = ["Chennai", "Kilpauk", "Mangadu", "Anna Nagar", "Porur", "Koyambedu", "Tambaram", "Guindy", "Adyar", "Velachery", "Ambattur", "Poonamallee", "Avadi", "Tiruvallur", "Kanchipuram"];
  for (const [i, name] of areas.entries()) {
    await prisma.serviceArea.upsert({
      where: { id: name.toLowerCase().replace(/ /g, "-") },
      update: {},
      create: { id: name.toLowerCase().replace(/ /g, "-"), name, sortOrder: i },
    });
  }
  console.log("✅ Service areas seeded");

  console.log("\n🎉 Seed complete!");
  console.log("   Admin login: admin@sde.com / Admin@1234");
  console.log("   ⚠️  Change password after first login!\n");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
