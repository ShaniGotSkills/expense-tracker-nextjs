'use server';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function deleteTransaction(transactionId: string): Promise<{
    message?: string;
    error?: string;
}> {
    try {
        // Authenticate user
        const { userId } = await auth();

        // Check if user exists
        if (!userId) {
            return { error: 'User not found' };
        }

        // delete transaction from the database
        await db.transaction.delete({
            where: { 
                id: transactionId,
                userId
            },
        });

        revalidatePath('/');
        // Return balance
        return { message: 'Transaction deleted' };
    } catch (error) {
        // Handle database or other errors
        return { error: 'Database error' };
    }
}

export default deleteTransaction;
