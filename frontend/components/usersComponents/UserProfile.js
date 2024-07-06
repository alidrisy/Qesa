import React from "react";
import { FlatList, View, Image, Text, Pressable } from "react-native";
import UserInfo from "./UserInfo";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import formatNumber from "../../utils/formatNumbers";

const UserProfile = ({ data, user, EmptyList, me, handleOpen }) => {
  return (
    <View className='flex-1 justify-between items-center w-full pt-2 bg-white'>
      <View className='h-[35px] flex-row justify-between items-center  w-full'>
        {me ? (
          <View className='flex justify-center items-center w-6 ml-2.5' />
        ) : (
          <Pressable className='flex justify-center items-center w-7 ml-2.5'>
            <MaterialCommunityIcons name='arrow-left' size={26} color='black' />
          </Pressable>
        )}
        <Text className={"text-[18px] font-[500]"}>
          {user?.first_name || "Profile"}
        </Text>
        <Pressable
          onPress={() => console.log("menu")}
          className='flex justify-center items-center mr-2.5  '
        >
          <MaterialCommunityIcons
            name='dots-vertical'
            size={24}
            color='black'
          />
        </Pressable>
      </View>
      <FlatList
        data={data}
        className='flex-1 w-full'
        keyExtractor={(item, index) => index}
        ListHeaderComponent={() => <UserInfo user={user} me={me} />}
        ListFooterComponent={() => <View className='h-5' />}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        horizontal={false}
        ListEmptyComponent={() => <EmptyList />}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => handleOpen(index)}
            className='flex flex-row justify-center items-center w-[33.5%] p-[1.5px] bg-white'
          >
            <Image
              source={{
                uri:
                  item.video_url ||
                  item.thumbnail_url ||
                  "https://via.placeholder.com/150",
              }}
              className='rounded-lg h-[160px] w-[100%]'
            />
            <View className='absolute space-x-[2px] justify-center items-center flex-row left-2 bottom-2'>
              <Ionicons name='play-outline' size={16} color='white' />
              <Text className='text-white text-[11px] font-[400]'>
                {formatNumber(item.views)}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default UserProfile;
