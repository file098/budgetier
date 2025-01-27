<template>
  <header class="header">
    <nav class="">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/transactions" class="nav-link"
        >Transactions</router-link
      >
      <router-link to="/report" class="nav-link">Reports</router-link>
    </nav>
    <div class="buttons">
      <Button icon="pi pi-user" rounded @click=""/>
      <Button icon="pi pi-plus" rounded @click="appStore.addExpenseDialogOpen = true" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import { useAuthStore } from "@/stores/authStore";
import { onMounted, ref } from "vue";
import { Button } from "primevue";

const authStore = useAuthStore();
const appStore = useAppStore();

function logout() {
  authStore.signOut();
}

onMounted(() => {});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  & nav {
    display: flex;
    margin-left: 1rem;
    gap: 1rem;

    & .nav-link {
      color: rgba(254, 254, 254, 0.8);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  & .buttons {
    display: flex;
    align-items: center;

    & button {
      padding: 0.5rem;
      width: 2.5rem;
      height: 2.5rem;
      background: none;
      color: #eceff4;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0.25rem;

      &:hover {
        color: darken(#eceff4, 20%);
        transition: all 0.3s ease;
      }
    }
  }
}
</style>
