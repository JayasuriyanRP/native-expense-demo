import { StyleSheet, View, Text, FlatList } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";
import { ExpenseModel } from "../../model/Expenses";

interface ExpensesOutputProps {
  expenses: ExpenseModel[] | undefined;
  periodName: string;
  fallBackText: string;
}

const DUMMY_EXPENSE: ExpenseModel[] = [
  {
    id: "e1",
    description: "Tablet Accessories",
    amount: 1400,
    date: new Date("2022-08-11"),
  },
  {
    id: "e2",
    description: "Rechargable Cell",
    amount: 400,
    date: new Date("2022-07-20"),
  },
  {
    id: "e3",
    description: "TPU Fillament ",
    amount: 1200,
    date: new Date("2022-07-11"),
  },
  {
    id: "e4",
    description: "Samsung S6 Tablet",
    amount: 32000,
    date: new Date("2022-07-11"),
  },
  {
    id: "e5",
    description: "S Pen tip",
    amount: 399,
    date: new Date("2022-09-11"),
  },
  {
    id: "e6",
    description: "Cell Charger",
    amount: 600,
    date: new Date("2022-07-20"),
  },
];
const ExpensesOutput: React.FC<ExpensesOutputProps> = ({
  expenses,
  periodName,
  fallBackText,
}) => {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;
  if (expenses && expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses ?? []} periodName={periodName} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

export default ExpensesOutput;
