import { useState, useEffect, useCallback, useRef } from "react";
import { View, FlatList, BackHandler } from "react-native";
import VideoComponent from "./VideoComponent";
import { usePathname } from "expo-router";

const Feed = ({ videos, getVideos, pathpage, page, handleClose }) => {
  const pathname = usePathname();
  const [lastIndex, setLastIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const visibleRef = useRef({});

  useEffect(() => {
    const backAction = () => {
      handleClose();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (pathname !== pathpage) {
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

  return (
    <FlatList
      className='flex-1 bg-stone-950'
      onLayout={(e) => setItemHeight(e.nativeEvent.layout.height)}
      contentContainerStyle={{ flexGrow: 1 }}
      data={videos}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      removeClippedSubviews
      keyExtractor={(item, index) => index}
      pagingEnabled
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      updateCellsBatchingPeriod={30}
      minDiffToRecomputeFrames={500}
      windowSize={4}
      decelerationRate='fast'
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={1.9}
      onEndReached={() => fetchHomeFeed(page, false)}
      refreshing={false}
      snapToAlignment='start'
      horizontal={false}
      snapToStart={true}
      renderItem={({ item, index }) => (
        <View key={index} style={{ height: itemHeight, width: "100%" }}>
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
  );
};

export default Feed;
