import {
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  GestureResponderEvent,
  ImageSourcePropType,
} from "react-native";
import React, { FC, ReactNode } from "react";

interface CustomButtonProps {
  children?: ReactNode;
  buttonStyles?: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  icon?: ImageSourcePropType;
  iconStyle?: string;
  iconTint?: string;
  label?: string;
  textStyle?: string;
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  buttonStyles,
  onPress,
  disabled,
  icon,
  iconStyle,
  iconTint,
  label,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center flex-row relative rounded-md ${buttonStyles}`}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      onPressOut={() => Keyboard.dismiss()}
    >
      {icon ? (
        <Image
          source={icon}
          className={`${iconStyle}`}
          resizeMode="contain"
          tintColor={iconTint}
        />
      ) : (
        ""
      )}

      {label ? (
        <Text className={`text-base font-bold text-center ${textStyle}`}>
          {label}
        </Text>
      ) : (
        ""
      )}

      {children}
    </TouchableOpacity>
  );
};

export default CustomButton;
