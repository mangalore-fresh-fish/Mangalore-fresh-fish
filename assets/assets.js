// --- IMPORTS ---
// --- IMPORTS ---
// Import your project-specific images
import logo from "./logo.jpg";
import hero_fish from "./hero-fish.jpg";
import bangda from "./bangda.jpg";
import bhotayi from "./bhotayi.jpg";
import pomfret from "./pomfret.jpg";
import kingfish from "./kingfish.jpg";
import prawns from "./prawns.jpg";
import red_snapper from "./red-snapper.jpg";
import fresh from "./fresh.jpg";
import tharle from "./tharle.jpg";

// Import icons for features (matched to index.html)
import { AnchorIcon, LeafIcon, TruckIcon } from "lucide-react";

// Import dummy user profile pics
import profile_pic1 from "./profile_pic1.jpg";


// --- ASSET EXPORTS ---
export const assets = {
    logo,
    hero_fish,
    bangda,
    bhotayi,
    pomfret,
    kingfish,
    prawns,
    red_snapper,
    tharle,
    fresh,
    profile_pic1
};

// --- CATEGORIES ---
// Categories relevant to fish
export const categories = ["Seawater Fish", "Shellfish", "Fresh Catch", "Local Favorites"];

// --- DUMMY STORE (SINGLE STORE) ---
// Replaced "Happy Shop" with "Mangalore Fresh Fish" data
export const dummyStoreData = {
    id: "store_mff_1",
    userId: "user_admin",
    name: "Mangalore Fresh Fish",
    description: "Your weekly link to the coast. Bringing the freshest seafood from the net to your kitchen.",
    username: "mangalorefreshfish",
    address: "Bangalore, India",
    status: "approved",
    isActive: true,
    logo: logo,
    email: "support@mangalorefresh.fish",
    contact: "+91 9110683618",
    user: {
        id: "user_admin",
        name: "Admin",
        email: "support@mangalorefresh.fish",
        image: logo,
    }
};

// --- DUMMY REVIEWS ---
// Reviews rewritten for fish products
export const dummyRatingsData = [
    { id: "rat_1", rating: 5.0, review: "Absolutely fresh Bangda! Tasted just like home. The weekend delivery is so convenient.", user: { name: 'Rohan K.', image: profile_pic1 }, productId: "prod_1", createdAt: 'Sat Oct 18 2025 14:51:25 GMT+0530 (India Standard Time)' },
    { id: "rat_2", rating: 4.5, review: "Amazing quality Prawns. They were clean and packed perfectly. Will be ordering every week.", user: { name: 'Priya S.', image: profile_pic1 }, productId: "prod_5", createdAt: 'Sat Oct 17 2025 10:30:00 GMT+0530 (India Standard Time)' },
    { id: "rat_3", rating: 5.0, review: "The Pomfret was fantastic. Great size and very fresh. 10/10.", user: { name: 'Anil Desai', image: profile_pic1 }, productId: "prod_3", createdAt: 'Sat Oct 17 2025 08:15:00 GMT+0530 (India Standard Time)' },
    { id: "rat_4", rating: 4.0, review: "Good quality Bhotayi. Price is also reasonable compared to other places.", user: { name: 'Shilpa', image: profile_pic1 }, productId: "prod_2", createdAt: 'Sat Oct 16 2025 17:45:00 GMT+0530 (India Standard Time)' },
    { id: "rat_5", rating: 5.0, review: "Kingfish (Anjal) was perfect for the weekend fry. Cut and cleaned well. Impressed!", user: { name: 'Vikram', image: profile_pic1 }, productId: "prod_4", createdAt: 'Sat Oct 16 2025 12:00:00 GMT+0530 (India Standard Time)' },
];

