import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { CheckCircle2Icon, X } from "lucide-react-native";
import { menuItems } from "~/lib/menu-lists";
import type { PackageDetailsDialogProps } from "~/types/package-types";
import { Image, ScrollView, Text } from "react-native";
import { Link } from "expo-router";
import { View } from "react-native";

export default function PackageDetailsDialog({
  pkg,
  open,
  onOpenChange,
  isPlated = false,
  platedInclusions = [],
  isReservationForm = false,
}: PackageDetailsDialogProps) {
  // If no platedInclusions are provided, use the package's own inclusions
  const displayInclusions =
    platedInclusions.length > 0 ? platedInclusions : pkg.inclusions;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-xl w-fViewl p-0 max-h-[85vh] flex flex-col overflow-hidden rounded-md">
        {/* Sticky Header Section */}
        <View className="sticky top-0 z-10 shadow-md bg-background border-t-slate-400">
          {/* Image with fixed height */}
          <View className="relative w-fViewl h-[200px]">
            <Image
              source={{ uri: pkg.imageUrl }}
              alt={pkg.name}
              className="object-cover"
            />
            <View className="absolute top-4 right-16">
              <Badge
                variant={pkg.available ? "default" : "destructive"}
                className={`
                  ${
                    pkg.available
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-red-500"
                  }
                `}
              >
                <Text>{pkg.available ? "Available" : "Unavailable"}</Text>
              </Badge>
            </View>
            <Button
              variant="ghost"
              size="icon"
              className="absolute text-white rounded-fViewl top-4 right-4 bg-black/50 hover:bg-black/70"
              onPress={() => onOpenChange(false)}
            >
              <Text>
                <X className="w-4 h-4" />
              </Text>
            </Button>
          </View>
          {/* Title and Description Section */}
          <View className="p-6 border-b bg-background border-border">
            <DialogTitle className="text-2xl font-bold">{pkg.name}</DialogTitle>
            <Text className="mt-2 text-muted-foreground">
              {pkg.description}
            </Text>
            {!isReservationForm && (
              <View className="flex items-center justify-between px-3 py-2 mt-4 rounded-md bg-primary text-primary-foreground">
                <View>
                  <Text className="text-lg font-bold">
                    {isPlated
                      ? `&#8369; ${pkg.pricePerPaxWithServiceCharge.toFixed(
                          2
                        )} per pax`
                      : `&#8369; ${pkg.pricePerPax.toFixed(2)} per pax`}
                  </Text>
                  {isPlated && (
                    <Text className="block text-xs text-primary-foreground/80">
                      Includes {pkg?.serviceHours} hours service
                    </Text>
                  )}
                </View>
                <Button asChild variant={"secondary"}>
                  <Link href={`/book-now`}>Book Now</Link>
                </Button>
              </View>
            )}
          </View>
        </View>
        {/* Scrollable Content Section */}
        <ScrollView className="flex-grow p-6 overflow-y-auto">
          <View className="grid gap-6">
            <View className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="p-4">
                <Text className="mb-3 text-lg font-semibold">
                  Package Details
                </Text>
                <View className="space-y-2">
                  <View className="flex justify-between">
                    <Text className="text-muted-foreground">
                      Minimum Guests:
                    </Text>
                    <Text>{pkg.minimumPax} pax</Text>
                  </View>
                  <View className="flex justify-between">
                    <Text className="text-muted-foreground">Recommended:</Text>
                    <Text>{pkg.recommendedPax} pax</Text>
                  </View>
                  <View className="flex justify-between">
                    <Text className="text-muted-foreground">
                      Maximum Guests:
                    </Text>
                    <Text>{pkg.maximumPax} pax</Text>
                  </View>
                  {isPlated && (
                    <View className="flex justify-between">
                      <Text className="text-muted-foreground">
                        Service Hours:
                      </Text>
                      <Text>{pkg?.serviceHours} hours</Text>
                    </View>
                  )}
                </View>
              </Card>
              <Card className="p-4 space-y-2">
                <Text className="mb-3 text-lg font-semibold">
                  Menu Options:
                </Text>
                {pkg.options.map((option, index) => (
                  <View key={index} className="flex justify-between">
                    <Text className="text-muted-foreground">
                      {option.category}:
                    </Text>
                    <Text>
                      {option.count} selection{option.count > 1 ? "s" : ""}
                    </Text>
                  </View>
                ))}
              </Card>
            </View>
            <Card className="p-4">
              <Text className="mb-3 text-lg font-semibold">Inclusions</Text>
              <View className="grid grid-cols-1 gap-2">
                {/* Show rice trays for buffet and plated packages */}
                {pkg.packageType === "Event" && (
                  <View className="flex items-center col-span-1 gap-2">
                    <Text className="font-medium">
                      <CheckCircle2Icon className="w-4 h-4 text-green-500" />
                      {Math.ceil(pkg.minimumPax / 2)} trays of steamed rice
                      (good for {pkg.minimumPax / 2} pax)
                    </Text>
                  </View>
                )}
                {displayInclusions.map((inclusion, index) => (
                  <View key={index} className="flex items-center gap-2">
                    <Text className="text-justify">
                      <CheckCircle2Icon className="w-4 h-4 text-green-500" />
                      {inclusion.includes}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
            <Card className="p-4">
              <Text className="mb-3 text-lg font-semibold">
                Sample Menu Selection
              </Text>
              <View className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {pkg.options.map((option, index) => (
                  <View key={index} className="space-y-2">
                    <Text className="font-medium">
                      {option.category} Options
                    </Text>
                    <View className="space-y-1 text-sm">
                      {menuItems
                        .filter((dish) => dish.category === option.category)
                        .slice(0, 3)
                        .map((dish) => (
                          <View
                            key={dish.name}
                            className="flex items-center gap-2"
                          >
                            <Text>
                              <CheckCircle2Icon className="w-4 h-4 text-green-500" />
                              {dish.name}
                            </Text>
                          </View>
                        ))}
                      <View className="text-sm text-muted-foreground">
                        <Text>...and more options available</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </Card>
          </View>
        </ScrollView>
      </DialogContent>
    </Dialog>
  );
}
