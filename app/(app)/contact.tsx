import { useState } from "react"
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Text } from "~/components/ui/text"
import { useColorScheme } from "~/lib/useColorScheme"
import { MapPin, Phone, Mail, Clock } from "lucide-react-native"
import CustomButton from "components/CustomButton"

export default function ContactUsPage() {
  const { isDarkColorScheme } = useColorScheme()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [inquiryType, setInquiryType] = useState("")
  const [message, setMessage] = useState("")
  const [showInquiryTypes, setShowInquiryTypes] = useState(false)

  const inquiryTypes = [
    "General Inquiry",
    "Event Booking",
    "Menu Questions",
    "Pricing Information",
    "Feedback",
    "Other",
  ]

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      
      <ScrollView className="flex-1">
        {/* Contact Form */}
        <View className="p-4">
          <Text className="text-foreground text-2xl font-bold mb-2">Get in Touch</Text>
          <Text className="text-muted-foreground text-base mb-6">
            Have questions or ready to plan your event? We're here to help!
          </Text>

          <View className="bg-card border border-border rounded-lg p-4 mb-6">
            <View className="mb-4">
              <Text className="text-foreground text-base font-medium mb-1.5">Full Name</Text>
              <TextInput
                className="border border-border rounded-md p-3 text-base text-foreground bg-background"
                placeholder="Enter your name"
                placeholderTextColor={isDarkColorScheme ? "#777" : "#999"}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View className="mb-4">
              <Text className="text-foreground text-base font-medium mb-1.5">Email Address</Text>
              <TextInput
                className="border border-border rounded-md p-3 text-base text-foreground bg-background"
                placeholder="Enter your email"
                placeholderTextColor={isDarkColorScheme ? "#777" : "#999"}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View className="mb-4">
              <Text className="text-foreground text-base font-medium mb-1.5">Phone Number</Text>
              <TextInput
                className="border border-border rounded-md p-3 text-base text-foreground bg-background"
                placeholder="Enter your phone number"
                placeholderTextColor={isDarkColorScheme ? "#777" : "#999"}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View className="mb-4">
              <Text className="text-foreground text-base font-medium mb-1.5">Type of Inquiry</Text>
              <TouchableOpacity
                className="border border-border rounded-md p-3 bg-background"
                onPress={() => setShowInquiryTypes(!showInquiryTypes)}
              >
                <Text className={`text-base ${!inquiryType ? "text-muted-foreground" : "text-foreground"}`}>
                  {inquiryType || "Select inquiry type"}
                </Text>
              </TouchableOpacity>

              {showInquiryTypes && (
                <View className="border border-border rounded-md mt-1 bg-card">
                  {inquiryTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      className="p-3 border-b border-border"
                      onPress={() => {
                        setInquiryType(type)
                        setShowInquiryTypes(false)
                      }}
                    >
                      <Text className="text-base text-foreground">{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-foreground text-base font-medium mb-1.5">Message</Text>
              <TextInput
                className="border border-border rounded-md p-3 text-base text-foreground h-24 bg-background"
                placeholder="Tell us about your event or inquiry"
                placeholderTextColor={isDarkColorScheme ? "#777" : "#999"}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <CustomButton
              label="Submit"
              onPress={() => {}}
              buttonStyles="bg-primary py-4 rounded-md"
              textStyle="text-primary-foreground text-base font-medium text-center"
            />
          </View>
        </View>

        {/* Quick Contact Cards */}
        <View className="px-4 mb-2">
          <Text className="text-foreground text-xl font-bold mb-4">Contact Information</Text>

          <View className="flex-row items-center bg-card border border-border rounded-lg p-4 mb-4">
            <View className="w-12 h-12 rounded-full bg-muted justify-center items-center mr-4">
              <Phone size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
            </View>
            <View>
              <Text className="text-foreground text-base font-medium">Phone</Text>
              <Text className="text-muted-foreground text-sm">(555) 123-4567</Text>
            </View>
          </View>

          <View className="flex-row items-center bg-card border border-border rounded-lg p-4 mb-4">
            <View className="w-12 h-12 rounded-full bg-muted justify-center items-center mr-4">
              <Mail size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
            </View>
            <View>
              <Text className="text-foreground text-base font-medium">Email</Text>
              <Text className="text-muted-foreground text-sm">info@foodsentinel.com</Text>
            </View>
          </View>

          <View className="flex-row items-center bg-card border border-border rounded-lg p-4 mb-4">
            <View className="w-12 h-12 rounded-full bg-muted justify-center items-center mr-4">
              <MapPin size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
            </View>
            <View>
              <Text className="text-foreground text-base font-medium">Address</Text>
              <Text className="text-muted-foreground text-sm">123 Catering Street, Foodville, FC 12345</Text>
            </View>
          </View>

          <View className="flex-row items-center bg-card border border-border rounded-lg p-4 mb-4">
            <View className="w-12 h-12 rounded-full bg-muted justify-center items-center mr-4">
              <Clock size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
            </View>
            <View>
              <Text className="text-foreground text-base font-medium">Business Hours</Text>
              <Text className="text-muted-foreground text-sm">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</Text>
            </View>
          </View>
        </View>

        {/* FAQ Section */}
        <View className="px-4 pb-8">
          <Text className="text-foreground text-xl font-bold mb-4">Frequently Asked Questions</Text>

          <View className="bg-card border border-border rounded-lg p-4 mb-3">
            <Text className="text-foreground text-base font-medium mb-2">How far in advance should I book?</Text>
            <Text className="text-muted-foreground text-sm leading-5">
              We recommend booking at least 4-6 weeks in advance for most events, and 2-3 months for large events like
              weddings.
            </Text>
          </View>

          <View className="bg-card border border-border rounded-lg p-4 mb-3">
            <Text className="text-foreground text-base font-medium mb-2">Do you accommodate dietary restrictions?</Text>
            <Text className="text-muted-foreground text-sm leading-5">
              Yes, we can accommodate various dietary needs including vegetarian, vegan, gluten-free, and allergies.
              Please inform us when booking.
            </Text>
          </View>

          <View className="bg-card border border-border rounded-lg p-4">
            <Text className="text-foreground text-base font-medium mb-2">What is your cancellation policy?</Text>
            <Text className="text-muted-foreground text-sm leading-5">
              Cancellations made 14+ days before the event receive a full refund. Cancellations 7-13 days before receive a
              50% refund. Less than 7 days, no refund is provided.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
