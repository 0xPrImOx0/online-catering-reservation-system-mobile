"use client"
import { View, TouchableOpacity, Image, ScrollView, Platform } from "react-native"
import { BlurView } from "expo-blur"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Text } from "~/components/ui/text"
import { ThemeToggle } from "~/components/ThemeToggle"
import { useColorScheme } from "~/lib/useColorScheme"

interface DrawerItemProps {
  icon: string
  label: string
  route: string
  onPress: () => void
  isActive?: boolean
}

const DrawerItem = ({ icon, label, route, onPress, isActive }: DrawerItemProps) => {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center px-6 py-4 ${isActive ? "bg-primary/10" : ""}`}
    >
      <Ionicons name={icon as any} size={24} color={isActive ? (isDarkColorScheme ? "white" : "black") : "gray"} />
      <Text className={`ml-4 text-lg ${isActive ? "font-bold text-primary" : "text-foreground"}`}>{label}</Text>
    </TouchableOpacity>
  )
}

export function CustomDrawerContent({ state, navigation, currentRoute }: any) {
  const router = useRouter()
  const { isDarkColorScheme } = useColorScheme()

  const navigateTo = (route: string) => {
    router.push('/(app)/home')
    navigation.closeDrawer()
  }

  const menuItems = [
    { icon: "home", label: "Home", route: "/(app)/home" },
    { icon: "restaurant-outline", label: "Menus", route: "/(app)/menus" },
    { icon: "cube-outline", label: "Packages", route: "/(app)/packages" },
    { icon: "call-outline", label: "Contact", route: "/(app)/contact" },
    { icon: "people-outline", label: "About", route: "/(app)/about" },
  ]

  return (
    <View className="flex-1">
      {Platform.OS !== "android" ? (
        <BlurView intensity={80} tint={isDarkColorScheme ? "dark" : "light"} className="flex-1">
          <DrawerContent menuItems={menuItems} navigateTo={navigateTo} currentRoute={currentRoute} />
        </BlurView>
      ) : (
        <View className={`flex-1 ${isDarkColorScheme ? "bg-black/90" : "bg-white/90"}`}>
          <DrawerContent menuItems={menuItems} navigateTo={navigateTo} currentRoute={currentRoute} />
        </View>
      )}
    </View>
  )
}

function DrawerContent({ menuItems, navigateTo, currentRoute }: any) {
  return (
    <>
      <View className="pt-12 pb-6 px-6 border-b border-border">
        <Image source={require("../assets/catering-logo.png")} className="w-16 h-16 mb-4" resizeMode="contain" />
        <Text className="text-foreground text-2xl font-bold">Food Sentinel</Text>
        <Text className="text-muted-foreground">Premium Catering Services</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="py-4">
          {menuItems.map((item: any, index: number) => (
            <DrawerItem
              key={index}
              icon={item.icon}
              label={item.label}
              route={item.route}
              onPress={() => navigateTo(item.route)}
              isActive={currentRoute === item.route}
            />
          ))}
        </View>
      </ScrollView>

      <View className="p-6 border-t border-border">
        <View className="flex-row items-center justify-between">
          <Text className="text-foreground">Theme</Text>
          <ThemeToggle />
        </View>
      </View>
    </>
  )
}

