import { View, Text, Pressable, TextInput } from "react-native";
import { useRef, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const Name = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  handleUpdateProfile,
}) => {
  const inputLNameRef = useRef(null);
  const inputFNameRef = useRef(null);

  const [validFName, setValidFName] = useState(true);

  useEffect(() => {
    setValidFName(true);
  }, [firstName, lastName]);

  const handleSubmihandleSubmitt = () => {
    if (firstName.trim().length === 0) {
      inputFNameRef.current.focus();
      setValidFName(false);
      return;
    }
    handleUpdateProfile();
  };

  return (
    <View className='flex-1 h-full w-full space-y-6 items-center py-5'>
      <View className='text-[23px] w-[90%] space-y-1 font-[700] text-left my-3'>
        <Text className='text-[23px] w-[80%] font-[700] text-left'>
          Profile name
        </Text>
      </View>
      <View className='w-full justify-center  items-center'>
        <TextInput
          placeholder='First name'
          value={firstName}
          onChangeText={setFirstName}
          ref={inputFNameRef}
          className={
            "w-[85%] px-4 py-2 self-center bg-gray-200/60 rounded-full "
          }
          textContentType='name'
          autoComplete='name'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => inputLNameRef.current.focus()}
          autoFocus={true}
        />
        {!validFName && (
          <View className='items-left w-[80%] flex-row space-x-1 pl-[4px] items-center text-[#8E8E8F] pt-[1px] -mb-3.5'>
            <Ionicons color={"#dc2626"} size={11} name='warning-outline' />
            <Text className='text-[11px] text-left text-red-600'>
              First name is requere.
            </Text>
          </View>
        )}
      </View>
      <View className='w-full justify-center  items-center pb-6'>
        <View className='items-left w-[80%] flex-row space-x-[1px] pl-[6px] items-end  pb-[1px]'>
          <Ionicons
            color='#8E8E8F'
            size={12}
            name='information-circle-outline'
          />
          <Text className='text-[10px] text-center text-[#8E8E8F]'>
            optional, but recommended
          </Text>
        </View>
        <TextInput
          placeholder='Last name'
          value={lastName}
          onChangeText={setLastName}
          ref={inputLNameRef}
          className={
            "w-[85%] px-4 py-2 self-center bg-gray-200/60 rounded-full "
          }
          textContentType='name'
          autoComplete='name'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={handleSubmihandleSubmitt}
        />
      </View>
      <Text className='text-[12px] w-[90%] text-center text-[#8E8E8F] my-1'>
        You can only change your profile name once every 7 days.
      </Text>
      <Pressable
        className={
          firstName.length <= 0
            ? "w-[85%] flex flex-row justify-center bg-rose-600/[0.85] pl-4 h-[45px] rounded-full items-center"
            : "w-[85%] flex flex-row justify-center bg-rose-600 pl-4 h-[45px] rounded-full items-center"
        }
        disabled={firstName.length <= 0}
        onPress={handleSubmihandleSubmitt}
      >
        <Text className='text-[17px] text-white font-[400]'>Save</Text>
      </Pressable>
    </View>
  );
};

export default Name;
