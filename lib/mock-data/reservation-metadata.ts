// Example SelectedMenus for demo purposes

// Update the dummyReservations array with the correct menu categories and paxArray usage
export const dummyReservations = [
  {
    _id: "res-1",
    fullName: "Juan Dela Cruz",
    email: "juandelacruz123@gmail.com",
    contactNumber: "09151234567",
    selectedPackage: "Premium",
    selectedMenus: {
      Beef: {
        "Beef Caldereta": {
          paxSelected: "8-10 pax",
          pricePerPax: 350,
        },
        "Beef Steak": {
          paxSelected: "4-6 pax",
          pricePerPax: 380,
        },
        "Beef Kare-Kare": {
          paxSelected: "13-15 pax",
          pricePerPax: 400,
        },
        "Beef Mechado": {
          paxSelected: "18-20 pax",
          pricePerPax: 370,
        },
      },
      Dessert: {
        "Leche Flan": {
          paxSelected: "8-10 pax",
          pricePerPax: 180,
        },
        "Buko Pandan": {
          paxSelected: "4-6 pax",
          pricePerPax: 150,
        },
        "Halo-Halo": {
          paxSelected: "13-15 pax",
          pricePerPax: 200,
        },
        "Ube Halaya": {
          paxSelected: "18-20 pax",
          pricePerPax: 170,
        },
      },
      Soup: {},
      Salad: {},
      Pork: {},
      Noodle: {},
      Chicken: {},
      Seafood: {},
      Vegetable: {},
      Beverage: {},
    },
    eventType: "Wedding",
    guestCount: 85,
    serviceType: "Plated",
    orderType: "",
    reservationDate: new Date("2024-07-15"),
    reservationTime: "18:00",
    totalPrice: 12500,
    specialRequests: "Allergy to nuts, please avoid in all dishes",
    venue: "Grand Ballroom, Manila Hotel",
    serviceFee: 600,
    serviceHours: "6 hours",
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
    status: "Confirmed",
  },
  {
    _id: "res-2",
    fullName: "Maria Santos",
    email: "mariasantos456@yahoo.com",
    contactNumber: "09289876543",
    selectedPackage: "Basic",
    selectedMenus: {
      Salad: {
        "Caesar Salad": {
          paxSelected: "13-15 pax",
          pricePerPax: 200,
        },
        "Garden Salad": {
          paxSelected: "4-6 pax",
          pricePerPax: 180,
        },
        "Macaroni Salad": {
          paxSelected: "8-10 pax",
          pricePerPax: 190,
        },
        "Potato Salad": {
          paxSelected: "18-20 pax",
          pricePerPax: 210,
        },
      },
      Beverage: {
        "Iced Tea": {
          paxSelected: "18-20 pax",
          pricePerPax: 150,
        },
        "Calamansi Juice": {
          paxSelected: "4-6 pax",
          pricePerPax: 130,
        },
        "Mango Shake": {
          paxSelected: "8-10 pax",
          pricePerPax: 160,
        },
        "Buko Juice": {
          paxSelected: "13-15 pax",
          pricePerPax: 140,
        },
      },
      Soup: {},
      Beef: {},
      Pork: {},
      Noodle: {},
      Chicken: {},
      Seafood: {},
      Vegetable: {},
      Dessert: {},
    },
    eventType: "Birthday",
    guestCount: 45,
    serviceType: "Buffet",
    orderType: "Delivery",
    reservationDate: new Date("2024-06-22"),
    reservationTime: "12:30",
    deliveryFee: 300,
    deliveryAddress: "123 Rizal Avenue, Makati City, Metro Manila",
    deliveryInstructions: "Please call before delivery",
    totalPrice: 9800,
    serviceFee: 300,
    createdAt: new Date("2024-05-30"),
    updatedAt: new Date("2024-05-30"),
    status: "Pending",
  },
  {
    _id: "res-3",
    fullName: "Pedro Reyes",
    email: "pedroreyes789@outlook.com",
    contactNumber: "09361234567",
    selectedPackage: "Deluxe",
    selectedMenus: {
      Pork: {
        "Pork Sinigang": {
          paxSelected: "8-10 pax",
          pricePerPax: 300,
        },
        "Lechon Kawali": {
          paxSelected: "4-6 pax",
          pricePerPax: 320,
        },
        "Pork Adobo": {
          paxSelected: "13-15 pax",
          pricePerPax: 280,
        },
        "Pork Sisig": {
          paxSelected: "18-20 pax",
          pricePerPax: 310,
        },
      },
      Dessert: {
        "Halo-Halo": {
          paxSelected: "18-20 pax",
          pricePerPax: 180,
        },
        Bibingka: {
          paxSelected: "4-6 pax",
          pricePerPax: 150,
        },
        Puto: {
          paxSelected: "8-10 pax",
          pricePerPax: 120,
        },
        "Cassava Cake": {
          paxSelected: "13-15 pax",
          pricePerPax: 160,
        },
      },
      Soup: {},
      Salad: {},
      Beef: {},
      Noodle: {},
      Chicken: {},
      Seafood: {},
      Vegetable: {},
      Beverage: {},
    },
    eventType: "Corporate",
    guestCount: 60,
    serviceType: "Plated",
    orderType: "",
    reservationDate: new Date("2024-08-05"),
    reservationTime: "19:00",
    totalPrice: 15200,
    venue: "Shangri-La at the Fort",
    serviceFee: 800,
    serviceHours: "8 hours",
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2024-07-01"),
    status: "Completed",
  },
  {
    _id: "res-4",
    fullName: "Ana Gonzales",
    email: "anagonzales234@hotmail.com",
    contactNumber: "09429876543",
    selectedPackage: "Premium",
    selectedMenus: {
      Chicken: {
        "Chicken Adobo": {
          paxSelected: "13-15 pax",
          pricePerPax: 280,
        },
        "Chicken Inasal": {
          paxSelected: "4-6 pax",
          pricePerPax: 290,
        },
        "Chicken Tinola": {
          paxSelected: "8-10 pax",
          pricePerPax: 260,
        },
        "Chicken Afritada": {
          paxSelected: "18-20 pax",
          pricePerPax: 270,
        },
      },
      Beverage: {
        "Calamansi Juice": {
          paxSelected: "18-20 pax",
          pricePerPax: 120,
        },
        "Iced Tea": {
          paxSelected: "4-6 pax",
          pricePerPax: 110,
        },
        "Sago't Gulaman": {
          paxSelected: "8-10 pax",
          pricePerPax: 130,
        },
        "Pineapple Juice": {
          paxSelected: "13-15 pax",
          pricePerPax: 125,
        },
      },
      Soup: {},
      Salad: {},
      Beef: {},
      Pork: {},
      Noodle: {},
      Seafood: {},
      Vegetable: {},
      Dessert: {},
    },
    eventType: "Graduation",
    guestCount: 50,
    serviceType: "Buffet",
    orderType: "Pickup",
    reservationDate: new Date("2024-05-30"),
    reservationTime: "10:00",
    totalPrice: 8400,
    serviceFee: 400,
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
    status: "Cancelled",
  },
  {
    _id: "res-5",
    fullName: "Jose Garcia",
    email: "josegarcia567@gmail.com",
    contactNumber: "09531234567",
    selectedPackage: "Basic",
    selectedMenus: {
      Seafood: {
        "Fish Kare-Kare": {
          paxSelected: "13-15 pax",
          pricePerPax: 350,
        },
        "Shrimp Sinigang": {
          paxSelected: "4-6 pax",
          pricePerPax: 380,
        },
        "Grilled Squid": {
          paxSelected: "8-10 pax",
          pricePerPax: 360,
        },
        "Sweet and Sour Fish": {
          paxSelected: "18-20 pax",
          pricePerPax: 340,
        },
      },
      Dessert: {
        Bibingka: {
          paxSelected: "8-10 pax",
          pricePerPax: 150,
        },
        "Leche Flan": {
          paxSelected: "4-6 pax",
          pricePerPax: 180,
        },
        "Maja Blanca": {
          paxSelected: "13-15 pax",
          pricePerPax: 140,
        },
        Biko: {
          paxSelected: "18-20 pax",
          pricePerPax: 130,
        },
      },
      Soup: {},
      Salad: {},
      Beef: {},
      Pork: {},
      Noodle: {},
      Chicken: {},
      Vegetable: {},
      Beverage: {},
    },
    eventType: "Birthday",
    guestCount: 70,
    serviceType: "Plated",
    orderType: "",
    reservationDate: new Date("2024-09-12"),
    reservationTime: "17:30",
    totalPrice: 16700,
    specialRequests: "Need vegetarian options for 5 guests",
    venue: "Conrad Manila",
    serviceFee: 500,
    serviceHours: "5 hours",
    createdAt: new Date("2024-08-15"),
    updatedAt: new Date("2024-08-15"),
    status: "Pending",
  },
  {
    _id: "res-6",
    fullName: "Luisa Tan",
    email: "luisatan890@yahoo.com",
    contactNumber: "09649876543",
    selectedPackage: "Deluxe",
    selectedMenus: {
      Soup: {
        "Bulalo Soup": {
          paxSelected: "4-6 pax",
          pricePerPax: 220,
        },
        "Mushroom Soup": {
          paxSelected: "8-10 pax",
          pricePerPax: 200,
        },
        "Corn Soup": {
          paxSelected: "13-15 pax",
          pricePerPax: 180,
        },
        "Crab and Corn Soup": {
          paxSelected: "18-20 pax",
          pricePerPax: 240,
        },
      },
      Chicken: {
        "Chicken Adobo": {
          paxSelected: "8-10 pax",
          pricePerPax: 250,
        },
        "Chicken Curry": {
          paxSelected: "4-6 pax",
          pricePerPax: 270,
        },
        "Chicken Inasal": {
          paxSelected: "13-15 pax",
          pricePerPax: 260,
        },
        "Fried Chicken": {
          paxSelected: "18-20 pax",
          pricePerPax: 240,
        },
      },
      Beverage: {
        "Buko Juice": {
          paxSelected: "18-20 pax",
          pricePerPax: 130,
        },
        "Iced Tea": {
          paxSelected: "4-6 pax",
          pricePerPax: 110,
        },
        Lemonade: {
          paxSelected: "8-10 pax",
          pricePerPax: 120,
        },
        "Mango Shake": {
          paxSelected: "13-15 pax",
          pricePerPax: 140,
        },
      },
      Salad: {},
      Beef: {},
      Pork: {},
      Noodle: {},
      Seafood: {},
      Vegetable: {},
      Dessert: {},
    },
    eventType: "Corporate",
    guestCount: 40,
    serviceType: "Buffet",
    orderType: "Delivery",
    reservationDate: new Date("2024-06-28"),
    reservationTime: "11:30",
    deliveryFee: 300,
    deliveryAddress: "456 Mabini Street, Quezon City, Metro Manila",
    deliveryInstructions: "Ring the doorbell twice",
    totalPrice: 7850,
    serviceFee: 300,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
    status: "Confirmed",
  },
  {
    _id: "res-7",
    fullName: "Roberto Lim",
    email: "robertolim123@icloud.com",
    contactNumber: "09751234567",
    selectedPackage: "Premium",
    selectedMenus: {
      Beef: {
        "Beef Caldereta": {
          paxSelected: "13-15 pax",
          pricePerPax: 350,
        },
        "Beef Nilaga": {
          paxSelected: "4-6 pax",
          pricePerPax: 320,
        },
        "Beef Steak": {
          paxSelected: "8-10 pax",
          pricePerPax: 380,
        },
        "Beef Kare-Kare": {
          paxSelected: "18-20 pax",
          pricePerPax: 400,
        },
      },
      Dessert: {
        Puto: {
          paxSelected: "8-10 pax",
          pricePerPax: 120,
        },
        "Leche Flan": {
          paxSelected: "4-6 pax",
          pricePerPax: 180,
        },
        "Buko Pandan": {
          paxSelected: "13-15 pax",
          pricePerPax: 150,
        },
        "Halo-Halo": {
          paxSelected: "18-20 pax",
          pricePerPax: 200,
        },
      },
      Soup: {},
      Salad: {},
      Pork: {},
      Noodle: {},
      Chicken: {},
      Seafood: {},
      Vegetable: {},
      Beverage: {},
    },
    eventType: "Wedding",
    guestCount: 90,
    serviceType: "Plated",
    orderType: "",
    reservationDate: new Date("2024-10-20"),
    reservationTime: "18:30",
    totalPrice: 13400,
    venue: "Sofitel Philippine Plaza",
    serviceFee: 1000,
    serviceHours: "10 hours",
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-09-01"),
    status: "Pending",
  },
  {
    _id: "res-8",
    fullName: "Sofia Mendoza",
    email: "sofiamendoza456@gmail.com",
    contactNumber: "09869876543",
    selectedPackage: "Basic",
    selectedMenus: {
      Vegetable: {
        Pinakbet: {
          paxSelected: "8-10 pax",
          pricePerPax: 250,
        },
        Chopsuey: {
          paxSelected: "4-6 pax",
          pricePerPax: 230,
        },
        "Ginisang Ampalaya": {
          paxSelected: "13-15 pax",
          pricePerPax: 220,
        },
        "Ginataang Kalabasa": {
          paxSelected: "18-20 pax",
          pricePerPax: 240,
        },
      },
      Beverage: {
        "Mango Shake": {
          paxSelected: "18-20 pax",
          pricePerPax: 140,
        },
        "Iced Tea": {
          paxSelected: "4-6 pax",
          pricePerPax: 110,
        },
        "Calamansi Juice": {
          paxSelected: "8-10 pax",
          pricePerPax: 120,
        },
        "Buko Juice": {
          paxSelected: "13-15 pax",
          pricePerPax: 130,
        },
      },
      Soup: {},
      Salad: {},
      Beef: {},
      Pork: {},
      Noodle: {},
      Chicken: {},
      Seafood: {},
      Dessert: {},
    },
    eventType: "Birthday",
    guestCount: 35,
    serviceType: "Buffet",
    orderType: "Pickup",
    reservationDate: new Date("2024-07-05"),
    reservationTime: "12:00",
    totalPrice: 6800,
    specialRequests: "Please provide high chairs for children",
    serviceFee: 300,
    createdAt: new Date("2024-06-10"),
    updatedAt: new Date("2024-06-10"),
    status: "Completed",
  },
  {
    _id: "res-9",
    fullName: "Miguel Lopez",
    email: "miguellopez789@outlook.com",
    contactNumber: "09971234567",
    selectedPackage: "Deluxe",
    selectedMenus: {
      Seafood: {
        "Fish Kare-Kare": {
          paxSelected: "8-10 pax",
          pricePerPax: 320,
        },
        "Shrimp Sinigang": {
          paxSelected: "4-6 pax",
          pricePerPax: 350,
        },
        "Grilled Squid": {
          paxSelected: "13-15 pax",
          pricePerPax: 370,
        },
        "Sweet and Sour Fish": {
          paxSelected: "18-20 pax",
          pricePerPax: 330,
        },
      },
      Dessert: {
        "Leche Flan": {
          paxSelected: "13-15 pax",
          pricePerPax: 180,
        },
        "Buko Pandan": {
          paxSelected: "4-6 pax",
          pricePerPax: 150,
        },
        "Halo-Halo": {
          paxSelected: "8-10 pax",
          pricePerPax: 200,
        },
        Bibingka: {
          paxSelected: "18-20 pax",
          pricePerPax: 160,
        },
      },
      Soup: {},
      Salad: {},
      Beef: {},
      Pork: {},
      Noodle: {},
      Chicken: {},
      Vegetable: {},
      Beverage: {},
    },
    eventType: "Graduation",
    guestCount: 65,
    serviceType: "Plated",
    orderType: "",
    reservationDate: new Date("2024-05-25"),
    reservationTime: "16:00",
    totalPrice: 9100,
    venue: "Okada Manila",
    serviceFee: 450,
    serviceHours: "4.5 hours",
    createdAt: new Date("2024-04-25"),
    updatedAt: new Date("2024-04-25"),
    status: "Cancelled",
  },
  {
    _id: "res-10",
    fullName: "Elena Reyes",
    email: "elenareyes234@hotmail.com",
    contactNumber: "09089876543",
    selectedPackage: "Premium",
    selectedMenus: {
      Noodle: {
        "Pancit Canton": {
          paxSelected: "4-6 pax",
          pricePerPax: 260,
        },
        "Pancit Bihon": {
          paxSelected: "8-10 pax",
          pricePerPax: 240,
        },
        "Pancit Malabon": {
          paxSelected: "13-15 pax",
          pricePerPax: 280,
        },
        Spaghetti: {
          paxSelected: "18-20 pax",
          pricePerPax: 250,
        },
      },
      Pork: {
        "Pork Sinigang": {
          paxSelected: "13-15 pax",
          pricePerPax: 300,
        },
        "Lechon Kawali": {
          paxSelected: "4-6 pax",
          pricePerPax: 320,
        },
        "Pork Adobo": {
          paxSelected: "8-10 pax",
          pricePerPax: 280,
        },
        "Pork Sisig": {
          paxSelected: "18-20 pax",
          pricePerPax: 310,
        },
      },
      Beverage: {
        "Sago't Gulaman": {
          paxSelected: "18-20 pax",
          pricePerPax: 120,
        },
        "Iced Tea": {
          paxSelected: "4-6 pax",
          pricePerPax: 110,
        },
        "Calamansi Juice": {
          paxSelected: "8-10 pax",
          pricePerPax: 120,
        },
        "Mango Shake": {
          paxSelected: "13-15 pax",
          pricePerPax: 140,
        },
      },
      Soup: {},
      Salad: {},
      Beef: {},
      Chicken: {},
      Seafood: {},
      Vegetable: {},
      Dessert: {},
    },
    eventType: "Corporate",
    guestCount: 55,
    serviceType: "Buffet",
    orderType: "Delivery",
    reservationDate: new Date("2024-08-15"),
    reservationTime: "11:00",
    deliveryFee: 300,
    deliveryAddress: "789 Bonifacio Drive, Taguig, Metro Manila",
    deliveryInstructions: "Call when you arrive",
    totalPrice: 12100,
    serviceFee: 400,
    createdAt: new Date("2024-07-20"),
    updatedAt: new Date("2024-07-20"),
    status: "Confirmed",
  },
];

const metricCards = [
  {
    title: "Total Reservations",
    value: "10",
    description: "All active bookings",
  },
  {
    title: "Confirmed",
    value: "6",
    description: "Ready to serve",
  },
  {
    title: "Pending",
    value: "4",
    description: "Awaiting confirmation",
  },
  {
    title: "Total Revenue",
    value: "$14,380",
    description: "From confirmed reservations",
  },
];

const items: Record<string, { value: string; title: string }[]> = {
  status: [
    { value: "All", title: "All Statuses" },
    { value: "Confirmed", title: "Confirmed" },
    { value: "Pending", title: "Pending" },
    { value: "Completed", title: "Completed" },
    { value: "Cancelled", title: "Cancelled" },
  ],
  customerType: [
    { value: "All", title: "All Customers" },
    { value: "Registered", title: "Registered" },
    { value: "Guest", title: "Guest" },
  ],
};

export { metricCards, items };
