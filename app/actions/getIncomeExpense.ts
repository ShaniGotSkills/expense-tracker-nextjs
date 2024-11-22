'use server';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export default async function getIncomeExpense(): Promise<{
    income?: number;
    expense?: number;
    error?: string;
}> {
    try {
        // Authenticate user
        const { userId } = await auth();

        // Check if user exists
        if (!userId) {
            return { error: 'User not found' };
        }

        // Fetch transactions from the database
        const transactions = await db.transaction.findMany({
            where: { userId },
        });

        const amounts = transactions.map((transaction) => transaction.amount);

        const income = amounts
            .filter((item => item > 0))
            .reduce((acc, item) => acc + item, 0);

        const expense = amounts
            .filter((item => item < 0))
            .reduce((acc, item) => acc + item, 0);

        // Return balance
        return { income, expense: Math.abs(expense) };
    } catch (error) {
        // Handle database or other errors
        return { error: 'Database error' };
    }
}

