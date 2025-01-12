<template>
    <div class="report-container">
        <h1>Expense Report</h1>
        
        <div class="summary-section">
            <div class="total-box">
                <h3>Total Expenses</h3>
                <p>${{ totalExpenses }}</p>
            </div>
            
            <div class="date-filter">
                <label>Filter by date:</label>
                <input type="month" v-model="selectedMonth">
            </div>
        </div>

        <div class="expenses-list">
            <table v-if="filteredExpenses.length">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="expense in filteredExpenses" :key="expense.id">
                        <td>{{ formatDate(expense.date) }}</td>
                        <td>{{ expense.description }}</td>
                        <td>{{ expense.category }}</td>
                        <td>${{ expense.amount.toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-else>No expenses found for this period.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample data - replace with actual data source
const expenses = ref([
    {
        id: 1,
        date: '2023-05-01',
        description: 'Groceries',
        category: 'Food',
        amount: 150.50
    },
    // Add more expense items here
])

const selectedMonth = ref(new Date().toISOString().slice(0, 7))

const filteredExpenses = computed(() => {
    return expenses.value.filter(expense => 
        expense.date.startsWith(selectedMonth.value)
    )
})

const totalExpenses = computed(() => {
    return filteredExpenses.value
        .reduce((sum, expense) => sum + expense.amount, 0)
        .toFixed(2)
})

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
}
</script>

<style scoped>
.report-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.summary-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
}

.total-box {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f5f5f5;
}
</style>