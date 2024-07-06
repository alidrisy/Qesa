import * as React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from "@expo/vector-icons";

export default function VideoViewer({ uri }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const handlePlay = () => {
    if (status.playableDurationMillis === status.positionMillis) {
        video.current.replayAsync();
        return;
    }
    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
  }

  return (
    <Pressable style={{ aspectRatio: 9 / 16 }} className="flex justify-center items-center bg-transparent"
      onPress={handlePlay}
      >
      <Video
        ref={video}
        className="self-center w-full h-full flex"
        source={{
          uri,
        }}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      >
      </Video>
      {status.isPlaying || <View 
          className="absolute items-center w-16 h-16 justify-center pl-1 bg-gray-900/50 rounded-full"
          >
          <Ionicons name='play-outline' size={36} color='white' />
        </View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    video: {
      alignSelf: 'center',
      width: 320,
      height: 200,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });