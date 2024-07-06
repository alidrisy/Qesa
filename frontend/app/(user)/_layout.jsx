import { Stack } from "expo-router";

const StackLayout = () => {
  

  
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" options={{ headerShown: false }} />
      
    </Stack>
  );
};


export default StackLayout;
