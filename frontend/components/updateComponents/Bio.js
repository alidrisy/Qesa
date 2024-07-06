import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

const Bio = ({ bio, setBio, handleUpdateProfile }) => {
  return (
    <View className='flex-1 h-full w-full space-y-6 items-center py-5'>
      <View className='text-[23px] w-[90%] space-y-1 font-[700] text-left mb-2 mt-3'>
        <Text className='text-[23px] w-[80%] font-[700] text-left'>
          Profile bio
        </Text>
      </View>
      <View className='w-full justify-center  items-center'>
        <TextInput
          placeholder='bio'
          value={bio}
          onChangeText={setBio}
          className={
            "w-[85%] px-4 py-2 self-center bg-gray-200/60 rounded-3xl "
          }
          multiline={true}
          onSubmitEditing={handleUpdateProfile}
          autoFocus={true}
        />
      </View>
      <Pressable
        className={
          bio.length <= 0
            ? "w-[85%] flex flex-row justify-center bg-rose-600/[0.85] pl-4 h-[45px] rounded-full items-center my-4"
            : "w-[85%] flex flex-row justify-center bg-rose-600 pl-4 h-[45px] rounded-full items-center my-4"
        }
        disabled={bio.length <= 0}
        onPress={handleUpdateProfile}
      >
        <Text className='text-[17px] text-white font-[400]'>Next</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  success: {
    color: "green",
    marginTop: 10,
  },
});

export default Bio;
