import { useEffect, useState } from "react";
import { View, Linking, Modal, Text } from "react-native";
import { usePathname, router } from "expo-router";
import {
  requestCameraPermission,
  requestStoragePermission,
} from "../../utils/requestPermissions";
import {
  checkCameraPermission,
  checkStoragePermission,
} from "../../utils/checkPermissions";
import PermissionAlert from "../../components/PermissionAlert";
import QSCamera from "../../components/Camera";

const Add = () => {
  const [modalVis, setModalVis] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [permissionType, setPermissionType] = useState(false);
  const [permission, setPermission] = useState(false);
  const [path, setPath] = useState(false);

  const handleOpenCamera = async () => {
    const storagePermission = await checkStoragePermission();
    const cameraPermission = await checkCameraPermission();
    if (storagePermission.granted === true) {
      if (cameraPermission.granted) {
        setPermission(cameraPermission.granted);
        setModalVis(true);
      } else if (cameraPermission.canAskAgain) {
        setModalVisible(true);
        setPermissionType("camera");
      } else {
        setModalVisible(true);
        setPermissionType("cameraCantAsk");
      }
    } else if (storagePermission.canAskAgain) {
      setModalVisible(true);
      setPermissionType("storage");
      setPath("camera");
    } else {
      setModalVisible(true);
      setPermissionType("storageCantAsk");
      setPath("camera");
    }
  };

  const askPermission = async () => {
    setModalVisible(false);
    setPermissionType("");
    if (permissionType === "camera") {
      const permission = await requestCameraPermission();
      if (permission.granted) {
        setPermission(permission.granted);
        setModalVis(true);
      }
    } else if (permissionType === "storage") {
      const permission = await requestStoragePermission();
      if (permission.granted && path === "camera") {
        handleOpenCamera();
      }
    }
  };

  const openSettings = () => {
    setModalVisible(false);
    setPermissionType("");
    Linking.openSettings();
  };

  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/Add") {
      if (permission) {
        setModalVis(true);
      } else {
        handleOpenCamera();
      }
    }
  }, [pathname]);

  const handleBack = () => {
    setModalVis(false);
    router.back();
  };
  return (
    <View className='h-full w-full'>
      <Modal
        onRequestClose={handleBack}
        visible={modalVis}
        className='h-full w-full'
        animationType='none'
      >
        <QSCamera handleBack={handleBack} />
      </Modal>
      {modalVisible && permissionType ? (
        <PermissionAlert
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          askPermission={
            permissionType.includes("CantAsk") ? openSettings : askPermission
          }
          permissionType={permissionType}
        />
      ) : null}
    </View>
  );
};

export default Add;
