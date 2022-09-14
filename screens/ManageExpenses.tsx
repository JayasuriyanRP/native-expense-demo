import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { ExpenseNavStackParamList } from "./NavigationProps";
import { StackNavigationProp } from "@react-navigation/stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect, useContext } from "react";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/ExpenseContext";
import { ActionType } from "../store/ExpenseReducer";

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

  const expenseId = router.params?.expenseId;
  const isEdit = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdit]);

  function handleDeleteExpense() {
    if (expenseId) {
      expenseContext?.dispatch({
        type: ActionType.Delete,
        payload: { id: expenseId },
      });
    }
    handleGoBack();
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleconfirmExpense() {
    let expenseData = expenseContext.expenses;
    if (isEdit) {
      var expense = expenseData.find((x) => x.id === expenseId);
      if (expense) {
        expenseContext.dispatch({
          type: ActionType.Update,
          payload: { ...expense, id: expenseId, date: new Date() },
        });
      }
      // expenseContext?.updateExpense(expenseId, expenseContext)
    } else {
      expenseContext.dispatch({
        type: ActionType.Add,
        payload: {
          description: "Test",
          amount: 12.34,
          date: new Date(),
        },
      });
    }
    handleGoBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode={"flat"} onPress={handleGoBack} style={styles.button}>
          Cancel
        </Button>
        <Button
          mode={"normal"}
          onPress={handleconfirmExpense}
          style={styles.button}
        >
          {isEdit ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ManageExpenses;
