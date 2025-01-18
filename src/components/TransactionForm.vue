<template>
  <div class="card flex justify-center">
    <Toast />
    <Form
      v-slot="$form"
      :initialValues
      :resolver
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <DatePicker name="date" />

      <div class="flex flex-col gap-1">
        <InputText
          name="description"
          type="text"
          placeholder="description"
          fluid
        />
        <Message
          v-if="$form.description?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.description.error?.message }}</Message
        >
      </div>

      <InputNumber
        name="amount"
        inputId="currency-germany"
        mode="currency"
        currency="EUR"
        locale="de-DE"
        fluid
      />

      <Message
        v-if="$form.amount?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.amount.error?.message }}</Message
      >

      <Select
        v-model="initialValues.category"
        name="category"
        :options="dataStore.categoryNames"
        placeholder="Select a category or create one"
        editable
      />

      <Message
        v-if="$form.category?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.category.error?.message }}</Message
      >

      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from "@/stores/dataStore";
import { Form } from "@primevue/forms";
import Button from "primevue/button";
import DatePicker from "primevue/datepicker";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Select from "primevue/select";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import InputNumber from "primevue/inputnumber";

const toast = useToast();
const dataStore = useDataStore();

const initialValues = ref({
  date: new Date(),
  description: "",
  amount: 0,
  category: "",
});

const resolver = (form: any) => {
  const errors: any = {};

  const values = form.values;
  if (!values.description) {
    errors.description = [{ message: "Description is required." }];
  }
  if (!values.amount || values.amount <= 0) {
    errors.amount = [{ message: "Amount must be greater than 0." }];
  }
  if (!values.category) {
    errors.category = [{ message: "Category is required." }];
  }

  return {
    errors,
    values: {
      date: values.date,
      amount: values.amount,
      description: values.description,
      category: values.category,
    },
  };
};

const onFormSubmit = (form: any) => {
  if (form.valid) {
    toast.add({
      severity: "success",
      summary: "Form Submitted",
      detail: `${form.values.description} - ${form.values.amount}€ - ${form.values.category} - ${form.values.date}`,
    });
  }
};
</script>
