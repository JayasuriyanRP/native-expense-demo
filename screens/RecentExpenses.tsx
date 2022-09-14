import { StyleSheet, View, Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/ExpenseContext";

const RecentExpenses = () => {
  const expenseContext = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      periodName="Last 1 month"
      expenses={expenseContext?.expense}
    />
  );
};

const styles = StyleSheet.create({});

export default RecentExpenses;
