const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Adding Fabrication Materials category and products...");

  // 1. Create Category
  const category = await prisma.category.upsert({
    where: { slug: "fabrication-materials" },
    update: {},
    create: {
      name: "Fabrication Materials",
      slug: "fabrication-materials",
      description: "MS angles, channels, pipes, plates, sheets, flats, beams and GI materials for fabrication and structural work.",
      icon: "🛠️",
      sortOrder: 5,
    },
  });
  console.log("✅ Fabrication Materials category created");

  // 2. Create Brands (treating product groups as brands for UI grouping)
  const groups = [
    { name: "MS Angles", slug: "ms-angles", desc: "IS:2062 mild steel angles for gates, frames, bracing, fabrication and structural work." },
    { name: "MS Channels", slug: "ms-channels", desc: "Mild steel channels for support frames, sheds, platforms, commercial structures and fabrication work." },
    { name: "MS Square Pipes", slug: "ms-square-pipes", desc: "MS square hollow sections for gates, grills, railings, partitions, racks, sheds and general fabrication work." },
    { name: "MS Rectangular Pipes", slug: "ms-rectangular-pipes", desc: "MS rectangular hollow sections for fabrication frames, compound gates, roofing supports, partitions and industrial structures." },
    { name: "MS Round Pipes / MS ERW Pipes", slug: "ms-round-pipes", desc: "MS round pipes and ERW pipes for handrails, supports, frames, fabrication and general engineering use." },
    { name: "GI Pipes", slug: "gi-pipes", desc: "Galvanized iron pipes for corrosion-resistant outdoor fabrication, roofing support, plumbing support and structural applications." },
    { name: "MS Plates", slug: "ms-plates", desc: "Mild steel plates for base plates, machine platforms, structural supports, fabrication works and industrial use." },
    { name: "MS Sheets / HR Sheets", slug: "ms-sheets", desc: "MS sheets and hot rolled sheets for panels, enclosures, shutters, fabrication and general engineering work." },
    { name: "Chequered Plates", slug: "chequered-plates", desc: "Anti-skid chequered plates for staircases, ramps, platforms, industrial flooring and vehicle body work." },
    { name: "MS Flats", slug: "ms-flats", desc: "Mild steel flats for gates, grills, bracing, clamps, frames and fabrication support work." },
    { name: "MS Round Bars", slug: "ms-round-bars", desc: "MS round bars for fabrication, machining, grills, supports and industrial applications." },
    { name: "MS Beams / Joists", slug: "ms-beams-joists", desc: "Structural beams and joists for sheds, mezzanine floors, commercial structures, platforms and heavy fabrication." },
    { name: "Roofing / Fabrication Sheets", slug: "roofing-sheets", desc: "Roofing and cladding sheets for sheds, factories, warehouses, terrace covers and commercial roofing." },
  ];

  const dbGroups = await Promise.all(
    groups.map((g, i) =>
      prisma.brand.upsert({
        where: { slug: g.slug },
        update: {},
        create: { name: g.name, slug: g.slug, description: g.desc, categoryId: category.id, sortOrder: i + 1 },
      })
    )
  );
  console.log("✅ Fabrication product groups created");

  // Helper function to format slug
  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  // 3. Create Products
  const productsData = [
    // MS Angles
    { groupIdx: 0, name: "MS Angle 25×25×3mm", spec: "IS:2062 Mild Steel", price: 58, unit: "kg", featured: true },
    { groupIdx: 0, name: "MS Angle 35×35×5mm", spec: "IS:2062 Mild Steel", price: 58, unit: "kg", featured: false },
    { groupIdx: 0, name: "MS Angle 40×40×5mm", spec: "IS:2062 Mild Steel", price: 58, unit: "kg", featured: false },
    { groupIdx: 0, name: "MS Angle 50×50×6mm", spec: "IS:2062 Mild Steel", price: 58, unit: "kg", featured: false },
    { groupIdx: 0, name: "MS Angle 65×65×6mm", spec: "IS:2062 Mild Steel", price: 60, unit: "kg", featured: false },
    { groupIdx: 0, name: "MS Angle 75×75×6mm", spec: "IS:2062 Mild Steel", price: 60, unit: "kg", featured: false },
    { groupIdx: 0, name: "MS Angle 100×100×8mm", spec: "IS:2062 Mild Steel", price: 62, unit: "kg", featured: false },
    // MS Channels
    { groupIdx: 1, name: "MS Channel 75×40mm", spec: "Mild Steel Channel", price: 56, unit: "kg", featured: true },
    { groupIdx: 1, name: "MS Channel 100×50mm", spec: "Mild Steel Channel", price: 56, unit: "kg", featured: false },
    { groupIdx: 1, name: "MS Channel 125×65mm", spec: "Mild Steel Channel", price: 58, unit: "kg", featured: false },
    { groupIdx: 1, name: "MS Channel 150×75mm", spec: "Mild Steel Channel", price: 58, unit: "kg", featured: false },
    { groupIdx: 1, name: "MS Channel 200×75mm", spec: "Mild Steel Channel", price: 60, unit: "kg", featured: false },
    // MS Square Pipes
    { groupIdx: 2, name: "MS Square Pipe 20×20mm", spec: "1.6mm–3mm Thickness", price: 65, unit: "kg", featured: true },
    { groupIdx: 2, name: "MS Square Pipe 25×25mm", spec: "1.6mm–3mm Thickness", price: 65, unit: "kg", featured: false },
    { groupIdx: 2, name: "MS Square Pipe 32×32mm", spec: "1.6mm–3mm Thickness", price: 65, unit: "kg", featured: false },
    { groupIdx: 2, name: "MS Square Pipe 40×40mm", spec: "1.6mm–4mm Thickness", price: 65, unit: "kg", featured: false },
    { groupIdx: 2, name: "MS Square Pipe 50×50mm", spec: "2mm–4mm Thickness", price: 67, unit: "kg", featured: false },
    { groupIdx: 2, name: "MS Square Pipe 75×75mm", spec: "2mm–4mm Thickness", price: 68, unit: "kg", featured: false },
    { groupIdx: 2, name: "MS Square Pipe 100×100mm", spec: "2mm–5mm Thickness", price: 70, unit: "kg", featured: false },
    // MS Rectangular Pipes
    { groupIdx: 3, name: "MS Rectangular Pipe 40×20mm", spec: "1.6mm–3mm Thickness", price: 66, unit: "kg", featured: false },
    { groupIdx: 3, name: "MS Rectangular Pipe 50×25mm", spec: "1.6mm–3mm Thickness", price: 66, unit: "kg", featured: false },
    { groupIdx: 3, name: "MS Rectangular Pipe 60×40mm", spec: "2mm–4mm Thickness", price: 66, unit: "kg", featured: false },
    { groupIdx: 3, name: "MS Rectangular Pipe 80×40mm", spec: "2mm–4mm Thickness", price: 68, unit: "kg", featured: false },
    { groupIdx: 3, name: "MS Rectangular Pipe 100×50mm", spec: "2mm–4mm Thickness", price: 68, unit: "kg", featured: false },
    { groupIdx: 3, name: "MS Rectangular Pipe 120×60mm", spec: "2mm–5mm Thickness", price: 70, unit: "kg", featured: false },
    // MS Round Pipes / MS ERW Pipes
    { groupIdx: 4, name: "MS Round Pipe 20mm", spec: "MS ERW Pipe", price: 64, unit: "kg", featured: false },
    { groupIdx: 4, name: "MS Round Pipe 25mm", spec: "MS ERW Pipe", price: 64, unit: "kg", featured: false },
    { groupIdx: 4, name: "MS Round Pipe 32mm", spec: "MS ERW Pipe", price: 64, unit: "kg", featured: false },
    { groupIdx: 4, name: "MS Round Pipe 40mm", spec: "MS ERW Pipe", price: 64, unit: "kg", featured: false },
    { groupIdx: 4, name: "MS Round Pipe 50mm", spec: "MS ERW Pipe", price: 66, unit: "kg", featured: false },
    { groupIdx: 4, name: "MS Round Pipe 65mm", spec: "MS ERW Pipe", price: 68, unit: "kg", featured: false },
    { groupIdx: 4, name: "MS Round Pipe 80mm", spec: "MS ERW Pipe", price: 70, unit: "kg", featured: false },
    // GI Pipes
    { groupIdx: 5, name: "GI Round Pipe 20mm", spec: "Galvanized Iron Pipe", price: 78, unit: "kg", featured: false },
    { groupIdx: 5, name: "GI Round Pipe 25mm", spec: "Galvanized Iron Pipe", price: 78, unit: "kg", featured: false },
    { groupIdx: 5, name: "GI Round Pipe 32mm", spec: "Galvanized Iron Pipe", price: 80, unit: "kg", featured: false },
    { groupIdx: 5, name: "GI Round Pipe 40mm", spec: "Galvanized Iron Pipe", price: 80, unit: "kg", featured: false },
    { groupIdx: 5, name: "GI Round Pipe 50mm", spec: "Galvanized Iron Pipe", price: 82, unit: "kg", featured: false },
    { groupIdx: 5, name: "GI Square Pipe 25×25mm", spec: "Galvanized Iron Square Pipe", price: 82, unit: "kg", featured: false },
    { groupIdx: 5, name: "GI Square Pipe 40×40mm", spec: "Galvanized Iron Square Pipe", price: 82, unit: "kg", featured: false },
    // MS Plates
    { groupIdx: 6, name: "MS Plate 3mm", spec: "Mild Steel Plate", price: 64, unit: "kg", featured: true },
    { groupIdx: 6, name: "MS Plate 5mm", spec: "Mild Steel Plate", price: 64, unit: "kg", featured: false },
    { groupIdx: 6, name: "MS Plate 6mm", spec: "Mild Steel Plate", price: 64, unit: "kg", featured: false },
    { groupIdx: 6, name: "MS Plate 8mm", spec: "Mild Steel Plate", price: 65, unit: "kg", featured: false },
    { groupIdx: 6, name: "MS Plate 10mm", spec: "Mild Steel Plate", price: 65, unit: "kg", featured: false },
    { groupIdx: 6, name: "MS Plate 12mm", spec: "Mild Steel Plate", price: 66, unit: "kg", featured: false },
    { groupIdx: 6, name: "MS Plate 16mm", spec: "Mild Steel Plate", price: 68, unit: "kg", featured: false },
    { groupIdx: 6, name: "MS Plate 20mm", spec: "Mild Steel Plate", price: 70, unit: "kg", featured: false },
    // MS Sheets / HR Sheets
    { groupIdx: 7, name: "MS Sheet 1.6mm", spec: "Mild Steel Sheet", price: 67, unit: "kg", featured: false },
    { groupIdx: 7, name: "MS Sheet 2mm", spec: "Mild Steel Sheet", price: 67, unit: "kg", featured: false },
    { groupIdx: 7, name: "MS Sheet 2.5mm", spec: "Mild Steel Sheet", price: 68, unit: "kg", featured: false },
    { groupIdx: 7, name: "MS Sheet 3mm", spec: "Mild Steel Sheet", price: 68, unit: "kg", featured: false },
    { groupIdx: 7, name: "HR Sheet 1.6mm", spec: "Hot Rolled Sheet", price: 68, unit: "kg", featured: false },
    { groupIdx: 7, name: "HR Sheet 2mm", spec: "Hot Rolled Sheet", price: 68, unit: "kg", featured: false },
    { groupIdx: 7, name: "HR Sheet 3mm", spec: "Hot Rolled Sheet", price: 69, unit: "kg", featured: false },
    // Chequered Plates
    { groupIdx: 8, name: "MS Chequered Plate 3mm", spec: "Anti-skid Plate", price: 72, unit: "kg", featured: false },
    { groupIdx: 8, name: "MS Chequered Plate 4mm", spec: "Anti-skid Plate", price: 73, unit: "kg", featured: false },
    { groupIdx: 8, name: "MS Chequered Plate 5mm", spec: "Anti-skid Plate", price: 74, unit: "kg", featured: false },
    { groupIdx: 8, name: "MS Chequered Plate 6mm", spec: "Anti-skid Plate", price: 75, unit: "kg", featured: false },
    // MS Flats
    { groupIdx: 9, name: "MS Flat 20×3mm", spec: "Mild Steel Flat", price: 60, unit: "kg", featured: false },
    { groupIdx: 9, name: "MS Flat 25×5mm", spec: "Mild Steel Flat", price: 60, unit: "kg", featured: false },
    { groupIdx: 9, name: "MS Flat 32×5mm", spec: "Mild Steel Flat", price: 61, unit: "kg", featured: false },
    { groupIdx: 9, name: "MS Flat 40×6mm", spec: "Mild Steel Flat", price: 62, unit: "kg", featured: false },
    { groupIdx: 9, name: "MS Flat 50×6mm", spec: "Mild Steel Flat", price: 62, unit: "kg", featured: false },
    { groupIdx: 9, name: "MS Flat 65×8mm", spec: "Mild Steel Flat", price: 64, unit: "kg", featured: false },
    { groupIdx: 9, name: "MS Flat 75×10mm", spec: "Mild Steel Flat", price: 65, unit: "kg", featured: false },
    // MS Round Bars
    { groupIdx: 10, name: "MS Round Bar 8mm", spec: "Mild Steel Round Bar", price: 62, unit: "kg", featured: false },
    { groupIdx: 10, name: "MS Round Bar 10mm", spec: "Mild Steel Round Bar", price: 62, unit: "kg", featured: false },
    { groupIdx: 10, name: "MS Round Bar 12mm", spec: "Mild Steel Round Bar", price: 62, unit: "kg", featured: false },
    { groupIdx: 10, name: "MS Round Bar 16mm", spec: "Mild Steel Round Bar", price: 63, unit: "kg", featured: false },
    { groupIdx: 10, name: "MS Round Bar 20mm", spec: "Mild Steel Round Bar", price: 64, unit: "kg", featured: false },
    { groupIdx: 10, name: "MS Round Bar 25mm", spec: "Mild Steel Round Bar", price: 65, unit: "kg", featured: false },
    // MS Beams / Joists
    { groupIdx: 11, name: "MS I Beam 100mm", spec: "Structural Beam", price: 62000, unit: "MT", featured: false },
    { groupIdx: 11, name: "MS I Beam 150mm", spec: "Structural Beam", price: 62000, unit: "MT", featured: false },
    { groupIdx: 11, name: "MS I Beam 200mm", spec: "Structural Beam", price: 64000, unit: "MT", featured: false },
    { groupIdx: 11, name: "MS H Beam", spec: "Structural Steel Beam", price: 64000, unit: "MT", featured: false },
    { groupIdx: 11, name: "MS Joist", spec: "Structural Steel Joist", price: 62000, unit: "MT", featured: false },
    // Roofing / Fabrication Sheets
    { groupIdx: 12, name: "Colour Coated Roofing Sheet", spec: "Roofing Sheet", price: null, unit: "sheet", featured: false },
    { groupIdx: 12, name: "Galvanized Roofing Sheet", spec: "GI Roofing Sheet", price: null, unit: "sheet", featured: false },
    { groupIdx: 12, name: "Deck Sheet", spec: "Structural Decking Sheet", price: null, unit: "sheet", featured: false },
  ];

  for (const [i, p] of productsData.entries()) {
    await prisma.product.upsert({
      where: { slug: slugify(p.name) },
      update: { currentPrice: p.price, lastUpdated: new Date() },
      create: { 
        name: p.name, 
        slug: slugify(p.name), 
        specification: p.spec, 
        unit: p.unit, 
        currentPrice: p.price, 
        isFeatured: p.featured,
        categoryId: category.id,
        brandId: dbGroups[p.groupIdx].id,
        displayOrder: i + 1 
      },
    });
  }
  console.log("✅ Fabrication products seeded");

  console.log("\n🎉 Fabrication Materials seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
