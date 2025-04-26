import { Minus, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
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
  const quantity = value[category]?.[menu]?.quantity ?? 0;
  const [textValue, setTextValue] = useState(quantity.toString());

  useEffect(() => {
    setTextValue((value[category]?.[menu]?.quantity ?? 0).toString());
  }, [value, category, menu]);
  const handleChangeText = (text: string) => {
    setTextValue(text); // Update local state for smooth typing
    const newCount = parseInt(text, 10);
    if (!isNaN(newCount) && newCount >= 0) {
      onChange({
        ...value,
        [category]: {
          ...value[category],
          [menu]: {
            ...value[category]?.[menu],
            quantity: newCount,
          },
        },
      });
    }
  };
  return (
    <View className="flex-row items-center border rounded-md border-border">
      <TouchableOpacity
        onPress={() => handleReduceQuantity(value, category, menu, onChange)}
        className="px-2"
      >
        <Minus size={20} color={"white"} />
      </TouchableOpacity>
      <Input
        value={textValue}
        onChangeText={handleChangeText}
        className="z-10 w-12 p-0 text-center border rounded-none border-y-0 text-foreground"
      />
      <TouchableOpacity
        onPress={() => handleAddQuantity(value, category, menu, onChange)}
        className="px-2"
      >
        <Plus size={20} color={"white"} className="z-0" />
      </TouchableOpacity>
    </View>
  );
}
