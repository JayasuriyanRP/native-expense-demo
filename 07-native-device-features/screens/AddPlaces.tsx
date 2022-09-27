import { RouteProp, useNavigation } from "@react-navigation/native";
import { FC } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { PlaceStackParamList } from "../Stack/PlacesNavStack";
import { Place } from "../models/place";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AddPlaceNavProps = NativeStackNavigationProp<
  PlaceStackParamList,
  "AddPlace"
>;
type AddPlaceRoute = RouteProp<PlaceStackParamList, "AddPlace">;

const AddPlace: FC = () => {
  const navigation = useNavigation<AddPlaceNavProps>();

  function handlePlaceCreation(place: Place) {
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }
  return <PlaceForm onCreatePlace={handlePlaceCreation} />;
};

export default AddPlace;
