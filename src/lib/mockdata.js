export const productMockData = [
  {
    id: 1,
    name: "Product 1",
    price: 100000,
    stock: 10,
    type: "minuman",
    image: "https://placehold.co/100x100",
    category: "Kopi",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200000,
    stock: 5,
    type: "makanan",
    image: "https://placehold.co/100x100",
    category: "Es Kopi",
  },
  {
    id: 3,
    name: "Product 3",
    price: 150000,
    stock: 15,
    type: "minuman",
    image: "https://placehold.co/100x100",
    category: "Jus",
  },
];

export const categoryMockData = [
  {
    id: 1,
    icon: "😅",
    name: "Kopi",
    total_product: 10,
    status: "aktif",
  },
  {
    id: 2,
    icon: "🍰",
    name: "Kue",
    total_product: 210,
    status: "tidak_aktif",
  },
  {
    id: 3,
    icon: "🍫",
    name: "Coklat",
    total_product: 20,
    status: "aktif",
  },
];

export const transactionMockData = [
  {
    id: 1,
    customer: {
      name: "John Doe",
      phone: "081234567890",
      address: "Jl. Imam Bonjol",
    },
    order_details: [
      {
        id: 1,
        product: "Product 1",
        image: "https://placehold.co/100x100",
        price: 100000,
        quantity: 4,
        total: 200000,
      },
      {
        id: 2,
        product: "Product 2",
        image: "https://placehold.co/100x100",
        price: 200000,
        quantity: 1,
        total: 200000,
      },
    ],
    total: 10000000,
    created_at: "2025-05-19T14:30:45.123",
  },
  {
    id: 2,
    customer: {
      name: "Sarah Johnson",
      phone: "081234567890",
      address: "Jl. Imam Bonjol",
    },
    order_details: [
      {
        id: 1,
        product: "Product 1",
        image: "https://placehold.co/100x100",
        price: 100000,
        quantity: 2,
        total: 200000,
      },
    ],
    total: 7500000,
    created_at: "2025-05-19T14:30:45.123",
  },
  {
    id: 3,
    customer: {
      name: "Ahmad Rizki",
      phone: "081234567890",
      address: "Jl. Imam Bonjol",
    },
    order_details: [
      {
        id: 1,
        product: "Product 1",
        image: "https://placehold.co/100x100",
        price: 100000,
        quantity: 2,
        total: 200000,
      },
    ],
    total: 3500000,
    created_at: "2024-01-03",
  },
  {
    id: 4,
    customer: {
      name: "Maya Putri",
      phone: "081234567890",
      address: "Jl. Imam Bonjol",
    },
    order_details: [
      {
        id: 1,
        product: "Product 1",
        image: "https://placehold.co/100x100",
        price: 100000,
        quantity: 2,
        total: 200000,
      },
    ],
    total: 8500000,
    created_at: "2024-01-04",
  },
  {
    id: 5,
    customer: {
      name: "Budi Santoso",
      phone: "081234567890",
      address: "Jl. Imam Bonjol",
    },
    order_details: [
      {
        id: 1,
        product: "Product 1",
        image: "https://placehold.co/100x100",
        price: 100000,
        quantity: 2,
        total: 200000,
      },
    ],
    total: 2500000,
    created_at: "2024-01-05",
  },
  {
    id: 6,
    customer: {
      name: "Dewi Lestari",
      phone: "081234567890",
      address: "Jl. Imam Bonjol",
    },
    order_details: [
      {
        id: 1,
        product: "Product 1",
        image: "https://placehold.co/100x100",
        price: 100000,
        quantity: 2,
        total: 200000,
      },
    ],
    total: 12000000,
    created_at: "2024-01-06",
  },
  {
    id: 7,
    customer: {
      name: "Rudi Hermawan",
      phone: "081234567890",
      address: "Jl. Imam Bonjol",
    },
    order_details: [
      {
        id: 1,
        product: "Product 1",
        image: "https://placehold.co/100x100",
        price: 100000,
        quantity: 2,
        total: 200000,
      },
    ],
    total: 4500000,
    created_at: "2024-01-07",
  },
  {
    id: 8,
    customer: {
      name: "Linda Wijaya",
      phone: "081234567890",
      address: "Jl. Imam Bonjol",
    },
    order_details: [
      {
        id: 1,
        product: "Product 1",
        image: "https://placehold.co/100x100",
        price: 100000,
        quantity: 2,
        total: 200000,
      },
    ],
    total: 6800000,
    created_at: "2024-01-08",
  },
  {
    id: 9,
    customer: {
      name: "Fajar Pratama",
      phone: "081234567890",
      address: "Jl. Imam Bonjol",
    },
    order_details: [
      {
        id: 1,
        product: "Product 1",
        image: "https://placehold.co/100x100",
        price: 100000,
        quantity: 2,
        total: 200000,
      },
    ],
    total: 9200000,
    created_at: "2025-05-19T14:30:45.123",
  },
  {
    id: 10,
    customer: {
      name: "Siti Nurhaliza",
      phone: "081234567890",
      address: "Jl. Imam Bonjol",
    },
    order_details: [
      {
        id: 1,
        product: "Product 1",
        image: "https://placehold.co/100x100",
        price: 100000,
        quantity: 2,
        total: 200000,
      },
      {
        id: 2,
        product: "Product 2",
        image: "https://placehold.co/100x100",
        price: 200000,
        quantity: 1,
        total: 200000,
      },
      {
        id: 3,
        product: "Product 3",
        image: "https://placehold.co/100x100",
        price: 150000,
        quantity: 1,
        total: 150000,
      },
    ],
    total: 3800000,
    created_at: "2024-01-10",
  },
];
