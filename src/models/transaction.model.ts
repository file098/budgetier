export type Category = "Personal" | "Hobby" | "Food" | "Travel" | "Work";

export interface Transaction {
    id: string;
    amount: number;
    description: string;
    created_at: Date;
    category: Category;
    color: string;
}

export interface NewTransaction {
    amount: number;
    description: string;
    date: Date;
    color?: string;
    category: Category;
}

