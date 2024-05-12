import { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
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

const AnimatedPressale = Animated.createAnimatedComponent(Pressable);

const InfoBar = ({ ifo }) => {
  const [isFav, setIsFav] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const followScale = useSharedValue(1);
  const followOpacity = useSharedValue(1);
  const followColor = useSharedValue("#be123c");

  const handleADddToFavorite = () => {
    if (isFav) {
      setIsFav(false);
      Toast.show({
        type: "tomatoToast",
        text1: "Remove from favorites",
        text2: "hi",
        topOffset: 120,
        visibilityTime: 1500,
      });
    } else {
      setIsFav(true);
      Toast.show({
        type: "tomatoToast",
        text1: "Add to favorites",
        text2: "hi",
        topOffset: 120,
        visibilityTime: 1500,
      });
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
    followScale.value = withSpring(
      0.5,
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
    <View className='absolute bottom-5 px-2 w-full space-y-2'>
      <View className='flex-row flex-grow w-full space-x-3'>
        <View className='flex-row h-8 space-x-[5px] px-1.5 bg-stone-900/50 stone-800/50 rounded-full items-center'>
          <AntDesign name='eye' size={27} color='white' />
          <Text className='text-white font-[500] text-[14px]'>{ifo.views}</Text>
        </View>
        <View
          className={
            isFollowed
              ? "flex-row h-8 space-x-[7px] px-1 bg-stone-900/50 stone-800/50 rounded-full justify-center pr-[10px] items-center"
              : "flex-row h-8 space-x-[7px] px-1 bg-stone-900/50 stone-800/50 rounded-full justify-center items-center"
          }
        >
          <Image
            source={{ uri: ifo.creator.imageUrl }}
            className='h-6 w-6 rounded-full'
          />
          <Text className='text-white font-[500] text-[13px]'>
            {ifo.creator.username}
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
        </View>
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
        <Text className='text-white w-[70%] text-[14px]'>{ifo.title}</Text>
        <View className='justify-center items-center rounded-full border border-white p-[2px]'>
          <View className='w-11 h-11 bg-rose-700 justify-center items-center rounded-full'>
            <Fontisto name='music-note' size={24} color='white' />
          </View>
        </View>
      </View>
    </View>
  );
};

export default InfoBar;
