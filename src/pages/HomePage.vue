<template>
  <main class="mx-auto max-w-[95%] py-8">
    <HomeHeader :total-expense="calculateTotalExpense()" />
    <div class="text-center">
      <button
        class="p-2 bg-indigo-800 text-white mt-4"
        @click="showModal = true"
      >
        TAMBAH ITEM
      </button>
    </div>
    <AddItemModal
      v-show="showModal"
      @close-modal="showModal = false"
      @refresh-page="refreshPage()"
    />
    <ExpenseCards :expenses="expenses" />
  </main>
</template>

<script>
import HomeHeader from "../components/Headers/HomeHeader.vue";
import { mapActions, mapState } from "vuex";
import ExpenseCards from "../components/Cards/ExpenseCards.vue";
import AddItemModal from "../components/Modals/AddItemModal.vue";

export default {
  components: { AddItemModal, ExpenseCards, HomeHeader },
  computed: {
    ...mapState(["expenses"]),
    ...mapActions(["fetchExpenses"]),
  },
  mounted() {
    this.$store.dispatch("fetchExpenses");
  },
  data() {
    return {
      showModal: false,
    };
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
    refreshPage() {
      this.$store.dispatch("fetchExpenses");
    },
  },
};
</script>