// --- DUMMY PRODUCTS ---
// Replaced with DEFAULT_PRODUCTS from main.js
export const productDummyData = [
    {
        id: "prod_1", // Was id 1
        name: "Bangda (Mackerel)",
        description: "A local favorite, perfect for frying or curry. Also known as 'ಬಾಂಗ್ಗಡ'. Our fish is 100% natural and sourced directly from Mangalorean fishermen.",
        mrp: 250, // Invented MRP
        price: 220,
        images: [bangda],
        category: "Seawater Fish",
        storeId: "store_mff_1",
        inStock: true,
        store: dummyStoreData,
        rating: [dummyRatingsData[0]],
        createdAt: 'Sat Oct 18 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_2", // Was id 2
        name: "Bhotayi (Sardine)",
        description: "Small, oil-rich fish, great for health. Also known as 'ಭೋತಾಯಿ'. Delivered fresh to your door on Saturday or Sunday.",
        mrp: 200, // Invented MRP
        price: 180,
        images: [bhotayi],
        category: "Seawater Fish",
        storeId: "store_mff_1",
        inStock: true,
        store: dummyStoreData,
        rating: [dummyRatingsData[3]],
        createdAt: 'Sat Oct 18 2025 14:50:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_3", // Was id 3
        name: "Pomfret",
        description: "A premium, flat-bodied fish, prized for its delicate white flesh. Also known as 'ಪಾಂಪ್ಲೆಟ್'. 100% free from chemicals.",
        mrp: 500, // Invented MRP
        price: 480,
        images: [pomfret],
        category: "Premium",
        storeId: "store_mff_1",
        inStock: true,
        store: dummyStoreData,
        rating: [dummyRatingsData[2]],
        createdAt: 'Sat Oct 18 2025 14:49:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_4", // Was id 4
        name: "Kingfish (Anjal)",
        description: "The 'King' of fish, perfect for steaks and frying. Also known as 'ಆಂಜಲ್'. Sourced directly from local fishermen.",
        mrp: 550, // Invented MRP
        price: 520,
        images: [kingfish],
        category: "Premium",
        storeId: "store_mff_1",
        inStock: true,
        store: dummyStoreData,
        rating: [dummyRatingsData[4]],
        createdAt: 'Sat Oct 18 2025 14:48:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_5", // Was id 5
        name: "Prawns",
        description: "Fresh, juicy prawns, ideal for curries, biryani, or starters. Also known as 'ಚಿಂಗೆ'. Get them delivered fresh this weekend.",
        mrp: 630, // Invented MRP
        price: 600,
        images: [prawns],
        category: "Shellfish",
        storeId: "store_mff_1",
        inStock: true,
        store: dummyStoreData,
        rating: [dummyRatingsData[1]],
        createdAt: 'Sat Oct 18 2025 14:47:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_6", // Was id 6
        name: "Red Snapper",
        description: "A versatile fish with a firm texture and sweet, nutty flavor. Also known as 'ಕೆಂಪು ಮೀನು'. ",
        mrp: 380, // Invented MRP
        price: 350,
        images: [red_snapper],
        category: "Seawater Fish",
        storeId: "store_mff_1",
        inStock: true,
        store: dummyStoreData,
        rating: [],
        createdAt: 'Sat Oct 18 2025 14:46:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_7", // Was id 7
        name: "tharle",
        description: "Another variety of Sardine, very popular in coastal cuisine. Also known as 'ತಾರ್ಲಿ'. Order now for weekend delivery.",
        mrp: 380, // Invented MRP
        price: 350,
        images: [tharle],
        category: "Seawater Fish",
        storeId: "store_mff_1",
        inStock: true,
        store: dummyStoreData,
        rating: [],
        createdAt: 'Sat Oct 18 2025 14:45:25 GMT+0530 (India Standard Time)',
    }
];

// --- OUR SPECS / FEATURES ---
// Replaced with "Our Commitment to Quality" from index.html
export const ourSpecsData = [
    { title: "Directly Sourced", description: "We partner with local fishermen to bring you the freshest catch, cutting out the middleman.", icon: AnchorIcon, accent: '#005f73' },
    { title: "100% Natural", description: "Our seafood is completely free from chemicals, preservatives, and antibiotics.", icon: LeafIcon, accent: '#2a9d8f' },
    { title: "Weekend Delivery", description: "Place your order during the week and get it delivered fresh to your door on Saturday or Sunday.", icon: TruckIcon, accent: '#0a9396' }
];

