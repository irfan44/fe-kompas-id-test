<script>
import AddItemModal from "../Modals/AddItemModal.vue";

export default {
  components: { AddItemModal },
  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<template>
  <header>
    <div class="text-center">
      <h1 class="font-medium text-3xl">Diari Jajan Februari 2021</h1>
      <p class="font-medium text-xl">Pengeluaran Bulan Ini</p>
      <button
        class="p-2 bg-indigo-800 text-white mt-4"
        @click="showModal = true"
      >
        TAMBAH ITEM
      </button>
    </div>
  </header>
  <AddItemModal v-show="showModal" @close-modal="showModal = false" />
</template>
