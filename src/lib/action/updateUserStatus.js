'use server'

import { headers } from "next/headers";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { serverMutation } from "../service/post";

export const updateUserStatus=async(id,status)=>{
const res = serverMutation(`/api/user/${id}`,{status}, 'PATCH')
if(res.modifiedCount > 0){
revalidatePath('/dashboard/all-users')
}

return res;
}