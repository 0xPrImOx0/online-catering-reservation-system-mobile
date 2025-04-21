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
import { useColorScheme } from "~/lib/useColorScheme";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  UtensilsCrossed,
} from "lucide-react-native";
import { categories } from "~/lib/menu-lists";
import clsx from "clsx";
import { useState } from "react";
import Hero from "~/components/home/Hero";
import { cateringPackages } from "~/lib/packages-metadata";

export default function Home() {
  const { isDarkColorScheme } = useColorScheme();

  const packageImages = {
    Essential: require("../../assets/images/essential.png"),
    Classic: require("../../assets/images/classic.png"),
    Elegant: require("../../assets/images/elegant.png"),
    Luxurious: require("../../assets/images/luxurious.png"),
  };

  const appetizers = [
    {
      name: "Ensaladang Talong",
      price: "₱203.00",
      image: require("../../assets/images/eggplant.png"),
    },
    {
      name: "Kinilaw na Tuna",
      price: "₱436.00",
      image: require("../../assets/images/kinilaw.png"),
    },
    {
      name: "Ensaladang Mangga",
      price: "₱232.00",
      image: require("../../assets/images/mango.png"),
    },
  ];

  const [popularMenuPill, setPopularMenuPill] = useState("Soup");

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      <ScrollView className="pb-20">
        {/* Hero Section */}
        <Hero />

        {/* Main content */}
        <View className="px-4">
          {/* Hero section with main heading and CTA */}
          <View className="mb-8">
            <Text className="mb-4 text-4xl font-bold leading-tight text-foreground">
              Seamless Catering, Unforgettable Events
            </Text>
            <Text className="mb-6 text-lg text-muted-foreground">
              Effortless bookings, delicious menus, and stress-free planning—all
              in one platform. Reserve your perfect event catering in just a few
              clicks!
            </Text>
            <CustomButton
              label="Book now"
              onPress={() => {}}
              buttonStyles="bg-primary py-4 px-6 rounded-full self-center"
              textStyle="text-primary-foreground text-lg font-bold"
              icon={require("../../assets/images/calendar.png")}
              iconStyle="w-6 h-6 mr-2"
            />
          </View>

          {/* Quick Actions */}
          <View className="flex-row justify-between mb-8">
            <TouchableOpacity className="items-center justify-center flex-1 h-20 mr-2 border rounded-lg bg-card border-border">
              <UtensilsCrossed
                size={24}
                color={isDarkColorScheme ? "#fff" : "#333"}
              />
              <Text className="mt-2 text-sm text-foreground">Menus</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center justify-center flex-1 h-20 mx-2 border rounded-lg bg-card border-border">
              <Calendar size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
              <Text className="mt-2 text-sm text-foreground">Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center justify-center flex-1 h-20 ml-2 border rounded-lg bg-card border-border">
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
            buttonStyles="bg-primary py-4 px-6 rounded-full self-start mb-8"
          >
            <Text className="text-lg font-bold text-primary-foreground">
              Learn more
            </Text>
          </CustomButton>

          {/* Quick Actions */}
         <View className="flex-row justify-between mb-5 py=4 px-5 bg-card rounded-lg">
            <Card className="flex-1 h-50 mr-3 justify-center items-center bg-card rounded-lg border-white">
              <Text className="text-2xl text-foreground">5,000+</Text>
              <Text className="mt-.5 text-sm text-muted-foreground">Events Successfully Catered</Text>
            </Card>
            <Card className="flex-1 h-50 mr-3 justify-center items-center bg-card rounded-lg border-white">
              <Text className="text-2xl text-foreground">{"< 1 m"}</Text>
              <Text className="mt-1 text-sm text-muted-foreground">Instant Booking Confirmation</Text>
            </Card>
            <Card className="flex-1 h-50 mr-3 justify-center items-center bg-card rounded-lg border-white">
              <Text className="text-2xl text-foreground">95%</Text>
              <Text className="mt-1 text-sm text-muted-foreground">Customer Satisfaction Rate</Text>
            </Card>
          </View>

          {/* Featured Packages */}
          <View className="mb-8">
            <Text className="mb-4 text-3xl font-bold text-foreground">
              Featured Packages
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={cateringPackages.slice(0, 4)}
              renderItem={({ item }) => (
                <View
                  key={item._id}
                  className="w-[250px] mr-4 rounded-lg bg-card border border-border overflow-hidden"
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    className="h-[120px] w-full"
                    resizeMode="cover"
                  />
                  <View className="p-3">
                    <Text className="text-base font-bold text-foreground">
                      {item.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      {[...Array(4)].map((_, index) => (
                        <Star key={index} size={16} color="#F59E0B" />
                      ))}
                      <View className="relative">
                        <Star size={16} color="#D1D5DB" />
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: 8,
                            height: 16,
                            overflow: "hidden",
                          }}
                        >
                          <Star size={16} color="#F59E0B" />
                        </View>
                      </View>
                      <Text className="ml-1 text-xs text-muted-foreground">
                        4.5
                      </Text>
                    </View>
                    <Text className="mt-2 text-sm text-foreground">
                      {item.description}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between px-3 pb-3">
                    <Text className="text-base font-bold text-foreground">
                      ₱{item.pricePerPax.toFixed(2)} / per pax
                    </Text>
                    <TouchableOpacity className="bg-primary px-3 py-1.5 rounded">
                      <Text className="text-sm text-primary-foreground">
                        View
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item._id}
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

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-2"
            >
              {appetizers.map((item, index) => (
                <View
                  key={index}
                  className="w-[150px] mr-4 rounded-lg bg-card border border-border overflow-hidden"
                >
                  <Image
                    source={item.image}
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
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: 7,
                            height: 14,
                            overflow: "hidden",
                          }}
                        >
                          <Star size={14} color="#F59E0B" />
                        </View>
                      </View>
                      <Text className="ml-1 text-xs text-muted-foreground">
                        4.5
                      </Text>
                    </View>
                    <Text className="mt-1 text-xs text-muted-foreground">
                      {item.price}
                    </Text>
                    <TouchableOpacity className="px-2 py-1 mt-2 rounded bg-primary">
                      <Text className="text-xs text-center text-primary-foreground">
                        View
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Upcoming Events */}
          <View className="mb-8">
            <Text className="mb-4 text-3xl font-bold text-foreground">
              Upcoming Events
            </Text>
            {[1, 2].map((item) => (
              <View
                key={item}
                className="p-4 mb-4 border rounded-lg bg-card border-border"
              >
                <View className="flex-row">
                  <View className="items-center justify-center mr-4 rounded-lg w-14 h-14 bg-muted">
                    <Text className="text-lg font-bold text-foreground">
                      {item === 1 ? "15" : "22"}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      {item === 1 ? "May" : "Jun"}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-bold text-foreground">
                      {item === 1 ? "Corporate Lunch" : "Wedding Reception"}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Clock
                        size={12}
                        color={isDarkColorScheme ? "#999" : "#666"}
                        className="mr-1"
                      />
                      <Text className="text-xs text-muted-foreground">
                        {item === 1
                          ? "12:00 PM - 3:00 PM"
                          : "6:00 PM - 11:00 PM"}
                      </Text>
                    </View>
                    <View className="flex-row items-center mt-1">
                      <MapPin
                        size={12}
                        color={isDarkColorScheme ? "#999" : "#666"}
                        className="mr-1"
                      />
                      <Text className="text-xs text-muted-foreground">
                        {item === 1
                          ? "Tech Park, Building A"
                          : "Grand Ballroom, Hotel Majestic"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
