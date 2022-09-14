import { createContext, Dispatch } from "react";
import { ExpenseModel } from "../model/Expenses";
import { ExpenseActions } from "./ExpenseReducer";

interface ExpenseContextValue {
  expense: ExpenseModel[];
  dispatch: React.Dispatch<ExpenseActions>;
}

export const ExpenseContext = createContext<ExpenseContextValue>({
  expense: [],
  dispatch: () => {},
});
