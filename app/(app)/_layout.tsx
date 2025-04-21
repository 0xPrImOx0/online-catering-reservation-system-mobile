import { View, Platform } from "react-native";
import { Tabs } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text } from "~/components/ui/text";
import { Avatar } from "~/components/ui/avatar";
import { Image } from "react-native";
import {
  Home,
  UtensilsCrossed,
  Package,
  Phone,
  Users,
  User,
} from "lucide-react-native";

export default function AppLayout() {
  const { isDarkColorScheme } = useColorScheme();

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
            <Avatar className="w-8 h-8" alt={""}>
              <Image
                src=""
                source={require("")}
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
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Home size={size} color={color} />
          ),
          headerTitle: () => (
            <View className="flex-row items-center">
              <Text className="text-xl font-bold text-foreground">
                Food Sentinel
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="menus"
        options={{
          title: "Menus",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <UtensilsCrossed size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: "Packages",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Package size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Phone size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
