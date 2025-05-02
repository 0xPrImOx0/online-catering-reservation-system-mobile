import { View, Text, Image, TouchableOpacity } from "react-native";
import { Check, Users, Clock } from "lucide-react-native";
import CustomButton from "components/CustomButton";
import React from "react";
import { CateringPackagesProps } from "~/types/package-types";
import { useColorScheme } from "~/lib/useColorScheme";
import { Button } from "../ui/button";
import { Link, router } from "expo-router";

export default function PackageCard({ item }: { item: CateringPackagesProps }) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View
      key={item._id}
      className="overflow-hidden flex-1 mb-6 rounded-lg border border-border bg-card"
    >
      <Image source={{ uri: item.imageUrl }} className="h-[100px] w-full" />

      <View className="p-4">
        {item.eventType && (
          <Text className="text-sm text-muted-foreground">
            {item.eventType}
          </Text>
        )}
        <Text className="mt-1 text-xl min-h-[50px] font-bold text-foreground line-clamp-2">
          {item.name}
        </Text>
        <Text className="mt-2 text-sm text-foreground line-clamp-2">
          {item.description}
        </Text>

        <View className="flex-col gap-2 items-start mt-4 mb-2">
          <View className="flex-row items-center mr-4">
            <Users
              size={16}
              color={isDarkColorScheme ? "#999" : "#666"}
              className="mr-1"
            />
            <Text className="text-sm text-foreground">
              {item.minimumPax + " - " + item.maximumPax} guests
            </Text>
          </View>
          <View className="flex-row gap-2 justify-center items-center">
            <Clock
              size={16}
              color={isDarkColorScheme ? "#999" : "#666"}
              className="mr-1"
            />
            <Text className="text-sm text-foreground">
              {item.serviceHours} hours
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-col gap-4 justify-between items-start p-4 w-full border-t border-border">
        <View className="">
          <Text className="text-2xl font-bold text-foreground">
            ₱{item.pricePerPax.toFixed(2)}
          </Text>
          <Text className="text-sm text-muted-foreground">per pax</Text>
        </View>
        <View className="items-end w-full">
          <TouchableOpacity
            onPress={() => router.push(`/packages/${item._id}`)}
            className="bg-primary px-3 py-1.5 rounded"
          >
            <Text className="text-sm font-medium text-primary-foreground">
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
