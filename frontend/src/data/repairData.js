// ✅ Plain JavaScript version (no TypeScript)

// ---------------- DEVICE CATEGORIES ----------------
export const deviceCategories = [
  {
    id: "smartphones",
    name: "Smartphones",
    icon: "📱",
    devices: [
      { id: "iphone", name: "iPhone", baseRepairCost: 3500 },
      { id: "samsung", name: "Samsung Galaxy", baseRepairCost: 2800 },
      { id: "oneplus", name: "OnePlus", baseRepairCost: 2500 },
      { id: "xiaomi", name: "Xiaomi/Redmi", baseRepairCost: 1800 },
      { id: "realme", name: "Realme", baseRepairCost: 1500 },
      { id: "vivo", name: "Vivo", baseRepairCost: 1800 },
      { id: "oppo", name: "Oppo", baseRepairCost: 2000 }
    ]
  },
  {
    id: "laptops",
    name: "Laptops",
    icon: "💻",
    devices: [
      { id: "macbook", name: "MacBook", baseRepairCost: 8000 },
      { id: "dell", name: "Dell", baseRepairCost: 4500 },
      { id: "hp", name: "HP", baseRepairCost: 4000 },
      { id: "lenovo", name: "Lenovo", baseRepairCost: 3800 },
      { id: "asus", name: "ASUS", baseRepairCost: 3500 },
      { id: "acer", name: "Acer", baseRepairCost: 3200 }
    ]
  },
  {
    id: "appliances",
    name: "Home Appliances",
    icon: "🏠",
    devices: [
      { id: "ac", name: "Air Conditioner", baseRepairCost: 2500 },
      { id: "refrigerator", name: "Refrigerator", baseRepairCost: 3000 },
      { id: "washing-machine", name: "Washing Machine", baseRepairCost: 2200 },
      { id: "microwave", name: "Microwave", baseRepairCost: 1500 },
      { id: "tv", name: "Television", baseRepairCost: 3500 },
      { id: "water-purifier", name: "Water Purifier", baseRepairCost: 1200 }
    ]
  }
];

// ---------------- COMMON ISSUES ----------------
export const commonIssues = {
  smartphones: [
    {
      id: "screen-crack",
      name: "Screen Cracked/Broken",
      description: "Display damage requiring replacement",
      costMultiplier: 1.8,
      severity: "high"
    },
    {
      id: "battery",
      name: "Battery Issue",
      description: "Battery draining fast or not charging",
      costMultiplier: 0.6,
      severity: "medium"
    }
  ],
  laptops: [
    {
      id: "screen",
      name: "Screen Replacement",
      description: "Broken or flickering display",
      costMultiplier: 1.5,
      severity: "high"
    }
  ]
};

// ---------------- SIMPLE EXPORTS (as you asked) ----------------
export const simpleDeviceCategories = [
  {
    id: "smartphones",
    name: "Smartphones",
    devices: [
      { id: "iphone", name: "iPhone", baseRepairCost: 3500 }
    ]
  }
];

export const simpleCommonIssues = {};

// ✅ MISSING EXPORT FIX
export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Uttar Pradesh"
  
];
