import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRef, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { debounce } from "lodash";

const EMAIL_REG = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USR_REG = /^[a-zA-Z0-9._-]+$/;

const UserName = ({
  email,
  setEmail,
  username,
  setUsername,
  setPage,
  name,
}) => {
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);

  const [validEmail, setValidEmail] = useState(true);
  const [isValid, setIsValid] = useState(null);
  const [validUsername, setValidUsername] = useState(null);
  const [error, setError] = useState("");
  const cancelToken = useRef(null);

  useEffect(() => {
    setValidEmail(true);
    setValidUsername(true);
    isValid && setIsValid(null);
  }, [email, username]);

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  const handleSubmitUserName = () => {
    if (!EMAIL_REG.test(email.trim())) {
      setValidEmail(false);
      inputEmailRef.current.blurOnSubmit = false;
      return;
    }
    if (username.trim().length === 0) {
      inputNameRef.current.focus();
      setValidUsername(false);
      setError("username is required");
      return;
    }
    setPage(2);
  };

  const checkUsername = debounce(async (username) => {
    if (cancelToken.current) {
      cancelToken.current.cancel("Operation canceled due to new request.");
    }

    cancelToken.current = axios.CancelToken.source();

    if (username) {
      if (!USR_REG.test(username)) {
        inputNameRef.current.focus();
        setValidUsername(false);
        setError("Allowed: letters, numbers, and ( .  -  _ ) ");
        return;
      }
      if (username.length < 3) {
        inputNameRef.current.focus();
        setValidUsername(false);
        setError("username must be at least 3 characters.");
        return;
      }
      try {
        const response = await axios.post(
          "http://192.168.43.39:8000/api/v1/check-username",
          { username: username.trim() },
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
    checkUsername(username);
    return () => {
      checkUsername.cancel();
    };
  }, [username]);

  return (
    <View className='flex-1 h-full w-full space-y-6 items-center py-5'>
      <View className='text-[23px] w-[90%] space-y-1 font-[700] text-left mb-2 mt-3'>
        <Text className='text-[23px] w-[80%] font-[700] text-left'>
          Your journey starts here.
        </Text>
        <Text className='text-[14px] w-[80%] pl-2 text-[#8E8E8F]  text-left'>
          Enter your email and pick a unique username to shape your online
          identity.
        </Text>
      </View>
      <View className='w-full justify-center  items-center'>
        <TextInput
          placeholder='username'
          value={username}
          onChangeText={setUsername}
          ref={inputNameRef}
          className={
            "w-[85%] px-4 py-2 self-center bg-gray-200/60 rounded-full "
          }
          textContentType='username'
          autoComplete='username-new'
          autoCapitalize='none'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => inputEmailRef.current.focus()}
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
      <View className='w-full justify-center  items-center'>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          ref={inputEmailRef}
          className='input w-[85%] px-4 py-2 self-center bg-gray-200/60 rounded-full'
          textContentType='emailAddress'
          autoComplete='email'
          inputMode='email'
          keyboardType='email-address'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={handleSubmitUserName}
          autoCapitalize='none'
        />
        {!validEmail && (
          <View className='items-left w-[80%] flex-row space-x-1 pl-[4px] items-center text-[#8E8E8F] pt-[1px] -mb-3.5'>
            <Ionicons color={"#dc2626"} size={11} name='warning-outline' />
            <Text className='text-[11px] text-left text-red-600'>
              Invalid email. Please enter a valid email address.
            </Text>
          </View>
        )}
      </View>
      <Text className='text-[12px] w-[90%] text-center text-[#8E8E8F] my-1'>
        By continuing, You agree to Qesa Terms of Service and confirm that you
        have read Qesa's Privacy Policy.{" "}
      </Text>
      <Pressable
        className={
          email.length * username.length <= 0
            ? "w-[85%] flex flex-row justify-center bg-rose-600/[0.85] pl-4 h-[45px] rounded-full items-center my-4"
            : "w-[85%] flex flex-row justify-center bg-rose-600 pl-4 h-[45px] rounded-full items-center my-4"
        }
        disabled={email.length * username.length <= 0}
        onPress={handleSubmitUserName}
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

export default UserName;
