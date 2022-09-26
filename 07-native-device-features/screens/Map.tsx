import { Alert, StyleSheet, View } from "react-native";
import MapView, { LatLng, MapEvent, Marker, Region } from "react-native-maps";
import { useState, useLayoutEffect, useCallback } from "react";
import { ICoordinates } from "../models/place";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlaceStackParamList } from "../Stack/PlacesNavStack";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/ui/IconButton";

type MapNavProps = NativeStackNavigationProp<PlaceStackParamList, "Map">;

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng>();
  const region: Region = {
    latitude: 11.654275,
    longitude: 77.766467,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const navigation = useNavigation<MapNavProps>();

  function handleSelectLocation(mapEvent: MapEvent) {
    console.log(mapEvent);
    setSelectedLocation({
      latitude: mapEvent.nativeEvent.coordinate.latitude,
      longitude: mapEvent.nativeEvent.coordinate.longitude,
    });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No Location Picked!", "Please Pick a location");
      return;
    } else {
      navigation.navigate("AddPlace", {
        coordinates: {
          lat: selectedLocation.latitude,
          lng: selectedLocation.longitude,
        },
      });
    }
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          iconName={"save"}
          size={24}
          color={tintColor ?? "white"}
          onPress={savePickedLocationHandler}
        ></IconButton>
      ),
    });
  }, [navigation, savePickedLocationHandler]);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleSelectLocation}
    >
      {selectedLocation && (
        <Marker title="Picked Location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
