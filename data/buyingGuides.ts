export interface BuyingGuideData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  shortAnswer: string;
  sections: { heading: string; content: string }[];
  comparisonTable?: { headers: string[]; rows: string[][] };
  commonMistakes: string[];
  whenToContact: string;
  relatedProductSlugs: string[];
  relatedPriceSlugs: string[];
  whatsappMessage: string;
  faqs: { question: string; answer: string }[];
}

export const BUYING_GUIDES: BuyingGuideData[] = [
  {
    slug: "m-sand-vs-p-sand",
    title: "M Sand vs P Sand: What's the Difference?",
    metaTitle: "M Sand vs P Sand: Difference & Uses in Construction",
    metaDescription: "Understand the difference between M Sand (Concrete Sand) and P Sand (Plastering Sand). Learn which manufactured sand to use for concrete, blockwork, and wall plastering.",
    metaKeywords: "m sand vs p sand, difference between m sand and p sand, concrete sand vs plastering sand, manufactured sand comparison",
    shortAnswer: "M Sand (Manufactured Sand) has coarse, cubical particles (0-4.75mm) and is used for structural concrete and blockwork. P Sand (Plastering Sand) is much finer (0-2.36mm), lacks coarse aggregates, and is used exclusively for achieving smooth wall plastering finishes.",
    sections: [
      {
        heading: "What is M Sand?",
        content: "M Sand (Manufactured Sand) is produced by crushing hard granite stones. It is the modern replacement for river sand in concrete construction. Good M Sand has a cubical shape, which provides excellent interlocking strength in concrete mixes. It is used primarily for RCC slabs, columns, beams, and brickwork."
      },
      {
        heading: "What is P Sand?",
        content: "P Sand (Plastering Sand) is a sub-category of manufactured sand. During the crushing process, the sand is further screened and washed to isolate only the finest particles. Because it contains no large grit, it creates a perfectly smooth surface when mixed with cement, making it ideal for interior and exterior wall plastering."
      },
      {
        heading: "Why You Need Both for Your Project",
        content: "A standard house construction requires both types of sand. Attempting to use M Sand for plastering will result in a rough, uneven wall that consumes excess putty and paint. Conversely, using P Sand for concrete will drastically reduce the structural strength because the fine particles cannot bear heavy loads."
      }
    ],
    comparisonTable: {
      headers: ["Feature", "M Sand (Concrete Sand)", "P Sand (Plastering Sand)"],
      rows: [
        ["Particle Size", "0 to 4.75 mm (Coarse)", "0 to 2.36 mm (Fine)"],
        ["Primary Use", "RCC Concrete, Brickwork, Block masonry", "Wall and Ceiling Plastering"],
        ["Texture", "Rough and Gritty", "Smooth and Fine"],
        ["Silt Content", "Must be less than 5%", "Very low, rigorously washed"],
        ["Cost", "Base price", "Slightly higher due to extra processing"]
      ]
    },
    commonMistakes: [
      "Using M Sand for plastering, which leads to rough walls and high painting costs.",
      "Using P Sand for RCC columns or slabs, which compromises structural strength.",
      "Buying unwashed M Sand with high dust content, which causes concrete cracks."
    ],
    whenToContact: "Contact Sree Dhanalakshmi Enterprises when you need bulk delivery of double-washed M Sand for your foundation and structural work, or fine P Sand when you reach the finishing stage of your project.",
    relatedProductSlugs: ["m-sand-supplier-in-chennai", "p-sand-supplier-in-chennai"],
    relatedPriceSlugs: ["/today-sand-and-aggregates-price"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need help choosing construction materials for my project in Chennai. Please share today price and guidance.",
    faqs: [
      { question: "Is river sand better than M Sand?", answer: "High-quality, washed M Sand is widely considered better for concrete than unwashed river sand because it has a controlled cubical shape, consistent grading, and zero marine or organic impurities." },
      { question: "Can I use M sand for brickwork?", answer: "Yes, standard or double-washed M Sand is the recommended material for brickwork and block masonry." },
      { question: "Why is P Sand more expensive?", answer: "P Sand requires additional screening and washing processes to remove larger particles and ensure the extra-fine texture needed for smooth plastering." },
      { question: "How can I check the quality of sand at the site?", answer: "Take a handful of sand and rub it between wet hands. If a heavy mud coating remains on your hands, the silt content is too high. Good sand should feel gritty, not clay-like." },
      { question: "Do you supply both M Sand and P Sand?", answer: "Yes, we supply premium quality, washed M Sand and P Sand across Chennai in bulk lorry loads." }
    ]
  },
  {
    slug: "opc-vs-ppc-cement",
    title: "OPC vs PPC Cement: Which is Best for House Construction?",
    metaTitle: "OPC vs PPC Cement: Best Cement for House Construction",
    metaDescription: "Confused between OPC 53 and PPC cement? Learn the differences, advantages, and which cement to use for slabs, columns, brickwork, and plastering.",
    metaKeywords: "opc vs ppc cement, best cement for house, opc 53 vs ppc, cement for slab, cement for plastering",
    shortAnswer: "Use OPC 53 (Ordinary Portland Cement) for structural components that require high early strength, like columns, beams, and roof slabs. Use PPC (Portland Pozzolana Cement) for brickwork, block masonry, and plastering due to its superior workability, smooth finish, and crack-resistance.",
    sections: [
      {
        heading: "Understanding OPC (Ordinary Portland Cement)",
        content: "OPC is the most common type of cement. In India, it is primarily available in 53 Grade and 43 Grade. OPC 53 gains high strength very quickly, allowing builders to remove formwork (shuttering) sooner. This makes it the undisputed choice for fast-paced structural RCC work, especially high-rise buildings and load-bearing columns."
      },
      {
        heading: "Understanding PPC (Portland Pozzolana Cement)",
        content: "PPC is manufactured by adding pozzolanic materials (like fly ash) to OPC clinker. It cures slower than OPC but generates less heat of hydration. This slow curing process significantly reduces the risk of shrinkage cracks. It is also highly resistant to chemical attacks, making it highly durable over the long term."
      },
      {
        heading: "The Ideal Combination for House Construction",
        content: "Most structural engineers recommend a dual-cement approach. Procure OPC 53 for the foundation, columns, and roof slabs to ensure maximum structural strength. Once the frame is complete, switch to PPC for building the brick walls and plastering to ensure a smooth, crack-free finish that resists dampness."
      }
    ],
    comparisonTable: {
      headers: ["Feature", "OPC (Ordinary Portland Cement)", "PPC (Portland Pozzolana Cement)"],
      rows: [
        ["Setting Time", "Fast setting, high early strength", "Slower setting, long-term strength"],
        ["Heat of Hydration", "High (Requires rigorous water curing)", "Low (Less prone to thermal cracks)"],
        ["Workability", "Standard", "High (Smoother finish)"],
        ["Best Used For", "RCC slabs, columns, beams, foundations", "Plastering, brickwork, tiling, water tanks"],
        ["Cost", "Slightly higher", "Slightly lower / Economical"]
      ]
    },
    commonMistakes: [
      "Using OPC for plastering, which increases the risk of hairline shrinkage cracks due to high heat of hydration.",
      "Failing to cure OPC structures with adequate water for the required 7-14 days.",
      "Assuming PPC is 'weaker' than OPC. PPC actually achieves equal or greater strength than OPC over a 90-day period."
    ],
    whenToContact: "Contact Sree Dhanalakshmi Enterprises when planning your material procurement. We can supply OPC 53 for your foundation phase and schedule PPC deliveries as your project moves into the masonry stage.",
    relatedProductSlugs: ["cement-supplier-in-chennai"],
    relatedPriceSlugs: ["/today-cement-price"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need help choosing construction materials for my project in Chennai. Please share today price and guidance.",
    faqs: [
      { question: "Is PPC cement good for roof slabs?", answer: "While PPC can be used for slabs (and provides excellent waterproofing properties), it sets slowly. If you use PPC, you must leave the shuttering in place longer than if you used OPC 53." },
      { question: "What does 53 Grade mean?", answer: "53 Grade indicates that the cement will attain a compressive strength of 53 MegaPascals (MPa) after 28 days of curing." },
      { question: "Which brand of cement is best?", answer: "Top tier brands like UltraTech, Ramco, and Dalmia produce excellent quality in both OPC and PPC. The choice often comes down to regional availability, engineer preference, and pricing." },
      { question: "How long should I water cure the cement?", answer: "OPC requires continuous wet curing for at least 7 to 10 days. PPC benefits from extended curing of 10 to 14 days for optimal strength development." },
      { question: "Does cement expire?", answer: "Yes, cement absorbs moisture from the air over time. It is recommended to use cement within 3 months (90 days) of its manufacturing date printed on the bag." }
    ]
  },
  {
    slug: "fe-500d-vs-fe-550d-tmt-bars",
    title: "Fe 500D vs Fe 550D TMT Bars: Which Should You Buy?",
    metaTitle: "Fe 500D vs Fe 550D TMT Bars: Best Steel for Construction",
    metaDescription: "Compare Fe 500D and Fe 550D TMT steel bars. Learn which grade is best for independent houses, apartments, and earthquake-resistant construction.",
    metaKeywords: "fe 500d vs fe 550d, tmt steel grades, best tmt bar for house, fe 550d uses, earthquake resistant steel",
    shortAnswer: "Fe 500D is the industry standard for most independent houses and low-rise apartments, offering the perfect balance of strength and flexibility (ductility) to resist earthquakes. Fe 550D has higher tensile strength and is typically specified by structural engineers for high-rise buildings, heavy load-bearing structures, and bridges.",
    sections: [
      {
        heading: "What does 'Fe', '500', and 'D' mean?",
        content: "In TMT steel nomenclature, 'Fe' stands for Iron (Ferrum). The number (500 or 550) represents the minimum Yield Stress in N/mm² (how much load it can bear before permanent deformation). The letter 'D' stands for Ductility, meaning the steel can bend significantly without snapping."
      },
      {
        heading: "Understanding Fe 500D",
        content: "Fe 500D is the most widely recommended grade by civil engineers for standard residential and commercial construction. Its high ductility allows the building structure to absorb seismic shocks and vibrations during an earthquake, making it highly safe. It bends easily during fabrication without cracking."
      },
      {
        heading: "Understanding Fe 550D",
        content: "Fe 550D offers about 10% more tensile strength than Fe 500D. Because it is stronger, engineers can sometimes design structures using slightly less steel by weight, leading to cost savings in massive projects. However, it is slightly less flexible than 500D. It is the go-to choice for multi-story towers and heavy infrastructure."
      }
    ],
    comparisonTable: {
      headers: ["Feature", "Fe 500D TMT Bars", "Fe 550D TMT Bars"],
      rows: [
        ["Yield Strength", "500 N/mm²", "550 N/mm²"],
        ["Ductility / Flexibility", "Excellent (Higher elongation)", "Very Good (Slightly lower than 500D)"],
        ["Earthquake Resistance", "Exceptional", "High"],
        ["Best Used For", "Independent houses, villas, small apartments", "High-rise apartments, bridges, heavy industrial"],
        ["Cost", "Base market price", "Premium pricing"]
      ]
    },
    commonMistakes: [
      "Buying standard Fe 500 (without the 'D') to save money, thereby sacrificing crucial earthquake-absorbing ductility.",
      "Using Fe 550D for a small single-story house without engineer approval, which is an unnecessary over-specification.",
      "Mixing different grades of steel in the same structural member (like a single column), which causes uneven load distribution."
    ],
    whenToContact: "Share your structural engineer's steel requirement list with Sree Dhanalakshmi Enterprises via WhatsApp. We will provide a competitive wholesale quotation for premium brands in either Fe 500D or Fe 550D grades.",
    relatedProductSlugs: ["tmt-steel-supplier-in-chennai"],
    relatedPriceSlugs: ["/today-steel-price"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need help choosing construction materials for my project in Chennai. Please share today price and guidance.",
    faqs: [
      { question: "Is Fe 550D better than Fe 500D?", answer: "It is 'stronger' in terms of load-bearing capacity, but not necessarily 'better' for every project. Fe 500D has higher ductility, which is often more critical for earthquake resistance in standard residential homes." },
      { question: "What is CRS TMT Steel?", answer: "CRS stands for Corrosion Resistant Steel. Elements like copper and chromium are added to the alloy to resist rust. It is highly recommended for construction in coastal areas like Chennai." },
      { question: "Which brands manufacture 'D' grade steel?", answer: "Top primary steel producers like Tata Tiscon, JSW Neosteel, Vizag Steel, and SAIL are known for their high-quality 'D' grade TMT bars." },
      { question: "How do I check if the steel delivered is genuine?", answer: "Every meter of a genuine TMT bar will have the brand name, grade (e.g., Fe 500D), and ISI mark embossed on it. You can also request a test certificate from the supplier." },
      { question: "Can I weld TMT bars?", answer: "Yes, modern TMT bars have low carbon content, which provides excellent weldability without losing strength at the welded joints." }
    ]
  },
  {
    slug: "aac-blocks-vs-red-bricks",
    title: "AAC Blocks vs Red Bricks: Which is Better?",
    metaTitle: "AAC Blocks vs Red Bricks: Cost & Quality Comparison",
    metaDescription: "Compare AAC blocks and red clay bricks for construction. Discover the differences in weight, cost, thermal insulation, and construction speed.",
    metaKeywords: "aac blocks vs red bricks, aerocon blocks vs red bricks, lightweight blocks vs bricks, wall construction materials, building materials comparison",
    shortAnswer: "AAC blocks are lightweight, fast to lay, and offer excellent thermal/sound insulation, making them ideal for high-rise apartments and framed structures. Red clay bricks are heavier and slower to lay but offer unmatched durability, water resistance, and high load-bearing capacity, making them the traditional choice for independent houses.",
    sections: [
      {
        heading: "What are Red Bricks?",
        content: "Red bricks are the traditional building material made by molding clay and baking it in kilns (chamber bricks). They have proven their longevity over centuries. They are excellent at handling compressive loads, can withstand heavy rain, and keep interiors cool in hot climates."
      },
      {
        heading: "What are AAC Blocks?",
        content: "Autoclaved Aerated Concrete (AAC) blocks are a modern, precast concrete product. Through a chemical reaction, millions of tiny air bubbles are trapped inside the block, making it extremely lightweight (about 1/3 the weight of a red brick) and giving it superior insulation properties."
      },
      {
        heading: "Impact on Structural Cost",
        content: "Because AAC blocks are so light, they significantly reduce the 'dead load' on the building's columns and beams. For multi-story apartment buildings, this allows engineers to use less structural steel and concrete in the foundation, resulting in substantial cost savings."
      }
    ],
    comparisonTable: {
      headers: ["Feature", "Red Chamber Bricks", "AAC Blocks"],
      rows: [
        ["Weight", "Heavy (High dead load)", "Lightweight (Reduces structural cost)"],
        ["Construction Speed", "Slow (Requires more joints)", "Fast (Large size covers more area quickly)"],
        ["Thermal Insulation", "Good", "Excellent (Reduces AC bills)"],
        ["Water Resistance", "Excellent (Ideal for wet areas)", "Porous (Requires good exterior plastering)"],
        ["Mortar Usage", "High (Uneven surfaces)", "Low (Using thin-bed jointing adhesive)"],
        ["Best Used For", "Independent houses, load-bearing walls, bathrooms", "High-rise apartments, partition walls, commercial buildings"]
      ]
    },
    commonMistakes: [
      "Using AAC blocks for bathrooms or basements without adequate waterproofing, as they can absorb moisture.",
      "Using thick cement mortar for AAC blocks instead of specialized block jointing adhesive, which negates the cost savings and leads to cracks.",
      "Using red bricks for interior partition walls in a 10-story building, unnecessarily increasing the load on the foundation."
    ],
    whenToContact: "Whether you choose traditional red chamber bricks for your independent house or lightweight AAC blocks for an apartment project, contact Sree Dhanalakshmi Enterprises for bulk wholesale supply across Chennai.",
    relatedProductSlugs: ["aac-blocks-supplier-in-chennai", "bricks-supplier-in-chennai"],
    relatedPriceSlugs: ["/today-bricks-and-blocks-price"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need help choosing construction materials for my project in Chennai. Please share today price and guidance.",
    faqs: [
      { question: "Are AAC blocks cheaper than red bricks?", answer: "The per-unit cost of an AAC block is higher, but because one block covers the area of 6-7 red bricks, the overall walling cost (including savings on mortar and labor) is usually lower or equal." },
      { question: "Can I drill holes in AAC blocks for heavy TVs or cabinets?", answer: "Yes, but you must use specialized AAC block fasteners or anchor bolts, as standard rawl plugs may pull out of the aerated material." },
      { question: "Do AAC blocks require plastering?", answer: "Interior walls built with AAC blocks are very smooth and can sometimes be finished with just wall putty. However, exterior walls must be plastered and waterproofed to prevent water absorption." },
      { question: "Which is better for soundproofing?", answer: "AAC blocks offer superior acoustic insulation due to their porous, air-filled structure, making them excellent for partition walls between apartment units." },
      { question: "Can I use both in the same house?", answer: "Yes! A common modern practice is to use red bricks for exterior boundary walls and wet areas (bathrooms), and AAC blocks for interior dry partition walls." }
    ]
  },
  {
    slug: "blue-metal-sizes-for-concrete",
    title: "Guide to Blue Metal Sizes: 6mm, 12mm, 20mm, 40mm",
    metaTitle: "Blue Metal Sizes Guide | 20mm, 12mm, 40mm Aggregates Uses",
    metaDescription: "Understand the different sizes of blue metal (coarse aggregates) used in construction. Learn when to use 20mm, 12mm, 40mm, and 6mm for concrete and foundations.",
    metaKeywords: "blue metal sizes, 20mm aggregate uses, 12mm aggregate, 40mm aggregate for pcc, coarse aggregate sizes, blue metal for concrete",
    shortAnswer: "20mm blue metal is the standard size used for structural RCC like roof slabs and columns. 12mm is used for thin sections and dense reinforcement. 40mm is used for foundation PCC and road base, while 6mm (crusher dust) is used for block making and leveling.",
    sections: [
      {
        heading: "The Role of Coarse Aggregates",
        content: "Blue metal (crushed stone) makes up about 60-75% of the total volume of concrete. It acts as the structural filler that gives concrete its compressive strength. The cement and sand simply act as the glue (binder) to hold these stones together."
      },
      {
        heading: "20mm Blue Metal: The Standard",
        content: "20mm is the most universally used aggregate size in residential and commercial construction. It is small enough to pass between the steel reinforcement bars (TMT steel) but large enough to provide massive structural strength. It is the primary choice for roof slabs, load-bearing columns, beams, and lintels."
      },
      {
        heading: "12mm and 40mm: Specialized Uses",
        content: "12mm metal is smaller and flows easily. It is used in areas where steel reinforcement is very congested, or in thin concrete members (like precast walls) where 20mm stones might get stuck and cause 'honeycombing'. 40mm metal is large and bulky. It is not used with steel reinforcement; instead, it is used for mass Plain Cement Concrete (PCC) in foundation trenches and road sub-bases."
      }
    ],
    comparisonTable: {
      headers: ["Size", "Common Name", "Primary Applications"],
      rows: [
        ["20 mm", "3/4 inch Jelly", "RCC Slabs, Columns, Beams, Staircases, Heavy structural members"],
        ["12 mm", "1/2 inch Jelly", "Thin sections, congested reinforcement areas, precast elements, hollow block filling"],
        ["40 mm", "1.5 inch Jelly", "PCC for foundations, flooring base, road sub-base, mass concrete without steel"],
        ["6 mm", "Crusher Dust / Baby Metal", "Solid block manufacturing, pathway leveling, paving base"]
      ]
    },
    commonMistakes: [
      "Using 40mm metal in an RCC roof slab. The large stones will not pass through the steel mesh, leaving dangerous empty gaps (honeycombing) in the concrete.",
      "Using only 12mm metal for a heavy load-bearing column, which results in lower overall compressive strength compared to a 20mm mix.",
      "Accepting flaky or elongated blue metal, which compromises the strength of the concrete mix (stones should be cubical)."
    ],
    whenToContact: "When you are ready to pour your foundation or lay your roof slab, contact Sree Dhanalakshmi Enterprises for bulk lorry delivery of clean, cubical blue metal in any standard size.",
    relatedProductSlugs: ["blue-metal-supplier-in-chennai", "m-sand-supplier-in-chennai", "cement-supplier-in-chennai"],
    relatedPriceSlugs: ["/today-sand-and-aggregates-price", "/today-cement-price"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I need help choosing construction materials for my project in Chennai. Please share today price and guidance.",
    faqs: [
      { question: "Can I mix 20mm and 12mm blue metal?", answer: "Yes, mixing sizes (e.g., 60% of 20mm and 40% of 12mm) is actually a best practice known as 'well-graded aggregate'. It ensures the smaller stones fill the gaps between the larger stones, creating denser, stronger concrete." },
      { question: "What is honeycombing in concrete?", answer: "Honeycombing occurs when the coarse aggregate (blue metal) fails to mix evenly with the cement paste and gets stuck in the steel reinforcement, leaving visible stony pockets and voids in the finished concrete." },
      { question: "How is blue metal measured?", answer: "It is usually measured and sold in Units (1 Unit = 100 Cubic Feet) or by weight (tonnes)." },
      { question: "Is the color of the stone important?", answer: "The exact shade (gray vs dark blue) depends on the quarry source and doesn't dictate strength. The hardness, cubical shape, and absence of mud are the critical quality factors." }
    ]
  },
  {
    slug: "construction-materials-required-for-1000-sq-ft-house",
    title: "How Much Material is Required for a 1000 Sq Ft House?",
    metaTitle: "Materials Required for 1000 Sq Ft House | Cement, Steel, Bricks",
    metaDescription: "Estimate the quantity of cement, TMT steel, sand, and bricks required to build a 1000 sq ft independent house. Simple rule of thumb calculations.",
    metaKeywords: "materials required for 1000 sq ft house, cement for 1000 sq ft, steel calculation for house, bricks estimate for house, construction material calculator",
    shortAnswer: "For a standard 1000 sq ft single-story RCC framed house, you will roughly need: 400-450 bags of cement, 3 to 4.5 metric tonnes of TMT steel, 15,000-20,000 red bricks, and about 40-50 units of sand (M-Sand + P-Sand combined).",
    sections: [
      {
        heading: "Important Disclaimer on Estimates",
        content: "Quantities are approximate only. Actual quantity depends on the structural design, soil condition, number of floors, slab thickness, wall type, wastage, and the structural engineer's drawings. Use these numbers only for rough budgeting."
      },
      {
        heading: "Cement & Steel Estimates",
        content: "Cement is the primary binder. Expect to use around 0.4 bags per square foot of built-up area (approx 400 bags for 1000 sqft). Steel consumption varies heavily based on the foundation depth and structural design, usually ranging from 3.5kg to 4.5kg per square foot."
      },
      {
        heading: "Sand, Aggregates & Bricks",
        content: "You will need roughly 1.5 to 2 cubic feet (CFT) of coarse aggregate (blue metal) and 1.5 to 2 CFT of sand (M Sand & P Sand) per square foot. Brick calculations depend entirely on the number of partition walls and window openings, but typically run between 15 and 20 bricks per square foot of built-up area."
      }
    ],
    comparisonTable: {
      headers: ["Material", "Thumb Rule (per Sq.Ft)", "Estimated Total for 1000 Sq.Ft"],
      rows: [
        ["Cement", "0.4 bags", "400 - 450 Bags"],
        ["TMT Steel", "3.5 to 4.5 kg", "3,500 - 4,500 Kg (3.5 - 4.5 Tonnes)"],
        ["Bricks (Standard size)", "15 to 20 numbers", "15,000 - 20,000 Nos"],
        ["M Sand + P Sand", "1.5 to 2.0 CFT", "1500 - 2000 CFT (15 - 20 Units)"],
        ["Blue Metal (Aggregates)", "1.5 to 2.0 CFT", "1500 - 2000 CFT (15 - 20 Units)"]
      ]
    },
    commonMistakes: [
      "Ordering all 400 bags of cement at once. Cement expires; order it in batches of 50-100 bags as needed for each phase.",
      "Not factoring in 5-10% material wastage due to cutting, transport, and mishandling at the site.",
      "Blindly following thumb rules without consulting the structural drawings provided by an architect or engineer."
    ],
    whenToContact: "Once your engineer provides the Bill of Quantities (BOQ), send the list to Sree Dhanalakshmi Enterprises via WhatsApp. We will provide a complete, phased quotation for supplying all materials from foundation to finish.",
    relatedProductSlugs: ["cement-supplier-in-chennai", "tmt-steel-supplier-in-chennai", "m-sand-supplier-in-chennai", "bricks-supplier-in-chennai"],
    relatedPriceSlugs: ["/today-cement-price", "/today-steel-price", "/today-sand-and-aggregates-price", "/today-bricks-and-blocks-price"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I have the BOQ for my house construction in Chennai. I need a quotation for bulk supply of cement, steel, sand, and bricks.",
    faqs: [
      { question: "How do I calculate cement for just the roof slab?", answer: "A 1000 sq ft roof slab typically requires 85 to 100 bags of cement, depending on the slab thickness (usually 5 or 6 inches)." },
      { question: "Is it cheaper to buy materials myself or give it to a contractor with materials?", answer: "Procuring materials yourself from a wholesale supplier like SDE Enterprises ensures you get genuine quality and zero margin markup. However, it requires you to actively manage deliveries and site inventory." },
      { question: "When should I order the materials?", answer: "Order steel and blue metal just before foundation work begins. Order cement a few days before casting to ensure maximum freshness. Order bricks and sand as the frame completes." },
      { question: "How many bricks are in one square foot of a 9-inch wall?", answer: "A standard 9-inch thick wall requires approximately 10 to 11 standard modular bricks per square foot of wall face area." }
    ]
  },
  {
    slug: "how-to-buy-construction-materials-in-chennai",
    title: "Checklist: How to Buy Construction Materials Safely",
    metaTitle: "Checklist for Buying Construction Materials in Chennai",
    metaDescription: "Learn how to buy construction materials safely in Chennai. Avoid scams, hidden charges, and poor quality with our comprehensive procurement checklist.",
    metaKeywords: "buy construction materials chennai, building material checklist, cement buying guide, construction procurement, hidden delivery charges",
    shortAnswer: "To buy construction materials safely, always confirm the final 'landed cost'. This means your quotation must clearly outline the base price, exact brand/grade, GST, transport delivery charges to your site, and unloading responsibilities.",
    sections: [
      {
        heading: "1. Beware of Unrealistically Low Prices",
        content: "If a supplier quotes a price significantly lower than the daily market rate, be cautious. Common scams include delivering lower-grade materials (e.g., Fe 500 instead of Fe 500D), short-weighing sand and steel, or supplying expired cement."
      },
      {
        heading: "2. Understand Transport and Unloading",
        content: "Material cost is only one part of the equation. Heavy materials like sand, blue metal, and bricks require expensive transport. Always ask if the quoted price includes delivery to your specific location. Furthermore, clarify who is responsible for unloading the material at the site—the supplier's crew or your contractor's laborers."
      },
      {
        heading: "3. Verify Brand and Grade Specifications",
        content: "Don't just ask for 'Steel' or 'Cement'. Ask for 'Tata Tiscon Fe 500D 12mm' or 'UltraTech OPC 53 Grade'. Ensure the quotation explicitly mentions the brand and grade, and verify the embossing on the materials when they arrive at the site."
      }
    ],
    comparisonTable: {
      headers: ["What to Ask", "Poor Practice", "Best Practice (SDE Standards)"],
      rows: [
        ["Quotation Structure", "Verbal lump sum estimate", "Written quote separating Base Price, GST, and Transport"],
        ["Material Grade", "Generic 'First Quality'", "Specific brand name and IS/Fe/OPC grade"],
        ["Weighing", "Visual estimate of lorry load", "Providing a computerized weighbridge slip for bulk orders"],
        ["Payment Terms", "100% advance to personal account", "Clear terms, payment to official company business account"]
      ]
    },
    commonMistakes: [
      "Forgetting to ask if the price includes 18% GST (for steel/cement) or 5% GST (for sand/bricks), leading to a huge budget shock.",
      "Not checking the manufacturing date on cement bags upon delivery.",
      "Buying all materials from multiple small local shops at retail prices instead of a single wholesale distributor."
    ],
    whenToContact: "Make Sree Dhanalakshmi Enterprises your single-point wholesale supplier. Share your requirement list via WhatsApp, and we will provide a transparent quotation with no hidden costs.",
    relatedProductSlugs: ["cement-supplier-in-chennai", "tmt-steel-supplier-in-chennai"],
    relatedPriceSlugs: ["/today-cement-price", "/today-steel-price"],
    whatsappMessage: "Hi Sree Dhanalakshmi Enterprises, I want to procure materials for my construction site in Chennai. Please guide me on the pricing and delivery process.",
    faqs: [
      { question: "What is a 'Landed Cost'?", answer: "Landed cost is the final price you pay to get the material into your hands at the site. It includes Base Price + GST + Transportation + Tolls + Unloading charges." },
      { question: "How can I be sure of the weight of Sand or Steel?", answer: "For bulk deliveries, you can request a weighbridge slip. The truck is weighed empty (tare weight) and fully loaded (gross weight), and the difference is the exact weight of your material." },
      { question: "Can I return excess materials?", answer: "Policies vary by supplier. Generally, undamaged steel in full lengths and unopened, fresh cement bags can be returned with a restocking and return-transport fee. Loose materials like sand cannot be returned." },
      { question: "Why do prices fluctuate daily?", answer: "Steel and cement are commodities traded on national markets. Their prices change frequently based on raw material costs (coal, iron ore), factory production levels, and transport fuel costs." },
      { question: "Is it better to buy from one supplier or many?", answer: "Sourcing everything from a single large distributor like SDE Enterprises ensures better wholesale pricing, easier delivery coordination, and accountability for quality." }
    ]
  }
];

export function getGuideBySlug(slug: string): BuyingGuideData | undefined {
  return BUYING_GUIDES.find((g) => g.slug === slug);
}

export const ALL_GUIDE_SLUGS = BUYING_GUIDES.map((g) => g.slug);
