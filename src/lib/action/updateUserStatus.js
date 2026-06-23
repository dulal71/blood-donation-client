'use server'

import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";


const USERS_PATH = '/dashboard/admin/all-users';

export const updateUserStatus=async(userId , status)=>{
const data = await auth.api.adminUpdateUser({
    body: {
        userId:userId, // required
        data: { status: status }, // required
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});

if(data){
    revalidatePath(USERS_PATH)
}
}
