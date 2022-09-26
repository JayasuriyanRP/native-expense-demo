import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Platform,
  Linking,
} from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/styles";
import { useState, useEffect, FC } from "react";
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { ICoordinates } from "../../models/place";
import { getMapPreview } from "../../api/location";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlaceStackParamList } from "../../Stack/PlacesNavStack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

type AddPlaceNavProps = NativeStackNavigationProp<
  PlaceStackParamList,
  "AddPlace"
>;
type AddPlaceRoute = RouteProp<PlaceStackParamList, "AddPlace">;

interface LocationPickerProps {
  onLocationPicked: (coordinates: ICoordinates) => void;
}

const LocationPicker: FC<LocationPickerProps> = ({ onLocationPicked }) => {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const [location, setLocation] = useState<ICoordinates>();
  const navigation = useNavigation<AddPlaceNavProps>();
  const { params } = useRoute<AddPlaceRoute>();

  useEffect(() => {
    setLocation(params.coordinates);
  }, [params]);

  useEffect(() => {
    location && onLocationPicked(location);
  }, [location, onLocationPicked]);

  async function getLocationHandler() {
    const isPermissionAvailable = await verifyPermission();
    if (!isPermissionAvailable) {
      return;
    }
    const location = await getCurrentPositionAsync({
      accuracy: LocationAccuracy.Highest,
    });

    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    console.log(location);
  }

  async function verifyPermission() {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      console.log(permissionResponse);
      return permissionResponse.granted;
    }

    if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to provide location permission"
      );
      return false;
    }

    return true;
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  async function openMap() {
    console.log("open directions");
    Platform.select({
      ios: () => {
        Linking.openURL(
          `http://maps.apple.com/maps?daddr=${location?.lat},${location?.lng}`
        );
      },
      android: () => {
        Linking.openURL(
          `http://maps.google.com/maps?daddr=${location?.lat},${location?.lng}`
        );
      },
    });
  }

  let locationPreview = <Text>No Location Picked Yet</Text>;

  if (location) {
    locationPreview = (
      <Image
        style={styles.mapPreviewImage}
        source={{
          uri: getMapPreview(location.lat, location.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon={"location"} onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon={"map"} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default LocationPicker;
