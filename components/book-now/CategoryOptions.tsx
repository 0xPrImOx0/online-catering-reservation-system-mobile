import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CheckboxMenus from "./CheckboxMenus";
import { Label } from "../ui/label";
import AddRemoveMenuQuantity from "./AddRemoveMenuQuantity";
import { menuItems } from "~/lib/menu-lists";
import { defaultCategoryAndCount } from "~/lib/menu-select";
import { PackageOption } from "~/types/package-types";
import { ReservationValues } from "~/hooks/use-reservation-form";
import { Controller, useFormContext } from "react-hook-form";
import SelectServingSize from "./SelectServingSize";
import { Textarea } from "../ui/textarea";
import { cateringPackages } from "~/lib/packages-metadata";

export default function CategoryOptions() {
  const { control, getValues, setValue, watch, clearErrors } =
    useFormContext<ReservationValues>();

  const selectedMenus = watch("selectedMenus");

  const cateringOptions = watch("cateringOptions");
  const selectedPackage = getValues("selectedPackage");
  const serviceFee = watch("serviceFee");
  const deliveryFee = watch("deliveryFee");

  const [currentPackage, setCurrentPackage] = useState<string>();
  const [categoryAndCount, setCategoryAndCount] = useState<PackageOption[]>(
    defaultCategoryAndCount
  );
  const getMenuItemName = (menuId: string) => {
    const menu = menuItems.find((item) => item._id === menuId);
    return menu ? menu.name : "";
  };
  useEffect(() => {
    if (cateringOptions === "custom") {
      setCurrentPackage("");
      setValue("selectedPackage", "");
      clearErrors("selectedMenus");
      setCategoryAndCount(defaultCategoryAndCount);
      return;
    }
    if (selectedPackage) {
      const selectedPackageData = cateringPackages.find(
        (pkg) => pkg._id === selectedPackage
      );
      if (selectedPackageData) {
        setCurrentPackage(selectedPackageData.name);
        setCategoryAndCount(selectedPackageData.options);
      }
    }
  }, [cateringOptions, selectedPackage]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
      <Controller
        control={control}
        name="selectedMenus"
        render={({ field }) => (
          <View>
            <Label className="text-lg font-semibold">Menu Quantity</Label>
            <View className="space-y-6">
              {Object.keys(field.value).map((category) => (
                <View key={category} className="pb-4 border-b">
                  <h3 className="mb-2 font-medium text-gray-700 text-md">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {Object.keys(field.value[category]).map((menu) => (
                      <li
                        key={menu}
                        className="flex items-center justify-between space-x-4"
                      >
                        <span>{getMenuItemName(menu)}</span>
                        <View className="flex space-x-2">
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
                      </li>
                    ))}
                  </ul>
                </View>
              ))}
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="specialRequests"
        render={({ field }) => (
          <View>
            <Label>Special Requests</Label>
            <Textarea
              placeholder="Any special requests or dietary requirements?"
              {...field}
            />
          </View>
        )}
      />

      {watch("totalPrice") > 0 && (
        <View className="flex items-end justify-between">
          <Label>{serviceFee && deliveryFee ? "Total" : "Partial"} Price</Label>
          <span className="text-2xl text-green-500 underline underline-offset-4">
            &#8369;{" "}
            {`${new Intl.NumberFormat("en-US").format(watch("totalPrice"))}.00`}
          </span>
        </View>
      )}
    </ScrollView>
  );
}
