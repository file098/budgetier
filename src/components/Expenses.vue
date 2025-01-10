<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import { Expenses } from '@/models/expenses'
import { useExpenses } from '@/composables/useExpenses'
import Widget from '@/components/Widget.vue'

const expenses = ref<Expenses[]>([])
const authStore = useAuthStore()
const { getExpenses } = useExpenses()

onMounted(async () => {
    expenses.value = await getExpenses()
})
</script>

<template>
    <Widget v-for="expense in expenses" :key="expense.id">
        <template #content>
            <h1>test</h1>
        </template>
    </Widget>
</template>