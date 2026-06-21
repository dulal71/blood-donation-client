'use server'

import { revalidatePath } from "next/cache";
import { serverDelete } from "../service/delete"



export const deleteDonation=async(id)=>{
const res = await serverDelete(`/api/donationRequest/${id}`)

if(res.deletedCount > 0){
    revalidatePath('/dashboard/my-donation-requests')
}
return res;
}