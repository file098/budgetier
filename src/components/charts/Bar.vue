<template>
  <Bar :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { useDataStore } from "@/stores/dataStore";
import { computed, ref } from "vue";
import { Bar } from "vue-chartjs";

const dataStore = useDataStore();

const categoryValues = computed(() => {
  const expensesByCategory = dataStore.transactionList.reduce(
    (
      acc: { [x: string]: any },
      transaction: { category: string | number; amount: any }
    ) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount,
  }));
});

const backgroundColor = computed(() =>
  Array.from(new Set(dataStore.transactionList.map((tran) => "#" + tran.color)))
);

const chartData = ref({
  labels: dataStore.categoryNames,
  datasets: [
    {
      data: categoryValues.value.map((item) => item.amount),
      backgroundColor: backgroundColor,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      display: false,
    },
  },
});
</script>
