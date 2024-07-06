import { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import VideoComponent from "../../components/feedsComponents/VideoComponent";
import { _handleFetchVideosAsync } from "../../constants/video";
import { usePathname } from "expo-router";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../api/axios";

const Home = () => {
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState(0);
  const pathname = usePathname();
  const { authState, videos, setVideos } = useAuth();
  const [lastIndex, setLastIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [itemHeight, setItemHeight] = useState(0);
  const visibleRef = useRef({});

  if (!videos.length) return null;

  const getVideos = async (page, refreshing) => {
    const url = `/videos`;
    try {
      const res = await axios.get(url, {
        params: {
          page,
        },
      });
      if (!refreshing) {
        setVideos([...videos, ...res.data]);
      } else {
        setVideos(res.data);
      }
      setPage(page + 1);
      setIsRefreshing(false);
      return true;
    } catch (error) {
      setIsRefreshing(false);
      return false;
    }
  };

  useEffect(() => {
    if (pathname !== "/MainScreen") {
      visibleRef.current[`REF-FLATLIST${lastIndex}`]?.playThisVideo(false);
    } else {
      visibleRef.current[`REF-FLATLIST${lastIndex}`]?.playThisVideo(true);
    }
  }, [pathname]);

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    const visibleIndex = viewableItems[0]?.index;
    const previousIndex = changed[1]?.index;
    if (visibleIndex !== undefined) {
      visibleRef.current[`REF-FLATLIST${visibleIndex}`]?.playThisVideo(true);
      setLastIndex(visibleIndex);
    }
    if (previousIndex !== undefined) {
      visibleRef.current[`REF-FLATLIST${previousIndex}`]?.playThisVideo(false);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const fetchHomeFeed = async (page, refreshing) => {
    console.log("ends");
    await getVideos(page, refreshing);
  };

  const refreshStreamData = () => {
    setIsRefreshing(true);
    fetchHomeFeed(0, true);
  };

  return (
    <View className='relative flex-1'>
      <View className='absolute self-center w-[67%] h-10 rounded-full p-[3px] z-10 bg-stone-500/40 flex-row top-[8%]'>
        <Pressable
          className={
            tag === 0
              ? "w-[90px] text-white flex justify-center items-center px-2 bg-gray-200/30 rounded-full"
              : "w-[90px] text-white flex justify-center items-center px-2 rounded-full"
          }
          onPress={() => setTag(0)}
        >
          <Text
            className={tag === 0 ? "text-white" : "text-white/50 text-[13px]"}
          >
            Following
          </Text>
        </Pressable>
        <Pressable
          className={
            tag === 1
              ? "w-[90px] flex justify-center items-center px-2 bg-gray-200/30 rounded-full"
              : "w-[90px] flex justify-center items-center px-2 rounded-full"
          }
          onPress={() => setTag(1)}
        >
          <Text
            className={tag === 1 ? "text-white" : "text-white/50 text-[13px]"}
          >
            For you
          </Text>
        </Pressable>
        <Pressable
          className={
            tag === 2
              ? "w-[90px] flex justify-center items-center px-2 bg-gray-200/30 rounded-full"
              : "w-[90px] flex justify-center items-center px-2 rounded-full"
          }
          onPress={() => setTag(2)}
        >
          <Text
            className={tag === 2 ? "text-white" : "text-white/50 text-[13px]"}
          >
            Lives
          </Text>
        </Pressable>
      </View>
      <FlatList
        className='flex-1 bg-stone-950'
        onLayout={(e) => setItemHeight(e.nativeEvent.layout.height)}
        contentContainerStyle={{ flexGrow: 1 }}
        data={videos}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews
        keyExtractor={(item) => item.id}
        pagingEnabled
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        updateCellsBatchingPeriod={30}
        minDiffToRecomputeFrames={500}
        windowSize={4}
        decelerationRate='fast'
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={1.9}
        onEndReached={() => fetchHomeFeed(page, false)}
        refreshing={isRefreshing}
        onRefresh={refreshStreamData}
        snapToAlignment='start'
        horizontal={false}
        snapToStart={true}
        lazyLoading={true}
        renderItem={({ item, index }) => (
          <View style={{ height: itemHeight, width: "100%" }}>
            <VideoComponent
              key={index}
              video={item}
              ref={(ref) => {
                visibleRef.current[`REF-FLATLIST${index}`] = ref;
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Home;
