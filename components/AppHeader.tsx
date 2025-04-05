import { View, TouchableOpacity } from "react-native"
import { useNavigation } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Text } from "~/components/ui/text"
import { useColorScheme } from "~/lib/useColorScheme"

interface AppHeaderProps {
  title: string
}

export function AppHeader({ title }: AppHeaderProps) {
  const navigation = useNavigation()
  const { isDarkColorScheme } = useColorScheme()

  const openDrawer = () => {
    // @ts-ignore - This is a valid method on the drawer navigation
    navigation.openDrawer()
  }

  return (
    <View
      className={`w-full px-4 py-4 flex-row items-center border-b border-border ${
        isDarkColorScheme ? "bg-black/90" : "bg-white/90"
      }`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
      }}
    >
      <TouchableOpacity onPress={openDrawer} className="p-2">
        <Ionicons name="menu" size={24} color={isDarkColorScheme ? "white" : "black"} />
      </TouchableOpacity>
      <Text className="text-foreground text-xl font-bold ml-2">{title}</Text>
    </View>
  )
}

