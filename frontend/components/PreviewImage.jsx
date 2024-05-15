import { useState, useEffect } from 'react';
import { ImageBackground, ScrollView, View, BackHandler, StatusBar, Image, Pressable, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import VideoViewer from './VideoViewer';
import mediaFormater from '../utils/mediaFormats';

const PreviewImage = ({ images, setImages, setPreviewVisible, handleAddphoto }) => {
  const [image, setImage] = useState(images[images.length - 1]);
  const [caption, setCaption] = useState('');


  useEffect(() => {
    const backAction = () => {
      setImages([]);
      setPreviewVisible(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleDelete = () => {
    const listImages = images.filter((img) => img.uri !== image.uri)
    setImages(listImages)
    setImage(images[images.length - 1])
  }

  return (
    <View className="relative flex-1 justify-center bg-gray-900 items-center">
        <Pressable className="absolute top-3 z-10 left-3 items-center w-9 h-9 justify-center bg-gray-900/60 rounded-full" onPress={() => {
            setImages([]);
            setPreviewVisible(false)
        }}>
              <Ionicons name='close-outline' size={32} color='white' />
        </Pressable>
      {mediaFormater(image) === "video" ? <VideoViewer uri={image.uri} /> :
      <ImageBackground source={{ uri: image.uri }} className="w-full h-full" resizeMode="contain" style={{ aspectRatio: 9 / 16 }} />}
      <StatusBar hidden={true} translucent={true}/>
      <View className='absolute z-10 bottom-[110px] items-center justify-center space-x-[7px]'>
        {Boolean(images.length > 1) && <ScrollView
            horizontal={true}
            className="flex space-x-1"
        >
            {images.map((img) => (
                <View key={img.uri} className="relative overflow-visible z-0 w-[60px] h-[60px]">
                    {img.uri === image.uri && <Pressable
                        className='w-[60px] h-[60px] bg-gray-900/50 absolute  z-10 flex items-center justify-center rounded-lg'
                        onPress={handleDelete}
                    >
                        <Ionicons name='trash' className='ml-1' size={22} color='black' />
                    </Pressable>}
                    <Pressable onPress={() => setImage(img)}>
                        <Image className="w-[60px] h-[60px] rounded-lg" source={{ uri: img.uri }}  resizeMode="cover" />
                    </Pressable>
                </View>
            ))}
        </ScrollView>}
        </View>
      <View className='absolute bottom-4 h-[60px] flex-row h-[50px] items-center justify-center space-x-[7px] py-[5px] px-[9px]'>
      <View className='relative w-[88%] items-center justify-center'>
        <Pressable
                className='absolute left-0 z-10 flex items-center justify-center h-[44px] w-[44px]'
                onPress={handleAddphoto}
              >
          <MaterialIcons
            name='add-photo-alternate'
            size={25}
            color='black'
          />
        </Pressable>
        <TextInput
          placeholder='Add a caption...'
          cursorColor='rgb(23, 37, 84)'
          inputMode='text'
          value={caption}
          multiline
          onChangeText={setCaption}
          className='input w-full flex-grow px-4 pl-11 py-2 rounded-[25px] text-[16px] h-[44px] bg-white'
        />
        </View>
        <Pressable
            className='flex items-center justify-center bg-[#0078fe] rounded-full h-[44px] w-[44px] pl-1'
           
          >
              <Ionicons name='send' className='ml-1' size={25} color='white' />
          </Pressable>
        </View> 
    </View>
  );
};

export default PreviewImage;