<script setup lang="ts">
import { onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import { useRoute } from 'vue-router'
import Header from '@/layout/Header.vue'

const authStore = useAuthStore();
const route = useRoute();

onMounted(async () => {
  await supabase.auth.onAuthStateChange((_, _session) => {
    if (_session) {
      authStore.currentUser = _session.user;
    }
  })
})
</script>

<template>
  <Header v-if="route.path !== '/login'" />
  <RouterView />
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>