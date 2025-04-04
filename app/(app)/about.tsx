import { View, Text } from "react-native"
import { StatusBar } from "expo-status-bar"

export default function AboutScreen() {
  return (
    <View className="flex-1 bg-black items-center justify-center p-4">
      <StatusBar style="light" />
      <Text className="text-white text-3xl font-bold mb-4">About Us</Text>
      <Text className="text-gray-400 text-lg">Information about our company will appear here</Text>
    </View>
  )
}

