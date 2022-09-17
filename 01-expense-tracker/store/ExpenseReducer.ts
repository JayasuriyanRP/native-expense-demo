import { ExpenseModel } from "../model/Expenses";

export enum ActionType {
  Add = "ADD",
  Update = "UPDATE",
  Delete = "DELETE",
  SetExpenses = "SETEXPENSES",
}

type ExpensePayload = {
  [ActionType.Add]: ExpenseModel;
  [ActionType.Update]: ExpenseModel;
  [ActionType.Delete]: {
    id: string;
  };
  [ActionType.SetExpenses]: {
    expenses: ExpenseModel[];
  };
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type ExpenseActions =
  ActionMap<ExpensePayload>[keyof ActionMap<ExpensePayload>];

export const ExpenseReducer = (
  state: ExpenseModel[],
  action: ExpenseActions
) => {
  switch (action.type) {
    case ActionType.Add:
      return [{ ...action.payload }, ...state];
    case ActionType.Update:
      const indexToUpdate = state.findIndex((x) => x.id === action.payload.id);
      const expenseToUpdate = state[indexToUpdate];
      const updatedExpense: ExpenseModel = {
        ...expenseToUpdate,
        description: action.payload.description,
        date: action.payload.date,
        amount: action.payload.amount,
      };
      const updatedExpenses = [...state];
      updatedExpenses[indexToUpdate] = updatedExpense;
      return updatedExpenses;
    case ActionType.Delete:
      return state.filter((x) => x.id !== action.payload.id);
    case ActionType.SetExpenses:
      return [...action.payload.expenses.reverse()];
    default:
      return state;
  }
};
