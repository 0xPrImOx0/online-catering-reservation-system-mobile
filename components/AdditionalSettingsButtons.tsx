import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { LucideIcon } from "lucide-react-native";
import { Separator } from "./ui/separator";

interface AdditionalSettingsButtonsProps {
  link: any;
  icon: LucideIcon;
  title: string;
  setShowInfoModal: (e: boolean) => void;
}

export default function AdditionalSettingsButtons({
  link,
  icon: Icon,
  title,
  setShowInfoModal,
}: AdditionalSettingsButtonsProps) {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          router.push(link);
          setShowInfoModal(false);
        }}
        className="flex-row w-full gap-4 p-4 rounded-lg"
      >
        <Icon color="white" size={24} />
        <Text className="text-lg font-bold text-foreground">{title}</Text>
      </TouchableOpacity>
      <Separator />
    </>
  );
}
