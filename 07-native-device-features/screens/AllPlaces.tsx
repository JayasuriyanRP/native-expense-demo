import { View, Text, StyleSheet } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect, useEffect } from "react";
import IconButton from "../components/ui/IconButton";
import { PlaceStackParamList } from "../Stack/PlacesNavStack";
import { useState } from "react";
import { IPlace, Place } from "../models/place";
import { fetchPlaces } from "../util/database";

type AuthNavProps = NativeStackNavigationProp<PlaceStackParamList, "AllPlaces">;

// type AllPlaceRoute = RouteProp<PlaceStackParamList, "AllPlaces">;

const AllPlaces: React.FC = () => {
  const navigation = useNavigation<AuthNavProps>();
  // const route = useRoute<AllPlaceRoute>();

  const isFocused = useIsFocused();

  const [loadPlace, setLoadPlace] = useState<IPlace[]>([]);

  useEffect(() => {
    async function loadPlaces() {
      const result = await fetchPlaces();
      setLoadPlace(result);
    }

    if (isFocused) {
      // if (isFocused && route.params && route.params.place) {
      loadPlaces();
      //setLoadPlace((current) => [...current, route.params.place]);
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor ?? "white"}
          iconName="add"
          size={30}
          onPress={() => {
            navigation.navigate("AddPlace", { coordinates: undefined });
          }}
        />
      ),

      animation: "fade_from_bottom",
    });
  }, []);
  return <PlacesList places={loadPlace} />;
};

export default AllPlaces;
