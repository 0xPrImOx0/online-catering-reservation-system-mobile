import { View, TouchableOpacity, TextInput } from "react-native";
import { Search, Filter } from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function MenuSearchBar({
  setFilterModalVisible,
  query,
  setQuery,
}: {
  setFilterModalVisible: (e: boolean) => void;
  query: string;
  setQuery: (e: string) => void;
}) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center px-4 pt-4 pb-2">
      <View className="flex-row items-center flex-1 px-3 py-2 mr-2 rounded-lg bg-muted">
        <Search
          size={16}
          color={isDarkColorScheme ? "#999" : "#666"}
          className="mr-2"
        />
        <TextInput
          className="flex-1 text-base text-foreground"
          placeholder="Search menus..."
          value={query}
          onChangeText={setQuery}
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
  );
}
