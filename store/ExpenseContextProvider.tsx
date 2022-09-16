import { useReducer, useState } from "react";
import { ExpenseModel } from "../model/Expenses";
import { ExpenseActions, ExpenseReducer } from "./ExpenseReducer";
import { ExpenseContext } from "./ExpenseContext";

interface ExpenseContextProviderProps {
  children: React.ReactNode;
}

const mainReducer = (expense: ExpenseModel[], action: ExpenseActions) => ({
  expense: ExpenseReducer(expense, action),
});

const ExpenseContextProvider: React.FC<ExpenseContextProviderProps> = ({
  children,
}) => {
  const [expensesState, dispatchAction] = useReducer(ExpenseReducer, []);

  return (
    <ExpenseContext.Provider
      value={{ expenses: expensesState, dispatch: dispatchAction }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
