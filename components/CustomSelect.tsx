import { View, Text } from "react-native";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SortAsc } from "lucide-react-native";
import { clsx } from "clsx";

//Custom Select Types
export type CustomSelectItemProps = {
  label: string;
  value: string;
};

export type CustomSelectProps = {
  defaultValue: CustomSelectItemProps;
  placeholder: string;
  items: CustomSelectItemProps[];
  size?: "sm" | "md" | "lg";
  value: CustomSelectItemProps;
  onValueChange: (customSelectItemProps: CustomSelectItemProps) => void;
};

const CustomSelect = ({
  defaultValue,
  placeholder,
  items,
  size = "sm",
  value,
  onValueChange,
}: CustomSelectProps) => {
  // Map CustomSelectItemProps to library Option type
  const options: CustomSelectItemProps[] = items.map(({ value, label }) => ({
    value,
    label,
  }));

  // Find matching Option from CustomSelectItemProps
  const selectedOption = options.find((opt) => opt.value === value.value);
  const defaultOption = options.find((opt) => opt.value === defaultValue.value);
  return (
    <Select
      defaultValue={defaultOption}
      value={selectedOption}
      onValueChange={(option) => {
        if (option) {
          onValueChange({ value: option.value, label: option.label });
        }
      }}
    >
      <SelectTrigger
        className={clsx({
          "flex-1": size === "sm",
          "w-[200px] max-w-[200px] ": size === "md",
          "w-[250px] max-w-[250px]": size === "lg",
        })}
      >
        <View className="flex items-center">
          <SortAsc className="mr-2 h-4 w-4" />
          <SelectValue className="" placeholder={placeholder} />
        </View>
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem label={item.label} value={item.value} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
