import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { cateringPackages, options } from "~/lib/packages-metadata";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import { ReservationValues } from "~/hooks/use-reservation-form";
import { Button } from "../ui/button";
import MiniCateringPackageCard from "./MiniCateringPackageCard";

export default function PackageSelection({
  showPackageSelection = true,
}: {
  showPackageSelection: boolean;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ReservationValues>();

  return (
    <ScrollView
      contentContainerClassName="pb-28"
      showsVerticalScrollIndicator={false}
    >
      {!showPackageSelection && (
        <Controller
          control={control}
          name="cateringOptions"
          render={({ field }) => (
            <View className="gap-4">
              {options.map((option) => {
                // Local state for each option's selected status
                const [isSelected, setIsSelected] = useState(false);

                // Safely update isSelected based on field.value
                useEffect(() => {
                  setIsSelected(field.value === option.value);
                }, [field.value, option.value]);

                return (
                  <Button
                    asChild
                    onPress={() => field.onChange(option.value)}
                    size={"custom"}
                    variant={"ghost"}
                    key={option.value}
                  >
                    <Card
                      className={clsx(
                        "border-2 cursor-pointer",
                        { "border-green-500": isSelected } // Use isSelected instead of field.value
                      )}
                    >
                      <CardHeader className="p-0">
                        <Image
                          source={{ uri: option.imageUrl }}
                          alt={option.label}
                          className="object-cover mb-2 w-full h-40 rounded-t-lg"
                        />
                      </CardHeader>
                      <CardContent className="mt-4 space-y-2">
                        <CardTitle>{option.label}</CardTitle>
                        <CardDescription>{option.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Button>
                );
              })}
            </View>
          )}
        />
      )}
      {errors.cateringOptions && (
        <Text className="text-destructive">
          {errors.cateringOptions.message?.toString()}
        </Text>
      )}

      {showPackageSelection && (
        <Controller
          control={control}
          name="selectedPackage"
          render={({ field }) => (
            <View className="gap-4">
              {cateringPackages.map((pkg) => (
                <MiniCateringPackageCard
                  pkg={pkg}
                  field={field}
                  key={pkg._id}
                />
              ))}
            </View>
          )}
        />
      )}
      {errors.selectedPackage && (
        <Text className="text-destructive">
          {errors.selectedPackage.message?.toString()}
        </Text>
      )}
    </ScrollView>
  );
}
