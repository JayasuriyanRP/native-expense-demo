import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import Item from "../../Components/Products/Item";
import {
  IProductDataModel,
  ProductDataModel,
} from "../../Model/ProductDataModel";
import ProductDetailedViewScreen from "./ProductDetailedViewScreen";
import { ProductStackParamList } from "./ProductScreenStack";
import { Ionicons } from "@expo/vector-icons";

type productScreenProp = StackNavigationProp<ProductStackParamList, "Products">;

const ProductScreen = () => {
  let productDefaultModel: IProductDataModel[] = [
    new ProductDataModel(
      "1",
      "Beetroot Malt",
      [
        "https://cdn.shopify.com/s/files/1/0274/3481/articles/LYOFOOD-freeze-dried-organic-beetroot-powders-EU-01.jpg?v=1490710701",
        "https://5.imimg.com/data5/SG/YS/SE/SELLER-3698782/herbal-powders-traditional-1000x1000.jpg",
      ],
      [
        {
          cost: 30,
          imageUrl: [],
          name: "Beetroot",
          weightInGram: 1690,
        },
        {
          cost: 70,
          imageUrl: [],
          name: "Brown Sugar",
          weightInGram: 1690,
        },
        {
          cost: 60,
          imageUrl: [],
          name: "Cashew",
          weightInGram: 50,
        },
        {
          cost: 60,
          imageUrl: [],
          name: "Pista",
          weightInGram: 12.5,
        },
        {
          cost: 60,
          imageUrl: [],
          name: "Almond",
          weightInGram: 12.5,
        },
        {
          cost: 60,
          imageUrl: [],
          name: "Cardamon",
          weightInGram: 3,
        },
      ],
      50
    ),
    new ProductDataModel(
      "2",
      "Herbal Powder",
      [
        "https://5.imimg.com/data5/SG/YS/SE/SELLER-3698782/herbal-powders-traditional-1000x1000.jpg",
      ],
      [],
      0
    ),
  ];
  const [productModel, setProductModel] = useState(productDefaultModel);
  const [selectedId, setSelectedId] = useState("");
  const navigation = useNavigation<productScreenProp>();

  const renderItem = ({ item }: any) => {
    console.log(item, selectedId);
    const backgroundColor =
      item && item.id === selectedId ? "#668CEA" : "#C0E1ED";
    const color = item && item.id === selectedId ? "white" : "black";
    return (
      item && (
        <Item
          key={item.id}
          product={item}
          onPress={() => {
            setSelectedId(item.id);
            navigation.navigate("Info", item);
          }}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      )
    );
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={productModel}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          borderRadius: 50,
          position: "absolute",
          bottom: 10,
          right: 10,
          height: 50,
          width: 50,
        }}
        onPress={() => {
          navigation.navigate("AddProduct");
        }}
      >
        <Ionicons
          name="add"
          style={{
            alignItems: "center",
            display: "flex",
            color: "#ffff",
          }}
          size={20}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default ProductScreen;
