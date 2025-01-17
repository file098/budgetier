<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const loading = ref(false)
const email = ref('')
const password = ref('')


const handleLogin = async () => {
  try {
    loading.value = true
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error

    // authStore.loadUser()
    router.push('/')
    
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Vue 3</h1>
      <p class="description">Sign in with your email and password below</p>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input class="inputField" required type="password" placeholder="Your password" v-model="password" />
      </div>
      <div>
        <input type="submit" class="button block" :value="loading ? 'Loading' : 'Login'"
          :disabled="loading" />
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.form-widget {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .header {
    margin-bottom: 1rem;
    text-align: center;
  }

  .description {
    color: #666;
    margin-bottom: 2rem;
    text-align: center;
  }

  .inputField {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #45a049;
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }
}
</style>