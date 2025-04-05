"use client"

import { View, Switch } from "react-native"
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar"
import { useColorScheme } from "~/lib/useColorScheme"

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme()

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? "light" : "dark"
    setColorScheme(newTheme)
    setAndroidNavigationBar(newTheme)
  }

  return (
    <View className="bg-muted rounded-full p-1">
      <Switch
        value={isDarkColorScheme}
        onValueChange={() => toggleColorScheme()}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkColorScheme ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  )
}

