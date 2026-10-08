export interface PriceOption {
  label: string;
  price: number;
}

export interface PricingTier {
  carType: string;
  price: number;
  options?: PriceOption[];
}

export interface ServiceData {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  pricing: PricingTier[];
}

export interface ServiceCategoryItem {
  title: string;
  slug?: string;
  href?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  items: ServiceCategoryItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "washing-quick-care",
    title: "Washing & Quick Care",
    items: [
      { title: "Washing", slug: "washing" },
      { title: "Wash & Shine", slug: "wash-and-shine" },
      { title: "Dressing", slug: "dressing" },
      { title: "Tar Remover", slug: "tar-remover" },
      { title: "Vacuuming", slug: "vacuuming" },
    ],
  },
  {
    id: "detailing",
    title: "Detailing",
    items: [
      { title: "Detailing Interior", slug: "detailing-interior" },
      { title: "Detailing Exterior", slug: "detailing-exterior" },
      { title: "Detailing Interior + Exterior", slug: "detailing-interior-exterior" },
      { title: "Interior Steam", slug: "interior-steam" },
    ],
  },
  {
    id: "coatings-protection",
    title: "Coatings & Protection",
    items: [
      { title: "Graphene Coating", slug: "graphene-coating" },
      { title: "Borophene Coating", slug: "borophene-coating" },
      { title: "Windshield Glass Coating", slug: "windshield-glass-coating" },
      { title: "Anti Rust Coating", slug: "anti-rust-coating" },
    ],
  },
  {
    id: "ppf-color-wraps",
    title: "Paint Protection Film (PPF) & Color Wraps",
    items: [
      { title: "Interior PPF", slug: "interior-ppf" },
      { title: "Exterior PPF", href: "/ppf" },
      { title: "PPF Maintenance", slug: "ppf-maintenance" },
    ],
  },
  {
    id: "repair-restoration",
    title: "Repair & Restoration",
    items: [
      { title: "Denting Painting", slug: "denting-painting" },
      { title: "Glass Polishing", slug: "glass-polishing" },
    ],
  },
];

