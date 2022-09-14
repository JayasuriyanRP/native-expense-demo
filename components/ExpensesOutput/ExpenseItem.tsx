import { Text, View, StyleSheet, Pressable } from "react-native";
import { ExpenseModel } from "../../model/Expenses";
import { GlobalStyles } from "../../constants/styles";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  ExpenseItemNavStackProps,
  ExpenseNavStackParamList,
} from "../../screens/NavigationProps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ExpenseItemProps {
  expenseItem: ExpenseModel;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expenseItem }) => {
  const navigator = useNavigation<ExpenseItemNavStackProps>();

  const expensePressHandler = () => {
    navigator.navigate("ManageExpenses", {
      expenseId: expenseItem.id,
    });
  };
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={expensePressHandler}
    >
      <View style={styles.container}>
        <View>
          <Text style={[styles.textbase, styles.description]}>
            {expenseItem.description}
          </Text>
          <Text style={styles.textbase}>{expenseItem.date.toDateString()}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            {expenseItem.amount.toFixed(2)} Rs
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
  },
  textbase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  priceText: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
export default ExpenseItem;
