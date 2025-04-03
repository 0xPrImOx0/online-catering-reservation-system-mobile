import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { StatusBar } from "expo-status-bar"
import CustomButton from "../../components/CustomButton"

export default function home() {
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <ScrollView className="px-4 pt-2 pb-20">
        {/* Header with logo and profile */}
        <View className="flex-row justify-between items-center mb-8">
          <View className="flex-row items-center">
            <Image source={require("../../assets/images/logo.png")} className="w-16 h-16" resizeMode="contain" />
            <Text className="text-white text-2xl font-bold ml-2">Food Sentinel</Text>
          </View>
          <TouchableOpacity className="rounded-full overflow-hidden" onPress={() => {}}>
            <Image source={require("../../assets/images/Profile-Pic.png")} className="w-12 h-12" />
          </TouchableOpacity>
        </View>

        {/* Hero section with main heading and CTA */}
        <View className="mb-8">
          <Text className="text-white text-5xl font-bold leading-tight mb-4">
            Experience the very best catering for your special events
          </Text>
          <Text className="text-gray-400 text-xl mb-6">
            Gourmet ingredients made by professional chefs, delivered with care to your venue.
          </Text>
          <CustomButton
            label="Book now"
            onPress={() => {}}
            buttonStyles="bg-white py-4 px-6 rounded-full self-start"
            textStyle="text-black text-lg font-bold"
            icon={require("../../assets/images/calendar.png")}
            iconStyle="w-6 h-6 mr-2"
          />
        </View>

        {/* Featured image */}
        <View className="rounded-3xl overflow-hidden mb-8">
          <Image source={require("../../assets/images/catering.jpg")} className="w-full h-56" resizeMode="cover" />
        </View>

        {/* About section */}
        <View className="mb-12">
          <Text className="text-white text-4xl font-bold mb-4">About our catering service</Text>
          <Text className="text-gray-400 text-lg">
            We provide premium catering services for all types of events, from intimate gatherings to large corporate
            functions. Our team of professional chefs uses only the finest ingredients to create memorable dining
            experiences tailored to your preferences and dietary requirements.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

