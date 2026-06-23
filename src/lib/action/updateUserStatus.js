'use server'

import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";


const USERS_PATH = '/dashboard/admin/all-users';
export const updateUserStatus=async(userId)=>{
const res = await auth.api.banUser({
    body: {
        userId: userId, // required
},
    // This endpoint requires session cookies.
    headers: await headers(),
});
if(res){
    revalidatePath(USERS_PATH)
}
}
export const unblockUser=async(userId)=>{
const data = await auth.api.unbanUser({
    body: {
        userId: userId, // required
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
if(data){
    revalidatePath(USERS_PATH)
}
console.log("data" ,data);
}