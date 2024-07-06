import { View, Text, Pressable, TextInput } from "react-native";
import { useRef, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
const LogInfo = ({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmitData = () => {
    if (username.trim().length === 0) {
      usernameRef.current.focus();
      return;
    }
    if (password.trim().length < 3) {
      passwordRef.current.focus();
      return;
    }
    handleSubmit();
  };

  return (
    <View className='flex-1 h-full w-full space-y-6 items-center py-5'>
      <View className='text-[23px] w-[90%] space-y-1 font-[700] text-left mb-2 mt-3'>
        <Text className='text-[23px] w-[80%] font-[700] text-left'>
          Welcome back!
        </Text>
        <Text className='text-[14px] w-[80%] pl-2 text-[#8E8E8F]  text-left'>
          To log in, enter your email or your username and password.
        </Text>
      </View>
      <View className='w-full justify-center  items-center'>
        <TextInput
          placeholder='Email or username'
          value={username}
          onChangeText={setUsername}
          ref={usernameRef}
          className='input w-[85%] px-4 py-2 self-center bg-gray-200/60 rounded-full'
          textContentType='emailAddress'
          autoComplete='email'
          inputMode='email'
          keyboardType='email-address'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current.focus()}
          autoCapitalize='none'
        />
      </View>
      <View className='relative  w-full justify-center  items-center pb-8'>
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          ref={passwordRef}
          className='input w-[85%] px-4 py-2 self-center bg-gray-200/60 rounded-full'
          secureTextEntry={passwordVisible}
          textContentType='password'
          returnKeyType='next'
          onSubmitEditing={handleSubmitData}
          maxLength={20}
          blurOnSubmit={false}
          autoFocus
        />
        <Pressable
          hitSlop={10}
          onPress={() => setPasswordVisible(!passwordVisible)}
          className='absolute z-20 top-[11px] right-[44px]'
        >
          <Ionicons
            name={!passwordVisible ? "eye-off-outline" : "eye-outline"}
            size={21}
            color='black'
          />
        </Pressable>
      </View>
      <Pressable
        className={
          password.length < 8 || username.length <= 0
            ? "w-[85%] flex flex-row justify-center bg-rose-600/[0.85] pl-4 h-[45px] rounded-full items-center my-4"
            : "w-[85%] flex flex-row justify-center bg-rose-600 pl-4 h-[45px] rounded-full items-center my-4"
        }
        disabled={password.length < 8 || username.length <= 0}
        onPress={handleSubmitData}
      >
        <Text className='text-[17px] text-white font-[400]'>Next</Text>
      </Pressable>
    </View>
  );
};

export default LogInfo;
