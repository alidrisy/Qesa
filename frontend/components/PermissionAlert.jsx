import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import permissionsData from '../constants/permissionsData';

const PermissionAlert = ({ setModalVisible, askPermission, permissionType }) => {
  const {icon, text, button} = permissionsData[permissionType];

    return (
        <View className="absolute z-20 w-full h-[110vh] bg-gray-950/60">
            <View className="flex-1 justify-center items-center mt-[22px]">
                <View className style={styles.modalView}>
                    <View className="h-[100px] w-[320] justify-center items-center rounded-t-[20px] bg-blue-800">
                    <Ionicons name={icon} size={34} color="white" />
                    </View>
                    <View className="justify-center space-y-5 items-center rounded-t-[20px] p-[20px]">
                        <Text className="text-left text-[14px]">{text}</Text>
                        <View className="self-end flex-row justify-center space-x-5 items-center rounded-t-[20px]">
                            <Pressable
                                onPress={() => setModalVisible(false)}>
                                <Text className="text-[#0078f0]">Not Now</Text>
                            </Pressable>
                            <Pressable
                                onPress={askPermission}>
                                <Text className="text-[#0078f0] text-center">{button}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalView: {
      width: 320,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
    }
  });  

export default PermissionAlert;