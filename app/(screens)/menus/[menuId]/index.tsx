import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { menuItems } from "~/lib/menu-lists";
import { Badge } from "~/components/ui/badge";
import clsx from "clsx";
import { CategoryBadge } from "~/components/menus/MenuCategoryBadge";
import { Flame } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import TrayPriceCard from "~/components/menus/TrayPriceCard";

export default function MenuShowcasePage() {
  const { menuId } = useLocalSearchParams();
  const menu = menuItems.find((item) => item._id === menuId);
  if (menu) {
    return (
      <View className="flex-1 bg-background">
        <View className="">
          <View className="relative w-full ">
            <Image
              source={{ uri: menu.imageUrl }}
              alt={menu.name}
              className="object-cover object-center h-[240px]"
            />

            <View className="absolute flex-row gap-2 top-2 right-2">
              <Badge
                variant={menu.available ? "default" : "destructive"}
                className={clsx("justify-center", {
                  "bg-emerald-600 dark:bg-emerald-500": menu.available,
                })}
              >
                <Text className="text-white ">
                  {menu.available ? "Available" : "Unavailable"}
                </Text>
              </Badge>
              <CategoryBadge category={menu.category} />

              {menu.spicy && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 text-white bg-red-500 border-red-500 dark:bg-red-600 dark:border-red-600"
                >
                  <Flame className="w-3 h-3" />
                  <Text>Spicy</Text>
                </Badge>
              )}
            </View>
          </View>

          <View className="p-4 pb-2 border-b border-border">
            <View className="flex justify-between">
              <Text className="font-serif text-2xl text-foreground">
                {menu.name}
              </Text>

              <Text className="mt-2 text-muted-foreground">
                {menu.shortDescription}
              </Text>
            </View>
            <View className="flex-row items-center justify-between px-3 py-2 mt-4 rounded-md bg-primary text-primary-foreground">
              <Text className="text-lg font-bold">
                &#8369;{menu.regularPricePerPax.toFixed(2)} per pax
              </Text>
              <Button
                variant={"secondary"}
                onPress={() => router.push("/book-now")}
              >
                <Text className="text-white">Book Now </Text>
              </Button>
            </View>
          </View>
        </View>

        <ScrollView className="p-4 overflow-y-auto">
          <View>
            <Text className="mb-2 text-lg font-medium text-foreground">
              Description
            </Text>
            <Text className="text-justify text-muted-foreground">
              {menu.fullDescription}
            </Text>
          </View>

          <View>
            <Text className="mb-2 text-lg font-medium text-foreground">
              Ingredients
            </Text>
            <View className="flex flex-wrap gap-2">
              {menu.ingredients.length > 0 ? (
                <FlatList
                  scrollEnabled={false}
                  data={menu.ingredients}
                  numColumns={3}
                  keyExtractor={(item) => item}
                  contentContainerClassName="gap-3"
                  renderItem={({ item }) => (
                    <Badge key={item} variant="outline" className="font-medium">
                      <Text className="text-white">{item}</Text>
                    </Badge>
                  )}
                />
              ) : (
                <Text className="text-muted-foreground">None</Text>
              )}
            </View>
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-lg font-medium text-foreground">
              Allergens
            </Text>
            <View className="flex flex-wrap gap-1.5">
              {menu.allergens.length > 0 ? (
                <FlatList
                  data={menu.allergens}
                  scrollEnabled={false}
                  numColumns={3}
                  keyExtractor={(item) => item}
                  contentContainerClassName="gap-3"
                  renderItem={({ item }) => (
                    <Badge key={item} variant="outline" className="font-medium">
                      <Text className="text-white">{item}</Text>
                    </Badge>
                  )}
                />
              ) : (
                <Text className="text-muted-foreground">None</Text>
              )}
            </View>
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-lg font-medium text-foreground">
              Nutritional Information
            </Text>
            <View className="grid grid-cols-2 gap-2">
              <FlatList
                data={Object.entries(menu.nutritionInfo).filter(
                  ([key]) => key !== "_id"
                )}
                keyExtractor={([key]) => key}
                scrollEnabled={false}
                numColumns={2}
                contentContainerStyle={{ rowGap: 10 }}
                renderItem={({ item: [key, value] }) => (
                  <Card key={key} className="justify-between flex-1 p-2">
                    <Text className="text-white capitalize">{key}</Text>
                    <Text className="font-bold text-white">{value}</Text>
                  </Card>
                )}
              />
            </View>
            <Text className="mt-2 text-xs text-muted-foreground">
              *Values are per serving
            </Text>
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-lg font-medium text-foreground">
              Preparation Method
            </Text>
            <Text className="text-justify text-muted-foreground">
              {menu.preparationMethod}
            </Text>
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-lg font-medium text-foreground">
              Pricing
            </Text>
            <View className="space-y-2">
              <Card className="flex-row items-center justify-between p-2 py-3 rounded">
                <Text className="font-medium text-white">
                  Regular price per pax
                </Text>
                <Text className="font-bold text-white">
                  &#8369;{menu.regularPricePerPax.toFixed(2)}
                </Text>
              </Card>

              <FlatList
                data={menu.prices}
                keyExtractor={(item) => item.minimumPax.toString()}
                scrollEnabled={false}
                contentContainerStyle={{ rowGap: 12, marginTop: 12 }}
                renderItem={({ item }) => (
                  <TrayPriceCard
                    key={item.minimumPax}
                    data={item}
                    regularPrice={menu.regularPricePerPax}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
