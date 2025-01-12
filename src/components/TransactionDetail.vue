<template>
  <div>
    <h1>Transaction Detail</h1>
    <p>Transaction ID: {{ transactionId }}</p>
    <!-- Display additional transaction details here -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const transactionId = computed(() => route.params.id);

const loadTransactionDetails = () => {
  console.log('Loading transaction:', transactionId.value);
  // Fetch transaction details using the transactionId
};

onMounted(() => {
  loadTransactionDetails();
});

// Watch for route changes
watch(
  () => route.params.id,
  () => loadTransactionDetails()
);
</script>
