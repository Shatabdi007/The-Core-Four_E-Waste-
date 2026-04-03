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
      costMultiplier: 1.8,
      severity: "high"
    },
    {
      id: "battery",
      name: "Battery Issue",
      costMultiplier: 0.6,
      severity: "medium"
    }
  ],

  laptops: [
    {
      id: "screen",
      name: "Screen Replacement",
      costMultiplier: 1.5,
      severity: "high"
    },
    {
      id: "keyboard",
      name: "Keyboard Issue",
      costMultiplier: 0.7,
      severity: "medium"
    },
    {
      id: "battery",
      name: "Battery Replacement",
      costMultiplier: 0.9,
      severity: "medium"
    }
  ],

  // ✅ DEVICE-WISE APPLIANCE ISSUES (MAIN FEATURE)
  appliances: {
    ac: [
      {
        id: "not-cooling",
        name: "Not Cooling",
        costMultiplier: 1.2,
        severity: "high"
      },
      {
        id: "gas",
        name: "Gas Leakage",
        costMultiplier: 1.3,
        severity: "high"
      }
    ],

    refrigerator: [
      {
        id: "not-cooling",
        name: "Not Cooling",
        costMultiplier: 1.2,
        severity: "high"
      },
      {
        id: "ice",
        name: "Ice Build-up",
        costMultiplier: 0.8,
        severity: "medium"
      }
    ],

    "washing-machine": [
      {
        id: "not-spinning",
        name: "Not Spinning",
        costMultiplier: 1.1,
        severity: "high"
      },
      {
        id: "water",
        name: "Water Not Draining",
        costMultiplier: 0.9,
        severity: "medium"
      }
    ],

    microwave: [
      {
        id: "not-heating",
        name: "Not Heating",
        costMultiplier: 1.2,
        severity: "high"
      },
      {
        id: "sparking",
        name: "Sparking Inside",
        costMultiplier: 1.3,
        severity: "high"
      }
    ],

    tv: [
      {
        id: "no-display",
        name: "No Display",
        costMultiplier: 1.4,
        severity: "high"
      },
      {
        id: "lines",
        name: "Lines on Screen",
        costMultiplier: 1.2,
        severity: "medium"
      },
      {
        id: "sound",
        name: "No Sound",
        costMultiplier: 0.8,
        severity: "medium"
      }
    ],

    "water-purifier": [
      {
        id: "no-water",
        name: "No Water Output",
        costMultiplier: 1.0,
        severity: "high"
      },
      {
        id: "filter",
        name: "Filter Replacement",
        costMultiplier: 0.6,
        severity: "low"
      }
    ]
  }
};

// ---------------- SIMPLE EXPORTS ----------------
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

// ---------------- STATES ----------------
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
