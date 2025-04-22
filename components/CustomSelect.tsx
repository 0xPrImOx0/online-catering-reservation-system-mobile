import { View } from "react-native";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type Option,
} from "./ui/select";
import { SortAsc } from "lucide-react-native";
import { clsx } from "clsx";

// Custom Select Types
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
  const toOption = (item: CustomSelectItemProps): Option => ({
    value: item.value,
    label: item.label,
  });

  const selectedOption = toOption(value);
  const defaultOption = toOption(defaultValue);

  return (
    <Select
      defaultValue={defaultOption}
      value={selectedOption}
      onValueChange={(option) => {
        if (option) onValueChange({ value: option.value, label: option.label });
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
          <SelectValue placeholder={placeholder} />
        </View>
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value} label={item.label}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
