import { useState } from "react"
import { View, ScrollView, Image, TouchableOpacity } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Text } from "~/components/ui/text"
import { useColorScheme } from "~/lib/useColorScheme"
import { Calendar, Clock, Edit, LogOut, MapPin, Phone, Mail, User, Shield, Bell, CreditCard } from "lucide-react-native"
import CustomButton from "components/CustomButton"

export default function ProfilePage() {
  const { isDarkColorScheme } = useColorScheme()
  const [activeTab, setActiveTab] = useState("bookings")

  // Mock user data
  const user = {
    name: "Rey Daug",
    email: "m@example.com",
    phone: "(555) 123-4567",
    avatar: "https://placeholder.com/100x100?text=RD",
    address: "123 Main St, Anytown, AT 12345",
    memberSince: "January 2023",
  }

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
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "bookings":
        return (
          <View className="p-4">
            <Text className="text-foreground text-lg font-bold mb-4">Your Bookings</Text>

            {bookings.map((booking) => (
              <View key={booking.id} className="mb-4 border border-border rounded-lg overflow-hidden bg-card">
                <View className="flex-row justify-between items-start p-4 pb-0">
                  <View>
                    <Text className="text-foreground text-base font-bold">{booking.eventType}</Text>
                    <Text className="text-muted-foreground text-xs">Booking #{booking.id}</Text>
                  </View>
                  <View
                    className={`px-2 py-1 rounded ${
                      booking.status === "upcoming" ? "bg-primary" : "bg-transparent border border-border"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        booking.status === "upcoming" ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {booking.status === "upcoming" ? "Upcoming" : "Completed"}
                    </Text>
                  </View>
                </View>

                <View className="p-4">
                  <View className="flex-row items-center mb-2">
                    <Calendar size={16} color={isDarkColorScheme ? "#999" : "#666"} className="mr-2" />
                    <Text className="text-foreground text-sm">{booking.date}</Text>
                  </View>
                  <View className="flex-row items-center mb-2">
                    <Clock size={16} color={isDarkColorScheme ? "#999" : "#666"} className="mr-2" />
                    <Text className="text-foreground text-sm">{booking.time}</Text>
                  </View>
                  <View className="flex-row items-center mb-2">
                    <MapPin size={16} color={isDarkColorScheme ? "#999" : "#666"} className="mr-2" />
                    <Text className="text-foreground text-sm">{booking.location}</Text>
                  </View>

                  <View className="h-px bg-border my-2" />

                  <View className="flex-row justify-between mb-1">
                    <Text className="text-foreground text-sm">Package:</Text>
                    <Text className="text-foreground text-sm">{booking.package}</Text>
                  </View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-foreground text-sm">Guests:</Text>
                    <Text className="text-foreground text-sm">{booking.guests}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-foreground text-sm">Total:</Text>
                    <Text className="text-foreground text-sm font-bold">{booking.total}</Text>
                  </View>
                </View>

                <TouchableOpacity className="border-t border-border p-3 items-center">
                  <Text className="text-foreground text-sm">
                    {booking.status === "upcoming" ? "Modify Booking" : "View Details"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )

      case "account":
        return (
          <View className="p-4">
            <Text className="text-foreground text-lg font-bold mb-4">Account Information</Text>

            <View className="border border-border rounded-lg p-4 mb-4 bg-card">
              <View className="mb-4">
                <Text className="text-muted-foreground text-xs mb-1">Full Name</Text>
                <Text className="text-foreground text-base">{user.name}</Text>
              </View>

              <View className="mb-4">
                <Text className="text-muted-foreground text-xs mb-1">Email Address</Text>
                <View className="flex-row items-center">
                  <Mail size={16} color={isDarkColorScheme ? "#999" : "#666"} className="mr-2" />
                  <Text className="text-foreground text-base">{user.email}</Text>
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-muted-foreground text-xs mb-1">Phone Number</Text>
                <View className="flex-row items-center">
                  <Phone size={16} color={isDarkColorScheme ? "#999" : "#666"} className="mr-2" />
                  <Text className="text-foreground text-base">{user.phone}</Text>
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-muted-foreground text-xs mb-1">Address</Text>
                <View className="flex-row items-center">
                  <MapPin size={16} color={isDarkColorScheme ? "#999" : "#666"} className="mr-2" />
                  <Text className="text-foreground text-base">{user.address}</Text>
                </View>
              </View>

              <CustomButton
                label="Edit Information"
                onPress={() => {}}
                buttonStyles="border border-border py-3 rounded mt-2"
                textStyle="text-foreground text-sm text-center"
              />
            </View>

            <View className="border border-border rounded-lg p-4 bg-card">
              <Text className="text-foreground text-base font-bold mb-4">Payment Methods</Text>
              <View className="flex-row justify-between items-center p-3 border border-border rounded-lg mb-3">
                <View className="flex-row items-center">
                  <CreditCard size={20} color={isDarkColorScheme ? "#999" : "#666"} className="mr-3" />
                  <View>
                    <Text className="text-foreground text-sm">•••• •••• •••• 4242</Text>
                    <Text className="text-muted-foreground text-xs">Expires 12/25</Text>
                  </View>
                </View>
                <View className="bg-muted px-2 py-1 rounded">
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
        )

      case "settings":
        return (
          <View className="p-4">
            <Text className="text-foreground text-lg font-bold mb-4">Settings</Text>

            <View className="border border-border rounded-lg p-4 mb-4 bg-card">
              <Text className="text-foreground text-base font-bold mb-4">Notifications</Text>
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <Bell size={20} color={isDarkColorScheme ? "#999" : "#666"} className="mr-3" />
                  <Text className="text-foreground text-sm">Email Notifications</Text>
                </View>
                <View className="w-10 h-6 bg-primary rounded-full relative">
                  <View className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5" />
                </View>
              </View>

              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <Bell size={20} color={isDarkColorScheme ? "#999" : "#666"} className="mr-3" />
                  <Text className="text-foreground text-sm">SMS Notifications</Text>
                </View>
                <View className="w-10 h-6 bg-muted rounded-full relative">
                  <View className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5" />
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Bell size={20} color={isDarkColorScheme ? "#999" : "#666"} className="mr-3" />
                  <Text className="text-foreground text-sm">Promotional Emails</Text>
                </View>
                <View className="w-10 h-6 bg-muted rounded-full relative">
                  <View className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5" />
                </View>
              </View>
            </View>

            <View className="border border-border rounded-lg p-4 mb-4 bg-card">
              <Text className="text-foreground text-base font-bold mb-4">Security</Text>
              <TouchableOpacity className="flex-row items-center justify-center border border-border rounded p-3 mb-3">
                <Shield size={16} color={isDarkColorScheme ? "#fff" : "#333"} className="mr-2" />
                <Text className="text-foreground text-sm">Change Password</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-center border border-border rounded p-3">
                <User size={16} color={isDarkColorScheme ? "#fff" : "#333"} className="mr-2" />
                <Text className="text-foreground text-sm">Two-Factor Authentication</Text>
              </TouchableOpacity>
            </View>

            <View className="border border-border rounded-lg p-4 mb-6 bg-card">
              <Text className="text-destructive text-base font-bold mb-4">Danger Zone</Text>
              <TouchableOpacity className="flex-row items-center justify-center bg-destructive rounded p-3 mb-3">
                <LogOut size={16} color="#fff" className="mr-2" />
                <Text className="text-white text-sm font-medium">Sign Out</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center p-3">
                <Text className="text-destructive text-sm">Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        )

      default:
        return null
    }
  }

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      {/* Profile Header */}
      <View className="p-4 bg-muted">
        <View className="flex-row items-center">
          <Image source={{ uri: user.avatar }} className="w-20 h-20 rounded-full" />
          <View className="ml-4 flex-1">
            <Text className="text-foreground text-xl font-bold">{user.name}</Text>
            <Text className="text-muted-foreground text-sm">Member since {user.memberSince}</Text>
            <TouchableOpacity className="flex-row items-center mt-2 border border-border rounded px-3 py-1.5 self-start">
              <Edit size={16} color={isDarkColorScheme ? "#fff" : "#333"} className="mr-1" />
              <Text className="text-foreground text-sm">Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-border">
        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === "bookings" ? "border-b-2 border-primary" : ""}`}
          onPress={() => setActiveTab("bookings")}
        >
          <Text
            className={`text-base ${activeTab === "bookings" ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            Bookings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === "account" ? "border-b-2 border-primary" : ""}`}
          onPress={() => setActiveTab("account")}
        >
          <Text
            className={`text-base ${activeTab === "account" ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === "settings" ? "border-b-2 border-primary" : ""}`}
          onPress={() => setActiveTab("settings")}
        >
          <Text
            className={`text-base ${activeTab === "settings" ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView>{renderTabContent()}</ScrollView>
    </View>
  )
}