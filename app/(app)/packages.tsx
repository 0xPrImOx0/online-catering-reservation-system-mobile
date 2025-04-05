import { View } from "react-native"
import { Text } from "~/components/ui/text"
import { useColorScheme } from "~/lib/useColorScheme"

export default function PackagesScreen() {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-foreground text-3xl font-bold mb-4">Packages</Text>
        <Text className="text-muted-foreground text-lg">Our catering packages will appear here</Text>
      </View>
    </View>
  )
}

