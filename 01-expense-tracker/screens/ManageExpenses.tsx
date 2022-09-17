import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { ExpenseNavStackParamList } from "./NavigationProps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect, useContext, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { ExpenseContext } from "../store/ExpenseContext";
import { ActionType } from "../store/ExpenseReducer";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { ExpenseModel } from "../model/Expenses";
import { storeExpense, deleteExpense, updateExpense } from "../api/http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorOverlay from "../components/UI/ErrorOverlay";

type ManageExpensesRoute = RouteProp<
  ExpenseNavStackParamList,
  "ManageExpenses"
>;

type ManageExpensesNavProps = NativeStackNavigationProp<
  ExpenseNavStackParamList,
  "ManageExpenses"
>;

const ManageExpenses = () => {
  const router = useRoute<ManageExpensesRoute>();
  const navigation = useNavigation<ManageExpensesNavProps>();
  const expenseContext = useContext(ExpenseContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const expenseId = router.params?.expenseId;
  const isEdit = !!expenseId;
  const currentExpense = expenseContext.expenses.find(
    (x) => x.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdit]);

  async function handleDeleteExpense() {
    if (expenseId) {
      setIsLoading(true);
      try {
        await deleteExpense(expenseId);
        expenseContext?.dispatch({
          type: ActionType.Delete,
          payload: { id: expenseId },
        });
        handleGoBack();
      } catch (err) {
        setError("Could not delete an Expense...");
        setIsLoading(false);
      }
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  async function submitHandler(expense: ExpenseModel) {
    console.log(expense);
    setIsLoading(true);
    if (isEdit) {
      if (expense) {
        try {
          expenseContext.dispatch({
            type: ActionType.Update,
            payload: { ...expense, id: expenseId },
          });
          await updateExpense(expenseId, { ...expense });
          handleGoBack();
        } catch (err) {
          setError("Cannot Update the Expense...");
        }
      }
      // expenseContext?.updateExpense(expenseId, expenseContext)
    } else {
      try {
        const id = await storeExpense(expense);
        expenseContext.dispatch({
          type: ActionType.Add,
          payload: { ...expense, id: id },
        });
        handleGoBack();
      } catch (err) {
        console.log("add error", err);
        setError("Cannot add new expense...");
      }
    }
    setIsLoading(false);
  }

  if (error && !isLoading) {
    return (
      <ErrorOverlay message={error} onConfirm={() => setError(undefined)} />
    );
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        currentExpense={currentExpense}
        onCancel={handleGoBack}
        submitButtonLabel={isEdit ? "Update" : "Add"}
        onSubmitExpense={submitHandler}
      />
      {isEdit && (
        <View style={styles.deleteButtonContainer}>
          <IconButton
            iconName={"trash"}
            color={GlobalStyles.colors.error500}
            size={30}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteButtonContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpenses;
