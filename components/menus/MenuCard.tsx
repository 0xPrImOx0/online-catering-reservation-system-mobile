import { router } from "expo-router";
import { Star } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MenuItem } from "~/types/menu-types";

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <View
      key={item._id}
      className="flex-row mb-4 overflow-hidden border rounded-lg border-border"
    >
      <Image
        source={{ uri: item.imageUrl }}
        className="object-cover w-24 h-full"
      />
      <View className="flex-1 p-3">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-base font-bold text-foreground">
              {item.name}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {item.category}
            </Text>
          </View>
          <Text className="text-base font-bold text-foreground">
            ₱{item.prices[0].price.toFixed(2)}
          </Text>
        </View>
        <Text className="mt-1 text-xs text-muted-foreground" numberOfLines={2}>
          {item.shortDescription}
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            <Star size={12} color="#F59E0B" />
            <Text className="ml-1 text-xs text-foreground">
              {item.rating} ({item.ratingCount})
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push(`/menus/${item._id}`)}
            className="bg-primary px-3 py-1.5 rounded"
          >
            <Text className="text-xs font-medium text-primary-foreground">
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
