import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import CustomButton from "../components/CustomButton";


export default function App() {
  return (
    <>
      <View className="bg-white h-[full] flex-1 items-center justify-center">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="justify-center items-center h-[85vh]">
            <Text className="font-nbold text-2xl">Welcome to ChatMK.</Text>
            <Text className="font-nlight text-sm text-center mt-3 w-72">
              Your go-to place for chatting. Share moments, send messages, and
              connect with the people you care about.
            </Text>
            <CustomButton
              title="Get Started"
              containerStyles="mt-7 w-full min-h-[62px] bg-blue-800/95"
              handlePress={() => router.push("/signup")}
            />
            <CustomButton
              title="Get Started"
              containerStyles="mt-7 w-full min-h-[62px] bg-blue-800/95"
              handlePress={() => router.push("/MainScreen")}
            />
          </View>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </>
  );
}
