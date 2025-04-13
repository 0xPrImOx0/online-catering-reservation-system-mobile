import { View, ScrollView, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Text } from "~/components/ui/text"
import { useColorScheme } from "~/lib/useColorScheme"
import { Award, Clock, MapPin, Phone, Mail, Star, Users } from "lucide-react-native"

export default function AboutUsPage() {
  const { isDarkColorScheme } = useColorScheme()
  
  const team = [
    {
      name: "Maria Rodriguez",
      role: "Executive Chef",
      image: "https://placeholder.com/150x150?text=Chef",
      bio: "With over 15 years of culinary experience, Maria brings creativity and excellence to every dish.",
    },
    {
      name: "David Chen",
      role: "Catering Manager",
      image: "https://placeholder.com/150x150?text=Manager",
      bio: "David ensures every event runs smoothly, with meticulous attention to detail and client satisfaction.",
    },
    {
      name: "Sarah Johnson",
      role: "Event Coordinator",
      image: "https://placeholder.com/150x150?text=Coordinator",
      bio: "Sarah's passion for creating memorable experiences makes her an invaluable part of our team.",
    },
  ]

  const testimonials = [
    {
      name: "Jennifer & Michael",
      event: "Wedding Reception",
      image: "https://placeholder.com/60x60?text=J%26M",
      quote: "The food was absolutely amazing and the service was impeccable. Our guests are still talking about it!",
    },
    {
      name: "TechCorp Inc.",
      event: "Annual Conference",
      image: "https://placeholder.com/60x60?text=TC",
      quote:
        "Professional, punctual, and the quality exceeded our expectations. Will definitely use their services again.",
    },
  ]

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      
      <ScrollView>
        {/* Hero Section */}
        <View className="relative h-50">
          <Image source={{ uri: "https://placeholder.com/800x400?text=Our+Story" }} className="h-full w-full" />
          <View className="absolute inset-0 bg-black/40 justify-center items-center">
            <Text className="text-white text-2xl font-bold">Our Story</Text>
          </View>
        </View>

        {/* About Us Content */}
        <View className="p-4">
          <Text className="text-foreground text-base leading-6 mb-6">
            Founded in 2010, Food Sentinel has been providing exceptional catering services for all types of events. Our
            passion for food and dedication to customer satisfaction has made us one of the leading catering companies in
            the region.
          </Text>

          <View className="flex-row flex-wrap justify-between mb-6">
            <View className="w-[48%] bg-muted border border-border rounded-lg p-4 items-center mb-4">
              <Award size={32} color={isDarkColorScheme ? "#fff" : "#333"} className="mb-2" />
              <Text className="text-foreground text-sm font-medium text-center">Quality Ingredients</Text>
            </View>
            <View className="w-[48%] bg-muted border border-border rounded-lg p-4 items-center mb-4">
              <Users size={32} color={isDarkColorScheme ? "#fff" : "#333"} className="mb-2" />
              <Text className="text-foreground text-sm font-medium text-center">Professional Staff</Text>
            </View>
            <View className="w-[48%] bg-muted border border-border rounded-lg p-4 items-center">
              <Star size={32} color={isDarkColorScheme ? "#fff" : "#333"} className="mb-2" />
              <Text className="text-foreground text-sm font-medium text-center">5-Star Service</Text>
            </View>
            <View className="w-[48%] bg-muted border border-border rounded-lg p-4 items-center">
              <Clock size={32} color={isDarkColorScheme ? "#fff" : "#333"} className="mb-2" />
              <Text className="text-foreground text-sm font-medium text-center">Timely Delivery</Text>
            </View>
          </View>
        </View>

        {/* Our Team */}
        <View className="px-4 mb-6">
          <Text className="text-foreground text-xl font-bold mb-4">Meet Our Team</Text>
          {team.map((member, index) => (
            <View key={index} className="mb-4">
              <Image source={{ uri: member.image }} className="w-20 h-20 rounded-full self-center mb-3" />
              <View>
                <Text className="text-foreground text-lg font-bold text-center">{member.name}</Text>
                <Text className="text-foreground text-sm text-center mb-1">{member.role}</Text>
                <Text className="text-muted-foreground text-sm text-center leading-5">{member.bio}</Text>
              </View>
              {index < team.length - 1 && <View className="h-px bg-border my-4" />}
            </View>
          ))}
        </View>

        {/* Testimonials */}
        <View className="bg-muted px-4 py-6">
          <Text className="text-foreground text-xl font-bold mb-4">What Our Clients Say</Text>
          {testimonials.map((testimonial, index) => (
            <View key={index} className="bg-card border border-border rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Image source={{ uri: testimonial.image }} className="w-12 h-12 rounded-full mr-3" />
                <View>
                  <Text className="text-foreground text-base font-medium">{testimonial.name}</Text>
                  <Text className="text-muted-foreground text-xs">{testimonial.event}</Text>
                </View>
              </View>
              <Text className="text-foreground text-sm italic mb-2">"{testimonial.quote}"</Text>
              <View className="flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} color="#F59E0B" fill="#F59E0B" className="mr-1" />
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Contact Information */}
        <View className="p-4 pb-8">
          <Text className="text-foreground text-xl font-bold mb-4">Find Us</Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <View className="flex-row items-center mb-3">
              <MapPin size={20} color={isDarkColorScheme ? "#fff" : "#333"} className="mr-3" />
              <Text className="text-foreground text-sm">123 Catering Street, Foodville, FC 12345</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <Phone size={20} color={isDarkColorScheme ? "#fff" : "#333"} className="mr-3" />
              <Text className="text-foreground text-sm">(555) 123-4567</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <Mail size={20} color={isDarkColorScheme ? "#fff" : "#333"} className="mr-3" />
              <Text className="text-foreground text-sm">info@foodsentinel.com</Text>
            </View>
            <View className="flex-row items-center">
              <Clock size={20} color={isDarkColorScheme ? "#fff" : "#333"} className="mr-3" />
              <Text className="text-foreground text-sm">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
