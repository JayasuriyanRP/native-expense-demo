import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ExpenseModel } from "../../model/Expenses";

interface ExpensesSummaryProps {
  periodName: string;
  expenses: ExpenseModel[];
}

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({
  periodName,
  expenses,
}) => {
  let sumOfExpenses: number = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{sumOfExpenses.toFixed(2)} Rs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 16,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});

export default ExpensesSummary;
