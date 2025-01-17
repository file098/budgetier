<template>
  <Header v-if="route.path !== '/login'" />
  <RouterView />
  <Dialog v-model="appStore.addExpenseDialogOpen" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/authStore";
import { useAppStore } from "@/stores/appStore";
import { useDataStore } from "@/stores/dataStore";
import { useInitialize } from "@/composables/useInitialize";
import { useRoute } from "vue-router";
import Header from "@/layout/Header.vue";
import Dialog from "@/components/ui/Dialog.vue";

const authStore = useAuthStore();
const appStore = useAppStore();
const dataStore = useDataStore();
const route = useRoute();
const { initializeApp } = useInitialize();

onMounted(async () => {
  // Initial auth check
  const session = await supabase.auth.getSession();
  if (session.data.session) {
    authStore.currentUser = session.data.session.user;
    await initializeApp();
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth state changed:', event);
    
    if (session?.user) {
      authStore.currentUser = session.user;
      
      if (!dataStore.isInitialized) {
        console.log('Initializing after auth change...');
        await initializeApp();
        dataStore.setInitialized(true);
      }
    } else {
      // Handle logout
      dataStore.setInitialized(false);
      // dataStore.setTransactions([]);
    }
  });
});
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.blur-background {
  filter: blur(5px);
}
</style>
