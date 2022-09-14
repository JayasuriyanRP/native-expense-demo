import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ExpenseNavStackParamList = {
  ManageExpenses: {
    expenseId?: string;
  };
  ExpensesOverView: any;
};

export type ExpenseBottonParamList = {
  AllExpenses: any;
  RecentExpenses: any;
};

export type ExpenseItemNavStackProps = NativeStackNavigationProp<
  ExpenseNavStackParamList,
  "ExpensesOverView"
>;
