import { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, BackHandler } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import { router } from "expo-router";
import axios from "../../api/axios";
import ConfirmCode from "../../components/signupComponents/ConfirmCode";
import LogInfo from "../../components/signupComponents/LogInfo";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../context/AuthProvider";
import { fetchUserData } from "../../utils/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [email, setEmail] = useState("");
  const [confirmCodeStyle, setConfirmCodeStyle] = useState({});
  const [page, setPage] = useState(0);
  const pageRef = useRef(null);
  const { setAuthState } = useAuth();

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.setPage(page);
    }
  }, [page]);

  const handleBack = () => {
    if (page === 0) {
      router.back();
    } else {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    setConfirmCodeStyle({});
  }, [confirmCode]);

  const handleConfirmCode = async (code) => {
    console.log(code);
    try {
      const response = await axios.post(
        "/verification",
        {
          validation_id: code,
        },
        {
          params: {
            email,
          },
        },
      );
      console.log(response.data);
      setConfirmCodeStyle({
        borderColor: "#10b981",
      });
      await SecureStore.setItemAsync("userToken", response.data.access_token);
      const user = await fetchUserData(response.data.access_token);
      setAuthState({ user, token: response.data.access_token });
      router.push("/MainScreen");
    } catch (error) {
      console.log(error.message);
      setConfirmCodeStyle({
        borderColor: "#dc2626",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "/login",
        {
          username,
          password,
          grant_type: "",
          scopes: [],
          client_id: "",
          client_secret: "",
        },

        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      console.log(response.data);
      if (response.data.status === "unverified") {
        setEmail(response.data.email);
        setPage(1);
      } else {
        Toast.show({
          type: "success",
          text1: "Login successful",
          text2: "Welcome back!",
          visibilityTime: 1500,
        });
        await SecureStore.setItemAsync("userToken", response.data.access_token);
        const user = await fetchUserData(response.data.access_token);
        setAuthState({ user, token: response.data.access_token });
        router.push("/MainScreen");
      }
    } catch (error) {
      console.log(error.response.data);
      Toast.show({
        type: "error",
        text1: error.response.data.message,
        text2: "Please check your credentials and try again.",
        visibilityTime: 1500,
      });
    }
  };

  return (
    <View className='flex-1 w-full bg-white'>
      <View className='h-[50px] flex-row justify-between items-center w-full'>
        <Pressable
          className='flex justify-center items-center ml-2.5 h-[35px] w-[35px] bg-[#8E8E8F]/20 rounded-full'
          onPress={() => handleBack()}
        >
          <MaterialCommunityIcons name='arrow-left' size={22} color='black' />
        </Pressable>
        <View className='space-y-1 mt-3'>
          <Text className='text-[18px] font-[500]'>Log in</Text>
        </View>
        <Pressable className='flex justify-center items-center mr-2.5 h-[35px] w-[35px] bg-[#8E8E8F]/20 rounded-full'>
          <MaterialCommunityIcons name='help' size={16} color='black' />
        </Pressable>
      </View>
      <PagerView
        className='h-[570px] w-full'
        orientation={"horizontal"}
        initialPage={0}
        scrollEnabled={false}
        ref={pageRef}
      >
        <LogInfo
          key={0}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setPage={setPage}
          handleSubmit={handleSubmit}
        />
        <ConfirmCode
          key={1}
          confirmCodeStyle={confirmCodeStyle}
          setConfirmCode={setConfirmCode}
          setPage={setPage}
          email={email}
          handleConfirmCode={handleConfirmCode}
        />
      </PagerView>
      <Toast />
    </View>
  );
};

export default Login;
