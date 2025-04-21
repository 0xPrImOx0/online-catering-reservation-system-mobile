import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Hero() {
  return (
    <View className="relative w-full h-56 mb-8">
      <Image
        source={require("../../assets/catering-logo.png")}
        className="w-full h-full"
        resizeMode="cover"
      />
      <View className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-black/40">
        <Text className="text-2xl font-bold text-white">
          Delicious Catering
        </Text>
        <Text className="text-base text-white">For Every Special Occasion</Text>
      </View>
    </View>
  );
}