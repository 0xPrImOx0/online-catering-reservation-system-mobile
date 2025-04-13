import { View, ScrollView, TouchableOpacity, Image } from "react-native";
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

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      <ScrollView className="pb-20">
        {/* Hero Section */}
        <View className="relative h-56 w-full mb-8">
          <Image
            source={require("../../assets/catering-logo.png")}
            className="h-full w-full"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 bg-black/40 px-4 py-3">
            <Text className="text-white text-2xl font-bold">
              Delicious Catering
            </Text>
            <Text className="text-white text-base">
              For Every Special Occasion
            </Text>
          </View>
        </View>

        {/* Main content */}
        <View className="px-4">
          {/* Hero heading and CTA */}
          <View className="mb-8">
            <Text className="text-foreground text-4xl font-bold leading-tight mb-4">
              Seamless Catering, Unforgettable Events
            </Text>
            <Text className="text-muted-foreground text-lg mb-6">
              Effortless bookings, delicious menus, and stress-free planning—all
              in one platform. Reserve your perfect event catering in just a few
              clicks!
            </Text>
            <CustomButton
              label="Book now"
              onPress={() => {}}
              buttonStyles="bg-primary py-4 px-6 rounded-full self-start"
              textStyle="text-primary-foreground text-lg font-bold"
              icon={require("../../assets/images/calendar.png")}
              iconStyle="w-6 h-6 mr-2"
            />
          </View>

          {/* Quick Actions */}
          <View className="flex-row justify-between mb-8">
            <TouchableOpacity className="flex-1 h-20 mr-2 justify-center items-center bg-card rounded-lg border border-border">
              <UtensilsCrossed
                size={24}
                color={isDarkColorScheme ? "#fff" : "#333"}
              />
              <Text className="mt-2 text-sm text-foreground">Menus</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 h-20 mx-2 justify-center items-center bg-card rounded-lg border border-border">
              <Calendar size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
              <Text className="mt-2 text-sm text-foreground">Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 h-20 ml-2 justify-center items-center bg-card rounded-lg border border-border">
              <MapPin size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
              <Text className="mt-2 text-sm text-foreground">Find Us</Text>
            </TouchableOpacity>
          </View>

          {/* About Section */}
          <View className="mb-8">
            <Text className="text-foreground text-3xl font-bold mb-4">
              Get to know us
            </Text>
            <Text className="text-muted-foreground text-base">
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
            <Text className="text-primary-foreground text-lg font-bold">
              Learn more
            </Text>
          </CustomButton>

          {/* Featured Packages */}
          <View className="mb-8">
            <Text className="text-foreground text-3xl font-bold mb-4">
              Featured Packages
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-2"
            >
              {["Essential", "Classic", "Elegant", "Luxurious"].map(
                (pkgName) => {
                  const descriptions = {
                    Essential:
                      "An essential wedding reception package for intimate celebrations.",
                    Classic:
                      "A classic wedding reception package with enhanced offerings.",
                    Elegant:
                      "An elegant wedding reception package for a beautiful celebration.",
                    Luxurious:
                      "A luxurious wedding reception package for an unforgettable celebration",
                  };
                  const prices = {
                    Essential: "₱ 550.00 / pax",
                    Classic: "₱ 750.00 / pax",
                    Elegant: "₱ 950.00 / pax",
                    Luxurious: "₱ 1250.00 / pax",
                  };
                  return (
                    <View
                      key={pkgName}
                      className="w-[250px] mr-4 rounded-lg bg-card border border-border overflow-hidden"
                    >
                      <Image
                        source={packageImages[pkgName]}
                        className="h-[120px] w-full"
                        resizeMode="cover"
                      />
                      <View className="p-3">
                        <Text className="font-bold text-base text-foreground">
                          Wedding Reception {pkgName}
                        </Text>
                        <View className="flex-row items-center mt-1">
                          {[...Array(4)].map((_, index) => (
                            <Star
                              key={index}
                              size={16}
                              color="#F59E0B"
                              className="mr-0.5"
                            />
                          ))}
                          <View className="relative">
                            <Star
                              size={16}
                              color="#D1D5DB"
                              className="mr-0.5"
                            />
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
                          <Text className="text-xs text-muted-foreground ml-1">
                            4.5
                          </Text>
                        </View>
                        <Text className="text-sm mt-2 text-foreground">
                          {descriptions[pkgName]}
                        </Text>
                      </View>
                      <View className="flex-row justify-between items-center px-3 pb-3">
                        <Text className="font-bold text-base text-foreground">
                          {prices[pkgName]}
                        </Text>
                        <TouchableOpacity className="bg-primary px-3 py-1.5 rounded">
                          <Text className="text-primary-foreground text-sm">
                            View
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }
              )}
            </ScrollView>
          </View>

          {/* Popular Menu Items */}
          <View className="mb-8">
            <Text className="text-foreground text-3xl font-bold mb-4">
              Popular Menu Items
            </Text>
            <View className="mb-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity className="px-4 py-2 mr-2 rounded-full border border-primary bg-primary">
                  <Text className="text-sm text-primary-foreground">
                    Appetizers
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-2 mr-2 rounded-full border border-border">
                  <Text className="text-sm text-foreground">Main Course</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-2 mr-2 rounded-full border border-border">
                  <Text className="text-sm text-foreground">Desserts</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-2 mr-2 rounded-full border border-border">
                  <Text className="text-sm text-foreground">Drinks</Text>
                </TouchableOpacity>
              </ScrollView>
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
                    <Text className="font-medium text-sm text-foreground">
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
                      <Text className="text-xs text-muted-foreground ml-1">
                        4.5
                      </Text>
                    </View>
                    <Text className="text-xs text-muted-foreground mt-1">
                      {item.price}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Upcoming Events */}
          <View className="mb-8">
            <Text className="text-foreground text-3xl font-bold mb-4">
              Upcoming Events
            </Text>
            {[1, 2].map((item) => (
              <View
                key={item}
                className="mb-4 rounded-lg bg-card border border-border p-4"
              >
                <View className="flex-row">
                  <View className="w-14 h-14 bg-muted rounded-lg justify-center items-center mr-4">
                    <Text className="font-bold text-lg text-foreground">
                      {item === 1 ? "15" : "22"}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      {item === 1 ? "May" : "Jun"}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-base text-foreground">
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
