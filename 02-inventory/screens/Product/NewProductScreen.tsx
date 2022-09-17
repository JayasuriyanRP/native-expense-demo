import React from "react";
import type { StackScreenProps } from "@react-navigation/stack";
import { View, Text, TextInput } from "react-native";

interface NewProductProps {
  navigator: StackScreenProps<any, any>;
}

const NewProduct = () => {
  return (
    <View>
      <Text>Product Name</Text>
      <TextInput placeholder="Product Name" />
    </View>
  );
};

export default NewProduct;
