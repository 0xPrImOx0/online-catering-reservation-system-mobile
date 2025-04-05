"use client"

import React, { useState } from "react"
import { View, TouchableOpacity, Animated, Dimensions, ScrollView, StatusBar as RNStatusBar, Image, Platform } from "react-native"
import { Stack, useRouter, usePathname } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Text } from "~/components/ui/text"
import { useColorScheme } from "~/lib/useColorScheme"
import { ThemeToggle } from "~/components/ThemeToggle"
import { SafeAreaView } from "react-native-safe-area-context"
import { Avatar } from "~/components/ui/avatar"

const { width, height } = Dimensions.get("window")
const HEADER_HEIGHT = 10// Approximate header height
const DRAWER_HEIGHT = height * 0.45 // 80% of screen height

export default function AppLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const drawerAnimation = React.useRef(new Animated.Value(0)).current
  const router = useRouter()
  const pathname = usePathname()
  const { isDarkColorScheme } = useColorScheme()

  // // Get status bar height for proper positioning
  const statusBarHeight = RNStatusBar.currentHeight || 0

  const toggleDrawer = () => {
    const toValue = isDrawerOpen ? 0 : 1
    Animated.timing(drawerAnimation, {
      toValue,
      duration: 550,
      useNativeDriver: true,
    }).start()
    setIsDrawerOpen(!isDrawerOpen)
  }

  const translateY = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_HEIGHT, 0],
  })

  const opacity = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  })

  const menuItems = [
    { icon: "home", label: "Home", route: "/(app)/home" },
    { icon: "restaurant-outline", label: "Menus", route: "/(app)/menus" },
    { icon: "cube-outline", label: "Packages", route: "/(app)/packages" },
    { icon: "call-outline", label: "Contact", route: "/(app)/contact" },
    { icon: "people-outline", label: "About", route: "/(app)/about" },
  ]

  const navigateTo = (route: string) => {
    router.push("/")
    toggleDrawer()
  }

  const CustomHeader = ({ title }: { title: string }) => (
    <View
      className={`flex-row items-center justify-between px-4 h-[${HEADER_HEIGHT}px] ${
        isDarkColorScheme ? "bg-black/80" : "bg-white/80"
      }`}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: isDarkColorScheme ? "#333" : "#eee",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
      }}
    >
      <View className="flex-row items-center">
        <Avatar className="w-10 h-10 mr-3" alt={""}>
          <Image source={require("../../assets/daug-avatar.jpg")} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
        </Avatar>
        <Text className="text-foreground text-xl font-bold">{title}</Text>
      </View>
      <TouchableOpacity onPress={toggleDrawer}>
        <Ionicons name="menu" size={24} color={isDarkColorScheme ? "white" : "black"} />
      </TouchableOpacity>
    </View>
  )

  return (
    <View className="flex-1">
      {/* Overlay */}
      {isDrawerOpen && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleDrawer}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            opacity: 0.5,
            zIndex: 1,
          }}
        />
      )}

      {/* Top Drawer */}
      <Animated.View
        style={{
          position: "absolute",
          top: HEADER_HEIGHT,
          left: 0,
          right: 0,
          height: DRAWER_HEIGHT,
          backgroundColor: isDarkColorScheme ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)",
          zIndex: 2,
          transform: [{ translateY }],
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 10,
          // Add backdrop filter for web
          ...(Platform.OS === "web"
            ? {
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }
            : {}),
        }}
      >
        <SafeAreaView className="flex-1" edges={["bottom"]}>
          <View className="pt-6 pb-4 px-6 border-b border-border flex-row justify-between items-center">
            <View>
              <Text className="text-foreground text-2xl font-bold">Food Sentinel</Text>
              <Text className="text-muted-foreground">Premium Catering Services</Text>
            </View>
            <TouchableOpacity onPress={toggleDrawer} className="p-2">
              <Ionicons name="close" size={24} color={isDarkColorScheme ? "white" : "black"} />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1">
            <View className="py-4">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigateTo(item.route)}
                  className={`flex-row items-center px-6 py-4 ${pathname === item.route ? "bg-primary/10" : ""}`}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={pathname === item.route ? (isDarkColorScheme ? "white" : "black") : "gray"}
                  />
                  <Text
                    className={`ml-4 text-lg ${pathname === item.route ? "font-bold text-primary" : "text-foreground"}`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="p-6 border-t border-border">
            <View className="flex-row items-center justify-between">
              <Text className="text-foreground">Toggle Theme</Text>
              <ThemeToggle />
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>

      {/* Main Content */}
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: isDarkColorScheme ? "#000" : "#fff",
          },
          headerTintColor: isDarkColorScheme ? "#fff" : "#000",
          headerLeft: () => (
            <TouchableOpacity onPress={toggleDrawer} className="ml-4">
              <Ionicons name="menu" size={24} color={isDarkColorScheme ? "white" : "black"} />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          name="home"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="menus"
          options={{
            title: "Menus",
          }}
        />
        <Stack.Screen
          name="packages"
          options={{
            title: "Packages",
          }}
        />
        <Stack.Screen
          name="contact"
          options={{
            title: "Contact",
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: "About",
          }}
        />
      </Stack>
    </View>
  )
}

