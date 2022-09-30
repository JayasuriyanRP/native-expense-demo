import { FC, useLayoutEffect } from "react";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ProductStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import MealsList from "../components/MealsList/MealsList";

const MealsOverviewScreen: FC = () => {
  const route = useRoute<RouteProp<ProductStackParamList, "MealsOverview">>();
  const navigation =
    useNavigation<
      StackNavigationProp<ProductStackParamList, "MealsOverview">
    >();

  let currentCategoryId = route.params.categoryId;

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((x) => x.id === currentCategoryId);
    navigation.setOptions({ headerTitle: categoryTitle?.title });
  }, [currentCategoryId, navigation]);

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(currentCategoryId) >= 0;
  });

  const onMealItemPressed = (mealId: string) => {
    navigation.navigate("MealsDetails", {
      mealId: mealId,
    });
  };

  return (
    <MealsList
      mealsToDisplay={displayedMeals}
      onMealItemPressed={onMealItemPressed}
    />
  );
};

export default MealsOverviewScreen;