// --- DUMMY USER & ADDRESS ---
// Generic data, no changes needed
export const dummyUserData = {
    id: "user_31dQbH27HVtovbs13X2cmqefddM",
    name: "Demo User",
    email: "user@example.com",
    image: profile_pic1,
    cart: {}
};

export const addressDummyData = {
    id: "addr_1",
    userId: "user_31dQbH27HVtovbs13X2cmqefddM",
    name: "Demo User",
    email: "user@example.com",
    street: "123 MG Road",
    city: "Bangalore",
    state: "Karnataka",
    zip: "560001",
    country: "India",
    phone: "9876543210",
    createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)',
};

// --- DUMMY COUPONS ---
// Generic data, no changes needed
export const couponDummyData = [
    { code: "FRESH10", description: "10% Off Your First Order", discount: 10, forNewUser: true, forMember: false, isPublic: true, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:35:31.183Z" },
    { code: "WEEKEND20", description: "₹20 Off on orders above ₹500", discount: 20, forNewUser: false, forMember: false, isPublic: true, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:42:00.811Z" },
];

// --- DUMMY ORDERS ---
// Updated to use fish products
export const orderDummyData = [
    {
        id: "cmemm75h5001jtat89016h1p3",
        total: 400, // 220 (Bangda) + 180 (Bhotayi)
        status: "DELIVERED",
        userId: "user_31dQbH27HVtovbs13X2cmqefddM",
        storeId: "store_mff_1",
        addressId: "addr_1",
        isPaid: true,
        paymentMethod: "Online",
        createdAt: "2025-10-12T09:15:03.929Z",
        updatedAt: "2025-10-13T09:15:50.723Z",
        isCouponUsed: false,
        coupon: null,
        orderItems: [
            { orderId: "cmemm75h5001jtat89016h1p3", productId: "prod_1", quantity: 1, price: 220, product: productDummyData[0], }, // Bangda
            { orderId: "cmemm75h5001jtat89016h1p3", productId: "prod_2", quantity: 1, price: 180, product: productDummyData[1], }  // Bhotayi
        ],
        address: addressDummyData,
    },
    {
        id: "cmemm6jv7001htat8vmm3gxaf",
        total: 1080, // 480 (Pomfret) + 600 (Prawns)
        status: "PROCESSING",
        userId: "user_31dQbH27HVtovbs13X2cmqefddM",
        storeId: "store_mff_1",
        addressId: "addr_1",
        isPaid: false,
        paymentMethod: "COD",
        createdAt: "2025-10-18T08:14:35.923Z",
        updatedAt: "2025-10-18T08:15:52.535Z",
        isCouponUsed: false,
        coupon: null,
        orderItems: [
            { orderId: "cmemm6jv7001htat8vmm3gxaf", productId: "prod_3", quantity: 1, price: 480, product: productDummyData[2], }, // Pomfret
            { orderId: "cmemm6jv7001htat8vmm3gxaf", productId: "prod_5", quantity: 1, price: 600, product: productDummyData[4], }  // Prawns
        ],
        address: addressDummyData,
    }
];

// --- DUMMY STORES LIST (SINGLE STORE) ---
// Replaced with just the one MFF store
export const storesDummyData = [
    dummyStoreData
];

// --- DASHBOARD DATA ---
// Generic data, can be left as-is or slightly tweaked
export const dummyAdminDashboardData = {
    "orders": 2, // Tweaked
    "stores": 1, // Tweaked
    "products": 7, // Tweaked
    "revenue": "1480.00", // Tweaked
    "allOrders": [
        { "createdAt": "2025-10-12T09:15:03.929Z", "total": 400 },
        { "createdAt": "2025-10-18T08:14:35.923Z", "total": 1080 },
        // ... more dummy dates and totals
    ]
};

export const dummyStoreDashboardData = {
    "ratings": dummyRatingsData,
    "totalOrders": 2,
    "totalEarnings": 1480,
    "totalProducts": 7
};