"use server";

import connectDB from "@/lib/mongodb";

export async function testDatabaseConnection() {
    try {
        await connectDB();
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}