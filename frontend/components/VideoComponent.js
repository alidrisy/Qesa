import {
  View,
  Dimensions,
  StyleSheet,
  Pressable,
  Text,
  StatusBar,
  Image,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MaterialIcons,
  Fontisto,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import InfoBar from "./InfoBar";
import SeekBar from "./SeekBar";
import { Share } from "react-native";
import Comments from "./Comments";

let timer = null;
const TIMEOUT = 200;
const debounce = (onSingle, onDouble) => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
    onDouble();
  } else {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      onSingle();
    }, TIMEOUT);
  }
};

const VideoComponent = ({ shouldPlay, videoSource }) => {
  const video = useRef();
  const commentsDrawerRef = useRef(null);
  const [status, setStatus] = useState();
  const [tap, setTap] = useState("...");
  const [vidId, setVidId] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const likeImageOpacity = useSharedValue(0);
  const likeIconScale = useSharedValue(1);
  const likeImageScale = useSharedValue(0);

  const iconLikeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: likeIconScale.value }],
    };
  });

  function likePost() {
    setIsLiked((prev) => !prev);
  }

  const imgLikeStyle = useAnimatedStyle(() => {
    return {
      opacity: likeImageOpacity.value,
      transform: [{ scale: likeImageScale.value }],
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      position: "absolute",
    };
  });

  const handleLikePost = () => {
    likeImageOpacity.value = withTiming(
      1,
      {
        duration: 100,
        easing: Easing.ease,
      },
      () => {
        likeImageScale.value = withSpring(1, { duration: 400 }, () => {
          likeImageOpacity.value = withTiming(
            0,
            {
              duration: 50,
              easing: Easing.ease,
            },
            () => (likeImageScale.value = withSpring(0)),
          );
        });
      },
    );
  };

  const handleLikePostIndicator = () => {
    likeIconScale.value = withSpring(
      0.5,
      {
        duration: 150,
        easing: Easing.ease,
      },
      (e) => {
        "worklet";
        runOnJS(likePost)(true);
        if (e) {
          likeIconScale.value = withTiming(
            1.3,
            {
              duration: 150,
              easing: Easing.ease,
            },
            () => {
              likeIconScale.value = withTiming(1, {
                duration: 150,
                easing: Easing.ease,
              });
            },
          );
        }
      },
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setTap("...");
    }, 2000);
  }, [tap]);

  const onSingleTap = () => {
    if (status.isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
  };
  const onDoubleTap = () => {
    setTap("double tap");
    handleLikePostIndicator();
    handleLikePost();
  };

  const handlePress = () => {
    debounce(onSingleTap, onDoubleTap);
  };

  useEffect(() => {
    if (!video.current) return;
    const playVideo = async () => {
      if (shouldPlay) {
        await video.current.playAsync();
        const state = await video.current.getStatusAsync();
        setDuration(state.durationMillis);
      } else {
        await video.current.pauseAsync();
        await video.current.setPositionAsync(0);
      }
    };
    playVideo();
  }, [shouldPlay]);

  const onValueChange = async (e) => {
    setProgress(e);
    if (status.isPlaying) {
      await video.current.playFromPositionAsync(e);
    }
  };

  const onPlaybackStatusUpdate = (e) => {
    setStatus(e);
    setProgress(e?.positionMillis || 0);
  };

  const handleShare = async () => {
    const shareAction = await Share.share(
      {
        title: "Test video",
        message: "Qesa | A time wasting application" + "\n" + videoSource,
      },
      { dialogTitle: "Send to" },
    );
  };

  return (
    <Pressable onPress={handlePress} className='flex-1'>
      <Comments commentsDrawerRef={commentsDrawerRef} />
      <View style={styles.videoContainer}>
        {!status?.isPlaying && (
          <View className='absolute z-30'>
            <Ionicons
              name='play'
              color='#e5e7eb'
              style={{ opacity: 0.88 }}
              size={90}
            />
          </View>
        )}
        <Video
          ref={video}
          source={{
            uri: videoSource,
          }}
          className='h-full'
          isLooping
          resizeMode={ResizeMode.CONTAIN}
          style={{ aspectRatio: 9 / 16 }}
          useNativeControls={false}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
        {/* ) : (
          <Image
            source={{
              uri: videoSource,
            }}
            className='h-full'
            resizeMode={ResizeMode.COVER}
            style={{ aspectRatio: 9 / 16 }}
          />
        )} */}
        <Animated.View style={imgLikeStyle}>
          <MaterialIcons name='favorite' size={120} color='#f3f4f6' />
        </Animated.View>
        <View className='absolute bg-stone-800/50 rounded-full  items-center justify-center px-[6px] py-2 pb-4 space-y-6 right-4 z-30 bottom-[18%]'>
          <Pressable
            onPress={handleLikePostIndicator}
            className='flex items-center justify-center space-y-[4px]'
          >
            <Animated.View style={iconLikeStyle}>
              <MaterialIcons
                name='favorite'
                size={32}
                color={isLiked ? "#e11d48" : "#f3f4f6"}
              />
            </Animated.View>
            <Text className='text-white'>500</Text>
          </Pressable>
          <Pressable
            onPress={() => commentsDrawerRef.current.open()}
            className='flex items-center justify-center space-y-[4px]'
          >
            <Ionicons
              name='chatbubble-ellipses-sharp'
              size={30}
              color='#f3f4f6'
            />
            <Text className='text-white'>0</Text>
          </Pressable>
          <Pressable
            onPress={handleShare}
            className='flex items-center justify-center space-y-[4px]'
          >
            <Fontisto name='share-a' size={22} color='#f3f4f6' />
            <Text className='text-white'>0</Text>
          </Pressable>
          <Pressable className='flex items-center justify-center'>
            <AntDesign name='ellipsis1' size={30} color='#f3f4f6' />
            <Text className='text-white text-[12px]'>More</Text>
          </Pressable>
        </View>
        <InfoBar
          ifo={{
            title: "harry potter #imSorry something-else and so on",
            views: "20k",
            creator: {
              username: "@alidrisy",
              imageUrl: "https://avatars.githubusercontent.com/u/114399659?v=4",
            },
          }}
        />
        <SeekBar
          onValueChange={onValueChange}
          currentPosition={progress}
          trackLength={duration}
        />
      </View>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor='transparent'
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});

export default VideoComponent;
