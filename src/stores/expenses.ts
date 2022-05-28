import type Expenses from "@/types/expenses";
import { defineStore } from "pinia";

type RootState = {
  expenses: Expenses[];
};

export const useExpensesStore = defineStore({
  id: "expenses",
  state: () =>
    ({
      expenses: [],
    } as RootState),
  getters: {
    getExpenses(state) {
      return state.expenses;
    },
    getTotalExpenses(state) {
      return state.expenses.reduce((total, item) => total + item.amount, 0);
    },
  },
  actions: {
    async fetchExpenses() {
      try {
        const response = await fetch("/data/data.json");
        const data = await response.json();
        this.expenses = data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
