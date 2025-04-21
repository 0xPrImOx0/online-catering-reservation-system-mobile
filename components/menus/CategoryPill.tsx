import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { CategoryProps } from "~/types/menu-types";

export default function CategoryPill({
  item,
  selectedCategory,
  setSelectedCategory,
}: {
  item: CategoryProps;
  selectedCategory: string;
  setSelectedCategory: (e: string) => void;
}) {
  return (
    <TouchableOpacity
      className={`px-4 py-2 mr-2 rounded-full border h-10 ${
        selectedCategory === item
          ? "bg-primary border-primary"
          : "bg-card border-border"
      }`}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        className={`text-sm ${
          selectedCategory === item
            ? "text-primary-foreground"
            : "text-foreground"
        }`}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
}
