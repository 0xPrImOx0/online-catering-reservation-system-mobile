import { View, Text, Image } from "react-native";
import React from "react";
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
import {
  ReservationValues,
  useReservationForm,
} from "~/hooks/use-reservation-form";
import { Button } from "../ui/button";
import MiniCateringPackageCard from "./MiniCateringPackageCard";
import { cn } from "~/lib/utils";

interface PackageSelectionProps {
  showPackageSelection: boolean;
  cateringOptions: "packages" | "menus";
  setCateringOptions: React.Dispatch<
    React.SetStateAction<"packages" | "menus">
  >;
}

export default function PackageSelection({
  showPackageSelection,
  cateringOptions,
  setCateringOptions,
}: PackageSelectionProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ReservationValues>();

  const { cateringPackages } = useReservationForm();

  return (
    <View>
      <View className="space-y-3">
        {!showPackageSelection && (
          <View className="flex gap-4 space-y-0 max-sm:flex-col">
            {options.map((option) => (
              <Button
                asChild
                key={option.value}
                onPress={() =>
                  setCateringOptions(option.value as typeof cateringOptions)
                }
                variant={"outline"}
                size={"custom"}
              >
                <Card
                  className={cn(
                    "flex-1 cursor-pointer border-2 transition-all",
                    {
                      "border-green-500": cateringOptions === option.value,
                    }
                  )}
                >
                  <CardHeader className="p-0">
                    <Image
                      source={{ uri: option.imageUrl }}
                      alt={option.label}
                      width={200}
                      height={200}
                      className="object-cover mb-2 w-full h-40 rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="mt-4 space-y-2">
                    <CardTitle>{option.label}</CardTitle>
                    <CardDescription className="text-justify">
                      {option.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Button>
            ))}
          </View>
        )}

        {showPackageSelection && (
          <Controller
            control={control}
            name="selectedPackage"
            render={({ field }) => (
              <View className="grid gap-4 space-y-0 md:grid-cols-2">
                {cateringPackages ? (
                  cateringPackages.map((pkg) => (
                    <MiniCateringPackageCard
                      pkg={pkg}
                      field={field}
                      key={pkg._id}
                    />
                  ))
                ) : (
                  <View className="col-span-3 min-h-[50vh] flex justify-center items-center">
                    <span className="text-4xl font-bold">
                      No Packages Found
                    </span>
                  </View>
                )}
                {errors.selectedPackage && (
                  <Text className="text-destructive">
                    {errors.selectedPackage.message?.toString()}
                  </Text>
                )}
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
