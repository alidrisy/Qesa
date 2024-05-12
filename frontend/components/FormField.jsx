import { View, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import images from "../constants";

const FormField = ({
  placeHolder,
  value,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      className={`${otherStyles} mb-4 w-full px-10 h-10 items-center relative`}
    >
      <TextInput
        placeholder={placeHolder}
        value={value}
        placeholderTextColor="#7180EA"
        onChangeText={handleChangeText}
        className="input w-full pl-4 rounded-full h-full bg-blue-400/30"
        {...props}
        secureTextEntry={
          (placeHolder === "Password" && !showPassword) ||
          (placeHolder === "Confirm Password" && !showPassword)
        }
      />
      {(placeHolder === "Password" || placeHolder === "Confirm Password") && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-12 top-[8px]"
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="#07125D"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormField;
