import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ReservationValues } from "~/hooks/use-reservation-form";
import { Controller, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import { SelectLabel } from "../ui/select";

export default function DeliveryOption({ control }: { control: any }) {
  const { watch, setValue } = useFormContext<ReservationValues>();
  const deliveryFee = watch("deliveryFee");

  const handleDeliveryOption = () => {
    setValue("deliveryFee", 300);
  };
  const handlePickupOption = () => {
    setValue("deliveryFee", deliveryFee - 300);
  };
  return (
    <Controller
      control={control}
      name="deliveryOption"
      render={({ field }) => (
        <View className="gap-2">
          <Text className="text-foreground">
            Delivery Option <Text className="text-destructive">*</Text>{" "}
          </Text>
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex-row pt-2"
          >
            <View className="flex-row items-center flex-1 gap-3 space-x-2">
              <RadioGroupItem
                value="Pickup"
                id="pickup"
                onPress={handlePickupOption}
              />
              <Label htmlFor="pickup">Pickup</Label>
            </View>
            <View className="flex-row items-center flex-1 gap-3 space-x-2">
              <RadioGroupItem
                value="Delivery"
                id="delivery"
                onPress={handleDeliveryOption}
              />
              <Label htmlFor="delivery">Delivery</Label>
            </View>
          </RadioGroup>
        </View>
      )}
    />
  );
}
