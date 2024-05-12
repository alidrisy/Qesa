import { Tabs } from "expo-router";
import { View } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';
import { useState } from "react";

const TabsLayout = () => {
  NavigationBar.setBackgroundColorAsync('#0c0a09')

  return (
    <Tabs screenOptions={{
      tabBarHideOnKeyboard: true,
      tabBarStyle: {height: 65, position: "relative"},
      tabBarLabelStyle: {paddingBottom: 8, marginTop: -10},
    }}>

      <Tabs.Screen  name="Home" options={{
        tabBarIcon: ({ color }) =>{
          const active = color !== 'white' ? <Ionicons name="home-outline" size={24}    color={color} /> : <Ionicons name="home-sharp" size={24} color={color} />;
        return (
          active
        );
      },
        tabBarLabel: "Home",
        headerShown: false,
        tabBarInactiveBackgroundColor: "#0c0a09",
        tabBarActiveBackgroundColor: "#0c0a09",
        tabBarInactiveTintColor: "#8E8E8f",
        tabBarActiveTintColor: "white",
      }}/>

       <Tabs.Screen name="Friends" options={{
        tabBarIcon: ({ color }) =>{  
        return (
          <Ionicons name="search" size={26} color={color} />
        );
      },
        tabBarLabel: "Descover",
        headerShown: false,
        tabBarActiveTintColor: "black",
      }}/>

      <Tabs.Screen name="Add" options={{
        tabBarIcon: ({ color }) =>{
        return (
          <View className={color === '#8E8E8f' ? "absolute z-10 -bottom-[8px] bg-white p-[10px] rounded-full justify-center items-center" : "absolute z-10 -bottom-[8px] bg-rose-700 p-[10px] mt-1 rounded-full justify-center items-center"}>
            <MaterialIcons name="add" size={32} color={color === '#8E8E8f' ? "black" : "white"} />
          </View>
        );
      },
        tabBarLabel: '',
        tabBarShowLabel: true,
        tabBarActiveTintColor: "black",
      }}/>

      <Tabs.Screen name="Chats" options={{
        tabBarIcon: ({ color }) =>{  
        return (
          color === "#8E8E8F" || color === "#8E8E8f" ?<MaterialCommunityIcons name="message-processing-outline" size={24} color={color} /> : <MaterialCommunityIcons name="message-processing" size={24} color={color} />);
      },
        tabBarActiveTintColor: "black",
      }}/>

       <Tabs.Screen name="Profile" options={{
        tabBarIcon: ({ color }) =>{  
        return (
          color === "#8E8E8F" || color === "#8E8E8f" ? <MaterialIcons name="person-outline" size={28} color={color} /> : <MaterialIcons name="person" size={28} color={color} />
        );
      },
        tabBarActiveTintColor: "black",
      }}/>
    </Tabs>
  );
};

export default TabsLayout;
