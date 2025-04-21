"use client"
import { View, Platform } from "react-native"
import { Tabs } from "expo-router"
import { useColorScheme } from "~/lib/useColorScheme"
import { Text } from "~/components/ui/text"
import { Avatar } from "~/components/ui/avatar"
import { Image } from "react-native"
import { Home, UtensilsCrossed, Package, Phone, Users, User } from "lucide-react-native"

export default function AppLayout() {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkColorScheme ? "black" : "white",
          borderTopColor: isDarkColorScheme ? "#333" : "#eee",
          height: 60,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: isDarkColorScheme ? "white" : "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: isDarkColorScheme ? "black" : "white",
          borderBottomWidth: 1,
          borderBottomColor: isDarkColorScheme ? "#333" : "#eee",
        },
        headerTintColor: isDarkColorScheme ? "white" : "black",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => (
          <View className="ml-4">
            <Avatar className="w-14 h-14" alt={""}>
              <Image
                source={require("../../assets/catering-logo.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </Avatar>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: () => (
            <View className="flex-row items-center">
              <Text className="text-foreground text-2xl font-bold">Food Sentinel</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="menus"
        options={{
          title: "Menus",
          tabBarIcon: ({ color, size }) => <UtensilsCrossed size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: "Packages",
          tabBarIcon: ({ color, size }) => <Package size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color, size }) => <Phone size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
