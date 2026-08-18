export type Professional = {
  id: string;
  name: string;
  profession: string;
  category: string;
  city: string;
  rating: number;
  reviews: number;
  years: number;
  rate: string;
  verified: boolean;
  available: boolean;
  bio: string;
  skills: string[];
  image: string;
};

export const categories = [
  "All",
  "Electrical",
  "Plumbing",
  "Cleaning",
  "Repairs",
  "Maintenance",
] as const;

export const cities = ["All locations", "Austin, TX", "Denver, CO", "Seattle, WA", "Miami, FL"];

const portrait = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=400&q=80`;

export const professionals: Professional[] = [
  {
    id: "marcus-hale",
    name: "Marcus Hale",
    profession: "Master Electrician",
    category: "Electrical",
    city: "Austin, TX",
    rating: 4.9,
    reviews: 214,
    years: 12,
    rate: "$85/hr",
    verified: true,
    available: true,
    bio: "Licensed master electrician specialising in panel upgrades, smart-home wiring and emergency fault finding. Same-day callouts across greater Austin.",
    skills: ["Panel upgrades", "EV chargers", "Smart lighting", "Fault diagnosis", "Rewiring"],
    image: portrait("photo-1500648767791-00dcc994a43e"),
  },
  {
    id: "elena-ruiz",
    name: "Elena Ruiz",
    profession: "Licensed Plumber",
    category: "Plumbing",
    city: "Denver, CO",
    rating: 4.8,
    reviews: 176,
    years: 9,
    rate: "$78/hr",
    verified: true,
    available: true,
    bio: "Nine years of residential plumbing: leak detection, bathroom refits and boiler servicing done clean, quiet and on schedule.",
    skills: ["Leak detection", "Boiler service", "Bathroom refits", "Drain clearing"],
    image: portrait("photo-1544005313-94ddf0286df2"),
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    profession: "Deep Cleaning Specialist",
    category: "Cleaning",
    city: "Seattle, WA",
    rating: 5.0,
    reviews: 302,
    years: 7,
    rate: "$45/hr",
    verified: true,
    available: false,
    bio: "Eco-certified deep cleans, move-out turnarounds and recurring home care with a checklist you approve before we start.",
    skills: ["Deep clean", "Move-out", "Eco products", "Carpet care"],
    image: portrait("photo-1573496359142-b8d87734a5a2"),
  },
  {
    id: "david-okoye",
    name: "David Okoye",
    profession: "Appliance Technician",
    category: "Repairs",
    city: "Miami, FL",
    rating: 4.7,
    reviews: 141,
    years: 11,
    rate: "$70/hr",
    verified: true,
    available: true,
    bio: "Factory-trained on 20+ brands. Washers, dryers, ovens and refrigeration diagnosed and repaired in a single visit where possible.",
    skills: ["Refrigeration", "Washer/dryer", "Ovens", "Diagnostics"],
    image: portrait("photo-1507003211169-0a1dd7228f2d"),
  },
  {
    id: "sofia-lindqvist",
    name: "Sofia Lindqvist",
    profession: "Home Maintenance Pro",
    category: "Maintenance",
    city: "Austin, TX",
    rating: 4.9,
    reviews: 98,
    years: 6,
    rate: "$62/hr",
    verified: true,
    available: true,
    bio: "Seasonal maintenance plans, gutter and HVAC filter care, plus the small fixes that never make it off your list.",
    skills: ["Seasonal checks", "HVAC filters", "Gutters", "Carpentry"],
    image: portrait("photo-1580489944761-15a19d654956"),
  },
  {
    id: "jonah-brecht",
    name: "Jonah Brecht",
    profession: "Auto & Home Mechanic",
    category: "Repairs",
    city: "Denver, CO",
    rating: 4.6,
    reviews: 87,
    years: 14,
    rate: "$74/hr",
    verified: false,
    available: true,
    bio: "Mobile mechanic covering driveway servicing, generator repair and workshop tooling maintenance.",
    skills: ["Mobile servicing", "Generators", "Small engines"],
    image: portrait("photo-1519085360753-af0119f7cbe7"),
  },
  {
    id: "amara-diallo",
    name: "Amara Diallo",
    profession: "Commercial Cleaner",
    category: "Cleaning",
    city: "Miami, FL",
    rating: 4.8,
    reviews: 155,
    years: 8,
    rate: "$52/hr",
    verified: true,
    available: true,
    bio: "Office and short-let turnaround cleaning with photo reports after every visit.",
    skills: ["Turnaround", "Photo reports", "Sanitising"],
    image: portrait("photo-1487412720507-e7ab37603c6f"),
  },
  {
    id: "tom-reilly",
    name: "Tom Reilly",
    profession: "HVAC Engineer",
    category: "Maintenance",
    city: "Seattle, WA",
    rating: 4.9,
    reviews: 132,
    years: 15,
    rate: "$92/hr",
    verified: true,
    available: false,
    bio: "Heat pump installation, AC servicing and air quality tuning for older homes.",
    skills: ["Heat pumps", "AC service", "Air quality"],
    image: portrait("photo-1472099645785-5658abf4ff4e"),
  },
];

export const getProfessional = (id: string) => professionals.find((p) => p.id === id);

export const reviewsFor = (id: string) =>
  [
    {
      name: "Hannah W.",
      rating: 5,
      date: "2 weeks ago",
      text: "Arrived on time, explained everything clearly and left the place spotless. Booking through FundiLink took under two minutes.",
    },
    {
      name: "Ben Carter",
      rating: 5,
      date: "1 month ago",
      text: "Second time booking. Honest pricing, no upsell, and the work has held up perfectly.",
    },
    {
      name: "Dana Alves",
      rating: 4,
      date: "2 months ago",
      text: "Great quality work. Ran slightly late but kept me updated the whole way.",
    },
  ].map((r, i) => ({ ...r, id: `${id}-${i}` }));
