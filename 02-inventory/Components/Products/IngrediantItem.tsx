import { IIngredientsModel } from "../../Model/ProductDataModel";
import { View, Text, StyleSheet } from "react-native";

interface IngredientProps {
  ingredient: IIngredientsModel;
}

const IngredientItem = ({ ingredient }: IngredientProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.entry}>{ingredient.name}</Text>
      <Text style={styles.entry}>{ingredient.weightInGram} gm</Text>
      <Text style={styles.entry}>{ingredient.cost} Rs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 2,
    backgroundColor: "#D8B9EF",
    padding: 15,
    borderRadius: 10,
  },
  entry: {
    fontSize: 15,
  },
});

export default IngredientItem;
