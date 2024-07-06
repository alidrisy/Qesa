import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomDatePicker from "../signupComponents/CustomDatePicker";

const BirthDate = ({ date, setDate, handleUpdateProfile }) => {
  return (
    <View className='flex-1 w-full items-center py-5 '>
      <View className='text-[23px] w-[90%] space-y-1 font-[700] text-left mb-4 mt-3'>
        <Text className='text-[23px] w-[80%] font-[700] text-left'>
          Birth Date
        </Text>
      </View>
      <CustomDatePicker
        value={date ? date : new Date()}
        onChange={setDate}
        height={180}
        fontSize={20}
        width='85%'
        endYear={new Date().getFullYear()}
        format={"mm-dd-yyyy"}
        markHeight={40}
      />
      <Pressable
        className={
          Boolean(!date)
            ? "w-[85%] flex flex-row justify-center bg-rose-600/[0.85] pl-4 h-[45px] rounded-full items-center mt-12"
            : "w-[85%] flex flex-row justify-center bg-rose-600 pl-4 h-[45px] rounded-full items-center mt-12"
        }
        disabled={Boolean(!date)}
        onPress={handleUpdateProfile}
      >
        <Text className='text-[17px] text-white font-[400]'>Save</Text>
      </Pressable>
    </View>
  );
};

export default BirthDate;
