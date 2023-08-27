<template>
  <header>
    <div class="text-center">
      <h1 class="font-medium text-3xl">Diari Jajan Februari 2021</h1>
      <p class="font-medium text-xl">
        Pengeluaran Bulan Ini {{ formatCurrency(totalExpense) }}
      </p>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    totalExpense: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters(["formatCurrency"]),
  },
};
</script>
