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
import PlaceItem from "./PlaceItem";

interface PlacesListProps {
  places: IPlace[];
}
const PlacesList: FC<PlacesListProps> = ({ places }) => {
  const renderListItem = ({ item: place }: ListRenderItemInfo<IPlace>) => {
    return <PlaceItem place={place} onSelected={() => {}} />;
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
