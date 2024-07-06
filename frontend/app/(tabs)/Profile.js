import {
  View,
  Text,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import Drawer from "../../components/Drawer";
import { usePathname } from "expo-router";
import { useAuth } from "../../context/AuthProvider";
import UserProfile from "../../components/usersComponents/UserProfile";
import Feed from "../../components/feedsComponents/Feed";
import axios from "../../api/axios";

export default function Profile() {
  const signupDrawerRef = useRef(null);

  const [videos, setVideos] = useState(null);
  const [currentVideos, setCurrentVideos] = useState([]);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { authState } = useAuth();
  const { token, user } = authState;

  const fetchVideos = async (page) => {
    try {
      console.log("fetching videos");
      setIsLoading(true);
      const response = await axios.get(`users/me/videos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos([...response.data, ...response.data, ...response.data]);
      setPage(page + 1);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async () => {
    if (token) {
      fetchVideos(page);
    } else {
      signupDrawerRef.current.open();
    }
  };

  const handleOpen = (index) => {
    setCurrentVideos(videos.slice(index));
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentVideos([]);
    setOpen(false);
  };

  useEffect(() => {
    if (pathname === "/Profile") {
      handleAuth();
    }
  }, [pathname]);

  const EmptyList = () => (
    <View className='h-[200px] flex-row justify-center items-center  w-full'>
      {isLoading ? (
        <ActivityIndicator size='large' color='gray' />
      ) : (
        <Text className='text-[18px] font-[500]'>No Videos Found</Text>
      )}
    </View>
  );

  const SignUpComponent = () => (
    <View className='h-[55%] space-y-8 items-center w-full py-5 px-2 bg-white mt-4'>
      <Text className='text-[22px] font-bold text-center'>
        Keep favorites, forever.
      </Text>
      <Pressable
        onPress={() => {
          signupDrawerRef.current.open();
        }}
        className='w-[88%] h-[50px] bg-rose-600 rounded-full justify-center items-center'
      >
        <Text className='text-[17px] text-white font-bold text-center'>
          Sign up{" "}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View className='flex-1 justify-between items-center w-full bg-white'>
      {open ? (
        <Feed
          videos={currentVideos}
          getVideos={fetchVideos}
          pathpage={"/profile"}
          page={page}
          handleClose={handleClose}
        />
      ) : (
        <>
          <UserProfile
            user={user}
            data={videos}
            EmptyList={token ? EmptyList : SignUpComponent}
            me={true}
            handleOpen={handleOpen}
          />
        </>
      )}
      <Drawer signupDrawerRef={signupDrawerRef} />
      <StatusBar translucent={false} barStyle={"dark-content"} />
    </View>
  );
}
