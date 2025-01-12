<template>
  <w-dialog v-model="appStore.addExpenseDialogOpen" :width="dialogWidth">
    <form action="@submit.prevent">
      <input
        type="date"
        placeholder="date"
        required
        :value="new Date().toISOString().split('T')[0]"
      />
      <select name="category" required>
        <option value="" disabled selected>Select a category</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <input type="number" placeholder="amount" required step="0.01" min="0" />
      <input type="text" placeholder="description" required />
      <button type="submit">Add Expense</button>
    </form>
  </w-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import { computed } from "vue";

const appStore = useAppStore();

const dialogWidth = computed(() => {
  return window.innerWidth < 600 ? "90%" : "50%";
});

const categories = ["Food", "Transport", "Entertainment", "Health", "Other"];
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
