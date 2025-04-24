import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { eventTypes } from "~/types/package-types";
import { Label } from "../ui/label";
export default function EventType({ control }: { control: any }) {
  return (
    <Controller
      control={control}
      name="eventType"
      render={({ field }) => (
        <View>
          <Label className="">
            <Text>
              Event Type <Text className="text-destructive">*</Text>{" "}
            </Text>
          </Label>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Enter your event type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((event) => (
                <SelectItem key={event} value={event} label={event}>
                  {event}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </View>
      )}
    />
  );
}
