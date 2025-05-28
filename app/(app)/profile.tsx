import { View, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import {
  LogOut,
  Phone,
  Mail,
  User,
} from "lucide-react-native";
import { useAuthContext } from "~/context/AuthContext";
import { formatDate } from "date-fns";
import { Button } from "~/components/ui/button";
import { router } from "expo-router";

export default function Profile() {
  const { isDarkColorScheme } = useColorScheme();
  const { customer, logout } = useAuthContext();

  if (!customer) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Image
          source={require("../../assets/catering-logo.png")}
          className="w-[150px] h-[150px]"
          resizeMode="contain"
        />
        <Text className="text-xl text-foreground">Sign In First</Text>
        <Button
          className="mt-4"
          onPress={() => {
            router.push("/signIn");
          }}
        >
          <View className="flex-row items-center">
            <User className="mr-2" color={"black"} />
            <Text className="text-center">Sign In</Text>
          </View>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      {/* Profile Header */}
      <View className="p-4 bg-muted">
        <View className="flex-row items-center">
          <Image
            source={{ uri: "https://github.com/shadcn.png" }}
            className="w-20 h-20 rounded-full"
          />
          <View className="flex-1 ml-4">
            <Text className="text-xl font-bold text-foreground">
              {customer!.fullName}
            </Text>
            <Text className="text-sm text-muted-foreground">
              Member since {formatDate(customer.createdAt, "PP")}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View className="p-4">
          <Text className="mb-4 text-lg font-bold text-foreground">
            Account Information
          </Text>

          <View className="p-4 rounded-lg border border-border bg-card">
            <View className="mb-4">
              <Text className="mb-1 text-xs text-muted-foreground">
                Full Name
              </Text>
              <Text className="text-base text-foreground">
                {customer?.fullName}
              </Text>
            </View>

            <View className="mb-4">
              <Text className="mb-1 text-xs text-muted-foreground">
                Email Address
              </Text>
              <View className="flex-row items-center">
                <Mail
                  size={16}
                  color={isDarkColorScheme ? "#999" : "#666"}
                  className="mr-2"
                />
                <Text className="text-base text-foreground">
                  {customer?.email}
                </Text>
              </View>
            </View>

            <View className="mb-4">
              <Text className="mb-1 text-xs text-muted-foreground">
                Phone Number
              </Text>
              <View className="flex-row items-center">
                <Phone
                  size={16}
                  color={isDarkColorScheme ? "#999" : "#666"}
                  className="mr-2"
                />
                <Text className="text-base text-foreground">
                  {customer?.contactNumber || "Not Provided"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="p-4 pt-0">
          <View className="p-4 mb-6 rounded-lg border border-border bg-card">
            <Text className="mb-4 text-base font-bold">Log out</Text>
            <Button variant={"destructive"} onPress={logout}>
              <View className="flex-row items-center">
                <LogOut size={16} color="#fff" className="mr-2" />
                <Text className="text-sm font-medium text-foreground">
                  Sign Out
                </Text>
              </View>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
