import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import BottomDrawer from "react-native-animated-bottom-drawer";
import { useAuth } from "../../context/AuthProvider";

const Comments = ({ commentsDrawerRef, signupDrawerRef }) => {
  const [comment, setComment] = useState("");
  const { authState } = useAuth();

  handleAuth = () => {
    if (!authState.token) {
      commentsDrawerRef.current.close();
      signupDrawerRef.current.open();
      return;
    }
  };

  return (
    <BottomDrawer
      enableSnapping
      snapPoints={[700]}
      gestureMode='handle'
      ref={commentsDrawerRef}
    >
      <View className='h-[35] border-[#8E8E8f] border-b-[0.5px] items-center px-5 w-full'>
        <Text className='text-[16px] font-semibold'>Comments</Text>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={12}
        behavior='position'
        className='flex-1  relative overflow-hidden'
      >
        <View className='h-[600] px-5 w-full'>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
            className='flex-1'
          >
            <Text className='self-center pt-[230px]'>No comments yet</Text>
          </ScrollView>
        </View>
        <View className='bottom-[24px] bg-white jusify-center items-center py-2 px-3 h-[70px] w-full border-t border-[#8E8E8f]/20'>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder='Add Comment'
            className='w-full bg-gray-200/60 rounded-full flex p-2 '
            onPressIn={handleAuth}
          />
        </View>
      </KeyboardAvoidingView>
    </BottomDrawer>
  );
};

export default Comments;
