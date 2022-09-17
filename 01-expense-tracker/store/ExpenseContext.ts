import { createContext, Dispatch } from "react";
import { ExpenseModel } from "../model/Expenses";
import { ExpenseActions } from "./ExpenseReducer";

interface ExpenseContextValue {
  expenses: ExpenseModel[];
  dispatch: React.Dispatch<ExpenseActions>;
}

export const ExpenseContext = createContext<ExpenseContextValue>({
  expenses: [],
  dispatch: () => {},
});
