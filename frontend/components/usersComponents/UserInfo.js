import { router } from "expo-router";
import React from "react";
import { View, Text, Image, Pressable } from "react-native";

function UserInfo({ user, me }) {
  const [numberOfLines, setNumberOfLines] = React.useState(2);
  return (
    <View className='space-y-4  items-center w-full pt-5 pb-7 bg-white'>
      <Image
        source={{
          uri: user?.profile_picture || "https://via.placeholder.com/150",
        }}
        className='rounded-full h-[100px] w-[100px]'
      />
      <Text className='text-[16px] font-[500]'>
        @{user?.username || "username"}
      </Text>

      <View className='flex-row w-full justify-evenly bg-white px-3'>
        <View className='bg-white w-[80px] space-y-1'>
          <Text className='text-[16px] font-bold text-center'>
            {user?.following || 0}
          </Text>
          <Text className='text-[14px] text-[#8E8E8F] text-center'>
            Following
          </Text>
        </View>

        <View className='items-center w-[80px] bg-white space-y-1'>
          <Text className='text-[16px] font-bold font-[500] text-center'>
            {user?.followers || 0}
          </Text>
          <Text className='text-[14px] text-[#8E8E8F] text-center'>
            Followers
          </Text>
        </View>
        <View className='items-center w-[80px] bg-white space-y-1'>
          <Text className='text-[16px] font-bold font-[500] text-center'>
            {user?.likes || 0}
          </Text>
          <Text className='text-[14px] text-[#8E8E8F] text-center'>Likes</Text>
        </View>
      </View>
      {user?.username && (
        <View className='items-center bg-white space-y-1 pt-2'>
          <Pressable
            onPress={() =>
              me ? router.push("(user)/EditProfile") : console.log("follow")
            }
            className='items-center justify-center p-2 bg-rose-600 rounded-full px-10'
          >
            <Text className='text-[14px] font-bold text-white'>
              {me ? "Edit" : "Follow"}
            </Text>
          </Pressable>
        </View>
      )}

      {user?.bio && (
        <View className='items-center justify-center w-[70%] bg-white  space-y-1'>
          <Text
            numberOfLines={numberOfLines}
            onPress={() => setNumberOfLines((prev) => (prev === 2 ? 0 : 2))}
            className='text-[13px] text-center'
          >
            {user.bio}
          </Text>
        </View>
      )}
    </View>
  );
}

export default UserInfo;
