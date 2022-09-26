import { FC } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { IPlace } from "../../models/place";

interface PlaceItemProps {
  place: IPlace;
  onSelected: () => void;
}

const PlaceItem: FC<PlaceItemProps> = ({ place, onSelected }) => {
  return (
    <Pressable onPress={onSelected}>
      <View>
        <Image source={{ uri: place.imageUri }} />
        <View>{place.title}</View>
        <View>{place.address}</View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default PlaceItem;
