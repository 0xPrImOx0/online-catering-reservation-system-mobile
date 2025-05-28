import { Text } from "~/components/ui/text";
import { View, TouchableOpacity, Alert } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SignUpFormValues } from "~/types/auth-types";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "~/hooks/use-auth-form";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import api from "~/lib/axiosInstance";

export default function SignUpScreen() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleSignUp = async (values: SignUpFormValues) => {
    try {
      await api.post("/auth/sign-up", values);
      router.replace("/(auth)/signIn");
    } catch (error) {
      console.error("Sign up error:", error);
      Alert.alert("Error", "Failed to create account. Please try again.");
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google sign in logic here
    Alert.alert("Google Sign In", "Google sign in would be implemented here");
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <FormProvider {...form}>
        <View className="flex-1 justify-center px-6">
          <Card className="p-6 rounded-2xl">
            <View className="mb-8">
              <Text className="mb-2 text-4xl font-bold text-foreground">
                Create a new account
              </Text>
              <Text className="text-xl text-gray-400">
                Enter your details below to create your account
              </Text>
            </View>

            <Controller
              name="fullName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <View className="mb-4">
                  <Label className="mb-2 text-lg text-foreground">
                    Full Name
                  </Label>
                  <Input
                    placeholder="Full Name"
                    value={field.value}
                    onChangeText={field.onChange}
                    autoCapitalize="words"
                  />
                  {error?.message && (
                    <Text className="mt-1 text-sm text-red-500">
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <View className="mb-4">
                  <Label className="mb-2 text-lg text-foreground">Email</Label>
                  <Input
                    placeholder="Email Address"
                    value={field.value}
                    onChangeText={field.onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {error?.message && (
                    <Text className="mt-1 text-sm text-red-500">
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <View className="mb-4">
                  <Label className="mb-2 text-lg text-foreground">
                    Password
                  </Label>
                  <Input
                    placeholder="Password"
                    value={field.value}
                    onChangeText={field.onChange}
                    secureTextEntry
                  />
                  {error?.message && (
                    <Text className="mt-1 text-sm text-red-500">
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <View className="mb-6">
                  <Label className="mb-2 text-lg text-foreground">
                    Confirm Password
                  </Label>
                  <Input
                    placeholder="Confirm Password"
                    value={field.value}
                    onChangeText={field.onChange}
                    secureTextEntry
                  />
                  {error?.message && (
                    <Text className="mt-1 text-sm text-red-500">
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Button
              onPress={handleSubmit(handleSignUp)}
              disabled={isSubmitting}
              className="py-4 mb-4 bg-white rounded-full"
            >
              <Text className="text-lg font-medium text-center text-background">
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Text>
            </Button>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-400">Already have an account? </Text>
              <Link href="/(auth)/signIn" asChild>
                <TouchableOpacity>
                  <Text className="font-medium text-foreground">Sign in</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </Card>
        </View>
      </FormProvider>
    </View>
  );
}
