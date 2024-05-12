import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-purple-500 py-2 px-4 rounded-md justify-center items-center ${
        isLoading ? "opacity-50" : ""
      } ${containerStyles} `}
      disabled={isLoading}
      activeOpacity={0.7}
    >
      <Text className={`text-white font-nbold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
