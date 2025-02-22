import { View, Text } from "react-native";
import React from "react";
import Container from "@/components/Container";
import "../global.css";

const index = () => {
  return (
    <Container scroll={false}>
      <Text className="text-red-500 text-[300px] self-center">Hello World</Text>
    </Container>
  );
};

export default index;
