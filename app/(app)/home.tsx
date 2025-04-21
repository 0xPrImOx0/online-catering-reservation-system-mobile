import { View, ScrollView, TouchableOpacity, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import CustomButton from "components/CustomButton"
import { Text } from "~/components/ui/text"
import { useColorScheme } from "~/lib/useColorScheme"
import { Calendar, Clock, MapPin, Star, UtensilsCrossed } from "lucide-react-native"
import { Card } from "~/components/ui/card"

export default function Home() {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      <ScrollView className="pb-20">

        {/* Main content */}
        <View className="px-4 py-6">
          {/* Hero section with main heading and CTA */}
          <View className="mb-8">
            <Text className="text-foreground text-4xl font-bold leading-tight text-center">
              Seamless Catering,
            </Text>
            <Text className="text-foreground text-4xl font-bold leading-tight text-center mb-4">
              Unforgettable Events
            </Text>
            <Text className="text-muted-foreground text-lg mb-6 text-center">
            Effortless bookings, delicious menus, and stress-free planning—all in one platform. Reserve your perfect event catering in just a few clicks!
            </Text>
            <CustomButton
              label="Book now"
              onPress={() => {}}
              buttonStyles="bg-primary py-4 px-6 rounded-full self-center"
              textStyle="text-primary-foreground text-lg font-bold"
              icon={require("../../assets/images/calendar.png")}
              iconStyle="w-6 h-6 mr-2"
            />
             {/* Hero Section */}
           <View className="relative h-56 w-full mb-20 pt-4">
            <Image source={require("../../assets/images/hero.jpg")} className="h-80 w-full" resizeMode="cover" />
            </View>
          </View>
        
          {/* About section */}
          <View className="mt-10 mb-8">
            <Text className="text-foreground text-3xl font-bold text-center mb-4">About our catering service</Text>
            <Text className="text-muted-foreground text-base">
              We provide premium catering services for all types of events, from intimate gatherings to large corporate
              functions. Our team of professional chefs uses only the finest ingredients to create memorable dining
              experiences tailored to your preferences and dietary requirements.
            </Text>
          </View>

          <CustomButton onPress={() => {}} buttonStyles="bg-primary py-4 px-6 rounded-full self-center mb-8">
            <Text className="text-primary-foreground text-lg font-bold">Learn more</Text>
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
            <Text className="text-foreground text-3xl font-bold mb-4 mt-10">Featured Packages</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
              {[1, 2, 3].map((item) => (
                <View key={item} className="w-[250px] mr-4 rounded-lg bg-card border border-border overflow-hidden">
                  <Image
                    source={{ uri: `https://placeholder.com/250x150?text=Package+${item}` }}
                    className="h-[120px] w-full"
                  />
                  <View className="p-3">
                    <Text className="font-bold text-base text-foreground">Wedding Package {item}</Text>
                    <View className="flex-row items-center mt-1">
                      <Star size={16} color="#F59E0B" />
                      <Text className="text-xs text-muted-foreground ml-1">4.8 (120 reviews)</Text>
                    </View>
                    <Text className="text-sm mt-2 text-foreground">
                      Complete catering solution for your special day
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center px-3 pb-3">
                    <Text className="font-bold text-base text-foreground">$999</Text>
                    <TouchableOpacity className="bg-primary px-3 py-1.5 rounded">
                      <Text className="text-primary-foreground text-sm">View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Popular Menu Items */}
          <View className="mb-8">
            <Text className="text-foreground text-3xl font-bold mb-4">Popular Menu Items</Text>
            <View className="mb-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity className="px-4 py-2 mr-2 rounded-full border border-primary bg-primary">
                  <Text className="text-sm text-primary-foreground">Appetizers</Text>
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

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
              {[1, 2, 3].map((item) => (
                <View key={item} className="w-[150px] mr-4 rounded-lg bg-card border border-border overflow-hidden">
                  <Image
                    source={{ uri: `https://placeholder.com/150x100?text=Appetizer+${item}` }}
                    className="h-[100px] w-full"
                  />
                  <View className="p-2">
                    <Text className="font-medium text-sm text-foreground">Bruschetta {item}</Text>
                    <Text className="text-xs text-muted-foreground mt-1">$12.99</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Upcoming Events */}
          {/* <View className="mb-8">
            <Text className="text-foreground text-3xl font-bold mb-4">Upcoming Events</Text>
            {[1, 2].map((item) => (
              <View key={item} className="mb-4 rounded-lg bg-card border border-border p-4">
                <View className="flex-row">
                  <View className="w-14 h-14 bg-muted rounded-lg justify-center items-center mr-4">
                    <Text className="font-bold text-lg text-foreground">{item === 1 ? "15" : "22"}</Text>
                    <Text className="text-xs text-muted-foreground">{item === 1 ? "May" : "Jun"}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-base text-foreground">
                      {item === 1 ? "Corporate Lunch" : "Wedding Reception"}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Clock size={12} color={isDarkColorScheme ? "#999" : "#666"} className="mr-1" />
                      <Text className="text-xs text-muted-foreground">
                        {item === 1 ? "12:00 PM - 3:00 PM" : "6:00 PM - 11:00 PM"}
                      </Text>
                    </View>
                    <View className="flex-row items-center mt-1">
                      <MapPin size={12} color={isDarkColorScheme ? "#999" : "#666"} className="mr-1" />
                      <Text className="text-xs text-muted-foreground">
                        {item === 1 ? "Tech Park, Building A" : "Grand Ballroom, Hotel Majestic"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View> */}
        </View>
      </ScrollView>
    </View>
  )
}
