import { useState } from "react";
import { View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "~/lib/useColorScheme";
import CategoryPill from "~/components/menus/CategoryPill";
import { cateringPackages, packages } from "~/lib/packages-metadata";
import PackageCard from "~/components/packages/PackageCard";

export default function PackagesPage() {
  const { isDarkColorScheme } = useColorScheme();
  const filterPackages = (type: string) => {
    if (type === "All") {
      return cateringPackages;
    }
    return cateringPackages.filter((pkg) => pkg.eventType === type);
  };
  const [selectedType, setSelectedType] = useState("All");

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      {/* Package Types */}
      <FlatList
        data={packages}
        horizontal
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
      <FlatList
        data={filterPackages(selectedType)}
        numColumns={2}
        className="gap-3"
        columnWrapperClassName="gap-3"
        renderItem={({ item }) => <PackageCard item={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
