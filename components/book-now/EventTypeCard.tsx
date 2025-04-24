import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { EventTypeCardProps } from "~/types/package-types";
import { Separator } from "~/components/ui/separator";
import { ArrowUpRightIcon } from "lucide-react-native";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "../ui/button";
import { Text, View } from "react-native";

export default function EventTypeCard({
  eventType,
  onSelect,
  image = "",
}: EventTypeCardProps) {
  return (
    <Button onPress={() => onSelect(eventType)}>
      <Card className="flex flex-1 overflow-hidden min-h-[400px] rounded-lg border cursor-pointer">
        {/* <View className="flex-1">
        <Image
          src={
            image || `/placeholder.svg?height=200&width=200&text=${eventType}`
          }
          width={1200}
          height={800}
          alt={eventType}
          className="object-cover w-full h-full"
        />
      </View> */}
        <Skeleton className="flex-1" />
        <View className="flex flex-col justify-between flex-1 p-4">
          <CardHeader className="flex flex-col justify-between p-0">
            <CardTitle className="text-3xl font-semibold">
              {eventType} Events
            </CardTitle>
            {/* <CardDescription>
            Specialized catering packages for {eventType.toLowerCase()} events
            and celebrations
          </CardDescription> */}
          </CardHeader>
          <CardContent className="p-0">
            <Text className="text-base text-justify text-muted-foreground">
              {eventType === "Birthday" &&
                "Celebrate your special day with our delicious Filipino cuisine."}
              {eventType === "Wedding" &&
                "Make your wedding reception memorable with our exquisite catering services."}
              {eventType === "Corporate" &&
                "Impress your colleagues and clients with our professional catering."}
              {eventType === "Graduation" &&
                "Celebrate academic achievements with our special graduation packages."}
            </Text>
          </CardContent>
          <View className="flex flex-col">
            <Separator decorative className="h-1 bg-foreground" />
            <CardFooter className="flex items-center justify-center p-0 pt-4 ">
              <Text className="flex-1 text-lg font-medium">View Details</Text>
              <View className="p-2 border rounded-full border-foreground">
                <ArrowUpRightIcon className="w-7 h-7" />
              </View>
            </CardFooter>
          </View>
        </View>
      </Card>
    </Button>
  );
}
