import { useEffect, useState } from "react";
import { View, FlatList, Text, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "~/lib/useColorScheme";
import CategoryPill from "~/components/menus/CategoryPill";
import { packages } from "~/lib/packages-metadata";
import PackageCard from "~/components/packages/PackageCard";
import usePackages from "~/hooks/socket/use-packages";
import { cn } from "~/lib/utils";
import { Fold } from "react-native-animated-spinkit";
import Loading from "~/components/Loading";

export default function PackagesPage() {
  const { isDarkColorScheme } = useColorScheme();
  const { cateringPackages, isLoading, error } = usePackages();
  const [selectedType, setSelectedType] = useState("All");

  const filterPackages = (type: string) => {
    if (type === "All") {
      return cateringPackages;
    }
    return cateringPackages.filter((pkg) => pkg.eventType === type);
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      {/* Package Types */}
      <FlatList
        data={packages}
        horizontal
        contentContainerClassName="h-16"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => item}
        className="py-3"
        renderItem={({ item }) => (
          <CategoryPill
            item={item}
            selectedCategory={selectedType}
            setSelectedCategory={setSelectedType}
          />
        )}
      />

      {/* Packages */}
      {isLoading ? (
        <Loading message="Loading Packages" />
      ) : error ? (
        <Text className="text-red-500">Error: {error}</Text>
      ) : (
        <FlatList
          data={filterPackages(selectedType)}
          numColumns={2}
          className="gap-3"
          columnWrapperClassName="gap-3"
          renderItem={({ item }) => <PackageCard item={item} />}
          keyExtractor={(item) => item.name}
        />
      )}
    </View>
  );
}
