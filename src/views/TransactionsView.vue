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
        <span>{{ new Date(transaction.created_at).toLocaleDateString("en-GB") }}</span>
        <span>{{ transaction.category }}</span>
        <span>{{ transaction.amount }}€</span>
        <div
          class="transaction-details"
          :class="{ opened: expandedTransaction === transaction.id }"
          @click.stop
        >
          <TransactionDetail :transaction="transaction" />
        </div>
      </div>
    </div>
    <div class="transactions-grid" v-else>
      <TransactionSkeleton v-for="n in 5" :key="n" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useExpenses } from "@/composables/useExpenses";
import type { Expense } from "@/models/expense.model";
import TransactionDetail from "@/components/TransactionDetail.vue";
import TransactionSkeleton from "@/components/ui/skeletons/TransactionSkeleton.vue";

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
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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

  & .transactions-grid {
    display: flex;
    flex-flow: column;
    gap: 1rem;

    & .transactions-row {
      display: grid;
      grid-template-columns: 2rem 1fr 1fr 1fr;
      place-items: center;
      border-bottom: 1px solid #ccc;
      gap: 10px;
      cursor: pointer;
    }
  }
}

.transaction-details {
  width: 100%;
  grid-column: 1 / -1;

  height: 0;
  overflow-y: clip;
  transition: height 0.5s;
  
  &.opened {
    height: auto;
  }
}

@media (max-width: 600px) {
  .transactions-container {
    & .transactions-row {
      grid-template-columns: 1fr;
      grid-gap: 0.5rem;

      & > span {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
