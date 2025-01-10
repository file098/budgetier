<script setup lang="ts">
import { onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore();

onMounted(async () => {
  await supabase.auth.onAuthStateChange((_, _session) => {
    if (_session) {
      authStore.currentUser = _session.user;
    }
  })
})
</script>

<template>
  <RouterView />
</template>