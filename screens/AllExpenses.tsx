import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/ExpenseContext";

const AllExpenses = () => {
  const expenseContext = useContext(ExpenseContext);
  console.log("Reloaded", expenseContext);
  return (
    <ExpensesOutput expenses={expenseContext?.expense} periodName="Total" />
  );
};

const styles = StyleSheet.create({});

export default AllExpenses;
