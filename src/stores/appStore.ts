import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useAppStore = defineStore('appStore', () => {
    const addExpenseDialogOpen = ref(false);

    return {
        addExpenseDialogOpen,
    }
})
