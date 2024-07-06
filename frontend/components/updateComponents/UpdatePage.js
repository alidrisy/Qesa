import { useEffect } from "react";
import { View, Text, Pressable, StatusBar, BackHandler } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Name from "./Name";
import UserName from "./Username";
import BirthDate from "./BirthDate";
import Bio from "./Bio";

const UpdatePage = ({
  type,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  date,
  setDate,
  bio,
  setBio,
  handleUpdateProfile,
  page,
  setPage,
}) => {
  useEffect(() => {
    if (page === 0) return;

    const backAction = () => {
      setPage(page - 1);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => {
      backHandler.remove();
      console.log("backHandler removed");
    };
  }, [page]);

  return (
    <View
      className='flex-1 w-full bg-white px-2'
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View className='h-[50px] flex-row justify-between items-center w-full'>
        <Pressable
          className='flex justify-center items-center w-7'
          onPress={() => setPage(0)}
        >
          <MaterialCommunityIcons name='arrow-left' size={26} color='black' />
        </Pressable>
        <View className='space-y-1 mt-3'>
          <Text className='text-[18px] font-[500]'>{null}</Text>
        </View>
        <View className='w-7 ml-2.5' />
      </View>
      <View className='flex-1 h-full w-full'>
        {type === "name" ? (
          <Name
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            handleUpdateProfile={handleUpdateProfile}
          />
        ) : type === "username" ? (
          <UserName
            username={username}
            setUsername={setUsername}
            handleUpdateProfile={handleUpdateProfile}
          />
        ) : type === "birthdate" ? (
          <BirthDate
            date={date}
            setDate={setDate}
            handleUpdateProfile={handleUpdateProfile}
          />
        ) : type === "bio" ? (
          <Bio
            bio={bio}
            setBio={setBio}
            handleUpdateProfile={handleUpdateProfile}
          />
        ) : null}
      </View>
    </View>
  );
};

export default UpdatePage;
