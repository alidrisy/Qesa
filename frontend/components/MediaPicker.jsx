import { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function MediaPicker({ images, setImages, setPreviewVisible }) {

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true,
      allowsEditing: false,
      orderedSelection: true,
      quality: 1,
    });

    console.log(result.assets[0].uri)

    if (!result.canceled) {
      setImages([...images, result.assets[0]]);
      setPreviewVisible(true)
    }
  };

  return (
    <TouchableOpacity className="items-center w-12 h-12 justify-center bg-gray-900/50 rounded-full" onPress={pickImage}>
      <Ionicons name='image-outline' size={25} color='white' />
    </TouchableOpacity>
  );
}
