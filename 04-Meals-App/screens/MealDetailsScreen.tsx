import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { ProductStackParamList } from "../App";
import { useContext, useLayoutEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import SubTitle from "../components/MealDetails/SubTitle";
import List from "../components/MealDetails/List";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";

const MealDetailsScreen = () => {
  const route = useRoute<RouteProp<ProductStackParamList, "MealsDetails">>();
  const navigate =
    useNavigation<StackNavigationProp<ProductStackParamList, "MealsDetails">>();

  const favoriteContext = useContext(FavoritesContext);
  const mealId = route.params.mealId;
  const foundMeal = MEALS.find((x) => x.id === mealId);

  const isMealFavorite = favoriteContext?.ids.includes(mealId);

  function onHeaderButtonPressed() {
    if (isMealFavorite) {
      favoriteContext?.removeFavorites(mealId);
    } else {
      favoriteContext?.addFavorites(mealId);
    }
    console.log("Pressed");
  }

  useLayoutEffect(() => {
    navigate.setOptions({
      headerTitle: foundMeal?.title,
      headerRight: () => {
        return (
          <IconButton
            onPress={onHeaderButtonPressed}
            color="white"
            isFav={isMealFavorite ? true : false}
          />
        );
      },
    });
  }, [mealId, foundMeal, navigate, onHeaderButtonPressed]);

  if (!foundMeal) {
    return null;
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: foundMeal.imageUrl }} />
      <Text style={styles.title}>{foundMeal.title}</Text>
      <MealDetails
        duration={foundMeal.duration}
        complexity={foundMeal.complexity}
        affordability={foundMeal.affordability}
        textStyle={styles.detailsText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <SubTitle title="Ingredients" />
          <List items={foundMeal.ingredients} />
          <SubTitle title="Steps" />
          <List items={foundMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailsText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});

export default MealDetailsScreen;
