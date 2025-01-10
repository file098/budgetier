import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import type { Expense } from '@/models/expense.model';

export function useExpenses() {
    const authStore = useAuthStore();

    async function getExpenses(): Promise<Expense[] | undefined> {
        try {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            if (sessionError) throw sessionError;

            const { data, error } = await supabase
                .from("expenses")
                .select("*")
                .eq("user_id", authStore.currentUser!.id);

            if (error) throw error;

            return data as Expense[];
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    }

    async function addExpense(expense: Expense) {
        try {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            if (sessionError) throw sessionError;

            const { data, error } = await supabase
                .from("expenses")
                .insert([{ ...expense, user_id: authStore.currentUser!.id }]);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    }

    async function updateExpense(id: string, updatedExpense: Expense) {
        try {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            if (sessionError) throw sessionError;

            const { data, error } = await supabase
                .from("expenses")
                .update(updatedExpense)
                .eq("id", id)
                .eq("user_id", authStore.currentUser!.id);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    }

    async function deleteExpense(id: string) {
        try {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            if (sessionError) throw sessionError;

            const { data, error } = await supabase
                .from("expenses")
                .delete()
                .eq("id", id)
                .eq("user_id", authStore.currentUser!.id);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    }

    return {
        getExpenses,
        addExpense,
        updateExpense,
        deleteExpense
    };
}