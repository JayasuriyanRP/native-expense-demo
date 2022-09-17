import { StyleSheet, View, Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../store/ExpenseContext";
import { fetchExpense } from "../api/http";
import { ExpenseModel } from "../model/Expenses";
import { ActionType } from "../store/ExpenseReducer";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const expenseContext = useContext(ExpenseContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      let expensesFetched: ExpenseModel[] = [];
      try {
        expensesFetched = await fetchExpense();
        expenseContext.dispatch({
          type: ActionType.SetExpenses,
          payload: {
            expenses: expensesFetched,
          },
        });
      } catch (err) {
        console.log(err, "Fetch");
        setError("Could not fetch Expenses");
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error && !isLoading) {
    return (
      <ErrorOverlay message={error} onConfirm={() => setError(undefined)} />
    );
  }

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
