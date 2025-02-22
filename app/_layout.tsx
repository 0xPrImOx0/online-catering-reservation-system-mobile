import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import CustomToastConfig from "../components/ToastConfig";
import "../global.css";

const RootLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toast config={CustomToastConfig} />
    </>
  );
};

export default RootLayout;
