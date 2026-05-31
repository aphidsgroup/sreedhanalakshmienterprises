export interface ProductSupplierData {
  slug: string;
  productName: string;
  todayPriceSlug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  overview: string;
  commonUses: string[];
  typesAvailable: { name: string; detail: string }[];
  qualityChecklist: string[];
  relatedProductSlugs: string[];
  whatsappMessage: string;
  faqs: { question: string; answer: string }[];
}

export const PRODUCT_SUPPLIER_PAGES: ProductSupplierData[] = [
  {
    slug: "cement-supplier-in-chennai",
    productName: "Cement",
    todayPriceSlug: "/today-cement-price",
    metaTitle: "Cement Supplier in Chennai | OPC 53, PPC Wholesale Rates",
    metaDescription: "Top cement supplier in Chennai offering UltraTech, Ramco, Dalmia, Chettinad, and ACC cement. Get wholesale prices for OPC 53, OPC 43, and PPC grades.",
    metaKeywords: "cement supplier in chennai, ultratech cement supplier, ramco cement price chennai, opc 53 cement, ppc cement chennai, wholesale cement dealer",
    overview: "Sree Dhanalakshmi Enterprises is a leading wholesale cement supplier in Chennai, providing top brands directly to construction sites, builders, and individual home makers. We supply freshly manufactured OPC 53, OPC 43, PPC, and PSC grades from trusted manufacturers like UltraTech, Ramco, Dalmia, Chettinad, ACC, JSW, Bharathi, and Ambuja to ensure your foundation and structures are built to last.",
    commonUses: [
      "Foundation and footings construction",
      "RCC slabs, columns, and beams",
      "Brickwork and block masonry",
      "Interior and exterior wall plastering",
      "Flooring and screeding",
      "Precast concrete works"
    ],
    typesAvailable: [
      { name: "OPC 53 Grade", detail: "High-strength cement ideal for fast-paced construction, high-rise buildings, and heavy RCC structures like slabs and columns." },
      { name: "OPC 43 Grade", detail: "General-purpose cement suitable for residential construction, plastering, and non-structural concrete." },
      { name: "PPC (Portland Pozzolana Cement)", detail: "Highly durable cement with superior workability, perfect for masonry, plastering, and water-retaining structures." },
      { name: "PSC (Portland Slag Cement)", detail: "Sulphate-resistant cement best suited for coastal areas and chemically aggressive environments." }
    ],
    qualityChecklist: [
      "Verify the manufacturing date (cement should preferably be less than 90 days old).",
      "Check for ISI mark and grade specification on the bag.",
      "Ensure bags are sealed properly and not tampered with.",
      "Look out for any hard lumps which indicate moisture exposure.",
      "Confirm the brand name and batch number."
    ],
    relatedProductSlugs: ["tmt-steel-supplier-in-chennai", "m-sand-supplier-in-chennai", "bricks-supplier-in-chennai"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need today price for Cement in Chennai.\nQuantity:\nDelivery location:\nPlease share final quotation.",
    faqs: [
      { question: "Which cement is best for house construction in Chennai?", answer: "For the main structure (RCC columns, beams, slabs), OPC 53 grade from brands like UltraTech or Ramco is highly recommended for its early strength. For brickwork and plastering, PPC is preferred due to its smooth finish and lower heat of hydration." },
      { question: "Do you supply cement for bulk contractor projects?", answer: "Yes, we specialize in bulk supply for contractors, offering competitive wholesale pricing and scheduled site deliveries." },
      { question: "Is delivery included in the cement price?", answer: "The final quotation we provide via WhatsApp will clearly break down the base price, GST, and transport charges based on your exact location in Chennai." },
      { question: "How fresh is the cement you supply?", answer: "We maintain high turnover and source directly from manufacturers, ensuring you receive freshly manufactured cement for maximum strength." },
      { question: "What is the minimum order quantity for site delivery?", answer: "Please contact us with your requirement. We cater to both small individual house projects and large apartment complexes, optimizing the delivery vehicle size accordingly." }
    ]
  },
  {
    slug: "tmt-steel-supplier-in-chennai",
    productName: "TMT Steel",
    todayPriceSlug: "/today-steel-price",
    metaTitle: "TMT Steel Supplier in Chennai | Fe 500D, Fe 550D Bars",
    metaDescription: "Wholesale TMT steel supplier in Chennai. Buy Tata Tiscon, JSW Neosteel, Vizag Steel & Agni TMT bars. Best prices for Fe 500D and Fe 550D grades.",
    metaKeywords: "tmt steel supplier in chennai, tmt bars chennai, tata tiscon dealer chennai, jsw neosteel price, fe 500d steel, fe 550d tmt bars",
    overview: "We supply premium quality TMT (Thermo Mechanically Treated) steel bars essential for the structural integrity of any building. Sree Dhanalakshmi Enterprises deals in high-strength Fe 500D and Fe 550D grades from top-tier brands like Tata Tiscon, JSW Neosteel, Vizag Steel, SAIL, and Agni. Our steel supplies guarantee superior earthquake resistance, flexibility, and longevity for your construction.",
    commonUses: [
      "RCC columns, beams, and slabs",
      "Foundation footings and rafts",
      "Staircases and lintels",
      "Stirrups (rings) for column reinforcement",
      "Heavy infrastructure and bridges",
      "General structural reinforcement"
    ],
    typesAvailable: [
      { name: "Fe 500D TMT Bars", detail: "The standard requirement for most residential and commercial buildings, offering an excellent balance of strength and ductility (D stands for ductility)." },
      { name: "Fe 550D TMT Bars", detail: "Higher yield strength steel used for heavy load-bearing structures and high-rise apartments." },
      { name: "CRS (Corrosion Resistant Steel)", detail: "Specialized steel bars treated to resist rusting, highly recommended for Chennai's coastal and humid environment." }
    ],
    qualityChecklist: [
      "Check the grade (Fe 500D/550D) and brand embossed on every meter of the bar.",
      "Verify the weight per meter against standard IS code specifications.",
      "Ensure uniform rib patterns for optimal concrete bonding.",
      "Check for excessive rust or scaling (minor surface rust is normal).",
      "Ask for the manufacturer's test certificate for large orders."
    ],
    relatedProductSlugs: ["cement-supplier-in-chennai", "blue-metal-supplier-in-chennai"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need today price for TMT Steel in Chennai.\nQuantity:\nDelivery location:\nPlease share final quotation.",
    faqs: [
      { question: "What sizes of TMT bars do you supply?", answer: "We supply all standard diameters including 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, and 32mm to meet complete structural requirements." },
      { question: "Why should I choose Fe 500D over Fe 500?", answer: "Fe 500D has higher ductility, which means it can bend more without breaking. This provides significantly better earthquake resistance compared to standard Fe 500 bars." },
      { question: "How do you deliver steel to the site?", answer: "Steel is delivered using specialized trucks or trailers depending on the length (typically 12 meters) and the total tonnage of the order." },
      { question: "Can I mix different brands of steel in my project?", answer: "While possible, structural engineers usually recommend sticking to one primary brand for uniformity in mechanical properties across the main structure." },
      { question: "Do you supply readymade rings/stirrups?", answer: "We supply the 8mm and 6mm bars typically used for stirrups. Please inquire about readymade cut-and-bend services if required." }
    ]
  },
  {
    slug: "m-sand-supplier-in-chennai",
    productName: "M Sand",
    todayPriceSlug: "/today-sand-and-aggregates-price",
    metaTitle: "M Sand Supplier in Chennai | Double Washed Concrete M Sand",
    metaDescription: "Order premium double washed M Sand in Chennai for concrete works. Sree Dhanalakshmi Enterprises offers quality tested Manufactured Sand at wholesale prices.",
    metaKeywords: "m sand supplier in chennai, double washed m sand, concrete m sand, manufactured sand price chennai, bulk m sand delivery",
    overview: "Manufactured Sand (M Sand) is the modern, eco-friendly alternative to river sand, specifically engineered for strong concrete mixes. We supply premium Double Washed M Sand that undergoes rigorous washing to remove micro-fines and clay particles, ensuring optimal bonding with cement. As a leading M Sand supplier in Chennai, we guarantee consistent quality and timely bulk deliveries to keep your project moving.",
    commonUses: [
      "All RCC concrete mixes (slabs, columns, beams)",
      "Foundation concrete (PCC)",
      "Blockwork and brick masonry",
      "Paving and flooring base",
      "Precast concrete products"
    ],
    typesAvailable: [
      { name: "Double Washed Concrete M Sand", detail: "Premium sand washed twice to eliminate silt and impurities. Ideal for high-strength RCC structures and critical concrete applications." },
      { name: "Single Washed M Sand", detail: "Standard washed M Sand suitable for general brickwork, blockwork, and non-structural concrete." }
    ],
    qualityChecklist: [
      "Check for low silt content (should be clearly washed).",
      "Verify the particle shape (cubical particles provide better interlocking).",
      "Ensure there are no oversized stones or debris.",
      "Feel the texture; it should not feel excessively powdery or clay-like.",
      "Check that it does not contain organic impurities."
    ],
    relatedProductSlugs: ["cement-supplier-in-chennai", "blue-metal-supplier-in-chennai", "p-sand-supplier-in-chennai"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need today price for M Sand in Chennai.\nQuantity (Units/Tons):\nDelivery location:\nPlease share final quotation.",
    faqs: [
      { question: "What is Double Washed M Sand?", answer: "Double washed M Sand has been processed through washing plants twice to remove ultrafine dust and clay. This drastically improves the strength of the concrete and reduces cement consumption." },
      { question: "Is M Sand better than River Sand?", answer: "Yes, for concrete works, high-quality M Sand is often superior as it has a controlled cubical shape for better interlocking, consistent gradation, and contains no marine impurities or organic matter." },
      { question: "How do you measure M Sand delivery?", answer: "M Sand is typically measured and billed in 'Units' (1 Unit = 100 Cubic Feet) or by tonnage, depending on the delivery vehicle size (Taurus, Tipper, etc.)." },
      { question: "Can M Sand be used for plastering?", answer: "Concrete M Sand is generally too coarse for plastering. For smooth wall finishes, you should use P Sand (Plastering Sand) which has finer particles." },
      { question: "Do you supply M Sand to all parts of Chennai?", answer: "Yes, we dispatch lorry loads of M Sand to all areas across Chennai and its suburbs from our various yards." }
    ]
  },
  {
    slug: "p-sand-supplier-in-chennai",
    productName: "P Sand",
    todayPriceSlug: "/today-sand-and-aggregates-price",
    metaTitle: "P Sand Supplier in Chennai | Plastering Sand",
    metaDescription: "Get smooth finish P Sand for wall plastering. Top Plastering Sand supplier in Chennai offering fine-graded sand for flawless construction finishes.",
    metaKeywords: "p sand supplier in chennai, plastering sand chennai, fine m sand for plastering, p sand price, wall plaster sand",
    overview: "P Sand (Plastering Sand) is a specialized fine grade of manufactured sand designed exclusively for wall and ceiling plastering. It features a controlled particle size distribution to ensure a smooth, crack-free finish for your walls. We supply high-quality, silt-free P Sand across Chennai, helping builders achieve superior aesthetics without the need for traditional river sand.",
    commonUses: [
      "Interior wall plastering",
      "Exterior wall plastering",
      "Ceiling plastering",
      "Fine masonry work",
      "Creating smooth finishes before painting"
    ],
    typesAvailable: [
      { name: "Standard P Sand", detail: "Finely crushed and graded manufactured sand specifically optimized for plastering applications, free from larger aggregates." },
      { name: "Washed P Sand", detail: "P Sand that has been washed to remove excess micro-dust, ensuring better adhesion and reducing the risk of shrinkage cracks." }
    ],
    qualityChecklist: [
      "Ensure particles are fine and free from coarse gravel or stones.",
      "Check for absence of clay or organic materials that cause wall cracks.",
      "Rub between fingers to ensure a consistent, fine texture.",
      "Verify that the material is specifically graded as P Sand, not just fine M Sand."
    ],
    relatedProductSlugs: ["cement-supplier-in-chennai", "m-sand-supplier-in-chennai", "bricks-supplier-in-chennai"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need today price for P Sand in Chennai.\nQuantity (Units/Tons):\nDelivery location:\nPlease share final quotation.",
    faqs: [
      { question: "What is the difference between M Sand and P Sand?", answer: "M Sand (Concrete Sand) is coarser and used for structural concrete and blockwork. P Sand (Plastering Sand) is processed to be much finer to provide a smooth finish on walls." },
      { question: "Will using P Sand cause cracks in the wall?", answer: "No, high-quality P Sand with the correct grading and minimal silt content actually reduces shrinkage cracks compared to unwashed river sand, provided the cement mortar ratio is correct." },
      { question: "Can I use P Sand for concrete?", answer: "No, P Sand is too fine for RCC concrete. Using it for concrete will result in lower strength. Always use M Sand for concrete and P Sand for plastering." },
      { question: "Do you deliver small quantities?", answer: "Delivery is optimized for lorry loads. Please contact us with your exact requirement and location so we can arrange the most cost-effective transport." }
    ]
  },
  {
    slug: "blue-metal-supplier-in-chennai",
    productName: "Blue Metal",
    todayPriceSlug: "/today-sand-and-aggregates-price",
    metaTitle: "Blue Metal Supplier in Chennai | 20mm, 12mm Aggregates",
    metaDescription: "Order 20mm, 12mm, and 40mm blue metal (coarse aggregates) for concrete in Chennai. Fast site delivery for bulk aggregate supplies.",
    metaKeywords: "blue metal supplier in chennai, coarse aggregates chennai, 20mm blue metal price, 12mm jelly, concrete aggregates supplier, crushed stone",
    overview: "Blue metal, or coarse aggregate, forms the core strength of any concrete structure. We supply machine-crushed, hard, and durable blue metal sourced from premium quarries. Available in standard sizes like 20mm, 12mm, and 40mm, our aggregates are cubical in shape and free from flaky particles, ensuring maximum compressive strength for your slabs, columns, and foundations.",
    commonUses: [
      "RCC slabs, columns, and beams (20mm)",
      "Foundation concrete and PCC (40mm)",
      "Thin concrete members and precast items (12mm/6mm)",
      "Road base and sub-base construction",
      "Drainage and landscaping",
      "Backfilling and leveling"
    ],
    typesAvailable: [
      { name: "20mm Blue Metal", detail: "The standard size for structural RCC (Reinforced Cement Concrete) like roof slabs, columns, and beams." },
      { name: "12mm Blue Metal", detail: "Smaller aggregate used for thin concrete sections, dense reinforcement areas, and hollow block filling." },
      { name: "40mm Blue Metal", detail: "Large aggregates used primarily for Plain Cement Concrete (PCC) in foundations, flooring bases, and road works." },
      { name: "Crusher Dust / 6mm", detail: "By-product of crushing, used for solid block manufacturing, leveling, and paving bases." }
    ],
    qualityChecklist: [
      "Ensure particles are cubical and angular, not flat or flaky.",
      "Check for hardness (should not break easily under light impact).",
      "Verify it is free from mud, clay coatings, and organic matter.",
      "Confirm the size consistency matches the ordered specification (e.g., mostly 20mm)."
    ],
    relatedProductSlugs: ["cement-supplier-in-chennai", "m-sand-supplier-in-chennai"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need today price for Blue Metal in Chennai.\nSize (20mm/12mm/40mm):\nQuantity (Units):\nDelivery location:\nPlease share final quotation.",
    faqs: [
      { question: "Which size blue metal is used for roof slabs?", answer: "20mm blue metal is the standard and most widely used size for RCC roof slabs, columns, and beams." },
      { question: "Can I order mixed sizes?", answer: "Usually, specific sizes are ordered depending on the construction stage. However, you can order different sizes in separate vehicle loads." },
      { question: "How is blue metal measured for billing?", answer: "Like M Sand, blue metal is typically measured in 'Units' (100 cubic feet) or by weight in tonnes." },
      { question: "Do you supply blue metal for road works?", answer: "Yes, we supply bulk quantities of 40mm metal, Wet Mix Macadam (WMM), and crusher dust for road construction and large paving projects." }
    ]
  },
  {
    slug: "bricks-supplier-in-chennai",
    productName: "Bricks",
    todayPriceSlug: "/today-bricks-and-blocks-price",
    metaTitle: "Bricks Supplier in Chennai | Red Chamber & Fly Ash Bricks",
    metaDescription: "Buy high-quality red chamber bricks, wire cut bricks, and fly ash bricks in Chennai. Reliable bricks supplier offering wholesale prices and direct site delivery.",
    metaKeywords: "bricks supplier in chennai, red bricks chennai, chamber bricks price, fly ash bricks supplier, wire cut bricks, construction bricks delivery",
    overview: "Bricks are the fundamental building blocks of residential and commercial walls. Sree Dhanalakshmi Enterprises supplies first-quality Red Chamber Bricks, Wire Cut Bricks, and eco-friendly Fly Ash Bricks across Chennai. We ensure our bricks are well-burnt, uniform in shape, and possess high compressive strength to provide excellent thermal insulation and structural stability to your walls.",
    commonUses: [
      "Exterior load-bearing and non-load-bearing walls",
      "Interior partition walls",
      "Compound walls and fencing",
      "Exposed brick elevations (Wire cut bricks)",
      "Foundation masonry",
      "Landscaping and pathways"
    ],
    typesAvailable: [
      { name: "Red Chamber Bricks", detail: "Traditional clay bricks baked in a chamber for uniform strength. Ideal for all general wall construction and plastering." },
      { name: "Wire Cut Bricks", detail: "Machine-made clay bricks with precise edges and smooth finishes, often used for exposed brickwork without plastering." },
      { name: "Fly Ash Bricks", detail: "Eco-friendly, cement-based bricks that are uniform in size, require less mortar, and offer good compressive strength." }
    ],
    qualityChecklist: [
      "Drop test: A good brick should not break when dropped from a height of about 1 meter.",
      "Sound test: Striking two bricks together should produce a clear metallic ringing sound.",
      "Visual check: Edges should be sharp and straight, and color should be uniform (copper-red for clay bricks).",
      "Water absorption: Bricks should not absorb excessive water when soaked.",
      "Hardness: You should not be able to leave a scratch with your fingernail."
    ],
    relatedProductSlugs: ["cement-supplier-in-chennai", "m-sand-supplier-in-chennai", "aac-blocks-supplier-in-chennai"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need today price for Bricks in Chennai.\nType (Red/Fly Ash):\nQuantity (Nos):\nDelivery location:\nPlease share final quotation.",
    faqs: [
      { question: "What is the difference between Chamber bricks and Country bricks?", answer: "Chamber bricks are baked continuously in a controlled kiln (chamber), resulting in uniform burning and higher strength. Country bricks are baked in open clamps and often have uneven shapes and lower strength." },
      { question: "Are fly ash bricks better than red bricks?", answer: "Fly ash bricks have better size uniformity, saving mortar and plastering material. They are also eco-friendly. However, red clay bricks offer better thermal insulation (keep houses cooler) and have proven longevity." },
      { question: "How many bricks come in one lorry load?", answer: "A typical lorry load can carry anywhere from 3,000 to 10,000 bricks depending on the vehicle size (e.g., 6-wheeler vs. 10-wheeler) and regional transport limits." },
      { question: "Do you supply wire cut bricks for exposed elevations?", answer: "Yes, we supply premium machine-made wire cut bricks that provide excellent aesthetics for unplastered, exposed brick facades." }
    ]
  },
  {
    slug: "aac-blocks-supplier-in-chennai",
    productName: "AAC Blocks",
    todayPriceSlug: "/today-bricks-and-blocks-price",
    metaTitle: "AAC Blocks Supplier in Chennai | Lightweight Concrete Blocks",
    metaDescription: "Leading AAC blocks supplier in Chennai. Buy lightweight Autoclaved Aerated Concrete blocks for fast, efficient, and heat-insulating wall construction.",
    metaKeywords: "aac blocks supplier in chennai, lightweight blocks chennai, aac blocks price, aerocon blocks supplier, concrete blocks for apartments",
    overview: "Autoclaved Aerated Concrete (AAC) blocks are the preferred modern material for wall construction in apartments and high-rise buildings. They are up to 3 times lighter than red bricks, significantly reducing the dead load on the building's structural framework. We supply high-quality, precisely cut AAC blocks across Chennai that offer superior thermal insulation, acoustic insulation, and faster construction speeds.",
    commonUses: [
      "Non-load bearing exterior and interior walls in framed structures",
      "High-rise apartment buildings and commercial complexes",
      "Thermal insulating walls",
      "Acoustic partitions",
      "Fast-track construction projects"
    ],
    typesAvailable: [
      { name: "Standard AAC Blocks (4 inch)", detail: "Typically used for interior partition walls to save space while providing excellent sound insulation." },
      { name: "Standard AAC Blocks (6 inch)", detail: "Widely used for both interior and some exterior walls, offering a good balance of strength and insulation." },
      { name: "Standard AAC Blocks (8 inch & 9 inch)", detail: "Used for primary exterior walls to provide maximum thermal insulation and weather protection." }
    ],
    qualityChecklist: [
      "Check the edges and corners (should be sharp and unbroken).",
      "Verify the dimensional accuracy (length, width, height should be uniform).",
      "Check the dry density to ensure it meets lightweight specifications.",
      "Ensure blocks are adequately cured before dispatch.",
      "Look for ISI certification or recognized brand marks."
    ],
    relatedProductSlugs: ["cement-supplier-in-chennai", "bricks-supplier-in-chennai"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need today price for AAC Blocks in Chennai.\nSize (4/6/8/9 inch):\nQuantity (Nos):\nDelivery location:\nPlease share final quotation.",
    faqs: [
      { question: "Why use AAC blocks instead of red bricks?", answer: "AAC blocks are lightweight (reducing structural steel cost), larger in size (faster construction), highly uniform (saves mortar and plaster), and provide superior heat and sound insulation compared to red bricks." },
      { question: "Can AAC blocks be used for load-bearing walls?", answer: "Generally, AAC blocks are recommended for non-load bearing walls in RCC framed structures (where columns and beams carry the load). They are not typically used for primary load-bearing walls in multi-story buildings." },
      { question: "What mortar is used to lay AAC blocks?", answer: "While traditional cement-sand mortar can be used, it is highly recommended to use specialized thin-bed block jointing adhesive for better bonding, zero shrinkage, and faster application." },
      { question: "Are AAC blocks water-resistant?", answer: "AAC blocks are porous. While they do not get damaged by water, they can absorb moisture. Exterior walls must be properly plastered and painted with weather-proof coatings to prevent water ingress." }
    ]
  },
  {
    slug: "fabrication-materials-supplier-in-chennai",
    productName: "Fabrication Materials",
    todayPriceSlug: "/today-fabrication-materials-price",
    metaTitle: "Fabrication Materials Supplier in Chennai | MS Angles, Pipes, Plates",
    metaDescription: "Wholesale fabrication materials supplier in Chennai. Buy MS angles, channels, square/round pipes, GI pipes, MS plates, and roofing sheets.",
    metaKeywords: "fabrication materials supplier in chennai, ms angle price chennai, structural steel supplier, ms pipes, gi pipes, ms plates, chequered plates",
    overview: "We offer a comprehensive range of structural steel and fabrication materials required for industrial sheds, roofing, gates, grills, and general metalworking. Sree Dhanalakshmi Enterprises supplies MS angles, channels, I-beams, MS and GI pipes (round, square, rectangular), MS plates, chequered plates, and roofing sheets. Our materials adhere to strict IS standards, ensuring durability, weldability, and structural safety.",
    commonUses: [
      "Industrial sheds and warehouse construction",
      "Residential gates, grills, and railings",
      "Structural framing and bracing",
      "Roofing trusses and purlins",
      "Staircases and platforms",
      "Machinery supports and industrial racks"
    ],
    typesAvailable: [
      { name: "Structural Sections", detail: "MS Angles, MS Channels (C-channels), I-Beams, and Joists for heavy structural frameworks." },
      { name: "Hollow Sections (Pipes)", detail: "MS and GI pipes in Round, Square (SHS), and Rectangular (RHS) profiles for versatile fabrication." },
      { name: "Plates & Flats", detail: "MS Plates, Chequered Plates (for flooring), and MS Flats for gussets, base plates, and general welding." },
      { name: "Roofing Sheets", detail: "Galvanized and color-coated profile sheets for roofing and cladding." }
    ],
    qualityChecklist: [
      "Check the thickness (gauge/mm) using a caliper to ensure it matches the order.",
      "Look for the brand or IS standard embossing on structural sections.",
      "Ensure straightness of pipes and angles without bends or warping.",
      "Check for excessive surface rust or pitting on MS materials.",
      "Verify the galvanization quality (zinc coating) on GI materials."
    ],
    relatedProductSlugs: ["ms-angle-supplier-in-chennai", "gi-pipe-supplier-in-chennai", "tmt-steel-supplier-in-chennai"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need today price for Fabrication Materials in Chennai.\nMaterials (e.g., MS Angle, Pipes):\nQuantity/Weight:\nDelivery location:\nPlease share final quotation.",
    faqs: [
      { question: "Do you supply materials by weight or by length?", answer: "Most fabrication materials like MS angles, channels, and plates are billed by weight (per kg or tonne). Pipes and sheets may be sold by weight or by piece/length depending on the specific product." },
      { question: "What is the standard length of MS angles and pipes?", answer: "Standard MS angles and pipes typically come in lengths of 6 meters (approx. 20 feet). Larger structural beams may be longer." },
      { question: "Do you provide cutting services?", answer: "We primarily supply full lengths for wholesale and bulk orders. Minor transport cuts can be arranged, but precision fabrication cutting should be done at your site." },
      { question: "What brands of structural steel do you supply?", answer: "We supply materials from reputed primary producers like SAIL, RINL, Tata Structura, JSW, as well as high-quality secondary rolling mills depending on your budget and specification." }
    ]
  },
  {
    slug: "ms-angle-supplier-in-chennai",
    productName: "MS Angle",
    todayPriceSlug: "/today-fabrication-materials-price",
    metaTitle: "MS Angle Supplier in Chennai | Mild Steel Structural Angles",
    metaDescription: "Buy MS Angles in Chennai at wholesale prices. We supply high-quality Mild Steel Angles for fabrication, structural framing, towers, and grills.",
    metaKeywords: "ms angle supplier in chennai, mild steel angle price, structural angle chennai, iron angle supplier, fabrication steel, vbed angle",
    overview: "Mild Steel (MS) Angles are L-shaped structural steel components forming the backbone of countless fabrication and construction projects. We supply high-quality MS Angles in various dimensions and thicknesses, conforming to IS:2062 standards. Known for their excellent weldability, machinability, and strength, our MS Angles are the reliable choice for brackets, bracing, frameworks, and everyday metal fabrication in Chennai.",
    commonUses: [
      "Fabrication of gates, grills, and fencing",
      "Structural frameworks and roof trusses",
      "Transmission towers and communication masts",
      "Brackets, cleats, and connection joints",
      "Frames for industrial equipment and racks",
      "Edge protection and reinforcement"
    ],
    typesAvailable: [
      { name: "Equal Angles", detail: "Both legs of the 'L' are of equal length (e.g., 50x50x5mm). Most commonly used for general fabrication and bracing." },
      { name: "Unequal Angles", detail: "The legs have different lengths (e.g., 75x50x6mm). Used in specialized structural applications requiring specific load distribution." }
    ],
    qualityChecklist: [
      "Verify the exact dimensions (Leg 1 x Leg 2 x Thickness).",
      "Check the 90-degree angle accuracy between the legs.",
      "Ensure the length is straight without bowing or twisting.",
      "Look for smooth edges without severe burrs or rolling defects.",
      "Check for the manufacturer's identification mark."
    ],
    relatedProductSlugs: ["fabrication-materials-supplier-in-chennai", "gi-pipe-supplier-in-chennai"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need today price for MS Angles in Chennai.\nSize (e.g. 50x50x5mm):\nQuantity (Tonnes/Lengths):\nDelivery location:\nPlease share final quotation.",
    faqs: [
      { question: "How are MS Angles priced?", answer: "MS Angles are typically priced and sold by weight (per kilogram or per tonne)." },
      { question: "What does '50x50x6' mean?", answer: "It refers to the dimensions of an Equal Angle where both legs are 50mm wide, and the thickness of the steel is 6mm." },
      { question: "Are MS Angles rust-proof?", answer: "No, Mild Steel will rust if exposed to moisture. It must be coated with red oxide primer and painted, or hot-dip galvanized to prevent corrosion." },
      { question: "Do you deliver to fabrication workshops?", answer: "Yes, we arrange delivery directly to fabrication workshops, industrial sites, and construction projects across Chennai." }
    ]
  },
  {
    slug: "gi-pipe-supplier-in-chennai",
    productName: "GI Pipe",
    todayPriceSlug: "/today-fabrication-materials-price",
    metaTitle: "GI Pipe Supplier in Chennai | Galvanized Iron Pipes",
    metaDescription: "Top GI Pipe supplier in Chennai. Get wholesale prices for Galvanized Iron round and square pipes used for fencing, roofing, and structural fabrication.",
    metaKeywords: "gi pipe supplier in chennai, galvanized iron pipe price, gi square tube chennai, gi round pipe, corrosion resistant pipes, roofing pipes",
    overview: "Galvanized Iron (GI) Pipes are mild steel pipes coated with a layer of zinc to protect them from rust and corrosion. Sree Dhanalakshmi Enterprises supplies premium GI pipes in round, square (SHS), and rectangular (RHS) profiles. Ideal for outdoor applications, humid environments, and coastal areas like Chennai, our GI pipes offer long-lasting durability for structural supports, fencing, roofing frameworks, and industrial piping.",
    commonUses: [
      "Shed roofing frameworks and trusses",
      "Handrails and staircases",
      "Outdoor fencing and gate frames",
      "Scaffolding and structural supports",
      "Agricultural structures and greenhouses",
      "Water and fluid transmission (specific grades)"
    ],
    typesAvailable: [
      { name: "GI Round Pipes", detail: "Standard circular pipes used for structural columns, handrails, scaffolding, and fluid transport. Available in Light, Medium, and Heavy classes." },
      { name: "GI Square Hollow Sections (SHS)", detail: "Square tubes widely used in modern fabrication for gates, frames, and clean architectural finishes." },
      { name: "GI Rectangular Hollow Sections (RHS)", detail: "Rectangular tubes preferred for roofing purlins and structural spans." }
    ],
    qualityChecklist: [
      "Check the uniformity of the zinc coating (galvanization) – it should be smooth and continuous.",
      "Verify the thickness (gauge or class) of the pipe.",
      "Ensure the pipe is straight without dents or crimps.",
      "Look for ISI marks and class color codes (e.g., Yellow for Light, Blue for Medium, Red for Heavy on round pipes)."
    ],
    relatedProductSlugs: ["fabrication-materials-supplier-in-chennai", "ms-angle-supplier-in-chennai"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need today price for GI Pipes in Chennai.\nSize/Shape:\nQuantity:\nDelivery location:\nPlease share final quotation.",
    faqs: [
      { question: "Why use GI pipes instead of MS pipes?", answer: "GI (Galvanized Iron) pipes have a zinc coating that prevents rusting. They are highly recommended for outdoor use, roofing frameworks, and coastal environments where MS (Mild Steel) pipes would corrode quickly." },
      { question: "What are Class A, B, and C pipes?", answer: "For round GI pipes, Class A (Light) is the thinnest, Class B (Medium) offers standard durability, and Class C (Heavy) has the thickest walls for high pressure or heavy structural loads." },
      { question: "Can GI pipes be welded?", answer: "Yes, GI pipes can be welded. However, welding burns off the zinc coating at the joint, so the welded area must be treated with zinc-rich cold galvanizing paint to prevent rust." },
      { question: "Do you supply pre-painted or color-coated pipes?", answer: "Standard GI pipes have a silver zinc finish. If you need painted pipes, you typically purchase standard GI or MS pipes and apply primer/paint post-fabrication." }
    ]
  }
];

export function getProductBySlug(slug: string): ProductSupplierData | undefined {
  return PRODUCT_SUPPLIER_PAGES.find((p) => p.slug === slug);
}

export const ALL_PRODUCT_SLUGS = PRODUCT_SUPPLIER_PAGES.map((p) => p.slug);
