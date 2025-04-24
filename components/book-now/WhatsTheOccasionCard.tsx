import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Text } from "react-native";

export default function WhatsTheOccasionCard({ control }: { control: any }) {
  const reservations = [
    {
      id: "event",
      title: "Event",
      subtitle:
        "Plan a memorable birthday, wedding, corporate party, or graduation.",
    },
    {
      id: "personal",
      title: "Personal Gathering",
      subtitle:
        "Order for yourself or a loved one. Perfect for anniversaries, holidays, or just because.",
    },
  ];
  return (
    <Controller
      control={control}
      name="reservationType"
      render={({ field }) => (
        <View className="col-span-2">
          <Label>
            What's the Occasion? <Text className="text-destructive">*</Text>{" "}
          </Label>
          <View className="flex gap-4 space-x-0 space-y-0 max-sm:flex-col">
            {reservations.map((reservation) => (
              <Button
                asChild
                key={reservation.title}
                className="flex-1"
                onPress={() => field.onChange(reservation.id)}
              >
                <Card
                  className={clsx(
                    "flex flex-col items-start cursor-pointer justify-start p-3 transition-all hover:bg-gray-100 hover:border-green-500",
                    {
                      "border border-green-500 bg-green-50":
                        field.value === reservation.id,
                    }
                  )}
                >
                  <CardHeader className="p-0">
                    <CardTitle className="font-semibold">
                      {reservation.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {reservation.subtitle}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Button>
            ))}
          </View>
        </View>
      )}
    />
  );
}
