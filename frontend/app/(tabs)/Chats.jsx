import { useRef } from "react";
import { View, Text, StyleSheet, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import BottomDrawer from 'react-native-animated-bottom-drawer';

const Chats = () => {
  const bottomDrawerRef = useRef(null);

  return (
    <View style={styles.container}>
      <Button title="Open" onPress={() => bottomDrawerRef.current.open()} />
      <BottomDrawer
        openOnMount
        enableSnapping
        snapPoints={[700]} gestureMode='handle' ref={bottomDrawerRef}>
          <View className="h-[35] border-[#8E8E8f] border-b-[0.5px] items-center px-5 w-full">
          <Text className="text-[16px] font-semibold">Comments</Text>
          </View>
        <KeyboardAvoidingView keyboardVerticalOffset={1} contentContainerStyle={{}} behavior='position' className="flex-1  relative overflow-scroll">

          <View className="h-[600] px-5 w-full">
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
              {
                Array.from({ length: 10}).map(() => (
                  <Text>hi</Text>
                ))
              }
            </ScrollView>
    
          </View>
            
        </KeyboardAvoidingView>
      </BottomDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

export default Chats;
