export const PRODUCT_IMAGES: Record<string, string> = {
  // Cement
  "ultratech-opc-53": "/products/Ultratech_3ffecebb-dca9-4b58-b1c1-32a8cda2188a.png",
  "ramco-supercrete-ppc": "/products/RamcoSuper_Grade_PPC_BOPP_Cement.png",
  "dalmia-opc-53": "/products/Dalmia_544b3790-e3df-4088-88d0-d8d5ae7fb3c6.png",
  "acc-ppc": "/products/ACCppcpolythene.png",
  "chettinad-cement": "/products/Chettinad_3d2d7299-11a7-4dd0-a23e-c26f0cce6c7a.png",
  "jsw-cement-ppc": "/products/JSW_3f350f29-1b9f-48a3-87d1-252fbe34408c.png",
  "bharathi-opc-43": "/products/cements_brand.png", // fallback generic cement
  "ambuja-ppc": "/products/cements_brand (1).png", // fallback generic cement

  // Steel
  "tata-tiscon-fe500d": "/products/TATA_Steel_d50f05ea-d04a-4f0a-ae9f-92caeb87aea9.png",
  "jsw-neosteel-fe500d": "/products/JSW_product.png",
  "vizag-steel-fe500d": "/products/Vizag_Steel_f0b237df-790c-4fc3-81b3-8acc54a64351.png",
  "sail-fe500d": "/products/Sail_05d9d6b2-68cb-4998-bb97-2470130bb11d.png",
  "suryadev-fe500d": "/products/Shyam_Steel.png", // close enough fallback
  "agni-steels": "/products/Agni_e23ef7df-ef53-43e1-8940-1d734700b8e5.png",
  "ms-angles-is2062": "/products/steel-tmt-bars-1000x1000-removebg-preview.png",

  // Bricks & Blocks
  "aac-blocks-4inch": "/products/Single_card.png",
  "aac-blocks-6inch": "/products/Triple_card_1.png",
  "aac-blocks-8inch": "/products/Triple_card_1.png",
  "solid-concrete-blocks": "/products/chamberbox.jpg",
  "hollow-concrete-blocks": "/products/chamberbox.jpg",
  "fly-ash-bricks": "/products/Stack_of_Bricks.H03.2k.png",
  "red-bricks-country": "/products/Stack_of_Bricks.H03.2k.png",

  // Sand & Aggregates
  "m-sand": "/products/Msandpc.png",
  "p-sand": "/products/Psandpc.png",
  "river-sand": "/products/River_sand.png",
  "20mm-jelly": "/products/6mmaggrigates.png",
  "40mm-jelly": "/products/Aggrigate_3.png",
  "quarry-dust": "/products/redsoilsand.png",
};

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "cement": "/products/cements_brand.png",
  "steel": "/products/steel-tmt-bars-1000x1000-removebg-preview.png",
  "bricks-and-blocks": "/products/Stack_of_Bricks.H03.2k.png",
  "sand-and-aggregates": "/products/Sand_Pile.H03.2k.png",
};

export function getProductImage(slug: string, categorySlug: string = "cement"): string {
  if (PRODUCT_IMAGES[slug]) {
    return PRODUCT_IMAGES[slug];
  }
  return CATEGORY_FALLBACK_IMAGES[categorySlug] || "/products/cements_brand.png";
}
