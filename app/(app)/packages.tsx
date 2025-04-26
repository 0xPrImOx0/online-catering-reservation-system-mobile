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
import { Check, Users, Clock } from "lucide-react-native";
import CustomButton from "components/CustomButton";
import CategoryPill from "~/components/menus/CategoryPill";
import { useColorScheme } from "~/lib/useColorScheme";
import { cateringPackages, packages } from "~/lib/packages-metadata";

export default function PackagesPage() {
  const { isDarkColorScheme } = useColorScheme();
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
