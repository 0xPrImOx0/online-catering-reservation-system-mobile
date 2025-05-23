import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { CateringPackagesProps } from "~/types/package-types";
import React, { useState, useEffect, useCallback } from "react";
import PackageDetailsDialog from "./PackageDetailsDialog";
import { EyeIcon, User } from "lucide-react-native";
import clsx from "clsx";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { ControllerRenderProps } from "react-hook-form";
import { ReservationValues } from "~/hooks/use-reservation-form";

export default function MiniCateringPackageCard({
  pkg,
  field,
}: {
  pkg: CateringPackagesProps;
  field: ControllerRenderProps<ReservationValues, "selectedPackage">;
}) {
  const [isSelected, setIsSelected] = useState(false);

  // Safely read field.value in useEffect to determine if the package is selected
  useEffect(() => {
    setIsSelected(field.value === pkg._id);
  }, [field.value, pkg._id]);

  return (
    <>
      <Button
        asChild
        size={"custom"}
        variant={"ghost"}
        key={pkg._id}
        onPress={() => field.onChange(pkg._id)}
      >
        <Card
          className={clsx(
            "p-4 w-full",
            { "border-green-600": isSelected } // Green border and background when selected
          )}
        >
          <CardTitle className="mb-2">{pkg.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {pkg.description}
          </CardDescription>
          <CardFooter className="flex justify-between items-center p-0 mt-5">
            <View
              className={clsx(
                "flex-row gap-1 items-center p-2 rounded-md border",
                isSelected
                  ? "border-green-600 text-foreground"
                  : "text-muted-foreground border-muted-foreground"
              )}
            >
              <User color={"white"} width={20} height={20} />
              <Text
                className={clsx(
                  isSelected ? "text-foreground" : "text-muted-foreground"
                )}
              >
                ₱{pkg.pricePerPaxWithServiceCharge.toFixed(2)}/pax
              </Text>
            </View>

            <Link href={`/packages/${pkg._id}`}>
              <View className="flex-row gap-1 items-center">
                <EyeIcon color={"white"} />
                <Text className="text-foreground">View Details</Text>
              </View>
            </Link>
          </CardFooter>
        </Card>
      </Button>
    </>
  );
}
