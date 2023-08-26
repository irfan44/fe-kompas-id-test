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
import AddItemModal from "../Modals/AddItemModal.vue";
import { mapGetters } from "vuex";

export default {
  components: { AddItemModal },
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
