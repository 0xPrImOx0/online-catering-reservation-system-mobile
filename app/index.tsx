"use client"

import { Redirect } from "expo-router"
import { useEffect, useState } from "react"
import { View, ActivityIndicator } from "react-native"

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    // This is where you would check your authentication state
    // For example, check AsyncStorage for a token

    // For demo purposes, we'll just set it to false after a delay
    const checkAuth = setTimeout(() => {
      setIsAuthenticated(false)
    }, 500)

    return () => clearTimeout(checkAuth)
  }, [])

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  // Redirect based on authentication state
  return isAuthenticated ? <Redirect href="/(app)" /> : <Redirect href="/(auth)/splash" />
}

