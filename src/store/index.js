import { createStore } from "vuex";
import axios from "axios";
import convertMonth from "../utils/convertMonth.js";

const store = createStore({
  state: {
    expenses: [],
  },
  actions: {
    async fetchExpenses({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/detail");
        const expenseGroupByDate = {};
        response.data.forEach((item) => {
          const date = item.tanggal;
          if (!expenseGroupByDate[date]) {
            expenseGroupByDate[date] = [];
          }
          expenseGroupByDate[date].push(item);
        });
        const orderedExpenses = Object.keys(expenseGroupByDate)
          .sort((a, b) => {
            const date1 = convertMonth(a);
            const date2 = convertMonth(b);
            return new Date(date2) - new Date(date1);
          })
          .reduce((obj, key) => {
            obj[key] = expenseGroupByDate[key];
            return obj;
          }, {});
        commit("setExpenses", orderedExpenses);
      } catch (error) {
        console.log("Error fetching data" + error);
      }
    },
  },
  mutations: {
    setExpenses(state, items) {
      state.expenses = items;
    },
  },
  getters: {
    formatCurrency: () => (value) => {
      const formattedValue = value.toLocaleString();
      return `Rp ${formattedValue}`;
    },
  },
});

export default store;
