import { View, Text } from "react-native";

export default function Tab(props) {
  console.log(props);

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>Profile</Text>
    </View>
  );
}
