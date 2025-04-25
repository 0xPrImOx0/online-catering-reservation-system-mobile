import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ReservationValues } from "~/hooks/use-reservation-form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { Separator } from "~/components/ui/separator";
import WhatsTheOccasionCard from "./WhatsTheOccasionCard";
import EventType from "./EventType";
import EventDate from "./EventDate";
import DeliveryDetails from "./DeliveryDetails";
import DeliveryOption from "./DeliveryOption";
import { hoursArray } from "~/types/package-types";
import PlatedWarning from "./PlatedWarning";
import DeliveryWarning from "./DeliveryWarning";
import { useEffect } from "react";
import { cateringPackages } from "~/lib/packages-metadata";
import { ScrollView, Text, View } from "react-native";

export default function EventDetails() {
  const { control, getValues, watch, setValue } =
    useFormContext<ReservationValues>();
  const reservationType = watch("reservationType");
  const cateringOptions = watch("cateringOptions");
  const selectedPackage = getValues("selectedPackage");
  const serviceType = watch("serviceType");
  const serviceHours = watch("serviceHours");
  const eventType = watch("eventType");
  const guestCount = watch("guestCount");

  useEffect(() => {
    const hour = serviceHours?.slice(0, 2);
    setValue("serviceFee", 100 * Number(hour));
  }, [serviceHours]);

  // useEffect(() => {
  //   if (selectedPackage) {
  //     setValue("totalPrice", );
  //   }
  // }, [guestCount]);

  const getRecommendedPax = () => {
    const pkg = cateringPackages.find((pkg) => pkg._id === selectedPackage);
    return pkg?.recommendedPax || 0;
  };

  const recommendedPax = getRecommendedPax();

  return (
    <ScrollView
      className="gap-4"
      contentContainerClassName="pb-32"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-4">
        {cateringOptions === "custom" && (
          <WhatsTheOccasionCard control={control} />
        )}
        {reservationType === "event" && eventType !== "No Event" && (
          <EventType control={control} />
        )}
        <EventDate control={control} />
        {reservationType === "event" && (
          <Controller
            control={control}
            name="guestCount"
            render={({ field, fieldState }) => (
              <View className="gap-2">
                <Label className="">
                  Number of Guests <Text className="text-destructive">*</Text>{" "}
                </Label>
                <Input
                  placeholder="Enter expected guests"
                  {...field}
                  onChangeText={(e: string) => {
                    // Handle the 0 issue by replacing the value completely
                    const value = e;
                    if (value === "0" || value === "") {
                      field.onChange(0);
                    } else {
                      // Remove leading zeros and convert to number
                      field.onChange(Number(value.replace(/^0+/, "")));
                    }
                  }}
                  value={field.value !== undefined ? String(field.value) : ""}
                />
                {fieldState.error ? (
                  <Text className="text-destructive">
                    {fieldState.error.message}
                  </Text>
                ) : (
                  recommendedPax > 0 && (
                    <Text className="italic text-[0.8rem] font-medium text-foreground">
                      *Recommended pax is {recommendedPax} persons
                    </Text>
                  )
                )}
              </View>
            )}
          />
        )}
        {reservationType === "event" && (
          <Controller
            control={control}
            name="venue"
            render={({ field }) => (
              <View className="gap-2">
                <Label className="">
                  Venue <Text className="text-destructive">*</Text>{" "}
                </Label>
                <Input
                  placeholder="Enter your event venue"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              </View>
            )}
          />
        )}
      </View>

      {reservationType === "event" && (
        <View className="w-full gap-4 my-4">
          <Controller
            control={control}
            name="serviceType"
            render={({ field }) => (
              <View className="gap-2">
                <Label className="">
                  Service Type <Text className="text-destructive">*</Text>{" "}
                </Label>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex-row"
                >
                  <View className="flex-row items-center flex-1 gap-2 ">
                    <RadioGroupItem
                      onPress={() => {
                        setValue("serviceFee", 0);
                        setValue("serviceHours", "");
                      }}
                      value="Buffet"
                      id="buffet"
                    />
                    <Label htmlFor="buffet">Buffet</Label>
                  </View>
                  <View className="flex-row items-center flex-1 gap-2">
                    <RadioGroupItem
                      value="Plated"
                      id="plated"
                      onPress={() => {
                        setValue("serviceFee", 100 * 4);
                        setValue("serviceHours", "4 hours");
                      }}
                    />
                    <Label htmlFor="plated">Plated Service</Label>
                  </View>
                </RadioGroup>
              </View>
            )}
          />
          {serviceType === "Plated" && (
            <Controller
              control={control}
              name="serviceHours"
              render={({ field }) => (
                <View className="gap-2">
                  <Label className="">
                    Service Hours <Text className="text-destructive">*</Text>{" "}
                  </Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={{
                      value: field.value || "",
                      label: field.value || "",
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select service hours rendered"
                        className="text-foreground"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {hoursArray.map((hour) => (
                        <SelectItem key={hour} value={hour} label={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </View>
              )}
            />
          )}
        </View>
      )}
      {serviceType === "Plated" && (
        <PlatedWarning isPlated={serviceType === "Plated"} />
      )}
      <Separator className="" />
      <View>
        <View className="mb-4">
          <Text className="text-lg font-semibold">Delivery Details</Text>
          <Text className="mb-4 text-sm text-muted-foreground">
            Please provide details about the delivery location and any special
            instructions for the delivery team.
          </Text>
        </View>
        <DeliveryOption control={control} />
        {getValues("deliveryOption") === "Delivery" && (
          <>
            <DeliveryWarning
              isDelivery={getValues("deliveryOption") === "Delivery"}
            />
            <DeliveryDetails control={control} />
          </>
        )}
      </View>
      <Separator className="my-4" />

      <View className="flex-row items-end justify-between">
        <Label>Total Bill</Label>
        <Text className="text-2xl text-green-500 underline underline-offset-4">
          &#8369;{" "}
          {`${new Intl.NumberFormat("en-US").format(watch("totalPrice"))}.00`}
        </Text>
      </View>
    </ScrollView>
  );
}
