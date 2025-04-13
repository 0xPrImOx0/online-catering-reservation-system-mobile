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
          {/* Hero section with main heading and CTA */}
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

          {/* About section */}
          <View className="mb-8">
            <Text className="text-foreground text-3xl font-bold mb-4">
              About our catering service
            </Text>
            <Text className="text-muted-foreground text-base">
              We provide premium catering services for all types of events, from
              intimate gatherings to large corporate functions. Our team of
              professional chefs uses only the finest ingredients to create
              memorable dining experiences tailored to your preferences and
              dietary requirements.
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
              {[
                {
                  name: "Essential",
                  description:
                    "An essential wedding reception package for intimate celebrations.",
                  price: "₱ 550.00 / pax",
                },
                {
                  name: "Classic",
                  description:
                    "A classic wedding reception package with enhanced offerings.",
                  price: "₱ 750.00 / pax",
                },
                {
                  name: "Elegant",
                  description:
                    "An elegant wedding reception package for a beautiful celebration.",
                  price: "₱ 950.00 / pax",
                },
                {
                  name: "Luxurious",
                  description:
                    "A luxurious wedding reception package for an unforgettable celebration",
                  price: "₱ 1250.00 / pax",
                },
              ].map((pkg) => (
                <View
                  key={pkg.name}
                  className="w-[250px] mr-4 rounded-lg bg-card border border-border overflow-hidden"
                >
                  <Image
                    source={{
                      uri: `https://placeholder.com/250x150?text=Package+${pkg.name}`,
                    }}
                    className="h-[120px] w-full"
                  />
                  <View className="p-3">
                    <Text className="font-bold text-base text-foreground">
                      Wedding Reception {pkg.name}
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
                      {/* Half star */}
                      <View className="relative">
                        <Star size={16} color="#D1D5DB" className="mr-0.5" />
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
                      {pkg.description}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center px-3 pb-3">
                    <Text className="font-bold text-base text-foreground">
                      {pkg.price}
                    </Text>
                    <TouchableOpacity className="bg-primary px-3 py-1.5 rounded">
                      <Text className="text-primary-foreground text-sm">
                        View
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
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
              {[1, 2, 3].map((item) => (
                <View
                  key={item}
                  className="w-[150px] mr-4 rounded-lg bg-card border border-border overflow-hidden"
                >
                  <Image
                    source={{
                      uri: `https://placeholder.com/150x100?text=Appetizer+${item}`,
                    }}
                    className="h-[100px] w-full"
                  />
                  <View className="p-2">
                    <Text className="font-medium text-sm text-foreground">
                      Bruschetta {item}
                    </Text>
                    <Text className="text-xs text-muted-foreground mt-1">
                      $12.99
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
