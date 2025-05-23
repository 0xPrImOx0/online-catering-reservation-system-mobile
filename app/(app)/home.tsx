import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomButton from "components/CustomButton";
import { Text } from "~/components/ui/text";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  UtensilsCrossed,
  Phone,
} from "lucide-react-native";
import { categories, menuItems } from "~/lib/menu-lists";
import clsx from "clsx";
import { useState } from "react";
import Hero from "~/components/home/Hero";
import { Card } from "~/components/ui/card";
import { useColorScheme } from "~/lib/useColorScheme";
import { CateringPackagesProps } from "~/types/package-types";
import { Link } from "expo-router";
import usePackages from "~/hooks/socket/use-packages";
import PackageCard from "~/components/packages/PackageCard";

export default function Home() {
  const { isDarkColorScheme } = useColorScheme();

  const [popularMenuPill, setPopularMenuPill] = useState("Soup");

  const { featuredPackages } = usePackages();

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      <ScrollView className="pb-20">
        {/* Main content */}
        <View className="px-4">
          {/* Hero section with main heading and CTA */}
          <View className="mb-8">
            <Text className="mt-4 text-4xl font-bold leading-tight text-center text-foreground">
              Seamless Catering,
            </Text>
            <Text className="mt-1 mb-4 text-4xl font-bold leading-tight text-center text-foreground">
              Unforgettable Events
            </Text>
            <Text className="mt-2 mb-6 text-lg text-center text-muted-foreground">
              Effortless bookings, delicious menus, and stress-free planning—all
              in one platform. Reserve your perfect event catering in just a few
              clicks!
            </Text>
          </View>
          <View className="flex-row justify-center mb-8">
            <CustomButton
              onPress={() => {}}
              buttonStyles="bg-primary py-4 px-6 m-2 rounded-full self-center"
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Calendar size={20} color="black" />
                <Text className="ml-2 text-lg font-bold text-primary-foreground">
                  Book Now
                </Text>
              </View>
            </CustomButton>
            <CustomButton
              onPress={() => {}}
              buttonStyles="bg-black py-4 px-6 m-2 rounded-full self-center"
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Phone size={20} color="white" />
                <Text className="ml-2 text-lg font-bold text-foreground">
                  Contact Us
                </Text>
              </View>
            </CustomButton>
          </View>

          {/* Hero Section */}
          <Hero />

          {/* Quick Actions */}
          <View className="flex-row justify-between mb-8">
            <TouchableOpacity className="flex-1 justify-center items-center mr-2 h-20 rounded-lg border bg-card border-border">
              <UtensilsCrossed
                size={24}
                color={isDarkColorScheme ? "#fff" : "#333"}
              />
              <Text className="mt-2 text-sm text-foreground">Menus</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 justify-center items-center mx-2 h-20 rounded-lg border bg-card border-border">
              <Calendar size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
              <Text className="mt-2 text-sm text-foreground">Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 justify-center items-center ml-2 h-20 rounded-lg border bg-card border-border">
              <MapPin size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
              <Text className="mt-2 text-sm text-foreground">Find Us</Text>
            </TouchableOpacity>
          </View>

          {/* About section */}
          <View className="mb-8">
            <Text className="mb-4 text-3xl font-bold text-foreground">
              Get to know us
            </Text>
            <Text className="text-base text-muted-foreground">
              At Food Sentinel, we make catering reservations simple, fast, and
              hassle-free. Whether you're planning an intimate gathering or a
              grand celebration, our platform connects you with expertly crafted
              menus and seamless booking options. With a commitment to quality,
              convenience, and customer satisfaction, we ensure every event is a
              memorable dining experience.
            </Text>
          </View>

          <CustomButton
            onPress={() => {}}
            buttonStyles="bg-primary py-4 px-6 rounded-full self-center mb-8"
          >
            <Text className="text-lg font-bold text-primary-foreground">
              Learn more
            </Text>
          </CustomButton>

          <View className="gap-4 justify-between mb-5 rounded-lg bg-card">
            <Card className="gap-1 justify-center p-4 rounded-lg items- justify- border-border h-50 bg-card">
              <Text className="text-3xl text-foreground">5,000+</Text>
              <Text className="mt-.5 text-sm text-muted-foreground">
                Events Successfully Catered
              </Text>
            </Card>
            <Card className="gap-1 justify-center p-4 rounded-lg border-border flex- h-50 bg-card">
              <Text className="text-3xl text-foreground">{"< 1 m"}</Text>
              <Text className="mt-1 text-sm text-muted-foreground">
                Instant Booking Confirmation
              </Text>
            </Card>
            <Card className="flex-1 gap-1 justify-center p-4 rounded-lg border-border h-50 bg-card">
              <Text className="text-3xl text-foreground">95%</Text>
              <Text className="mt-1 text-sm text-muted-foreground">
                Customer Satisfaction Rate
              </Text>
            </Card>
          </View>

          {/* Featured Packages */}
          <View className="mb-8">
            <Text className="mb-4 text-3xl font-bold text-foreground">
              Featured Packages
            </Text>
            <FlatList
            contentContainerClassName="gap-6"
              horizontal
              showsHorizontalScrollIndicator={false}
              data={featuredPackages}
              renderItem={({ item }) => (
                <PackageCard key={item._id} item={item} isFeatured />
              )}
              keyExtractor={(item) => item.name}
            />
          </View>

          {/* Popular Menu Items */}
          <View className="mb-8">
            <Text className="mb-4 text-3xl font-bold text-foreground">
              Popular Menu Items
            </Text>
            <View className="mb-4">
              <FlatList
                horizontal
                data={categories}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className={clsx(
                      "px-4 py-2 mr-2 border rounded-full border-primary",
                      { "bg-primary": item === popularMenuPill }
                    )}
                    onPress={() => setPopularMenuPill(item)}
                  >
                    <Text
                      className={clsx("text-sm", {
                        "text-primary-foreground": item === popularMenuPill,
                      })}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <FlatList
              data={menuItems.slice(0, 6)}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  key={item._id}
                  className="w-[200px] mr-4 rounded-lg bg-card border border-border overflow-hidden"
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    className="h-[100px] w-full"
                    resizeMode="cover"
                  />
                  <View className="p-2">
                    <Text className="text-sm font-medium text-foreground">
                      {item.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} size={14} color="#F59E0B" />
                      ))}
                      <View className="relative ml-0.5">
                        <Star size={14} color="#D1D5DB" />
                        <View className="overflow-hidden absolute top-0 left-0 w-2 h-4">
                          <Star size={14} color="#F59E0B" />
                        </View>
                      </View>
                      <Text className="ml-1 text-xs text-muted-foreground">
                        4.5
                      </Text>
                    </View>
                    <Text className="mt-1 text-lg font-bold text-foreground">
                      ₱{item.prices[0].price.toFixed(2)}
                    </Text>
                    <TouchableOpacity className="px-2 py-1 mt-2 rounded bg-primary">
                      <Link href={`/menus/${item._id}`}>
                        <Text className="text-xs text-center text-primary-foreground">
                          View Details
                        </Text>
                      </Link>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
