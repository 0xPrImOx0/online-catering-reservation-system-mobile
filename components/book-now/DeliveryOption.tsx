import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ReservationValues } from "~/hooks/use-reservation-form";
import { Controller, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import { SelectLabel } from "../ui/select";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

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
      name="orderType"
      render={({ field }) => (
        <View className="gap-2">
          <Text className="text-foreground">
            Delivery Option <Text className="text-destructive">*</Text>{" "}
          </Text>
          <View className="flex gap-4 pt-2">
            <Button
              asChild
              variant="outline"
              size="custom"
              className="flex-1 w-full"
              onPress={() => {
                field.onChange("Pickup");
                handlePickupOption();
              }}
            >
              <Card
                className={cn("w-full flex-1 flex-col gap-2 p-4", {
                  "border-green-500": field.value === "Pickup",
                })}
              >
                <CardTitle>Pickup</CardTitle>
                <CardDescription>No delivery fee applied</CardDescription>
              </Card>
            </Button>
            <Button
              asChild
              variant="outline"
              size="custom"
              className="flex-1 w-full"
              onPress={() => {
                field.onChange("Delivery");
                handlePickupOption();
              }}
            >
              <Card
                className={cn("w-full flex-1 flex-col gap-2 p-4", {
                  "border-green-500": field.value === "Delivery",
                })}
              >
                <CardTitle>Delivery</CardTitle>
                <CardDescription>
                  Additional delivery fee of ₱300 applied
                </CardDescription>
              </Card>
            </Button>
          </View>
        </View>
      )}
    />
  );
}
