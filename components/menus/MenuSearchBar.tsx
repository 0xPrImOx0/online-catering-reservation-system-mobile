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
      <View className="flex-row items-center justify-center flex-1 gap-2 px-3 mr-2 rounded-lg bg-muted">
        <Search
          size={20}
          color={isDarkColorScheme ? "#999" : "#666"}
          className="flex-1"
        />
        <TextInput
          className="flex-1 py-4 text-foreground"
          placeholder="Search menus..."
          value={query}
          onChangeText={setQuery}
          placeholderTextColor={isDarkColorScheme ? "#777" : "#999"}
        />
      </View>
      <TouchableOpacity
        className="items-center justify-center p-4 border rounded-lg border-border"
        onPress={() => setFilterModalVisible(true)}
      >
        <Filter size={16} color={isDarkColorScheme ? "#fff" : "#333"} />
      </TouchableOpacity>
    </View>
  );
}
