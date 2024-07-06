import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

const SeekBar = ({ trackLength, currentPosition, onValueChange, color }) => {
  return (
    <View className='absolute z-20 bottom-0 flex-1 -left-[15px] w-full justify-start items-start'>
      <Slider
        style={{ width: Dimensions.get("screen").width + 29, height: 2 }}
        value={currentPosition}
        maximumValue={trackLength}
        minimumTrackTintColor='white'
        maximumTrackTintColor='#8E8E8f'
        thumbTintColor='transparent'
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default SeekBar;
