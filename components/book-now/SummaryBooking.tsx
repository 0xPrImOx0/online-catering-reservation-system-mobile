"use client";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import type { ReservationValues } from "~/hooks/use-reservation-form";
import { menuItems } from "~/lib/menu-lists";
import {
  Calendar,
  Check,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  User,
  Mail,
  Users,
  Utensils,
  Building,
  LucideIcon,
} from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { PaxArrayType, SelectedMenus } from "~/types/reservation-types";
import { Separator } from "../ui/separator";

export default function SummaryBooking() {
  const { watch } = useFormContext<ReservationValues>();

  // Use watch to get reactive form values
  const formValues = watch();

  const formattedDate = formValues.eventDate
    ? formValues.eventDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";

  const DetailRow = ({
    icon: Icon,
    title,
    details,
  }: {
    icon: LucideIcon;
    title: string;
    details: string | number;
  }) => {
    return (
      <View className="flex-row items-center justify-between gap-2">
        <Icon className="w-4 h-4 mr-2" strokeWidth={1.5} color={"white"} />
        <Text className="flex-1 text-foreground">{title}</Text>
        <Text className="ml-2 font-medium text-foreground">
          {details || "Not provided"}
        </Text>
      </View>
    );
  };

  const SectionTitle = ({
    icon: Icon,
    title,
  }: {
    icon: LucideIcon;
    title: string;
  }) => {
    return (
      <View className="flex-row items-center gap-2 mb-4">
        <Icon className="w-5 h-5 mr-2" color={"white"} />
        <Text className="text-lg font-semibold text-foreground">{title}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-32 gap-8"
    >
      <View className="gap-6 ">
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6 ">
            <SectionTitle title="Customer Information" icon={User} />
            <View className="gap-4">
              <DetailRow
                icon={User}
                title="Name"
                details={formValues.fullName}
              />
              <DetailRow icon={Mail} title="Email" details={formValues.email} />
              <DetailRow
                icon={Phone}
                title="Phone"
                details={formValues.contactNumber}
              />
            </View>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <SectionTitle title="Event Details" icon={Calendar} />
            <View className="gap-4">
              <DetailRow
                icon={Utensils}
                title="Event Type"
                details={formValues.eventType}
              />
              <DetailRow icon={Calendar} title="Date" details={formattedDate} />

              <DetailRow
                icon={Users}
                title="Guest Count"
                details={formValues.guestCount}
              />
              {formValues.reservationType === "event" && (
                <>
                  <DetailRow
                    icon={Building}
                    title="Venue"
                    details={formValues.venue}
                  />

                  <DetailRow
                    icon={Utensils}
                    title="Service Type"
                    details={formValues.serviceType}
                  />
                  {formValues.serviceType === "Plated" &&
                    formValues.serviceHours && (
                      <DetailRow
                        icon={Clock}
                        title="Service Hours"
                        details={formValues.serviceHours}
                      />
                    )}
                </>
              )}
            </View>
          </CardContent>
        </Card>
      </View>

      <View>
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <SectionTitle title="Selected Menus" icon={Utensils} />
            <View className="grid grid-cols-1 gap-8 ">
              {Object.entries(formValues.selectedMenus).map(
                ([category, menuIds]: [string, SelectedMenus]) => {
                  const menuIdArray = Object.keys(menuIds);
                  if (menuIdArray.length === 0) return null;
                  return (
                    <View key={category} className="gap-4">
                      <Text className="pb-2 font-medium border-gray-100 text-foreground text-md">
                        {category}
                      </Text>
                      <Separator />
                      <View className="gap-3">
                        {menuIdArray.map((id: string) => {
                          const menu = menuItems.find((d) => d._id === id);
                          return menu ? (
                            <View
                              key={id}
                              className="flex-row items-center gap-2 text-foreground"
                            >
                              <View className="flex-row items-center justify-center w-6 h-6 gap-2 border rounded-full bg-green-50 dark:bg-green-500 border-green-50">
                                <Check className="text-foreground" size={16} />
                              </View>
                              <Text className="text-foreground">
                                {menu.name}
                              </Text>
                            </View>
                          ) : null;
                        })}
                      </View>
                    </View>
                  );
                }
              )}
            </View>
          </CardContent>
        </Card>
      </View>

      {(formValues.specialRequests ||
        formValues.deliveryAddress ||
        formValues.deliveryInstructions) && (
        <View>
          <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-6">
              <SectionTitle
                title="Additional Information"
                icon={MessageSquare}
              />
              <View className="gap-6">
                {formValues.specialRequests && (
                  <View className="gap-2">
                    <Text className="flex-row items-center justify-between gap-2 font-mediumtext-foreground text-md">
                      <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                      Special Requests
                    </Text>
                    <Text className="p-3 rounded-md text-smtext-foreground bg-gray-50">
                      {formValues.specialRequests}
                    </Text>
                  </View>
                )}

                {formValues.deliveryAddress && (
                  <View className="gap-2">
                    <Text className="flex-row items-center justify-between gap-2 font-mediumtext-foreground text-md">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      Delivery Address
                    </Text>
                    <Text className="p-3 rounded-md text-smtext-foreground bg-gray-50">
                      {formValues.deliveryAddress}
                    </Text>
                  </View>
                )}

                {formValues.deliveryInstructions && (
                  <View className="gap-2">
                    <Text className="flex-row items-center justify-between gap-2 font-mediumtext-foreground text-md">
                      <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                      Delivery Instructions
                    </Text>
                    <Text className="p-3 rounded-md text-smtext-foreground bg-gray-50">
                      {formValues.deliveryInstructions}
                    </Text>
                  </View>
                )}
              </View>
            </CardContent>
          </Card>
        </View>
      )}
    </ScrollView>
  );
}
