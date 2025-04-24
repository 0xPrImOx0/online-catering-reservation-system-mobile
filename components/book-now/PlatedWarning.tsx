import clsx from "clsx";
import { Info, X } from "lucide-react-native";
import { useState } from "react";
import { Button } from "../ui/button";
import { Text, View } from "react-native";

export default function PlatedWarning({ isPlated }: { isPlated: boolean }) {
  const [closePlatedWarning, setClosePlatedWarning] = useState(false);

  return (
    <View
      className={clsx(
        "mb-4 p-4 bg-yellow-50 border-2 border-amber-400 rounded-lg flex items-start gap-3 relative",
        {
          hidden: closePlatedWarning || !isPlated,
        }
      )}
    >
      <Button
        className="absolute right-4 top-4 text-muted-foreground"
        variant={"ghost"}
        size={"custom"}
        onPress={() => setClosePlatedWarning((prev) => !prev)}
      >
        <X className="min-w-5 min-h-5" />
      </Button>
      <Info className="relative w-20 text-yellow-500 sm:w-14 md:w-10 lg:w-6" />
      <View className="space-y-2">
        <Text className="font-medium dark:text-background">
          Plated Course Service
        </Text>
        <Text className="text-sm text-foreground dark:text-background text-justify max-w-[1000px]">
          Our plated course packages include professional waitstaff who will
          serve each course directly to your guests&apos; tables. An additional
          service fee of &#8369;100 per hour is included in the price per
          person.
        </Text>
      </View>
    </View>
  );
}
