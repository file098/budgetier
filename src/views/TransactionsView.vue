<template>
  <DataTable
    :value="transactions"
    removableSort
    tableStyle="min-width: 50rem"
    ref="dt"
    v-model:expandedRows="expandedRows"
    dataKey="id"
    editMode="cell"
    class="transparent-table"
    @cell-edit-complete="onCellEditComplete"
  >
    <template #header>
      <div class="text-end pb-4">
        <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
      </div>
    </template>

    <Column field="date" header="Date" sortable>
      <template #body="slotProps">{{
        new Date(slotProps.data.date).toLocaleDateString()
      }}</template>
      <template #editor="{ data, field }">
        <DatePicker v-model="data[field]" />
      </template>
    </Column>

    <Column field="amount" header="Amount" sortable>
      <template #body="{ data, field }">
        {{ field === "price" ? formatCurrency(data[field]) : data[field] }}
      </template>
      <template #editor="{ data, field }">
        <InputNumber
          v-model="data[field]"
          mode="currency"
          currency="USD"
          locale="en-US"
          autofocus
          fluid
        />
      </template>
    </Column>

    <Column field="category" header="Category" sortable>
      <template #editor="{ data, field }">
        <Select
          name="category"
          :options="dataStore.categoryNames"
          v-model="data[field]"
        />
      </template>
    </Column>

    <Column expander style="width: 3em"></Column>

    <template #expansion="slotProps">
      <div class="p-4">
        <h5>Orders for {{ slotProps.data.name }}</h5>
      </div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { useTransactions } from "@/composables/useTransactions";
import type { Transaction } from "@/models/transaction.model";
import { useDataStore } from "@/stores/dataStore";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import DatePicker from "primevue/datepicker";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import { ref } from "vue";

const { getTransactions } = useTransactions();
const dataStore = useDataStore();

const transactions = ref<Transaction[]>([]);
const dt = ref();
const expandedRows = ref([]);

const fetchTransactions = async () => {
  transactions.value = await getTransactions();
};

const exportCSV = (event: MouseEvent) => {
  dt.value.exportCSV();
};

const formatCurrency = (value: number | bigint) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value
  );
};

const onCellEditComplete = (event: any) => {
  const updatedExpense = { ...event.data };
  updatedExpense[event.field] = event.value;
  console.log(event.data);
};

fetchTransactions();
</script>

<style></style>
