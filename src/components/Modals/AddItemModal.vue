<template>
  <div
    class="fixed flex justify-center top-0 bottom-0 left-0 right-0 bg-[#000000da]"
    @click="$emit('close-modal')"
  >
    <div class="bg-white my-auto w-96 p-4" @click.stop>
      <h3 class="text-2xl font-medium mb-4">Tambah Entri</h3>
      <div
        v-if="errorMsg.length > 0"
        class="text-red-700 mb-2 font-medium text-center"
      >
        <p>{{ errorMsg }}</p>
      </div>
      <form class="space-y-4" @submit.prevent="submitForm">
        <div class="flex flex-col">
          <label for="name">Nama</label>
          <input
            id="name"
            class="border p-1 rounded focus:ring-0 focus:border-2 focus:outline-none focus:border-indigo-500 active:border-indigo-800"
            v-model="formData.name"
          />
        </div>
        <div class="flex flex-col">
          <label for="price">Harga</label>
          <input
            id="price"
            class="border p-1 rounded focus:ring-0 focus:border-2 focus:outline-none focus:border-indigo-500 active:border-indigo-800"
            type="number"
            v-model="formData.price"
          />
        </div>
      </form>
      <div class="flex justify-end space-x-2 mt-4">
        <button class="p-2 bg-gray-500 text-white" @click="closeModal">
          BATAL
        </button>
        <button
          type="submit"
          class="p-2 bg-indigo-800 text-white"
          @click="submitForm"
        >
          KIRIM
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        name: "",
        price: "",
      },
      errorMsg: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
      this.resetForm();
    },
    async submitForm() {
      this.errorMsg = "";
      if (this.formData.name.length === 0 || this.formData.price.length === 0) {
        this.errorMsg = "Mohon isi semua form";
        return;
      }

      try {
        const newExpense = {
          // Create hour with HH:MM format
          jam: new Date().toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          // Create date with dd MMMM YYYY
          tanggal: new Date().toLocaleDateString(["id-ID"], {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          nama: this.formData.name,
          pengeluaran: this.formData.price,
        };
        await axios.post("http://localhost:3000/detail", newExpense);
        this.$emit("refresh-page");
        this.$emit("close-modal");
        this.resetForm();
      } catch (error) {
        console.log("Failed to add data" + error);
      }
    },
    resetForm() {
      this.formData.name = "";
      this.formData.price = "";
      this.errorMsg = "";
    },
  },
};
</script>
