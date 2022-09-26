import { StyleSheet, View, Text, Button, Alert, Image } from "react-native";
import { FC, useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  ImageInfo,
  ImagePickerResult,
  ImagePickerCancelledResult,
} from "expo-image-picker";
import { Colors } from "../../constants/styles";
import OutlinedButton from "../ui/OutlinedButton";

interface ImagePickerProps {
  onImagePicked: (imageUri: string) => void;
}

const ImagePicker: FC<ImagePickerProps> = ({ onImagePicked }) => {
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState<string>();

  async function verifyPermission() {
    if (cameraPermission?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      console.log(permissionResponse);
      return permissionResponse.granted;
    }

    if (cameraPermission?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to provide camera permission"
      );
      return false;
    }

    return true;
  }
  async function takeImageHandler() {
    const isCameraPermissionGranted = await verifyPermission();
    if (!isCameraPermissionGranted) {
      return;
    }
    const imageResult: any = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    console.log(imageResult);
    setSelectedImage(imageResult.uri);
    onImagePicked(imageResult.uri);
  }
  let imagePreview = <Text>No Image Selected</Text>;
  if (selectedImage) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: selectedImage }} />
    );
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon={"camera"} onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
