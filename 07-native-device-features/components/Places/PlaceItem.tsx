import { FC } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Colors } from "../../constants/styles";
import { IPlace } from "../../models/place";

interface PlaceItemProps {
  place: IPlace;
  onSelected: () => void;
}

const PlaceItem: FC<PlaceItemProps> = ({ place, onSelected }) => {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, styles.item]}
      onPress={onSelected}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>
          {place.location.lat}-{place.location.lng}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 8,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    flex: 1,
    width: "100%",
    height: 100,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontWeight: "bold",
    fontSize: 12,
    color: Colors.gray700,
  },
});

export default PlaceItem;
