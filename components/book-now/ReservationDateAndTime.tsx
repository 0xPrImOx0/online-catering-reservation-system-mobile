import { Controller } from "react-hook-form";
import { Platform, Text, View } from "react-native";
import { Input } from "~/components/ui/input";
import { Label } from "../ui/label";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import { useState } from "react";

export default function ReservationDateAndTime({ control }: { control: any }) {
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (date: Date | undefined) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }); // Outputs "April 25, 2025"
  };
  return (
    <Controller
      control={control}
      name="eventDate"
      render={({ field }) => (
        <View className="gap-2 w-full">
          <Label className="">
            <Text>
              Date <Text className="text-destructive">*</Text>
            </Text>
          </Label>
          <View className="flex-row justify-between items-center pr-2 rounded-md border border-border">
            <Input
              {...field}
              value={formatDate(field.value)}
              editable={false}
              className="border-0"
              placeholderClassName="text-foreground"
            />
            <Calendar
              color={"white"}
              onPress={() => setShowCalendar((prev) => !prev)}
            />
          </View>
          <View className="items-center">
            {showCalendar && (
              <DateTimePicker
                value={
                  field.value instanceof Date && !isNaN(field.value.getTime())
                    ? field.value
                    : new Date()
                }
                display={Platform.OS === "ios" ? "inline" : "calendar"} // Better UI for calendar
                onChange={(event, selectedDate) => {
                  // Only update if a date is selected (not canceled)
                  if (selectedDate) {
                    field.onChange(selectedDate);
                  }
                }}
              />
            )}
          </View>
        </View>
      )}
    />
  );
}
