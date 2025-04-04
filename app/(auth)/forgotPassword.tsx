import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    setLoading(true);
    // Implement your password reset logic here
    setTimeout(() => {
      setLoading(false);
      // Show success message or navigate
      router.back();
    }, 1500);
  };

  return (
    <Container bg="#000" scroll={true} containerStyle="px-0 bg-black">
      <View className="flex-1 justify-center px-6">
      <View className="border-[1.5px] border-white rounded-2xl p-6"> 
        <View className="mb-8">
          <Text className="text-white text-4xl font-bold mb-2">Forgot your password?</Text>
          <Text className="text-gray-400 text-xl">
            Enter your email address to receive a password reset link
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-white text-lg mb-2">Email</Text>
          <TextInput
            className="bg-black text-white border border-gray-700 rounded-xl px-4 py-3 text-lg"
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
          textStyle="text-black text-lg"
        />
      </View>
      </View>
    </Container>
  );
}