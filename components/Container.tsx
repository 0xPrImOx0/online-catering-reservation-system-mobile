import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from "react-native";
import React, { FC, ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps {
  children?: ReactNode;
  containerStyle?: string;
  scroll?: boolean;
  scrollStyles?: ViewStyle;
  bg?: string;
  viewStyle?: string;
  keyboardShouldPersistTaps?: boolean | "always" | "handled" | "never";
}

const Container: FC<ContainerProps> = ({
  children,
  scroll = true,
  bg = "#fff",
  containerStyle,
  keyboardShouldPersistTaps = "handled",
  scrollStyles,
  viewStyle,
}) => {
  return (
    <SafeAreaView className={`bg-[${bg}] h-full flex-1 ${containerStyle}`}>
      <KeyboardAvoidingView
        className={"flex-1 justify-center"}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={32}
      >
        {scroll ? (
          <ScrollView
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            contentContainerStyle={{
              minHeight: "100%",
              position: "relative",
              ...(scrollStyles as ViewStyle), // Merge external styles
            }}
          >
            {children}
          </ScrollView>
        ) : (
          <View className={`${viewStyle}`}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Container;
