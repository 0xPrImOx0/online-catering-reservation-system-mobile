import React, { useState } from "react";
import { View, TextInput, Image } from "react-native";
import { router } from "expo-router";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import { Text } from "~/components/ui/text";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1500);
  };

  return (
    <Container bg="#000" scroll={true} containerStyle="px-0 bg-black">
      <View className="flex-1 justify-center px-6">
        <View className="border-[1.5px] border-white rounded-2xl p-6">
          <View className="mb-8">
            <Text className="mb-2 text-4xl font-bold text-foreground">
              Forgot your password?
            </Text>
            <Text className="text-xl text-gray-400">
              Enter your email address to receive a password reset link
            </Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-lg text-foreground">Email</Text>
            <TextInput
              className="px-4 py-3 text-lg bg-black rounded-xl border border-gray-700 text-foreground"
              placeholder="Email Address"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <CustomButton
            label={loading ? "Sending..." : "Send Reset Link"}
            onPress={handleResetPassword}
            disabled={loading}
            buttonStyles="bg-white py-4 rounded-full mb-4"
            textStyle="text-background text-lg"
          />
        </View>
      </View>
    </Container>
  );
}
