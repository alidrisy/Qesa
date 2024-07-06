import { View, Text, Pressable } from "react-native";
import CustomDatePicker from "./CustomDatePicker";
import { Ionicons } from "@expo/vector-icons";

const BirthDate = ({ date, setDate, setPage }) => {
  return (
    <View className='flex-1 w-full items-center py-5 '>
      <View className='text-[23px] w-[90%] space-y-1 font-[700] text-left mb-2 mt-3'>
        <Text className='text-[23px] w-[80%] font-[700] text-left'>
          When's your birthday?
        </Text>
        <Text className='text-[14px] w-[80%] pl-2 text-[#8E8E8F]  text-left'>
          Almost there! Completing your profile adds a personal touch.
        </Text>
      </View>
      <CustomDatePicker
        value={new Date()}
        onChange={setDate}
        height={180}
        fontSize={20}
        width='85%'
        endYear={new Date().getFullYear()}
        format={"mm-dd-yyyy"}
        markHeight={40}
      />
      <View className='justify-left w-[85%] flex-row space-x-1 pl-[4px] items-center pt-6 -mb-3'>
        <Ionicons name='information-circle-outline' size={17} color='#8E8E8F' />
        <Text className='text-[12px] w-[90%] text-left text-[#8E8E8F] my-2'>
          Your birthday won't be shared publicly.
        </Text>
      </View>
      <Pressable
        className={
          Boolean(!date)
            ? "w-[85%] flex flex-row justify-center bg-rose-600/[0.85] pl-4 h-[45px] rounded-full items-center my-4"
            : "w-[85%] flex flex-row justify-center bg-rose-600 pl-4 h-[45px] rounded-full items-center my-4"
        }
        disabled={Boolean(!date)}
        onPress={() => setPage(3)}
      >
        <Text className='text-[17px] text-white font-[400]'>Next</Text>
      </Pressable>
    </View>
  );
};

export default BirthDate;
