import { useReducer, useState } from "react";
import { ExpenseModel } from "../model/Expenses";
import { ExpenseActions, ExpenseReducer } from "./ExpenseReducer";
import { ExpenseContext } from "./ExpenseContext";

interface ExpenseContextProviderProps {
  children: React.ReactNode;
}

const DUMMY_EXPENSE: ExpenseModel[] = [
  {
    id: "e1",
    description: "Tablet Accessories",
    amount: 1400,
    date: new Date("2022-08-11"),
  },
  {
    id: "e2",
    description: "Rechargable Cell",
    amount: 400,
    date: new Date("2022-07-20"),
  },
  {
    id: "e3",
    description: "TPU Fillament ",
    amount: 1200,
    date: new Date("2022-07-11"),
  },
  {
    id: "e4",
    description: "Samsung S6 Tablet",
    amount: 32000,
    date: new Date("2022-07-11"),
  },
  {
    id: "e5",
    description: "S Pen tip",
    amount: 399,
    date: new Date("2022-09-11"),
  },
  {
    id: "e6",
    description: "Cell Charger",
    amount: 600,
    date: new Date("2022-07-20"),
  },
];

const mainReducer = (expense: ExpenseModel[], action: ExpenseActions) => ({
  expense: ExpenseReducer(expense, action),
});

const ExpenseContextProvider: React.FC<ExpenseContextProviderProps> = ({
  children,
}) => {
  const [expensesState, dispatchAction] = useReducer(
    ExpenseReducer,
    DUMMY_EXPENSE
  );

  console.log(expensesState);
  return (
    <ExpenseContext.Provider
      value={{ expense: expensesState, dispatch: dispatchAction }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
