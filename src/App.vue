<script setup lang="ts">
import { onMounted } from "vue";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/authStore";
import { useAppStore } from "@/stores/appStore";
import { useRoute } from "vue-router";
import Header from "@/layout/Header.vue";
import AddExpenseDialog from "@/components/ui/AddExpenseDialog.vue";

const authStore = useAuthStore();
const appStore = useAppStore();
const route = useRoute();

onMounted(async () => {
  supabase.auth.onAuthStateChange((_, _session) => {
    if (_session) {
      authStore.currentUser = _session.user;
    }
  });
});
</script>

<template>
  <Header v-if="route.path !== '/login'" />
  <RouterView :class="{ 'blur-background': appStore.addExpenseDialogOpen }" />
  <AddExpenseDialog v-if="appStore.addExpenseDialogOpen" />
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.blur-background {
  filter: blur(5px);
}
</style>
