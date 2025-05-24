"use client";
import { Text } from "~/components/ui/text";
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { Link, router, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../../components/CustomButton";
import api from "~/lib/axiosInstance";
import { useAuthContext } from "~/context/AuthContext";
import { SignInFormValues } from "~/types/auth-types";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "~/hooks/use-auth-form";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export default function SignInScreen() {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control } = form;
  const router = useRouter();
  const [error, setError] = useState("");
  const { customer } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (values: SignInFormValues) => {
    try {
      setLoading(true);
      await api.post("/auth/sign-in", values);
      router.push("/home");
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <FormProvider {...form}>
        <View className="flex-1 justify-center px-6">
          <Card className="p-6 rounded-2xl">
            <View className="mb-8">
              <Text className="mb-2 text-4xl font-bold text-foreground">
                Sign in to your account
              </Text>
              <Text className="text-xl text-gray-400">
                Enter your email below to sign in to your account
              </Text>
            </View>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <View className="mb-4">
                  <Label className="mb-2 text-lg text-foreground">Email</Label>
                  <Input
                    placeholder="Email Address"
                    value={field.value}
                    onChangeText={field.onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
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
                </View>
              )}
            />

            <Link href="/forgotPassword" className="py-4 ml-auto">
              <Text className="text-foreground">Forgot password?</Text>
            </Link>
            <Button
              disabled={loading}
              onPress={() => handleSignIn(form.getValues())}
              className="py-4 mb-4 bg-white rounded-full"
            >
              <Text className="text-lg text-center text-background">
                {loading ? "Signing in..." : "Sign In"}
              </Text>
            </Button>
          </Card>

          <View className="flex-row justify-center mt-6">
            <Text className="text-lg text-gray-400">
              Don't have an account?{" "}
            </Text>
            <Link href="/signUp" asChild>
              <TouchableOpacity>
                <Text className="text-lg font-medium text-foreground">
                  Sign up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </FormProvider>
    </View>
  );
}
