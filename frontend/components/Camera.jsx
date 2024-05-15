import { Camera, CameraType, FlashMode } from "expo-camera";
import { useState, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { router } from "expo-router";
import MediaPicker from "./MediaPicker";
import { requestMicrophonePermission } from "../utils/requestPermissions";
import {
  PinchGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Timer from "./Timer";
import PreviewImage from "./PreviewImage";

export default function QSCamera({ handleBack }) {
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [isRrecording, setIsRrecording] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [images, setImages] = useState([]);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [micPermission, requestMicPermissions] =
    Camera.useMicrophonePermissions();
  const camera = useRef(null);

  if (!permission) {
    return <View />;
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  function handleAddphoto() {
    setPreviewVisible(false);
  }

  function toggleFlashMode() {
    setFlashMode((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off,
    );
  }

  async function takePicture() {
    if (!camera.current && !cameraReady) return;
    let photo = await camera.current.takePictureAsync();
    if (type === CameraType.front) {
      photo = await manipulateAsync(
        photo.uri,
        [{ rotate: 180 }, { flip: FlipType.Vertical }],
        { compress: 1, format: SaveFormat.PNG },
      );
    }
    console.log(photo);
    setImages([...images, photo]);
    setPreviewVisible(true);
    console.log(images);
  }

  async function takeVideo() {
    if (!camera.current && !cameraReady) return;
    try {
      if (micPermission.granted) {
        setIsRrecording(true);
        let photo = await camera.current.recordAsync({
          VideoQuality: ["2160p"],
          mute: false,
          videoBitrate: 5000000,
        });
        if (type === CameraType.front) {
          photo = await manipulateAsync(
            photo.uri,
            [{ rotate: 180 }, { flip: FlipType.Vertical }],
            { compress: 1, format: SaveFormat.PNG },
          );
        }
        setImages([...images, photo]);
        setPreviewVisible(true);
        setIsRrecording(false);
      } else if (permission.canAskAgain) {
        await requestMicrophonePermission();
      } else {
        Alert.alert(
          "Qesa need permissions to access your microphone to record videos.",
        );
      }
    } catch (e) {
      Alert.alert(e.message);
    }
  }

  const stopVideo = () => {
    if (isRrecording) {
      camera.current.stopRecording();
    }
  };

  const handleZoomGesture = (event) => {
    const velocity = event.nativeEvent.velocity / 20;
    const outFactor = zoom * (Platform.OS === "ios" ? 40 : 15);
    const newZoom =
      velocity > 0
        ? zoom +
          event.nativeEvent.scale *
            velocity *
            (Platform.OS === "ios" ? 0.01 : 25)
        : zoom -
          event.nativeEvent.scale *
            (outFactor || 1) *
            Math.abs(velocity) *
            (Platform.OS === "ios" ? 0.02 : 50);
    console.log(newZoom);
    if (newZoom < 0) {
      setZoom(0);
    } else if (newZoom > 1) {
      setZoom(1);
    } else {
      setZoom(newZoom);
    }
  };

  return (
    <GestureHandlerRootView
      className={"z-10 flex flex-1 justify-center bg-gray-950"}
    >
      {previewVisible && images ? (
        <PreviewImage
          images={images}
          setImages={setImages}
          setPreviewVisible={setPreviewVisible}
          handleAddphoto={handleAddphoto}
        />
      ) : (
        <>
          <PinchGestureHandler onGestureEvent={handleZoomGesture}>
            <Camera
              ratio='16:9'
              style={{ aspectRatio: 9 / 16 }}
              type={type}
              flashMode={flashMode}
              responsiveOrientationWhenOrientationLocked={true}
              zoom={zoom}
              onCameraReady={() => setCameraReady(true)}
              ref={camera}
            >
              <View className='flex-1 w-full justify-between items-center bg-transparent py-4 px-4'>
                <View className='flex-row w-full justify-between items-center bg-transparent'>
                  <TouchableOpacity
                    className='h-12'
                    onPress={handleBack}
                  >
                    <Ionicons name='close-outline' size={36} color='white' />
                  </TouchableOpacity>
                  <View
                    className={
                      isRrecording &&
                      "w-16 justify-center items-center h-8 bg-blue-600 rounded-full"
                    }
                  >
                    {isRrecording && <Timer className="text-white" />}
                  </View>
                  <TouchableOpacity
                    className='items-center w-12 h-12 justify-center bg-gray-900/50 rounded-full'
                    onPress={toggleFlashMode}
                  >
                    {flashMode === FlashMode.off ? (
                      <Ionicons
                        name='flash-off-outline'
                        size={25}
                        color='white'
                      />
                    ) : (
                      <Ionicons name='flash-outline' size={25} color='white' />
                    )}
                  </TouchableOpacity>
                </View>
                <View className='w-full flex-row items-center justify-between bg-transparent'>
                  <MediaPicker
                    images={images}
                    setImages={setImages}
                    setPreviewVisible={setPreviewVisible}
                  />
                  <TouchableOpacity
                    delayLongPress={150}
                    className={
                      isRrecording === false
                        ? "flex justify-center items-center h-[65px] w-[65px] border-[3px] border-white active:bg-white/20 rounded-full self-end items-center"
                        : "flex justify-center opacity-100 group-isolate items-center h-[75px] w-[75px] border-[3px] border-white rounded-full self-end items-center"
                    }
                    onPress={takePicture}
                    onLongPress={takeVideo}
                    onPressOut={stopVideo}
                  >
                    <View
                      className={
                        isRrecording === false
                          ? "bg-white w-12 h-12 rounded-full"
                          : "bg-blue-600 w-9 h-9 rounded-full"
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className='items-center w-12 h-12 justify-center bg-gray-900/50 rounded-full'
                    onPress={toggleCameraType}
                  >
                    <Ionicons
                      name='camera-reverse-outline'
                      size={25}
                      color='white'
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Camera>
          </PinchGestureHandler>
          <StatusBar hidden={true} />
        </>
      )}
      {!previewVisible && (
        <View className='bg-white flex-grow justify-center items-center '>
          <Text className='text-black py-1 font-[500] px-3 rounded-full'>
            Tap for photo, hold for Video
          </Text>
        </View>
      )}
    </GestureHandlerRootView>
  );
}
