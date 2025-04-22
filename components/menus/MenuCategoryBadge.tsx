import { getCategoryIcon } from "~/libs/menu-category-badges";
import { CategoryBadgeProps } from "~/types/menu-types";
import { Badge } from "../ui/badge";
import { Text } from "../ui/text";

export function CategoryBadge({
  category,
  size = "medium",
}: CategoryBadgeProps) {
  const IconComponent = getCategoryIcon(category);
  const iconSize = size === "small" ? "h-3 w-3" : "h-4 w-4";

  // Directly define colors based on category
  const getColorClasses = () => {
    switch (category) {
      case "Soup":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Salad":
        return "bg-green-100 text-green-800 border-green-200";
      case "Beef":
        return "bg-red-100 text-red-800 border-red-200";
      case "Pork":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "Noodle":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Chicken":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Seafood":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Vegetable":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Dessert":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Beverage":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge
      variant="outline"
      className={`flex-row items-center gap-1 ${getColorClasses()}`}
    >
      <IconComponent className={iconSize} />
      <Text className="text-background">{category}</Text>
    </Badge>
  );
}
