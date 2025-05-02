import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "~/lib/useColorScheme";
import CategoryPill from "~/components/menus/CategoryPill";
import { packages } from "~/lib/packages-metadata";
import PackageCard from "~/components/packages/PackageCard";
import api from "~/lib/axiosInstance";
import axios from "axios";
import { CateringPackagesProps } from "~/types/package-types";
import useSocketPackages from "~/hooks/use-socket-packages";

export default function PackagesPage() {
  const { isDarkColorScheme } = useColorScheme();
  const [cateringPackages, setCateringPackages] = useState<
    CateringPackagesProps[]
  >([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const getPackages = async () => {
      try {
        const response = await api.get("/packages");
        setCateringPackages(response.data.data);
      } catch (err: unknown) {
        console.log("ERRRORRR", err);

        if (axios.isAxiosError<{ error: string }>(err)) {
          const message = err.response?.data.error || "Unexpected Error Occur";

          console.error("ERROR FETCHING PACKAGES", message);
        } else {
          console.error("Something went wrong. Please try again.");
        }
      }
    };

    getPackages();
  }, []);

  // Callback to handle package updates
  const handlePackageUpdated = (updatedPackage: CateringPackagesProps) => {
    console.log("🔄 Received updated menu from socket:", updatedPackage);
    setCateringPackages((prevPackages) => {
      if (prevPackages === null) return [updatedPackage];
      return prevPackages.map((pkg) =>
        pkg._id === updatedPackage._id ? updatedPackage : pkg
      );
    });
  };

  const handlePackageCreated = (createdPackage: CateringPackagesProps) => {
    console.log("🆕 New menu created from socket:", createdPackage);
    setCateringPackages((prevPackages) => {
      if (prevPackages === null) return [createdPackage];
      return [...prevPackages, createdPackage];
    });
  };

  const handlePackageDeleted = (deletedPackage: CateringPackagesProps) => {
    console.log("❌ Menu deleted from socket:", deletedPackage);
    setCateringPackages(
      (prevPackages) =>
        prevPackages?.filter((pkg) => pkg._id !== deletedPackage._id) || null
    );
  };

  // Use the socket hook to listen for updates
  useSocketPackages({
    onPackageUpdated: handlePackageUpdated,
    onPackageCreated: handlePackageCreated,
    onPackageDeleted: handlePackageDeleted,
  });

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
