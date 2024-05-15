import { Alert } from "react-native";
import {
  requestCameraPermissionsAsync,
  requestMicrophonePermissionsAsync,
} from "expo-camera";
import { requestMediaLibraryPermissionsAsync } from "expo-image-picker";

export const requestCameraPermission = async () => {
  try {
    const granted = await requestCameraPermissionsAsync();
    return granted;
  } catch (err) {
    Alert.alert(err.message);
  }
};

export const requestStoragePermission = async () => {
  try {
    const granted = await requestMediaLibraryPermissionsAsync();
    return granted;
  } catch (err) {
    Alert.alert(err.message);
  }
};

export const requestMicrophonePermission = async () => {
  try {
    const granted = await requestMicrophonePermissionsAsync();
    return granted;
  } catch (err) {
    Alert.alert(err.message);
  }
};
