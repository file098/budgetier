import { supabase } from '@/lib/supabase';
import type { Transaction, NewTransaction } from '@/models/transaction.model';
import { useAuthStore } from '@/stores/authStore';

export function useTransactions() {
  const authStore = useAuthStore();

  async function getTransactions(): Promise<Transaction[]> {
    try {

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", authStore.currentUser!.id);

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error fetching expenses:", error);
      return [];
    }
  }

  async function addTransaction(expense: NewTransaction) {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .insert([{ ...expense, user_id: authStore.currentUser!.id }]);

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  }

  async function updateTransaction(id: string, updatedTransaction: Transaction) {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .update(updatedTransaction)
        .eq("id", id)
        .eq("user_id", authStore.currentUser!.id);

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  }

  async function deleteTransaction(id: string) {
    try {
      const { data, error } = await supabase
        .from("transactions")
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
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
}