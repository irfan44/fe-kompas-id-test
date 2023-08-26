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
          if (!expenseGroupByDate[date]) {
            expenseGroupByDate[date] = [];
          }
          expenseGroupByDate[date].push(item);
        });
        const orderedExpenses = Object.keys(expenseGroupByDate)
          .sort((a, b) => {
            let date1;
            let date2;

            // Convert "Agustus" to "August". Using "Agustus" make new Date() error
            if (a.split(" ")[1] === "Agustus") {
              const arr1 = a.split(" ");
              arr1[1] = "August";
              date1 = arr1.join(" ");
            } else if (a.split(" ")[1] !== "Agustus") {
              date1 = a;
            }

            // Convert "Agustus" to "August". Using "Agustus" make new Date() error
            if (b.split(" ")[1] === "Agustus") {
              const arr2 = b.split(" ");
              arr2[1] = "August";
              date2 = arr2.join(" ");
            } else if (b.split(" ")[1] !== "Agustus") {
              date2 = b;
            }

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
