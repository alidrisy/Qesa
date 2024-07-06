import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  BackHandler,
  StatusBar as Status,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import { router } from "expo-router";
import axios from "../../api/axios";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../context/AuthProvider";
import { StatusBar } from "expo-status-bar";
import UpdatePage from "../../components/updateComponents/UpdatePage";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(0);
  const [date, setDate] = useState(null);
  const [avatar, setAvatar] = useState("");
  const { authState, setAuthState } = useAuth();
  const { user, token } = authState;

  const pageRef = useRef(null);

  useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setBio(user.bio);
    setUsername(user.username);
    setDate(new Date(user.birth_date));
    setAvatar(user?.profile_picture);
  }, []);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.setPage(page);
    }
  }, [page]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatar(uri);
      handleUpdateProfile(uri);
    }
  };

  const checkDate = () => {
    return (
      user.birth_date.slice(0, user.birth_date.indexOf("T")) ===
      date.toISOString().slice(0, date.toISOString().indexOf("T"))
    );
  };

  const handleEditProfile = (path) => {
    setType(path);
    setPage(1);
  };

  const handleUpdateProfile = async () => {
    if (
      user.first_name === firstName &&
      user.last_name === lastName &&
      user.username === username &&
      user.bio === bio &&
      user.profile_picture === avatar &&
      checkDate()
    ) {
      Toast.show({
        type: "info",
        text1: "No changes made",
        visibilityTime: 2000,
      });
      setPage(0);
      setType("");
      return;
    }

    try {
      setPage(0);
      setType("");
      const response = await axios.put(
        `/users/me/update`,
        {
          first_name: firstName,
          last_name: lastName,
          username,
          bio,
          birth_date: date,
          profile_picture: avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      Toast.show({
        type: "success",
        text1: response.data?.message,
        visibilityTime: 2000,
      });
      setAuthState({ user: response.data?.user, token: token });
    } catch (e) {
      console.log(e);
      Toast.show({
        type: "error",
        text1: "Profile Update Failed",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View className='flex-1 w-full'>
      <PagerView
        initialPage={0}
        scrollEnabled={false}
        ref={pageRef}
        className='flex-1 w-full'
      >
        <View
          key={0}
          className='flex-1 w-full items-center px-2'
          style={{ paddingTop: Status.currentHeight }}
        >
          <View className='h-[50px] flex-row justify-between items-center w-full'>
            <Pressable
              className='flex justify-center items-center w-7 '
              onPress={() => router.back()}
            >
              <MaterialCommunityIcons
                name='arrow-left'
                size={26}
                color='black'
              />
            </Pressable>
            <View className='space-y-1 mt-3'>
              <Text className='text-[18px] font-[500]'>Edit Profile</Text>
            </View>
            <View className='w-7 ml-2.5' />
          </View>
          <View className='w-full justify-center  items-center py-6'>
            <TouchableOpacity
              activeOpacity={75 / 100}
              className='relative rounded-full border border-white/90'
              onPress={pickImage}
            >
              <Image
                source={{
                  uri:
                    avatar || "https://randomuser.me/api/portraits/men/1.jpg",
                }}
                className='rounded-full h-[120px] w-[120px]'
              />
              <View className='justify-center items-center absolute bottom-0 w-[40px] h-[40px] right-0 bg-gray-800 border-[1.8px] border-white rounded-full'>
                <MaterialCommunityIcons name='camera' size={18} color='white' />
              </View>
            </TouchableOpacity>
            <Text className='text-[14px] font-[500] mt-3'>
              change profile picture
            </Text>
          </View>
          <View className='w-[98%] justify-center bg-white rounded-2xl space-y-4 items-center py-4 px-3 mt-6'>
            <View className='w-full justify-center space-y-2'>
              <Text className='font-[500] text-[15px] text-left text-[#8E8E8F]'>
                Profile name
              </Text>
              <View className='w-full flex-row justify-between items-center px-2'>
                <Text className='text-[15px] w-[90%] text-left font-[500]'>
                  {firstName + " " + lastName}
                </Text>
                <TouchableOpacity
                  className='flex '
                  onPress={() => handleEditProfile("name")}
                >
                  <Feather name='edit-3' size={24} color='black' />
                </TouchableOpacity>
              </View>
            </View>

            <View className='w-full justify-center space-y-2'>
              <Text className='font-[500] text-[15px] text-left text-[#8E8E8F]'>
                Username
              </Text>
              <View className='w-full flex-row justify-between items-center px-2'>
                <Text className='text-[15px] w-[90%] text-left font-[500]'>
                  @{username}
                </Text>
                <TouchableOpacity
                  className='flex '
                  onPress={() => handleEditProfile("username")}
                >
                  <Feather name='edit-3' size={24} color='black' />
                </TouchableOpacity>
              </View>
            </View>
            <View className='w-full justify-center space-y-2'>
              <Text className='font-[500] text-[15px] text-left text-[#8E8E8F]'>
                Birth Date
              </Text>
              <View className='w-full flex-row justify-between items-center px-2'>
                <Text className='text-[15px] w-[90%] text-left font-[500]'>
                  {date
                    ? date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : null}
                </Text>
                <TouchableOpacity
                  className='flex'
                  onPress={() => handleEditProfile("birthdate")}
                >
                  <Feather name='edit-3' size={24} color='black' />
                </TouchableOpacity>
              </View>
            </View>
            <View className='w-full justify-center space-y-2'>
              <Text className='font-[500] text-[15px] text-left text-[#8E8E8F]'>
                Bio
              </Text>
              <View className='w-full flex-row justify-between items-center px-2'>
                <Text className='text-[14px] text-left w-[90%] font-[500]'>
                  {bio}
                </Text>
                <TouchableOpacity
                  className='flex'
                  onPress={() => handleEditProfile("bio")}
                >
                  <Feather name='edit-3' size={24} color='black' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <UpdatePage
          key={1}
          type={type}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          username={username}
          setUsername={setUsername}
          date={date}
          bio={bio}
          setBio={setBio}
          setDate={setDate}
          handleUpdateProfile={handleUpdateProfile}
          page={page}
          setPage={setPage}
        />
      </PagerView>
      <StatusBar style='auto' />
      <Toast />
    </View>
  );
};

export default EditProfile;
