import classicEspresso from '../menu images/classic espresso.webp';
import cappuccino from '../menu images/cappuccino.jpg';
import hazelnutLatte from '../menu images/hazelnut-latte.jpg';
import coldCoffee from '../menu images/cold coffee.jpg';
import icedAmericano from '../menu images/iced-americano.webp';
import berryBlast from '../menu images/berry blast.jpg';
import avocadoToast from '../menu images/avacado toast.jpeg';

export const MENU_ITEMS = [
    // Hot Coffee
    {
        id: "001",
        name: "Classic Espresso",
        category: "hot-coffee",
        price: 60,
        originalPrice: 80,
        image: classicEspresso,
        badge: "bestseller",
        isVeg: true,
        rating: 4.8,
        ratingCount: 128,
        description: "Rich, bold single-shot espresso with a thick crema layer.",
        prepTime: 5,
        customizations: [
            { label: "Sugar", options: ["No Sugar", "Less", "Normal", "Extra"], default: "Normal" }
        ]
    },
    {
        id: "002",
        name: "Cappuccino Italiano",
        category: "hot-coffee",
        price: 120,
        image: cappuccino,
        badge: null,
        isVeg: true,
        rating: 4.6,
        ratingCount: 245,
        description: "Equal parts espresso, steamed milk, and milk foam.",
        prepTime: 7,
        customizations: [
            { label: "Size", options: ["Regular", "Large"], default: "Regular" },
            { label: "Milk", options: ["Full Cream", "Skim", "Oat (+₹30)", "Almond (+₹30)"], default: "Full Cream" }
        ]
    },
    {
        id: "003",
        name: "Hazelnut Latte",
        category: "hot-coffee",
        price: 150,
        originalPrice: 180,
        image: hazelnutLatte,
        badge: "new",
        isVeg: true,
        rating: 4.9,
        ratingCount: 89,
        description: "Espresso with steamed milk and roasted hazelnut syrup.",
        prepTime: 6,
        customizations: [
            { label: "Size", options: ["Regular", "Large"], default: "Regular" }
        ]
    },

    // Cold Beverages
    {
        id: "004",
        name: "Classic Cold Coffee",
        category: "cold-beverages",
        price: 110,
        image: coldCoffee,
        badge: "bestseller",
        isVeg: true,
        rating: 4.7,
        ratingCount: 312,
        description: "The campus favorite. Blended coffee with vanilla ice cream.",
        prepTime: 8,
        customizations: [
            { label: "Ice Cream", options: ["Single Scoop", "Double Scoop (+₹30)"], default: "Single Scoop" }
        ]
    },
    {
        id: "005",
        name: "Iced Americano",
        category: "cold-beverages",
        price: 90,
        image: icedAmericano,
        badge: null,
        isVeg: true,
        rating: 4.4,
        ratingCount: 56,
        description: "Espresso shots topped with cold water and ice.",
        prepTime: 4
    },
    {
        id: "006",
        name: "Berry Blast Smoothie",
        category: "cold-beverages",
        price: 160,
        image: berryBlast,
        badge: "new",
        isVeg: true,
        rating: 4.8,
        ratingCount: 42,
        description: "Mixed berries blended with yogurt and honey.",
        prepTime: 10
    },

    // Desserts
    {
        id: "007",
        name: "New York Cheesecake",
        category: "desserts",
        price: 180,
        originalPrice: 220,
        image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=400&auto=format&fit=crop",
        badge: "bestseller",
        isVeg: false,
        rating: 4.9,
        ratingCount: 156,
        description: "Classic creamy cheesecake with a graham cracker crust.",
        prepTime: 2
    },
    {
        id: "008",
        name: "Choco Lava Cake",
        category: "desserts",
        price: 99,
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=400&auto=format&fit=crop",
        badge: null,
        isVeg: true,
        rating: 4.7,
        ratingCount: 203,
        description: "Warm chocolate cake with a gooey molten center.",
        prepTime: 12
    },
    {
        id: "009",
        name: "Blueberry Muffin",
        category: "desserts",
        price: 80,
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=400&auto=format&fit=crop",
        badge: null,
        isVeg: true,
        rating: 4.3,
        ratingCount: 78,
        description: "Soft, moist muffin bursting with fresh blueberries.",
        prepTime: 1
    },

    // Snacks
    {
        id: "010",
        name: "Spicy Paneer Wrap",
        category: "snacks",
        price: 140,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=400&auto=format&fit=crop",
        badge: "spicy",
        isVeg: true,
        rating: 4.6,
        ratingCount: 145,
        description: "Grilled paneer cubes with spicy mayo in a whole wheat wrap.",
        prepTime: 12,
        customizations: [
            { label: "Cheese", options: ["No Cheese", "Extra Cheese (+₹20)"], default: "No Cheese" }
        ]
    },
    {
        id: "011",
        name: "Chicken Grilled Sandwich",
        category: "snacks",
        price: 160,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=400&auto=format&fit=crop",
        badge: "bestseller",
        isVeg: false,
        rating: 4.7,
        ratingCount: 189,
        description: "Juicy chicken breast with lettuce, tomato, and cheese.",
        prepTime: 15
    },
    {
        id: "012",
        name: "Loaded Nachos",
        category: "snacks",
        price: 190,
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=400&auto=format&fit=crop",
        badge: null,
        isVeg: true,
        rating: 4.5,
        ratingCount: 112,
        description: "Tortilla chips topped with cheese sauce, jalapenos, and salsa.",
        prepTime: 10
    },
    {
        id: "013",
        name: "Masala Fries",
        category: "snacks",
        price: 90,
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=400&auto=format&fit=crop",
        badge: null,
        isVeg: true,
        rating: 4.4,
        ratingCount: 300,
        description: "Crispy french fries tossed in a special spice blend.",
        prepTime: 8
    },

    // Specials
    {
        id: "014",
        name: "Avocado Toast",
        category: "specials",
        price: 240,
        image: avocadoToast,
        badge: "new",
        isVeg: true,
        rating: 4.8,
        ratingCount: 34,
        description: "Sourdough bread topped with smashed avocado and cherry tomatoes.",
        prepTime: 10
    },
    {
        id: "015",
        name: "Protein Power Bowl",
        category: "specials",
        price: 280,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop",
        badge: null,
        isVeg: true,
        rating: 4.9,
        ratingCount: 56,
        description: "Quinoa, roasted chickpeas, sweet potato, and kale.",
        prepTime: 15
    },
    {
        id: "016",
        name: "Matcha Latte",
        category: "specials",
        price: 180,
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=400&auto=format&fit=crop",
        badge: null,
        isVeg: true,
        rating: 4.6,
        ratingCount: 45,
        description: "Premium Japanese matcha green tea with steamed milk.",
        prepTime: 6
    }
];

export const CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'hot-coffee', label: 'Hot Coffee' },
    { id: 'cold-beverages', label: 'Cold Brews' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'specials', label: 'Specials' },
];
