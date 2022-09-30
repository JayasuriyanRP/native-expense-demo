import { FC } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Category from "../models/category";
import CategoryGridTile from "../components/CategoryGridTile";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProductStackParamList } from "../App";

interface CategoriesScreenProps {}

type productScreenProp = StackNavigationProp<
  ProductStackParamList,
  "MealsCategories"
>;

const CategoriesScreen = () => {
  const navigation = useNavigation<productScreenProp>();

  const renderCategories = (itemData: ListRenderItemInfo<Category>) => {
    function pressHandler() {
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderCategories}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;
