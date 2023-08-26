<template>
  <main class="mx-auto max-w-[95%] py-8">
    <HomeHeader :total-expense="calculateTotalExpense()" />
    <ExpenseCards :expenses="expenses" />
  </main>
</template>

<script>
import HomeHeader from "../components/Headers/HomeHeader.vue";
import { mapActions, mapState } from "vuex";
import ExpenseCards from "../components/Cards/ExpenseCards.vue";

export default {
  components: { ExpenseCards, HomeHeader },
  computed: {
    ...mapState(["expenses"]),
    ...mapActions(["fetchExpenses"]),
  },
  mounted() {
    this.$store.dispatch("fetchExpenses");
  },
  methods: {
    calculateTotalExpense() {
      let totalExpense = 0;
      Object.values(this.expenses).forEach((expense) => {
        expense.forEach((item) => {
          totalExpense += item.pengeluaran;
        });
      });
      return totalExpense;
    },
  },
};
</script>
