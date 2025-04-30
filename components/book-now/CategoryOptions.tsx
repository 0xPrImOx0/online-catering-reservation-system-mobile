import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CheckboxMenus from "./CheckboxMenus";
import { Label } from "../ui/label";
import AddRemoveMenuQuantity from "./AddRemoveMenuQuantity";
import { defaultCategoryAndCount } from "~/lib/menu-select";
import { PackageOption } from "~/types/package-types";
import { ReservationValues, useReservationForm } from "~/hooks/use-reservation-form";
import { Controller, useFormContext } from "react-hook-form";
import SelectServingSize from "./SelectServingSize";
import { Textarea } from "../ui/textarea";

export default function CategoryOptions() {
  const {
    control,
    getValues,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<ReservationValues>();

  const { getMenuItem, getPackageItem } = useReservationForm();

  const selectedMenus = watch("selectedMenus");

  const cateringOptions = watch("cateringOptions");
  const selectedPackage = watch("selectedPackage");
  const serviceFee = watch("serviceFee");
  const deliveryFee = watch("deliveryFee");

  const [currentPackage, setCurrentPackage] = useState<string>();
  const [categoryAndCount, setCategoryAndCount] = useState<PackageOption[]>(
    defaultCategoryAndCount
  );

  useEffect(() => {
    if (cateringOptions === "custom" && !!selectedPackage) {
      setCurrentPackage("");
      setValue("selectedPackage", "");
      setValue("selectedMenus", {});
      clearErrors("selectedMenus");
      setCategoryAndCount(defaultCategoryAndCount);
      return;
    }
    if (selectedPackage) {
      const selectedPackageData = getPackageItem(selectedPackage);

      if (selectedPackageData) {
        setCurrentPackage(selectedPackageData.name);
        setCategoryAndCount(selectedPackageData.options);
      }
    }
  }, [cateringOptions, selectedPackage]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 h-full"
      contentContainerClassName="pb-32"
    >
      <Controller
        control={control}
        name="selectedMenus"
        render={({ field }) => (
          <View>
            {categoryAndCount.map(({ category, count }) => (
              <CheckboxMenus
                key={category}
                category={category}
                field={field}
                selectedMenus={selectedMenus}
                count={count}
              />
            ))}
          </View>
        )}
      />
      {Object.keys(selectedMenus).length > 0 && !selectedPackage && (
        <Controller
          control={control}
          name="selectedMenus"
          render={({ field }) => (
            <View>
              <Label className="text-lg font-semibold">Menu Quantity</Label>
              <View className="space-y-6">
                {Object.keys(field.value).map((category) => (
                  <View key={category} className="pb-4 border-b">
                    <Text className="mt-4 mb-2 text-xl font-medium text-foreground">
                      {category}
                    </Text>
                    <View className="gap-2">
                      {Object.keys(field.value[category]).map((menu) => (
                        <View
                          key={menu}
                          className="flex-row justify-between items-center space-x-4"
                        >
                          <Text className="text-lg text-foreground">
                            {getMenuItem(menu)?.name}
                          </Text>
                          <View className="flex-row gap-2">
                            <AddRemoveMenuQuantity
                              value={field.value}
                              category={category}
                              menu={menu}
                              onChange={field.onChange}
                            />
                            <SelectServingSize
                              category={category}
                              menu={menu}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        />
      )}
      {errors.selectedMenus && (
        <Text className="text-destructive">
          {errors.selectedMenus.message?.toString()}
        </Text>
      )}

      <Controller
        control={control}
        name="specialRequests"
        render={({ field }) => (
          <View className="gap-2 mt-2">
            <Label>Special Requests</Label>
            <Textarea
              placeholder="Any special requests or dietary requirements?"
              value={field.value}
              onChangeText={field.onChange}
            />
          </View>
        )}
      />

      {watch("totalPrice") > 0 && (
        <View className="flex-row justify-between items-end mt-8">
          <Label>{serviceFee && deliveryFee ? "Total" : "Partial"} Price</Label>
          <Text className="text-3xl text-green-500 underline underline-offset-4">
            &#8369;{" "}
            {`${new Intl.NumberFormat("en-US").format(watch("totalPrice"))}.00`}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
