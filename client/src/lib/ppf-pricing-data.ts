export interface PpfPriceRow {
  vehicle: string;
  warranty: string;
  price: number;
}

export interface PpfProduct {
  name: string;
  rows: PpfPriceRow[];
}

export const ppfProducts: PpfProduct[] = [
  {
    name: "Garware Plus Gloss",
    rows: [
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 5 Years Warranty", price: 65000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 75000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 90000 },
      { vehicle: "Sports Bike", warranty: "TPU · 5 Years Warranty", price: 15000 },
      { vehicle: "Scooty", warranty: "TPU · 5 Years Warranty", price: 12000 },
      { vehicle: "Bike", warranty: "TPU · 5 Years Warranty", price: 10000 },
    ],
  },
  {
    name: "Garware Glaze Gloss",
    rows: [
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 6 Years Warranty", price: 65000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 6 Years Warranty", price: 80000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 6 Years Warranty", price: 95000 },
      { vehicle: "Sports Bike", warranty: "TPU · 6 Years Warranty", price: 17000 },
      { vehicle: "Scooty", warranty: "TPU · 6 Years Warranty", price: 14000 },
      { vehicle: "Bike", warranty: "TPU · 6 Years Warranty", price: 12000 },
    ],
  },
  {
    name: "Garware Titanium Gloss",
    rows: [
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 15 Years Warranty", price: 100000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 15 Years Warranty", price: 115000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 15 Years Warranty", price: 130000 },
      { vehicle: "Sports Bike", warranty: "TPU · 15 Years Warranty", price: 25000 },
      { vehicle: "Scooty", warranty: "TPU · 15 Years Warranty", price: 20000 },
      { vehicle: "Bike", warranty: "TPU · 15 Years Warranty", price: 15000 },
    ],
  },
  {
    name: "Garware Premium Gloss",
    rows: [
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 8 Years Warranty", price: 80000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 8 Years Warranty", price: 95000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 8 Years Warranty", price: 110000 },
      { vehicle: "Sports Bike", warranty: "TPU · 8 Years Warranty", price: 18000 },
      { vehicle: "Scooty", warranty: "TPU · 8 Years Warranty", price: 15000 },
      { vehicle: "Bike", warranty: "TPU · 8 Years Warranty", price: 12000 },
    ],
  },
  {
    name: "AS Guard Black Gloss PPF",
    rows: [
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 5 Years Warranty", price: 70000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 85000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 100000 },
    ],
  },
  {
    name: "Jopasu Spectre I5 Gloss PPF",
    rows: [
      { vehicle: "Small Cars", warranty: "TPU · 5 Years Warranty", price: 50000 },
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 5 Years Warranty", price: 60000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 75000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 90000 },
      { vehicle: "Sports Bike", warranty: "TPU · 5 Years Warranty", price: 15000 },
      { vehicle: "Scooty", warranty: "TPU · 5 Years Warranty", price: 12000 },
      { vehicle: "Bike", warranty: "TPU · 5 Years Warranty", price: 10000 },
    ],
  },
  {
    name: "Mash TPU Pro Gloss PPF by T&O",
    rows: [
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU Pro · 5 Years Warranty", price: 60000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU Pro · 5 Years Warranty", price: 75000 },
      { vehicle: "SUV / MPV", warranty: "TPU Pro · 5 Years Warranty", price: 90000 },
      { vehicle: "Sports Bike", warranty: "TPU Pro · 5 Years Warranty", price: 15000 },
      { vehicle: "Scooty", warranty: "TPU Pro · 5 Years Warranty", price: 12000 },
      { vehicle: "Bike", warranty: "TPU Pro · 5 Years Warranty", price: 10000 },
    ],
  },
  {
    name: "Mash Black Gloss PPF by T&O",
    rows: [
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 5 Years Warranty", price: 80000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 95000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 110000 },
    ],
  },
  {
    name: "Mash TPU Matte PPF by T&O",
    rows: [
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 5 Years Warranty", price: 80000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 95000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 11000 },
      { vehicle: "Sports Bike", warranty: "TPU · 5 Years Warranty", price: 18000 },
      { vehicle: "Scooty", warranty: "TPU · 5 Years Warranty", price: 15000 },
      { vehicle: "Bike", warranty: "TPU · 5 Years Warranty", price: 12000 },
    ],
  },
  {
    name: "Mash Pearl White Gloss PPF by T&O",
    rows: [
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 5 Years Warranty", price: 85000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 95000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 110000 },
    ],
  },
  {
    name: "Dura Shield Colour PPF",
    rows: [{ vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 110000 }],
  },
  {
    name: "Jopasu Gold Colour PPF",
    rows: [{ vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 125000 }],
  },
  {
    name: "Garware Matte PPF",
    rows: [{ vehicle: "Bike", warranty: "TPU · 5 Years Warranty", price: 16000 }],
  },
  {
    name: "DHC Silver Series Gloss",
    rows: [
      { vehicle: "Small Cars", warranty: "5 Years Warranty", price: 45000 },
      { vehicle: "Hatchback / Small Sedan", warranty: "5 Years Warranty", price: 45000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "5 Years Warranty", price: 55000 },
      { vehicle: "SUV / MPV", warranty: "5 Years Warranty", price: 65000 },
    ],
  },
  {
    name: "DHC Silver Series MATT",
    rows: [
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 5 Years Warranty", price: 75000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 75000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 90000 },
      { vehicle: "Sports Bike", warranty: "TPU · 5 Years Warranty", price: 18000 },
      { vehicle: "Bike", warranty: "TPU · 5 Years Warranty", price: 12000 },
    ],
  },
  {
    name: "Luminorr Black Gloss TPU",
    rows: [
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 5 Years Warranty", price: 70000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 75000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 85000 },
    ],
  },
  {
    name: "Black Matt",
    rows: [
      { vehicle: "Small Cars", warranty: "TPU · 5 Years Warranty", price: 75000 },
      { vehicle: "Hatchback / Small Sedan", warranty: "TPU · 5 Years Warranty", price: 75000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 85000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 95000 },
    ],
  },
  {
    name: "Luminor Colour PPF",
    rows: [{ vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 95000 }],
  },
  {
    name: "Dura Shield Matte PPF",
    rows: [
      { vehicle: "Bike", warranty: "TPU · 5 Years Warranty", price: 12000 },
      { vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 80000 },
      { vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 85000 },
    ],
  },
  {
    name: "Garwrae Black Matt",
    rows: [{ vehicle: "SUV / MPV", warranty: "TPU · 5 Years Warranty", price: 95000 }],
  },
  {
    name: "CLARO PPF",
    rows: [{ vehicle: "Mid-size / Compact SUV / MUV", warranty: "TPU · 5 Years Warranty", price: 105000 }],
  },
  {
    name: "Garware Aura",
    rows: [{ vehicle: "Bike", warranty: "Warranty not specified", price: 10000 }],
  },
];

export const ppfVehicleTypes = [
  "Small Cars",
  "Hatchback / Small Sedan",
  "Mid-size / Compact SUV / MUV",
  "SUV / MPV",
  "Sports Bike",
  "Scooty",
  "Bike",
];
