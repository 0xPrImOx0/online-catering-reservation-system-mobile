import { Controller, useFormContext } from "react-hook-form";
import { Platform, Text, View } from "react-native";
import { Input } from "~/components/ui/input";
import { Label } from "../ui/label";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, CalendarIcon } from "lucide-react-native";
import React, { useId, useState } from "react";
import { ReservationValues } from "~/hooks/use-reservation-form";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ReservationDateAndTime({
  control,
  deliveryOption,
}: {
  control: any;
  deliveryOption: "Delivery" | "Pickup";
}) {
  const toOrOf = deliveryOption === "Delivery" ? "of" : "to";
  const {
    formState: { errors },
  } = useFormContext<ReservationValues>();
  const id = useId();

  return (
    <View>
      <Controller
        control={control}
        name="reservationDate"
        render={({ field }) => (
          <View className="gap-2 mt-4 w-full">
            <Label className="">
              <Text>
                Date {toOrOf} {deliveryOption}{" "}
                <Text className="text-destructive">*</Text>
              </Text>
            </Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={id}
                  variant={"outline"}
                  asChild
                  className={clsx(
                    " border-input w-full relative justify-between px-3 font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <View className="flex-row justify-between items-center w-full">
                    <Text
                      className={clsx(
                        "truncate text-foreground",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value instanceof Date
                        ? format(field.value, "PPP")
                        : "Pick a date"}{" "}
                    </Text>
                    <CalendarIcon size={20} color={"#666"} className="" />
                  </View>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2 w-auto" align="start">
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
              </PopoverContent>
            </Popover>
          </View>
        )}
      />
      <View className="flex-row gap-4 items-end mt-4">
        <Controller
          control={control}
          name="reservationTime"
          render={({ field }) => (
            <View className="flex-1">
              <Label className="mb-2">
                Time {toOrOf} {deliveryOption}{" "}
                <Text className="text-destructive">*</Text>{" "}
              </Label>
              <Input
                placeholder="00:00"
                className=""
                {...field}
                onChangeText={field.onChange}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="period"
          render={({ field }) => (
            <View className="flex-1">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select service hours rendered"
                    className={clsx(
                      "text-foreground",
                      !field.value && "text-muted-foreground"
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  {["A.M.", "P.M."].map((period) => (
                    <SelectItem key={period} label={period} value={period}>
                      {period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </View>
          )}
        />
      </View>
      {errors.reservationTime && (
        <Text className="text-sm text-destructive">
          {errors.reservationTime.message}
        </Text>
      )}
    </View>
  );
}
