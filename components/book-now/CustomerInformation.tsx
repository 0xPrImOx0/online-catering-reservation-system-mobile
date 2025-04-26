import { View, Text } from "react-native";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { ReservationValues } from "~/hooks/use-reservation-form";

export default function CustomerInformation() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ReservationValues>();
  return (
    <View className="gap-4 bg-black">
      <Controller
        control={control}
        name="fullName"
        render={({ field }) => (
          <View className="gap-2">
            <Label className="">
              Full Name <Text className="text-destructive">*</Text>
            </Label>
            <Input
              placeholder="Enter your full name"
              value={field.value}
              onChangeText={field.onChange}
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="name"
              autoComplete="name"
            />
          </View>
        )}
      />
      {errors.fullName && (
        <Text className="text-destructive">
          {errors.fullName.message?.toString()}
        </Text>
      )}
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <View className="gap-2">
            <Label className="">
              <Text>
                Email <Text className="text-destructive">*</Text>
              </Text>
            </Label>
            <Input
              placeholder="johndoe@example.com"
              value={field.value}
              onChangeText={field.onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
            />
          </View>
        )}
      />
      {errors.email && (
        <Text className="text-destructive">
          {errors.email.message?.toString()}
        </Text>
      )}

      <Controller
        control={control}
        name="contactNumber"
        render={({ field }) => (
          <View className="gap-2">
            <Label className="">
              Contact Number <Text className="text-destructive">*</Text>{" "}
            </Label>
            <Input
              placeholder="Enter your contact number"
              keyboardType="number-pad"
              value={field.value}
              onChangeText={field.onChange}
            />
          </View>
        )}
      />
      {errors.contactNumber && (
        <Text className="text-destructive">
          {errors.contactNumber.message?.toString()}
        </Text>
      )}
    </View>
  );
}
