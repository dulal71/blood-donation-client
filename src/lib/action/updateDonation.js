'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../service/post"

export const updateStatus=async(id,data)=>{
const res = await serverMutation(`/api/donationRequest/${id}`, data , 'PATCH')
console.log('res' , res);
 if (res.modifiedCount > 0) {
    revalidatePath(`/dashboard/${id}`)
    revalidatePath('/donations-requests')
  }
return res
}