<template>
  <Dialog.Root v-model:open="appStore.addExpenseDialogOpen">
    <Teleport to="body">
      <Dialog.Backdrop class="dialog-backdrop" />
      <Dialog.Positioner class="dialog-positioner">
        <Dialog.Content class="dialog-content">
          <ExpenseForm />
          <Dialog.CloseTrigger class="dialog-close">Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import { Dialog } from "@ark-ui/vue/dialog";
import ExpenseForm from "@/components/ExpenseForm.vue";

const appStore = useAppStore();
</script>

<style scoped lang="scss">
@use "@/assets/colors" as *;

.dialog-backdrop {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dialog-positioner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.dialog-content {
  background-color: $background-color;
  padding: 20px;
  border-radius: 8px;
  max-width: 50vw;
  margin: auto;
  position: relative;
}

.dialog-close {
  background-color: #f5f5f5;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}

.dialog-close:hover {
  background-color: #e5e5e5;
}
</style>
