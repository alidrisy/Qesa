import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "../../api/axios";
import UserProfile from "../../components/usersComponents/UserProfile";
import Feed from "../../components/feedsComponents/Feed";
import { useAuth } from "../../context/AuthProvider";

const User = () => {
  const { id } = useLocalSearchParams();
  const [videos, setVideos] = useState([]);
  const [currentVideos, setCurrentVideos] = useState([]);
  const [userData, setUserData] = useState(null);
  const [me, setMe] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { authState } = useAuth();
  const { token, user } = authState;

  useEffect(() => {
    const fetchUser = async () => {
      console.log();
      if (user?.id === id) {
        setUserData(user);
        setMe(true);
        return;
      }
      try {
        const response = await axios.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, []);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/videos`, {
        params: {
          user_id: userData.id,
          page,
        },
      });
      setVideos([...response.data, ...response.data, ...response.data]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
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

  const EmptyList = () => (
    <View className='h-[200px] flex-row justify-center items-center  w-full'>
      {isLoading ? (
        <ActivityIndicator size='large' color='gray' />
      ) : (
        <Text className='text-[18px] font-[500]'>No Videos Found</Text>
      )}
    </View>
  );

  useEffect(() => {
    if (userData) {
      fetchVideos();
    }
  }, [userData]);

  return (
    <View className='flex-1  w-full bg-white'>
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
          {userData && (
            <UserProfile
              user={userData}
              data={videos}
              EmptyList={EmptyList}
              me={me}
              handleOpen={handleOpen}
            />
          )}
        </>
      )}
      <StatusBar translucent={false} barStyle={"dark-content"} />
    </View>
  );
};

export default User;
