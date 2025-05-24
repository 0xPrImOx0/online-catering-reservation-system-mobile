import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { LucideIcon } from "lucide-react-native";
import { Separator } from "./ui/separator";
import { useAuthContext } from "~/context/AuthContext";

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
  const { logout } = useAuthContext();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          router.push(link);
          setShowInfoModal(false);
          title === "Sign Out" && logout();
        }}
        className="flex-row gap-4 p-4 w-full rounded-lg"
      >
        <Icon color="white" size={24} />
        <Text className="text-lg font-bold text-foreground">{title}</Text>
      </TouchableOpacity>
      <Separator />
    </>
  );
}
