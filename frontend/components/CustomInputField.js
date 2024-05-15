import { useState } from "react";
import styled from "styled-components/native";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import Animated, {
  withTiming,
  withSpring,
  useSharedValue,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

const CustomInputField = ({ input, setInput, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const lableStyle = useSharedValue({
    top: 30,
    left: 44,
    fontSize: 11.5,
    color: "#8E8E8f",
  });

  const handleFocus = () => {
    setIsFocused(true);
    lableStyle.value = withTiming(
      {
        top: 6,
        left: 45,
        fontSize: 12,
        color: "#0891b2",
      },
      {
        duration: 200,
      },
    );
  };

  const handleBlur = () => {
    if (input.length > 0) return;
    setIsFocused(false);
    lableStyle.value = withTiming(
      {
        top: 30,
        left: 44,
        fontSize: 11.5,
        color: "#8E8E8f",
      },
      {
        duration: 250,
      },
    );
  };

  const lableAnimatedStyle = useAnimatedStyle(() => {
    return {
      ...lableStyle.value,
    };
  });

  return (
    <View className='relative pt-5 justify-center items-center'>
      <TextInput
        value={input}
        onChangeText={setInput}
        className={
          isFocused
            ? "w-[80%] border-b border-[#0891b2] px-1"
            : "w-[80%] border-b border-[#8E8E8f] px-1"
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></TextInput>
      <Animated.Text className='absolute' style={lableAnimatedStyle}>
        {placeholder}
      </Animated.Text>
    </View>
  );
};

StyleSheet.create({
  text: {
    color: "gray",
  },
});
export default CustomInputField;
