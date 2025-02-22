import { View, Text } from "react-native";
import React from "react";
import Container from "@/components/Container";
import "../global.css";

const index = () => {
  return (
    <Container scroll={false}>
      <Text className="text-green-500 text-2xl font-black self-center ">
        index
      </Text>
      <Text className={`text-3xl self-center text-[#00f] align-center`}>
        HELLO WORLD
      </Text>
    </Container>
  );
};

export default index;
