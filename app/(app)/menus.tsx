import { View, Text } from "react-native"
import { StatusBar } from "expo-status-bar"

export default function MenusScreen() {
  return (
    <View className="flex-1 bg-black items-center justify-center p-4">
      <StatusBar style="light" />
      <Text className="text-white text-3xl font-bold mb-4">Menus</Text>
      <Text className="text-gray-400 text-lg">Our menu options will appear here</Text>
    </View>
  )
}

