import { View} from "react-native"
import { StatusBar } from "expo-status-bar"
import { Text } from "~/components/ui/text"

export default function PackagesScreen() {
  return (
    <View className="flex-1 bg-black items-center justify-center p-4">
      <StatusBar style="light" />
      <Text className="text-white text-3xl font-bold mb-4">Packages</Text>
      <Text className="text-gray-400 text-lg">Our catering packages will appear here</Text>
    </View>
  )
}

