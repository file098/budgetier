import { supabase } from '@/lib/supabase';
import type { Expense, NewExpense } from '@/models/expense.model';
import { useAuthStore } from '@/stores/authStore';

export function useExpenses() {
  const authStore = useAuthStore();

  async function getExpenses(): Promise<Expense[]> {
    try {

      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", authStore.currentUser!.id);

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error fetching expenses:", error);
      return [];
    }
  }

  async function addExpense(expense: NewExpense) {
    try {
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