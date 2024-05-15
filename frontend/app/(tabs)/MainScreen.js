import { useState, useRef, useEffect, useCallback } from "react";
import {
  RefreshControl,
  PanResponder,
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import VideoComponent from "../../components/VideoComponent";
import PagerView from "react-native-pager-view";
import { _handleFetchVideosAsync, videos } from "../../constants/video";
import { usePathname } from "expo-router";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  // const [videos, setVideos] = useState([]);
  const [tag, setTag] = useState(0);
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState(0);

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const onViewableItemsChanged = ({ viewableItems }) => {
    console.log("hi");
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].index ?? 0);
    }
  };

  const pathname = usePathname();

  // Track the location in your analytics provider here.
  useEffect(() => {
    if (pathname !== "/MainScreen") {
      setPage(currentViewableItemIndex);
      setCurrentViewableItemIndex(-1);
      console.log(pathname);
    } else {
      setCurrentViewableItemIndex(page);
    }
  }, [pathname]);
  const panResponder = useRef(
    PanResponder.create({
      onPanResponderMove: (e, gestureState) => {
        console.log(Math.max(gestureState.dy, 0));
      },
    }),
  ).current;

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
      <RefreshControl
        className='flex-1'
        refreshing={refreshing}
        onRefresh={onRefresh}
        progressViewOffset={130}
      >
        <PagerView
          key={0}
          onPageSelected={(e) =>
            setCurrentViewableItemIndex(e.nativeEvent.position)
          }
          className='flex-1 bg-stone-950'
          orientation={"vertical"}
          initialPage={0}
        >
          {videos.map((item, index) => (
            <VideoComponent
              key={index}
              shouldPlay={index === currentViewableItemIndex}
              videoSource={item}
            />
          ))}
        </PagerView>
      </RefreshControl>
    </View>
  );
};

export default Home;
