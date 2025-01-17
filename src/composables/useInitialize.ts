import { useDataStore } from '@/stores/dataStore';
import { useExpenses } from './useExpenses';

export const useInitialize = () => {
    const dataStore = useDataStore();
    const { getExpenses } = useExpenses();

    const initializeApp = async () => {
        try {
            const expenses = await getExpenses();
            dataStore.setTransactions(expenses);
            return true;
        } catch (error) {
            console.error('Failed to initialize app:', error);
            return false;
        }
    };

    return {
        initializeApp
    };
};
