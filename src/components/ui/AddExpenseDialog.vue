<template>
  <w-dialog v-model="appStore.addExpenseDialogOpen" :width="dialogWidth">
    <ExpenseForm @submitted="appStore.addExpenseDialogOpen = false"/>
  </w-dialog>
</template>

<script setup lang="ts">
import { useExpenses } from "@/composables/useExpenses";
import { useAppStore } from "@/stores/appStore";
import { computed, ref } from "vue";
import ExpenseForm from "../ExpenseForm.vue";

const appStore = useAppStore();

const dialogWidth = computed(() => {
  return window.innerWidth < 600 ? "90%" : "50%";
});
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
