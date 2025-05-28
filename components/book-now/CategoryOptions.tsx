import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CheckboxMenus from "./CheckboxMenus";
import { Label } from "../ui/label";
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
import { MenuItem } from "~/types/menu-types";

export default function CategoryOptions({
  setIsCategoryError,
  cateringOptions,
}: {
  setIsCategoryError: (value: boolean) => void;
  cateringOptions: string;
}) {
  const {
    control,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext<ReservationValues>();

  const { getMenuItem, getPackageItem } = useReservationForm();

  const selectedMenus = watch("selectedMenus");

  // State to hold loaded menu items
  const [menuItemsMap, setMenuItemsMap] = useState<Record<string, MenuItem>>(
    {}
  );

  // Preload all menu items used in selectedMenus
  useEffect(() => {
    async function loadMenuItems() {
      const menuIds: string[] = [];
      Object.values(selectedMenus || {}).forEach(
        (category: Record<string, unknown>) => {
          Object.keys(category || {}).forEach((menuId) => {
            if (!menuIds.includes(menuId)) menuIds.push(menuId);
          });
        }
      );
      // Only fetch missing ones
      const missing = menuIds.filter((id) => !menuItemsMap[id]);
      if (missing.length === 0) return;
      const newItems: Record<string, MenuItem> = {};
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

  const selectedPackage = watch("selectedPackage");

  const serviceFee = watch("serviceFee");
  const deliveryFee = watch("deliveryFee");

  const [currentPackage, setCurrentPackage] = useState<string>();

  const [categoryAndCount, setCategoryAndCount] = useState<PackageOption[]>(
    defaultCategoryAndCount
  );

  useEffect(() => {
    if (cateringOptions === "menus" && !!selectedPackage) {
      setCurrentPackage("");
      setValue("selectedPackage", "");
      setValue("selectedMenus", {});
      clearErrors("selectedMenus");
      setCategoryAndCount(defaultCategoryAndCount);
      return;
    }
    if (selectedPackage) {
      async function fetchPackage() {
        if (!selectedPackage) return;

        const selectedPackageData = await getPackageItem(selectedPackage);

        if (selectedPackageData) {
          setCurrentPackage(selectedPackageData.name);
          setCategoryAndCount(selectedPackageData.options);
        }
      }

      fetchPackage();
    }
  }, [cateringOptions, selectedPackage]);

  useEffect(() => {
    if (cateringOptions === "packages" && selectedPackage) {
      const hasIncompleteCategory = categoryAndCount.some(
        ({ category, count }) =>
          Object.keys(selectedMenus[category] || {}).length !== count
      );

      if (hasIncompleteCategory) {
        setIsCategoryError(true);
        setError("selectedMenus", {
          type: "manual",
          message:
            "Please select the required number of items for each category.",
        });
      } else {
        setIsCategoryError(false);
        clearErrors("selectedMenus");
      }
    }
  }, [selectedMenus, categoryAndCount]);

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
