import { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, TextInput, BackHandler } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PWD_REG = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?]).+$/;

const Password = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  setPage,
  page,
  handleSubmit,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [validPwd, setValidPwd] = useState(false);
  const [validPwdLen, setValidPwdLen] = useState(false);
  const [validPwdMatch, setValidPwdMatch] = useState(false);

  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  useEffect(() => {
    if (page === 0) return;

    const backAction = () => {
      if (page === 0) {
        router.back();
        return true;
      } else {
        setPage(page - 1);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => {
      backHandler.remove();
      console.log("backHandler removed");
    };
  }, [page]);

  useEffect(() => {
    const result = PWD_REG.test(password.trim());
    const len = password.trim().length >= 8 && password.trim().length <= 20;
    setValidPwd(result);
    setValidPwdLen(len);
    const match =
      confirmPassword.trim() === password.trim() &&
      confirmPassword.trim().length * password.trim().length > 0;
    setValidPwdMatch(match);
  }, [password, confirmPassword]);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <View className='flex-1 w-full space-y-6 items-center py-5'>
      <View className='text-[23px] w-[90%] space-y-1 font-[700] text-left mb-2 mt-3'>
        <Text className='text-[23px] w-[85%] font-[700] text-left'>
          Your privacy matters to us
        </Text>
        <Text className='text-[14px] w-[80%] pl-2 text-[#8E8E8F]  text-left'>
          Ensure your account's security by creating a strong password.
        </Text>
      </View>
      <View className='relative  w-full justify-center  items-center'>
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          ref={passwordRef}
          className='input w-[85%] px-4 py-2 self-center bg-gray-200/60 rounded-full'
          onPress={handlePasswordVisibility}
          secureTextEntry={passwordVisible}
          textContentType='password'
          returnKeyType='next'
          onSubmitEditing={() => confirmRef.current.focus()}
          maxLength={20}
          blurOnSubmit={false}
          autoFocus
        />
        <Pressable
          hitSlop={10}
          onPress={() => handlePasswordVisibility()}
          className='absolute z-20 top-[11px] right-[44px]'
        >
          <Ionicons
            name={!passwordVisible ? "eye-off-outline" : "eye-outline"}
            size={21}
            color='black'
          />
        </Pressable>
      </View>
      <View className='relative w-full justify-center  items-center'>
        <TextInput
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          ref={confirmRef}
          className='input w-[85%] px-4 py-2 self-center bg-gray-200/60 rounded-full -mb-3.5'
          onPress={handleConfirmPasswordVisibility}
          secureTextEntry={confirmPasswordVisible}
          textContentType='password'
          returnKeyType='next'
          onSubmitEditing={() =>
            password.length * confirmPassword.length > 0
              ? handleSubmit()
              : password.length > 0
              ? confirmRef.current.focus()
              : passwordRef.current.focus()
          }
          blurOnSubmit={false}
          maxLength={20}
        />
        <Pressable
          hitSlop={10}
          onPress={() => handleConfirmPasswordVisibility()}
          className='absolute z-20 top-[11px] right-[44px]'
        >
          <Ionicons
            name={!confirmPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={21}
            color='black'
          />
        </Pressable>
      </View>

      <View className='w-[80%] items-left space-y-[2px] text-[#8E8E8F] mb-2'>
        <Text className='text-[13px] text-left font-[500]'>
          Your password must have:
        </Text>
        <View className='items-left flex-row space-x-1 items-center pl-[1px] text-[#8E8E8F]'>
          <MaterialIcons
            name='check-circle-outline'
            size={17}
            color={validPwdLen ? "#059669" : "#8E8E8f"}
          />
          <Text
            className={
              validPwdLen
                ? "text-[12px] text-left text-black/90 font-[400] items-center"
                : "text-[12px] text-left text-[#8E8E8f] font-[400] items-center"
            }
          >
            8 to 20 characters
          </Text>
        </View>
        <View className='items-left flex-row space-x-1 pl-[1px] items-center text-[#8E8E8F]'>
          <MaterialIcons
            name='check-circle-outline'
            size={17}
            color={validPwd ? "#059669" : "#8E8E8f"}
          />
          <Text
            className={
              validPwd
                ? "text-[12px] text-left text-black/90 font-[400] items-center"
                : "text-[12px] text-left text-[#8E8E8f] font-[400] items-center"
            }
          >
            Letters, numbers, and symbols
          </Text>
        </View>
        <View className='items-left pl-[1px] flex-row space-x-1 items-center text-[#8E8E8F]'>
          <MaterialIcons
            name='check-circle-outline'
            size={17}
            color={validPwdMatch ? "#059669" : "#8E8E8f"}
          />
          <Text
            className={
              validPwdMatch
                ? "text-[12px] text-left text-black/90 font-[400] items-center"
                : "text-[12px] text-left text-[#8E8E8f] font-[400] items-center"
            }
          >
            Confirm password matches Password
          </Text>
        </View>
      </View>
      <Pressable
        className={
          validPwd && validPwdLen && validPwdMatch
            ? "w-[85%] flex flex-row justify-center bg-rose-600/ pl-4 h-[45px] rounded-full items-center my-4"
            : "w-[85%] flex flex-row justify-center bg-rose-600/[0.85] pl-4 h-[45px] rounded-full items-center my-4"
        }
        disabled={!(validPwd && validPwdLen && validPwdMatch)}
        onPress={handleSubmit}
      >
        <Text className='text-[17px] text-white font-[400]'>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default Password;
