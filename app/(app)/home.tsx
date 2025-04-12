import { View, Image, ScrollView } from "react-native"
import { StatusBar } from "expo-status-bar"
import CustomButton from "components/CustomButton"
import { Text } from "~/components/ui/text"
import { useColorScheme } from "~/lib/useColorScheme"

export default function home() {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      <ScrollView className="px-4 pt-2 pb-20">
        {/* Hero section with main heading and CTA */}
        <View className="mb-8 mt-4">
          <Text className="text-foreground text-5xl font-bold leading-tight mb-4">
            Experience the very best catering for your special events
          </Text>
          <Text className="text-muted-foreground text-xl mb-6">
            Gourmet ingredients made by professional chefs, delivered with care to your venue.
          </Text>
          <CustomButton
            label="Book now"
            onPress={() => {}}
            buttonStyles="bg-primary py-4 px-6 rounded-full self-start"
            textStyle="text-primary-foreground text-lg font-bold"
            icon={require("../../assets/images/calendar.png")}
            iconStyle="w-6 h-6 mr-2"
          />
        </View>

        {/* Featured image */}
        <View className="rounded-3xl overflow-hidden mb-8">
          <Image source={require("../../assets/catering-logo.png")} className="w-full h-56" resizeMode="cover" />
        </View>

        {/* About section */}
        <View className="mb-12">
          <Text className="text-foreground text-4xl font-bold mb-4">About our catering service</Text>
          <Text className="text-muted-foreground text-lg">
            We provide premium catering services for all types of events, from intimate gatherings to large corporate
            functions. Our team of professional chefs uses only the finest ingredients to create memorable dining
            experiences tailored to your preferences and dietary requirements.
          </Text>
        </View>
        <CustomButton onPress={() => {}} buttonStyles="bg-primary py-4 px-6 rounded-full self-start mb-8">
          <Text className="text-primary-foreground text-lg font-bold">Learn more</Text>
        </CustomButton>
      </ScrollView>
    </View>
  )
}
