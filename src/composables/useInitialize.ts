import { useDataStore } from '@/stores/dataStore';
import { useTransactions } from './useTransactions';

export const useInitialize = () => {
    const dataStore = useDataStore();
    const { getTransactions } = useTransactions();

    const initializeApp = async () => {
        try {
            const expenses = await getTransactions();
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
