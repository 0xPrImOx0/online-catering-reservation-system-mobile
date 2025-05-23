import clsx from "clsx";
import { Info, X } from "lucide-react-native";
import { useState } from "react";
import { Button } from "../ui/button";
import { Text, TouchableOpacity, View } from "react-native";

export default function PlatedWarning() {
  const [closePlatedWarning, setClosePlatedWarning] = useState(false);

  if (!closePlatedWarning) {
    return (
      <View
        className={clsx(
          "mb-4 p-4 bg-yellow-50 border-2 border-amber-400 rounded-lg flex items-start gap-3 relative",
          // {
          //   hidden: closePlatedWarning || !isPlated,
          // }
        )}
      >
        <Button
          className="absolute top-4 right-4 text-muted-foreground"
          variant={"ghost"}
          size={"custom"}
          onPress={() => setClosePlatedWarning((prev) => !prev)}
        >
          <X className="min-w-5 min-h-5" />
        </Button>
        <View className="flex-row gap-3 items-center">
          <Info className="relative w-20" color={"black"} />
          <Text className="font-medium dark:text-background">
            Plated Course Service
          </Text>
        </View>
        <Text className="text-sm text-foreground dark:text-muted-foreground text-justify max-w-[1000px]">
          Our plated course packages include professional waitstaff who will
          serve each course directly to your guests&apos; tables. An additional
          service fee of &#8369;100 per hour is included in the price per
          person.
        </Text>
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => setClosePlatedWarning((prev) => !prev)}
      className="flex-row gap-2 items-center mb-4 w-full"
    >
      <Info className="" color={"white"} size={18} />
      <Text className="text-foreground">See Plated Service Warning</Text>
    </TouchableOpacity>
  );
}
