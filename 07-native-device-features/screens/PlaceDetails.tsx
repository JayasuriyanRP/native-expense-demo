import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/styles";
import { PlaceStackParamList } from "../Stack/PlacesNavStack";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";
import { IPlace } from "../models/place";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PlaceDetailsRoute = RouteProp<PlaceStackParamList, "PlaceDetail">;
type PlaceDetailsNavProps = NativeStackNavigationProp<
  PlaceStackParamList,
  "PlaceDetail"
>;

const PlaceDetails: React.FC = () => {
  const { params } = useRoute<PlaceDetailsRoute>();
  const navigation = useNavigation<PlaceDetailsNavProps>();

  const selectedPlaceId = params.placeId;

  const [currentPlace, setCurrentPlace] = useState<IPlace>();

  useEffect(() => {
    async function fetchData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      navigation.setOptions({
        headerTitle: place.title,
      });
      setCurrentPlace(place);
    }

    fetchData();
  }, [selectedPlaceId]);

  function handleViewOnMap() {}
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: currentPlace?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}></Text>
        </View>
        <OutlinedButton icon={"map"} onPress={handleViewOnMap}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default PlaceDetails;
