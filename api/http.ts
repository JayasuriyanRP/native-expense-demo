import axios from "axios";
import { ExpenseModel } from "../model/Expenses";

const BACKEND_URL =
  "https://reactnative-expense-1e49f-default-rtdb.europe-west1.firebasedatabase.app";

export async function storeExpense(expenseData: ExpenseModel) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  return response.data.name;
}

export async function fetchExpense() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses: ExpenseModel[] = [];
  for (const key in response.data) {
    const expenseObj: ExpenseModel = {
      id: key,
      amount: +response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id: string, expense: ExpenseModel) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expense);
}

export function deleteExpense(id: string) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
