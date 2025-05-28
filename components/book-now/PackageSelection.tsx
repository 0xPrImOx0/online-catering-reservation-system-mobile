import { View, Text, Image } from "react-native";
import { options } from "~/lib/packages-metadata";
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
import { ScrollView } from "react-native";
import useApiPackages from "~/hooks/useApiPackages";
import Loading from "../Loading";

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

  const { cateringPackages, isLoading } = useApiPackages();

  return (
    <ScrollView
      contentContainerClassName="pb-28"
      showsVerticalScrollIndicator={false}
    >
      {!showPackageSelection && (
        <View className="gap-8">
          {options.map((option) => {
            return (
              <Button
                asChild
                onPress={() => {
                  setCateringOptions(option.value as typeof cateringOptions);
                  console.log(cateringOptions);
                }}
                size={"custom"}
                variant={"ghost"}
                key={option.value}
              >
                <Card
                  className={clsx(
                    "w-full border-2 cursor-pointer",

                    { "border-green-500": cateringOptions === option.value }
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

      {isLoading ? (
        <Loading message="Loading packages..." />
      ) : (
        showPackageSelection &&
        cateringPackages && (
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
        )
      )}

      {errors.selectedPackage && (
        <Text className="text-destructive">
          {errors.selectedPackage.message?.toString()}
        </Text>
      )}
    </ScrollView>
  );
}
