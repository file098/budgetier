<template>
  <div class="transactions-container">
    <div class="transactions-list">
      <h1>Transactions</h1>
      <div v-if="!loading">
        <transition name="fade">
          <ul>
            <li v-for="transaction in transactions" :key="transaction.id">
              <router-link :to="`/transactions/${transaction.id}`">
                {{ transaction.description }}
              </router-link>
            </li>
          </ul>
        </transition>
      </div>
      <ul v-if="loading" class="loading-skeleton">
        <li class="skeleton-item" v-for="n in 1" :key="n" />
      </ul>
    </div>
    <div class="transaction-detail">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Expenses } from "@/models/expenses";
import { useExpenses } from "@/composables/useExpenses";

const transactions = ref<Expenses[]>([]);
const loading = ref(true);
const { getExpenses } = useExpenses();

onMounted(async () => {
  transactions.value = await getExpenses();
  loading.value = false;
  console.log(transactions.value);
});
</script>

<style scoped>
.transactions-container {
  display: flex;
}

.loading-skeleton {
  padding: 1rem;
}

.skeleton-item {
  height: 20px;
  background: #eee;
  margin: 10px 0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
