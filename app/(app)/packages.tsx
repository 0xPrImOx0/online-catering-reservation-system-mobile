import { useState } from "react"
import { View, ScrollView, TouchableOpacity, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Text } from "~/components/ui/text"
import { useColorScheme } from "~/lib/useColorScheme"
import { Check, Users, Clock } from "lucide-react-native"
import CustomButton from "components/CustomButton"

export default function PackagesPage() {
  const { isDarkColorScheme } = useColorScheme()
  const [selectedType, setSelectedType] = useState("All")
  const packageTypes = ["All", "Wedding", "Corporate", "Birthday", "Anniversary", "Custom"]

  const packages = [
    {
      id: 1,
      name: "Premium Wedding Package",
      type: "Wedding",
      price: 2499,
      priceUnit: "per event",
      image: "https://placeholder.com/400x200?text=Wedding+Package",
      description: "Complete catering solution for your special day",
      guests: "50-200",
      duration: "6 hours",
      features: [
        "Full-service catering",
        "Customizable menu options",
        "Professional staff",
        "Setup and cleanup",
        "Premium dinnerware",
        "Beverage service",
      ],
      popular: true,
    },
    {
      id: 2,
      name: "Corporate Lunch",
      type: "Corporate",
      price: 25,
      priceUnit: "per person",
      image: "https://placeholder.com/400x200?text=Corporate+Package",
      description: "Professional catering for business meetings and events",
      guests: "10-100",
      duration: "3 hours",
      features: [
        "Buffet-style service",
        "Healthy menu options",
        "Disposable eco-friendly dinnerware",
        "Beverage service",
        "On-time delivery",
        "Setup included",
      ],
      popular: false,
    },
    {
      id: 3,
      name: "Birthday Celebration",
      type: "Birthday",
      price: 599,
      priceUnit: "per event",
      image: "https://placeholder.com/400x200?text=Birthday+Package",
      description: "Make your birthday special with our catering package",
      guests: "20-50",
      duration: "4 hours",
      features: [
        "Themed food options",
        "Birthday cake included",
        "Decorative food displays",
        "Staff for service",
        "Setup and cleanup",
        "Customizable menu",
      ],
      popular: false,
    },
  ]

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      
      {/* Package Types */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-3 border-b border-border"
        contentContainerClassName="px-4"
      >
        {packageTypes.map((type) => (
          <TouchableOpacity
            key={type}
            className={`px-4 py-2 mr-2 rounded-full border ${
              selectedType === type ? "bg-primary border-primary" : "bg-card border-border"
            }`}
            onPress={() => setSelectedType(type)}
          >
            <Text
              className={`text-sm ${selectedType === type ? "text-primary-foreground" : "text-foreground"}`}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Packages */}
      <ScrollView className="p-4">
        {packages.map((pkg) => (
          <View key={pkg.id} className="mb-6 border border-border rounded-lg overflow-hidden bg-card">
            <View className="relative">
              <Image source={{ uri: pkg.image }} className="h-[180px] w-full" />
              {pkg.popular && (
                <View className="absolute top-2 right-2 bg-primary px-2 py-1 rounded">
                  <Text className="text-xs font-bold text-primary-foreground">Popular</Text>
                </View>
              )}
            </View>

            <View className="p-4">
              <Text className="text-muted-foreground text-sm">{pkg.type}</Text>
              <Text className="text-foreground text-xl font-bold mt-1">{pkg.name}</Text>
              <Text className="text-foreground text-sm mt-2">{pkg.description}</Text>

              <View className="flex-row mt-4 mb-2">
                <View className="flex-row items-center mr-4">
                  <Users size={16} color={isDarkColorScheme ? "#999" : "#666"} className="mr-1" />
                  <Text className="text-foreground text-sm">{pkg.guests} guests</Text>
                </View>
                <View className="flex-row items-center">
                  <Clock size={16} color={isDarkColorScheme ? "#999" : "#666"} className="mr-1" />
                  <Text className="text-foreground text-sm">{pkg.duration}</Text>
                </View>
              </View>

              <Text className="text-foreground text-base font-medium mt-4 mb-2">What's Included:</Text>
              {pkg.features.slice(0, 4).map((feature, index) => (
                <View key={index} className="flex-row items-center mb-1">
                  <Check size={16} color={isDarkColorScheme ? "#fff" : "#333"} className="mr-2" />
                  <Text className="text-foreground text-sm">{feature}</Text>
                </View>
              ))}
              {pkg.features.length > 4 && (
                <Text className="text-muted-foreground text-sm ml-6 mt-1">+{pkg.features.length - 4} more items</Text>
              )}
            </View>

            <View className="flex-row justify-between items-center p-4 border-t border-border">
              <View>
                <Text className="text-foreground text-2xl font-bold">${pkg.price}</Text>
                <Text className="text-muted-foreground text-sm">{pkg.priceUnit}</Text>
              </View>
              <CustomButton
                label="Book Now"
                onPress={() => {}}
                buttonStyles="bg-primary py-2.5 px-4 rounded"
                textStyle="text-primary-foreground text-base font-medium"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
