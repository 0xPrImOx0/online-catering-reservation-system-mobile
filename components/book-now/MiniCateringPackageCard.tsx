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
import { Link, router } from "expo-router";

export default function MiniCateringPackageCard({
  pkg,
  field,
}: {
  pkg: CateringPackagesProps;
  field: any;
}) {
  const [isSelected, setIsSelected] = useState(false);

  // Safely read field.value in useEffect to determine if the package is selected
  useEffect(() => {
    setIsSelected(field.value === pkg._id);
  }, [field.value, pkg._id]);

  // Memoize onPress handler
  const handlePress = useCallback(() => {
    field.onChange(pkg._id);
  }, [field.onChange, pkg._id]);

  return (
    <>
      <Button
        asChild
        size={"custom"}
        variant={"ghost"}
        key={pkg._id}
        onPress={handlePress}
      >
        <Card
          className={clsx(
            "w-full p-4",
            { "border-green-600": isSelected } // Green border and background when selected
          )}
        >
          <CardTitle className="mb-2">{pkg.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {pkg.description}
          </CardDescription>
          <CardFooter className="flex items-center justify-between p-0 mt-5">
            <View
              className={clsx(
                "border flex-row rounded-md p-2 items-center gap-1",
                isSelected
                  ? "text-foreground border-green-600"
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

            <Link
              href={`/packages/${pkg._id}`}
            >
              <View className="flex-row items-center gap-1">
                <EyeIcon color={"white"} />
                <Text className="text-white">View Details</Text>
              </View>
            </Link>
          </CardFooter>
        </Card>
      </Button>
    </>
  );
}
