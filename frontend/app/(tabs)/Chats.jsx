import { useRef } from "react";
import { View, Text, StyleSheet, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import BottomDrawer, {
  BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';
import CustomInputField from "../../components/CustomInputField";

const Chats = () => {
  const bottomDrawerRef = useRef(null);
  // renders
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
        <KeyboardAvoidingView keyboardVerticalOffset={12} contentContainerStyle={{}} behavior='position' className="flex-1  relative overflow-hidden">

          <View className="h-[600] px-5 w-full">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ display: "flex", justifyContent: 'center', alignItems: "center", alignContent: "center" }} className="flex-1">
              <Text className="self-center pt-[230px]">No comments yet</Text>
            </ScrollView>
    
          </View>
            <View className="bottom-[24px] bg-white justify-start p-0 h-[70px] w-full border-t-[0.5px] border-[#8E8E8f]" >
              <CustomInputField
                  placeholder="Add Comment"
              />
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
