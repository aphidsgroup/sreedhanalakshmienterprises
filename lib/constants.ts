// Business constants — sourced from brochure
export const BUSINESS = {
  name: "Sree Dhanalakshmi Enterprises",
  shortName: "SDE Enterprises",
  tagline: "Delivering quality, Building trust",
  email: "",
  whatsapp: "919094779299",
  whatsappDisplay: "90947 79299",
  established: "1980",
  branches: [
    {
      id: "kilpauk",
      name: "Kilpauk Branch",
      address: "No. 72, Kilpauk Garden Road",
      city: "Kilpauk, Chennai",
      pincode: "600010",
      phone1: "90947 79299",
      phone2: "90940 18182",
      phone1Href: "tel:+919094779299",
      phone2Href: "tel:+919094018182",
      isPrimary: true,
      mapQuery: "No+72+Kilpauk+Garden+Road+Kilpauk+Chennai+600010",
    },
    {
      id: "mangadu",
      name: "Mangadu Branch",
      address: "No. 343, KK Nagar, Kundrathur Main Road",
      city: "Mangadu, Chennai",
      pincode: "600122",
      phone1: "73057 77117",
      phone2: null,
      phone1Href: "tel:+917305777117",
      phone2Href: null,
      isPrimary: false,
      mapQuery: "No+343+KK+Nagar+Kundrathur+Main+Road+Mangadu+Chennai+600122",
    },
  ],
} as const;

export const BRAND_COLORS = {
  primary: "#2B7A8C",
  primaryDark: "#1E5F6E",
  primaryLight: "#3D9AAF",
  accent: "#C8972A",
  charcoal: "#1A2129",
  steel: "#4A5568",
  mist: "#F0F4F6",
} as const;

export const CATEGORIES = [
  { slug: "cement", name: "Cement", icon: "🏗️", priceSlug: "today-cement-price" },
  { slug: "steel", name: "Steel / TMT Bars", icon: "⚙️", priceSlug: "today-steel-price" },
  { slug: "bricks-and-blocks", name: "Bricks & Blocks", icon: "🧱", priceSlug: "today-bricks-and-blocks-price" },
  { slug: "sand-and-aggregates", name: "Sand & Aggregates", icon: "⛏️", priceSlug: "today-sand-and-aggregates-price" },
] as const;

export const TRUSTED_CLIENTS = [
  "Appaswamy Real Estates",
  "Arun Excello",
  "India Builders",
  "Pushkar Properties",
  "Firm Foundations",
  "Red Brick Constructions",
];

export const SERVICE_AREAS = [
  "Chennai",
  "Kilpauk",
  "Mangadu",
  "Anna Nagar",
  "Porur",
  "Koyambedu",
  "Tambaram",
  "Guindy",
  "Adyar",
  "Velachery",
  "Ambattur",
  "Poonamallee",
  "Avadi",
  "Tiruvallur",
  "Kanchipuram",
];
