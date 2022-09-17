import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ListViewComponent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import Item from "./Item";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Malt",
    image:
      "https://cdn.shopify.com/s/files/1/0274/3481/articles/LYOFOOD-freeze-dried-organic-beetroot-powders-EU-01.jpg?v=1490710701",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item1 = ({ item }: any) => {
  console.log(item);
  return (
    <View style={styles.item}>
      <Text style={styles.title}>Hello - {item.title}</Text>
    </View>
  );
};

export default function ProductsComponent({ navigation }: any) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }: any) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#91DDF9";
    const color = item.id === selectedId ? "white" : "black";
    console.log(item, selectedId);
    return (
      <Item
        key={item.id}
        product={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
