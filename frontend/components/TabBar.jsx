import React from "react";
import { Dimensions, FlatList, View, Text, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const TabBar = ({ active }) => {
  return (
    <View className="absolute bottom-0 h-[70px] flex-row justify-evenly items-center w-full bg-slate-600/40">
        <Pressable className="flex justify-center items-center">
            {active !== "home" ? <MaterialCommunityIcons name="home-variant-outline" size={24} color="white" /> : <MaterialCommunityIcons name="home-variant" size={26} color="white" />}
            <Text className="text-[12px] text-center font-medium text-white">Home</Text>
        </Pressable>
        <Pressable className="flex justify-center items-center">
            <Feather name="search" size={24} color="white" />
            <Text className="text-[12px] text-center font-medium text-white">Discover</Text>
        </Pressable>
        <Pressable className="bg-white p-[8px] rounded-full">
            <Ionicons name="add" size={38} color="#0f172a" />
        </Pressable>
        <Pressable>
            {active === "home" ? <MaterialCommunityIcons name="home-variant-outline" size={24} color="white" /> : <MaterialCommunityIcons name="home-variant" size={26} color="white" />}
        </Pressable>
        <Pressable>
            {active === "home" ? <MaterialCommunityIcons name="home-variant-outline" size={24} color="white" /> : <MaterialCommunityIcons name="home-variant" size={26} color="white" />}
        </Pressable>

    </View>
  );
};

export default TabBar;
