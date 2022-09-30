import { Text, StyleSheet, View } from "react-native";
import MealsList from "../components/MealsList/MealsList";
import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import { ProductStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
const FavoritesScreen = () => {
  const favorites = useContext(FavoritesContext);
  const navigation =
    useNavigation<
      StackNavigationProp<ProductStackParamList, "FavoritesScreen">
    >();
  const onMealItemPressed = (mealId: string) => {
    navigation.navigate("MealsDetails", {
      mealId: mealId,
    });
  };

  const meals = MEALS.filter((x) => favorites?.ids.includes(x.id));

  if (meals.length === 0) {
    return (
      <View style={styles.root}>
        <Text style={styles.textStyle}>You have no favorite meals yet.</Text>
      </View>
    );
  }
  return (
    <MealsList mealsToDisplay={meals} onMealItemPressed={onMealItemPressed} />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
