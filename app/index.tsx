import { View, Text, Image, Platform } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Fold } from "react-native-animated-spinkit";
import clsx from "clsx";

export default function SplashScreen() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/packages");
    }, 1000); // Mock loading time of 2 seconds
    return () => clearTimeout(timer);
  }, [user]);

  return (
    <View className="relative flex-1 justify-center items-center bg-background">
      <StatusBar style="light" />
      <Image
        source={require("../assets/catering-logo.png")}
        className="w-[150px] h-[150px]"
        resizeMode="contain"
      />
      <Text className="mt-5 text-4xl font-bold text-foreground">
        Food Sentinel
      </Text>
      <Text className="mt-2 mb-10 text-lg text-gray-400">
        Premium Catering Services
      </Text>
      <View
        className={clsx("absolute items-center gap-8", {
          "bottom-10": Platform.OS === "ios",
        })}
      >
        <Fold size={48} color="#FFF" />
        <Text className="text-foreground">Initializing....</Text>
      </View>
    </View>
  );
}
