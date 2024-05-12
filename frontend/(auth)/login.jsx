import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import Signin from '../.././assets/icons/signin.svg';

const login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handlelogin = async () => {
    console.log("login");
  };

  const handleGooglelogin = () => {
    console.log("Google login");
  };

  const handleFacebooklogin = () => {
    console.log("Facebook login");
  };
  return (
    <>
      <SafeAreaView className="bg-white h-full flex-1 items-center justify-center">
        <ScrollView>
          <View className="w-full h-full">
          <View className="w-full max-h-[380px] mb-5  overflow-hidden items-center py-2">
              <Signin  width={Dimensions.get('window').width} height={Dimensions.get('window').height * 0.50}/>
            </View>
            <View className="mt-4">
              <FormField
                placeHolder="Email"
                value={form.email}
                handleChangeText={(text) => setForm({ ...form, email: text })}
                otherStyles="mb-6"
                keyboardType="email-address"
              />

              <FormField
                placeHolder="Password"
                value={form.password}
                handleChangeText={(text) =>
                  setForm({ ...form, password: text })
                }
                otherStyles="mb-4"
              />
            </View>
            <View className="mt-4 w-full px-10 h-10 items-center">
              <CustomButton
                title="Login"
                containerStyles="w-full rounded-full h-full bg-blue-950"
                handlePress={() => {}}
                textStyles={"text-white text-sm font-nregular"}
              />
            </View>
            <View className="mt-4 w-full px-10 h-10 items-center">
              <Text className="font-nmedium text-sm mb-2">Or Login with</Text>
              <View className="flex flex-row space-x-6">
                <TouchableOpacity onPress={handleGooglelogin}>
                  <Ionicons name="logo-google" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFacebooklogin}>
                  <Ionicons name="logo-facebook" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="mt-4 w-full px-10 h-10 items-center">
              <Text className="text-center text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-800">
                  Sign Up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

export default login;
