<template>
  <form @submit.prevent="handleSubmit" class="expense-form">
    <div class="form-group">
      <label for="date">Date</label>
      <input type="date" id="date" v-model="form.date" required :max="today" />
    </div>

    <div class="form-group">
      <label for="category">Category</label>
      <select id="category" v-model="form.category" required>
        <option value="" disabled selected>Select category</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="amount">Amount</label>
      <input
        type="text"
        id="amount"
        v-model="formattedAmount"
        @input="updateAmount"
        placeholder="Enter amount"
        required
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <input
        type="text"
        id="description"
        v-model="form.description"
        required
        maxlength="100"
      />
    </div>

    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? "Saving..." : "Save Expense" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useExpenses } from "@/composables/useExpenses";
import type { NewExpense, Category } from "@/models/expense.model";

const categories: Category[] = ["Personal", "Hobby", "Food", "Travel", "Work"];
const isSubmitting = ref(false);
const today = computed(() => new Date().toISOString().split("T")[0]);

const form = ref<NewExpense>({
  date: new Date(today.value),
  category: "" as Category,
  amount: 0,
  description: "",
});

const formattedAmount = ref("");

function updateAmount(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value.replace(',', '.');
  form.value.amount = parseFloat(value);
  formattedAmount.value = input.value;
}

watch(() => form.value.amount, (newAmount) => {
  formattedAmount.value = newAmount.toFixed(2).replace('.', ',');
});

const emit = defineEmits<{
  (e: "submitted"): void;
}>();

async function handleSubmit() {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  const { addExpense } = useExpenses();

  try {
    await addExpense(form.value);
    resetForm();
    emit("submitted");
  } catch (error) {
    console.error("Failed to save expense:", error);
  } finally {
    isSubmitting.value = false;
  }
}

function resetForm() {
  form.value = {
    date: new Date(),
    category: "" as Category,
    amount: 0,
    description: "",
  };
  formattedAmount.value = "";
}
</script>

<style scoped lang="scss">
.expense-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
  }

  input,
  select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: #666;
    }
  }
}

button {
  padding: 0.75rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #45a049;
  }
}
</style>
