import { View, Text, Platform, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkColorScheme ? "#000" : "white",
          borderBottomWidth: Platform.OS === "android" && 1,
          borderBottomColor: isDarkColorScheme ? "#333" : "#eee",
          height: 200,
        },

        headerTintColor: isDarkColorScheme ? "white" : "black",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            className="justify-center items-center w-10 h-10 rounded-full"
          >
            <ChevronLeft color={"white"} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="contact-us/index" options={{ title: "Contact Us" }} />
      <Stack.Screen name="about-us/index" options={{ title: "About Us" }} />
      <Stack.Screen
        name="menus/[menuId]/index"
        options={{ title: "Menu Showcase" }}
      />
      <Stack.Screen
        name="packages/[packageId]/index"
        options={{ title: "Package Showcase" }}
      />
      <Stack.Screen name="book-now/[id]" options={{ title: "Book Now" }} />
    </Stack>
  );
}
