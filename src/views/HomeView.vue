<template>
  <section class="widget-container">
    <Widget :loading="loading" :doubleWidth="true" :ignoreDoubleWidthOnMobile="true">
      <template #header>
        <h1>Monthly Expenses</h1>
      </template>
      <template #content>
        <Bar :options="chartOptions" :data="chartData" />
      </template>
    </Widget>
    <Widget :loading="loading">
      <template #header>
        <h1>Test</h1>
      </template>
      <template #content>
        <Doughnut :options="donutOptions" :data="chartData" />
      </template>
    </Widget>
    <Widget :loading="loading">
      <template #header>
        <h1>Last transactions</h1>
      </template>
      <template #content>
        <ul>
          <li v-for="transaction in transactions" :key="transaction.id">
            {{ transaction.date }} - {{ transaction.description }} - ${{ transaction.amount }}
          </li>
        </ul>
      </template>
    </Widget>
    <Widget :loading="loading" :doubleWidth="true" :ignoreDoubleWidthOnMobile="true">
      <template #header>
        <h1>Trends</h1>
      </template>
      <template #content>
        <Line :options="lineOptions" :data="lineData" />
      </template>
    </Widget>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Widget from "@/components/ui/Widget.vue";
import { Bar, Doughnut, Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement
);

const transactions = ref([
  { id: 1, date: "2021-01-01", description: "Rent", amount: 1000 },
  { id: 2, date: "2021-01-02", description: "Food", amount: 100 },
  { id: 3, date: "2021-01-03", description: "Gas", amount: 50 },
]);

const loading = ref(true);
const chartData = ref({
  labels: ["January", "February", "March"],
  datasets: [
    {
      data: [40, 20, 12],
      backgroundColor: ["#88C0D0", "#81A1C1", "#5E81AC"],
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

const donutOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      display: false,
    },
  },
  borderWidth: 0,
});

const lineData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Expenses',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: '#88C0D0',
      tension: 0.1
    }
  ]
});

const lineOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#2E3440'
      }
    },
    x: {
      grid: {
        color: '#2E3440'
      }
    }
  }
});

setTimeout(() => {
  loading.value = false;
}, 2000);
</script>

<style scoped lang="scss">
.widget-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px;
  margin: 0 5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    margin: 0 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 0 1rem;
    gap: 15px;
    padding: 15px;
  }
}
</style>
