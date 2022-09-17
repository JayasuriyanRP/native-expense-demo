import { StyleSheet, View, FlatList, ListRenderItemInfo } from "react-native";
import Meal from "../../models/meal";
import MealItem from "./MealItem";

interface IMealsList {
  mealsToDisplay: Meal[];
  onMealItemPressed: (id: string) => void;
}

const MealsList: React.FC<IMealsList> = ({
  mealsToDisplay,
  onMealItemPressed,
}) => {
  const renderMealItem = (meals: ListRenderItemInfo<Meal>) => {
    return (
      <MealItem
        title={meals.item.title}
        imageUri={meals.item.imageUrl}
        duration={meals.item.duration}
        complexity={meals.item.complexity}
        affordability={meals.item.affordability}
        onPress={() => onMealItemPressed(meals.item.id)}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={mealsToDisplay}
        keyExtractor={(meal) => meal.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MealsList;
