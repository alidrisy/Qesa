import { StyleSheet, View, RefreshControl, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';

export default function MyPager() {
  return (
    <View className='h-[100px] flex-row justify-center items-center  w-full'>
      
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});