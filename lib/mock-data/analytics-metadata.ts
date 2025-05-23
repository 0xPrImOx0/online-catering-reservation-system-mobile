type PeriodType = "monthly" | "weekly" | "daily";

export type chartDataType = {
  label: string;
  value: number;
  period: PeriodType;
};

const monthlyData: chartDataType[] = [
  { label: "Jan", value: 38000, period: "monthly" },
  { label: "Feb", value: 52000, period: "monthly" },
  { label: "Mar", value: 45000, period: "monthly" },
  { label: "Apr", value: 78000, period: "monthly" },
  { label: "May", value: 90000, period: "monthly" },
  { label: "Jun", value: 85000, period: "monthly" },
  { label: "Jul", value: 92000, period: "monthly" },
];

const weeklyData: chartDataType[] = [
  { label: "Week 1", value: 21500, period: "weekly" },
  { label: "Week 2", value: 24300, period: "weekly" },
  { label: "Week 3", value: 18700, period: "weekly" },
  { label: "Week 4", value: 27500, period: "weekly" },
];

const dailyData: chartDataType[] = [
  { label: "Mon", value: 3800, period: "daily" },
  { label: "Tue", value: 4200, period: "daily" },
  { label: "Wed", value: 3950, period: "daily" },
  { label: "Thu", value: 4500, period: "daily" },
  { label: "Fri", value: 5100, period: "daily" },
  { label: "Sat", value: 6200, period: "daily" },
  { label: "Sun", value: 5800, period: "daily" },
];

const chartData = {
  monthly: {
    data: monthlyData,
    totalSales: 48000,
    avgSales: 685,
  },
  weekly: {
    data: weeklyData,
    totalSales: 9200,
    avgSales: 230,
  },
  daily: {
    data: dailyData,
    totalSales: 3350,
    avgSales: 20,
  },
};

// Sample data for trending packages
export type trendingPackagesType = {
  id: number;
  name: string;
  eventType?: string;
  price: number;
  sales: number;
  percentChange: number;
  image?: string;
};

const trendingPackages: trendingPackagesType[] = [
  {
    id: 1,
    name: cateringPackages[0].name,
    eventType: cateringPackages[0].eventType,
    price: cateringPackages[0].pricePerPax,
    sales: 524,
    percentChange: 12,
    image: cateringPackages[0].imageUrl,
  },
  {
    id: 2,
    name: cateringPackages[1].name,
    eventType: cateringPackages[1].eventType,
    price: cateringPackages[1].pricePerPax,
    sales: 224,
    percentChange: 12,
    image: cateringPackages[1].imageUrl,
  },
  {
    id: 3,
    name: cateringPackages[2].name,
    eventType: cateringPackages[2].eventType,
    price: cateringPackages[2].pricePerPax,
    sales: 124,
    percentChange: 12,
    image: cateringPackages[2].imageUrl,
  },
  {
    id: 4,
    name: cateringPackages[3].name,
    eventType: cateringPackages[3].eventType,
    price: cateringPackages[3].pricePerPax,
    sales: 104,
    percentChange: 12,
    image: cateringPackages[3].imageUrl,
  },
];

// Sample data for most favorite dishes
export type favoriteMenuType = {
  id: number;
  name: string;
  image?: string;
  likes: number;
  rating: number;
};

// Function to get top 4 menu items by rating
const getTopRatedMenus = (): favoriteMenuType[] => {
  return menuItems
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
    .map((item, index) => ({
      id: index + 1,
      name: item.name,
      image: item.imageUrl,
      likes: item.ratingCount,
      rating: item.rating,
    }));
};

// Assign top rated menus to favoriteMenus
const favoriteMenus: favoriteMenuType[] = getTopRatedMenus();

// Sample data for most selling dishes
export type mostSellingMenusType = {
  id: number;
  name: string;
  category: string;
  price: number;
  image?: string;
  servesFor: string;
  ratingCount: number;
};

// Function to get top selling menu items by rating count
const getTopSellingMenus = (): mostSellingMenusType[] => {
  return menuItems
    .sort((a, b) => b.ratingCount - a.ratingCount)
    .slice(0, 4)
    .map((item, index) => ({
      id: index + 1,
      name: item.name,
      category: item.category,
      price: item.regularPricePerPax || 0,
      image: item.imageUrl,
      servesFor: `${item.prices?.[0]?.minimumPax || 4} Person`,
      ratingCount: item.ratingCount,
    }));
};

// Assign top selling menus to mostSellingMenus
const mostSellingMenus: mostSellingMenusType[] = getTopSellingMenus();

export { chartData, trendingPackages, favoriteMenus, mostSellingMenus };
