import { Product, CafeSettings } from '../types';

export const INITIAL_CAFE_SETTINGS: CafeSettings = {
  cafeName: "Pinecrest Mountain Cafe & Juicery",
  tagline: "High-Altitude Artisanal Brews & Orchard Cold-Pressed Elixirs",
  announcement: "🌲 Freshly harvested Himalayan autumn apples are in! Try our new Wild Mint Cold Press.",
  isOpen: true,
  openingHours: "7:00 AM – 10:30 PM Every Day",
  phone: "+1 (555) 746-3273",
  email: "hello@pinecrestcafe.com",
  address: "Pinecrest Pine Valley Estate, Hill Station",
  deliveryFee: 2.50,
  taxRate: 0.08
};

export const INITIAL_PRODUCTS: Product[] = [
  // --- FRESH COLD-PRESSED JUICES & ELIXIRS ---
  {
    id: "juice-1",
    name: "Himalayan Apple & Wild Mint Press",
    category: "juice",
    price: 6.50,
    rating: 4.9,
    reviewsCount: 142,
    description: "Crisp organic apples plucked from 7,000-foot mountain orchards, cold-pressed with crushed wild hill mint and a squeeze of Meyer lemon.",
    image: "https://images.unsplash.com/photo-1576186726580-a816e8b12896?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isChefSpecial: true,
    tags: ["Cold-Pressed", "Organic Orchard", "Refreshing", "No Added Sugar"],
    calories: 140,
    prepTimeMinutes: 5,
    altitudeOrigin: "Manali Orchard Valley (6,800 ft)",
    customizationOptions: {
      sweetnessLevels: ["Natural Sugar (Zero Added)", "Touch of Forest Honey", "Unsweetened"],
      iceLevels: ["Light Mountain Ice", "Standard Chilled", "No Ice (Room Temp)"]
    }
  },
  {
    id: "juice-2",
    name: "Pinecrest Ruby Berry Sunshine",
    category: "juice",
    price: 7.00,
    rating: 5.0,
    reviewsCount: 98,
    description: "Cold-pressed wild mountain strawberries, blueberries, blood orange zest, and cold-extracted ginger root for vibrant mountain vitality.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isChefSpecial: true,
    tags: ["Antioxidant Rich", "Wild Berries", "Immunity Boost"],
    calories: 165,
    prepTimeMinutes: 5,
    altitudeOrigin: "Kashmir Berry Slopes (7,200 ft)",
    customizationOptions: {
      sweetnessLevels: ["Natural Sweet", "Touch of Honey", "Tart & Pure"],
      iceLevels: ["Light Mountain Ice", "Standard Chilled", "No Ice"]
    }
  },
  {
    id: "juice-3",
    name: "Darjeeling Golden Citrus Elixir",
    category: "juice",
    price: 6.75,
    rating: 4.8,
    reviewsCount: 76,
    description: "Slow-pressed sun-ripened Valencia oranges, sweet pink grapefruit, cold-pressed ginger root, fresh turmeric, and raw Himalayan wildflower honey.",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    tags: ["Immunity", "Vitamin C", "Raw Honey"],
    calories: 155,
    prepTimeMinutes: 4,
    altitudeOrigin: "Darjeeling Foothills",
    customizationOptions: {
      sweetnessLevels: ["Raw Honey Infused", "Zero Added Sugar"],
      iceLevels: ["Light Mountain Ice", "Extra Chilled", "No Ice"]
    }
  },
  {
    id: "juice-4",
    name: "Alpine Green Detox Cleanse",
    category: "juice",
    price: 7.25,
    rating: 4.7,
    reviewsCount: 64,
    description: "High-altitude baby spinach, crisp cucumber, celery, Granny Smith orchard apples, fresh garden kale, and zesty ginger lime splash.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    tags: ["Detox", "Alkaline", "Zero Sugar", "Pure Greens"],
    calories: 95,
    prepTimeMinutes: 5,
    altitudeOrigin: "Shimla Organic Terraces",
    customizationOptions: {
      sweetnessLevels: ["Tart & Pure", "Subtle Apple Sweetness"],
      iceLevels: ["Light Mountain Ice", "No Ice"]
    }
  },
  {
    id: "juice-5",
    name: "Spiced Ruby Pomegranate Cooler",
    category: "juice",
    price: 7.50,
    rating: 4.9,
    reviewsCount: 89,
    description: "Freshly pressed ruby red hill pomegranates blended with black Himalayan mineral salt, roasted cumin seeds, fresh mint, and sparkling soda splash.",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    tags: ["Hydration", "Himalayan Salt", "Digestive"],
    calories: 135,
    prepTimeMinutes: 5,
    altitudeOrigin: "Kinnaur High Orchards",
    customizationOptions: {
      sweetnessLevels: ["Natural", "Slightly Spiced (Recommended)"],
      iceLevels: ["Crushed Mountain Ice", "Light Ice", "No Ice"]
    }
  },

  // --- HANDCRAFTED MOUNTAIN COFFEE & BREWS ---
  {
    id: "coffee-1",
    name: "Misty Peak Hand Pour-Over",
    category: "coffee",
    price: 5.50,
    rating: 4.9,
    reviewsCount: 210,
    description: "Single-origin high-altitude Arabica washed beans brewed via manual V60 drip. Notes of dark mountain cocoa, roasted hazelnut, and sweet cedar wood.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isChefSpecial: true,
    tags: ["Single Origin", "V60 Brewed", "Dark Cocoa", "Specialty Arabica"],
    calories: 5,
    prepTimeMinutes: 6,
    altitudeOrigin: "Chikmagalur Peak (5,400 ft)",
    customizationOptions: {
      temperature: ["Steaming Hot (92°C)", "Iced Pour-Over"],
      milkOptions: ["Black (Pristine)", "Splash of Steamed Oat Milk", "Splash of Farm Milk"]
    }
  },
  {
    id: "coffee-2",
    name: "Velvet Himalayan Salted Caramel Latte",
    category: "coffee",
    price: 6.25,
    rating: 5.0,
    reviewsCount: 312,
    description: "Double ristretto espresso, velvety microfoam milk, and our signature in-house slow-cooked caramel seasoned with pink rock salt crystals.",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isChefSpecial: true,
    tags: ["Best Seller", "House Made Caramel", "Pink Salt", "Signature"],
    calories: 240,
    prepTimeMinutes: 4,
    altitudeOrigin: "Blue Mountain Nilgiri Blend",
    customizationOptions: {
      sweetnessLevels: ["Regular Sweet", "Half Sweet", "Extra Caramel Drizzle"],
      milkOptions: ["Whole Cream Farm Milk", "Oat Milk (Barista Blend)", "Almond Milk"],
      temperature: ["Silky Hot", "Iced Cold"]
    }
  },
  {
    id: "coffee-3",
    name: "Vanilla Cloud Hilltop Cold Brew",
    category: "coffee",
    price: 6.50,
    rating: 4.9,
    reviewsCount: 185,
    description: "20-hour slow-steeped mountain cold brew, topped with a thick, velvety aerated Madagascar vanilla sweet cream cloud that slowly cascades down.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    tags: ["Slow Steeped", "Sweet Cold Foam", "High Caffeine"],
    calories: 190,
    prepTimeMinutes: 3,
    altitudeOrigin: "Coorg Mist Highlands",
    customizationOptions: {
      sweetnessLevels: ["Standard Sweet Foam", "Light Vanilla", "Sugar-Free Vanilla"],
      iceLevels: ["Clear Block Ice", "Light Ice"]
    }
  },
  {
    id: "coffee-4",
    name: "Pine Hearth Espresso Tonic",
    category: "coffee",
    price: 5.75,
    rating: 4.8,
    reviewsCount: 92,
    description: "Double extraction espresso float poured over artisanal botanical tonic water, garnished with charred pine rosemary and a slice of dried blood orange.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    tags: ["Sparkling", "Rosemary Infused", "Modern Barista"],
    calories: 60,
    prepTimeMinutes: 4,
    altitudeOrigin: "Estate Special Blend",
    customizationOptions: {
      iceLevels: ["Chilled on Rocks", "No Extra Ice"]
    }
  },
  {
    id: "coffee-5",
    name: "Wild Cardamom Rose Cortado",
    category: "coffee",
    price: 5.25,
    rating: 4.9,
    reviewsCount: 114,
    description: "Equal parts intense mountain espresso and silky textured milk infused with crushed cardamom pods and organic edible hill rose petals.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    tags: ["Aromatic", "Balanced 1:1", "Cardamom"],
    calories: 110,
    prepTimeMinutes: 4,
    altitudeOrigin: "Wayanad Rain Shade",
    customizationOptions: {
      sweetnessLevels: ["Unsweetened (Authentic)", "Touch of Brown Sugar"],
      milkOptions: ["Whole Dairy Milk", "Creamy Oat Milk"]
    }
  },

  // --- ARTISANAL TEAS & MOUNTAIN CHAI ---
  {
    id: "tea-1",
    name: "First Flush Darjeeling Castleton Tea",
    category: "tea",
    price: 5.25,
    rating: 5.0,
    reviewsCount: 167,
    description: "The celebrated 'Champagne of Teas'. Hand-plucked tender two leaves and a bud from misty slope gardens with floral muscatel sweetness.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isChefSpecial: true,
    tags: ["First Flush", "Direct Farm", "Delicate", "Estate Reserve"],
    calories: 0,
    prepTimeMinutes: 5,
    altitudeOrigin: "Castleton Estate (6,500 ft)",
    customizationOptions: {
      sweetnessLevels: ["Pristine (No Sweetener)", "Side of Mountain Honey"],
      temperature: ["Piping Hot in Glass Teapot", "Chilled Iced Tea"]
    }
  },
  {
    id: "tea-2",
    name: "Claypot Kulhad Spiced Hill Chai",
    category: "tea",
    price: 4.50,
    rating: 5.0,
    reviewsCount: 420,
    description: "Slow-simmered rich Assam CTC boiled in unglazed terracotta cups with pounded green cardamom, freshly crushed ginger, cinnamon bark, and creamy buffalo milk.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isChefSpecial: true,
    tags: ["Terracotta Cup", "Fresh Ginger", "Traditional", "Best Seller"],
    calories: 140,
    prepTimeMinutes: 6,
    altitudeOrigin: "Upper Assam Foothills",
    customizationOptions: {
      sweetnessLevels: ["Jaggery (Traditional)", "Brown Cane Sugar", "Low Sugar", "No Sugar"],
      milkOptions: ["Traditional Rich Milk", "Oat Milk Chai"]
    }
  },
  {
    id: "tea-3",
    name: "Pine Forest Smoked Lapsang Souchong",
    category: "tea",
    price: 5.50,
    rating: 4.8,
    reviewsCount: 81,
    description: "Black tea leaves traditionally smoke-dried over high-mountain pine wood embers. Incredibly fragrant, warm, and reminiscent of misty hill cabin campfires.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    tags: ["Smoky", "Pine Hearth", "Bold", "Winter Classic"],
    calories: 0,
    prepTimeMinutes: 5,
    altitudeOrigin: "High Range Pine Valley",
    customizationOptions: {
      sweetnessLevels: ["Pure & Smoky", "Drop of Raw Honey"]
    }
  },

  // --- ARTISANAL BAKERY & SAVORIES ---
  {
    id: "bakery-1",
    name: "Wild Mountain Berry Almond Croissant",
    category: "bakery",
    price: 5.50,
    rating: 4.9,
    reviewsCount: 220,
    description: "Double-baked flaky Normandy butter croissant filled with rich almond frangipane cream and wild blackberry-raspberry orchard compote.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isChefSpecial: true,
    tags: ["Freshly Baked Daily", "French Butter", "Wild Berries"],
    calories: 380,
    prepTimeMinutes: 2,
    customizationOptions: {
      temperature: ["Warm from Oven (Recommended)", "Room Temperature"]
    }
  },
  {
    id: "bakery-2",
    name: "Smoked Pine Mushroom & Truffle Sourdough",
    category: "bakery",
    price: 8.50,
    rating: 5.0,
    reviewsCount: 160,
    description: "Toasted 36-hour wild-yeast artisan sourdough topped with pan-seared forest pine mushrooms, roasted garlic chive butter, and aged Himalayan goat cheese.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isChefSpecial: true,
    tags: ["Gourmet Savory", "Wild Mushrooms", "Truffle Butter"],
    calories: 420,
    prepTimeMinutes: 8,
    customizationOptions: {
      temperature: ["Hot & Crispy"]
    }
  },
  {
    id: "bakery-3",
    name: "Hill Orchard Spiced Apple Crumble Tart",
    category: "bakery",
    price: 6.00,
    rating: 4.8,
    reviewsCount: 138,
    description: "Caramelized estate apples dusted with Ceylon cinnamon and nutmeg inside a golden butter pastry crust, finished with toasted rolled oats and cream.",
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    tags: ["Warm Pastry", "Spiced Apple", "Comfort Food"],
    calories: 340,
    prepTimeMinutes: 3,
    customizationOptions: {
      temperature: ["Served Warm", "Room Temperature"]
    }
  },
  {
    id: "bakery-4",
    name: "Smashed Avocado & Poached Egg Brioche",
    category: "bakery",
    price: 9.00,
    rating: 4.9,
    reviewsCount: 195,
    description: "Toasted artisanal brioche slab layered with chunky Hass avocado, farm-fresh pasture poached eggs, toasted seeds, microgreens, and lemon sumac oil.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    tags: ["Farm Breakfast", "Healthy Fats", "All Day Brunch"],
    calories: 460,
    prepTimeMinutes: 8
  },
  {
    id: "bakery-5",
    name: "70% Dark Chocolate Mountain Walnut Brownie",
    category: "bakery",
    price: 5.00,
    rating: 4.9,
    reviewsCount: 245,
    description: "Decadent fudgy dark chocolate square baked with roasted Kashmir walnuts, finished with flaky sea salt and warm melted cocoa drizzle.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    tags: ["Belgian Cocoa", "Gluten-Free Option", "Roasted Walnuts"],
    calories: 360,
    prepTimeMinutes: 2,
    customizationOptions: {
      temperature: ["Warmed with Gooey Center", "Classic Room Temp"]
    }
  }
];

export const HILL_STATION_TESTIMONIALS = [
  {
    name: "Elena Rostova",
    role: "Travel Journalist & Sommelier",
    quote: "Sitting on Pinecrest's mountain balcony while sipping the First Flush Castleton tea amidst drifting pine fog is genuinely one of the most sublime cafe experiences on earth.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    location: "Zurich, Switzerland"
  },
  {
    name: "Aarav Mehta",
    role: "Architect & Coffee Connoisseur",
    quote: "The Misty Peak Pour-Over and the Himalayan Apple Wild Mint cold press are sensational. The craftsmanship in every single cup and the crisp mountain air make it unforgettable.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    location: "Bangalore, India"
  },
  {
    name: "Sophie Laurent",
    role: "Food Photographer",
    quote: "Their berry croissant with almond cream melts in the mouth. Plus, being able to order right to our verandah with live real-time status was effortless.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    location: "Paris, France"
  }
];
