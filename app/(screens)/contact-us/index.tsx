import { useState } from "react";
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { MapPin, Phone, Mail, Clock } from "lucide-react-native";
import CustomButton from "components/CustomButton";

export default function ContactUs() {
  const { isDarkColorScheme } = useColorScheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [showInquiryTypes, setShowInquiryTypes] = useState(false);

  const inquiryTypes = [
    "General Inquiry",
    "Event Booking",
    "Menu Questions",
    "Pricing Information",
    "Feedback",
    "Other",
  ];

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      <ScrollView className="flex-1">
        {/* Contact Form */}
        <View className="p-4">
          <Text className="mb-2 text-2xl font-bold text-foreground">
            Get in Touch
          </Text>
          <Text className="mb-6 text-base text-muted-foreground">
            Have questions or ready to plan your event? We're here to help!
          </Text>

          <View className="p-4 mb-6 border rounded-lg bg-card border-border">
            <View className="mb-4">
              <Text className="text-foreground text-base font-medium mb-1.5">
                Full Name
              </Text>
              <TextInput
                className="p-3 text-base border rounded-md border-border text-foreground bg-background"
                placeholder="Enter your name"
                placeholderTextColor={isDarkColorScheme ? "#777" : "#999"}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View className="mb-4">
              <Text className="text-foreground text-base font-medium mb-1.5">
                Email Address
              </Text>
              <TextInput
                className="p-3 text-base border rounded-md border-border text-foreground bg-background"
                placeholder="Enter your email"
                placeholderTextColor={isDarkColorScheme ? "#777" : "#999"}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View className="mb-4">
              <Text className="text-foreground text-base font-medium mb-1.5">
                Phone Number
              </Text>
              <TextInput
                className="p-3 text-base border rounded-md border-border text-foreground bg-background"
                placeholder="Enter your phone number"
                placeholderTextColor={isDarkColorScheme ? "#777" : "#999"}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View className="mb-4">
              <Text className="text-foreground text-base font-medium mb-1.5">
                Type of Inquiry
              </Text>
              <TouchableOpacity
                className="p-3 border rounded-md border-border bg-background"
                onPress={() => setShowInquiryTypes(!showInquiryTypes)}
              >
                <Text
                  className={`text-base ${
                    !inquiryType ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {inquiryType || "Select inquiry type"}
                </Text>
              </TouchableOpacity>

              {showInquiryTypes && (
                <View className="mt-1 border rounded-md border-border bg-card">
                  {inquiryTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      className="p-3 border-b border-border"
                      onPress={() => {
                        setInquiryType(type);
                        setShowInquiryTypes(false);
                      }}
                    >
                      <Text className="text-base text-foreground">{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-foreground text-base font-medium mb-1.5">
                Message
              </Text>
              <TextInput
                className="h-24 p-3 text-base border rounded-md border-border text-foreground bg-background"
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
          <Text className="mb-4 text-xl font-bold text-foreground">
            Contact Information
          </Text>

          <View className="flex-row items-center p-4 mb-4 border rounded-lg bg-card border-border">
            <View className="items-center justify-center w-12 h-12 mr-4 rounded-full bg-muted">
              <Phone size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
            </View>
            <View>
              <Text className="text-base font-medium text-foreground">
                Phone
              </Text>
              <Text className="text-sm text-muted-foreground">
                (555) 123-4567
              </Text>
            </View>
          </View>

          <View className="flex-row items-center p-4 mb-4 border rounded-lg bg-card border-border">
            <View className="items-center justify-center w-12 h-12 mr-4 rounded-full bg-muted">
              <Mail size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
            </View>
            <View>
              <Text className="text-base font-medium text-foreground">
                Email
              </Text>
              <Text className="text-sm text-muted-foreground">
                info@foodsentinel.com
              </Text>
            </View>
          </View>

          <View className="flex-row items-center p-4 mb-4 border rounded-lg bg-card border-border">
            <View className="items-center justify-center w-12 h-12 mr-4 rounded-full bg-muted">
              <MapPin size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
            </View>
            <View>
              <Text className="text-base font-medium text-foreground">
                Address
              </Text>
              <Text className="text-sm text-muted-foreground">
                123 Catering Street, Foodville, FC 12345
              </Text>
            </View>
          </View>

          <View className="flex-row items-center p-4 mb-4 border rounded-lg bg-card border-border">
            <View className="items-center justify-center w-12 h-12 mr-4 rounded-full bg-muted">
              <Clock size={24} color={isDarkColorScheme ? "#fff" : "#333"} />
            </View>
            <View>
              <Text className="text-base font-medium text-foreground">
                Business Hours
              </Text>
              <Text className="text-sm text-muted-foreground">
                Mon-Fri: 9AM-6PM, Sat: 10AM-4PM
              </Text>
            </View>
          </View>
        </View>

        {/* FAQ Section */}
        <View className="px-4 pb-8">
          <Text className="mb-4 text-xl font-bold text-foreground">
            Frequently Asked Questions
          </Text>

          <View className="p-4 mb-3 border rounded-lg bg-card border-border">
            <Text className="mb-2 text-base font-medium text-foreground">
              How far in advance should I book?
            </Text>
            <Text className="text-sm leading-5 text-muted-foreground">
              We recommend booking at least 4-6 weeks in advance for most
              events, and 2-3 months for large events like weddings.
            </Text>
          </View>

          <View className="p-4 mb-3 border rounded-lg bg-card border-border">
            <Text className="mb-2 text-base font-medium text-foreground">
              Do you accommodate dietary restrictions?
            </Text>
            <Text className="text-sm leading-5 text-muted-foreground">
              Yes, we can accommodate various dietary needs including
              vegetarian, vegan, gluten-free, and allergies. Please inform us
              when booking.
            </Text>
          </View>

          <View className="p-4 border rounded-lg bg-card border-border">
            <Text className="mb-2 text-base font-medium text-foreground">
              What is your cancellation policy?
            </Text>
            <Text className="text-sm leading-5 text-muted-foreground">
              Cancellations made 14+ days before the event receive a full
              refund. Cancellations 7-13 days before receive a 50% refund. Less
              than 7 days, no refund is provided.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
