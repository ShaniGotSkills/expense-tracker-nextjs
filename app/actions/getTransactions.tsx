'use server';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Transaction } from "@/types/Transaction";

async function getTransactions(): Promise<{
    transactions?: Transaction[];
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
            orderBy: {
                createdAt: 'desc'
            }
        });

       
        // Return balance
        return { transactions };
    } catch (error) {
        // Handle database or other errors
        return { error: 'Database error' };
    }
}

export default getTransactions;
