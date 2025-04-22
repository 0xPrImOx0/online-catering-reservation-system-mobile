import { View, Text, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button } from "~/components/ui/button";
import { useState } from "react";

export default function SplashScreen() {
  const [user, setUser] = useState(false);

  if (!user) {
    return <Redirect href="/menus" />;
  }

  return (
    <View className="items-center justify-center flex-1 bg-black">
      <StatusBar style="light" />
      <Image
        source={require("../assets/catering-logo.png")}
        className="w-[150px] h-[150px]"
        resizeMode="contain"
      />
      <Text className="mt-5 text-4xl font-bold text-white">Food Sentinel</Text>
      <Text className="mt-2 mb-10 text-lg text-gray-400">
        Premium Catering Services
      </Text>
      <Button
        variant="outline"
        className="bg-white shadow shadow-foreground/5"
        onPress={() => router.push("./(auth)/signIn")}
      >
        <Text>Continue</Text>
      </Button>
    </View>
  );
}
