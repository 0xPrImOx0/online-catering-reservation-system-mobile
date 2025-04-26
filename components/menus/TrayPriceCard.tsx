import { Text, View } from "react-native";
import { Card } from "../ui/card";
import { useCallback } from "react";

export default function TrayPriceCard({
  data,
  regularPrice,
}: {
  data: {
    minimumPax: number;
    maximumPax: number;
    price: number;
    discount: number;
  };
  regularPrice: number;
}) {
  type CalculationParams = {
    regularPricePerPax: number;
    price: number;
    servingSize: number;
  };
  const { minimumPax, maximumPax, price } = data;
  const calculatePricePerPax = useCallback(
    (price: number, maximumPax: number): number => price / maximumPax,
    []
  );
  const calculateSavings = useCallback(
    ({ regularPricePerPax, price, servingSize }: CalculationParams): number =>
      regularPricePerPax * servingSize - price,
    []
  );

  return (
    <Card
      key={maximumPax}
      className="flex-row items-center justify-between p-2 rounded-md"
    >
      <View className="">
        <Text className="font-medium text-foreground">
          {`${minimumPax} - ${maximumPax}`} pax
        </Text>
        <Text className="text-sm text-muted-foreground">
          &#8369; {calculatePricePerPax(price, maximumPax).toFixed(2)} per
          person
        </Text>
      </View>
      <View className="">
        <Text className="font-bold">&#8369; {price.toFixed(2)}</Text>
        <Text className="text-sm text-emerald-600 dark:text-emerald-400">
          &#8369;
          {calculateSavings({
            regularPricePerPax: regularPrice,
            price,
            servingSize: maximumPax,
          })}{" "}
          Saved
        </Text>
      </View>
    </Card>
  );
}
