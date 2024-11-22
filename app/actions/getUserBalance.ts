'use server';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getUserBalance(): Promise<{
    balance?: number;
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

        // Calculate the balance
        const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        // Return balance
        return { balance };
    } catch (error) {
        // Handle database or other errors
        return { error: 'Database error' };
    }
}

export default getUserBalance;
