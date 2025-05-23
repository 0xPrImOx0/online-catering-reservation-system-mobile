import { View, Text } from "react-native";
import React from "react";
import { Fold } from "react-native-animated-spinkit";

export default function Loading({ message }: { message: string }) {
  return (
    <View className="absolute top-0 right-0 bottom-0 left-0 flex-1 bg-background">
      <View className="flex-1 gap-6 justify-center items-center">
        <Fold size={60} color="#FFF" />
        <Text className="text-foreground">{message}</Text>
      </View>
    </View>
  );
}
