<template>
  <section class="widget-container">
    <Widget :loading="!dataStore.isInitialized" :doubleWidth="true" :ignoreDoubleWidthOnMobile="true">
      <template #header>
        <h1>Monthly Expenses</h1>
      </template>
      <template #content>
        <Bar :options="chartOptions" :data="chartData" />
      </template>
    </Widget>
    <Widget :loading="!dataStore.isInitialized">
      <template #header>
        <h1>Test</h1>
      </template>
      <template #content>
        <Doughnut :options="donutOptions" :data="chartData" />
      </template>
    </Widget>
    <Widget :loading="!dataStore.isInitialized">
      <template #header>
        <h1>Last transactions</h1>
      </template>
      <template #content>
        <div v-if="hasTransactions">
          <ul>
            <li v-for="transaction in lastTransactions" :key="transaction.id">
                {{ new Date(transaction.created_at).toLocaleDateString('en-GB') }} - {{ transaction.description }} - ${{ transaction.amount }}
            </li>
          </ul>
        </div>
        <p v-else>No transactions available</p>
      </template>
    </Widget>
    <Widget :loading="!dataStore.isInitialized" :doubleWidth="true" :ignoreDoubleWidthOnMobile="true">
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
import { ref, computed } from "vue";
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
import { useDataStore } from "@/stores/dataStore";

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

const dataStore = useDataStore();

const hasTransactions = computed(() => dataStore.transactionList.length > 0);

const lastTransactions = computed(() => 
  hasTransactions.value ? dataStore.transactionList.slice(0, 5) : []
);

const categoryNames = computed(() => 
  hasTransactions.value 
    ? [...new Set(dataStore.transactionList.map(t => t.category))]
    : ['No Data']
);

const categoryValues = computed(() => 
  hasTransactions.value
    ? categoryNames.value.map(name => 
        dataStore.transactionList.filter(t => t.category === name).length
      )
    : [1]
);

const chartData = ref({
  labels: categoryNames,
  datasets: [
    {
      data: categoryValues,
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
