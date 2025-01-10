<template>
    <header class="header">
        <nav class="">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/transactions" class="nav-link">Transactions</router-link>
          <router-link to="/categories" class="nav-link">Categories</router-link>
          <router-link to="/reports" class="nav-link">Reports</router-link>
        </nav>
        <div class="user-info">
            <span class="username">{{ username }}</span>
            <button @click="logout">Logout</button>
            </div>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const username = ref('');

function logout() {
    console.log('User logged out');
    authStore.signOut();
}

onMounted(() => {
    username.value = authStore.currentUser?.email || '';
});
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    .nav-link {
        margin-right: 1rem;
        color: rgba(254, 254, 254, 0.8);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}

button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
}
</style>