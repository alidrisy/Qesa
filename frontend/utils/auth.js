import * as SecureStore from "expo-secure-store";
import axios from "../api/axios";

export const logout = async () => {
  try {
    await SecureStore.deleteItemAsync("userToken");
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    return token;
  } catch (error) {
    console.error("Get Token Error:", error);
    throw error;
  }
};

export const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch User Data Error:", error);
    throw error;
  }
};
