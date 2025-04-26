import { Button } from "~/components/ui/button";
import clsx from "clsx";
import { Info, X } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function DeliveryWarning({
  isDelivery,
}: {
  isDelivery: boolean;
}) {
  const [closeWarning, setCloseWarning] = useState(false);

  if (!closeWarning) {
    return (
      <View
        className={clsx(
          "my-4 p-4 bg-yellow-50 border-2 border-amber-400 rounded-lg flex items-start gap-3 relative",
          {
            hidden: closeWarning || !isDelivery,
          }
        )}
      >
        <Button
          className="absolute right-4 top-4 text-muted-foreground"
          variant={"ghost"}
          size={"custom"}
          onPress={() => setCloseWarning((prev) => !prev)}
        >
          <X className="min-w-5 min-h-5" />
        </Button>
        <Info className="relative w-20 text-yellow-500 sm:w-14 md:w-10 lg:w-6" />
        <View className="space-y-2">
          <Text className="font-medium">Delivery Option</Text>
          <Text className="text-sm text-foreground dark:text-muted-foreground text-justify max-w-[1000px]">
            An additional delivery service fee of &#8369;300 is included in this
            option.
          </Text>
        </View>
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => setCloseWarning((prev) => !prev)}
      className="flex-row items-center w-full gap-2 my-4 "
    >
      <Info className="" color={"white"} size={18} />
      <Text className="text-foreground">See Delivery Warning</Text>
    </TouchableOpacity>
  );
}
