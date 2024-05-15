import { Alert } from "react-native";
import {
  getCameraPermissionsAsync,
  getMicrophonePermissionsAsync,
} from "expo-camera";
import { getMediaLibraryPermissionsAsync } from "expo-image-picker";

export const checkCameraPermission = async () => {
  try {
    const granted = await getCameraPermissionsAsync();
    return granted;
  } catch (err) {
    Alert.alert(err.message);
  }
};

export const checkStoragePermission = async () => {
  try {
    const granted = await getMediaLibraryPermissionsAsync();
    return granted;
  } catch (err) {
    Alert.alert(err.message);
  }
};

export const checkMicrophonePermission = async () => {
  try {
    const granted = await getMicrophonePermissionsAsync();
    return granted;
  } catch (err) {
    Alert.alert(err.message);
  }
};
