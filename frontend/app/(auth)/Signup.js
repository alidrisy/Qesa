import { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, BackHandler } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import Name from "../../components/signupComponents/Name";
import Password from "../../components/signupComponents/Password";
import { router } from "expo-router";
import BirthDate from "../../components/signupComponents/BirthDate";
import UserName from "../../components/signupComponents/Username";
import axios from "../../api/axios";
import ConfirmCode from "../../components/signupComponents/ConfirmCode";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../context/AuthProvider";
import { fetchUserData } from "../../utils/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState(null);
  const [confirmCode, setConfirmCode] = useState("");
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
        "/signup",
        {
          email,
          password,
          username,
          first_name: firstName,
          last_name: lastName,
          birth_date: date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response.data);
      if (response.data.message) {
        setPage(4);
      }
    } catch (error) {
      if (error.response.status === 422) {
        Toast.show({
          type: "error",
          text1: error.response.data.message,
          text2: "Please try to log in instead.",
          visibilityTime: 1500,
        });
      }
      console.log(error.response.data.message);
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
          <Text className='text-[18px] font-[500]'>Sign up</Text>
          {page < 4 && (
            <Text className='text-[12px] font-[500]'>Step {page + 1} of 4</Text>
          )}
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
        <Name
          key={0}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          setPage={setPage}
        />
        <UserName
          key={1}
          email={email}
          setEmail={setEmail}
          username={username}
          setUsername={setUsername}
          setPage={setPage}
          name={firstName}
        />
        <BirthDate key={2} date={date} setDate={setDate} setPage={setPage} />
        <Password
          key={3}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          setPage={setPage}
          page={page}
          handleSubmit={handleSubmit}
        />
        <ConfirmCode
          key={4}
          confirmCodeStyle={confirmCodeStyle}
          setConfirmCode={setConfirmCode}
          setPage={setPage}
          email={email}
          handleConfirmCode={handleConfirmCode}
          page={page}
          id={4}
        />
      </PagerView>
      <Toast />
    </View>
  );
};

export default Signup;
