import { View, Image, ScrollView } from "react-native"
import { Text } from "~/components/ui/text"
import { useColorScheme } from "~/lib/useColorScheme"
import { Button } from "~/components/ui/button"
import { Ionicons } from "@expo/vector-icons"

export default function profile() {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="items-center pt-8 pb-6">
          <View className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary mb-4">
            <Image source={require("../../assets/daug-avatar.jpg")} className="w-full h-full" resizeMode="cover" />
          </View>
          <Text className="text-foreground text-2xl font-bold">John Doe</Text>
          <Text className="text-muted-foreground">john.doe@example.com</Text>

          <View className="flex-row mt-4 space-x-2">
            <Button variant="outline" className="flex-row items-center px-4">
              <Ionicons
                name="pencil-outline"
                size={16}
                color={isDarkColorScheme ? "white" : "black"}
                className="mr-2"
              />
              <Text className="text-foreground">Edit Profile</Text>
            </Button>
            <Button variant="outline" className="flex-row items-center px-4">
              <Ionicons
                name="settings-outline"
                size={16}
                color={isDarkColorScheme ? "white" : "black"}
                className="mr-2"
              />
              <Text className="text-foreground">Settings</Text>
            </Button>
          </View>
        </View>

        <View className="px-4 py-6 border-t border-border">
          <Text className="text-foreground text-xl font-bold mb-4">Account Information</Text>

          <View className="space-y-4">
            <ProfileItem icon="person-outline" label="Full Name" value="John Doe" />
            <ProfileItem icon="mail-outline" label="Email" value="john.doe@example.com" />
            <ProfileItem icon="call-outline" label="Phone" value="+1 (555) 123-4567" />
            <ProfileItem icon="location-outline" label="Address" value="123 Main St, Anytown, USA" />
          </View>
        </View>

        <View className="px-4 py-6 border-t border-border">
          <Text className="text-foreground text-xl font-bold mb-4">Recent Orders</Text>

          <View className="space-y-4">
            <OrderItem id="ORD-12345" date="Apr 10, 2023" status="Completed" amount="$245.00" />
            <OrderItem id="ORD-12344" date="Mar 25, 2023" status="Completed" amount="$189.50" />
            <OrderItem id="ORD-12343" date="Feb 18, 2023" status="Completed" amount="$320.75" />
          </View>

          <Button variant="outline" className="mt-4 w-full">
            <Text className="text-foreground">View All Orders</Text>
          </Button>
        </View>

        <View className="px-4 py-6 border-t border-border mb-20">
          <Button variant="destructive" className="w-full">
            <Text className="text-destructive-foreground">Sign Out</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}

function ProfileItem({ icon, label, value }: { icon: any; label: string; value: string }) {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View className="flex-row items-center">
      <View className="w-10 h-10 rounded-full bg-muted items-center justify-center mr-3">
        <Ionicons name={icon} size={20} color={isDarkColorScheme ? "white" : "black"} />
      </View>
      <View className="flex-1">
        <Text className="text-muted-foreground text-sm">{label}</Text>
        <Text className="text-foreground">{value}</Text>
      </View>
    </View>
  )
}

function OrderItem({ id, date, status, amount }: { id: string; date: string; status: string; amount: string }) {
  return (
    <View className="p-4 border border-border rounded-lg">
      <View className="flex-row justify-between mb-2">
        <Text className="text-foreground font-bold">{id}</Text>
        <Text className="text-primary">{amount}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-muted-foreground">{date}</Text>
        <Text className="text-green-500">{status}</Text>
      </View>
    </View>
  )
}
