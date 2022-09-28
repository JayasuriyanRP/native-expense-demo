import { RouteProp, useNavigation } from "@react-navigation/native";
import { FC } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { PlaceStackParamList } from "../Stack/PlacesNavStack";
import { Place } from "../models/place";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { addPlace } from "../util/database";

type AddPlaceNavProps = NativeStackNavigationProp<
  PlaceStackParamList,
  "AddPlace"
>;
type AddPlaceRoute = RouteProp<PlaceStackParamList, "AddPlace">;

const AddPlace: FC = () => {
  const navigation = useNavigation<AddPlaceNavProps>();

  async function handlePlaceCreation(place: Place) {
    await addPlace(place);
    navigation.navigate("AllPlaces");
  }
  return <PlaceForm onCreatePlace={handlePlaceCreation} />;
};

export default AddPlace;
