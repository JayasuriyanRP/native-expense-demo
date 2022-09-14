import { ExpenseModel } from "../model/Expenses";

export enum ActionType {
  Add = "ADD",
  Update = "UPDATE",
  Delete = "DELETE",
}

type ExpensePayload = {
  [ActionType.Add]: {
    description: string;
    date: Date;
    amount: number;
  };
  [ActionType.Update]: {
    id: string;
    description: string;
    date: Date;
    amount: number;
  };
  [ActionType.Delete]: {
    id: string;
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
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
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
    default:
      return state;
  }
};
