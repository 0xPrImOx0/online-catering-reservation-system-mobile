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
  Settings,
  User,
  UserCircle,
  Phone,
  Ellipsis,
  HelpCircle,
} from "lucide-react-native";
import { useState } from "react";
import { Separator } from "~/components/ui/separator";
import AdditionalSettingsButtons from "~/components/AdditionalSettingsButtons";
import { useColorScheme } from "~/libs/useColorScheme";

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
              className="ml-4 "
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
            <View className="flex-row items-center gap-2 mr-4">
              <TouchableOpacity className="items-center justify-center w-10 h-10 bg-gray-700 rounded-full">
                <Calendar
                  size={20}
                  color={isDarkColorScheme ? "white" : "black"}
                  onPress={() => {
                    router.push("/book-now");
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowInfoModal(true)}
                className="items-center justify-center w-10 h-10 bg-gray-700 rounded-full"
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
          name="book-now"
          options={{
            title: "Book Now",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Calendar size={size} color={color} />
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
        <View className="justify-end flex-1 bg-black/50">
          <View className="bg-background rounded-t-3xl h-[35%]">
            <View className="flex-row items-center justify-between p-4">
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
                link={"/profile"}
                icon={UserCircle}
                title="Go to Profile Page"
                setShowInfoModal={setShowInfoModal}
              />
              <AdditionalSettingsButtons
                link={"/about-us"}
                icon={HelpCircle}
                title="About Food Sentinel"
                setShowInfoModal={setShowInfoModal}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
