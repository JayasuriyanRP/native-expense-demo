import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from "react-native";
import { IProductDataModel } from "../../Model/ProductDataModel";

interface IItem {
  product: IProductDataModel | null;
  onPress: () => void;
  backgroundColor: ViewStyle;
  textColor: TextStyle;
}

const Item = ({ product, onPress, backgroundColor, textColor }: IItem) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    {product && product.imageUrl && (
      <Image
        style={styles.tinyLogo}
        source={{
          uri: product.imageUrl[0],
        }}
      />
    )}
    <Text style={[styles.title, textColor]}>{product?.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tinyLogo: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  item: {
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  title: {
    fontSize: 17,
    marginLeft: 30,
  },
});

export default Item;
