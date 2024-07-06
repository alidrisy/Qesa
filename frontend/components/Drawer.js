import { useState, useRef, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import BottomDrawer from "react-native-animated-bottom-drawer";
import PagerView from "react-native-pager-view";
import { Ionicons } from "@expo/vector-icons";
import Google from "../assets/icons/google.svg";
import * as NavigationBar from "expo-navigation-bar";
import { router, Link } from "expo-router";

const SignUpDrawer = ({ signupDrawerRef }) => {
  const pageRef = useRef(null);

  const handlePush = (path) => {
    signupDrawerRef.current.close();
    router.push(path);
  };

  useEffect(() => {
    const changeNavigationBarColor = () => {
      NavigationBar.setBackgroundColorAsync("black");
    };

    changeNavigationBarColor();
  }, []);

  return (
    <BottomDrawer
      enableSnapping
      snapPoints={[600]}
      gestureMode='handle'
      ref={signupDrawerRef}
    >
      <View className='h-[600px] items-center w-full'>
        <Pressable className='absolute right-5 -top-4'>
          <Ionicons name='help-circle-outline' size={26} />
        </Pressable>
        <PagerView
          className='h-[570px] w-full'
          orientation={"horizontal"}
          initialPage={0}
          scrollEnabled={false}
          ref={pageRef}
        >
          <View
            className='h-[570px] items-center space-y-5 px-5 pt-7 w-full'
            key={0}
          >
            <View className='items-center w-[90%] space-y-1.5 pb-7'>
              <Text className='text-[22px] font-bold text-center'>
                Sign up for Qesa
              </Text>
              <Text className='text-[13px] text-[#8E8E8F] text-center'>
                Create an account, follow other accounts, make your own videos
                and Keep your favorite videos at your fingertips.
              </Text>
            </View>
            <Pressable
              className='w-[90%] flex-row justify-between bg-rose-600 pl-4 h-[50px] rounded-full items-center'
              onPress={() => handlePush("/(auth)/Signup")}
            >
              <Ionicons
                name='person-outline'
                className='left-0'
                size={22}
                color='white'
              />
              <Text className='text-[17px] font-semibold right-5 justify-center text-white text-center w-full'>
                Use email{" "}
              </Text>
            </Pressable>
            <Pressable className='w-[90%] flex-row justify-between pl-4 h-[50px] border border-[#8E8E8F]/70 rounded-full items-center'>
              <Google height={22} width={22} className='left-5 h-2 w-2' />
              <Text className='text-[17px] font-semibold right-5 justify-center text-center w-full'>
                Continue with Google{" "}
              </Text>
            </Pressable>
            <View className='absolute bottom-0 items-center left-0 right-0 space-y-4'>
              <Text className='text-[12px] w-[90%] text-center text-[#8E8E8F]'>
                By continuing, You agree to Qesa Terms of Service and confirm
                that you have read Qesa's Privacy Policy.{" "}
              </Text>
              <Pressable
                className='flex-row w-full justify-center bg-gray-100 p-5'
                onPress={() => pageRef.current.setPage(1)}
              >
                <Text className='text-[14px] font-[500] text-center'>
                  Don't have an account?{" "}
                </Text>
                <Text className='text-[14px] font-[500] text-center text-rose-600'>
                  Log in
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            className='h-[570px] items-center space-y-5 px-5 pt-7 w-full'
            key={1}
          >
            <View className='items-center w-[90%] space-y-1.5 pb-7'>
              <Text className='text-[22px] font-bold text-center'>
                Log in to Qesa
              </Text>
              <Text className='text-[13px] text-[#8E8E8F] text-center'>
                Welcome back to the fun! Log in to connect with your friends,
                share your latest creations, and explore new content tailored
                just for you.
              </Text>
            </View>
            <Pressable
              className='w-[90%] flex-row justify-between bg-rose-600 pl-4 h-[50px] rounded-full items-center'
              onPress={() => handlePush("(auth)/Login")}
            >
              <Ionicons
                name='person-outline'
                className='left-0'
                size={22}
                color='white'
              />
              <Text className='text-[17px] font-semibold right-5 justify-center text-white text-center w-full'>
                Use email / username{" "}
              </Text>
            </Pressable>
            <Pressable className='w-[90%] flex-row justify-between pl-4 h-[50px] border border-[#8E8E8F]/70 rounded-full items-center'>
              <Google height={22} width={22} className='left-5 h-2 w-2' />
              <Text className='text-[17px] font-semibold right-5 justify-center text-center w-full'>
                Continue with Google{" "}
              </Text>
            </Pressable>
            <View className='absolute bottom-0 items-center left-0 right-0 space-y-4'>
              <Pressable
                className='flex-row w-full bg-gray-100 justify-center p-5'
                onPress={() => pageRef.current.setPage(0)}
              >
                <Text className='text-[14px] font-[500] text-center'>
                  Already have an account?{" "}
                </Text>
                <Text className='text-[14px] font-[500] text-center text-rose-600'>
                  Sign in
                </Text>
              </Pressable>
            </View>
          </View>
        </PagerView>
      </View>
    </BottomDrawer>
  );
};

export default SignUpDrawer;
