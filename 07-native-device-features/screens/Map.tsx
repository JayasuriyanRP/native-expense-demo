import { Alert, StyleSheet, View } from "react-native";
import MapView, { LatLng, MapEvent, Marker, Region } from "react-native-maps";
import { useState, useLayoutEffect, useCallback } from "react";
import { ICoordinates } from "../models/place";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlaceStackParamList } from "../Stack/PlacesNavStack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import IconButton from "../components/ui/IconButton";

type MapNavProps = NativeStackNavigationProp<PlaceStackParamList, "Map">;
type MapRoute = RouteProp<PlaceStackParamList, "Map">;

const Map = () => {
  const { params } = useRoute<MapRoute>();
  const initialLocation = params && params.coordinates;

  const [selectedLocation, setSelectedLocation] = useState<LatLng | undefined>(
    initialLocation && {
      latitude: initialLocation.lat,
      longitude: initialLocation.lng,
    }
  );

  const region: Region = {
    latitude: initialLocation ? initialLocation.lat : 11.654275,
    longitude: initialLocation ? initialLocation.lng : 77.766467,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const navigation = useNavigation<MapNavProps>();

  function handleSelectLocation(mapEvent: MapEvent) {
    if (initialLocation) {
      return;
    }
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
    if (initialLocation) {
      return;
    }
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
