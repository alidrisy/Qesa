import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { ScrollView } from "react-native";
import { router, Redirect } from "expo-router";

import CustomButton from "../components/CustomButton";


export default function App() {
  return (
    <>
      <Redirect href={'/MainScreen'} />
      <StatusBar style="auto" />
    </>
  );
}
