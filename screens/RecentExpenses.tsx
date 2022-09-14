import { StyleSheet, View, Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/ExpenseContext";

const RecentExpenses = () => {
  const expenseContext = useContext(ExpenseContext);

  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const today = new Date();
    let last7Days = getReducedDateFromMonth(today, 1);
    return expense.date > last7Days;
  });
  return (
    <ExpensesOutput
      periodName="Last 1 month"
      expenses={recentExpenses}
      fallBackText="No Expense in last 1 month"
    />
  );
};

const styles = StyleSheet.create({});

export default RecentExpenses;

const getReducedDateFromMonth = (date: Date, days: number) => {
  return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
};
