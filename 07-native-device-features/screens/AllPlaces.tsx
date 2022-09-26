import { View, Text, StyleSheet } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import IconButton from "../components/ui/IconButton";
import { PlaceStackParamList } from "../Stack/PlacesNavStack";

type AuthNavProps = NativeStackNavigationProp<PlaceStackParamList, "AllPlaces">;

const AllPlaces: React.FC = () => {
  const navigation = useNavigation<AuthNavProps>();
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
  return <PlacesList places={[]} />;
};

export default AllPlaces;
