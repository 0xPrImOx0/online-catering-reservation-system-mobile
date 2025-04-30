"use client";
import { Card, CardContent } from "~/components/ui/card";
import {
  useReservationForm,
  type ReservationValues,
} from "~/hooks/use-reservation-form";
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
  MessageCircleDashed,
  CalendarClock,
} from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { SelectedMenu } from "~/types/reservation-types";
import { Separator } from "../ui/separator";

export default function SummaryBooking() {
  const { watch } = useFormContext<ReservationValues>();
  const { getPackageItem } = useReservationForm();

  // Use watch to get reactive form values
  const formValues = watch();

  const formattedDate = formValues.reservationDate
    ? new Date(formValues.reservationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";

  const formattedTime = formValues.reservationTime
    ? `${formValues.reservationTime} ${formValues.period}`
    : "No time selected";

  const currency = (amount: number) =>
    amount ? `₱${Number(amount).toLocaleString()}` : "₱0";

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
      {/* Customer Information */}
      <Card className="overflow-hidden border-none shadow-md">
        <CardContent className="p-6">
          <SectionTitle title="Customer Information" icon={User} />
          <View className="gap-4">
            <DetailRow icon={User} title="Name" details={formValues.fullName} />
            <DetailRow icon={Mail} title="Email" details={formValues.email} />
            <DetailRow
              icon={Phone}
              title="Phone"
              details={formValues.contactNumber}
            />
          </View>
        </CardContent>
      </Card>

      {/* Event/Order Details */}
      <Card className="overflow-hidden border-none shadow-md">
        <CardContent className="p-6">
          <SectionTitle title="Event / Order Details" icon={CalendarClock} />
          <View className="gap-4">
            <DetailRow icon={Calendar} title="Date" details={formattedDate} />
            <DetailRow icon={Clock} title="Time" details={formattedTime} />
            <DetailRow
              icon={Users}
              title="Guest Count"
              details={formValues.guestCount}
            />
            {formValues.reservationType === "event" && (
              <>
                {formValues.eventType != "No Event" && (
                  <DetailRow
                    icon={Utensils}
                    title="Event Type"
                    details={formValues.eventType}
                  />
                )}
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
                {formValues.serviceType === "Plated" && (
                  <DetailRow
                    icon={Clock}
                    title="Service Hours"
                    details={formValues.serviceHours as string}
                  />
                )}
              </>
            )}
          </View>
        </CardContent>
      </Card>

      {/* Package Selection */}
      {formValues.selectedPackage ? (
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <SectionTitle title="Selected Package" icon={Check} />
            <Text className="font-medium text-foreground text-md">
              {getPackageItem(formValues.selectedPackage)?.name}
            </Text>
          </CardContent>
        </Card>
      ) : null}

      {/* Selected Menus */}
      {formValues.selectedMenus &&
        Object.keys(formValues.selectedMenus).length > 0 && (
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
                                  <Check
                                    className="text-foreground"
                                    size={16}
                                  />
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
        )}

      {/* Payment & Status */}
      <Card className="overflow-hidden border-none shadow-md">
        <CardContent className="p-6">
          <SectionTitle title="Payment & Status" icon={Check} />
          <View className="gap-4">
            <DetailRow
              icon={Check}
              title="Total Price"
              details={currency(formValues.totalPrice)}
            />
            <DetailRow
              icon={Check}
              title="Service Fee"
              details={currency(formValues.serviceFee)}
            />
            <DetailRow
              icon={Check}
              title="Delivery Fee"
              details={currency(formValues.deliveryFee)}
            />
            <DetailRow
              icon={Check}
              title="Payment Reference"
              details={formValues.paymentReference as string}
            />
            <DetailRow
              icon={Check}
              title="Status"
              details={formValues.status}
            />
          </View>
        </CardContent>
      </Card>

      {/* Delivery Details */}
      {formValues.deliveryOption === "Delivery" &&
        formValues.deliveryAddress &&
        formValues.deliveryInstructions && (
          <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-6">
              <SectionTitle title="Delivery Details" icon={MapPin} />
              <View className="gap-4">
                <DetailRow
                  icon={MapPin}
                  title="Delivery Option"
                  details={formValues.deliveryOption}
                />
                {formValues.deliveryAddress && (
                  <DetailRow
                    icon={MapPin}
                    title="Address"
                    details={formValues.deliveryAddress}
                  />
                )}
                {formValues.deliveryInstructions && (
                  <DetailRow
                    icon={MessageSquare}
                    title="Instructions"
                    details={formValues.deliveryInstructions}
                  />
                )}
              </View>
            </CardContent>
          </Card>
        )}

      {/* Additional Information */}
      {(formValues.specialRequests ||
        formValues.createdAt ||
        formValues.updatedAt) && (
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <SectionTitle title="Additional Information" icon={MessageSquare} />
            <View className="gap-4">
              {formValues.specialRequests && (
                <DetailRow
                  icon={MessageCircleDashed}
                  title="Special Requests"
                  details={formValues.specialRequests}
                />
              )}
              {formValues.createdAt && (
                <DetailRow
                  icon={Clock}
                  title="Created At"
                  details={new Date(formValues.createdAt).toLocaleString()}
                />
              )}
              {formValues.updatedAt && (
                <DetailRow
                  icon={Clock}
                  title="Last Updated"
                  details={new Date(formValues.updatedAt).toLocaleString()}
                />
              )}
            </View>
          </CardContent>
        </Card>
      )}
    </ScrollView>
  );
}
