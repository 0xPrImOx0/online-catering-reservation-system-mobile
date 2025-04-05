import { useEffect } from "react"
import { View, Text, Image } from "react-native"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Button } from "~/components/ui/button";

export default function SplashScreen() {

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <StatusBar style="light" />
      <Image source={require("../assets/catering-logo.png")} className="w-[150px] h-[150px]" resizeMode="contain" />
      <Text className="text-white text-4xl font-bold mt-5">Food Sentinel</Text>
      <Text className="text-gray-400 text-lg mt-2 mb-10">Premium Catering Services</Text>
      <Button
            variant="outline"
            className="bg-white shadow shadow-foreground/5"
            onPress={() => router.push("./(auth)/signIn")}
          >
            <Text>Continue</Text>
          </Button>
    </View>
    
  )
}
