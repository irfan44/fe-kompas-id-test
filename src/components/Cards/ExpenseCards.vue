<template>
  <div class="grid grid-cols-4 gap-4 mt-8">
    <div
      class="py-6 px-4 border shadow-md h-full space-y-2 rounded"
      v-for="(expense, date) in expenses"
    >
      <h3 class="font-bold text-lg">{{ convertDate(date) }}</h3>
      <div class="border-b-2">
        <div
          class="flex justify-between border-t pl-2 py-2"
          v-for="item in expense"
        >
          <div class="flex space-x-4">
            <p>{{ item.jam }}</p>
            <p>{{ item.nama }}</p>
          </div>
          <div>
            <p>{{ formatCurrency(item.pengeluaran) }}</p>
          </div>
        </div>
      </div>
      <div class="flex justify-end space-x-6">
        <p class="font-bold">Total</p>
        <p class="font-bold">{{ formatCurrency(calculateTotal(expense)) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    expenses: {
      type: Object,
      default: {},
    },
  },
  computed: {
    ...mapGetters(["formatCurrency"]),
  },
  methods: {
    calculateTotal(expense) {
      let total = 0;
      expense.forEach((item) => {
        total += item.pengeluaran;
      });
      return total;
    },
    convertDate(date) {
      return date.split(" ").slice(0, 2).join(" ");
    },
  },
};
</script>
