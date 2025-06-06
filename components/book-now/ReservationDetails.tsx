import { Label } from "~/components/ui/label";
import {
  ReservationValues,
  useReservationForm,
} from "~/hooks/use-reservation-form";
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
import DeliveryDetails from "./DeliveryDetails";
import DeliveryOption from "./DeliveryOption";
import {
  CateringPackagesProps,
  eventTypes,
  hoursArray,
} from "~/types/package-types";
import DeliveryWarning from "./DeliveryWarning";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { HoursArrayTypes } from "~/types/reservation-types";
import ReservationDateAndTime from "./ReservationDateAndTime";
import clsx from "clsx";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import PlatedWarning from "./PlatedWarning";

export default function ReservationDetails() {
  const {
    control,
    getValues,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<ReservationValues>();
  const { getPackageItem } = useReservationForm();
  const selectedPackage = getValues("selectedPackage");
  const serviceType = watch("serviceType");
  const serviceHours = watch("serviceHours");
  const orderType = watch("orderType");
  const [pkg, setPkg] = useState<CateringPackagesProps | null>(null);

  useEffect(() => {
    if (!selectedPackage) {
      setPkg(null);
      return;
    }

    async function fetchPackage() {
      const packageData = await getPackageItem(selectedPackage!);
      setPkg(packageData);
    }

    fetchPackage();
  }, [selectedPackage]);

  const getRecommendedPax = () => {
    if (pkg) {
      return pkg.recommendedPax;
    }
    return 0;
  };

  useEffect(() => {
    if (pkg) {
      setValue(
        "serviceHours",
        (pkg.serviceHours.toString() + " hours") as HoursArrayTypes
      );
      setValue("serviceFee", pkg.serviceHours);
    }
  }, [serviceType, pkg, setValue]);
 
  const recommendedPax = getRecommendedPax();

  useEffect(() => {
    const venue = watch("venue");
    if (
      watch("serviceType") === "Plated" &&
      (!venue || venue.trim().length < 1)
    ) {
      trigger("venue");
    }
  }, [watch("serviceType"), watch("venue")]);

  return (
    <ScrollView
      className="gap-4"
      contentContainerClassName="pb-32"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-4">
        <Controller
          control={control}
          name="eventType"
          render={({ field }) => (
            <View className="gap-2">
              <Label className="">
                <Text>
                  Event Type {field.value}{" "}
                  <Text className="text-destructive">*</Text>
                </Text>
              </Label>
              <Select
                onValueChange={(option) => {
                  const selectedValue = option ? option.value : "";
                  field.onChange(selectedValue);
                }}
                defaultValue={{ value: field.value, label: field.value }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Enter your event type"
                    className="text-foreground"
                  />
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
        <Controller
          control={control}
          name="guestCount"
          render={({ field }) => (
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
              {errors.guestCount ? (
                <Text className="text-destructive">
                  {errors.guestCount.message}
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
      </View>

      <View className="gap-4 my-4 w-full">
        <Controller
          control={control}
          name="serviceType"
          render={({ field }) => (
            <View className="gap-2">
              <Label className="">
                Service Type <Text className="text-destructive">*</Text>{" "}
              </Label>
              <View className="flex gap-4">
                <Button
                  asChild
                  variant="outline"
                  size="custom"
                  className="flex-1 w-full"
                  onPress={() => {
                    setValue("serviceType", "Buffet");
                    setValue("orderType", "Pickup");
                    setValue("serviceFee", 0);
                    setValue("serviceHours", undefined);
                  }}
                >
                  <Card
                    className={clsx("flex-1 w-full cursor-pointer  gap-2 p-4", {
                      "border-green-500": field.value === "Buffet",
                    })}
                  >
                    <CardTitle>Buffet</CardTitle>
                    <CardDescription>No service fee applied</CardDescription>
                  </Card>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="custom"
                  className="flex-1 w-full"
                  onPress={() => {
                    setValue("serviceType", "Plated");
                    setValue("serviceFee", 100 * 4);
                    setValue("serviceHours", serviceHours);
                  }}
                >
                  <Card
                    className={clsx("flex-1 w-full cursor-pointer gap-2 p-4", {
                      "border-green-500": field.value === "Plated",
                    })}
                  >
                    <CardTitle>Plated Service</CardTitle>
                    <CardDescription>
                      Additional service fee of &#8369; {100 * 4} applied
                    </CardDescription>
                  </Card>
                </Button>
              </View>
            </View>
          )}
        />
        {!pkg && serviceType === "Plated" && <PlatedWarning />}
        {serviceType === "Plated" && (
          <>
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
                  {errors.venue && (
                    <Text className="text-destructive">
                      {errors.venue.message?.toString()}
                    </Text>
                  )}
                </View>
              )}
            />

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
                    disabled={!!pkg}
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
          </>
        )}
      </View>
      {serviceType !== "Plated" && (
        <>
          <DeliveryOption control={control} />
          <Separator className="" />
          <View>
            <View className="mb-4">
              <Text className="text-lg font-semibold">{orderType} Details</Text>
              <Text className="mb-4 text-sm text-muted-foreground">
                Please provide details about the{" "}
                {orderType === "Delivery"
                  ? "delivery location"
                  : "pickup details"}{" "}
                and any special instructions for the{" "}
                {orderType === "Delivery" ? "delivery team" : "catering team"}.
              </Text>
              <DeliveryWarning isDelivery={orderType === "Delivery"} />
            </View>
            <ReservationDateAndTime
              control={control}
              deliveryOption={orderType}
            />
            {orderType === "Delivery" && <DeliveryDetails control={control} />}
          </View>
          <Separator />
        </>
      )}

      <View className="flex-row justify-between items-end">
        <Label>Total Bill</Label>
        <Text className="text-2xl text-green-500 underline underline-offset-4">
          &#8369;{" "}
          {`${new Intl.NumberFormat("en-US").format(watch("totalPrice"))}.00`}
        </Text>
      </View>
    </ScrollView>
  );
}
