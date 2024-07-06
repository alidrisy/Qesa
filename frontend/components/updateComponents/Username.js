import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useRef, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { debounce } from "lodash";

const USR_REG = /^[a-zA-Z0-9._-]+$/;

const UserName = ({ username, handleUpdateProfile }) => {
  const [isValid, setIsValid] = useState(null);
  const [newUsername, setNewUsername] = useState(username);
  const [validUsername, setValidUsername] = useState(null);
  const [error, setError] = useState("");
  const cancelToken = useRef(null);

  useEffect(() => {
    setValidUsername(true);
    isValid && setIsValid(null);
  }, [newUsername]);

  const handleSubmitUserName = () => {
    if (newUsername.trim().length === 0) {
      inputNameRef.current.focus();
      setValidUsername(false);
      setError("username is required");
      return;
    }
    handleUpdateProfile();
  };

  const checkUsername = debounce(async (username) => {
    if (newUsername === username) return;
    if (cancelToken.current) {
      cancelToken.current.cancel("Operation canceled due to new request.");
    }

    cancelToken.current = axios.CancelToken.source();

    if (newUsername) {
      if (!USR_REG.test(newUsername)) {
        inputNameRef.current.focus();
        setValidUsername(false);
        setError("Allowed: letters, numbers, and ( .  -  _ ) ");
        return;
      }
      if (newUsername.length < 3) {
        inputNameRef.current.focus();
        setValidUsername(false);
        setError("username must be at least 3 characters.");
        return;
      }
      try {
        const response = await axios.post(
          "http://192.168.43.39:8000/api/v1/check-username",
          { username: newUsername.trim() },
          { cancelToken: cancelToken.current.token },
        );
        setIsValid(response.data.isValid);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error);
        }
      }
    } else {
      setIsValid(null);
    }
  }, 800);

  useEffect(() => {
    setIsValid(null);
    checkUsername(newUsername);
    return () => {
      checkUsername.cancel();
    };
  }, [newUsername]);

  return (
    <View className='flex-1 h-full w-full space-y-6 items-center py-5'>
      <View className='text-[23px] w-[90%] space-y-1 font-[700] text-left mb-2 mt-3'>
        <Text className='text-[23px] w-[80%] font-[700] text-left'>
          Profile username
        </Text>
      </View>
      <View className='w-full justify-center  items-center'>
        <TextInput
          placeholder='username'
          value={newUsername}
          onChangeText={setNewUsername}
          className={
            "w-[85%] px-4 py-2 self-center bg-gray-200/60 rounded-full "
          }
          textContentType='username'
          autoComplete='username-new'
          autoCapitalize='none'
          returnKeyType='next'
          onSubmitEditing={handleSubmitUserName}
          autoFocus={true}
        />
        {isValid === false && (
          <View className='items-left w-[80%] flex-row space-x-1 pl-[4px] items-end text-[#8E8E8F] pt-[1px] -mb-3.5'>
            <Ionicons color={"#dc2626"} size={12} name='alert-circle-outline' />
            <Text className='text-[11px] text-center text-red-600 '>
              username is already taken
            </Text>
          </View>
        )}
        {isValid === true && (
          <View className='items-left w-[80%] flex-row space-x-1 pl-[4px] items-end text-[#8E8E8F] pt-[1px] -mb-3.5'>
            <Ionicons
              color={"green"}
              size={12}
              name='checkmark-circle-outline'
            />
            <Text className='text-[11px] text-left text-green-600'>
              username is available
            </Text>
          </View>
        )}
        {!validUsername && (
          <View className='items-left w-[80%] flex-row space-x-1 pl-[4px] items-center text-[#8E8E8F] pt-[1px] -mb-3.5'>
            <Ionicons color={"#dc2626"} size={11} name='warning-outline' />
            <Text className='text-[11px] text-left text-red-600'>{error}</Text>
          </View>
        )}
      </View>
      <Text className='text-[12px] w-[90%] text-center text-[#8E8E8F] my-1'>
        You can only change your profile username once every 7 days.
      </Text>
      <Pressable
        className={
          username.length <= 0
            ? "w-[85%] flex flex-row justify-center bg-rose-600/[0.85] pl-4 h-[45px] rounded-full items-center my-4"
            : "w-[85%] flex flex-row justify-center bg-rose-600 pl-4 h-[45px] rounded-full items-center my-4"
        }
        disabled={username.length <= 0}
        onPress={handleSubmitUserName}
      >
        <Text className='text-[17px] text-white font-[400]'>Save</Text>
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

export default UserName;
