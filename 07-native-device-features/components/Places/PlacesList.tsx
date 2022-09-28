import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { Colors } from "../../constants/styles";
import { IPlace } from "../../models/place";
import { PlaceStackParamList } from "../../Stack/PlacesNavStack";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

interface PlacesListProps {
  places: IPlace[];
}

type AllPlacesNavProps = NativeStackNavigationProp<
  PlaceStackParamList,
  "AllPlaces"
>;

const PlacesList: FC<PlacesListProps> = ({ places }) => {
  const naviagtion = useNavigation<AllPlacesNavProps>();

  const renderListItem = ({ item: place }: ListRenderItemInfo<IPlace>) => {
    const onSelectItem = (id: string) => {
      naviagtion.navigate("PlaceDetail", {
        placeId: id,
      });
    };

    return <PlaceItem place={place} onSelected={onSelectItem} />;
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No Places available</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={renderListItem}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary50,
  },
  list: {
    margin: 24,
  },
});

export default PlacesList;
