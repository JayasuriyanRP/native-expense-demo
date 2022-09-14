import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/ExpenseContext";

const AllExpenses = () => {
  const expenseContext = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={expenseContext?.expenses}
      periodName="Total"
      fallBackText="No Expenses"
    />
  );
};

const styles = StyleSheet.create({});

export default AllExpenses;
