import { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import CustomButton from "components/CustomButton";
import { categories, menuItems } from "~/lib/menu-lists";
import MenuCard from "~/components/menus/MenuCard";
import { Separator } from "~/components/ui/separator";
import CategoryPill from "~/components/menus/CategoryPill";
import MenuSearchBar from "~/components/menus/MenuSearchBar";

export default function MenusPage() {
  const { isDarkColorScheme } = useColorScheme();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredMenuItems = menuItems.filter((item) => {
    const isInCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const isInSearch = item.name.toLowerCase().includes(query.toLowerCase());
    return isInCategory && isInSearch;
  });

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      {/* Search and Filter */}
      <MenuSearchBar
        setFilterModalVisible={setFilterModalVisible}
        query={query}
        setQuery={setQuery}
      />
      {/* Categories */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 py-3 mb-3 max-h-14"
        contentContainerStyle={{ alignItems: "center", gap: 10 }}
        renderItem={({ item }) => (
          <CategoryPill
            item={item}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        keyExtractor={(item) => item}
      />
      <Separator className="mb-4 " />
      {/* Menu Items */}
      {filteredMenuItems.length > 0 ? (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16 }}
          data={filteredMenuItems}
          keyExtractor={(item) => item._id}
          renderItem={(item) => <MenuCard item={item.item} />}
        />
      ) : (
        <View className="items-center my-auto">
          <Image
            source={require("../../assets/catering-logo.png")}
            className="w-60 h-60 mb-4"
          />
          <Text className="text-2xl font-medium text-center text-white">
            No Menu Found
          </Text>
        </View>
      )}
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
