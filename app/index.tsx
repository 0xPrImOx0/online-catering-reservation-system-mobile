import { View, Text } from "react-native";
import React from "react";
import Container from "@/components/Container";
import "../global.css";

const index = () => {
  return (
    <Container scroll={false}>
      <Text className="text-blue-500 text-4xl self-center border border-green-400">
        Hello World
      </Text>
      <Text className="text-blue-500 text-xl self-center border border-red-900">
        Hello Worldsdasdsadasdawdadadwdaw
      </Text>
    </Container>
  );
};

export default index;
