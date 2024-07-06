import { View, Text, Pressable, TextInput } from "react-native";
import { useRef, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const Name = ({ firstName, setFirstName, lastName, setLastName, setPage }) => {
  const inputLNameRef = useRef(null);
  const inputFNameRef = useRef(null);

  const [validFName, setValidFName] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("gen");

  useEffect(() => {
    setValidFName(true);
  }, [firstName, lastName]);

  const handleSubmihandleSubmitt = () => {
    if (firstName.trim().length === 0) {
      inputFNameRef.current.focus();
      setValidFName(false);
      return;
    }
    setPage(1);
  };

  return (
    <View className='flex-1 h-full w-full space-y-6 items-center py-5'>
      <Toast />
      <View className='text-[23px] w-[90%] space-y-1 font-[700] text-left my-3'>
        <Text className='text-[23px] w-[80%] font-[700] text-left'>
          What we should call you?
        </Text>
        <Text className='text-[14px] w-[75%] text-[#8E8E8F]  text-left'>
          Share your name to personalize your experience with us!
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
      {/* <View className='w-[85%] rounded-full justify-center bg-gray-200/60  items-center'>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          mode={"dialog"}
          enabled
          accessibilityLabel='Basic Picker Accessibility Label'
          style={{
            height: 45,
            width: "100%",
            borderColor: "#e5e7eb",
            borderRadius: 5,
            borderRadius: 5,
            overflow: "hidden",
            borderRadius: 50,
          }}
          testID='styled-picker'
          prompt='Select your gender'
          numberOfLines={1}
        >
          <Picker.Item label='Java' value='java' />
          <Picker.Item label='JavaScript' value='js' />
          <Picker.Item label='Gender' value='gen' style={{ display: "none" }} />
        </Picker>
      </View> */}
      <Pressable
        className={
          firstName.length <= 0
            ? "w-[85%] flex flex-row justify-center bg-rose-600/[0.85] pl-4 h-[45px] rounded-full items-center"
            : "w-[85%] flex flex-row justify-center bg-rose-600 pl-4 h-[45px] rounded-full items-center"
        }
        disabled={firstName.length <= 0}
        onPress={handleSubmihandleSubmitt}
      >
        <Text className='text-[17px] text-white font-[400]'>Next</Text>
      </Pressable>
    </View>
  );
};

export default Name;
