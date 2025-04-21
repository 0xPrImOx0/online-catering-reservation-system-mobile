import { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { Check, Users, Clock } from "lucide-react-native";
import CustomButton from "components/CustomButton";
import { cateringPackages, packages } from "~/lib/packages-metadata";
import CategoryPill from "~/components/menus/CategoryPill";

export default function PackagesPage() {
  const { isDarkColorScheme } = useColorScheme();
  const [selectedType, setSelectedType] = useState("All");
  const packageTypes = [
    "All",
    "Wedding",
    "Corporate",
    "Birthday",
    "Anniversary",
    "Custom",
  ];

  // const packages = [
  //   {
  //     id: 1,
  //     name: "Premium Wedding Package",
  //     type: "Wedding",
  //     price: 2499,
  //     priceUnit: "per event",
  //     image: "https://placeholder.com/400x200?text=Wedding+Package",
  //     description: "Complete catering solution for your special day",
  //     guests: "50-200",
  //     duration: "6 hours",
  //     features: [
  //       "Full-service catering",
  //       "Customizable menu options",
  //       "Professional staff",
  //       "Setup and cleanup",
  //       "Premium dinnerware",
  //       "Beverage service",
  //     ],
  //     popular: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Corporate Lunch",
  //     type: "Corporate",
  //     price: 25,
  //     priceUnit: "per person",
  //     image: "https://placeholder.com/400x200?text=Corporate+Package",
  //     description: "Professional catering for business meetings and events",
  //     guests: "10-100",
  //     duration: "3 hours",
  //     features: [
  //       "Buffet-style service",
  //       "Healthy menu options",
  //       "Disposable eco-friendly dinnerware",
  //       "Beverage service",
  //       "On-time delivery",
  //       "Setup included",
  //     ],
  //     popular: false,
  //   },
  //   {
  //     id: 3,
  //     name: "Birthday Celebration",
  //     type: "Birthday",
  //     price: 599,
  //     priceUnit: "per event",
  //     image: "https://placeholder.com/400x200?text=Birthday+Package",
  //     description: "Make your birthday special with our catering package",
  //     guests: "20-50",
  //     duration: "4 hours",
  //     features: [
  //       "Themed food options",
  //       "Birthday cake included",
  //       "Decorative food displays",
  //       "Staff for service",
  //       "Setup and cleanup",
  //       "Customizable menu",
  //     ],
  //     popular: false,
  //   },
  // ]

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
        data={cateringPackages}
        renderItem={({ item }) => (
          <View
            key={item._id}
            className="mb-6 overflow-hidden border rounded-lg border-border bg-card"
          >
            <View className="relative">
              <Image
                source={{ uri: item.imageUrl }}
                className="h-[180px] w-full"
              />
            </View>

            <View className="p-4">
              {item.eventType && (
                <Text className="text-sm text-muted-foreground">
                  {item.eventType}
                </Text>
              )}
              <Text className="mt-1 text-xl font-bold text-foreground">
                {item.name}
              </Text>
              <Text className="mt-2 text-sm text-foreground">
                {item.description}
              </Text>

              <View className="flex-row mt-4 mb-2">
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
                <View className="flex-row items-center justify-center gap-2">
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

              <Text className="mt-4 mb-2 text-base font-medium text-foreground">
                What's Included:
              </Text>
              {item.inclusions.slice(0, 4).map((feature, index) => (
                <View key={index} className="flex-row items-center mb-1">
                  <Check
                    size={16}
                    color={isDarkColorScheme ? "#fff" : "#333"}
                    className="mr-2"
                  />
                  <Text className="text-sm text-foreground">
                    {feature.includes}
                  </Text>
                </View>
              ))}
              {item.inclusions.length > 4 && (
                <Text className="mt-1 ml-6 text-sm text-muted-foreground">
                  +{item.inclusions.length - 4} more items
                </Text>
              )}
            </View>

            <View className="flex-row items-center justify-between p-4 border-t border-border">
              <View>
                <Text className="text-2xl font-bold text-foreground">
                  ₱{item.pricePerPax.toFixed(2)}
                </Text>
                <Text className="text-sm text-muted-foreground">per pax</Text>
              </View>
              <CustomButton
                label="Book Now"
                onPress={() => {}}
                buttonStyles="bg-primary py-2.5 px-4 rounded"
                textStyle="text-primary-foreground text-base font-medium"
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