export const servicesData: ServiceData[] = [
  {
    id: "washing",
    categoryId: "washing-quick-care",
    title: "Washing",
    slug: "washing",
    description: "A professional exterior wash for cars and two-wheelers, priced by vehicle type.",
    features: ["Exterior wash", "Vehicle-specific pricing", "Available for cars and two-wheelers"],
    pricing: [
      { carType: "Small Cars", price: 400 },
      { carType: "Hatchback / Small Sedan", price: 400 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 400 },
      { carType: "SUV / MPV", price: 500 },
      { carType: "Bike", price: 200 },
      { carType: "Sports Bike", price: 250 },
    ],
  },
  {
    id: "wash-and-shine",
    categoryId: "washing-quick-care",
    title: "Wash & Shine",
    slug: "wash-and-shine",
    description: "A vehicle wash and finish treatment with pricing based on car size.",
    features: ["Exterior wash", "Shine finish", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 1000 },
      { carType: "Hatchback / Small Sedan", price: 1000 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 1000 },
      { carType: "SUV / MPV", price: 1200 },
    ],
  },
  {
    id: "dressing",
    categoryId: "washing-quick-care",
    title: "Dressing",
    slug: "dressing",
    description: "A dressing treatment for vehicle surfaces, with car-size pricing.",
    features: ["Surface dressing", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 200 },
      { carType: "Hatchback / Small Sedan", price: 200 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 200 },
      { carType: "SUV / MPV", price: 200 },
    ],
  },
  {
    id: "tar-remover",
    categoryId: "washing-quick-care",
    title: "Tar Remover",
    slug: "tar-remover",
    description: "Targeted removal of road tar and residue from vehicle surfaces.",
    features: ["Targeted tar removal", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 200 },
      { carType: "Hatchback / Small Sedan", price: 200 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 200 },
      { carType: "SUV / MPV", price: 200 },
    ],
  },
  {
    id: "vacuuming",
    categoryId: "washing-quick-care",
    title: "Vacuuming",
    slug: "vacuuming",
    description: "Interior vacuuming to remove loose dirt and debris from the cabin.",
    features: ["Interior vacuuming", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 200 },
      { carType: "Hatchback / Small Sedan", price: 200 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 200 },
      { carType: "SUV / MPV", price: 250 },
    ],
  },
  {
    id: "detailing-interior",
    categoryId: "detailing",
    title: "Detailing Interior",
    slug: "detailing-interior",
    description: "An interior detailing service for a thorough clean of your vehicle's cabin.",
    features: ["Interior surface cleaning", "Cabin detailing", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 2500 },
      { carType: "Hatchback / Small Sedan", price: 3000 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 3500 },
      { carType: "SUV / MPV", price: 4000 },
    ],
  },
  {
    id: "detailing-exterior",
    categoryId: "detailing",
    title: "Detailing Exterior",
    slug: "detailing-exterior",
    description: "Exterior detailing for paintwork and vehicle surfaces, priced by car size.",
    features: ["Exterior detailing", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 3500 },
      { carType: "Hatchback / Small Sedan", price: 4000 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 4500 },
      { carType: "SUV / MPV", price: 5000 },
    ],
  },
  {
    id: "detailing-interior-exterior",
    categoryId: "detailing",
    title: "Detailing Interior + Exterior",
    slug: "detailing-interior-exterior",
    description: "Combined interior and exterior detailing, with pricing based on vehicle size.",
    features: ["Interior detailing", "Exterior detailing", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 5000 },
      { carType: "Hatchback / Small Sedan", price: 6000 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 7000 },
      { carType: "SUV / MPV", price: 8000 },
    ],
  },
  {
    id: "interior-steam",
    categoryId: "detailing",
    title: "Interior Steam",
    slug: "interior-steam",
    description: "Steam cleaning for the interior, with pricing based on car size.",
    features: ["Interior steam cleaning", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 1000 },
      { carType: "Hatchback / Small Sedan", price: 1000 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 1000 },
      { carType: "SUV / MPV", price: 1000 },
    ],
  },
  {
    id: "graphene-coating",
    categoryId: "coatings-protection",
    title: "Graphene Coating",
    slug: "graphene-coating",
    description: "Graphene coating packages with base and separately listed warranty options.",
    features: ["Graphene coating", "Vehicle-specific base price", "Optional warranty pricing shown separately"],
    pricing: [
      { carType: "Small Cars", price: 14000, options: [{ label: "1 Year Warranty", price: 14000 }, { label: "2 Years Warranty", price: 18000 }] },
      { carType: "Hatchback / Small Sedan", price: 14000, options: [{ label: "1 Year Warranty", price: 14000 }, { label: "2 Years Warranty", price: 18000 }] },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 16000, options: [{ label: "1 Year Warranty", price: 16000 }, { label: "2 Years Warranty", price: 22000 }] },
      { carType: "SUV / MPV", price: 16000, options: [{ label: "1 Year Warranty", price: 16000 }, { label: "2 Years Warranty", price: 22000 }] },
    ],
  },
  {
    id: "borophene-coating",
    categoryId: "coatings-protection",
    title: "Borophene Coating",
    slug: "borophene-coating",
    description: "Borophene coating packages with base and separately listed warranty options.",
    features: ["Borophene coating", "Vehicle-specific base price", "Optional warranty pricing shown separately"],
    pricing: [
      { carType: "Small Cars", price: 14000, options: [{ label: "1 Year Warranty", price: 14000 }, { label: "2 Years Warranty", price: 21000 }] },
      { carType: "Hatchback / Small Sedan", price: 14000, options: [{ label: "1 Year Warranty", price: 14000 }, { label: "2 Years Warranty", price: 21000 }] },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 16000, options: [{ label: "1 Year Warranty", price: 16000 }, { label: "2 Years Warranty", price: 24000 }] },
      { carType: "SUV / MPV", price: 18000, options: [{ label: "1 Year Warranty", price: 18000 }, { label: "2 Years Warranty", price: 27000 }] },
    ],
  },
  {
    id: "windshield-glass-coating",
    categoryId: "coatings-protection",
    title: "Windshield Glass Coating",
    slug: "windshield-glass-coating",
    description: "A glass coating service for vehicle windshields, priced by car size.",
    features: ["Windshield glass coating", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 1500 },
      { carType: "Hatchback / Small Sedan", price: 1500 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 1500 },
      { carType: "SUV / MPV", price: 1500 },
    ],
  },
  {
    id: "anti-rust-coating",
    categoryId: "coatings-protection",
    title: "Anti Rust Coating",
    slug: "anti-rust-coating",
    description: "An anti-rust coating service with prices based on vehicle size.",
    features: ["Anti-rust coating", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 4500 },
      { carType: "Hatchback / Small Sedan", price: 4500 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 5500 },
      { carType: "SUV / MPV", price: 5500 },
    ],
  },
  {
    id: "interior-ppf",
    categoryId: "ppf-color-wraps",
    title: "Interior PPF",
    slug: "interior-ppf",
    description: "Interior paint protection film installation, priced by vehicle size.",
    features: ["Interior PPF installation", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 5000 },
      { carType: "Hatchback / Small Sedan", price: 5000 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 5000 },
      { carType: "SUV / MPV", price: 5000 },
    ],
  },
  {
    id: "ppf-maintenance",
    categoryId: "ppf-color-wraps",
    title: "PPF Maintenance",
    slug: "ppf-maintenance",
    description: "Maintenance for vehicles with paint protection film, priced by vehicle size.",
    features: ["PPF maintenance", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 1000 },
      { carType: "Hatchback / Small Sedan", price: 1500 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 2000 },
      { carType: "SUV / MPV", price: 2500 },
    ],
  },
  {
    id: "denting-painting",
    categoryId: "repair-restoration",
    title: "Denting Painting",
    slug: "denting-painting",
    description: "Denting and painting service with the workbook's listed price by vehicle size.",
    features: ["Denting and painting", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 3500 },
      { carType: "Hatchback / Small Sedan", price: 3500 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 3500 },
      { carType: "SUV / MPV", price: 3500 },
    ],
  },
  {
    id: "glass-polishing",
    categoryId: "repair-restoration",
    title: "Glass Polishing",
    slug: "glass-polishing",
    description: "Glass polishing service with the workbook's listed price by vehicle size.",
    features: ["Glass polishing", "Vehicle-specific pricing"],
    pricing: [
      { carType: "Small Cars", price: 1500 },
      { carType: "Hatchback / Small Sedan", price: 1500 },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: 1500 },
      { carType: "SUV / MPV", price: 1500 },
    ],
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getStartingPrice(service: ServiceData): number {
  return Math.min(...service.pricing.map((tier) => tier.price));
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((service) => service.slug === slug);
}
