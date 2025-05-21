import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CheckboxMenus from "./CheckboxMenus";
import { Label } from "../ui/label";
import AddRemoveMenuQuantity from "./AddRemoveMenuQuantity";
import { defaultCategoryAndCount } from "~/lib/menu-select";
import { PackageOption } from "~/types/package-types";
import {
  ReservationValues,
  useReservationForm,
} from "~/hooks/use-reservation-form";
import { Controller, useFormContext } from "react-hook-form";
import SelectServingSize from "./SelectServingSize";
import { Textarea } from "../ui/textarea";
import CategoryOptionsBadge from "./CategoryOptionsBadge";

export default function CategoryOptions() {
  const {
    control,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<ReservationValues>();

  const { getMenuItem, getPackageItem } = useReservationForm();

  const selectedMenus = watch("selectedMenus");

  // State to hold loaded menu items
  const [menuItemsMap, setMenuItemsMap] = useState<{ [key: string]: any }>({});

  // Preload all menu items used in selectedMenus
  useEffect(() => {
    async function loadMenuItems() {
      const menuIds: string[] = [];
      Object.values(selectedMenus || {}).forEach((category: any) => {
        Object.keys(category || {}).forEach((menuId) => {
          if (!menuIds.includes(menuId)) menuIds.push(menuId);
        });
      });
      // Only fetch missing ones
      const missing = menuIds.filter((id) => !menuItemsMap[id]);
      if (missing.length === 0) return;
      const newItems: { [key: string]: any } = {};
      await Promise.all(
        missing.map(async (id) => {
          const item = await getMenuItem(id);
          if (item) newItems[id] = item;
        })
      );
      if (Object.keys(newItems).length > 0) {
        setMenuItemsMap((prev) => ({ ...prev, ...newItems }));
      }
    }
    loadMenuItems();
  }, [selectedMenus]);

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
      {selectedPackage && (
        <View>
          <Text className="mb-6 text-foreground">
            Available Categories for{" "}
            <Text className="font-medium">{currentPackage}</Text>
          </Text>

          <CategoryOptionsBadge
            categoryAndCount={categoryAndCount}
            selectedMenus={selectedMenus}
          />
        </View>
      )}
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
                      {Object.keys(field.value[category]).map((menuId) => (
                        <View
                          key={menuId}
                          className="flex-row justify-between items-center space-x-4"
                        >
                          <Text className="text-lg text-foreground">
                            {menuItemsMap[menuId]?.name || "Loading..."}
                          </Text>
                          <View className="flex-row gap-2">
                            <AddRemoveMenuQuantity
                              value={field.value}
                              category={category}
                              menu={menuId}
                              onChange={field.onChange}
                            />
                            <SelectServingSize
                              category={category}
                              menu={menuId}
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
