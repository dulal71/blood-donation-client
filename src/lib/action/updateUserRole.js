'use server'

import { headers } from "next/headers";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export const updateUserRole=async(userId,role)=>{
const data = await auth.api.setRole({
    body: {
        userId: userId,
        role: role, // required
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
revalidatePath('/dashboard/all-users')
return data;
}