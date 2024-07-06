import { StyleSheet, View, RefreshControl, ActivityIndicator } from 'react-native';

export default function MyPager() {
  return (
    <View className='h-[100px] flex-row justify-center items-center  w-full'>
      
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}