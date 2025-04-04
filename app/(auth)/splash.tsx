"use client"

import { useEffect } from "react"
import { View, Text, Image } from "react-native"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function SplashScreen() {
  useEffect(() => {
    // Navigate to sign in screen after 2 seconds
    const timer = setTimeout(() => {
      router.replace("/(auth)/signIn")
    },)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <StatusBar style="light" />
      <Image source={require("../../assets/catering-logo.png")} className="w-[150px] h-[150px]" resizeMode="contain" />
      <Text className="text-white text-4xl font-bold mt-5">Food Sentinel</Text>
      <Text className="text-gray-400 text-lg mt-2">Premium Catering Services</Text>
    </View>
  )
}

