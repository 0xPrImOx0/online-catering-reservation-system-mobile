import { useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import {
  Calendar,
  Clock,
  Edit,
  LogOut,
  MapPin,
  Phone,
  Mail,
  User,
  Shield,
  Bell,
  CreditCard,
} from "lucide-react-native";
import CustomButton from "components/CustomButton";
import { useAuthContext } from "~/context/AuthContext";
import { formatDate } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Profile() {
  const { isDarkColorScheme } = useColorScheme();
  const [activeTab, setActiveTab] = useState("bookings");
  const { customer } = useAuthContext();

  // Mock user data
  const user = {
    name: "Rey Daug",
    email: "m@example.com",
    phone: "(555) 123-4567",
    avatar: "https://placeholder.com/100x100?text=RD",
    address: "123 Main St, Anytown, AT 12345",
    memberSince: "January 2023",
  };

  // Mock bookings data
  const bookings = [
    {
      id: "B12345",
      eventType: "Wedding Reception",
      date: "June 15, 2023",
      time: "5:00 PM - 11:00 PM",
      guests: 120,
      location: "Grand Ballroom, Hotel Majestic",
      status: "completed",
      package: "Premium Wedding Package",
      total: "$2,499.00",
    },
    {
      id: "B12346",
      eventType: "Corporate Lunch",
      date: "August 10, 2023",
      time: "12:00 PM - 3:00 PM",
      guests: 45,
      location: "Tech Park, Building A",
      status: "completed",
      package: "Corporate Lunch Package",
      total: "$1,125.00",
    },
    {
      id: "B12347",
      eventType: "Birthday Party",
      date: "May 20, 2024",
      time: "6:00 PM - 10:00 PM",
      guests: 30,
      location: "Home Address",
      status: "upcoming",
      package: "Birthday Celebration Package",
      total: "$599.00",
    },
  ];

  if (!customer) {
    return <Text className="text-red-500">Sign In First</Text>;
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <TabsList className="flex-row bg-transparent">
          <TabsTrigger
            value="bookings"
            className="flex-1 justify-between bg-transparent"
          >
            <Text>Bookings</Text>
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="flex-1 justify-between bg-transparent"
          >
            <Text>Account</Text>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex-1 justify-between bg-transparent"
          >
            <Text>Settings</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bookings">
          <ScrollView>
            <View className="p-4">
              <Text className="mb-4 text-lg font-bold text-foreground">
                Your Bookings
              </Text>

              {bookings.map((booking) => (
                <View
                  key={booking.id}
                  className="overflow-hidden mb-4 rounded-lg border border-border bg-card"
                >
                  <View className="flex-row justify-between items-start p-4 pb-0">
                    <View>
                      <Text className="text-base font-bold text-foreground">
                        {booking.eventType}
                      </Text>
                      <Text className="text-xs text-muted-foreground">
                        Booking #{booking.id}
                      </Text>
                    </View>
                    <View
                      className={`px-2 py-1 rounded ${
                        booking.status === "upcoming"
                          ? "bg-primary"
                          : "bg-transparent border border-border"
                      }`}
                    >
                      <Text
                        className={`text-xs font-medium ${
                          booking.status === "upcoming"
                            ? "text-primary-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {booking.status === "upcoming"
                          ? "Upcoming"
                          : "Completed"}
                      </Text>
                    </View>
                  </View>

                  <View className="p-4">
                    <View className="flex-row items-center mb-2">
                      <Calendar
                        size={16}
                        color={isDarkColorScheme ? "#999" : "#666"}
                        className="mr-2"
                      />
                      <Text className="text-sm text-foreground">
                        {booking.date}
                      </Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                      <Clock
                        size={16}
                        color={isDarkColorScheme ? "#999" : "#666"}
                        className="mr-2"
                      />
                      <Text className="text-sm text-foreground">
                        {booking.time}
                      </Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                      <MapPin
                        size={16}
                        color={isDarkColorScheme ? "#999" : "#666"}
                        className="mr-2"
                      />
                      <Text className="text-sm text-foreground">
                        {booking.location}
                      </Text>
                    </View>

                    <View className="my-2 h-px bg-border" />

                    <View className="flex-row justify-between mb-1">
                      <Text className="text-sm text-foreground">Package:</Text>
                      <Text className="text-sm text-foreground">
                        {booking.package}
                      </Text>
                    </View>
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-sm text-foreground">Guests:</Text>
                      <Text className="text-sm text-foreground">
                        {booking.guests}
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-foreground">Total:</Text>
                      <Text className="text-sm font-bold text-foreground">
                        {booking.total}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity className="items-center p-3 border-t border-border">
                    <Text className="text-sm text-foreground">
                      {booking.status === "upcoming"
                        ? "Modify Booking"
                        : "View Details"}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </TabsContent>
        <TabsContent value="account">
          <View className="p-4">
            <Text className="mb-4 text-lg font-bold text-foreground">
              Account Information
            </Text>

            <View className="p-4 mb-4 rounded-lg border border-border bg-card">
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
                    {customer?.contactNumber}
                  </Text>
                </View>
              </View>

              <View className="mb-4">
                <Text className="mb-1 text-xs text-muted-foreground">
                  Address
                </Text>
              </View>

              <CustomButton
                label="Edit Information"
                onPress={() => {}}
                buttonStyles="border border-border py-3 rounded mt-2"
                textStyle="text-foreground text-sm text-center"
              />
            </View>

            <View className="p-4 rounded-lg border border-border bg-card">
              <Text className="mb-4 text-base font-bold text-foreground">
                Payment Methods
              </Text>
              <View className="flex-row justify-between items-center p-3 mb-3 rounded-lg border border-border">
                <View className="flex-row items-center">
                  <CreditCard
                    size={20}
                    color={isDarkColorScheme ? "#999" : "#666"}
                    className="mr-3"
                  />
                  <View>
                    <Text className="text-sm text-foreground">
                      •••• •••• •••• 4242
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      Expires 12/25
                    </Text>
                  </View>
                </View>
                <View className="px-2 py-1 rounded bg-muted">
                  <Text className="text-xs">Default</Text>
                </View>
              </View>
              <CustomButton
                label="Add Payment Method"
                onPress={() => {}}
                buttonStyles="border border-border py-3 rounded"
                textStyle="text-foreground text-sm text-center"
              />
            </View>
          </View>
        </TabsContent>
        <TabsContent value="settings">
          <View className="p-4">
            <Text className="mb-4 text-lg font-bold text-foreground">
              Settings
            </Text>

            <View className="p-4 mb-4 rounded-lg border border-border bg-card">
              <Text className="mb-4 text-base font-bold text-foreground">
                Notifications
              </Text>
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <Bell
                    size={20}
                    color={isDarkColorScheme ? "#999" : "#666"}
                    className="mr-3"
                  />
                  <Text className="text-sm text-foreground">
                    Email Notifications
                  </Text>
                </View>
                <View className="relative w-10 h-6 rounded-full bg-primary">
                  <View className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5" />
                </View>
              </View>

              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <Bell
                    size={20}
                    color={isDarkColorScheme ? "#999" : "#666"}
                    className="mr-3"
                  />
                  <Text className="text-sm text-foreground">
                    SMS Notifications
                  </Text>
                </View>
                <View className="relative w-10 h-6 rounded-full bg-muted">
                  <View className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5" />
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Bell
                    size={20}
                    color={isDarkColorScheme ? "#999" : "#666"}
                    className="mr-3"
                  />
                  <Text className="text-sm text-foreground">
                    Promotional Emails
                  </Text>
                </View>
                <View className="relative w-10 h-6 rounded-full bg-muted">
                  <View className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5" />
                </View>
              </View>
            </View>

            <View className="p-4 mb-4 rounded-lg border border-border bg-card">
              <Text className="mb-4 text-base font-bold text-foreground">
                Security
              </Text>
              <TouchableOpacity className="flex-row justify-center items-center p-3 mb-3 rounded border border-border">
                <Shield
                  size={16}
                  color={isDarkColorScheme ? "#fff" : "#333"}
                  className="mr-2"
                />
                <Text className="text-sm text-foreground">Change Password</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row justify-center items-center p-3 rounded border border-border">
                <User
                  size={16}
                  color={isDarkColorScheme ? "#fff" : "#333"}
                  className="mr-2"
                />
                <Text className="text-sm text-foreground">
                  Two-Factor Authentication
                </Text>
              </TouchableOpacity>
            </View>

            <View className="p-4 mb-6 rounded-lg border border-border bg-card">
              <Text className="mb-4 text-base font-bold text-destructive">
                Danger Zone
              </Text>
              <TouchableOpacity className="flex-row justify-center items-center p-3 mb-3 rounded bg-destructive">
                <LogOut size={16} color="#fff" className="mr-2" />
                <Text className="text-sm font-medium text-foreground">
                  Sign Out
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center p-3">
                <Text className="text-sm text-destructive">Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TabsContent>
      </Tabs>

      {/* Tab Content */}
    </View>
  );
}
