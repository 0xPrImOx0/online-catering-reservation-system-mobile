import { View, Platform, TouchableOpacity, Modal } from "react-native";
import { router, Tabs } from "expo-router";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Image } from "react-native";
import {
  Home,
  Package,
  Calendar,
  Soup,
  User,
  Phone,
  Ellipsis,
  HelpCircle,
  LogOut,
} from "lucide-react-native";
import { useState } from "react";
import { Separator } from "~/components/ui/separator";
import AdditionalSettingsButtons from "~/components/AdditionalSettingsButtons";
import { useColorScheme } from "~/lib/useColorScheme";

export default function AppLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: isDarkColorScheme ? "black" : "white",
            borderTopColor: isDarkColorScheme ? "#333" : "#eee",
            height: Platform.OS === "ios" ? 85 : 60,
            paddingBottom: Platform.OS === "ios" ? 20 : 10,
            paddingTop: 10,
          },
          tabBarActiveTintColor: isDarkColorScheme ? "white" : "black",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
          headerStyle: {
            backgroundColor: isDarkColorScheme ? "#000" : "white",
            borderBottomWidth: Platform.OS === "android" && 1,
            borderBottomColor: isDarkColorScheme ? "#333" : "#eee",
            height: 120,
          },
          headerTintColor: isDarkColorScheme ? "white" : "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              className="ml-4"
            >
              <Avatar className="w-10 h-10" alt={"Profile Picture"}>
                <Image
                  source={{
                    uri: "https://github.com/shadcn.png",
                  }}
                  className="w-full h-full rounded-full"
                  alt="User Avatar"
                />
                <AvatarFallback>
                  <Text>RD</Text>
                </AvatarFallback>
              </Avatar>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View className="flex-row gap-2 items-center mr-4">
              <TouchableOpacity className="justify-center items-center w-10 h-10 bg-gray-700 rounded-full">
                <Calendar
                  size={20}
                  color={isDarkColorScheme ? "white" : "black"}
                  onPress={() => {
                    router.push(`/book-now/0`);
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowInfoModal(true)}
                className="justify-center items-center w-10 h-10 bg-gray-700 rounded-full"
              >
                <Ellipsis
                  size={20}
                  color={isDarkColorScheme ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Home size={size} color={color} />
            ),
            headerTitle: () => (
              <View className="flex-row items-center">
                <Text className="text-xl font-bold text-foreground">
                  Food Sentinel
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="menus"
          options={{
            title: "Menus",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Soup size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="packages"
          options={{
            title: "Packages",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Package size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <User size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showInfoModal}
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-background rounded-t-3xl h-[35%]">
            <View className="flex-row justify-between items-center p-4">
              <Text className="text-lg font-bold text-foreground">
                Additional Settings
              </Text>
              <TouchableOpacity onPress={() => setShowInfoModal(false)}>
                <Text className="text-xl text-muted-foreground">✕</Text>
              </TouchableOpacity>
            </View>
            <Separator />
            <View className="flex-1 gap-2">
              <AdditionalSettingsButtons
                link={"/contact-us"}
                icon={Phone}
                title="Contact Us"
                setShowInfoModal={setShowInfoModal}
              />
              <AdditionalSettingsButtons
                link={"/about-us"}
                icon={HelpCircle}
                title="About Food Sentinel"
                setShowInfoModal={setShowInfoModal}
              />
              <AdditionalSettingsButtons
                link={"/signIn"}
                icon={User}
                title="Sign In"
                setShowInfoModal={setShowInfoModal}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
