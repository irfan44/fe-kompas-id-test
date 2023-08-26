import { createStore } from "vuex";
import axios from "axios";

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
          const formattedDate = date.split(" ").slice(0, 2).join(" ");
          if (!expenseGroupByDate[formattedDate]) {
            expenseGroupByDate[formattedDate] = [];
          }
          expenseGroupByDate[formattedDate].push(item);
        });
        commit("setExpenses", expenseGroupByDate);
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
