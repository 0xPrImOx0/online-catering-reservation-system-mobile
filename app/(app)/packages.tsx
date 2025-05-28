import { useState } from "react";
import { View, FlatList, Text, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "~/lib/useColorScheme";
import CategoryPill from "~/components/menus/CategoryPill";
import { packages } from "~/lib/packages-metadata";
import PackageCard from "~/components/packages/PackageCard";
import useApiPackages from "~/hooks/useApiPackages";
import Loading from "~/components/Loading";

export default function PackagesPage() {
  const { isDarkColorScheme } = useColorScheme();
  const { cateringPackages, isLoading, error, refreshPackages, refreshFeatured } = useApiPackages();
  const [selectedType, setSelectedType] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refreshPackages(), refreshFeatured()]);
    } finally {
      setRefreshing(false);
    }
  };

  const filterPackages = (type: string) => {
    if (!cateringPackages) return [];

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
          keyExtractor={(item) => item._id as string}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[isDarkColorScheme ? '#ffffff' : '#000000']}
              tintColor={isDarkColorScheme ? '#ffffff' : '#000000'}
            />
          }
        />
      )}
    </View>
  );
}
