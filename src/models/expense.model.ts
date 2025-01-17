export type Category = "Personal" | "Hobby" | "Food" | "Travel" | "Work";

export interface Expense {
    id: string;
    amount: number;
    description: string;
    created_at: Date;
    category: Category;
}

export interface NewExpense {
    amount: number;
    description: string;
    date: Date;
    category: Category;
}

