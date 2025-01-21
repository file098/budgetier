import type { Transaction } from '@/models/transaction.model';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useDataStore = defineStore('dataStore', () => {
    const transactionList = ref<Transaction[]>([]);
    const isInitialized = ref(false);

    const categoryNames = computed(() =>
        [...new Set(transactionList.value.map(t => t.category))]

    );

    const setTransactions = (transactions: Transaction[]) => {
        transactionList.value = transactions;
    };

    const setInitialized = (value: boolean) => {
        isInitialized.value = value;
    };

    return {
        transactionList,
        isInitialized,
        setTransactions,
        setInitialized,
        categoryNames
    }
})
