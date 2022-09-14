import {
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  View,
  Text,
} from "react-native";
import { ExpenseModel } from "../../model/Expenses";
import ExpenseItem from "./ExpenseItem";

interface ExpensesListProps {
  expenses: ExpenseModel[];
}
const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
  const renderExpenseListItem = (item: ListRenderItemInfo<ExpenseModel>) => {
    return <ExpenseItem expenseItem={item.item} />;
  };

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseListItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    height: 10,
  },
  container: {
    flex: 1,
  },
});

export default ExpensesList;
