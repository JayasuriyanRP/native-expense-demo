import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import { ExpenseModel } from "../../model/Expenses";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ExpenseNavStackParamList } from "../../screens/NavigationProps";
import Button from "../UI/Button";

interface ExpenseFormProps {
  currentExpense: ExpenseModel | undefined;
  onCancel: () => void;
  submitButtonLabel: string;
  onSubmitExpense: (expense: ExpenseModel) => void;
}

interface FormField {
  value: string;
  isValid: boolean;
}

interface FormInputs {
  date: FormField;
  description: FormField;
  amount: FormField;
}

type ManageExpensesNavProps = NativeStackNavigationProp<
  ExpenseNavStackParamList,
  "ManageExpenses"
>;

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  currentExpense,
  onCancel,
  submitButtonLabel,
  onSubmitExpense,
}) => {
  const [inputs, setInput] = useState<FormInputs>({
    date: {
      value: currentExpense
        ? currentExpense.date.toISOString().slice(0, 10)
        : "",
      isValid: true,
    },
    description: {
      value: currentExpense
        ? currentExpense.description.trimEnd().trimStart()
        : "",
      isValid: true,
    },
    amount: {
      value: currentExpense ? currentExpense.amount.toString() : "",
      isValid: true,
    },
  });

  function inputChangedHandler(
    inputIdentifier: "date" | "description" | "amount",
    enteredValue: string
  ) {
    setInput((currentValue) => {
      return {
        ...currentValue,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  }

  function submitHandler() {
    const expenseDataFormatted: ExpenseModel = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const descriptionValid = expenseDataFormatted.description.trim().length > 0;
    const dateValid = expenseDataFormatted.date.toString() !== "Invalid Date";
    const amountValid =
      !isNaN(expenseDataFormatted.amount) && expenseDataFormatted.amount > 0;

    if (descriptionValid && dateValid && amountValid) {
      onSubmitExpense(expenseDataFormatted);
    } else {
      setInput((currentInput) => {
        return {
          amount: { value: currentInput.amount.value, isValid: amountValid },
          description: {
            value: currentInput.description.value,
            isValid: descriptionValid,
          },
          date: { value: currentInput.date.value, isValid: dateValid },
        };
      });
      // Alert.alert("Invalid Input", "Please check your input fields");
    }
  }

  return (
    <View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Your Expenses</Text>
        <View style={styles.inputsRow}>
          <Input
            label="Amount"
            style={styles.rowInput}
            textInputConfig={{
              value: inputs.amount.value,
              keyboardType: "decimal-pad",
              onChangeText: inputChangedHandler.bind(this, "amount"),
            }}
            isValid={inputs.amount.isValid}
          />
          <Input
            label="Date"
            style={styles.rowInput}
            textInputConfig={{
              value: inputs.date.value,
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangedHandler.bind(this, "date"),
            }}
            isValid={inputs.date.isValid}
          />
        </View>
        <Input
          label="Description"
          textInputConfig={{
            value: inputs.description.value,
            multiline: true,
            autoCapitalize: "sentences",
            onChangeText: inputChangedHandler.bind(this, "description"),
          }}
          isValid={inputs.description.isValid}
        />
      </View>
      <View style={styles.buttons}>
        <Button mode={"flat"} onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button mode={"normal"} onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
export default ExpenseForm;
