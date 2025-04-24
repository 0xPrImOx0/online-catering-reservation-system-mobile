import { Controller } from "react-hook-form";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "../ui/label";
export default function DeliveryDetails({ control }: { control: any }) {
  return (
    <View className="mt-4 space-y-4">
      <Controller
        control={control}
        name="deliveryAddress"
        render={({ field }) => (
          <View>
            <Label className="">Delivery Address</Label>
            <Input placeholder="Enter your delivery address" {...field} />
          </View>
        )}
      />
      <Controller
        control={control}
        name="deliveryInstructions"
        render={({ field }) => (
          <View>
            <Label className="">Special Delivery Instructions</Label>
            <Textarea
              placeholder="Provide any special instructions for the delivery team (e.g., landmarks, preferred time, etc.)"
              {...field}
            />
          </View>
        )}
      />
    </View>
  );
}
