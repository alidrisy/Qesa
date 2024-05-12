import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import Toast from "react-native-toast-message";

import { signUp } from "../../api/apiServices";
import Signup from '../.././assets/icons/signup.svg';

const signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);

    try {
      const response = await signUp(
        form.name,
        form.email,
        form.password,
        form.confirmPassword
      );

      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Account Created!",
          text2: response.data.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log("Google Sign Up");
  };

  const handleFacebookSignUp = () => {
    console.log("Facebook Sign Up");
  };
  return (
    <>
      <SafeAreaView className="bg-white h-full flex-1 items-center justify-center">
        <Toast />
        <ScrollView>
          <View className="w-full h-full">
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            <View className="w-full max-h-[380px] mb-5  overflow-hidden items-center py-2">
              <Signup  width={Dimensions.get('window').width} height={Dimensions.get('window').height * 0.5}/>
            </View>
            <View className="mt-1">
              <FormField
                placeHolder="Name"
                value={form.name}
                handleChangeText={(text) => setForm({ ...form, name: text })}
                otherStyles="mb-4"
              />

              <FormField
                placeHolder="Email"
                value={form.email}
                handleChangeText={(text) => setForm({ ...form, email: text })}
                otherStyles="mb-4"
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

              <FormField
                placeHolder="Confirm Password"
                value={form.confirmPassword}
                handleChangeText={(text) =>
                  setForm({ ...form, confirmPassword: text })
                }
                otherStyles="mb-4"
              />
            </View>
            <View className="mt-4 w-full px-10 h-10 items-center">
              <CustomButton
                title="Sign Up"
                containerStyles="w-full rounded-full h-full bg-blue-950"
                handlePress={handleSignUp}
                textStyles={"text-white text-sm font-nregular"}
              />
            </View>
            <View className="mt-4 w-full px-10 h-10 items-center">
              <Text className="font-nmedium text-sm mb-2">Or Sign up with</Text>
              <View className="flex flex-row space-x-6">
                <TouchableOpacity onPress={handleGoogleSignUp}>
                  <Ionicons name="logo-google" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFacebookSignUp}>
                  <Ionicons name="logo-facebook" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="mt-4 w-full px-10 h-10 items-center">
              <Text className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-800">
                  Login
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

export default signup;
