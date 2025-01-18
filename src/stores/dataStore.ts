import type { Expense } from '@/models/expense.model';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useDataStore = defineStore('dataStore', () => {
    const transactionList = ref<Expense[]>([]);
    const isInitialized = ref(false);

    const categoryNames = computed(() =>
        [...new Set(transactionList.value.map(t => t.category))]

    );

    const setTransactions = (transactions: Expense[]) => {
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
