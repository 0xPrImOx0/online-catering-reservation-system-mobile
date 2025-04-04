import { View, Text } from "react-native";
import React from "react";
import Container from "@/components/Container";
import "../global.css";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const index = () => {
  return (
    <Container scroll={false}>
      <Text className="text-red-500 text-[50px] self-center">Hello World</Text>
      <CustomButton
        label="Get Started"
        textStyle="font-medium text-base text-[#000] w-full"
        onPress={() => router.push("/(auth)/signIn")}
      />
    </Container>
  );
};

export default index;
