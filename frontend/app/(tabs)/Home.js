import { useState, useRef } from "react";
import { Dimensions, FlatList, View, Text, Pressable } from "react-native";
import VideoComponent from "../../components/VideoComponent";
import PagerView from 'react-native-pager-view';
import { videos } from "../../constants/video";

const Home = () => {
  const [refreshing, setrefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState(1);
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState(0);

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const onViewableItemsChanged = ({ viewableItems }) => {
    console.log("hi");
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].index ?? 0);
    }
  };

  const handleSwipX = ({ nativeEvent }) => {
    console.log(nativeEvent)
  }

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View
      className="relative flex-1"
    >
      <View className="absolute self-center w-[65%] space-x-8 h-10 rounded-full p-[3px] z-10 bg-stone-500/40 flex-row top-[8%]">
        <Pressable className={tag === 0 ? "text-white flex justify-center items-center px-2 bg-gray-200/30 rounded-full" : "text-white flex justify-center items-center px-2 rounded-full"}>
          <Text className="text-white text-[13px]" >Following</Text>
        </Pressable>
        <Pressable className={tag === 1 ? "text-white flex justify-center items-center px-2 bg-gray-200/30 rounded-full" : "text-white flex justify-center items-center px-2 rounded-full"}>
          <Text className="text-white/50">For you</Text>
        </Pressable>
        <Pressable className={tag === 2 ? "text-white flex justify-center items-center px-2 bg-gray-200/30 rounded-full" : "text-white flex justify-center items-center px-2 rounded-full"}>
          <Text className="text-white/50">Lives</Text>
        </Pressable>
      </View>
        <PagerView key={0} onPageSelected={e => setCurrentViewableItemIndex(e.nativeEvent.position)}  className="flex-1 bg-stone-950" orientation={'vertical'} initialPage={0}
        >
          {videos.map(( item, index ) => (
          <VideoComponent
            key={index}
            shouldPlay={index === currentViewableItemIndex}
            videoSource={item}
          />
        ))}
        </PagerView>
        {/* <View key={1} className="flex-1 bg-white justify-center items-center">
          <Text className="text-center">For You</Text>
        </View>
        <View key={2} className="flex-1 justify-center items-center bg-white">
          <Text className="text-center">Lives</Text>
        </View> */}
    </View>
  );
};

export default Home;
