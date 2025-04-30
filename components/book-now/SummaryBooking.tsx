"use client";
import { Card, CardContent } from "~/components/ui/card";
import { useReservationForm, type ReservationValues } from "~/hooks/use-reservation-form";
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
import { SelectedMenu } from "~/types/reservation-types";
import { Separator } from "../ui/separator";

export default function SummaryBooking() {
   const { watch } = useFormContext<ReservationValues>();
   const { getMenuItem } = useReservationForm();

   // Use watch to get reactive form values
   const formValues = watch();

   const formattedDate = formValues.reservationDate
     ? formValues.reservationDate.toLocaleDateString("en-US", {
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
      <View className="flex-row gap-2 justify-between items-center">
        <Icon className="mr-2 w-4 h-4" strokeWidth={1.5} color={"white"} />
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
      <View className="flex-row gap-2 items-center mb-4">
        <Icon className="mr-2 w-5 h-5" color={"white"} />
        <Text className="text-lg font-semibold text-foreground">{title}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-32 gap-8"
    >
      <View className="gap-6">
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
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
            <View className="grid grid-cols-1 gap-8">
              {Object.entries(formValues.selectedMenus).map(
                ([category, menuIds]: [string, SelectedMenu]) => {
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
                              className="flex-row gap-2 items-center text-foreground"
                            >
                              <View className="flex-row gap-2 justify-center items-center w-6 h-6 bg-green-50 rounded-full border border-green-50 dark:bg-green-500">
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
                    <Text className="flex-row gap-2 justify-between items-center font-mediumtext-foreground text-md">
                      <MessageSquare className="mr-2 w-4 h-4 text-gray-500" />
                      Special Requests
                    </Text>
                    <Text className="p-3 bg-gray-50 rounded-md text-smtext-foreground">
                      {formValues.specialRequests}
                    </Text>
                  </View>
                )}

                {formValues.deliveryAddress && (
                  <View className="gap-2">
                    <Text className="flex-row gap-2 justify-between items-center font-mediumtext-foreground text-md">
                      <MapPin className="mr-2 w-4 h-4 text-gray-500" />
                      Delivery Address
                    </Text>
                    <Text className="p-3 bg-gray-50 rounded-md text-smtext-foreground">
                      {formValues.deliveryAddress}
                    </Text>
                  </View>
                )}

                {formValues.deliveryInstructions && (
                  <View className="gap-2">
                    <Text className="flex-row gap-2 justify-between items-center font-mediumtext-foreground text-md">
                      <MessageSquare className="mr-2 w-4 h-4 text-gray-500" />
                      Delivery Instructions
                    </Text>
                    <Text className="p-3 bg-gray-50 rounded-md text-smtext-foreground">
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
