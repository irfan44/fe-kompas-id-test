import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    items: [],
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/detail");
      } catch (error) {
        console.log("Error fetching data" + error);
      }
    },
  },
  mutations: {
    setItem(state, items) {
      state.items = items;
    },
  },
});

export default store;
