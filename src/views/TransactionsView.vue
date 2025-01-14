<template>
  <section class="transactions-container" @click.self="closeDetails">
    <div class="transactions-grid" v-if="!loading">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="transactions-row"
        @click.stop="toggleDetails(transaction.id)"
      >
        <span
          :style="{
            backgroundColor: '#88c0d0',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            display: 'inline-block',
          }"
        ></span>
        <span>{{
          new Date(transaction.created_at).toLocaleDateString("en-GB")
        }}</span>
        <span>{{ transaction.category }}</span>
        <span>{{ transaction.amount }}€</span>
        <div
          v-if="expandedTransaction === transaction.id"
          class="transaction-details"
          @click.stop
        >
          <!-- Add details you want to show when expanded -->
          <p>Details for transaction {{ transaction.id }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useExpenses } from "@/composables/useExpenses";
import type { Expense } from "@/models/expense.model";

const transactions = ref<Expense[]>([]);
const loading = ref(true);
const { getExpenses } = useExpenses();

const expandedTransaction = ref<string | null>(null);

const toggleDetails = (id: string) => {
  expandedTransaction.value = expandedTransaction.value === id ? null : id;
};

const closeDetails = () => {
  expandedTransaction.value = null;
};

const fetchTransactions = async () => {
  transactions.value = await getExpenses();
  transactions.value.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  loading.value = false;
};

fetchTransactions();

onMounted(() => {
  document.addEventListener("click", closeDetails);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDetails);
});
</script>

<style scoped lang="scss">
.transactions-container {
  width: 100%;
  padding: 0 1rem;

  & .transactions-grid {
    display: flex;
    flex-flow: column;
    gap: 1rem;

    & .transactions-row {
      display: grid;
      grid-template-columns: 2rem 1fr 1fr 1fr;
      align-items: center;
      border-bottom: 1px solid #ccc;
      gap: 10px;
      cursor: pointer;
    }
  }
}

.transaction-details {
  grid-column: 1 / -1;
  padding: 1rem;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
}

@media (max-width: 600px) {
  .transactions-container {
    padding: 0 0.5rem;

    & .transactions-row {
      grid-template-columns: 1fr;
      grid-gap: 0.5rem;
      padding: 0.5rem 0;

      & > span {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
