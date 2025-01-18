<template>
  <Dialog
    v-model:visible="appStore.addExpenseDialogOpen"
    modal
    header="Add transaction"
    :style="{ width: '25rem' }"
  >
    <ExpenseForm />
  </Dialog>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import ExpenseForm from "@/components/ExpenseForm.vue";
import Dialog from "primevue/dialog";

const appStore = useAppStore();
</script>
