import { useColorScheme as useNativewindColorScheme } from "nativewind"
import { useEffect } from "react"

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme()

  // Set default theme to dark on first load
  useEffect(() => {
    if (colorScheme !== "dark") {
      setColorScheme("dark")
    }
  }, [])

  return {
    colorScheme: colorScheme ?? "dark",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  }
}

