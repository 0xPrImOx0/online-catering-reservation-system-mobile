import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { Input } from "~/components/ui/input";
import { Label } from "../ui/label";

export default function EventDate({ control }: { control: any }) {
  return (
    <Controller
      control={control}
      name="eventDate"
      render={({ field }) => (
        <View>
          <Label className="">
            <Text>
              Date <Text className="text-destructive">*</Text>
            </Text>
          </Label>
          <Input
            {...field}
            value={
              field.value instanceof Date
                ? field.value.toISOString().split("T")[0]
                : field.value || ""
            }
          />
        </View>
      )}
    />
  );
}
