import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { options } from "~/lib/packages-metadata";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import clsx from "clsx";

export default function PackageSelection() {
  const [showPackageSelection, setShowPackageSelection] = useState(false);

  return (
    <ScrollView
      contentContainerClassName="pb-28"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-4">
        {options.map((option) => (
          <Card
            key={option.value}
            // onPress={() => field.onChange(option.value)}
            className={clsx("cursor-pointer border-2 transition-all")}

            // {"border-green-500": field.value === option.value, })}
          >
            <CardHeader className="p-0">
              <Image
                source={{ uri: option.imageUrl }}
                alt={option.label}
                className="object-cover w-full h-40 mb-2 rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="mt-4 space-y-2">
              <CardTitle>{option.label}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </View>
      {/* {showPackageSelection && (
        <View className="grid gap-4 space-y-0 sm:grid-cols-2">
          {cateringPackages.map((pkg) => (
            <MiniCateringPackageCard pkg={pkg} field={field} key={pkg._id} />
          ))}
        </View>
      )} */}
    </ScrollView>
  );
}
