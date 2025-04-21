import { useState } from "react"
import { View, ScrollView, TouchableOpacity, Image, TextInput, Modal } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Text } from "~/components/ui/text"
import { useColorScheme } from "~/lib/useColorScheme"
import { Search, Filter, Star } from "lucide-react-native"
import CustomButton from "components/CustomButton"

export default function MenusPage() {
  const { isDarkColorScheme } = useColorScheme()
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Appetizers", "Main Course", "Desserts", "Beverages", "Vegan", "Vegetarian"]

  const menuItems = [
    {
      id: 1,
      name: "Bruschetta",
      category: "Appetizers",
      price: 12.99,
      rating: 4.8,
      reviews: 56,
      image: "https://placeholder.com/150x150?text=Bruschetta",
      description: "Toasted bread topped with tomatoes, fresh basil, and garlic",
      dietary: ["Vegetarian"],
    },
    {
      id: 2,
      name: "Grilled Salmon",
      category: "Main Course",
      price: 24.99,
      rating: 4.9,
      reviews: 87,
      image: "https://placeholder.com/150x150?text=Salmon",
      description: "Fresh salmon fillet grilled to perfection with herbs",
      dietary: [],
    },
    {
      id: 3,
      name: "Chocolate Mousse",
      category: "Desserts",
      price: 8.99,
      rating: 4.7,
      reviews: 42,
      image: "https://placeholder.com/150x150?text=Mousse",
      description: "Rich and creamy chocolate mousse with whipped cream",
      dietary: ["Vegetarian"],
    },
    {
      id: 4,
      name: "Mushroom Risotto",
      category: "Main Course",
      price: 18.99,
      rating: 4.6,
      reviews: 38,
      image: "https://placeholder.com/150x150?text=Risotto",
      description: "Creamy arborio rice with wild mushrooms and parmesan",
      dietary: ["Vegetarian"],
    },
    {
      id: 5,
      name: "Fresh Fruit Tart",
      category: "Desserts",
      price: 9.99,
      rating: 4.5,
      reviews: 29,
      image: "https://placeholder.com/150x150?text=Fruit+Tart",
      description: "Buttery pastry shell filled with custard and topped with fresh seasonal fruits",
      dietary: ["Vegetarian"],
    },
  ]

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      {/* Search and Filter */}
      <View className="flex-row items-center p-4 border-b border-border">
        <View className="flex-1 flex-row items-center bg-muted rounded-lg px-3 py-2 mr-2">
          <Search size={16} color={isDarkColorScheme ? "#999" : "#666"} className="mr-2" />
          <TextInput
            className="flex-1 text-base text-foreground"
            placeholder="Search menus..."
            placeholderTextColor={isDarkColorScheme ? "#777" : "#999"}
          />
        </View>
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center border border-border rounded-lg"
          onPress={() => setFilterModalVisible(true)}
        >
          <Filter size={20} color={isDarkColorScheme ? "#fff" : "#333"} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-3 border-b border-border mb-2"
        contentContainerClassName="px-4"
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            className={`justify-center items-center h-10 px-4 mr-2 border ${
              selectedCategory === category
                ? "bg-primary border-primary"
                : "bg-card border-foreground"
            } rounded-full`}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              className={`text-sm text-center ${
                selectedCategory === category ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Menu Items */}
      <ScrollView className="flex-1 px-4">
        {menuItems.map((item) => (
          <View key={item.id} className="flex-row mb-4 border border-border rounded-lg overflow-hidden">
            <Image source={{ uri: item.image }} className="w-24 h-24" />
            <View className="flex-1 p-3">
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="font-bold text-base text-foreground">{item.name}</Text>
                  <Text className="text-xs text-muted-foreground">{item.category}</Text>
                </View>
                <Text className="font-bold text-base text-foreground">${item.price.toFixed(2)}</Text>
              </View>
              <Text className="text-xs text-muted-foreground mt-1" numberOfLines={2}>
                {item.description}
              </Text>
              <View className="flex-row justify-between items-center mt-2">
                <View className="flex-row items-center">
                  <Star size={12} color="#F59E0B" />
                  <Text className="text-xs ml-1">
                    {item.rating} ({item.reviews})
                  </Text>
                </View>
                <TouchableOpacity className="bg-primary px-3 py-1.5 rounded">
                  <Text className="text-xs font-medium text-primary-foreground">Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-background rounded-t-3xl h-[70%]">
            <View className="flex-row justify-between items-center p-4 border-b border-border">
              <Text className="text-lg font-bold text-foreground">Filter Menu</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Text className="text-xl text-muted-foreground">✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              <Text className="text-base font-medium text-foreground mb-2">Dietary Preferences</Text>
              {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free"].map((item) => (
                <View key={item} className="flex-row items-center mb-2">
                  <View className="w-5 h-5 border border-border rounded mr-2" />
                  <Text className="text-sm text-foreground">{item}</Text>
                </View>
              ))}

              <Text className="text-base font-medium text-foreground mb-2 mt-4">Price Range</Text>
              {["Under $10", "$10 - $20", "$20 - $30", "Over $30"].map((item) => (
                <View key={item} className="flex-row items-center mb-2">
                  <View className="w-5 h-5 border border-border rounded mr-2" />
                  <Text className="text-sm text-foreground">{item}</Text>
                </View>
              ))}

              <CustomButton
                label="Apply Filters"
                onPress={() => setFilterModalVisible(false)}
                buttonStyles="bg-primary py-3 rounded-lg mt-6"
                textStyle="text-primary-foreground text-base font-medium text-center w-full"
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}
