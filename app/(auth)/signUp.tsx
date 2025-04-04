import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';

export default function SignUpScreen() {
  // State variables for form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle sign up process
  const handleSignUp = () => {
    // Basic form validation
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    // Show loading state
    setLoading(true);
    
    // Simulate API call for sign up
    setTimeout(() => {
      setLoading(false);
      
      // Navigate to home screen after successful sign up
      router.replace('/');
    }, 1500);
  };

  // Function to handle Google sign in
  const handleGoogleSignIn = () => {
    // Implement Google sign in logic here
    Alert.alert('Google Sign In', 'Google sign in would be implemented here');
  };

  return (
    <Container bg="#000" scroll={true} containerStyle="px-0 bg-black">
      {/* Sign up form */}
      <View className="flex-1 justify-center px-6">
      <View className="border-[1.5px] border-white rounded-2xl p-6">
        {/* Header text */}
        <View className="mb-8">
          <Text className="text-white text-4xl font-bold mb-2">Create a new account</Text>
          <Text className="text-gray-400 text-xl">
            Enter your details below to create your account
          </Text>
        </View>

        {/* Full name input */}
        <View className="mb-4">
          <Text className="text-white text-lg mb-2">Full name</Text>
          <TextInput
            className="bg-black text-white border border-gray-700 rounded-xl px-4 py-3 text-lg"
            placeholder="Name"
            placeholderTextColor="#666"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* Email input */}
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

        {/* Password input */}
        <View className="mb-4">
          <Text className="text-white text-lg mb-2">Password</Text>
          <TextInput
            className="bg-black text-white border border-gray-700 rounded-xl px-4 py-3 text-lg"
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Confirm password input */}
        <View className="mb-4">
          <Text className="text-white text-lg mb-2">Confirm Password</Text>
          <TextInput
            className="bg-black text-white border border-gray-700 rounded-xl px-4 py-3 text-lg"
            placeholder="Password"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Sign up button */}
        <CustomButton 
          label={loading ? "Creating account..." : "Create an Account"}
          onPress={handleSignUp}
          disabled={loading}
          buttonStyles="bg-white py-4 rounded-full mb-4"
          textStyle="text-black text-lg"
        />

        {/* Divider */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-700" />
          <Text className="text-gray-400 mx-4">Or continue with</Text>
          <View className="flex-1 h-px bg-gray-700" />
        </View>

        {/* Google sign in button */}
        <CustomButton
          onPress={handleGoogleSignIn}
          buttonStyles="bg-black border border-gray-700 py-4 rounded-full mb-4"
          icon={require('../../assets/google.png')}
          iconStyle="w-5 h-5 mr-2"
          label="Sign in with Google"
          textStyle="text-white text-lg"
        />

        {/* Link to sign in */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-400 text-lg">Already have an account? </Text>
          <Link href="/(auth)/signIn" asChild>
            <TouchableOpacity>
              <Text className="text-white text-lg font-medium">Sign in</Text>
            </TouchableOpacity>
          </Link>
        </View>
        </View>
      </View>
    </Container>
  );
}