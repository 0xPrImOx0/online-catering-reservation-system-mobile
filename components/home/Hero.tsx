import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Hero() {
  return (
    <View className="relative w-full h-80 mb-8 rounded-lg">
      <Image
        source={require("../../assets/images/hero.jpg")}
        className="w-full h-80 rounded-lg"
        resizeMode="cover"
      />
    </View>
  );
}