import { useState } from "react";
import { View, Text, Image, Pressable, Dimensions } from "react-native";
import { AntDesign, Entypo, FontAwesome, Fontisto } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
  withSequence,
} from "react-native-reanimated";
import { useAuth } from "../../context/AuthProvider";
import { router } from "expo-router";
const AnimatedPressale = Animated.createAnimatedComponent(Pressable);

const toastConfig = {
  tomatoToast: ({ text1, props }) => (
    <View className='h-8 z-40 min-w-[150px] justify-center items-center bg-stone-300/50 rounded-full'>
      <Text className='text-white px-3'>{text1}</Text>
    </View>
  ),
};

const InfoBar = ({ ifo, signupDrawerRef }) => {
  const [isFav, setIsFav] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(2);
  const [isAnimated, setIsAnimated] = useState(false);

  const followScale = useSharedValue(1);
  const followOpacity = useSharedValue(1);
  const followColor = useSharedValue("#be123c");
  const { authState } = useAuth();

  const handleADddToFavorite = () => {
    if (!authState.token) {
      signupDrawerRef.current.open();
      return;
    }
    if (isFav) {
      Toast.show({
        type: "tomatoToast",
        text1: "Remove from favorites",
        topOffset: 120,
        visibilityTime: 1500,
      });
      setIsFav(false);
    } else {
      Toast.show({
        type: "tomatoToast",
        text1: "Add to favorites",
        topOffset: 120,
        visibilityTime: 1500,
      });
      setIsFav(true);
    }
  };

  const handleAnimated = () => {
    setIsAnimated(true);
    followColor.value = "#0078fe";
  };
  const handleFollowed = () => {
    setIsAnimated(false);
    setIsFollowed(true);
  };

  const handleFollowIndicator = () => {
    if (!authState.token) {
      signupDrawerRef.current.open();
      return;
    }
    followScale.value = withSpring(
      0.2,
      {
        duration: 300,
        easing: Easing.ease,
      },
      (e) => {
        "worklet";
        runOnJS(handleAnimated)(true);
        if (e) {
          followScale.value = withSpring(
            1,
            {
              duration: 300,
              easing: Easing.ease,
            },
            (e) => {
              followOpacity.value = withTiming(
                0,
                {
                  duration: 370,
                  easing: Easing.ease,
                },
                (e) => {
                  "worklet";
                  runOnJS(handleFollowed)(true);
                },
              );
            },
          );
        }
      },
    );
  };

  const followStyle = useAnimatedStyle(() => {
    return {
      opacity: followOpacity.value,
      transform: [{ scale: followScale.value }],
      backgroundColor: followColor.value,
    };
  });

  return (
    <>
      <Toast config={toastConfig} />
      <View className='absolute bottom-5 px-2 w-full space-y-2'>
        <View className='flex-row flex-grow w-full space-x-3'>
          <View className='flex-row h-8 space-x-[5px] px-1.5 bg-stone-900/50 stone-800/50 rounded-full items-center'>
            <AntDesign name='eye' size={24} color='white' />
            <Text className='text-white font-[400] text-[14px]'>
              {ifo.views}
            </Text>
          </View>
          <Pressable
            className={
              isFollowed
                ? "flex-row h-8 space-x-[7px] px-1 bg-stone-900/50 stone-800/50 rounded-full justify-center pr-[10px] items-center"
                : "flex-row h-8 space-x-[7px] px-1 bg-stone-900/50 stone-800/50 rounded-full justify-center items-center"
            }
            onPress={() => router.push(`(user)/${ifo.creator.id}`)}
          >
            <Image
              source={{ uri: ifo.creator.profile_picture }}
              className='h-6 w-6 rounded-full'
            />
            <Text className='text-white font-[500] text-[13px]'>
              @{ifo.creator.username}
            </Text>
            {!isFollowed && (
              <AnimatedPressale
                className='bg-rose-700 h-[26px] w-[26px] rounded-full flex justify-center items-center'
                onPress={handleFollowIndicator}
                style={followStyle}
              >
                <Entypo
                  name={isAnimated ? "check" : "plus"}
                  size={isAnimated ? 15 : 20}
                  color='white'
                />
              </AnimatedPressale>
            )}
          </Pressable>
          <Pressable
            onPress={handleADddToFavorite}
            className='bg-stone-900/50 w-8 h-8 rounded-full flex justify-center items-center'
          >
            <FontAwesome
              name={isFav ? "bookmark" : "bookmark-o"}
              size={21}
              color='white'
            />
          </Pressable>
        </View>
        <View className='flex-row w-full py-[2px] space-x-[5px] px-1.5 justify-between items-center'>
          <Text
            numberOfLines={numberOfLines}
            onPress={() => setNumberOfLines((prev) => (prev === 2 ? 0 : 2))}
            className='text-white w-[70%] text-[14px]'
          >
            {ifo.title}
          </Text>
          <View className='justify-center items-center rounded-full border border-white p-[2px]'>
            <View className='w-11 h-11 bg-rose-700 justify-center items-center rounded-full'>
              <Fontisto name='music-note' size={24} color='white' />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default InfoBar;
