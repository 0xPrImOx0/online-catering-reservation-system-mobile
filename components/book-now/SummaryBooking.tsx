"use client";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  useReservationForm,
  type ReservationValues,
} from "~/hooks/use-reservation-form";
import { menuItems } from "~/lib/menu-lists";
import {
  Calendar,
  Check,
  MessageSquare,
  User,
  Utensils,
} from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { SelectedMenu } from "~/types/reservation-types";
import { useEffect, useState } from "react";
import type { CateringPackagesProps } from "~/types/package-types";

interface MenuItem {
  id: string;
  name: string;
}

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <View className="flex-row items-start py-2">
      <Text className="flex-1 font-medium text-foreground shrink-0">
        {label}
      </Text>
      <Text className="ml-2 text-foreground">{value || "Not provided"}</Text>
    </View>
  );
};

export default function SummaryBooking() {
  const { watch, setValue } = useFormContext<ReservationValues>();
  const { getMenuItem, getPackageItem } = useReservationForm();

  // Use watch to get reactive form values
  const formValues = watch();
  const [menuItems, setMenuItems] = useState<Record<string, MenuItem>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPackageData, setSelectedPackageData] =
    useState<CateringPackagesProps | null>(null);

  // Fetch menu items when selectedMenus changes
  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!formValues.selectedMenus) {
        setIsLoading(false);
        return;
      }

      const menuIds = new Set<string>();
      Object.values(formValues.selectedMenus).forEach((menuGroup) => {
        Object.keys(menuGroup).forEach((id) => menuIds.add(id));
      });

      if (menuIds.size === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const menuPromises = Array.from(menuIds).map(async (id) => {
          try {
            const menu = await getMenuItem(id);
            return menu ? { id, name: menu.name } : null;
          } catch (error) {
            console.error(`Error fetching menu item ${id}:`, error);
            return null;
          }
        });

        const menuItemsArray = await Promise.all(menuPromises);
        const menuItemsMap = menuItemsArray.reduce<
          Record<string, { id: string; name: string }>
        >((acc, item) => {
          if (item) {
            acc[item.id] = item;
          }
          return acc;
        }, {});

        setMenuItems(menuItemsMap);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchMenuItems();
  }, [formValues.selectedMenus]);

  // Fetch package data
  useEffect(() => {
    if (!formValues.selectedPackage) {
      setSelectedPackageData(null);
      return;
    }

    async function fetchPackage() {
      const pkg = await getPackageItem(formValues.selectedPackage!);
      setSelectedPackageData(pkg);
    }

    fetchPackage();
  }, [formValues.selectedPackage]);

  // Reset delivery fields if service type is Plated
  useEffect(() => {
    if (formValues.serviceType === "Plated") {
      setValue("orderType", "");
      setValue("deliveryAddress", "");
      setValue("deliveryInstructions", "");
      setValue("deliveryFee", 0);
    }
  }, [formValues.serviceType, setValue]);

  const formattedDate = formValues.reservationDate
    ? new Date(formValues.reservationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";

  const formattedTime = formValues.reservationTime
    ? `${formValues.reservationTime}`
    : "No time selected";

  const currency = (amount: number) =>
    amount ? `₱${Number(amount).toLocaleString()}` : "₱0";

  const fadeIn = {
    from: { opacity: 0, translateY: 20 },
    animate: { opacity: 1, translateY: 0 },
  };

  const stagger = {
    container: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32, gap: 16}}
    >
      <View className="gap-4">
        {/* Customer Information */}
        <View>
          <Card className="overflow-hidden border-2">
            <CardHeader className="py-4 border-b bg-muted/30">
              <View className="flex-row items-center">
                <User className="mr-2 w-5 h-5 text-foreground" />
                <Text className="text-lg font-semibold text-foreground">
                  Customer Information
                </Text>
              </View>
            </CardHeader>
            <CardContent className="p-6">
              <View className="gap-4">
                <DetailRow label="Name" value={formValues.fullName} />
                <DetailRow label="Email" value={formValues.email} />
                <DetailRow label="Phone" value={formValues.contactNumber} />
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Reservation Details */}
        <View>
          <Card className="overflow-hidden border-2">
            <CardHeader className="py-4 border-b bg-muted/30">
              <View className="flex-row items-center">
                <Calendar className="mr-2 w-5 h-5 text-foreground" />
                <Text className="text-lg font-semibold text-foreground">
                  Reservation Details
                </Text>
              </View>
            </CardHeader>
            <CardContent className="p-6">
              <View className="gap-4">
                <DetailRow
                  label="Reservation Type"
                  value={formValues.eventType}
                />
                {formValues.eventType !== "Others" && (
                  <DetailRow
                    label="Event Type"
                    value={formValues.eventType || "Not provided"}
                  />
                )}
                <DetailRow label="Date" value={formattedDate} />
                <DetailRow label="Time" value={formattedTime} />
                <DetailRow
                  label="Guests"
                  value={formValues.guestCount || "Not provided"}
                />
                <DetailRow
                  label="Service Type"
                  value={formValues.serviceType || "Not provided"}
                />
                {formValues.serviceType === "Plated" && (
                  <>
                    <DetailRow
                      label="Venue"
                      value={formValues.venue || "Not provided"}
                    />
                    <DetailRow
                      label="Service Hours"
                      value={formValues.serviceHours as string}
                    />
                  </>
                )}
                {formValues.serviceType !== "Plated" && (
                  <>
                    <DetailRow
                      label="Order Type"
                      value={formValues.orderType || "Not provided"}
                    />
                    {formValues.orderType === "Delivery" && (
                      <>
                        <DetailRow
                          label="Delivery Address"
                          value={formValues.deliveryAddress || "Not provided"}
                        />
                        <DetailRow
                          label="Delivery Instructions"
                          value={
                            formValues.deliveryInstructions || "Not provided"
                          }
                        />
                      </>
                    )}
                  </>
                )}
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Selected Package */}
        {formValues.selectedPackage && (
          <View>
            <Card className="overflow-hidden border-2">
              <CardHeader className="py-4 border-b bg-muted/30">
                <View className="flex-row items-center">
                  <Check className="mr-2 w-5 h-5 text-foreground" />
                  <Text className="text-lg font-semibold text-foreground">
                    Selected Package
                  </Text>
                </View>
              </CardHeader>
              <CardContent className="p-6">
                <Text className="font-medium text-foreground text-md">
                  {selectedPackageData?.name || "No package selected"}
                </Text>
              </CardContent>
            </Card>
          </View>
        )}

        {/* Selected Menus */}
        {formValues.selectedMenus &&
          Object.keys(formValues.selectedMenus).length > 0 && (
            <View>
              <Card className="overflow-hidden border-2">
                <CardHeader className="py-4 border-b bg-muted/30">
                  <View className="flex-row items-center">
                    <Utensils className="mr-2 w-5 h-5 text-foreground" />
                    <Text className="text-lg font-semibold text-foreground">
                      Selected Menus
                    </Text>
                  </View>
                </CardHeader>
                <CardContent className="p-6">
                  <View style={{ gap: 16 }}>
                    {Object.entries(formValues.selectedMenus).map(
                      ([category, menuIds]: [string, SelectedMenu]) => {
                        const menuIdArray = Object.keys(menuIds);
                        if (menuIdArray.length === 0) return null;

                        return (
                          <Card
                            key={category}
                            className="overflow-hidden border"
                          >
                            <CardHeader className="py-3 border-b bg-muted/30">
                              <Text className="font-medium text-foreground text-md">
                                {category}
                              </Text>
                            </CardHeader>
                            <CardContent className="p-4">
                              <View style={{ gap: 8 }}>
                                {menuIdArray.map((id) => {
                                  const menu = menuItems[id];
                                  if (!menu) return null;

                                  return (
                                    <View
                                      key={id}
                                      className="flex-row gap-2 items-center"
                                    >
                                      {menuIds[id].quantity > 1 ? (
                                        <Text className="text-green-600">
                                          {menuIds[id].quantity} X
                                        </Text>
                                      ) : (
                                        <View className="justify-center items-center w-6 h-6 bg-green-700 rounded-full">
                                          <Check className="w-4 h-4 text-white" />
                                        </View>
                                      )}
                                      <Text className="text-foreground">
                                        {menu.name}
                                      </Text>
                                    </View>
                                  );
                                })}
                                {isLoading && menuIdArray.length === 0 && (
                                  <Text className="text-sm text-foreground">
                                    Loading menu items...
                                  </Text>
                                )}
                              </View>
                            </CardContent>
                          </Card>
                        );
                      }
                    )}
                  </View>
                </CardContent>
              </Card>
            </View>
          )}

        {/* Payment & Status */}
        <View>
          <Card className="overflow-hidden border-2">
            <CardHeader className="py-4 border-b bg-muted/30">
              <View className="flex-row items-center">
                <Check className="mr-2 w-5 h-5 text-foreground" />
                <Text className="text-lg font-semibold text-foreground">
                  Payment & Status
                </Text>
              </View>
            </CardHeader>
            <CardContent className="p-6">
              <View className="gap-4">
                <DetailRow
                  label="Total Price"
                  value={currency(formValues.totalPrice)}
                />
                {formValues.serviceFee > 0 && (
                  <DetailRow
                    label="Service Fee"
                    value={currency(formValues.serviceFee)}
                  />
                )}
                {formValues.deliveryFee > 0 && (
                  <DetailRow
                    label="Delivery Fee"
                    value={currency(formValues.deliveryFee)}
                  />
                )}
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Additional Information */}
        {formValues.specialRequests && (
          <View>
            <Card className="overflow-hidden border-2">
              <CardHeader className="py-4 border-b bg-muted/30">
                <View className="flex-row items-center">
                  <MessageSquare className="mr-2 w-5 h-5 text-foreground" />
                  <Text className="text-lg font-semibold text-foreground">
                    Additional Information
                  </Text>
                </View>
              </CardHeader>
              <CardContent className="p-6">
                <View className="gap-4">
                  <DetailRow
                    label="Special Requests"
                    value={formValues.specialRequests}
                  />
                </View>
              </CardContent>
            </Card>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
