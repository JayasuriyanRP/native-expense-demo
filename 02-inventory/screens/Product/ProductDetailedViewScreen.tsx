import { useRoute } from "@react-navigation/native";
import React, { Profiler, useState } from "react";
import { ProductStackParamList } from "./ProductScreenStack";
import { IProductDataModel } from "../../Model/ProductDataModel";
import { Dimensions, SafeAreaView, StatusBar, ScrollView } from "react-native";
import {
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  View,
  TextStyle,
} from "react-native";
import Swiper from "react-native-swiper";
import IngredientItem from "../../Components/Products/IngrediantItem";
import { calculateSum } from "../../Helper/Helpers";
let { width, height } = Dimensions.get("window");

interface IProductDetailsViewData {}

const ProductDetailedViewScreen = () => {
  const route = useRoute();
  const product = route.params as IProductDataModel;

  let netCost = calculateSum(product.ingredients.map((x) => x.cost));
  let netWeight = calculateSum(product.ingredients.map((x) => x.weightInGram));
  return (
    <ScrollView style={styles.conatiner}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>{product.name}</Text>
      <Swiper
        style={styles.swiper}
        loop={false}
        height={250}
        dot={
          <View
            style={{
              backgroundColor: "#D3F2DD",
              width: 13,
              height: 13,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: "#066124",
              width: 13,
              height: 13,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
            }}
          />
        }
        paginationStyle={{
          bottom: 0,
        }}
        centerContent={true}
      >
        {product.imageUrl.map((x, index) => (
          <View key={index} style={styles.slide}>
            <Image
              style={styles.image}
              source={{
                uri: x,
              }}
            />
          </View>
        ))}
      </Swiper>

      {product.ingredients && product.ingredients.length > 0 && (
        <>
          <Text style={styles.subHeadings}>Ingredients</Text>

          <View style={{ marginTop: 20 }}>
            {product.ingredients.map((x) => {
              return <IngredientItem key={x.name} ingredient={x} />;
            })}
          </View>

          <Text style={styles.subHeadings}>Price Calculation</Text>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.costText}>
              Ingredients Cost - {netCost + product.labourCost} Rs
            </Text>
            {product.labourCost && (
              <Text style={styles.costText}>
                Labour Cost - {product.labourCost} Rs
              </Text>
            )}
            <Text style={styles.costText}>Total Weight - {netWeight} gm</Text>
            <Text style={styles.costText}>
              Profit Percentage -
              {netCost ? (netCost + product.labourCost) * 0.3 : 0}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  swiper: {},
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 30,
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
  },
  subHeadings: {
    marginTop: 20,
    fontSize: 20,
  },
  slide: {
    flex: 1,
    backgroundColor: "transparent",
  },
  imgBackground: {
    width,
    backgroundColor: "transparent",
    position: "absolute",
  },

  image: {
    alignItems: "center",
    flex: 1,
  },

  costText: {
    fontSize: 25,
    backgroundColor: "#98BAD9",
    marginHorizontal: 8,
    padding: 8,
    marginBottom: 4,
    borderRadius: 10,
  },
});

export default ProductDetailedViewScreen;
