import React, { useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  // Effect to navigate to sign up screen after a delay
  useEffect(() => {
    // Set a timeout to navigate to the sign up screen after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/(auth)/signUp');
    }, 2000);

    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-black justify-center items-center">
      <StatusBar style="light" />
      
      {/* Logo image */}
      <Image 
        source={require('../../assets/catering-logo.png')} 
        className="w-40 h-40"
        resizeMode="contain"
      />
      
      {/* App name */}
      <Text className="text-white text-3xl font-bold mt-4 mb-8">
        Food Sentinel
      </Text>
      
      {/* Loading indicator */}
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}