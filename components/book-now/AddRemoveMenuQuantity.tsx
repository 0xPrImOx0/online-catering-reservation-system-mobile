import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useReservationForm } from "~/hooks/use-reservation-form";

export default function AddRemoveMenuQuantity({
  value,
  category,
  menu,
  onChange,
}: {
  value: any;
  category: string;
  menu: string;
  onChange: (value: any) => void;
}) {
  const { handleReduceQuantity, handleAddQuantity } = useReservationForm();

  return (
    <View className="flex items-center">
      <Button
        variant={"outline"}
        // type="button"
        onPress={() => handleReduceQuantity(value, category, menu, onChange)}
        className="flex items-center justify-center border-r-0 rounded-r-none w-9 h-9"
      >
        -
      </Button>
      <Input
        // type="number"
        // min="0"
        value={value[category][menu]?.quantity || 0}
        onChangeText={(e: string) => {
          const newCount = parseInt(e, 10);
          if (!isNaN(newCount) && newCount >= 0) {
            onChange({
              ...value,
              [category]: {
                ...value[category],
                [menu]: newCount,
              },
            });
          }
        }}
        className="z-10 w-12 p-0 text-center border rounded-none no-spinners"
      />
      <Button
        variant={"outline"}
        // type="button"
        onPress={() => handleAddQuantity(value, category, menu, onChange)}
        className="flex items-center justify-center border-l-0 rounded-l-none w-9 h-9"
      >
        +
      </Button>
    </View>
  );
}
