import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  BackHandler,
} from "react-native";
import { useState, useCallback } from "react";
import { Colors } from "../../constants/styles";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { ICoordinates } from "../../models/place";
const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState<string>();
  const [pickedImage, setPickedImage] = useState<string>();
  const [pickedLocation, setPickedLocation] = useState<ICoordinates>();

  function changeTitleHandler(title: string) {
    setEnteredTitle(title);
  }

  function takeImageHandler(imageUri: string) {
    setPickedImage(imageUri);
  }

  const locationPickedHandler = useCallback(
    (locationCoordinate: ICoordinates) => {
      setPickedLocation(locationCoordinate);
    },
    []
  );

  function saveFormHandler() {
    console.log(enteredTitle, pickedImage, pickedLocation);
  }

  return (
    <ScrollView style={styles.formContainer}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onImagePicked={takeImageHandler} />
      <LocationPicker onLocationPicked={locationPickedHandler} />

      <Button onPress={saveFormHandler}>Save</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
export default PlaceForm;
