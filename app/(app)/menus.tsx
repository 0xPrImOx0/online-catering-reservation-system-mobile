import { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { Search, Filter, Star } from "lucide-react-native";
import CustomButton from "components/CustomButton";
import { categories, menuItems } from "~/lib/menu-lists";

export default function MenusPage() {
  const { isDarkColorScheme } = useColorScheme();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      {/* Search and Filter */}
      <View className="flex-row items-center p-4 ">
        <View className="flex-row items-center flex-1 px-3 py-2 mr-2 rounded-lg bg-muted">
          <Search
            size={16}
            color={isDarkColorScheme ? "#999" : "#666"}
            className="mr-2"
          />
          <TextInput
            className="flex-1 text-base text-foreground"
            placeholder="Search menus..."
            placeholderTextColor={isDarkColorScheme ? "#777" : "#999"}
          />
        </View>
        <TouchableOpacity
          className="items-center justify-center w-10 h-10 border rounded-lg border-border"
          onPress={() => setFilterModalVisible(true)}
        >
          <Filter size={20} color={isDarkColorScheme ? "#fff" : "#333"} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        className=" max-h-12"
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`px-4 py-2 mr-2 rounded-full border h-10 ${
              selectedCategory === item
                ? "bg-primary border-primary"
                : "bg-card border-border"
            }`}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              className={`text-sm ${
                selectedCategory === item
                  ? "text-primary-foreground"
                  : "text-foreground"
              }`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />

      {/* Menu Items */}
      <ScrollView className="flex-1 p-4">
        {menuItems.map((item) => (
          <View
            key={item._id}
            className="flex-row mb-4 overflow-hidden border rounded-lg border-border"
          >
            <Image source={{ uri: item.imageUrl }} className="w-24 h-24" />
            <View className="flex-1 p-3">
              <View className="flex-row items-start justify-between">
                <View>
                  <Text className="text-base font-bold text-foreground">
                    {item.name}
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    {item.category}
                  </Text>
                </View>
                <Text className="text-base font-bold text-foreground">
                  ₱{item.prices[0].price.toFixed(2)}
                </Text>
              </View>
              <Text
                className="mt-1 text-xs text-muted-foreground"
                numberOfLines={2}
              >
                {item.shortDescription}
              </Text>
              <View className="flex-row items-center justify-between mt-2">
                <View className="flex-row items-center">
                  <Star size={12} color="#F59E0B" />
                  <Text className="ml-1 text-xs">
                    {item.rating} ({item.ratingCount})
                  </Text>
                </View>
                <TouchableOpacity className="bg-primary px-3 py-1.5 rounded">
                  <Text className="text-xs font-medium text-primary-foreground">
                    Add
                  </Text>
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
        <View className="justify-end flex-1 bg-black/50">
          <View className="bg-background rounded-t-3xl h-[70%]">
            <View className="flex-row items-center justify-between p-4 border-b border-border">
              <Text className="text-lg font-bold text-foreground">
                Filter Menu
              </Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Text className="text-xl text-muted-foreground">✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              <Text className="mb-2 text-base font-medium text-foreground">
                Dietary Preferences
              </Text>
              {[
                "Vegetarian",
                "Vegan",
                "Gluten-Free",
                "Dairy-Free",
                "Nut-Free",
              ].map((item) => (
                <View key={item} className="flex-row items-center mb-2">
                  <View className="w-5 h-5 mr-2 border rounded border-border" />
                  <Text className="text-sm text-foreground">{item}</Text>
                </View>
              ))}

              <Text className="mt-4 mb-2 text-base font-medium text-foreground">
                Price Range
              </Text>
              {["Under $10", "$10 - $20", "$20 - $30", "Over $30"].map(
                (item) => (
                  <View key={item} className="flex-row items-center mb-2">
                    <View className="w-5 h-5 mr-2 border rounded border-border" />
                    <Text className="text-sm text-foreground">{item}</Text>
                  </View>
                )
              )}

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
  );
}
