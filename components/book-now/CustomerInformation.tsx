import { View, Text } from "react-native";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function CustomerInformation() {
  return (
    <View className="gap-4 bg-black">
      <View className="gap-2">
        <Label className="">
          Full Name <Text className="text-destructive">*</Text>
        </Label>
        <Input placeholder="Enter your full name" />
      </View>
      <View className="gap-2">
        <Label className="">
          <Text>
            Email <Text className="text-destructive">*</Text>
          </Text>
        </Label>
        <Input placeholder="johndoe@example.com" />
      </View>
      <View className="gap-2">
        <Label className="">
          Contact Number <Text className="text-destructive">*</Text>{" "}
        </Label>
        <Input placeholder="Enter your contact number" />
      </View>
    </View>
  );
}
