<template>
  <div>
    <p>Amount: {{ transaction.amount }}</p>
    <p>Category: {{ transaction.category }}</p>
    <p>Date: {{ transaction.created_at }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '@/models/transaction.model';

defineProps<{
  transaction: Transaction;
}>();

</script>
