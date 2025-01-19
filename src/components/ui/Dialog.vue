<template>
  <Dialog
    v-model:visible="appStore.addExpenseDialogOpen"
    modal
    header="Add transaction"
    :style="{ width: '35rem', height: 'max-content' }"
    ><TransactionForm />
  </Dialog>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import Dialog from "primevue/dialog";
import TransactionForm from "../TransactionForm.vue";

const appStore = useAppStore();
</script>
