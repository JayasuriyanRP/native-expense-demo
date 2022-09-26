import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "../screens/AllPlaces";
import AddPlace from "../screens/AddPlaces";
import Map from "../screens/Map";
import { ParamListBase } from "@react-navigation/native";
import { Colors } from "../constants/styles";
import { ICoordinates } from "../models/place";

const Stack = createNativeStackNavigator();

const PlacesNavStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.gray700,
        contentStyle: { backgroundColor: Colors.gray700 },
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={{
          title: "Your Faviorite Places",
        }}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlace}
        options={{
          title: "Add a new Place",
        }}
      />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default PlacesNavStack;

export type PlaceStackParamList = {
  AllPlaces: any;
  AddPlace: {
    coordinates?: ICoordinates;
  };
  Map: any;
};
