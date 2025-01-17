<template>
  <div>
    <h1>Transaction Detail</h1>
    <p>Transaction ID: {{ transaction.id }}</p>
    <p>Amount: {{ transaction.amount }}</p>
    <p>Category: {{ transaction.category }}</p>
    <p>Date: {{ transaction.created_at }}</p>
    <!-- Display additional transaction details here -->
  </div>
</template>

<script setup lang="ts">
import type { Expense } from '@/models/expense.model';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const props =  defineProps<{
  transaction: Expense;
}>();

</script>
