import React, { useEffect } from 'react';
import * as Font from 'expo-font';
import { Ionicons, MaterialIcons, Fontisto, AntDesign, MaterialCommunityIcons, Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { Redirect } from "expo-router";
import axios from '../api/axios';
import { useAuth } from '../context/AuthProvider';
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { setVideos, videos } = useAuth();

  useEffect(() => {
    const loadAssetsAsync = async () => {
      try {
        await Font.loadAsync({
          ...Ionicons.font,
          ...MaterialIcons.font,
          ...Fontisto.font,
          ...AntDesign.font,
          ...MaterialCommunityIcons.font,
          ...Feather.font,
          ...Entypo.font,
          ...FontAwesome.font,
        });
        
        const response = await axios.get('/videos');
        setVideos(response.data);

      } catch (e) {
        console.error(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    loadAssetsAsync();
  }, []);

  if (!videos.length) return null;

  return (
    <>
      <Redirect href={'/MainScreen'} />
      <StatusBar style="auto" />
    </>
  );
}