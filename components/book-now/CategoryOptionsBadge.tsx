import { CheckCircle } from "lucide-react-native";
import clsx from "clsx";
import { Badge } from "~/components/ui/badge";
import { SelectedMenus } from "~/types/reservation-types";
import { FlatList, Text, View } from "react-native";

export default function CategoryOptionsBadge({
  categoryAndCount,
  selectedMenus,
}: {
  categoryAndCount: { category: string; count: number }[];
  selectedMenus: SelectedMenus;
}) {
  return (
    <FlatList
      data={categoryAndCount}
      numColumns={3}
      scrollEnabled={false}
      keyExtractor={(item) => item.category}
      contentContainerClassName="gap-3"
      columnWrapperClassName="gap-3"
      renderItem={({ item: { category, count } }) => {
        let isLimitReached =
          (Object.keys(selectedMenus[category] || {}).length || 0) >= count;
        return (
          <Badge
            variant={"outline"}
            className={clsx(
              "flex-1 max-w-min",
              isLimitReached
                ? "space-x-2 bg-green-500 border-green-500 text-background"
                : "border-green-500"
            )}
          >
            <View className="flex-row gap-2 items-center">
              {isLimitReached && (
                <CheckCircle
                  className="mr-2 w-3 h-3"
                  width={20}
                  height={20}
                  color={"white"}
                />
              )}
              <Text className="min-w-max text-foreground">{`${count} ${category}`}</Text>
            </View>
          </Badge>
        );
      }}
    />
  );
}
